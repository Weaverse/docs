# Plan: Fix the Docs for @weaverse/hydrogen 6.3

## Problem

The #151 audit found the docs behind the shipped SDK: CSP guidance for Pilot's removed `app/utils/csp.ts`, a `loadPage()` contract that says "null" where the SDK returns a fallback page, cache and preview promises the SDK doesn't keep, 6.1 version pins, samples that don't type-check, undocumented 6.x exports, outdated CLI docs, and unlisted pages that still publish.

## Sources of Truth

- `@weaverse/hydrogen` / `@weaverse/react` 6.3.1 and `@weaverse/schema` 0.20.1 (npm tarballs and SDK tag `v6.3.1`), `@weaverse/cli` 5.9.0.
- `@shopify/hydrogen` 2026.10.3 types (`createContentSecurityPolicy`, deprecated `i18n` and `createShopifyRouteTemplates`).
- Pilot `main` (`app/entry.server.tsx`, `app/weaverse/csp.ts`, `app/.server/context.ts`, `app/routes.ts`, `app/routes/seo/sitemap-weaverse.xml.ts`).
- Forward `main` (`src/lib/security/content-security-policy.ts`, `src/lib/weaverse/server.ts`).
- `Weaverse/shopify-hydrogen-skills` `main` (13 skills).

## Approach

1. CSP (#157): rewrite `features/content-security.mdx` around `createContentSecurityPolicy({ nonce: false, shop, directives })` and `getWeaverseStudioCspDirectives(request)` with the 2026.10.3 / 6.3.0 floors, and propagate it to every page that showed `useNonce`, `app/utils/csp.ts` or `frame-ancestors *`. New reference page for the helper; Next.js reference and Studio page get the Forward setup.
2. Contracts (#157): `loadPage()` fallback page vs `null` vs `WeaverseLoadError`; the Next `loadWeaversePage` filters `fallback_page_` outside design mode until the SDK has a "no page" signal (Weaverse/weaverse#597); synchronous React Router `projectId`; `fetchCustomPages` is not published-only; Pilot's custom-page sitemap; default API proxy bypasses the local cache; Next `no-store` only in design mode and revision preview; `WEAVERSE_API_KEY` leaks into loader data until Weaverse/weaverse#517.
3. Versions and samples (#158): 6.3.1 / `>=2026.10.3`, v5 guide pinned to v5 releases, compiling samples (`ref` prop, real input types, `authorProfilePhoto`, `WeaverseImage`, settings groups, route props), `storefront.locale`, `enabled`, no `forwardRef`.
4. Tools and reference (#158): CLI `migrate v6`, `forward`, `--pass`; Shopify CLI commands that exist; all 13 skills; pages for `useStudioSelection`, `WeaverseLoadError`, `useTranslation`; `WeaverseThemeSchema.outline`; Next server-client options.
5. Site hygiene (#159): `.mintignore`, `v6.x` label, delete unlisted pages behind redirects, repoint links, fix the broken anchor.

## Out of Scope

- `changelog/`.
- SDK, Pilot and Forward code changes (CF-02 route `projectId` mismatch, CF-10/11/12 Forward gaps, the "no page" signal: Weaverse/weaverse#597).
- Unverified audit items: Workers `future.v8_viteEnvironmentApi` and custom-domain DNS records.

## Files Touched

- Site: `.mintignore`, `docs.json` (version label, nav for 4 new pages, 15 redirects), `AGENTS.md`.
- Deleted (redirected): `development.mdx`, `getting-started/index.mdx`, `core-concepts/index.mdx`, `development-guide/index.mdx`, `features/index.mdx`, `api-reference/index.mdx`, `developer-tools/index.mdx`, `community/index.mdx`, `snippets/snippet-intro.mdx`.
- New: `api-reference/get-weaverse-studio-csp-directives.mdx`, `api-reference/use-studio-selection.mdx`, `api-reference/use-translation.mdx`, `api-reference/weaverse-load-error.mdx`.
- `api-reference/`: `types.mdx`, `use-parent-instance.mdx`, `weaverse-client.mdx`.
- `developer-tools/`: `shopify-hydrogen-skills.mdx`, `weaverse-cli.mdx`, `weaverse-sdks.mdx`.
- `development-guide/`: `component-schema.mdx`, `creating-components.mdx`, `data-connectors.mdx`, `design-mode.mdx`, `environment-setup.mdx`, `input-settings.mdx`, `styling-theming.mdx`, `weaverse-component.mdx`.
- `features/`: `analytics-tracking.mdx`, `content-security.mdx`, `cookie-consent-banner.mdx`, `custom-pages.mdx`, `custom-routing.mdx`, `custom-templates.mdx`, `markets-localization.mdx`, `mobile-app-pwa.mdx`, `page-seo.mdx`, `third-party-integrations.mdx`.
- `guides/`: `deployment/vercel.mdx`, `multi-project-architecture.mdx`, `rendering-page.mdx`.
- `hydrogen-integrations/`: `judgeme-reviews.mdx`, `trustpilot-reviews.mdx`, `yotpo-reviews.mdx`.
- `intro/`: `how-it-works.mdx`, `project-structure.mdx`, `quickstart.mdx`; `getting-started/installation.mdx`; `hydrogen-themes/index.mdx`; `ecosystem/index.mdx`.
- `migration-advanced/`: `existing-hydrogen-integration.mdx`, `index.mdx`, `v5-migration.mdx`, `v6-migration.mdx`.
- `nextjs/`: `api-reference.mdx`, `api/use-parent-instance.mdx`, `data-fetching.mdx`, `overview.mdx`, `quickstart.mdx`, `rendering-pages.mdx`, `studio.mdx`.
- `resources/`: `example-components.mdx`, `faq.mdx`; `troubleshooting/preview-errors.mdx`.
- Specs: this folder, and `.specs/2026-11-13--app-owned-csp/` (renamed from `2026-10-29--app-owned-csp`, marked completed).

## Validation

Once, before pushing: `mint broken-links`, `mint validate` (if available), `docs.json` parse, every nav entry resolves to a file, `git diff --check`.
