# Next.js docs for @weaverse/next 1.0.1 server imports

- Status: implemented; awaiting the `@weaverse/next` 1.0.1 release
- Owner: @hta218
- Issue: https://github.com/Weaverse/docs/issues/82 (sub-issue of https://github.com/Weaverse/weaverse/issues/542)
- Branch: `docs/weaverse-next-1-0-1`
- Base: `main`
- Created: 2026-10-14
- Last updated: 2026-10-14

## Initiating Requirement

> vậy thì cần thêm 2 child issue cho issue này để sửa forward và docs nhé, sau đó /goal là chú làm cả 3 luôn cho a, xong thì /commit in multi commits + open PR nhé. A sẽ review mà merge lần lượt

## Summary

`@weaverse/next` 1.0.0 failed `next build` whenever a Server Component imported it, so the Next.js docs told readers to wrap every SDK component in their own `'use client'` module, and the quickstart's schema file (imported by the server-only registry) failed outright. 1.0.1 ships a client boundary; the docs now require 1.0.1, render `WeaverseNextStudioConnect` from the layout directly, and drop the workaround.
