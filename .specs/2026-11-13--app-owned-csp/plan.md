# Plan

1. Rewrite `features/content-security.mdx` from Pilot's merged `app/utils/csp.ts`, `app/weaverse/csp.ts`, `app/entry.server.tsx`, `app/entry.client.tsx`.
2. Replace the CSP quick fixes in `troubleshooting/preview-errors.mdx` with Studio's required sources and the `script-src` pitfall.
3. Align other pages that show Hydrogen's CSP helpers or Pilot's old `getWeaverseCsp`.

## Files Touched

- `features/content-security.mdx`
- `troubleshooting/preview-errors.mdx`
- `intro/project-structure.mdx` (Pilot `entry.server.tsx`)
- `migration-advanced/existing-hydrogen-integration.mdx` (old `scriptSrc` bug from pilot#170, Hydrogen helpers)
- `migration-advanced/v5-migration.mdx` (note only; the step documents the Hydrogen 2026.4-era API)
- `development-guide/customer-account-local-dev.mdx` (tunnel domain goes in `getWeaverseCsp`)
- `.specs/2026-11-13--app-owned-csp/`

Not changed: `features/analytics-tracking.mdx`, `features/cookie-consent-banner.mdx` (call `useNonce()` without showing an import), `development-guide/design-mode.mdx` (generic `frameAncestors` snippet), changelog entries.

## 2026-11-13 Follow-up

Superseded by the Hydrogen 2026.10.3 setup (`createContentSecurityPolicy({ nonce: false, shop, directives })` plus `getWeaverseStudioCspDirectives`). The rewrite and the pages it touches are listed in `.specs/2026-11-13--sdk-6-3-audit-fixes/plan.md`.
