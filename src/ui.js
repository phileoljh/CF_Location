/**
 * IP Location Tracker - UI Templates
 * 所有頁面均採用現代化 Premium 設計，包含響應式佈局與玻璃擬態視覺效果。
 */

const COMMON_HEAD = `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #6366f1;
      --primary-hover: #4f46e5;
      --bg-dark: #0f172a;
      --card-bg: rgba(30, 41, 59, 0.7);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --border: rgba(255, 255, 255, 0.1);
      --glass: rgba(255, 255, 255, 0.05);
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Inter', sans-serif;
      background: var(--bg-dark);
      color: var(--text-main);
      overflow-x: hidden;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    h1, h2, h3 { font-family: 'Outfit', sans-serif; font-weight: 600; }
    .bg-gradient {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background: radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.15) 0%, transparent 40%),
                  radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.15) 0%, transparent 40%);
      z-index: -1;
    }
    .glass-card {
      background: var(--card-bg);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 2.5rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      width: 90%;
      max-width: 500px;
      text-align: center;
      animation: fadeIn 0.8s ease-out;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .btn {
      display: inline-block;
      background: var(--primary);
      color: white;
      padding: 0.8rem 1.5rem;
      border-radius: 10px;
      text-decoration: none;
      font-weight: 500;
      transition: all 0.3s ease;
      border: none;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
    }
    .btn:hover { background: var(--primary-hover); transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3); }
    .input-group { margin-bottom: 1.5rem; text-align: left; }
    label { display: block; margin-bottom: 0.5rem; color: var(--text-muted); font-size: 0.9rem; }
    input {
      width: 100%;
      background: var(--glass);
      border: 1px solid var(--border);
      padding: 0.8rem 1rem;
      border-radius: 8px;
      color: white;
      font-size: 1rem;
      outline: none;
    }
    input:focus { border-color: var(--primary); }
  </style>
`;

export const LandingPage = () => `
<!DOCTYPE html>
<html>
<head>
  <title>歡迎來到未來科技</title>
  ${COMMON_HEAD}
</head>
<body>
  <div class="bg-gradient"></div>
  <div class="glass-card">
    <div style="background: var(--primary); width: 60px; height: 60px; border-radius: 15px; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center;">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
    </div>
    <h1>探索數位邊界</h1>
    <p style="color: var(--text-muted); margin: 1rem 0 2rem; line-height: 1.6;">
      正在為您同步雲端資源... 請稍候，我們將引導您進入專屬的數位體驗空間。
    </p>
    <div style="width: 100%; height: 4px; background: var(--glass); border-radius: 2px; overflow: hidden;">
      <div style="width: 60%; height: 100%; background: var(--primary); animation: progress 2s infinite ease-in-out;"></div>
    </div>
    <style>
      @keyframes progress {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(200%); }
      }
    </style>
  </div>
</body>
</html>
`;

export const AdminDashboard = (logs) => `
<!DOCTYPE html>
<html>
<head>
  <title>追蹤紀錄後台</title>
  ${COMMON_HEAD}
  <style>
    body { justify-content: flex-start; padding: 2rem 0; }
    .container { width: 95%; max-width: 1200px; animation: fadeIn 0.5s ease-out; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
    .stat-card { background: var(--card-bg); padding: 1.5rem; border-radius: 15px; border: 1px solid var(--border); }
    .stat-val { font-size: 2rem; font-family: 'Outfit'; color: var(--primary); }
    .stat-label { color: var(--text-muted); font-size: 0.9rem; }
    .table-card { background: var(--card-bg); border-radius: 15px; border: 1px solid var(--border); overflow: hidden; }
    table { width: 100%; border-collapse: collapse; text-align: left; }
    th { background: rgba(0,0,0,0.2); padding: 1rem; font-weight: 500; color: var(--text-muted); border-bottom: 1px solid var(--border); }
    td { padding: 1rem; border-bottom: 1px solid var(--border); font-size: 0.9rem; }
    tr:hover { background: rgba(255,255,255,0.02); }
    .badge { padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.75rem; background: var(--glass); border: 1px solid var(--border); }
  </style>
</head>
<body>
  <div class="bg-gradient"></div>
  <div class="container">
    <div class="header">
      <h1>追蹤數據回報</h1>
      <a href="/generate" class="btn" style="font-size: 0.8rem;">產生新連結</a>
    </div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">總訪問量</div>
        <div class="stat-val">${logs.length}</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">近 24 小時</div>
        <div class="stat-val">${logs.filter(l => new Date(l.created_at) > new Date(Date.now() - 86400000)).length}</div>
      </div>
    </div>

    <div class="table-card">
      <div style="overflow-x: auto;">
        <table>
          <thead>
            <tr>
              <th>時間</th>
              <th>識別碼</th>
              <th>IP</th>
              <th>國家/城市</th>
              <th>系統資訊</th>
            </tr>
          </thead>
          <tbody>
            ${logs.map(log => `
              <tr>
                <td style="white-space: nowrap;">${new Date(log.created_at).toLocaleString('zh-TW')}</td>
                <td><span class="badge">${log.track_id}</span></td>
                <td><code style="color: var(--primary)">${log.ip}</code></td>
                <td>${log.country} / ${log.city}</td>
                <td style="max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; color: var(--text-muted); font-size: 0.8rem;" title="${log.user_agent}">
                  ${log.user_agent}
                </td>
              </tr>
            `).join('')}
            ${logs.length === 0 ? '<tr><td colspan="5" style="text-align: center; padding: 3rem; color: var(--text-muted);">尚無追蹤紀錄</td></tr>' : ''}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const GeneratorPage = () => `
<!DOCTYPE html>
<html>
<head>
  <title>連結產生器</title>
  ${COMMON_HEAD}
</head>
<body>
  <div class="bg-gradient"></div>
  <div class="glass-card">
    <h2 style="margin-bottom: 0.5rem;">追蹤連結產生器</h2>
    <p style="color: var(--text-muted); margin-bottom: 2rem; font-size: 0.9rem;">輸入或產生亂數識別碼，建立隱形追蹤網址</p>
    
    <div class="input-group">
      <label>識別碼 (Track ID)</label>
      <div style="display: flex; gap: 0.5rem;">
        <input type="text" id="trackId" placeholder="例如: user_001" style="flex: 1;">
        <button onclick="generateRandom()" class="btn" style="padding: 0.8rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path><path d="M3 22v-6h6"></path><path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path></svg>
        </button>
      </div>
    </div>

    <button onclick="buildUrl()" class="btn" style="width: 100%; margin-bottom: 1.5rem;">產生追蹤連結</button>

    <div id="resultBox" style="display: none; animation: fadeIn 0.3s ease;">
      <label>您的追蹤網址：</label>
      <div style="background: var(--glass); padding: 1rem; border-radius: 10px; border: 1px dashed var(--primary); word-break: break-all; margin-bottom: 1rem; text-align: left; font-family: monospace; color: var(--primary);" id="generatedUrl"></div>
      <button onclick="copyToClipboard()" class="btn" style="background: rgba(255,255,255,0.1); width: 100%;">複製連結</button>
    </div>
  </div>

  <script>
    function generateRandom() {
      const rand = Math.random().toString(36).substring(2, 10);
      document.getElementById('trackId').value = 'id_' + rand;
    }
    
    function buildUrl() {
      const id = document.getElementById('trackId').value;
      if (!id) return alert('請輸入識別碼');
      const url = window.location.origin + '/?track_id=' + encodeURIComponent(id);
      document.getElementById('generatedUrl').innerText = url;
      document.getElementById('resultBox').style.display = 'block';
    }

    function copyToClipboard() {
      const text = document.getElementById('generatedUrl').innerText;
      navigator.clipboard.writeText(text).then(() => alert('已複製到剪貼簿！'));
    }
  </script>
</body>
</html>
`;
