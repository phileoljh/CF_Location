# 專案需求文件 (Need.md)

## 1. 專案目標
架設一個基於 Cloudflare Workers 的「地理位置追蹤連結」系統。透過帶有特殊識別碼的網址，在不干擾使用者體驗（無須觸發 GPS 授權）的情況下，自動判斷並記錄其 IP 地理位置，同時呈現一個外觀精美的「正常網頁」。

## 2. 核心功能需求
- **識別碼擷取**：從 URL 參數中提取 `track_id`（例如 `?track_id=user123`）。
- **網址產生器**：具備一個功能或頁面，能自動產生帶有隨機亂數識別碼的追蹤 URL。
- **靜默定位**：利用 Cloudflare 內建的 `request.cf` 物件擷取使用者資訊：
    - IP 位址 (`cf-connecting-ip`)
    - 國家 (Country)
    - 地區 (Region)
    - 城市 (City)
    - 經緯度 (Longitude/Latitude)。
- **持久化紀錄 (D1)**：
    - 將追蹤資料寫入 Cloudflare D1 關聯式資料庫。
    - 包含：識別碼、IP、地理位置、時間戳記。
- **紀錄檢視頁面**：
    - 提供一個後台網頁，用於列出並檢視所有已記錄的位置資料。
- **自動清理機制**：
    - 設定排程（Cron Trigger），自動刪除超過 7 天的過期紀錄。
- **內容呈現策略**：
    - **偽裝網頁**：回傳一個高品質、響應式（Responsive）且視覺精美的 HTML 頁面。

## 3. 技術規格
- **執行環境**：Cloudflare Workers (Runtime: Service Worker / ES Modules)。
- **資料庫**：Cloudflare D1 (SQLite 引擎)。
- **自動化排程**：Cloudflare Workers Cron Triggers (`scheduled` event)。
- **開發工具**：Wrangler CLI, Git, GitHub Actions (CI/CD)。

## 4. 視覺與體驗要求 (Aesthetics)
- 偽造的「正常網頁」必須具備現代化設計。
- 使用高品質字體（如 Google Fonts - Inter/Outfit）。
- 包含流暢的微動畫與漸層色彩，營造 Premium 感，避免看起來像詐騙或測試頁。

## 5. 待辦事項 (Initial TODO)
- [ ] 初始化 Cloudflare Workers 專案。
- [ ] 實作核心追蹤邏輯。
- [ ] 設計並整合「正常網頁」的 HTML/CSS。
- [ ] 設定本地開發與部署環境。
- [ ] (後續) 整合 D1 資料庫儲存紀錄。
