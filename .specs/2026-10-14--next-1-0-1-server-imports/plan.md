# Plan

The SDK contract is in `weaverse/.specs/2026-10-14-next-client-boundary.md`.

## Changes

- `nextjs/overview.mdx`: requirement `@weaverse/next` 1.0.1 or later, with the 1.0.0 failure; Forward note no longer pins 1.0.0.
- `nextjs/quickstart.mdx`: the "import components only from your own `'use client'` modules" warning becomes a note that SDK components can be rendered from Server Components; `WeaverseRoot` stays a client module because it imports the theme schema. The schema sample keeps `createSchema` from `@weaverse/next`, which works on 1.0.1.
- `nextjs/studio.mdx`: the layout renders `WeaverseNextStudioConnect` directly; the wrapper module is gone.
- `nextjs/api-reference.mdx`: the root entry is for Server and Client Components, with a note on what each side gets.
- The changelog entry comes from the SDK release flow.

## Ordering

Merge after `@weaverse/next` 1.0.1 is published; until then the docs would describe a release that does not exist.

## Verification

- `mint validate` and `mint broken-links` pass.
- The quickstart pattern (SDK components in `app/layout.tsx`, `createSchema` in server code) builds on the 1.0.1 package in a Next 16.3 fixture, Turbopack and webpack (see the SDK spec).

## Files touched

`nextjs/overview.mdx`, `nextjs/quickstart.mdx`, `nextjs/studio.mdx`, `nextjs/api-reference.mdx`, this spec.
