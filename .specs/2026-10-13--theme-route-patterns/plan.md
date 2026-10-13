# Theme Route Patterns Documentation Plan

## Outcome and Scope

Make the existing Custom Routing guide sufficient for a theme author to configure Studio navigation after implementing custom storefront routes. Keep the shared types discoverable in API Types and preserve the existing route-registration tutorial.

Only these files are in scope:

- `features/custom-routing.mdx`: declaration example, Forward source link, supported keys and parameters, fallback, locale handling, and Studio scope.
- `api-reference/types.mdx`: `routes?: ThemeRoutes`, shared route types, and link to the guide.
- `.specs/2026-10-13--theme-route-patterns/README.md` and `plan.md`: requirement, plan, progress, and verification.

## Source Findings

- No existing spec specifically covers theme route patterns. The technical accuracy refresh is broader and has a separate outcome.
- `@weaverse/schema` defines `ThemeRoutePageType = Exclude<PageType, '*' | 'CUSTOM'>` and `ThemeRoutes = Partial<Record<ThemeRoutePageType, string>>`.
- Hydrogen and Next theme schema types expose `routes?: ThemeRoutes`; both packages re-export the schema types.
- Builder resolves whole `:handle` and `:blog` segments using `getPagePath`. A missing map entry, non-absolute pattern, or unavailable parameter falls back to Shopify paths. Unsupported pattern syntax is not a route-registration mechanism or a comprehensive validation boundary.
- The Studio page selector adds the selected locale prefix separately. The dashboard entry URL cannot read the theme schema and still uses its existing convention.
- Forward declares five overrides: `ALL_PRODUCTS`, `COLLECTION`, `COLLECTION_LIST`, `BLOG`, and `ARTICLE`.

Source snapshots inspected:

- SDK: `707372ee7ef1da99c63169d114694ac446a94cf7`, including `packages/schema/src/theme-routes.ts`, `packages/hydrogen/src/types.ts`, and `packages/next/src/types.ts`.
- Builder: `142dac4ca8a0041a79a9b3a30add430ccb406a45`, including `app/utils/hydrogen.ts`, resolver tests, and page selector consumers.
- Forward: `31082d7546f6b766c6c735cba586be237ac59c81`, `src/lib/weaverse/theme-schema.ts`.

## Implementation Sequence

1. Commit this spec and plan separately, as requested.
2. Verify published SDK types before documenting compatibility. Distinguish typed SDK support from Studio behavior rather than claiming every older SDK lacks runtime support.
3. Add a section to Custom Routing explaining `routes` as a sibling of `settings`, show a small Hydrogen example matching the existing `/item/:productHandle` tutorial, and include Forward's actual route map with a source link. Explain the fixed `:handle` name despite the router's `:productHandle` name.
4. Document the eight supported keys, two parameters, static paths, omitted-key fallback, missing-value fallback, locale prefix handling, and limits. Avoid suggesting that all malformed patterns are rejected or that the dashboard uses the map.
5. Add the optional schema field and shared types to API Types, linking to the guide rather than repeating it.
6. Validate, record results here, mark the spec completed, and commit the documentation plus completion record. Push the branch and open a regular PR to `main` closing #73.

## Verification

- Verify the Forward snippet against its source and the type declarations against published packages.
- Check documentation examples against Builder's resolver and existing behavior tests: collection override, flat article route, nested blog/article route, omitted key, missing parameter, and non-absolute pattern.
- Run `mint validate` and `git diff --check`; verify new internal anchors and the Forward source target.
- Inspect the final diff and ensure the original dirty worktree is untouched.

## Risks, Rollout, and Out of Scope

The route map must agree with actual storefront routes or Studio can navigate to a 404; it does not install routes or rewrite arbitrary theme links. Older package types and unsupported pattern syntax must not be described as validated behavior. This change is documentation-only: no SDK, Builder, theme, navigation, or changelog changes, no dependency additions, and no merge or deployment. Standard docs deployment follows a later merge; reverting these documentation changes rolls it back.

## Verification Results

Pending implementation.
