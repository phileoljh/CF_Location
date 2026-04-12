/**
 * IP Location Tracker - 核心邏輯 (src/index.js)
 * 整合 D1 儲存、自定義路由、以及自動清理功能。
 */

import { LandingPage, AdminDashboard, GeneratorPage } from "./ui.js";

export default {
  /**
   * HTTP 請求處理器
   */
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // 1. 中繼工具頁面: 產生連結
    if (path === "/generate") {
      if (!this.checkAuth(url, env)) {
        return new Response("Unauthorized", { status: 401 });
      }
      return new Response(GeneratorPage(), {
        headers: { "content-type": "text/html;charset=UTF-8" },
      });
    }

    // 2. 後台管理頁面: 檢視紀錄
    if (path === "/admin") {
      if (!this.checkAuth(url, env)) {
        return new Response("Unauthorized", { status: 401 });
      }
      try {
        // 限制讀取最近 100 筆資料，避免大量封包傳輸
        const { results } = await env.DB.prepare(
          "SELECT * FROM location_logs ORDER BY created_at DESC LIMIT 100"
        ).all();
        return new Response(AdminDashboard(results), {
          headers: { "content-type": "text/html;charset=UTF-8" },
        });
      } catch (e) {
        return new Response(`Database Error: ${e.message}`, { status: 500 });
      }
    }

    // 3. 核心功能: 追蹤與 Landing Page
    const trackId = url.searchParams.get("track_id");
    // 基礎校驗: 確認 track_id 存在且長度合理 (防止惡意注入過長字串)
    if (trackId && trackId.length <= 100) {
      // 擷取地理位置資訊 (request.cf)
      const cf = request.cf || {};
      const logData = {
        track_id: trackId,
        ip: request.headers.get("cf-connecting-ip") || "Unknown",
        country: cf.country || "Unknown",
        region: cf.region || "Unknown",
        city: cf.city || "Unknown",
        latitude: cf.latitude || "Unknown",
        longitude: cf.longitude || "Unknown",
        user_agent: request.headers.get("user-agent") || "Unknown",
      };

      /**
       * 非同步寫入 D1 (重要技術點):
       * 使用 waitUntil 確保寫入資料庫的操作在背景執行，不阻擋使用者看到 Landing Page。
       * 這能顯著優化使用者的載入體感速度。
       */
      ctx.waitUntil(this.logToDatabase(env, logData));
    }

    // 回傳高質感歡迎頁面
    return new Response(LandingPage(), {
      headers: { "content-type": "text/html;charset=UTF-8" },
    });
  },

  /**
   * 定時排程處理器: 清理舊資料
   */
  async scheduled(event, env, ctx) {
    console.log("正在執行自動清理程序 (7 天前資料)...");
    try {
      const info = await env.DB.prepare(
        "DELETE FROM location_logs WHERE created_at < datetime('now', '-7 days')"
      ).run();
      console.log(`清理完成。已刪除受影響筆數: ${info.meta.changes}`);
    } catch (e) {
      console.error("清理失敗:", e.message);
    }
  },

  /**
   * 輔助函式: 寫入 D1 資料庫
   */
  async logToDatabase(env, data) {
    try {
      await env.DB.prepare(
        `INSERT INTO location_logs 
         (track_id, ip, country, region, city, latitude, longitude, user_agent) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        data.track_id, 
        data.ip, 
        data.country, 
        data.region, 
        data.city, 
        data.latitude, 
        data.longitude, 
        data.user_agent
      )
      .run();
    } catch (e) {
      console.error("D1 Logging Failed:", e.message);
    }
  },

  /**
   * 簡易權限檢查 (透過 URL 參數或是 Env 密鑰)
   */
  checkAuth(url, env) {
    const key = url.searchParams.get("key");
    /**
     * 安全性修正:
     * 1. env.ADMIN_KEY 必須存在 (不能為 undefined 或空值)。
     * 2. URL 傳入的 key 必須完全匹配。
     * 若未滿足上述條件，系統將嚴格禁止進入後台。
     */
    return env.ADMIN_KEY && key === env.ADMIN_KEY;
  }
};
