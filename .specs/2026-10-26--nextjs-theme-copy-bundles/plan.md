# Plan

## Changes

`nextjs/markets-translations.mdx`:

- Theme schema example imports `STATIC_CONTENT` from `@/translations/en.json`.
- "Translate theme copy" shows a JSON file and how to derive a `TranslationKey` type from the typed JSON import.
- New "Ship translations for other languages" subsection: a server-only `themeContent(locale)` that deep-merges the market language's file over the default; pick by language, not country; pass as `staticContent`, never `merchantOverrides`; keep the schema's `staticContent` on the default language; resolve on the server so the browser gets one language.
- `WeaverseRoot` takes a `staticContent` prop; the layout passes `themeContent(locale)`; the `createTranslate` example uses it too.
- The resolution order and the Studio section say which source each step is.

Code samples keep the docs' `let` style.

## Verification

- `mint broken-links` and `mint validate` pass.

## Files touched

- `nextjs/markets-translations.mdx`
- `.specs/2026-10-26--nextjs-theme-copy-bundles/`
