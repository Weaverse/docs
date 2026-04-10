# Docs Site Restructure Design

**Date**: 2026-04-10
**Author**: Paul Phan
**Status**: Approved
**Platform**: Mintlify (mint theme, built-in components only)

---

## Goal

Restructure docs.weaverse.io to serve as a comprehensive resource for developers and users of the Weaverse ecosystem. Redesign the homepage to showcase the full platform (SDKs, CLI, MCP, Content API, Studio, Themes) and consolidate fragmented navigation from 8 tabs to 5.

## Constraints

- All changes must use Mintlify's built-in themes, components, and `docs.json` configuration
- No custom CSS, JS, or layout code
- Keep the `mint` theme
- Never remove existing images, screenshots, or video assets
- Suggest adding more visual assets where beneficial
- Existing MDX file paths stay the same (no file moves) — only navigation regrouping
- No redirects needed since URLs don't change
- All non-navigation sections of `docs.json` remain unchanged: `global.anchors`, `navbar`, `contextual`, `redirects`, `footer`, `integrations`, `logo`, `colors`

## Audience

- **Primary**: Developers building Hydrogen themes with Weaverse SDKs
- **Secondary**: The full ecosystem — CLI, MCP, Content API, Studio, Themes
- **Style**: Modern dev docs (Stripe/Vercel style) — clean, code-first, comprehensive

---

## 1. Navigation Structure (8 tabs → 5)

### Tab 1: Get Started

| Group | Pages |
|-------|-------|
| Introduction | index, quickstart, core-concepts/how-it-works, core-concepts/project-structure |
| Studio Guide | studio-guide/interface-tour |

### Tab 2: Guides

| Group | Pages |
|-------|-------|
| Environment | development-guide/environment-setup, development-guide/design-mode |
| Building Components | development-guide/creating-components, development-guide/component-schema, development-guide/input-settings, development-guide/weaverse-component, development-guide/styling-theming, development-guide/data-fetching, development-guide/data-connectors |
| Content Management | features/why-weaverse-for-hydrogen, features/global-sections, features/navigation-menus, features/third-party-integrations |
| Internationalization | features/markets-localization |
| Security & Privacy | features/content-security, features/cookie-consent-banner, features/analytics-tracking |
| Pages & Routing | features/custom-pages, features/custom-templates, features/custom-routing |
| Advanced | guides/rendering-page, guides/localization-advanced, guides/multi-project-architecture, development-guide/customer-account-local-dev |

### Tab 3: API Reference

| Group | Pages |
|-------|-------|
| Overview | api-reference/introduction |
| Hooks | api-reference/use-weaverse, api-reference/use-item-instance, api-reference/use-parent-instance, api-reference/use-child-instances, api-reference/use-theme-settings |
| Components | api-reference/weaverse-root, api-reference/weaverse-client, api-reference/with-weaverse |
| Utilities & Types | api-reference/get-selected-product-options, api-reference/images-placeholders, api-reference/types |
| Content API | content-api/overview, content-api/list-projects, content-api/list-pages, content-api/get-page, content-api/get-theme-settings, content-api/list-languages |

### Tab 4: Ecosystem

| Group | Pages |
|-------|-------|
| Overview | ecosystem/index (NEW) |
| Developer Tools | developer-tools/weaverse-cli, developer-tools/weaverse-sdks, developer-tools/weaverse-mcp |
| APIs | features/api-access, features/admin-api-proxy |
| Hydrogen Themes | hydrogen-themes/pilot-theme-overview, hydrogen-themes/pilot-theme-customization, hydrogen-themes/pilot-theme-sections |
| Migration | migration-advanced/index, migration-advanced/v5-migration, migration-advanced/existing-hydrogen-integration |
| Deployment | deployment, oxygen-deployment, custom-domain-and-dns-setup, docker-deployment, workers-deployment |

### Tab 5: Resources

| Group | Pages |
|-------|-------|
| Help | resources/faq, resources/tutorial, resources/example-components |
| Troubleshooting | troubleshooting/preview-errors, troubleshooting/component-not-selectable |
| Community & Updates | community/community, changelog/index, changelog/weaverse-v5-release |

---

## 2. Homepage Design

File: `index.mdx` with `mode: "wide"` and `hideFooterPagination: true` frontmatter.

### Section 2.1: Hero

```
# Build Beautiful Shopify Storefronts with Weaverse

Universal visual page builder powered by React Router v7, Hydrogen,
and AI — for headless commerce that converts.
```

Two CTA cards: "Get Started" → /quickstart, "Open Studio" → https://studio.weaverse.io/dashboard

TODO: Add hero screenshot/GIF of Studio drag-and-drop editing.

### Section 2.2: Choose Your Path (3-col CardGroup)

- **New to Weaverse** (icon: seedling) → /quickstart
- **Developer** (icon: code) → /development-guide/creating-components
- **Merchant** (icon: store) → /studio-guide/interface-tour

### Section 2.3: Ecosystem Overview (3x2 CardGroup)

Six cards showcasing the full platform:

1. **Hydrogen SDKs** — Core, React, Hydrogen packages → /developer-tools/weaverse-sdks
2. **CLI Tools** — Scaffold, develop, deploy → /developer-tools/weaverse-cli
3. **MCP Server** — AI agent integration → /developer-tools/weaverse-mcp
4. **Content API** — Headless content delivery → /content-api/overview
5. **Visual Studio** — Drag & drop editor → /studio-guide/interface-tour
6. **Hydrogen Themes** — Pilot theme & customization → /hydrogen-themes/pilot-theme-overview

TODO: Add ecosystem architecture diagram.

### Section 2.4: Quick Start (Steps component)

3 steps:
1. **Install** — `npx @weaverse/cli create --template=pilot`
2. **Connect** — Add WEAVERSE_PROJECT_ID, run `npm run dev`
3. **Customize** — Open Studio, drag components, publish

TODO: Add screenshot for each step (CLI output, dev server, Studio editor).

### Section 2.5: Popular Guides (2-col CardGroup)

- Creating Components → /development-guide/creating-components
- Component Schema → /development-guide/component-schema
- Input Settings → /development-guide/input-settings
- Data Fetching → /development-guide/data-fetching
- Global Sections → /features/global-sections
- Deployment → /deployment

### Section 2.6: Developer Resources (2-col CardGroup)

- API Reference → /api-reference/introduction
- Content API → /content-api/overview
- Troubleshooting → /troubleshooting/preview-errors
- Community → /community/community

---

## 3. New Pages

### ecosystem/index.mdx

Ecosystem overview hub page with frontmatter:
```yaml
---
title: "Weaverse Ecosystem"
description: "Explore the full suite of Weaverse developer tools — SDKs, CLI, MCP server, Content API, themes, and deployment options"
---
```

Brief description of each tool/product with links:
- Weaverse SDKs (core, react, hydrogen)
- CLI Tools
- MCP Server
- Content API
- Visual Studio
- Hydrogen Themes
- Deployment options

TODO: Add ecosystem diagram, screenshots of each tool.

---

## 4. Media & Visual Assets Strategy

### Rules
- Never remove existing images, screenshots, or video assets
- Suggest adding more visuals wherever text-heavy pages exist

### Suggested New Assets

| Page | Asset |
|------|-------|
| index.mdx (hero) | Screenshot or GIF of Studio drag-and-drop editing |
| index.mdx (hero) | Screenshot of finished storefront built with Weaverse |
| ecosystem/index.mdx | Architecture diagram: SDKs, CLI, MCP, Content API, Studio connections |
| ecosystem/index.mdx | Screenshots of CLI output, MCP integration, Content API response |
| index.mdx (Quick Start) | Screenshot per step: CLI create, dev server, Studio editor |

### Asset Hosting
Continue using Shopify CDN: `cdn.shopify.com/s/files/1/0838/0052/3057/files/`

### Implementation
Mark suggested assets as TODO comments in MDX so they can be captured and added later:
```mdx
{/* TODO: Add screenshot of Studio editor drag-and-drop */}
```

---

## 5. Files Changed

| File | Action |
|------|--------|
| `docs.json` | Full navigation restructure (8 tabs → 5) |
| `index.mdx` | Full rewrite (homepage redesign) |
| `ecosystem/index.mdx` | New file (ecosystem hub page) |

All other existing MDX files remain unchanged — same file paths, same content. Only their position in navigation changes.

No redirects needed since no URLs change.
