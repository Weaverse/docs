# Feature: Adopt Mintlify features we don't use yet

| Field            | Value                                                   |
| ---------------- | ------------------------------------------------------- |
| **Status**       | completed                                               |
| **Owner**        | @hta218                                                 |
| **Issue**        | [#80](https://github.com/Weaverse/docs/issues/80)       |
| **Branch**       | `docs/adopt-mintlify-features`                          |
| **Created**      | 2026-10-19                                              |
| **Last Updated** | 2026-10-21                                              |

## Original Prompt

> ## Problem
>
> Mintlify has shipped many components and settings our docs don't use yet. We are on the free plan, so this covers features available without a paid plan. Paid-only features are listed at the end for reference.
>
> ## Scope
>
> ### API and SDK reference
>
> - [ ] Describe the Content API with an OpenAPI spec (`api.openapi`) instead of hand-written Markdown tables: API playground, generated code samples, and `download-spec` in the contextual menu. Confirm the playground is available on the free plan.
> - [ ] Generate the SDK reference (`@weaverse/hydrogen`, `@weaverse/schema`, …) from TypeDoc (`sdk` frontmatter) so `api-reference/` stays in sync with published versions.
>
> ### Content components
>
> - [ ] Use `<View>` to switch between Hydrogen and Next.js on pages shared by both frameworks.
> - [ ] Use `<Prompt>` for copyable AI prompts (Agent Skills, AI setup guides) instead of plain code blocks.
> - [ ] Use `<GitHub.Repo>` cards on theme pages (Pilot, Aspen, Maison, Naturelle).
> - [ ] Use `<Tree>` / `<FileTree>` for project structure pages instead of ASCII trees.
>
> ### AI agents
>
> - [ ] Add agent-only guidance with `<Visibility for="agents">` and `markdown.instructions` (for example: use `settings`, not `inspector`; import from `react-router`; current SDK versions). The guidance shows up in `llms.txt` and each page's Markdown.
> - [ ] Add `add-mcp` to the contextual menu.
>
> ### Site settings (`docs.json`)
>
> - [ ] `metadata.timestamp: true` to show when each page was last updated.
> - [ ] SEO: `seo.metatags`, `thumbnails` (social preview images), and `seo.organization` (JSON-LD).
> - [ ] `banner` for major announcements.
> - [ ] `navigation.directory` to generate child-page listings on group root pages instead of maintaining `CardGroup`s by hand.
>
> ## Paid-only (not planned)
>
> - Assistant (AI chat on the docs site).
> - Narration ("Listen to this page" audio).
> - WebMCP, PDF export, and search filters.
>
> ## References
>
> - [Mintlify docs](https://www.mintlify.com/docs)
> - [Mintlify changelog](https://www.mintlify.com/docs/changelog)

## Summary

Adopt free-plan Mintlify features the docs don't use yet: an OpenAPI-driven Content API reference, generated SDK reference, newer content components (`<Prompt>`, `<GitHub.Repo>`, `<Tree>`; per-framework pages instead of `<View>`), agent-only guidance, and `docs.json` site settings (timestamps, SEO, banner, directory listings). The goal is less hand-maintained content and better output for readers and AI agents.
