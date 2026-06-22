// Force first-party navigation links to open in the same tab. The sidebar
// anchors Home (weaverse.io) and Studio (studio.weaverse.io) are external to the
// docs origin, so Mintlify renders them with target="_blank", and docs.json
// exposes no per-anchor link-target option. We strip the target at click time.
//
// Mintlify auto-includes every .js file in the content root on all pages (see
// https://www.mintlify.com/docs/customize/custom-scripts). A capture-phase,
// delegated listener survives Mintlify's client-side re-renders without a
// MutationObserver and applies to first-party hosts only — GitHub/Community
// (external) keep opening in a new tab.
(function () {
  var SAME_TAB_HOSTS = ['weaverse.io', 'www.weaverse.io', 'studio.weaverse.io']
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
      if (SAME_TAB_HOSTS.indexOf(host) !== -1) {
        anchor.target = '_self'
      }
    },
    true
  )
})()
