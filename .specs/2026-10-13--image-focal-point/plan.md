# Plan

1. Confirm the released type, schema validation, Studio dialog behavior and Pilot rendering.
2. Add a Focal point subsection to the `image` input docs. Keep existing headings, anchors and examples unchanged.
3. Validate MDX and links, then open a PR to `main` with separate page and spec commits.

## Files

- `development-guide/input-settings.mdx`
- `.specs/2026-10-13--image-focal-point/`

## Checks

- [x] `mint validate`
- [x] `mint broken-links --check-anchors`
- [x] `git diff --check`
