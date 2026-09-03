# Technical Documentation Accuracy Refresh

| Field            | Value                                   |
| ---------------- | --------------------------------------- |
| **Status**       | implemented                             |
| **Branch**       | `docs/vivienne-technical-audit`         |
| **Created**      | 2026-08-24                              |
| **Last Updated** | 2026-09-03                              |

## Scope

Audit Vivienne's candidate commit `a0561c3d59b824d18b54024d5b544126d7a8cc82` against current docs main and production Builder/SDK behavior, then port only accurate, nonredundant changes.

## Non-Scope

- Builder, SDK, or other product-code changes.
- The separate 32-file `7cb9b84c90992863e6c3c06d0901e737ef2da245` pass or Notion screenshot audits.
- Publishing, deployment, commits, PR creation, or other external-state changes.

## Authoritative Evidence

- Docs main `4aff03b164d3bd3f9edf738115c5fcdbdf5aa911`.
- Builder production `d71600a977434acf6b7484c970873e1e58ea9a34`: Content API routes and helpers under `app/routes/api/{v1/content,public/v1}/` and `app/backend/content-api/`.
- Weaverse SDK `288b26cbd7a47fc3aef736a25e601453263821c9`: Hydrogen/schema types, schema normalization, `createSchema`, and CLI behavior.
- Published `@weaverse/cli@5.6.4` for the `@latest` command behavior documented here.
- Candidate `a0561c3d59b824d18b54024d5b544126d7a8cc82` is source material only, not authority.

## Acceptance Criteria

- [x] New Content API pages describe current request, selector, pagination, and snapshot behavior without unsupported guarantees.
- [x] Get-page fallback order and schema-default resolution match Builder source.
- [x] SDK schema docs match current public types and development-only warning validation.
- [x] CLI guidance distinguishes interactive startup from deterministic manual startup.
- [x] Every added navigation entry resolves once to an MDX file.
- [x] `docs.json` parsing, navigation integrity, and `git diff --check` pass.
- [x] The final diff is limited to the 13 audited source files, with this dated spec moved forward per repository policy.
