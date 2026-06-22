# Serve docs at `weaverse.io/docs` via Cloudflare Workers

This runbook hosts the Mintlify docs at a `/docs` subpath on the main domain,
backed by the existing Mintlify Cloud deployment. The docs repo (including
`snitcher.js`) keeps deploying via Mintlify's GitHub integration as today; the
Worker only changes how requests are routed at the edge.

> ⚠️ Do **not** add the Worker as a `.js` file in the docs content root —
> Mintlify auto-includes every `.js` file on all pages, which would inject this
> Cloudflare code into browsers and break the site. It lives in this runbook only
> and is pasted into Cloudflare (dashboard or Wrangler) during setup.

## Architecture decision (why this differs from the Mintlify guide)

The Mintlify docs example assumes the Worker **owns the apex domain** and falls
back to `fetch(request)` for non-docs traffic. That does **not** work here:

- `weaverse.io` already resolves (via Cloudflare DNS) to the **Fly-hosted**
  marketing/app site.
- If a Worker owned the apex, its `fetch(request)` fallback would loop back to
  itself, and proxying `/*` to Fly with a mismatched `Host` would trip the
  builder's `enforceMainDomain` → infinite 301 redirects.

So we deploy the Worker as a **Route** scoped to `/docs*`. Only docs traffic
hits the Worker; everything else flows straight to the Fly origin. No `/*`
fallback, no loop, no DNS conflict.

## Prerequisites

- [x] `weaverse.io` DNS managed by Cloudflare (confirmed).
- [ ] The apex `weaverse.io` DNS record is **orange-clouded** (proxied) so
      Cloudflare's edge handles the request — Worker Routes only fire on
      proxied traffic. If it's grey-clouded to Fly, flip it to Proxied first.
- [ ] The Mintlify Cloud hostname for the docs (`<sub>.mintlify.dev`) — found in
      the Mintlify dashboard under the project's domain settings. Replace
      `DOCS_URL` below with it.

## Step 1 — Mintlify side

1. In the Mintlify dashboard, open the docs project → **Settings → Hosting / Domain**.
2. Copy the canonical Mintlify host (e.g. `weaverse.mintlify.dev`) — this is `DOCS_URL`.
3. Enable/configure the **`/docs` subpath** so Mintlify prefixes assets and
   internal links with `/docs`. (Mintlify detects the subpath from the forwarded
   `Host`/path; verify after cutover that no asset or link 404s. If anything
   breaks, apply the notes in Mintlify's [CSP configuration](https://www.mintlify.com/docs/deploy/csp-configuration) doc.)

## Step 2 — Create the Worker

Create a Worker (dashboard → **Workers & Pages → Create → Worker**, or via
Wrangler). Paste this script, replacing `DOCS_URL`:

```js
// Proxy weaverse.io/docs* → Mintlify Cloud. Deploy as a Worker ROUTE, not as a
// custom domain on the apex (see README for why).
const DOCS_URL = "weaverse.mintlify.dev"; // ← your Mintlify Cloud hostname

export default {
  async fetch(request) {
    const incoming = new URL(request.url);
    const target = new URL(request.url);
    target.hostname = DOCS_URL;

    const proxyRequest = new Request(target, request);
    proxyRequest.headers.set("Host", DOCS_URL);
    proxyRequest.headers.set("X-Forwarded-Host", incoming.hostname);
    proxyRequest.headers.set("X-Forwarded-Proto", "https");
    const clientIp = request.headers.get("CF-Connecting-IP");
    if (clientIp) proxyRequest.headers.set("CF-Connecting-IP", clientIp);

    return fetch(proxyRequest);
  },
};
```

> Tip: move `DOCS_URL` to a Worker **variable** or **secret** (Settings →
> Variables) instead of hardcoding it, so the value isn't in the script editor.

## Step 3 — Add the Routes

Bind the Worker to the docs paths (dashboard → the Worker → **Settings →
Triggers → Routes**, or in `wrangler.toml`):

- `weaverse.io/docs`
- `weaverse.io/docs/*`
- `www.weaverse.io/docs`
- `www.weaverse.io/docs/*` (only if `www` is used)

Two patterns instead of `weaverse.io/docs*` so the route doesn't accidentally
match unrelated paths like `/docsfoo`.

## Step 4 — Inbound links & SEO

- Repoint the marketing site's "Docs" link to `https://weaverse.io/docs`.
- Add a permanent redirect from the old `docs.weaverse.io` host to
  `https://weaverse.io/docs{path}` (Cloudflare Page Rule or a small redirect
  Worker) so existing backlinks/SEO consolidate onto the main domain.
- Confirm canonical URLs in the rendered docs point at `weaverse.io/docs/*`.

## Step 5 — Verify

- `https://weaverse.io/docs` and a deep page (e.g. `/docs/quickstart`) render
  fully, with no 404s on assets or `_next` chunks.
- `https://weaverse.io` still serves the Fly marketing site (unchanged), and
  `studio.weaverse.io` is unaffected.
- Snitcher fires on `/docs` (check the Network tab for
  `radar.snitcher.com` requests and `cdn.snitcher.com/.../radar.min.js`).

## Rollback

Remove the four Routes (Step 3). Docs instantly stop being served at `/docs`;
everything else was untouched, so the main site is unaffected. Re-point the
marketing "Docs" link back to `docs.weaverse.io` if you also tear down the
subpath config in Mintlify.
