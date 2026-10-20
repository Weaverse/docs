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
