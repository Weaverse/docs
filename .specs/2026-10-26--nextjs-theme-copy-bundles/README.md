# Next.js docs: JSON theme copy and per-language bundles

- Status: in-progress
- Owner: @hta218
- Issue: https://github.com/Weaverse/docs/issues/104 (with https://github.com/Weaverse/forward/issues/111)
- Branch: `docs/json-theme-copy`
- Base: `main`
- Created: 2026-10-26
- Last updated: 2026-10-26

## Initiating Requirement

> Hmm, why isn't that static-content a JSON file? Look at our translation docs again, and check Pilot too.
>
> So if JSON keeps the types, I think we should use a JSON file; the comments don't really matter.
>
> 2. Create 2 issues, in the forward and docs repos. Then do it right away. The goal is to finish both, /commit in multiple commits, and open 2 PRs for me to review.

## Summary

The Next.js guide showed theme copy as a TypeScript object, while the Hydrogen guide and Pilot use `en.json`. It now shows theme copy as `translations/en.json` with a derived key type, and adds how to ship per-language files: merge the market's language over the default on the server and pass it as `staticContent`, so Studio translations still win. This matches Forward (Weaverse/forward#111).
