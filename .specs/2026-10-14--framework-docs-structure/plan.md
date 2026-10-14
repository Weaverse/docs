# Plan: Framework Docs Structure

## Navigation (`docs.json`)

```
versions: v5.x (Latest)
└─ tabs
   ├─ Get Started            shared
   ├─ Guides                 dropdowns: React Router | Next.js
   ├─ SDKs                   dropdowns: React Router | Next.js
   ├─ Content API            Overview, Projects, Pages, Theme settings, Languages
   ├─ Ecosystem              shared
   └─ Help & Community       shared
navbar.links: Weaverse.io, GitHub, Community (+ Studio button)
```

- Guides → Next.js: Getting started (`nextjs/overview`, `nextjs/quickstart`), Next.js (`nextjs/rendering-pages`, `nextjs/data-fetching`, `nextjs/studio`, `nextjs/markets-translations`), Content Management, Deployment (`guides/deployment/vercel`).
- SDKs → Next.js: Overview (`nextjs/api-reference`), Hooks (`nextjs/api/use-*`).
- Forward stays under Ecosystem → Themes.

## Pages

- New: `nextjs/api/use-weaverse`, `use-item-instance`, `use-parent-instance`, `use-child-instances`, `use-theme-settings`. Imports from `@weaverse/next`, `'use client'` on component examples, `useThemeSettings` typed `Record<string, unknown>` by default; the React Router `useFetcher` example is not carried over.
- React Router API pages (`api-reference/introduction`, the five hooks, `weaverse-client`) lose their Next.js notes; `guides/deployment/vercel` loses its cross-framework line.
- `content-api/overview` gets `sidebarTitle: "Overview"`.

## Behaviour observed (Mintlify 4.2.989)

- A tab renders one navigation kind: dropdowns, groups or anchors. A tab with dropdowns plus a group shows the group only on its own pages; anchors inside a tab replace its pages.
- A page listed under two dropdowns or products renders under the first, so shared pages live in shared tabs.
- `versions` → `tabs` → `dropdowns` nests without errors.

## Follow-ups

- Next.js versions of Creating components, Component schema and Input settings (they use React Router types today).
- `v6.x` docs on the 6.0 import paths (Weaverse/weaverse#547).

## Verification

- `mint broken-links`: no broken links.
- `mint dev`: every touched page returns 200 and renders the sidebar of its framework.

## Files touched

| File | Change |
| --- | --- |
| `docs.json` | Versions, framework dropdowns, Content API tab, navbar links |
| `images/icons/{react-router,nextjs}.svg` | Framework logos |
| `nextjs/api/use-*.mdx` | Next.js hook pages |
| `api-reference/*.mdx`, `guides/deployment/vercel.mdx` | Cross-framework notes removed |
| `content-api/overview.mdx` | Sidebar title |
| `.specs/2026-10-14--framework-docs-structure/` | This spec |
