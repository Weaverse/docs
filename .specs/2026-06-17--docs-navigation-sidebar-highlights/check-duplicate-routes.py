#!/usr/bin/env python3
"""Validate docs.json navigation.

Checks two things:
  1. No page path appears in more than one navigation tab/group (duplicate
     routes break Mintlify sidebar active-state).
  2. Every navigation page path resolves to an existing .mdx file.

Exit code 0 = all good, 1 = problems found. Run from the docs/ directory:

    python3 .specs/2026-06-17--docs-navigation-sidebar-highlights/check-duplicate-routes.py
"""

import collections
import json
import os
import sys

DOCS_ROOT = os.getcwd()
DOCS_JSON = os.path.join(DOCS_ROOT, "docs.json")


def walk(pages, tab, occ, group=None):
    for item in pages:
        if isinstance(item, str):
            occ[item].append((tab, group))
        elif isinstance(item, dict):
            walk(item.get("pages", []), tab, occ, item.get("group") or group)


def main():
    with open(DOCS_JSON) as f:
        data = json.load(f)

    occ = collections.defaultdict(list)
    for tab in data.get("navigation", {}).get("tabs", []):
        walk(tab.get("pages", []), tab.get("tab"), occ)

    ok = True

    # 1. Duplicate routes
    dups = {p: locs for p, locs in occ.items() if len(locs) > 1}
    if dups:
        ok = False
        print(f"FAIL: {len(dups)} duplicate page path(s) found:")
        for path, locations in sorted(dups.items()):
            print(f"  {path}")
            for loc in locations:
                print(f"      {loc}")
    else:
        print(f"PASS: no duplicate routes ({len(occ)} unique page paths).")

    # 2. Missing files
    missing = []
    for path in sorted(occ):
        candidates = [
            os.path.join(DOCS_ROOT, path + ".mdx"),
            os.path.join(DOCS_ROOT, path, "index.mdx"),
        ]
        if not any(os.path.isfile(c) for c in candidates):
            missing.append(path)
    if missing:
        ok = False
        print(f"FAIL: {len(missing)} nav path(s) with no matching .mdx file:")
        for path in missing:
            print(f"  {path}")
    else:
        print("PASS: every nav path resolves to an existing .mdx file.")

    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
