/* ==========================================================================
   preload-paintings.js: quietly fetches the background paintings of every
   page the Repository links to, so they appear at once when you open them.

   Used by app.html and caldwell-repo.html, where people tend to linger.
   It reads the hub's district links, looks up each page's painting
   (the url in its "body.es::before { background-image: url(...) }" rule)
   and loads them one at a time, after the page has settled, at low
   priority. The browser then keeps them in its cache. It does nothing
   when the device asks to save data.
   ========================================================================== */
(function () {
  "use strict";
  var conn = navigator.connection;
  if (conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ""))) return;

  var PAINTING = /body\.es::before\s*\{\s*background-image:\s*url\(['"]?([^'")]+)['"]?\)/;

  function idle(fn, wait) {
    setTimeout(function () {
      if (window.requestIdleCallback) requestIdleCallback(fn, { timeout: 4000 }); else fn();
    }, wait);
  }

  function loadImage(url) {
    return new Promise(function (done) {
      var img = new Image();
      img.decoding = "async";
      if ("fetchPriority" in img) img.fetchPriority = "low";
      img.onload = img.onerror = function () { done(); };
      img.src = url;
    });
  }

  async function run() {
    try {
      var hubUrl = new URL("caldwell-repo.html", location.href);
      var hub = new DOMParser().parseFromString(await (await fetch(hubUrl)).text(), "text/html");
      var pages = [], seen = {};
      hub.querySelectorAll("#districts a[href]").forEach(function (a) {
        var u = new URL(a.getAttribute("href"), hubUrl);
        if (u.origin === location.origin && /\.html$/i.test(u.pathname) && !seen[u.pathname]) { seen[u.pathname] = 1; pages.push(u); }
      });
      var done = {};
      for (var i = 0; i < pages.length; i++) {
        var html = await (await fetch(pages[i])).text();        // also warms the cache for the page itself
        var m = html.match(PAINTING);
        if (!m) continue;
        var img = new URL(m[1], pages[i]).href;
        if (done[img]) continue; done[img] = 1;
        await loadImage(img);
      }
    } catch (e) { /* offline or blocked: nothing lost, pages load as usual */ }
  }

  if (document.readyState === "complete") idle(run, 2500);
  else window.addEventListener("load", function () { idle(run, 2500); });
})();
