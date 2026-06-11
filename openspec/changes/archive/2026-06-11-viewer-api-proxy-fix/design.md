## Context

config-log-viewer implementation added viewer API endpoints (`/api/gateway/status`, `/api/openclaw/config` etc.) and UI indicator. But they only worked when accessing viewer directly at `localhost:3000`. Through production proxy (Cloudflare → books server port 443 → viewer), the viewer HTML's fetch calls to `/api/...` hit the books server root, which didn't have matching routes → 404 → indicator stuck offline.

## Decisions

1. **Books server gets viewer proxy routes** — add specific route matchers before the generic 404 handler
2. **Nginx gets same routes before gateway catch-all** — same pattern
3. **Error handling** — 502 with JSON when viewer unavailable
4. **No URL prefix change** — viewer keeps using `/api/...` paths; proxy handles routing

## Risks / Trade-offs

- [Route ordering] → viewer routes placed before generic `/api/` in both books server and nginx
- [Duplicate maintenance] → both nginx and books server need updates if new viewer API routes added
