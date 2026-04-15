# IP Location Tracker 📍

這是一個專業且精美的地理位置追蹤系統，建立在 Cloudflare Workers 與 D1 資料庫之上。它能幫助您透過隨機生成的追蹤連結，在不需使用者主動授權的情況下，自動判斷並紀錄使用者的 IP 與地理位置，同時呈現一個與系統風格一致的「未來科技」風格歡迎頁面。

## ✨ 特色功能
- **零延遲追蹤**：使用 `ctx.waitUntil` 技術，讓資料紀錄在背景執行，不影響網頁開啟速度。
- **高質感 UI**：內建 Premium 等級的玻璃擬態 (Glassmorphism) 介面。
- **後台管理**：完整的數據報表、即時時效監控與連結產生器。
- **自動清理**：內建 Cron 排程，自動清理超過 7 天的過期資料，保持資料庫輕量。
- **D1 整合**：使用 Cloudflare Native SQLite 引擎，效能卓越。

## 🚀 快速開始

### 1. 建立 D1 資料庫
請到 Cloudflare Dashboard 建立一個名為 `ip-location-db` 的 D1 資料庫，並將產生的 **Database ID** 貼到 `wrangler.toml` 中的 `database_id` 欄位。

### 2. 部署至 Cloudflare
本專案建議使用 GitHub 整合部署：
1. 將代碼推送到您的 GitHub Repository。
2. 在 Cloudflare Workers Dashboard 選擇 **"Deploy from a GitHub repository"** 並連結您的 Repo。
3. 部署完成後，記得到 Worker 的 **Settings > Variables** 中新增 `ADMIN_KEY` 作為機密變數 (Secret)。

### 3. 初始化資料庫
在 Cloudflare Dashboard 的 D1 管理介面，執行 `migrations/0000_init.sql` 中的 SQL 代碼，或使用 Wrangler 執行遷移。

## 🛠️ 使用說明

### 產生追蹤連結
造訪 `https://your-worker.workers.dev/generate`。
瀏覽器將彈出原生登入視窗，帳號可輸入任意值，**密碼填入您設定的 `ADMIN_KEY`** 即可進入。憑證由瀏覽器安全管理，**不會出現在網址列或歷史記錄**。

### 查看紀錄
造訪 `https://your-worker.workers.dev/admin`。
同樣使用 HTTP Basic Auth 驗證，您將看到所有訪問者的 IP、地理位置（國家、城市）及訪問時間。

## 🔒 安全建議
- **必須設定 `ADMIN_KEY`**：請到 Cloudflare Workers 的 **Settings > Variables and Secrets**，新增 `ADMIN_KEY` 為 **Secret** 類型。**若未設定，後台 `/admin` 與 `/generate` 路由將拒絕所有存取。**
- **管理者路徑**：您可以隨時在 `src/index.js` 中修改 `/admin` 或 `/generate` 路徑名稱以增加隱蔽性。
