# Image Focal Point Documentation

- Status: in-progress
- Owner: @hta218
- Issue: https://github.com/Weaverse/docs/issues/68
- Branch: `docs/image-focal-point`
- Base: `main`
- Created: 2026-10-13
- Last updated: 2026-10-13

## Initiating Requirement

Studio's focal point dialog needs a docs link. Write the docs for the image focal point feature now; the docs ship to production before the builder release.

## Scope

- `development-guide/input-settings.mdx` only: a `#### Focal point` subsection in the `image` input section, the `focalPoint` field on `WeaverseImage`, and a link to Pilot's `Image` component as the reference implementation. No standalone feature page.
- The anchor `https://docs.weaverse.io/development-guide/input-settings#focal-point` is linked from Studio and must not change.

## Contract Sources

- `@weaverse/hydrogen@5.23.0` and `@weaverse/schema@0.19.0` (Weaverse/weaverse#528).
- Studio dialog in Weaverse/builder#3181; Pilot rendering in Weaverse/pilot#194.

## Verification

See `plan.md`.
