# Document Theme Route Patterns for Studio Navigation

- Status: completed
- Owner: @hta218
- Issue: https://github.com/Weaverse/docs/issues/73
- Branch: `docs/theme-route-patterns`
- Base: `main`
- Created: 2026-10-13
- Last Updated: 2026-10-13

## Summary

Document the existing theme route map in the Custom Routing guide and API Types reference. Use Forward's real theme schema to explain Studio navigation, supported parameters, fallback behavior, and the distinction between declaring a URL and serving it.

## Original Requirement

<!-- The following is the issue body, preserved verbatim. -->

## Problem

Theme-declared route patterns from Weaverse/weaverse#518 are implemented, but the documentation does not explain how to configure `themeSchema.routes`. The Custom Routing guide covers route registration and `loadPage`, while the API Types reference omits `routes` from `HydrogenThemeSchema`. The changelog mentions theme-aware URL picking without configuration guidance.

## Scope

- Add a focused section to the existing Custom Routing guide explaining how to declare route patterns for Studio navigation and link generation, alongside the storefront's actual routes.
- Explain supported page types, `:handle` and `:blog`, whole-segment patterns, partial maps, Shopify fallback, and the scope of Studio support.
- Include and link the real example in [Forward's theme schema](https://github.com/Weaverse/forward/blob/main/src/lib/weaverse/theme-schema.ts), including its collection and article routes.
- Add `routes?: ThemeRoutes` and the shared route types to the API Types reference, with a link to the guide.
- Verify SDK availability before stating version requirements, and validate the documentation build and relevant links.

## References

- Original feature: https://github.com/Weaverse/weaverse/issues/518
- SDK contract: https://github.com/Weaverse/weaverse/pull/519
- Studio navigation: https://github.com/Weaverse/builder/pull/3119
- Forward adoption: https://github.com/Weaverse/forward/pull/91

## Completion Checklist

- [ ] Custom Routing explains the route map with a linked Forward example.
- [ ] API Types documents the optional field and shared types consistently.
- [ ] Examples and behavior match the shipped implementation.
- [ ] Documentation validation passes.
