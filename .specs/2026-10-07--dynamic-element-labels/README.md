# Dynamic Element Label Documentation

- Status: implemented; awaiting PR review
- Owner: @hta218
- Issue: https://github.com/Weaverse/docs/issues/59
- Branch: `docs/dynamic-element-labels`
- Base: `main`
- Created: 2026-10-07
- Last updated: 2026-10-07

## Initiating Requirement

Document the shipped `schema.label` callback in the existing Component Schema guide beside `title`/`type`, with an explicitly annotated `HeadingProps` example and a Pilot source link. Explain per-schema opt-in, `Title – label` display, synchronous plain-text output, fallback, preview-language data and minimum supported SDK versions. Keep the schema type reference aligned. Preserve article structure, images and navigation; do not introduce generic authoring APIs or rewrite unrelated guidance.

## Scope

- `development-guide/component-schema.mdx`: structural signature and a focused usage section.
- `api-reference/types.mdx`: published method signature and link to the canonical guide.
- No runtime changes, new public pages, navigation changes, merge or deployment.

## Contract Sources

- Published `@weaverse/schema@0.17.0` and `@weaverse/hydrogen@5.22.0`.
- Studio's current preview resolver and outline rendering behavior.
- [Pilot Heading](https://github.com/Weaverse/pilot/blob/main/app/components/heading.tsx).

## Verification

See `plan.md` for checks and results.
