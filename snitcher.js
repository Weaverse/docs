// Snitcher / Radar — B2B website-visitor de-anonymization for the docs site.
//
// Mintlify auto-includes every `.js` file in the content directory on all pages
// (equivalent to a <script> on every page, run after the page is interactive),
// so this file alone installs the tracker site-wide. See:
// https://www.mintlify.com/docs/customize/custom-scripts
//
// Consent: unlike the marketing site (builder repo), the docs site has no CMP,
// so this uses Snitcher's default (no `waitForConsent`) — identity persists on
// load under legitimate interest, per Snitcher's GDPR guidance. If a consent
// banner is added here later, switch to `waitForConsent: true` and call
// `Snitcher.giveCookieConsent()` from the banner's accept handler.
//
// Source: verbatim vendor bootstrap from https://docs.snitcher.com/product/tracker
!function(e){"use strict";var t=e&&e.namespace;if(t&&e.profileId&&e.cdn){var i=window[t];if(i&&Array.isArray(i)||(i=window[t]=[]),!i.initialized&&!i._loaded)if(i._loaded)console&&console.warn("[Radar] Duplicate initialization attempted");else{i._loaded=!0;["track","page","identify","group","alias","ready","debug","on","off","once","trackClick","trackSubmit","trackLink","trackForm","pageview","screen","reset","register","setAnonymousId","addSourceMiddleware","addIntegrationMiddleware","addDestinationMiddleware","giveCookieConsent"].forEach((function(e){var a;i[e]=(a=e,function(){var e=window[t];if(e.initialized)return e[a].apply(e,arguments);var i=[].slice.call(arguments);return i.unshift(a),e.push(i),e})})),-1===e.apiEndpoint.indexOf("http")&&(e.apiEndpoint="https://"+e.apiEndpoint),i.bootstrap=function(){var t,i=document.createElement("script");i.async=!0,i.type="text/javascript",i.id="__radar__",i.setAttribute("data-settings",JSON.stringify(e)),i.src=[-1!==(t=e.cdn).indexOf("http")?"":"https://",t,"/releases/latest/radar.min.js"].join("");var a=document.scripts[0];a.parentNode.insertBefore(i,a)},i.bootstrap()}}else"undefined"!=typeof console&&console.error("[Radar] Configuration incomplete")}({
  "apiEndpoint": "radar.snitcher.com",
  "cdn": "cdn.snitcher.com",
  "namespace": "Snitcher",
  "profileId": "sLQA5iJ4ul"
});
