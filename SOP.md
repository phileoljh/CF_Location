# SOP - 標準作業程序 (Standard Operating Procedure)

## 1. 環境設定
- **GitHub 連結**：本專案已設定完畢，推送到 GitHub `main` 分支後，Cloudflare 會自動觸發部署。
- **WRANGLER 設定**：本地端無需安裝專用環境，但 `wrangler.toml` 必須包含正確的 `database_id`。

## 2. 部署流程 (新資料庫)
當您在 Cloudflare 帳後下建立資料庫後，需執行以下步驟：
1. **執行 SQL 初始腳本**：
   - 到 D1 介面的「Console」分頁。
   - 複製 `migrations/0000_init.sql` 的內容並執行。
2. **設定變數**：
   - 到 Worker 的「Settings」->「Variables」。
   - 新增 `ADMIN_KEY` (加密的 Secret)。

## 3. 日常維護
- **檢視紀錄**：定期檢查 `/admin?key=...` 頁面。
- **自動清理**：系統每 24 小時會自動執行一次清理，刪除 7 天前的舊資料。您可以在 Cloudflare Worker 的「Logs」介面搜尋 `正在執行自動清理程序` 來確認排程是否運作。
- **修復錯誤**：若資料庫查詢失敗，通常是因為 `wrangler.toml` 中的 `binding = "DB"` 與面板設定不符。

## 4. 變更管理
- **修改 UI**：請編輯 `src/ui.js`，修改後推送到 GitHub 即可更新。
- **修改路由**：若要更改後台路徑，請編輯 `src/index.js` 中的 `if (path === "/admin")` 部分。
