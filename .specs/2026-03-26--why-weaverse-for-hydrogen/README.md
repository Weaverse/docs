# Feature: Add 'Why Weaverse for Hydrogen' Technical Advantages Page

| Field            | Value                                     |
| ---------------- | ----------------------------------------- |
| **Status**       | in-progress                               |
| **Owner**        | @hta218                                   |
| **Created**      | 2026-03-26                                |
| **Last Updated** | 2026-03-26                                |

## Original Prompt

> ## Context
>
> During a real sales conversation (TileMall — Shopify Plus store, 8200+ products), the client's director was evaluating Sanity as an alternative CMS. We need a documentation page that clearly articulates Weaverse's technical advantages for Hydrogen — useful for both developers evaluating the platform AND sales conversations.
>
> ## Proposed Location
>
> `/features/why-weaverse-for-hydrogen.mdx` or similar under `/features/`
>
> ## Content to Cover
>
> ### 1. Component Loader Pattern
> - Already documented in `/development-guide/data-fetching` — needs a positioned summary here
> - Each Weaverse section fetches its own data server-side
> - Built-in `fetchWithCache` with Hydrogen caching strategies
> - 3rd-party integrations (reviews, search, recommendations) render server-side out of the box
>
> ### 2. Server-Side Third-Party Data Fetching
> - Already documented in `/features/third-party-integrations` — reference and summarize
> - Comparison: other approaches require client-side JS injection or custom middleware
> - SEO benefit: content is in the initial HTML response
>
> ### 3. Infrastructure & Reliability
> - Shopify Oxygen hosting (edge, global CDN) — store availability backed by Shopify
> - Weaverse multi-region servers on Fly.io (US, EU, Australia)
> - Cloudflare Workers caching layer — API responses cached at edge for up to 24h
> - Even if Weaverse origin is down, store continues serving cached content
> - Status page: https://status.weaverse.io/
>
> ### 4. Shopify-Native Advantages
> - Checkout, B2B pricing, Shopify Functions — all work natively on Hydrogen
> - No need to rebuild commerce layer (cart, checkout, customer accounts)
> - Shopify app ecosystem compatibility
>
> ### 5. Content API (Roadmap)
> - Platform-agnostic CMS capabilities coming
> - Content data can be fetched and rendered anywhere — mobile app, second storefront, any platform
> - Not locked to Shopify's rendering layer
>
> ### 6. When Alternatives Make Sense
> - Be honest: if you need a general-purpose headless CMS for multi-platform content management beyond Shopify, Sanity/Contentful are valid choices
> - But for Shopify Hydrogen specifically, Weaverse is purpose-built
>
> ## Reference Issues
> - Related: Weaverse/builder#2175 (vs-sanity comparison page update)
> - Existing docs to reference:
>   - /development-guide/data-fetching
>   - /features/third-party-integrations
>   - /content-api/overview

## Summary

Add a new documentation page at `/features/why-weaverse-for-hydrogen.mdx` that articulates Weaverse's technical advantages for Shopify Hydrogen storefronts. The page serves both developers evaluating the platform and sales conversations, covering the component loader pattern, server-side data fetching, infrastructure reliability, Shopify-native benefits, Content API roadmap, and an honest comparison with alternatives like Sanity/Contentful.
