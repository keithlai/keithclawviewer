# gateway-status-monitor Specification

## Purpose
TBD - created by archiving change config-log-viewer. Update Purpose after archive.
## Requirements
### Requirement: API MUST check gateway health
#### Scenario: GET /api/gateway/status 回傳 { color: "green"|"grey", status: "Online"|"Offline" }
#### Scenario: Gateway healthy when HTTP GET http://127.0.0.1:18789/overview returns 200
#### Scenario: Any other response or fetch error → color: "grey", status: "Offline"

### Requirement: UI MUST show gateway status
#### Scenario: App bar 顯示 status dot 並正確反映 online/offline（經 proxy 修正）
#### Scenario: Monitor tab 正確 load Podman Status 同 Ops Manual（switchTab fix）

### Requirement: Monitor Tab MUST show gateway + podman status
#### Scenario: Admin tab 改名為 Monitor
#### Scenario: Monitor tab 顯示 Gateway Status（online/offline）
#### Scenario: Monitor tab 顯示 Podman Status（原有功能）

