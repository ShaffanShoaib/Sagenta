---
id: T-009
epic: EPIC-002
title: Create Authentication Middleware for Protected Routes
status: todo
priority: high
complexity: M
commits: []
blocked_by: []
blocks: []
tags:
  - auth
  - server
  - ADR-6212-auth-service/middleware/auth
created_at: 2026-06-07T11:34:19.141Z
updated_at: 2026-06-07T11:34:19.141Z
arch_layer: cross-cutting
risk_level: high
requires_migration: false
requires_env_var: []
test_strategy: integration
depends_on:
  - T-008
---

# Create Authentication Middleware for Protected Routes

## Description
Develop a middleware function to protect API routes by verifying the presence and validity of access tokens.

## Acceptance Criteria
- [ ] An `authenticateJWT` middleware function is implemented.
- [ ] Middleware extracts JWT from the `Authorization` header.
- [ ] If the token is valid, `req.user` is populated with the decoded payload.
- [ ] If the token is invalid or missing, a 401 Unauthorized response is returned.
- [ ] The middleware is applied to at least one sample protected route (e.g., `/api/profile`).

## Linked Modules
- `auth`
- `server`
- `ADR-6212-auth-service/middleware/auth`
