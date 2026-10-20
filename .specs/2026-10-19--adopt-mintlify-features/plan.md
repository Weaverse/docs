# Plan: Adopt Mintlify Features We Don't Use Yet

Issue: [Weaverse/docs#80](https://github.com/Weaverse/docs/issues/80). Free (Starter) plan only.

## Decisions

- Three phases, one PR each:
  1. `docs.json` settings, new content components and agent-only guidance.
  2. An OpenAPI-driven Content API reference.
  3. A TypeDoc-generated SDK reference.
- Phase 1 ships on `docs/adopt-mintlify-features`. Phases 2 and 3 get their own branches off `main` and update this spec.
- Phase 3 depends on work in `Weaverse/weaverse`, so it may move to its own issue.
- The Mintlify feature check was done 2026-10-19 against the Mintlify docs, changelog and pricing. Every item in the issue exists, and every item in scope is available on Starter. The paid-only list in the issue is confirmed and stays out of scope.
- All theme repos are public: `Weaverse/pilot`, `forward`, `aspen`, `maison` and `naturelle`.

## Phase 1: Settings, Components, Agent Guidance

### 1.1 Site settings (`docs.json`)

| Key | Value | Notes |
|---|---|---|
| `metadata.timestamp` | `true` | Uses the date of the last Git commit that touched the page. Override per page with `lastUpdatedDate`. |
| `seo.metatags` | `og:site_name`, `twitter:site`, `keywords` | Global defaults. Per-page frontmatter still wins. |
| `seo.organization` | `name: "Weaverse"`, `url`, `logo`, `sameAs` (GitHub, X, LinkedIn, Slack) | JSON-LD. |
| `thumbnails` | `{ "preset": "headline", "appearance": "dark" }` | Generated social previews in brand colors. No image files needed. |
| `contextual.options` | append `"add-mcp"` | Keep the existing order. `download-spec` comes in Phase 2. |
| `banner` | not shipped | Add it when there is an announcement (for example the 6.x SDK): `{ "content": "...", "dismissible": true }`. |

### 1.2 Directory listings (`navigation.directory`)

A directory listing only renders on groups that have a `root` page. Set `root` and `"directory": "card"` on these groups, then delete the `CardGroup`s that only repeat the child pages:

| Tab → Group | Root page | Hand-written cards to delete |
|---|---|---|
| Ecosystem → Themes | `hydrogen-themes/index` | the "Available Themes" link lists |
| Guides (React Router) → Deployment | `guides/deployment/index` | "Deployment Options" cards, if they only list children |
| Help & Community → Help | `resources/index` | "Learning Resources" / "Quick References" link lists |
| Content API → (top level) | `content-api/overview` | leave as is until Phase 2 |

Keep any hand-written cards that add context (descriptions, external links). Only delete exact duplicates. `ecosystem/index` mixes several groups, so it keeps its manual cards.

### 1.3 Content components

**`<FileTree>`** (Markdown-list form). It needs a blank line after the opening tag and before the closing tag.

- Converted: `intro/project-structure`, `getting-started/index`, `development-guide/creating-components`, `resources/faq`, `hydrogen-themes/index` and `developer-tools/shopify-hydrogen-skills`. The per-line comments moved into a table or list after the tree.
- Left as-is: these trees show data or request flows, not folder layouts.
  - `features/analytics-tracking`
  - `resources/tutorial`
  - `hydrogen-integrations/*` (7 pages)

**`<GitHub.Repo>`**: `<GitHub.Repo repo="Weaverse/<theme>" />` near the top of:

- `hydrogen-themes/pilot-theme-overview.mdx`
- `hydrogen-themes/forward.mdx`
- `hydrogen-themes/index.mdx`: one card per theme, including Aspen, Maison and Naturelle.

It replaces plain "available on GitHub" links where it duplicates them.

**`<Prompt>`**: `<Prompt description="..." actions={["copy", "cursor"]}>`:

- `developer-tools/shopify-hydrogen-skills.mdx`: usage prompts for AI agents. The `npx skills add` command stays a `bash` code block.
- `developer-tools/weaverse-mcp.mdx`: example prompts, if the page has any as plain code blocks.
- If a page has no prompt-shaped content, skip it.

**`<View>`**: not used. The sidebar framework dropdowns already switch frameworks, and an in-page View would be a second selector out of sync with them. Next.js content gets its own page instead: `nextjs/third-party-integrations` replaces `features/third-party-integrations` in the Next.js dropdown, and the `features/` page stays React Router only.

**`<Prompt>`**: the card only renders `description`, so each prompt repeats its full text in `description` to keep it readable.

### 1.4 Agent-only guidance

`docs.json` → `markdown.instructions`. It renders as an "Agent Instructions" block in `llms.txt`, `llms-full.txt` and every page's `.md`:

```json
"markdown": {
  "instructions": [
    "Weaverse component config uses `settings`; `inspector` is deprecated and must not be generated.",
    "Hydrogen themes use React Router v7: import from `react-router`, never `react-router-dom` or `@remix-run/*`.",
    "Define schemas with `createSchema()` from `@weaverse/hydrogen` (React Router) or `@weaverse/next` (Next.js).",
    "Current SDK line: @weaverse/hydrogen 5.x. Check the version selector before using APIs from other lines.",
    "Prefer the Weaverse MCP server (developer-tools/weaverse-mcp) for live project data."
  ]
}
```

Before shipping, read the SDK versions from `AGENTS.md` → Package Versions, and refresh that section if it is stale.

`<Visibility for="agents">` adds page-level notes on pages where agents often go wrong:

| Page | Note |
|---|---|
| `development-guide/component-schema.mdx` | `inspector` vs `settings` |
| `api-reference/types.mdx` | deprecated type aliases |
| `migration-advanced/v5-migration.mdx` | which APIs are removed in v5 |

`for` must be a static string, or the content is dropped from the Markdown output.

### 1.5 Verification (before push)

- `mint dev` starts with no `docs.json` validation errors.
- `mint broken-links` passes.
- Spot-check these pages:
  - A converted FileTree page.
  - The theme cards: stars and forks load.
  - `features/third-party-integrations`: the View switcher appears and the table of contents follows it.
  - A directory listing on the Themes group.
- `/llms.txt` and `<page>.md` contain the Agent Instructions block. The `<Visibility for="agents">` text appears in the `.md` but not on the HTML page.
- The page header shows "Last updated". The contextual menu shows "Add MCP".
- After deploy, the social preview renders (opengraph.xyz or the X card validator).

## Phase 2: Content API From OpenAPI

### Finding

Builder already maintains an OpenAPI 3.1 spec:

- File: `builder/app/routes/api/v1/content/openapi.json`, served publicly at `https://studio.weaverse.io/api/v1/content/openapi.json`.
- Scope: 30 paths with a `bearerAuth` scheme that documents the scopes.
- Coverage: the docs cover 11 endpoints by hand. The spec also has versions, drafts, global sections, translations, backups, export/import, previews and hostnames.

### Approach

1. **Spec source**: point Mintlify at the builder spec. Do not hand-write a copy.
   - Preferred: the remote URL in `docs.json` (`"openapi": "https://studio.weaverse.io/api/v1/content/openapi.json"`), if Mintlify accepts a URL there. Check in Phase 2.
   - Fallback: copy it to `api/content-api.openapi.json` with a sync script or a builder CI step that opens a PR on `Weaverse/docs`.
2. **Navigation**: the Content API tab keeps `content-api/overview` (prose: auth, keys, scopes, rate limits, errors). The endpoint groups become MDX pages with `openapi: "<spec> GET /projects/{projectId}/pages"` frontmatter. These keep the current URLs and let us add prose such as handle rules and page-type lists. Use auto-generated pages only for endpoints we never document by hand.
3. **`docs.json`**:
   - `api.openapi`.
   - `api.examples.languages: ["curl", "javascript", "python"]`.
   - `api.playground.display: "interactive"`.
   - Append `"download-spec"` to `contextual.options`. It only shows on API reference pages.
4. **Content diff**:
   - Move any prose from the current MDX that the spec lacks (handle rules, page-type lists) into spec `description`s upstream in builder. Otherwise keep it as MDX body under the generated reference.
   - Report spec gaps, such as missing examples, as builder issues. Don't patch them in docs.
5. **Exposure**: decide with the owner which of the 19 undocumented endpoints are public. Hide internal ones in the spec with `x-hidden` or `x-excluded`.
6. **Redirects**: none if the MDX filenames stay. Otherwise add entries under `redirects`.

### Open questions

- Is the playground safe to expose, given that readers paste a real API key and the requests hit production? Add a `Warning` callout to the overview.
- Should the builder spec be the single source of truth, so that docs never edit endpoint details?

## Phase 3: SDK Reference From TypeDoc

### Approach

1. **In `Weaverse/weaverse`**: run `typedoc --json` on release for the public entry points of `@weaverse/hydrogen`, `@weaverse/next` and `@weaverse/schema`. Tag exports with `@category` (Hooks / Components / Utilities / Types) so Mintlify's navigation follows the current groups.
2. **Delivery**: a release workflow commits the artifacts to `docs/sdk-artifacts/<package>.json` with a PR on `Weaverse/docs`. List `sdk-artifacts/` in `.mintignore`.
3. **`docs.json`**: an `sdk: { format: "typedoc", source: "sdk-artifacts/hydrogen.json", directory: "api-reference/generated" }` group under SDKs → React Router, plus the equivalent for Next.js.
   - A tab or group with `sdk` cannot also have `pages`.
   - Auto-generation stops if any page in that tab or group has `sdk` frontmatter.
   - So the hand-written guides (`introduction`, usage-heavy hook pages) move to a sibling group.
4. **Migration**: compare each hand-written `api-reference/*.mdx` page with its generated page. Move usage examples into TSDoc `@example` blocks upstream, then delete the duplicates and add redirects.
5. **Version selector**: generated pages live under `v5.x`. Add `v6.x` artifacts when the 6.0 SDK ships (Weaverse/weaverse#547).

### Risks

- TSDoc coverage in the SDK is thin today, so the generated pages are only as good as the comments. Budget time to write comments upstream.
- This needs CI in another repo. If that is blocked, split it into a new issue and close #80 with Phases 1 and 2.

## Out of Scope (paid plans)

- Assistant (Pro)
- Narration (Pro)
- WebMCP (Pro)
- PDF export (Enterprise)
- Search filters (Enterprise)
- The `assistant` and `download-pdf` contextual options

## Files and Folders Touched

### Phase 1

| Path | Change |
|---|---|
| `docs.json` | `metadata`, `seo`, `thumbnails`, `markdown`, `contextual.options`, group `root` + `directory` |
| `intro/project-structure.mdx`, `getting-started/index.mdx`, `development-guide/creating-components.mdx`, `resources/faq.mdx` | ASCII trees → `<FileTree>` |
| `hydrogen-themes/index.mdx` | `<FileTree>`, `<GitHub.Repo>` per theme, delete duplicate link lists |
| `hydrogen-themes/pilot-theme-overview.mdx`, `hydrogen-themes/forward.mdx` | `<GitHub.Repo>` |
| `developer-tools/shopify-hydrogen-skills.mdx` | `<FileTree>`, `<Prompt>` |
| `developer-tools/weaverse-mcp.mdx` | `<Prompt>` (read-only "Try it" prompt) |
| `nextjs/third-party-integrations.mdx` (new) | Next.js version of the third-party integration guide; replaces the shared page in the Next.js dropdown |
| `resources/index.mdx` | delete the "Learning Resources" links that the directory listing duplicates (`guides/deployment/index` keeps its content) |
| `development-guide/component-schema.mdx`, `api-reference/types.mdx`, `migration-advanced/v5-migration.mdx` | `<Visibility for="agents">` notes |
| `AGENTS.md` | refresh Package Versions; note the new components and settings |

### Phase 2

| Path | Change |
|---|---|
| `docs.json` | `api` block, `download-spec`, Content API navigation |
| `content-api/*.mdx` | tables → `openapi` frontmatter, keep the prose |
| `api/content-api.openapi.json` | only if the remote URL is unsupported (synced copy) |
| `builder/app/routes/api/v1/content/openapi.json` (other repo) | upstream description and example fixes |

### Phase 3

| Path | Change |
|---|---|
| `sdk-artifacts/` (new), `.mintignore` (new) | TypeDoc JSON artifacts |
| `docs.json` | `sdk` groups under SDKs |
| `api-reference/*.mdx`, `nextjs/api/*.mdx` | slim down or redirect to the generated pages |
| `Weaverse/weaverse` CI and TSDoc comments (other repo) | artifact generation |

### Spec

- `.specs/2026-10-19--adopt-mintlify-features/` (`README.md`, `plan.md`, `work-logs.md` when work spans sessions)
