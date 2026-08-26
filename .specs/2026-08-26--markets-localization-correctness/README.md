# Feature: Correct Markets and Localization Documentation

| Field | Value |
| --- | --- |
| **Status** | implemented |
| **Owner** | @paul-phan |
| **Created** | 2026-08-26 |
| **Last Updated** | 2026-08-26 |
| **Branch** | `docs/markets-localization-correctness` |

## Problem

The public localization guides describe several behaviors that the verified Pilot implementation does not use: locale-shaped path parsing instead of an exact market allowlist, duplicated locale configuration, unconditional `en-us` fallback, and ad hoc locale selection in each loader. They also omit production-critical Shopify Markets verification, route continuity, SEO constraints, translation precedence, RTL, Customer Account logout URIs, and Translation Manager synchronization.

## User Outcome

A theme developer can configure only the markets the store actually serves, route every localized surface from one canonical market table, preserve the active market through navigation and commerce flows, and deploy without publishing invented routes or silently serving Shopify's default market.

## Acceptance Criteria

- [x] One canonical market configuration is shown as the source for URL prefixes, provider contexts, links, redirects, cart and checkout, document language/direction, SEO, and sitemaps.
- [x] The guides require exact allowlisting: unsupported locale-shaped prefixes return 404, while ordinary content slugs remain valid.
- [x] Shopify Admin enablement and read-back verification are required for every configured country, language, and currency combination.
- [x] Locale switching preserves valid paths and queries, and performs a document navigation so stale Weaverse data is not reused.
- [x] Redirects and React Router data routes preserve the active market.
- [x] `hreflang` is emitted only for routes known to have equivalents; uncertain alternates are omitted.
- [x] Static translations and merchant overrides are distinguished; explicit empty values are preserved. Verified Studio preview precedence is documented.
- [x] RTL `dir`, per-market Customer Account logout URIs, and post-deploy Translation Manager synchronization are included.
- [x] AI-agent guidance documents scope-limited Admin API Proxy access for accepted Shopify/content tokens, rejects `agent_cli`, protects the credential, requires read-before-write/read-back, and stops at a clear handoff when an exact Shopify operation or scope is unverified.
- [x] Stale `en-us` fallback, loose path parsing, and duplicated market configuration examples are removed or corrected.
- [x] Examples use a small illustrative market list, not Pilot's full reference table.
- [x] Existing page routes and navigation remain unchanged.
- [x] Mintlify startup, parsed/rendered pages, internal links, diff whitespace, and committed-range secret scanning pass.

## Evidence Boundary

The implementation contract is grounded in Pilot's released localization work at `6fd2f438` and its code/tests. The local follow-up `9010a4ee` is used only for the tested live Studio design-override precedence. AI-agent capabilities are limited to the mounted Weaverse MCP, Content API, and Builder Admin API Proxy contracts. A shop-scoped Shopify or Content API token can proxy Shopify Admin GraphQL only through the connected Weaverse app installation and its granted Shopify scopes; `agent_cli` is rejected. Shopify, Weaverse, Customer Account, DNS, and deployment state are not changed by this documentation work.

## Out of Scope

- Publishing Pilot's full reference market table as a recommended configuration.
- Adding another public localization page or changing navigation.
- Changing Pilot, Builder, Shopify, Weaverse, Customer Account, or deployment configuration.
- Promising equivalent localized routes that the application cannot prove exist.
- Claiming a Shopify Markets or Customer Account mutation exists without an exact verified current Admin GraphQL operation.

## Follow-up: Sanitizer-Safe Authorization Examples

The committed Admin API Proxy TypeScript example exposed a credential-redaction corruption pattern shared by other runtime examples. The follow-up keeps each verified scheme but avoids interpolating credentials inside an `Authorization` template literal.

- [x] All 14 JavaScript/TypeScript Bearer examples build the value with `['Bearer', token].join(' ')` or the local double-quote equivalent.
- [x] The Klaviyo event example uses `['Klaviyo-API-Key', token].join(' ')`, matching Klaviyo's current Create Event OpenAPI security scheme.
- [x] Intentional shell placeholders and Python Bearer f-strings remain unchanged.
- [x] A repository-wide Markdown/MDX scan finds no interpolated or three-asterisk runtime `Authorization` value.
- [x] Every touched public page renders through Mintlify, and all touched-page internal links resolve.
