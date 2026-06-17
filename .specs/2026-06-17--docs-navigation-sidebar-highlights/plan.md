# Implementation Plan — Remove duplicate sidebar categories

## Problem

`docs.json` has 36 page paths that each appear in two navigation locations. In
every single case, one location is the **Get Started** tab and the other is the
page's natural canonical tab (Guides / API Reference / Ecosystem / Resources).
Because Mintlify resolves the active sidebar entry by route, opening any of these
pages can highlight it under the "wrong" category.

Verified by the duplicate scanner (issue Verification block): **36 duplicate
paths, 78 unique paths total.**

## Root cause

The `Get Started` tab was built as a "mega tab" mirroring most of the site:
it re-listed Building Components, API Reference, Content API, Features,
Developer Tools, Hydrogen Themes, Deployment, and Help & Community — all of
which already live in their own canonical tabs.

## Strategy

Adopt the canonical ownership from the issue's suggested direction:

| Tab           | Owns                                                                 |
| ------------- | -------------------------------------------------------------------- |
| Get Started   | Onboarding only: Introduction + Studio Guide                         |
| Guides        | Deep how-to: development-guide/\* and features/\*                    |
| API Reference | Overview, Hooks, Components, Utilities & Types, Content API          |
| Ecosystem     | Developer Tools, APIs, Hydrogen Themes, Migration, Deployment        |
| Resources     | FAQ/Help, Troubleshooting, Community & Updates                       |

Implementation = **remove the duplicate groups from the `Get Started` tab**,
keeping only the two groups whose pages are unique to onboarding:

- `Introduction` — `index`, `quickstart`, `core-concepts/how-it-works`,
  `core-concepts/project-structure`
- `Studio Guide` — `studio-guide/interface-tour`

Groups removed from `Get Started` (every page already canonical elsewhere):

- Building Components → already in `Guides`
- API Reference → already in `API Reference`
- Content API → already in `API Reference > Content API`
- Features → already in `Guides`
- Developer Tools → already in `Ecosystem`
- Hydrogen Themes → already in `Ecosystem`
- Deployment → already in `Ecosystem`
- Help & Community → already in `Resources`

The other four tabs (Guides, API Reference, Ecosystem, Resources) are **left
unchanged** — they already hold the canonical, deduplicated entries.

### Why this is safe

- Simulation confirms **0 remaining duplicates** and **0 orphaned pages** after
  removing those Get Started groups (every removed path exists in another tab).
- Total unique nav paths stays at **78** — no page disappears from navigation.

### Discoverability

No new overview/redirect pages are required. The onboarding pages already act
as the hub:

- `index.mdx` has CardGroups linking to development-guide, api-reference,
  content-api, developer-tools, features, hydrogen-themes, deployment,
  troubleshooting, and community.
- `quickstart.mdx` ends with "What's Next?" CardGroups covering components,
  API reference, features, deployment, migration, resources, community, and
  troubleshooting.

So users still reach every section from the Get Started flow via cards rather
than duplicate sidebar routes.

## Validation

1. **Duplicate-route check** (script from the issue) → expect zero output.
2. **Path existence check** → every nav path resolves to an existing `.mdx`
   (or `index.mdx`) file.
3. **`mint dev`** startup → no navigation/config validation errors.
4. **Manual smoke targets** exist and are navigable:
   - dev guide: `development-guide/creating-components`
   - API ref: `api-reference/introduction`
   - Content API: `content-api/overview`
   - dev tools: `developer-tools/weaverse-cli`
   - deployment: `deployment`
   - troubleshooting: `troubleshooting/preview-errors`

## Files touched

| File                                                               | Change                                                                 |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| `docs.json`                                                        | Remove 8 duplicate groups from the `Get Started` tab (keep 2 groups).  |
| `.specs/2026-06-17--docs-navigation-sidebar-highlights/README.md`  | SDD spec identity card (this feature).                                 |
| `.specs/2026-06-17--docs-navigation-sidebar-highlights/plan.md`    | This plan.                                                             |
| `.specs/2026-06-17--docs-navigation-sidebar-highlights/check-duplicate-routes.py` | Reusable duplicate-route + path-existence validator.    |

No `.mdx` content files are modified; only navigation structure changes.

## Out of scope

- Renaming or restructuring the canonical tabs beyond removing the Get Started
  duplicates.
- Adding new content pages or rewriting existing card links (existing cards
  already cover discoverability).
