# Feature: Document App-Owned CSP for Weaverse Themes

| Field            | Value                                              |
| ---------------- | -------------------------------------------------- |
| **Status**       | in-progress                                        |
| **Owner**        | @hta218                                            |
| **Issue**        | [#113](https://github.com/Weaverse/docs/issues/113) |
| **Branch**       | `docs/113-app-owned-csp`                           |
| **Created**      | 2026-10-29                                         |
| **Last Updated** | 2026-10-29                                         |

## Original Prompt

> Create a sub-issue for the CSP docs under the Hydrogen 2026.10 epic (Weaverse/weaverse#543), then implement it and open a PR.
>
> Update `features/content-security.mdx` (main page) and `troubleshooting/preview-errors.mdx` (CSP section), and fix other pages that show `createContentSecurityPolicy`, `getWeaverseCsp`, `NonceProvider`, `useNonce`, `frameAncestors` consistently. Source of truth is Pilot after Weaverse/pilot#204.
>
> Cover: (1) who owns CSP: Hydrogen 2026.4 shipped `createContentSecurityPolicy` / `NonceProvider` / `useNonce`, Hydrogen 2026.10 removes them, Pilot ships `app/utils/csp.ts` that themes can copy, and how `entry.server.tsx` / `entry.client.tsx` use it; (2) sources Weaverse Studio requires: `frame-ancestors *` in design mode, Weaverse hosts in `script-src`, `connect-src`, `style-src`, the bridge script is injected without a nonce, `script-src` replaces `default-src` for scripts (cause of pilot#170), `'unsafe-eval'` in design mode only; (3) common third-party sources: YouTube, GTM/GA, Google Fonts, `https://unpkg.com` for the 3D model viewer, Shopify CDN; (4) rolling out enforcement: start with Report-Only, a test checklist, read console violations and add the blocked origin to the named directive; (5) harmless console noise: DoubleClick CORS errors inside the YouTube iframe, source-map fetches blocked by `connect-src` only with DevTools open.

## Summary

Hydrogen 2026.10 removes its CSP helpers, so Weaverse themes build the CSP header and nonce themselves, as Pilot does since Weaverse/pilot#204. These docs explain that setup, the sources Studio and common services need, and how to move from report-only to an enforced policy.
