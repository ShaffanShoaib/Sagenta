---
id: T-007
epic: EPIC-002
title: Create refresh token endpoints
status: completed
priority: medium
complexity: M
commits: []
blocked_by: []
blocks: []
tags:
  - auth-service
created_at: 2026-05-05T16:44:55.516Z
updated_at: 2026-05-06T17:46:00.000Z
arch_layer: service
risk_level: medium
requires_migration: false
requires_env_var: []
test_strategy: unit
depends_on:
  - T-006
---

# Create refresh token endpoints

## Description
Implement endpoints for rotating refresh tokens to maintain long-lived user sessions without exposing access tokens indefinitely.

## Acceptance Criteria
- [x] Refresh token generation and verification are implemented.
- [x] `/auth/refresh` endpoint is created and functional.
- [x] Tokens are stored securely in HTTP-only cookies.

## Linked Modules
- `auth-service`
