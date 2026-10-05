# Feature: Pilot Clone Guides Remove .github Folder

| Field            | Value                                                    |
| ---------------- | -------------------------------------------------------- |
| **Status**       | in-progress                                              |
| **Owner**        | @hta218                                                  |
| **Issue**        | [#56](https://github.com/Weaverse/docs/issues/56)        |
| **Branch**       | `docs/pilot-clone-remove-github-folder`                  |
| **Created**      | 2026-10-04                                               |
| **Last Updated** | 2026-10-04                                               |

## Initiating Requirement

> Weaverse plans to retire `Weaverse/pilot-demo` and connect Shopify Oxygen deployment directly to `Weaverse/pilot`. The repo will then contain Weaverse-internal workflows in `.github/workflows/`: the Oxygen deployment for the demo storefront, `ci.yml`, and `claude-code-review.yml`. They depend on Weaverse's own secrets and fail in a developer's repo.
>
> `@weaverse/cli` will strip `.github/` (`Weaverse/weaverse#532`), but `getting-started/installation.mdx` "Method C: GitHub Clone" tells developers to `git clone https://github.com/Weaverse/pilot.git` directly, which keeps these workflows.
>
> - `getting-started/installation.mdx` Method C: add a step to delete `.github/` after cloning, with a short explanation.
> - `guides/deployment/oxygen.mdx`: note that connecting the repo generates a new `oxygen-deployment-*.yml` workflow, and that any workflow copied from the Pilot repo should be removed.
> - Apply the same note to other pages that clone Pilot directly (e.g. `resources/tutorial.mdx`, `hydrogen-themes/pilot-theme-overview.mdx`).
> - Acceptance: every docs page that clones Pilot directly tells developers to remove `.github/`.
>
> Related: `Weaverse/pilot#181`, parent `Weaverse/pilot#182`.

## Summary

Docs pages that start a project from the Pilot repo (clone or GitHub template) now tell developers to delete `.github/`, so they do not inherit Weaverse's deployment, CI, and code-review workflows.
