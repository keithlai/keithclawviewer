## 1. Books Server Proxy Routes

- [x] 1.1 Add viewer API proxy block in `books/server.js` before dashboard proxy and 404
- [x] 1.2 Handle proxy error with 502 JSON response

## 2. Nginx Proxy Routes

- [x] 2.1 Add viewer API location blocks before `/api/` catch-all in nginx.conf
- [x] 2.2 Reload nginx config

## 3. Viewer HTML Fix

- [x] 3.1 Fix `switchTab('admin')` → `switchTab('monitor')` in index.html

## 4. Verification

- [x] 4.1 Restart books server + viewer
- [x] 4.2 Test `/api/gateway/status` through books server returns 200 + online
- [x] 4.3 Test `/api/logs` through books returns 200
- [x] 4.4 Test `/api/system/health` through books returns 200
- [x] 4.5 Test `/viewer` still works through books
- [x] 4.6 Test all endpoints through nginx (port 80)

## 5. Git & Archive

- [x] 5.1 Git add + commit: books server fix
- [x] 5.2 Git add + commit: viewer html fix
- [ ] 5.3 Push to GitHub
- [ ] 5.4 Run `openspec archive viewer-api-proxy-fix`
