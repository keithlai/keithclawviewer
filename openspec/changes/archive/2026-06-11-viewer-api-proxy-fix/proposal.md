## Why

config-log-viewer implementation 完成後發現 viewer API routes 喺生產環境唔 work。原因係 books server (port 443) 同 nginx 嘅 proxy routing 唔完整 — viewer API calls (`/api/gateway/status` etc.) 去錯 backend，令 gateway status indicator 長期顯示 offline。

## What Changes

- Books server (port 443): 新增 viewer API proxy routes before catch-all 404
- Nginx (port 80): 新增 viewer API 專用 routes，放喺 `/api/` catch-all 之前
- Viewer HTML: fix `switchTab('admin')` → `switchTab('monitor')` bug

## Capabilities

### New Capabilities
- (none)

### Modified Capabilities
- `gateway-status-monitor`: 修正 API routing 令 indicator 正確顯示 online/offline
- `openclaw-config-reader`: 修正 API routing 令 config endpoint 經 proxy 可達

## Impact

- `books/server.js` — 新增 7 條 viewer API proxy routes
- nginx conf — 新增 7 條 viewer API proxy routes before `/api/` catch-all
- `container/public/index.html` — fix 1-line tab name bug
