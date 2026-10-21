# Work Logs

## 2026-10-19 — @hta218

- Phase 1 done on `docs/adopt-mintlify-features`:
  - `docs.json` settings: `metadata.timestamp`, `seo`, `thumbnails`, `markdown.instructions` and `add-mcp`.
  - Directory listings on the Themes, Deployment and Help groups.
  - `<FileTree>`, `<GitHub.Repo>`, `<Prompt>`, `<View>` and `<Visibility for="agents">` on the pages listed in `plan.md`.
- Refreshed the `AGENTS.md` Package Versions from npm: hydrogen, react and core are on 5.23.0, next on 1.0.1, schema on 0.19.0 and shopify on 5.8.4.
- Phase 2 finding: builder already serves an OpenAPI 3.1 spec with 30 paths, while the docs cover 11 endpoints. Phase 2 points Mintlify at that spec.
- The banner is not shipped; it waits for an announcement.
- `mint validate` and `mint broken-links` pass.

## 2026-10-19 — @hta218 (review feedback)

- Dropped `<View>`, because it duplicated the sidebar framework dropdown. The Next.js content moved to the new `nextjs/third-party-integrations` page, and the `features/` page is unchanged from `main`.
- Fixed the Codex review: the Next.js API widget example now has its `schema.ts` and its server registry entry with the loader.
- `<Prompt>` cards now show the full prompt text in `description`.

## 2026-10-20 — @hta218

- Builder side: Weaverse/builder#3239 completed the Content API spec (valid OpenAPI 3.1, tags, descriptions, examples for all 51 operations). Weaverse/builder#3242 fixed the runtime mismatches it found. Both shipped in Studio 2026.10.36, with its changelog entry in docs#93.
- Phase 2 on `docs/content-api-openapi`:
  - The Content API tab generates its reference from the remote spec, under `/content-api/<tag>/<summary>`.
  - The overlay keeps the interactive playground on `GET` only.
  - Replaced the 11 hand-written endpoint pages with redirects, and moved the Portable Text guide to its own page.
- Checked: `mint validate` and `mint broken-links` pass. `mint dev` shows **Try it** on GET pages only, and the old URLs return 307 to the generated pages.
