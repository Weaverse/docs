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

- `features/image-focal-point.mdx` (new): setting a point in Studio, cover-only behavior, the `WeaverseImage.focalPoint` contract, applying it with `object-position`, caveats and validated `defaultValue`.
- `development-guide/input-settings.mdx`: a short pointer in the `image` section and the `focalPoint` field on `WeaverseImage`.
- `docs.json`: page added to the Features → Content Management group.
- The URL `https://docs.weaverse.io/features/image-focal-point` is linked from Studio and must not change.

## Contract Sources

- `@weaverse/hydrogen@5.23.0` and `@weaverse/schema@0.19.0` (Weaverse/weaverse#528).
- Studio dialog in Weaverse/builder#3181; Pilot rendering in Weaverse/pilot#194.

## Verification

See `plan.md`.
