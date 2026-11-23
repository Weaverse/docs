# Feature: Fix the Docs for @weaverse/hydrogen 6.3

| Field            | Value                                                                                                                                                                  |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Status**       | in-progress                                                                                                                                                            |
| **Owner**        | @hta218                                                                                                                                                                |
| **Issue**        | [#157](https://github.com/Weaverse/docs/issues/157) (partial), [#158](https://github.com/Weaverse/docs/issues/158), [#159](https://github.com/Weaverse/docs/issues/159) |
| **Branch**       | `docs/sdk-6-3-audit-fixes`                                                                                                                                             |
| **Created**      | 2026-11-13                                                                                                                                                             |
| **Last Updated** | 2026-11-13                                                                                                                                                             |

## Original Prompt

> Fix the Weaverse docs per GitHub issues Weaverse/docs#157 (partial), #158 and #159, in ONE pull request. Read all three issues and the two audit comments on Weaverse/docs#151 ("Claude finding" has per-page file:line details, "codex finding" has CF-xx details).
>
> Sources of truth: published SDK 6.3.1, SDK source (tag v6.3.1; CLI in packages/cli), Pilot (main), Forward (main). Verify every change against these; don't copy audit claims blindly. Skip items the audit marked unverified (Workers `v8_viteEnvironmentApi`, custom-domain DNS records) unless you can confirm them from authoritative sources.
>
> Scope:
> - #157: do the CSP items (rewrite features/content-security.mdx around Hydrogen 2026.10.3 `createContentSecurityPolicy({ nonce: false, shop, directives })` + `getWeaverseStudioCspDirectives(request)` exactly as Pilot's app/entry.server.tsx and app/weaverse/csp.ts do, with the 6.3.0 floor; propagate to every page listed; document `getWeaverseStudioCspDirectives` in api-reference and nextjs/api-reference.mdx; CSP section in nextjs/studio.mdx), the `loadPage()` contract wording (unassigned page → SDK fallback placeholder page, not null; `throwPageLoadFailures` → rejects with `WeaverseLoadError`; add Forward-style fallback check to the Next `loadWeaversePage` snippet), the async `projectId` restriction (CF-03), the `fetchCustomPages` not-published-only wording + custom-pages sitemap (Pilot ships sitemap-weaverse.xml), the local-cache-bypass note (CF-14), and the `WEAVERSE_API_KEY` warning (Weaverse/weaverse#517). For the Vercel preview-mode no-store line (CF-15): in the Next SDK `isPreviewMode` means synthetic section preview, so fix the docs to say no-store applies to design mode and revision preview only. Leave nothing else of #157 pending except what depends on the SDK adding a "no page" signal.
> - #158: all items (versions 6.3.1 / `@shopify/hydrogen >=2026.10.3`, v5 guide pins, non-compiling samples, broken examples, CLI commands/flags and weaverse-cli.mdx incl. `migrate v6`, `forward` template, `--pass`, shopify-hydrogen-skills page, reference pages for `useStudioSelection`, `WeaverseLoadError`, `useTranslation`/`TranslationProvider`, `WeaverseThemeSchema.outline`, Next server-client options, and the cleanups). Changelog/ is out of scope.
> - #159: all items (.mintignore, docs.json version label v6.x, redirect-or-delete hidden pages and repoint links, broken anchor). Prefer redirects in docs.json over deletion when a URL may have inbound links.

## Summary

Follow-up to the #151 audit: bring the docs in line with `@weaverse/hydrogen` 6.3.1, Hydrogen 2026.10.3, CLI 5.9.0, Pilot and Forward. It rewrites the CSP guidance, corrects the `loadPage()` and cache contracts, fixes code samples that don't compile, adds missing reference pages, and removes unlisted pages behind redirects. The only part of #157 left open waits on an SDK "no page" signal (Weaverse/weaverse#597).
