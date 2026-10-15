# Next.js docs for @weaverse/next 1.0.1 server imports

- Status: implemented; awaiting PR review (`@weaverse/next` 1.0.1 published 2026-10-15)
- Owner: @hta218
- Issue: https://github.com/Weaverse/docs/issues/82 (sub-issue of https://github.com/Weaverse/weaverse/issues/542)
- Branch: `docs/weaverse-next-1-0-1`
- Base: `main`
- Created: 2026-10-14
- Last updated: 2026-10-15

## Initiating Requirement

> Then this issue needs two child issues, to fix Forward and the docs. After that, the goal is for you to do all three for me, then /commit in multiple commits and open the PRs. I will review and merge them one by one.

## Summary

`@weaverse/next` 1.0.0 failed `next build` whenever a Server Component imported it, so the Next.js docs told readers to wrap every SDK component in their own `'use client'` module, and the quickstart's schema file (imported by the server-only registry) failed outright. 1.0.1 ships a client boundary; the docs now require 1.0.1, render `WeaverseNextStudioConnect` from the layout directly, and drop the workaround.
