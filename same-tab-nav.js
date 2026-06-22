// Force first-party navigation links to open in the same tab. Internal links
// (any *.weaverse.io host — Home, Studio, Help, Docs, etc.) are external to the
// docs origin, so Mintlify renders them with target="_blank", and docs.json
// exposes no per-anchor link-target option. We strip the target at click time.
//
// Mintlify auto-includes every .js file in the content root on all pages (see
// https://www.mintlify.com/docs/customize/custom-scripts). A capture-phase,
// delegated listener survives Mintlify's client-side re-renders without a
// MutationObserver. Third-party links (GitHub, Slack, etc.) keep opening in a
// new tab.
(function () {
  function isInternal(hostname) {
    return hostname === 'weaverse.io' || hostname.endsWith('.weaverse.io')
  }
  document.addEventListener(
    'click',
    function (event) {
      var el = event.target
      var anchor = el && el.closest ? el.closest('a[target="_blank"]') : null
      if (!anchor) return
      var host
      try {
        host = new URL(anchor.href).hostname
      } catch (e) {
        return
      }
      if (isInternal(host)) {
        anchor.target = '_self'
      }
    },
    true
  )
})()
