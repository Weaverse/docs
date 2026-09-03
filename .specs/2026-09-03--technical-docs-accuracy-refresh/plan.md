# Implementation Plan — Technical Documentation Accuracy Refresh

## Problem

Vivienne's candidate contains useful Content API and SDK/CLI corrections, but it predates current docs main and carries a dated spec whose branch and evidence references no longer describe this audit.

## Decision

Use current production implementation as authority. Port the four focused Content API references, make only the associated technical corrections in existing pages, preserve current main, and move this spec to the current date with current branch and evidence references.

## Files

| File | Change |
| --- | --- |
| `content-api/delete-pages.mdx` | Add selector precedence, assignment deletion behavior, and safety guidance. |
| `content-api/public-custom-pages.mdx` | Add public route metadata, `cursor` pagination, limits, caching, and publication-state warning. |
| `content-api/update-project.mdx` | Document the supported name-only update. |
| `content-api/update-theme-settings.mdx` | Document shallow merge and best-effort deduplicated snapshots. |
| `content-api/get-page.mdx` | Add schema-default resolution and exact fallback order. |
| `content-api/overview.mdx` | Link the new references and remove unsupported snapshot/live-timing guarantees. |
| `api-reference/types.mdx` | Clarify `createSchema` typing, asynchronous warning validation, and component-module export shape. |
| `development-guide/component-schema.mdx` | Replace build-time/throwing validation claims and mark `settings` optional. |
| `getting-started/installation.mdx` | Clarify interactive startup and make `npm run dev` the deterministic next step. |
| `intro/quickstart.mdx` | Make CLI startup behavior and the explicit next command accurate. |
| `docs.json` | Add the four new Content API pages once. |
| `.specs/2026-09-03--technical-docs-accuracy-refresh/README.md` | Record current scope, status, branch, evidence, and acceptance. |
| `.specs/2026-09-03--technical-docs-accuracy-refresh/plan.md` | Record this minimal implementation and validation plan. |

## Validation

1. Inspect the final diff and changed-path list.
2. Run `git diff --check`.
3. Parse `docs.json` with Python stdlib.
4. Verify each navigation target resolves, with no duplicate new entry.
5. Confirm the diff remains inside the 13-file audit scope.

The parent audit independently covered `mint broken-links` and previewed the ten changed MDX routes. This pass intentionally does not duplicate those broader checks.

## Out of Scope

- The separate 32-file `7cb9b84c90992863e6c3c06d0901e737ef2da245` pass.
- Notion screenshot auditing or editing.
- Product fixes, new tooling, dependencies, generated artifacts, broad formatting, commits, publishing, deployment, or PR work.
