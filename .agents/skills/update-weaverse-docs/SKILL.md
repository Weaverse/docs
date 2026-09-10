---
name: update-weaverse-docs
description: Use when updating Weaverse Docs through a reviewed PR.
---

# Update Weaverse Docs

Guide documentation changes in plain English, from an approved task to a reviewable PR. This workflow is for Weaverse Docs, not blogs or application repositories. Loading the skill does not authorize edits, pushes, merges, messages, or browser use.

## Inputs and repository roles

Get the complete task, its expected outcome, and approved sources or assets. Read the repository's `AGENTS.md`, affected pages, and relevant existing review comments before proposing changes. Never guess product behavior or expose credentials in documentation, images, logs, or PRs.

- Official base: `Weaverse/docs`, branch `main`.
- Marketing contribution target: a task branch in `Weaverse-Marketing/docs`.
- PR destination: `Weaverse/docs:main`, not the fork's `main`.

Identify remotes by their URLs, not names alone. In a Marketing checkout, `upstream` normally points to the official repository and `origin` to the fork. A canonical checkout may have `origin` pointing to `Weaverse/docs`; do not repoint it or push task changes to its `main`. If a required remote or access is missing, explain the setup needed and obtain approval before changing it.

## Workflow

1. **Inspect and agree on scope.** Check the repository root, current branch, status, remotes, and existing PR. Summarize the smallest plan and affected files; wait for plan approval before editing unless that exact scope is already approved. A request to review stays read-only.

2. **Protect work and create the branch.** Identify any existing changes before switching branches. Do not discard, overwrite, auto-stash, or include unrelated work. Fetch the official remote's latest `main` and create a separate task branch from that remote-tracking ref, normally `upstream/main`. Updating the fork's `main` is not required. For feedback on an existing PR, continue its existing task branch rather than opening a replacement PR.

3. **Make only the requested changes.** Reuse the existing MDX and asset conventions. Add navigation to `docs.json` when adding a navigable page; update affected links when moving one. Preserve prior copy/asset approvals and waived QC gates. Do not turn an approved asset update into a technical rewrite or a new capture/review round.

4. **Validate the changed pages.** Run from the directory containing `docs.json`. Use `mint dev --no-open` for local preview and `mint broken-links` for link checks. Ask for explicit current-task permission before opening or controlling a browser or desktop, including screenshots and headless checks. Without permission, use file/HTTP checks and state that visual review remains unverified. Verify changed pages, navigation, links, and images, not just server startup. If the CLI or access is unavailable, report the blocker rather than installing tools or claiming checks passed.

5. **Show the handoff before publishing.** Present the exact changed files/diff, a plain-English summary, validation results, and any remaining blocker. Keep pre-existing issues separate from regressions. Obtain explicit approval for the final commit/push/PR payload and destination; plan approval alone is not publishing approval.

6. **Create the approved PR.** Stage only the task files, commit, and push only the task branch to the approved fork remote. Create the PR against `Weaverse/docs:main`. Read the PR back to verify its base/head repositories, branches, and full diff contain only this task. Return the PR link immediately so the owner can attach it to the task, plus the reviewer/approver checklist. Do not post to Notion or another work surface without separate approval. Apply requested fixes to this same branch and PR, then repeat validation.

7. **Stop at the merge gate.** Do not merge as part of this authoring workflow. An authorized person merges only after reviewer and approver confirmation. After that merge, wait for deployment and verify the changed content and images on the live documentation site before reporting the task ready for Done. If deployment or the live result is unverified, keep that state explicit and the task open.

## Stop conditions

- Never commit task changes directly to `main`, force-push, use `reset --hard`, rewrite shared history, or delete unknown files to make a checkout clean.
- Stop and ask a developer about conflicts, divergent task branches, unknown work ownership, or uncertain recovery. Do not solve these by changing the PR destination or merging the whole fork.
- A local preview is not production proof; a pushed fork branch is not an upstream merge; an upstream merge is not verified live content.

## Invoke

In Codex, open the Docs checkout containing this file and use:

```text
Use $update-weaverse-docs.
Task: [the complete documentation change]
Sources: [approved reference material and assets]
```
