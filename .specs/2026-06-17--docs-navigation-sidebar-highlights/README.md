# Feature: Reorganize docs navigation to remove duplicate sidebar categories

| Field            | Value                                                              |
| ---------------- | ------------------------------------------------------------------ |
| **Status**       | implemented                                                        |
| **Owner**        | @hta218                                                            |
| **Issue**        | [#19](https://github.com/Weaverse/docs/issues/19)                  |
| **Branch**       | `fix/docs-navigation-sidebar-highlights`                           |
| **Created**      | 2026-06-17                                                         |
| **Last Updated** | 2026-06-17                                                         |

## Original Prompt

> ## Context
>
> The current Mintlify docs navigation is over-organized with the same page paths listed under multiple tabs/categories. This causes confusing sidebar behavior: when a user opens a page from one sidebar group, Mintlify can highlight the same page under a different category/tab because the route appears in multiple navigation locations.
>
> Quick scan of `docs.json` found 36 duplicated page paths across navigation tabs/groups.
>
> Examples:
>
> - `development-guide/environment-setup` appears in `Get Started > Building Components` and `Guides > Environment`
> - `development-guide/creating-components` appears in `Get Started > Building Components` and `Guides > Building Components`
> - `api-reference/introduction` appears in `Get Started > API Reference` and `API Reference > Overview`
> - `content-api/overview` appears in `Get Started > Content API` and `API Reference > Content API`
> - `developer-tools/weaverse-cli` appears in `Get Started > Developer Tools` and `Ecosystem > Developer Tools`
> - `deployment`, `oxygen-deployment`, `docker-deployment`, and `workers-deployment` appear in both `Get Started > Deployment` and `Ecosystem > Deployment`
> - `resources/faq`, `resources/example-components`, `community/community`, and `changelog/index` appear in both `Get Started > Help & Community` and `Resources`
>
> Source request: docs pages are duplicated across categories, making sidebar highlight jump to the wrong category when clicking pages.
>
> ## Goal
>
> Reorganize the Weaverse docs navigation so each docs page has one canonical sidebar location, with clear category ownership and reliable active/highlight state.
>
> ## Scope
>
> - Audit `docs.json` navigation structure.
> - Remove or replace duplicate page entries so each route has one canonical navigation location.
> - Keep docs discoverable without duplicating routes; use overview pages, cards, or cross-links where a page needs to be reachable from multiple areas.
> - Clarify top-level tab/category ownership, especially:
>   - Get Started
>   - Guides
>   - API Reference
>   - Ecosystem
>   - Resources
> - Preserve existing content files unless a small redirect/overview/link page is needed.
> - Verify sidebar active state after the navigation cleanup.
>
> ## Suggested direction
>
> - `Get Started` should stay focused on onboarding and the shortest path to first success.
> - `Guides` should own deep implementation/how-to docs.
> - `API Reference` should own API, hooks, components, types, and Content API reference docs.
> - `Ecosystem` should own themes, developer tools, migration, deployment, and ecosystem-level pages.
> - `Resources` should own FAQ, troubleshooting, community, changelog, and examples.
> - If a page is relevant in another section, link to it from an overview page/card instead of duplicating the same route in navigation.
>
> ## Acceptance criteria
>
> - [ ] `docs.json` has no unintended duplicate page paths across navigation tabs/groups.
> - [ ] Each duplicated route from the current scan has one canonical category.
> - [ ] Sidebar highlight/active state remains in the category the user navigated from for canonical pages.
> - [ ] Cross-section discoverability is preserved via links/cards/overview pages instead of duplicate nav entries.
> - [ ] `mint dev` starts without navigation/config errors.
> - [ ] Manual smoke test confirms representative pages highlight correctly:
>   - Development guide page
>   - API reference page
>   - Content API page
>   - Developer tools page
>   - Deployment page
>   - Resource/troubleshooting page
>
> ## Verification
>
> Run a duplicate route check after changes, for example:
>
> ```bash
> python3 - <<'PY'
> import json, collections
> with open('docs.json') as f:
>     data = json.load(f)
> occ = collections.defaultdict(list)
>
> def walk(pages, tab, group=None):
>     for item in pages:
>         if isinstance(item, str):
>             occ[item].append((tab, group))
>         elif isinstance(item, dict):
>             walk(item.get('pages', []), tab, item.get('group') or group)
>
> for tab in data.get('navigation', {}).get('tabs', []):
>     walk(tab.get('pages', []), tab.get('tab'))
>
> for path, locations in sorted(occ.items()):
>     if len(locations) > 1:
>         print(path, locations)
> PY
> ```
>
> Then run local preview:
>
> ```bash
> mint dev
> ```

## Summary

The Mintlify docs `docs.json` listed 36 page paths under both the `Get Started` tab and a second canonical tab (Guides, API Reference, Ecosystem, or Resources), causing the sidebar active-state to jump between categories. This work reorganizes navigation so each page has one canonical sidebar location: `Get Started` is slimmed to pure onboarding (Introduction + Studio Guide), while every previously duplicated page keeps its single canonical home. Discoverability is preserved through the existing CardGroups on the homepage and quickstart pages.
