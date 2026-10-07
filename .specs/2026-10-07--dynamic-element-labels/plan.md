# Plan

1. Verify the released schema signature, preview callback evaluation and current outline display; keep the SDK-only declaration separate from Studio behavior.
2. Add one usage section to Component Schema and a matching signature/cross-link in Types. Preserve all existing headings, examples, images and routes.
3. Compile and execute the exact new example against the minimum documented Hydrogen version. Validate MDX, internal anchors and redirects; preview both changed routes and check the new section and code block.
4. Review the bounded diff, then publish separate guide, type-reference and specification commits in a PR to `main`.

## Checks

- [x] Exact example: strict TypeScript compile and runtime callback smoke against registry `@weaverse/hydrogen@5.22.0`.
- [x] `mint validate`: build validation passed.
- [x] `mint broken-links --check-anchors --check-redirects`: no broken links found.
- [x] Both changed routes returned HTTP 200; browser DOM checks verified the new heading, complete code block, published method signature and Pilot link. Clicking the Types cross-link navigated to the actual `#dynamic-element-labels` heading.
- [x] `git diff --check`; navigation and existing images preserved.
- [x] Independent content review: no blockers. GitHub CI is tracked on the PR.
