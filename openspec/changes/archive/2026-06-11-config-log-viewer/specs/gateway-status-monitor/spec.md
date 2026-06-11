# gateway-status-monitor Specification

## Purpose
Monitor OpenClaw gateway (port 18789) health status and display online/offline indicator in the Viewer UI.

## ADDED Requirements

### Requirement: API MUST check gateway health
#### Scenario: GET /api/gateway/status 回傳 { color: "green"|"grey", status: "Online"|"Offline" }
#### Scenario: Gateway healthy when HTTP GET http://127.0.0.1:18789/overview returns 200
#### Scenario: Any other response or fetch error → color: "grey", status: "Offline"

### Requirement: UI MUST show gateway status
#### Scenario: App bar 顯示 status dot（8px circle）
#### Scenario: Green (#2ecc71) = Online, Grey (#666) = Offline
#### Scenario: Label 顯示 "Online" 或 "Offline"
#### Scenario: Polling every 15s via setInterval

### Requirement: Monitor Tab MUST show gateway + podman status
#### Scenario: Admin tab 改名為 Monitor
#### Scenario: Monitor tab 顯示 Gateway Status（online/offline）
#### Scenario: Monitor tab 顯示 Podman Status（原有功能）
