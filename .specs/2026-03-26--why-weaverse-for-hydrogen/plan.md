# Add "Why Weaverse for Hydrogen" Technical Advantages Page

> **Created**: 2026-03-26
> **Status**: Draft

---

## Original Prompt

Add a documentation page at `/features/why-weaverse-for-hydrogen.mdx` that articulates Weaverse's technical advantages for Shopify Hydrogen — useful for both developers evaluating the platform AND sales conversations. Covers: Component Loader Pattern, Server-Side Third-Party Data Fetching, Infrastructure & Reliability, Shopify-Native Advantages, Content API (Roadmap), and When Alternatives Make Sense.

---

## Summary

Create a single new MDX documentation page under `/features/` and register it in the `docs.json` navigation. The page is a technical positioning piece that summarizes existing docs (data-fetching, third-party integrations, Content API) and adds new infrastructure/reliability and Shopify-native content. It must read well for both engineers evaluating Weaverse AND non-technical stakeholders in a sales context.

---

## Requirements

### Functional Requirements

- [ ] FR1: Create `features/why-weaverse-for-hydrogen.mdx` with proper frontmatter
- [ ] FR2: Section 1 — Component Loader Pattern (summary + link to `/development-guide/data-fetching`)
- [ ] FR3: Section 2 — Server-Side Third-Party Data Fetching (summary + link to `/features/third-party-integrations`)
- [ ] FR4: Section 3 — Infrastructure & Reliability (Oxygen, Fly.io, Cloudflare Workers, status page)
- [ ] FR5: Section 4 — Shopify-Native Advantages (checkout, B2B, Functions, app ecosystem)
- [ ] FR6: Section 5 — Content API (summary + link to `/content-api/overview`, roadmap note)
- [ ] FR7: Section 6 — When Alternatives Make Sense (honest comparison)
- [ ] FR8: Add page to `docs.json` navigation under the "Features" tab
- [ ] FR9: Cross-link to existing docs where content already exists

### Non-Functional Requirements

- [ ] NFR1: Page follows existing Mintlify MDX patterns (frontmatter, components, style)
- [ ] NFR2: Content is scannable — use cards, callouts, tables, and short paragraphs
- [ ] NFR3: Tone is confident but honest — especially in the "alternatives" section
- [ ] NFR4: No code-heavy examples — this is a positioning/overview page, link to detailed docs

### Out of Scope

- Full comparison matrix with Sanity/Contentful (that's Weaverse/builder#2175)
- New images or diagrams (can be added later)
- Changes to existing docs pages

---

## Technical Approach

### Solution Overview

This is a documentation-only change. Create one new MDX file following the established Mintlify patterns observed in existing feature pages (frontmatter with title/description/published, Mintlify components like `<Card>`, `<CardGroup>`, `<Note>`, `<Tip>`, `<Warning>`, `<Steps>`). Register the page in `docs.json` navigation under the "Features" tab in a new group called "Why Weaverse" (placed first for visibility).

### Page Structure

```
# Why Weaverse for Hydrogen

Brief intro — what this page covers and who it's for.

## Component Loader Pattern
- Each section fetches its own data server-side via `loader`
- Built-in `fetchWithCache` with Hydrogen caching strategies
- 3rd-party data (reviews, search, recommendations) rendered server-side
- <Tip> linking to /development-guide/data-fetching for full details

## Server-Side Third-Party Data
- Comparison table: Weaverse SSR vs. client-side JS injection vs. custom middleware
- SEO benefit: content in initial HTML
- <Tip> linking to /features/third-party-integrations

## Infrastructure & Reliability
- Shopify Oxygen hosting (edge, global CDN)
- Weaverse multi-region on Fly.io (US, EU, Australia)
- Cloudflare Workers caching (edge, up to 24h)
- Resilience: cached content served even if Weaverse origin is down
- Link to https://status.weaverse.io/

## Shopify-Native Advantages
- Checkout, B2B pricing, Shopify Functions — all native
- No commerce layer rebuild needed
- Shopify app ecosystem compatibility
- Table comparing native vs. rebuild approach

## Content API
- Platform-agnostic CMS capabilities
- Fetch content anywhere (mobile, second storefront, any platform)
- Not locked to Shopify rendering
- <Note> marking this as available with link to /content-api/overview

## When to Consider Alternatives
- Honest guidance on when Sanity/Contentful are valid
- Clear positioning: for Shopify Hydrogen, Weaverse is purpose-built
- <Warning> callout for balanced tone

## Next Steps
- CardGroup linking to quickstart, data-fetching, third-party-integrations, content-api
```

---

## Implementation Structure

### Files to Create

| File | Purpose |
|------|---------|
| `features/why-weaverse-for-hydrogen.mdx` | New documentation page — technical advantages of Weaverse for Hydrogen |

### Files to Modify

| File | Changes |
|------|---------|
| `docs.json` | Add page to `navigation.tabs` → "Features" tab. Add a new group "Why Weaverse" with the single page, placed as the **first** group in the Features tab for visibility |

### Navigation Change Detail

In `docs.json`, under the `"Features"` tab, add a new group at the **top** of the pages array:

```json
{
  "group": "Why Weaverse",
  "pages": ["features/why-weaverse-for-hydrogen"]
}
```

This goes before the existing "Content Management" group.

---

## Implementation Steps

### Step 1: Create the MDX file

Create `features/why-weaverse-for-hydrogen.mdx` with:

1. **Frontmatter**: title, description, published
2. **Intro paragraph**: Brief context — who this page is for (developers evaluating Weaverse, technical decision-makers)
3. **Section 1 — Component Loader Pattern**:
   - Explain that each Weaverse section has its own `loader` function for server-side data fetching
   - Mention `fetchWithCache` and Hydrogen caching strategies (`CacheShort`, `CacheLong`, `CacheCustom`)
   - Highlight that 3rd-party integrations (reviews, search, recommendations) render server-side automatically
   - Add `<Tip>` callout linking to `/development-guide/data-fetching` for implementation details
4. **Section 2 — Server-Side Third-Party Data**:
   - Add a comparison table: Weaverse SSR approach vs. traditional client-side JS injection vs. custom middleware
   - Emphasize SEO benefit: all content in the initial HTML response, no client-side hydration needed for data
   - Add `<Tip>` callout linking to `/features/third-party-integrations`
5. **Section 3 — Infrastructure & Reliability**:
   - Shopify Oxygen: edge hosting, global CDN, Shopify-backed availability
   - Weaverse servers: multi-region on Fly.io (US, EU, Australia)
   - Cloudflare Workers: API responses cached at edge for up to 24 hours
   - Resilience story: even if Weaverse origin goes down, stores continue serving cached content
   - Link to status page: https://status.weaverse.io/
6. **Section 4 — Shopify-Native Advantages**:
   - Checkout, B2B pricing, Shopify Functions all work natively on Hydrogen
   - No need to rebuild commerce layer (cart, checkout, customer accounts)
   - Full Shopify app ecosystem compatibility
   - Add a comparison table: native Hydrogen vs. rebuilding with a general CMS
7. **Section 5 — Content API**:
   - Platform-agnostic CMS capabilities
   - Content data fetchable from anywhere — mobile apps, second storefronts, any platform
   - Not locked to Shopify's rendering layer
   - Add `<Note>` that Content API is available, link to `/content-api/overview`
8. **Section 6 — When to Consider Alternatives**:
   - Be honest: general-purpose headless CMS (Sanity, Contentful) are valid for multi-platform content management beyond Shopify
   - But for Shopify Hydrogen specifically, Weaverse is purpose-built
   - Use a `<Warning>` or balanced callout
9. **Next Steps section**:
   - `<CardGroup>` with links to quickstart, data-fetching guide, third-party integrations, Content API

### Step 2: Update docs.json navigation

Add the new group `"Why Weaverse"` as the **first** group in the Features tab's pages array, containing `"features/why-weaverse-for-hydrogen"`.

### Step 3: Verify locally

Run `mint dev` and verify:
- Page renders correctly at `/features/why-weaverse-for-hydrogen`
- Navigation shows the page under Features → Why Weaverse
- All internal links work
- Mintlify components render properly

---

## Files & Folders Touched

| Path | Action |
|------|--------|
| `features/why-weaverse-for-hydrogen.mdx` | **Create** — new page |
| `docs.json` | **Modify** — add navigation entry |
| `.specs/2026-03-26--why-weaverse-for-hydrogen/README.md` | **Create** — spec README (already done) |
| `.specs/2026-03-26--why-weaverse-for-hydrogen/plan.md` | **Create** — this plan file |
