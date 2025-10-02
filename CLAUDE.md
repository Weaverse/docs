# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Weaverse Documentation Site** - Mintlify-based documentation for Weaverse, a universal visual page builder for Shopify Hydrogen storefronts. This documentation covers Weaverse SDKs, CLI tools, MCP server, and the complete API reference for building custom Hydrogen themes.

## Technology Stack

- **Documentation Framework**: Mintlify
- **Configuration**: `docs.json` (Mintlify schema)
- **Content Format**: MDX (Markdown with JSX components)
- **Deployment**: Mintlify hosting with GitHub integration

## Development Commands

### Local Development
```bash
# Install Mintlify CLI globally
npm i -g mint

# Start local preview server (runs on http://localhost:3000)
mint dev

# Update to latest Mintlify CLI version
mint update
```

### Content Validation
```bash
# Check that docs.json is valid
# Run mint dev - it will validate the config on startup
mint dev
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

**Navigation Tabs**:
1. **Docs** - Main documentation (Getting Started, Core Concepts, Development Guide, Features, Deployment)
2. **API Reference** - Hooks, Components, Utilities, Types
3. **Themes** - Templates and migration guides
4. **Resources** - Release notes, tutorials, FAQ, community

**Important**: When adding new pages, you MUST update `docs.json` navigation array. Pages won't appear until they're listed in the navigation structure.

## Content Guidelines

### MDX Frontmatter

All `.mdx` files should include frontmatter:

```yaml
---
title: "Page Title"
description: "Page description for SEO and previews"
published: true  # Optional, defaults to true
---
```

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

### When Adding New API Documentation

1. Create file in `api-reference/`
2. Add frontmatter with title and description
3. Update `docs.json` navigation under appropriate API group
4. Follow existing structure:
   - Introduction/description
   - Import example
   - Usage example
   - Parameters/props table
   - Return value
   - Full example

### When Adding New Guide

1. Create file in appropriate directory (`development-guide/`, `features/`, etc.)
2. Add frontmatter
3. Update `docs.json` navigation
4. Use CardGroup for navigation to related content
5. Include code examples with syntax highlighting
6. Add troubleshooting section if applicable

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

- **Navigation Updates**: Always update `docs.json` when adding new pages
- **Component Names**: Use `settings` not `inspector` in all documentation
- **Code Accuracy**: Verify code examples match current SDK versions
- **Mintlify Syntax**: Use Mintlify components, not raw HTML where possible
- **Links**: Use relative paths for internal links, absolute for external

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

- `mint dev` must be run from directory containing `docs.json`
- Preview runs on `http://localhost:3000`
- Hot reload enabled for `.mdx` file changes
- Restart required for `docs.json` changes
- 404 errors indicate missing navigation entry or incorrect file path

## Style Guidelines

- Use **Title Case** for headings and navigation
- Keep descriptions concise (under 160 characters for SEO)
- Code blocks should specify language for syntax highlighting
- Use emoji sparingly, only in callouts when appropriate
- Prefer numbered steps for sequential instructions
- Use bullet points for feature lists and options

## Common Issues

**Page Shows 404**:
- Verify file exists at correct path
- Check `docs.json` navigation includes the page
- Ensure MDX frontmatter is valid

**Navigation Not Updating**:
- Restart `mint dev` after `docs.json` changes
- Clear browser cache

**Component Not Rendering**:
- Verify Mintlify component syntax
- Check for unclosed tags
- Ensure proper JSX structure

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
