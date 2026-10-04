# Plan

1. `getting-started/installation.mdx` Method C: add `rm -rf .github` after `cd my-store`, plus a `<Warning>` explaining the workflows, linking the Oxygen guide, and noting that Methods A and B (CLI) remove the folder.
2. `resources/tutorial.mdx` Part 2 step 1: add `rm -rf .github` to the clone commands.
3. `guides/deployment/oxygen.mdx` step 2: `Weaverse/pilot` is a GitHub template repository, so "Use this template" also copies `.github/`. Add a `<Warning>` to delete it before connecting, and note that the Hydrogen app adds the storefront's own `oxygen-deployment-*.yml` in step 6.
4. `hydrogen-themes/pilot-theme-overview.mdx` mentions cloning without commands: add one sentence pointing to the installation guide's Method C.

## Files touched

- `getting-started/installation.mdx`
- `resources/tutorial.mdx`
- `guides/deployment/oxygen.mdx`
- `hydrogen-themes/pilot-theme-overview.mdx`
- `.specs/2026-10-04--pilot-clone-remove-github-folder/`
