# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Weaverse Documentation Site** - Mintlify-based documentation for Weaverse, a universal visual page builder for Shopify Hydrogen storefronts. This documentation covers Weaverse SDKs, CLI tools, MCP server, and the complete API reference for building custom Hydrogen themes.

## Technology Stack

- **Documentation Framework**: Mintlify
- **Configuration**: `docs.json` (Mintlify schema)
- **Content Format**: MDX (Markdown with JSX components)
- **Deployment**: Mintlify hosting with GitHub integration
- **Version Control**: Git with automatic deployment from main branch

## Quick Reference

### Most Common Tasks

**Preview docs locally**:
```bash
mint dev  # Run from docs/ directory, opens http://localhost:3000
```

**Add new documentation page**:
1. Create `.mdx` file in appropriate directory with frontmatter
2. Update `docs.json` navigation (file path without `.mdx` extension)
3. Test with `mint dev`

**Update navigation**:
- Edit `docs.json` navigation array
- Restart `mint dev` to see changes
- File paths omit `.mdx` extension

**Fix 404 errors**:
- Verify file exists at correct path
- Check `docs.json` includes the page in navigation
- Ensure frontmatter is valid

## Development Commands

### Local Development
```bash
# Install Mintlify CLI globally (required first time only)
npm i -g mint

# Start local preview server (runs on http://localhost:3000)
# MUST be run from directory containing docs.json
mint dev

# Update to latest Mintlify CLI version
mint update
```

### Content Validation
```bash
# Validate docs.json configuration
# mint dev validates on startup and shows errors
mint dev

# Check for broken links (manual review of navigation)
# Review docs.json navigation matches actual file structure
```

## Project Structure

```
docs/
├── docs.json                    # Mintlify configuration (navigation, theme, metadata)
├── index.mdx                    # Homepage
├── quickstart.mdx               # 5-minute quickstart guide
├── development.mdx              # Development overview
├── deployment.mdx               # Deployment guide
├── getting-started/             # Getting started guides
├── core-concepts/               # Architecture and concepts
├── development-guide/           # Component development guides
│   ├── environment-setup.mdx
│   ├── creating-components.mdx
│   ├── input-settings.mdx
│   ├── component-schema.mdx
│   ├── data-fetching.mdx
│   └── styling-theming.mdx
├── api-reference/               # API documentation
│   ├── introduction.mdx
│   ├── use-weaverse.mdx
│   ├── weaverse-root.mdx
│   └── types.mdx
├── developer-tools/             # CLI, SDK, MCP documentation
│   ├── weaverse-cli.mdx
│   ├── weaverse-sdks.mdx
│   └── weaverse-mcp.mdx
├── features/                    # Feature guides
├── themes-templates/            # Theme documentation
├── migration-advanced/          # Migration guides
├── resources/                   # Additional resources
├── community/                   # Community information
└── changelog/                   # Release notes
```

## Mintlify Configuration (docs.json)

The `docs.json` file controls:

- **Navigation structure**: Tabs, groups, and page organization
- **Branding**: Colors, logo, favicon
- **Features**: Contextual options (copy, chatgpt, claude, cursor, etc.)
- **External links**: GitHub, Studio, Community

### Key Configuration Sections

**Theme Colors**:
- Primary: `#246aff`
- Light: `#599aff`
- Dark: `#1e40af`

**Navigation Structure**:
The `navigation` object in `docs.json` uses this hierarchy:
```json
{
  "navigation": {
    "tabs": [
      {
        "tab": "Tab Name",
        "pages": [
          {
            "group": "Group Name",
            "pages": ["file-path", "folder/file-path"]
          }
        ]
      }
    ]
  }
}
```

**Navigation Tabs**:
1. **Docs** - Main documentation (Getting Started, Core Concepts, Development Guide, Features, Developer Tools, Guides, Studio Guide, Troubleshooting, Deployment)
2. **API Reference** - Introduction, Hooks, Components, Utilities & Types
3. **Themes** - Themes & Templates, Migration Guides
4. **Resources** - Release Notes, Community & Resources

**Critical Rule**: When adding new pages, you MUST update `docs.json` navigation array. Pages won't appear until they're listed in the navigation structure. File paths in navigation omit the `.mdx` extension.

## Content Guidelines

### MDX Frontmatter

All `.mdx` files MUST include frontmatter with title and description:

```yaml
---
title: "Page Title"
description: "Page description for SEO and previews"
published: true  # Optional, defaults to true
---
```

**Critical**: Pages without frontmatter will cause errors or not render properly.

### Mintlify Components

Commonly used Mintlify components in this documentation:

```mdx
# Card components
<Card title="Title" icon="icon-name" href="/path">
  Description text
</Card>

<CardGroup cols={2}>
  <Card ... />
  <Card ... />
</CardGroup>

# Accordions
<AccordionGroup>
  <Accordion title="Question" icon="icon-name">
    Answer content
  </Accordion>
</AccordionGroup>

# Steps
<Steps>
  <Step title="Step 1">
    Content
  </Step>
</Steps>

# Callouts
<Note>Important information</Note>
<Tip>Helpful tip</Tip>
<Warning>Warning message</Warning>

# Code blocks
```bash
npm run dev
```

# Columns
<Columns cols={2}>
  Content splits into columns
</Columns>

# Images
<Frame>
  <img src="url" alt="description" />
</Frame>
```

## Weaverse-Specific Terminology

### Critical Naming Conventions

- **`settings`** NOT `inspector` - For component configuration (inspector is deprecated)
- **Component Schema** - Uses `createSchema()` function from `@weaverse/hydrogen`
- **React Router v7** - NOT React Router DOM (import from `'react-router'`)
- **Hydrogen** - Shopify's React framework for headless storefronts
- **Studio** - Weaverse's visual editor interface (`https://studio.weaverse.io`)
- **Pilot Theme** - Primary reference template
- **Naturelle Theme** - Alternative template option

### Component Schema Pattern

Components use `createSchema()` with this structure:

```typescript
import { createSchema } from '@weaverse/hydrogen'

export let schema = createSchema({
  type: 'component-name',        // Unique identifier (kebab-case)
  title: 'Component Title',      // Display name
  settings: [                     // NOT inspector
    {
      group: 'Content',
      inputs: [/* input configs */]
    }
  ],
  childTypes: ['allowed-child'],  // Optional
  presets: { /* defaults */ },    // Optional
  limit: 1,                       // Optional
  enabledOn: {                    // Optional
    pages: ['INDEX', 'PRODUCT']
  }
})
```

### Development Workflow

**Hydrogen Theme Development**:
```bash
# Create new theme
npx @weaverse/cli@latest create --template=pilot --project-id=xxx

# Start development (port 3456)
npm run dev

# Development with Customer Account API
npm run dev:ca

# Code quality
npm run biome:fix
npm run typecheck
```

**Key Environment Variables**:
- `WEAVERSE_PROJECT_ID` - Required for Studio connection
- `PUBLIC_STORE_DOMAIN` - Shopify store domain
- `PUBLIC_STOREFRONT_API_TOKEN` - Shopify API token
- `SESSION_SECRET` - Session encryption

## Common Documentation Patterns

### Critical Two-Step Workflow for New Pages

**IMPORTANT**: New pages require BOTH file creation AND navigation update:

1. **Create the `.mdx` file** with frontmatter in appropriate directory
2. **Update `docs.json`** navigation array to include the new page path

Files without navigation entries will show 404 errors. Navigation entries without files will cause build errors.

### When Adding New API Documentation

1. Create file in `api-reference/` with frontmatter
2. **Update `docs.json`** navigation under `"API Reference"` tab → appropriate group
3. Follow existing structure:
   - Introduction/description
   - Import example
   - Usage example
   - Parameters/props table
   - Return value
   - Full example
4. Test locally with `mint dev` and verify page appears in navigation

### When Adding New Guide

1. Create file in appropriate directory (`development-guide/`, `features/`, etc.)
2. Add frontmatter with title and description
3. **Update `docs.json`** navigation under appropriate tab and group
4. Use CardGroup for navigation to related content
5. Include code examples with syntax highlighting
6. Add troubleshooting section if applicable
7. Test locally to verify navigation and content

### Cross-Referencing

Use relative paths for internal links:
```mdx
[Component Schema](/development-guide/component-schema)
[API Reference](/api-reference/introduction)
```

## Image Assets

- Store images on Shopify CDN: `https://cdn.shopify.com/s/files/1/0838/0052/3057/files/`
- Use descriptive filenames
- Wrap in `<Frame>` component for consistent styling
- Always include `alt` text for accessibility

## Important Development Notes

### Critical Rules

- **Two-Step Page Creation**: Always create `.mdx` file AND update `docs.json` navigation
- **Navigation Updates**: Restart `mint dev` after any `docs.json` changes
- **Component Names**: Use `settings` not `inspector` in all Weaverse documentation
- **Code Accuracy**: Verify code examples match current SDK versions (see Package Versions section)
- **Mintlify Syntax**: Use Mintlify components (Card, Accordion, etc.) not raw HTML
- **Links**: Use relative paths for internal links (e.g., `/api-reference/introduction`), absolute for external
- **File Paths**: Navigation paths omit `.mdx` extension (use `"index"` not `"index.mdx"`)
- **Frontmatter Required**: All `.mdx` files must include title and description

### Page Types Referenced

When documenting `enabledOn.pages`:
- `INDEX` - Homepage
- `PRODUCT` - Product detail pages
- `COLLECTION` - Collection pages
- `COLLECTION_LIST` - All collections
- `PAGE` - Custom pages
- `BLOG` - Blog listing
- `ARTICLE` - Individual articles
- `CUSTOM` - Custom page types
- `ALL_PRODUCTS` - All products page

### Deployment Process

Changes deploy automatically:
1. Push to main branch
2. Mintlify GitHub app detects changes
3. Auto-deploys to production
4. Available at configured docs URL

### Local Development Tips

- `mint dev` must be run from directory containing `docs.json` (the docs/ directory)
- Preview runs on `http://localhost:3000`
- Hot reload enabled for `.mdx` file changes (auto-refresh browser)
- **Restart required** for `docs.json` navigation changes
- 404 errors indicate missing navigation entry or incorrect file path
- Check terminal for build errors and warnings

## Style Guidelines

- Use **Title Case** for headings and navigation
- Keep descriptions concise (under 160 characters for SEO)
- Code blocks should specify language for syntax highlighting
- Use emoji sparingly, only in callouts when appropriate
- Prefer numbered steps for sequential instructions
- Use bullet points for feature lists and options

## Common Issues & Troubleshooting

**Page Shows 404**:
1. Verify file exists at correct path relative to docs directory
2. Check `docs.json` navigation includes the page path (without `.mdx` extension)
3. Ensure MDX frontmatter is valid (title and description required)
4. Restart `mint dev` if navigation was just updated
5. Check terminal for build errors

**Navigation Not Updating**:
1. **Restart `mint dev`** after any `docs.json` changes (required)
2. Clear browser cache (Ctrl/Cmd + Shift + R)
3. Verify JSON syntax is valid (no trailing commas, proper quotes)
4. Check terminal for validation errors

**Component Not Rendering**:
1. Verify Mintlify component syntax matches examples above
2. Check for unclosed tags (all components must be properly closed)
3. Ensure proper JSX structure (components must be on their own lines)
4. Common mistake: mixing MDX with HTML tags - use Mintlify components
5. Check terminal for JSX parsing errors

**Build Errors**:
1. Check terminal output for specific error messages
2. Verify all referenced files in navigation actually exist
3. Ensure no duplicate page paths in navigation
4. Validate frontmatter YAML syntax (check indentation, quotes)
5. Test syntax highlighting language codes are valid

**Images Not Loading**:
1. Verify image URL is accessible (test in browser)
2. Use Shopify CDN URLs: `https://cdn.shopify.com/s/files/1/0838/0052/3057/files/`
3. Wrap images in `<Frame>` component for consistent styling
4. Include `alt` attribute for accessibility

## External References

- **Weaverse Studio**: `https://studio.weaverse.io/dashboard`
- **GitHub**: `https://github.com/weaverse`
- **Community Slack**: `https://wvse.cc/weaverse-slack`
- **Mintlify Docs**: `https://mintlify.com/docs`
- **Shopify Hydrogen**: `https://hydrogen.shopify.dev`

## Package Versions

Documentation covers:
- **@weaverse/hydrogen**: v5.4.2
- **@weaverse/react**: v5.4.2
- **@weaverse/core**: v5.4.2
- **@weaverse/shopify**: v5.4.2
- **@weaverse/schema**: v0.7.3
- **@weaverse/cli**: Latest
- **@weaverse/mcp**: Latest

When documenting features, verify they match current SDK capabilities.
