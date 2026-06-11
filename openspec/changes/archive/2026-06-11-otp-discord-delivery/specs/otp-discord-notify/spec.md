# otp-discord-notify Specification

## Purpose
Send OTP codes via Discord DM to the authorized user for command execution verification.

## ADDED Requirements

### Requirement: OTP MUST be sent via Discord DM
#### Scenario: POST /api/command/request 觸發後自動 send DM
#### Scenario: DM 包含 OTP code、command 內容、expiry info
#### Scenario: 用 Discord Bot API（REST），唔靠第三方 service

### Requirement: Discord token MUST be read from OpenClaw config
#### Scenario: 由 openclaw.json → channels.discord.token 讀取
#### Scenario: Token 不存在時 fallback 到 console.log + return false

### Requirement: Delivery MUST be logged
#### Scenario: `~/.openclaw/logs/otp-send.log` record each send attempt
#### Scenario: Log 包含 timestamp、OTP、target user、Discord API status
#### Scenario: 任何 error 都有 log（config missing、API error、network error）

### Requirement: Target user MUST be hardcoded
#### Scenario: DM 發送俾 Discord user ID 391967026329157643
