# Docs Site Restructure Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure docs.weaverse.io from 8 fragmented navigation tabs to 5 consolidated tabs, redesign the homepage as a comprehensive developer ecosystem hub, and create a new ecosystem overview page — all within Mintlify's built-in capabilities.

**Architecture:** Three files change: `docs.json` (navigation restructure), `index.mdx` (homepage rewrite), and new `ecosystem/index.mdx` (hub page). No file moves, no custom CSS/JS, no theme change. All existing MDX pages keep their paths; only their position in navigation changes.

**Tech Stack:** Mintlify (mint theme), MDX, JSON configuration

**Spec:** `docs/superpowers/specs/2026-04-10-docs-restructure-design.md`

---

## Chunk 1: Ecosystem Hub Page (New File — must exist before nav references it)

### Task 1: Create ecosystem/index.mdx

**Files:**
- Create: `ecosystem/index.mdx`

This page must exist before `docs.json` references it (Task 2). Create it first.

- [ ] **Step 1: Create the ecosystem directory**

```bash
mkdir -p ecosystem
```

- [ ] **Step 2: Write `ecosystem/index.mdx`**

```mdx
---
title: "Weaverse Ecosystem"
description: "Explore the full suite of Weaverse developer tools — SDKs, CLI, MCP server, Content API, themes, and deployment options"
---

The Weaverse ecosystem provides everything you need to build, customize, and deploy Shopify Hydrogen storefronts — from SDKs and CLI tools to AI-powered development and visual editing.

{/* TODO: Add ecosystem architecture diagram showing how SDKs, CLI, MCP, Content API, and Studio connect */}

## Developer Tools

<CardGroup cols={3}>
  <Card title="Weaverse CLI" icon="terminal" href="/developer-tools/weaverse-cli">
    Scaffold new projects, run development servers, and manage deployments from the command line.
  </Card>
  <Card title="Weaverse SDKs" icon="cube" href="/developer-tools/weaverse-sdks">
    Core, React, and Hydrogen packages for building custom storefront components.
  </Card>
  <Card title="MCP Server" icon="robot" href="/developer-tools/weaverse-mcp">
    AI agent integration for Claude, Cursor, and other AI-powered development tools.
  </Card>
</CardGroup>

{/* TODO: Add screenshots of CLI output, MCP in IDE, SDK usage */}

## Content API

Access Weaverse content programmatically for headless implementations.

<CardGroup cols={2}>
  <Card title="Content API Overview" icon="database" href="/content-api/overview">
    REST endpoints for pages, projects, theme settings, and languages.
  </Card>
</CardGroup>

## Visual Studio

<CardGroup cols={2}>
  <Card title="Studio Interface Tour" icon="paintbrush" href="/studio-guide/interface-tour">
    Drag and drop visual editor with real-time preview for building storefront pages.
  </Card>
</CardGroup>

{/* TODO: Add screenshot of Studio editor in action */}

## APIs

<CardGroup cols={2}>
  <Card title="API Access" icon="key" href="/features/api-access">
    Authentication and access control for Weaverse APIs.
  </Card>
  <Card title="Admin API Proxy" icon="shield" href="/features/admin-api-proxy">
    Secure proxy for Shopify Admin API operations.
  </Card>
</CardGroup>

## Hydrogen Themes

Build on top of production-ready themes instead of starting from scratch.

<CardGroup cols={3}>
  <Card title="Pilot Theme Overview" icon="rocket" href="/hydrogen-themes/pilot-theme-overview">
    The primary reference template for Weaverse Hydrogen storefronts.
  </Card>
  <Card title="Customization" icon="paintbrush" href="/hydrogen-themes/pilot-theme-customization">
    Customize colors, typography, layouts, and components.
  </Card>
  <Card title="Theme Sections" icon="table-columns" href="/hydrogen-themes/pilot-theme-sections">
    Pre-built sections included with the Pilot theme.
  </Card>
</CardGroup>

## Migration

<CardGroup cols={3}>
  <Card title="Migration Overview" icon="route" href="/migration-advanced/index">
    Plan your migration path to Weaverse.
  </Card>
  <Card title="V5 Migration" icon="arrow-up" href="/migration-advanced/v5-migration">
    Upgrade from Weaverse v4 to v5.
  </Card>
  <Card title="Existing Hydrogen" icon="plug" href="/migration-advanced/existing-hydrogen-integration">
    Integrate Weaverse into an existing Hydrogen project.
  </Card>
</CardGroup>

## Deployment

Deploy your storefront to production with multiple hosting options.

<CardGroup cols={2}>
  <Card title="Deployment Overview" icon="cloud" href="/deployment">
    Choose the right deployment strategy for your project.
  </Card>
  <Card title="Shopify Oxygen" icon="server" href="/oxygen-deployment">
    Deploy to Shopify's native hosting platform.
  </Card>
  <Card title="Docker" icon="box" href="/docker-deployment">
    Containerized deployment for custom infrastructure.
  </Card>
  <Card title="Cloudflare Workers" icon="cloud-arrow-up" href="/workers-deployment">
    Edge deployment with Cloudflare Workers.
  </Card>
</CardGroup>
```

- [ ] **Step 3: Commit**

```bash
git add ecosystem/index.mdx
git commit -m "docs: add ecosystem overview hub page

New landing page for the Ecosystem tab showcasing all developer
tools, Content API, Visual Studio, APIs, themes, migration, and deployment."
```

---

## Chunk 2: Navigation Restructure (docs.json)

### Task 2: Restructure docs.json navigation from 8 tabs to 5

**Files:**
- Modify: `docs.json` (lines 17-258 — the `navigation.tabs` array only)

**Important:** Only the `navigation.tabs` array changes. All other top-level keys (`$schema`, `theme`, `name`, `colors`, `favicon`, `integrations`, `navigation.global`, `logo`, `navbar`, `contextual`, `redirects`, `footer`) remain untouched.

- [ ] **Step 1: Replace the `navigation.tabs` array in `docs.json`**

Replace the entire `"tabs": [...]` array (currently 8 tabs) with this 5-tab structure:

```json
"tabs": [
  {
    "tab": "Get Started",
    "pages": [
      {
        "group": "Introduction",
        "pages": [
          "index",
          "quickstart",
          "core-concepts/how-it-works",
          "core-concepts/project-structure"
        ]
      },
      {
        "group": "Studio Guide",
        "pages": ["studio-guide/interface-tour"]
      }
    ]
  },
  {
    "tab": "Guides",
    "pages": [
      {
        "group": "Environment",
        "pages": [
          "development-guide/environment-setup",
          "development-guide/design-mode"
        ]
      },
      {
        "group": "Building Components",
        "pages": [
          "development-guide/creating-components",
          "development-guide/component-schema",
          "development-guide/input-settings",
          "development-guide/weaverse-component",
          "development-guide/styling-theming",
          "development-guide/data-fetching",
          "development-guide/data-connectors"
        ]
      },
      {
        "group": "Content Management",
        "pages": [
          "features/why-weaverse-for-hydrogen",
          "features/global-sections",
          "features/navigation-menus",
          "features/third-party-integrations"
        ]
      },
      {
        "group": "Internationalization",
        "pages": ["features/markets-localization"]
      },
      {
        "group": "Security & Privacy",
        "pages": [
          "features/content-security",
          "features/cookie-consent-banner",
          "features/analytics-tracking"
        ]
      },
      {
        "group": "Pages & Routing",
        "pages": [
          "features/custom-pages",
          "features/custom-templates",
          "features/custom-routing"
        ]
      },
      {
        "group": "Advanced",
        "pages": [
          "guides/rendering-page",
          "guides/localization-advanced",
          "guides/multi-project-architecture",
          "development-guide/customer-account-local-dev"
        ]
      }
    ]
  },
  {
    "tab": "API Reference",
    "pages": [
      {
        "group": "Overview",
        "pages": ["api-reference/introduction"]
      },
      {
        "group": "Hooks",
        "pages": [
          "api-reference/use-weaverse",
          "api-reference/use-item-instance",
          "api-reference/use-parent-instance",
          "api-reference/use-child-instances",
          "api-reference/use-theme-settings"
        ]
      },
      {
        "group": "Components",
        "pages": [
          "api-reference/weaverse-root",
          "api-reference/weaverse-client",
          "api-reference/with-weaverse"
        ]
      },
      {
        "group": "Utilities & Types",
        "pages": [
          "api-reference/get-selected-product-options",
          "api-reference/images-placeholders",
          "api-reference/types"
        ]
      },
      {
        "group": "Content API",
        "pages": [
          "content-api/overview",
          "content-api/list-projects",
          "content-api/list-pages",
          "content-api/get-page",
          "content-api/get-theme-settings",
          "content-api/list-languages"
        ]
      }
    ]
  },
  {
    "tab": "Ecosystem",
    "pages": [
      {
        "group": "Overview",
        "pages": ["ecosystem/index"]
      },
      {
        "group": "Developer Tools",
        "pages": [
          "developer-tools/weaverse-cli",
          "developer-tools/weaverse-sdks",
          "developer-tools/weaverse-mcp"
        ]
      },
      {
        "group": "APIs",
        "pages": [
          "features/api-access",
          "features/admin-api-proxy"
        ]
      },
      {
        "group": "Hydrogen Themes",
        "pages": [
          "hydrogen-themes/pilot-theme-overview",
          "hydrogen-themes/pilot-theme-customization",
          "hydrogen-themes/pilot-theme-sections"
        ]
      },
      {
        "group": "Migration",
        "pages": [
          "migration-advanced/index",
          "migration-advanced/v5-migration",
          "migration-advanced/existing-hydrogen-integration"
        ]
      },
      {
        "group": "Deployment",
        "pages": [
          "deployment",
          "oxygen-deployment",
          "custom-domain-and-dns-setup",
          "docker-deployment",
          "workers-deployment"
        ]
      }
    ]
  },
  {
    "tab": "Resources",
    "pages": [
      {
        "group": "Help",
        "pages": [
          "resources/faq",
          "resources/tutorial",
          "resources/example-components"
        ]
      },
      {
        "group": "Troubleshooting",
        "pages": [
          "troubleshooting/preview-errors",
          "troubleshooting/component-not-selectable"
        ]
      },
      {
        "group": "Community & Updates",
        "pages": [
          "community/community",
          "changelog/index",
          "changelog/weaverse-v5-release"
        ]
      }
    ]
  }
]
```

- [ ] **Step 2: Validate JSON syntax**

Run: `cat docs.json | python3 -m json.tool > /dev/null`
Expected: No output (valid JSON). If error, fix the syntax issue.

- [ ] **Step 3: Verify all pages are present**

Run this to count page entries in the new navigation:
```bash
python3 -c "
import json
def extract(obj):
    c = 0
    if isinstance(obj, str): return 1
    elif isinstance(obj, list):
        for i in obj: c += extract(i)
    elif isinstance(obj, dict) and 'pages' in obj:
        c += extract(obj['pages'])
    return c
with open('docs.json') as f:
    print(extract(json.load(f)['navigation']['tabs']))
"
```
Expected: `72` (71 existing pages + 1 new `ecosystem/index`).

- [ ] **Step 4: Commit**

```bash
git add docs.json
git commit -m "docs: restructure navigation from 8 tabs to 5

Consolidate fragmented navigation:
- Get Started: Introduction + Studio Guide
- Guides: Dev Guides + Features merged with sub-groups
- API Reference: SDK API + Content API merged
- Ecosystem: Tools, Themes, Migration, Deployment
- Resources: Help, Troubleshooting, Community"
```

---

## Chunk 3: Homepage Rewrite (index.mdx)

### Task 3: Rewrite index.mdx as comprehensive homepage

**Files:**
- Modify: `index.mdx` (full rewrite)

- [ ] **Step 1: Replace `index.mdx` content**

```mdx
---
title: "Welcome to Weaverse"
description: "Universal visual page builder with AI integration for headless Shopify storefronts using React Router and Hydrogen"
mode: "wide"
hideFooterPagination: true
---

# Build Beautiful Shopify Storefronts with Weaverse

Universal visual page builder powered by React Router v7, Hydrogen, and AI — for headless commerce that converts.

{/* TODO: Add hero screenshot or GIF of Studio drag-and-drop editing */}

<CardGroup cols={2}>
  <Card title="Get Started" icon="rocket" href="/quickstart">
    Create your first Weaverse storefront in 5 minutes
  </Card>
  <Card title="Open Studio" icon="paintbrush" href="https://studio.weaverse.io/dashboard">
    Launch the visual editor and start building
  </Card>
</CardGroup>

---

## Choose Your Path

<CardGroup cols={3}>
  <Card title="I'm New to Weaverse" icon="seedling" href="/quickstart">
    Start here if you've never used Weaverse before. Get up and running in 5 minutes.
  </Card>
  <Card title="I'm a Developer" icon="code" href="/development-guide/creating-components">
    Jump into component development, API reference, and advanced customization.
  </Card>
  <Card title="I'm a Merchant" icon="store" href="/studio-guide/interface-tour">
    Learn to use Weaverse Studio visually without writing code.
  </Card>
</CardGroup>

---

## Ecosystem at a Glance

Everything you need to build, customize, and deploy Hydrogen storefronts.

<CardGroup cols={3}>
  <Card title="Hydrogen SDKs" icon="cube" href="/developer-tools/weaverse-sdks">
    Core, React, and Hydrogen packages for building custom components.
  </Card>
  <Card title="CLI Tools" icon="terminal" href="/developer-tools/weaverse-cli">
    Scaffold projects, run dev servers, and manage deployments.
  </Card>
  <Card title="MCP Server" icon="robot" href="/developer-tools/weaverse-mcp">
    AI agent integration for Claude, Cursor, and other tools.
  </Card>
  <Card title="Content API" icon="database" href="/content-api/overview">
    Headless content delivery for pages, themes, and languages.
  </Card>
  <Card title="Visual Studio" icon="paintbrush" href="/studio-guide/interface-tour">
    Drag and drop editor with real-time preview.
  </Card>
  <Card title="Hydrogen Themes" icon="palette" href="/hydrogen-themes/pilot-theme-overview">
    Production-ready Pilot theme with full customization.
  </Card>
</CardGroup>

{/* TODO: Add ecosystem architecture diagram */}

---

## Quick Start

<Steps>
  <Step title="Install">
    Scaffold a new Weaverse Hydrogen project:
    ```bash
    npx @weaverse/cli@latest create --template=pilot --project-id=YOUR_PROJECT_ID
    ```
  </Step>
  <Step title="Connect">
    Add your Weaverse project ID and start the dev server:
    ```bash
    npm run dev
    ```
    Your storefront runs at `http://localhost:3456` with live connection to Weaverse Studio.
  </Step>
  <Step title="Customize">
    Open [Weaverse Studio](https://studio.weaverse.io/dashboard), drag components onto pages, configure settings, and publish your changes — all with real-time preview.
  </Step>
</Steps>

{/* TODO: Add screenshot for each step — CLI create output, dev server running, Studio editor */}

---

## Popular Guides

<CardGroup cols={2}>
  <Card title="Creating Components" icon="cube" href="/development-guide/creating-components">
    Build custom React components for your storefront
  </Card>
  <Card title="Component Schema" icon="file-code" href="/development-guide/component-schema">
    Define component structure, settings, and behavior
  </Card>
  <Card title="Input Settings" icon="sliders" href="/development-guide/input-settings">
    Configure component settings with the input system
  </Card>
  <Card title="Data Fetching" icon="download" href="/development-guide/data-fetching">
    Load Shopify data with loaders and the Storefront API
  </Card>
  <Card title="Global Sections" icon="table-columns" href="/features/global-sections">
    Reusable sections shared across all pages
  </Card>
  <Card title="Deployment" icon="cloud" href="/deployment">
    Deploy to Oxygen, Docker, or Cloudflare Workers
  </Card>
</CardGroup>

---

## Developer Resources

<CardGroup cols={2}>
  <Card title="API Reference" icon="book" href="/api-reference/introduction">
    Complete documentation for hooks, components, utilities, and types
  </Card>
  <Card title="Content API" icon="database" href="/content-api/overview">
    REST endpoints for pages, projects, themes, and languages
  </Card>
  <Card title="Troubleshooting" icon="wrench" href="/troubleshooting/preview-errors">
    Solutions for common issues and error messages
  </Card>
  <Card title="Community" icon="users" href="/community/community">
    Join the Slack community, contribute on GitHub, stay updated
  </Card>
</CardGroup>
```

- [ ] **Step 2: Verify the rewrite preserved all essential links**

Check that these key destinations are still linked from the homepage:
- `/quickstart` (present in hero CTA + Choose Your Path)
- `/development-guide/creating-components` (Choose Your Path + Popular Guides)
- `/studio-guide/interface-tour` (Choose Your Path + Ecosystem)
- `/api-reference/introduction` (Developer Resources)
- `/content-api/overview` (Ecosystem + Developer Resources)
- `/deployment` (Popular Guides)
- `/community/community` (Developer Resources)

- [ ] **Step 3: Commit**

```bash
git add index.mdx
git commit -m "docs: redesign homepage as comprehensive ecosystem hub

- Add wide mode with hero section and dual CTAs
- Add 3-path persona cards (New User, Developer, Merchant)
- Add 6-card ecosystem overview (SDKs, CLI, MCP, Content API, Studio, Themes)
- Add inline Quick Start steps with code examples
- Add Popular Guides and Developer Resources sections
- Add TODO markers for screenshots and diagrams"
```

---

## Chunk 4: Validation

### Task 4: Validate the full restructure

- [ ] **Step 1: Verify all page files referenced in docs.json exist**

```bash
cd /Users/paul/Workspace/weaverse-project/docs
for page in $(python3 -c "
import json
def extract_pages(obj):
    if isinstance(obj, str):
        print(obj)
    elif isinstance(obj, list):
        for item in obj:
            extract_pages(item)
    elif isinstance(obj, dict):
        if 'pages' in obj:
            extract_pages(obj['pages'])
with open('docs.json') as f:
    data = json.load(f)
    extract_pages(data['navigation']['tabs'])
"); do
    if [ ! -f "${page}.mdx" ]; then
        echo "MISSING: ${page}.mdx"
    fi
done
```

Expected: No "MISSING" output. Every page in navigation has a corresponding `.mdx` file.

- [ ] **Step 2: Run `mint dev` and verify locally**

```bash
mint dev
```

Check in browser at `http://localhost:3000`:
1. Homepage loads with all 6 sections (hero, paths, ecosystem, quick start, popular guides, resources)
2. Navigation shows 5 tabs: Get Started, Guides, API Reference, Ecosystem, Resources
3. Click through each tab — sidebar groups render correctly
4. Ecosystem tab → Overview shows the new `ecosystem/index.mdx` page
5. All internal links from the homepage resolve (no 404s)
6. Global anchors (Home, Studio, GitHub, Community) still appear

- [ ] **Step 3: Spot-check moved pages**

Verify these pages are accessible and appear in their new tab:
- `/features/global-sections` → should be in Guides tab > Content Management
- `/content-api/overview` → should be in API Reference tab > Content API
- `/deployment` → should be in Ecosystem tab > Deployment
- `/hydrogen-themes/pilot-theme-overview` → should be in Ecosystem tab > Hydrogen Themes
- `/developer-tools/weaverse-cli` → should be in Ecosystem tab > Developer Tools

- [ ] **Step 4: Stop `mint dev` and confirm clean state**

```bash
# Ctrl+C to stop mint dev
git status
```

Expected: Clean working tree (all changes already committed in Tasks 1-3).
