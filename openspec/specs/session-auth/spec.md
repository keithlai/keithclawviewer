# session-auth Specification

## Purpose
TBD - created by archiving change session-auth-otp. Update Purpose after archive.
## Requirements
### Requirement: UI MUST show login page on first access
#### Scenario: 未 login 訪問 / 顯示 login page，唔係 dashboard
#### Scenario: Login page 有「Send OTP」按鈕，無 auto-send
#### Scenario: Login page 顯示 viewer name + 簡短說明

### Requirement: Send OTP button MUST trigger Discord DM
#### Scenario: 撳「Send OTP」→ POST /api/auth/send-otp → 經 Discord DM 發送 OTP code
#### Scenario: 同一個 OTP channel（Discord bot → DM）唔 auto-send 任何嘢
#### Scenario: 無 auto-send on page load
#### Scenario: Repeated clicks send new OTP（舊 OTP invalidate）

### Requirement: OTP verification MUST create 30-minute session
#### Scenario: POST /api/auth/verify-otp with {otp} 回傳 session token + set cookie
#### Scenario: Session token 係 random string（crypto.randomBytes）
#### Scenario: Session expiry 30 分鐘後
#### Scenario: 30 分鐘後自動 logout，要重新 login

### Requirement: Session middleware MUST protect all routes
#### Scenario: 所有 /api/* routes（除 /api/auth/*）require valid session
#### Scenario: 所有靜態檔（/index.html, /assets/*）require valid session
#### Scenario: Invalid/expired session → 401 + redirect to login

### Requirement: Logout MUST clear session
#### Scenario: POST /api/auth/logout 清除 session cookie
#### Scenario: 前端 redirect 去 login page

### Requirement: Session MUST survive page refresh
#### Scenario: Cookie 用 httpOnly + sameSite:lax，refresh 後保持 login
#### Scenario: 30 分鐘內 refresh 唔使重新 login

