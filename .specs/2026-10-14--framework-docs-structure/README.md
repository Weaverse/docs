# Framework Docs Structure

- Status: completed
- Owner: @hta218
- Issue: https://github.com/Weaverse/docs/issues/81
- Branch: `docs/weaverse-next` (PR https://github.com/Weaverse/docs/pull/64)
- Base: `main`
- Created: 2026-10-14
- Last updated: 2026-10-16

## Initiating Requirement

Pages carried notes such as "`@weaverse/next` exports `useWeaverse` under the same name, so Next.js themes import it from `@weaverse/next` instead": an API that exists only on React Router or only on Next.js, or on both with slightly different code. Replace them with a structure where a reader picks a framework and sees only the pages for it. Put the framework selector in the left sidebar of the tabs that differ by framework (Guides and the SDK reference), not next to the logo where it reads as global; shared tabs such as Ecosystem and Help & Community need none. Add a global version selector for these docs as 5.x, ahead of a 6.x line for the SDK restructure (Weaverse/weaverse#547).

## Decisions

- **Version**: `navigation.versions` with one entry, `v5.x` (`Latest`, default). A `v6.x` entry comes with the 6.0 SDK docs.
- **Framework**: Mintlify `dropdowns` inside the **Guides** and **SDKs** tabs, **React Router** (default) and **Next.js**, each with its official logo (Simple Icons, CC0) in `images/icons/`.
- **Shared tabs**: Get Started, Ecosystem and Help & Community keep one tree.
- **Content API**: its own tab, grouped Overview / Projects / Pages / Theme settings / Languages. The former "API Reference" tab is now **SDKs**.
- **Links**: Weaverse.io, GitHub and Community move from sidebar anchors to the navbar, next to the Studio button.
- **Per-framework pages**: the React Router pages carry no Next.js notes; Next.js gets its own hook pages under `nextjs/api/`.

## Alternatives set aside

Synced code tabs, `<CodeGroup dropdown>` (it selects by code language, so two `tsx` blocks are indistinguishable), split API reference groups, an availability badge row, and a site-wide `products` switcher (a page belongs to one product, so shared pages pulled readers back to React Router; working around it needed snippet wrapper pages for every shared page).

## Verification

See `plan.md` for checks and results.
