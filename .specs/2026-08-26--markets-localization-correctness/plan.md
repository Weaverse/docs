# Implementation Plan — Markets and Localization Documentation Correctness

## Decision

Update the two canonical localization pages, remove directly conflicting localization examples from the rendering guide, and reconcile the existing Admin API Proxy page with mounted Builder source. Keep one small market configuration example. Do not add a public page, navigation entry, runtime dependency, or theme abstraction.

## Requirement-to-Evidence Matrix

| Requirement | Verified Pilot evidence | Documentation change |
| --- | --- | --- |
| One market authority | `app/utils/locale.ts`: `SUPPORTED_LOCALES`, `providerContextForRequest`, `localizePath`, `alternateLinks`; `app/weaverse/schema.server.ts` derives `shopLocales` | Make a single market table the first implementation step and list every consumer it drives. |
| Exact URL allowlist | `server.ts` returns 404 through `isUnsupportedMarketPath`; `tests/unit/locale.test.ts` covers invented prefixes and ordinary slugs | Reject unsupported exact `xx-yy` leading segments without treating locale-like text elsewhere as a market. |
| Shopify enablement | Pilot spec work log records Shopify silently serving defaults for accepted but disabled combinations | Require Admin enablement plus Storefront read-back of country, language, and currency before launch. |
| Safe locale switch | `use-country-selector.ts` uses `localizePath(delocalizePath(pathname) + search)`; `market-form.tsx` uses `reloadDocument`; tests cover path/query | Preserve valid path/query and use a document navigation to avoid stale Weaverse data. |
| Redirect/data continuity | `market-redirect.ts`, `safe-redirect.ts`, localized cart redirects, and `.data` tests preserve market paths and single-fetch semantics | Route redirects through shared helpers and keep the active prefix on document and data requests. |
| Honest alternates | `alternateLinks` is restricted by `MARKET_INVARIANT_PATHS`; SEO and sitemap tests cover known equivalents | Emit canonical URLs for the active page; emit `hreflang` only for proven route equivalents. |
| Translation precedence | Released `localizedThemePayload` and `legacyThemeText` preserve merchant override provenance and explicit `""`; local `9010a4ee` tests live `designOverrides` | Explain static bundles versus merchant overrides and precedence: live Studio design override, persisted Translation Manager override, genuine legacy setting, static market translation. |
| RTL/logout/sync | `root.tsx` sets `lang`/`dir`; localized logout route/test; Pilot deployment prerequisites require allowed logout URIs and Translation Manager sync/publish | Add a concise deployment checklist covering all three. |
| AI-agent boundary | Mounted Builder source accepts only `shopify` and `content_api` tokens at `POST /api/admin-graphql`, rejects `agent_cli`, proxies through the connected app installation's granted scopes, limits each token to 1,000 requests/hour, applies a 15-second query timeout, returns Shopify's data object directly, maps top-level GraphQL errors to sanitized `500`, and preserves mutation `userErrors` in HTTP 200 data. | Store the key in an untracked `0600` server env, read identity and installed scopes first, require a reviewed mutation plan and point-of-risk approval, treat proxy failures and mutation `userErrors` as failure, prefer idempotent writes, read back exact state, and hand off any unproved Shopify operation. |
| Remove stale guidance | Current docs claim unconditional `en-us` fallback, loose first-segment parsing, and repeated locale decisions | Replace with the canonical request-context contract and remove duplicated rendering-guide recipes. |

## File Plan

| File | Change |
| --- | --- |
| `features/markets-localization.mdx` | Task-oriented setup, Studio/translation behavior, AI-agent authorization boundary, Shopify handoff, and deployment checks. |
| `features/admin-api-proxy.mdx` | Correct token types, installation-scope semantics, rate/timeout behavior, GraphQL errors, and safe server-side automation. |
| `guides/localization-advanced.mdx` | Canonical runtime contract for routing, context, continuity, SEO, and precedence. |
| `guides/rendering-page.mdx` | Replace conflicting locale recipes with a short link to the canonical guide; correct the Pilot routing boundary example. |
| `.specs/2026-08-26--markets-localization-correctness/*` | Record scope, evidence, decisions, and verification. |

`docs.json` stays unchanged because all three pages already have one navigation entry.

## Verification

1. Parse frontmatter and MDX through Mintlify startup.
2. Confirm every edited internal route resolves to an existing page.
3. Open the edited pages in the local preview and inspect their rendered output and browser console.
4. Run `git diff --check`.
5. Commit once, then scan the committed range for secrets.
6. Confirm `.gitignore` remains untracked and has SHA-256 `2b78ca28b3b8fee75879a2e6e4b3c5b97508e0416a7489111ca1efed3e41531d`.
