## Why

龍蝦內視鏡而家可以讀 OpenClaw logs，但欠缺 config 瀏覽同 gateway 健康狀態顯示。Config 睇到先方便 remote debug，gateway status 即時知道 backend 著唔著。

## What Changes

- 新增 `/api/openclaw/config` endpoint，load `~/.openclaw/openclaw.json`
- 新增 `/api/gateway/status` endpoint，ping gateway health check
- UI 加入 gateway status indicator（綠色 dot = online）
- UI Admin tab 改名 Monitor，整合 gateway + podman status

## Capabilities

### New Capabilities
- `openclaw-config-reader`: 讀取 OpenClaw config (`openclaw.json`) 並經 API expose
- `gateway-status-monitor`: 監控 OpenClaw gateway (port 18789) 健康狀態，UI 顯示 online/offline

### Modified Capabilities
- (none — 現有 specs 無需改 spec-level requirements)

## Impact

- `run-native.js` — 新增 `/api/openclaw/config` 同 `/api/gateway/status` routes
- `container/public/index.html` — 新增 gateway status dot、tab name change to Monitor
- 現有 `/api/logs`、`/api/system/health` 不受影響
- Config content 經 API serve，唔寫入 disk
