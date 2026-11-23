/* ==========================================================================
   evershroud.js: picks the skin for the Evershroud pages.

   Load it in <head>, BEFORE the stylesheet, without defer or async, so the
   right skin is set before anything paints:
     <script src="resources/evershroud.js"></script>
     <link rel="stylesheet" href="resources/evershroud.css">

   Touch screens get Mistglass, mouse and keyboard get Chartroom, whatever the
   window size. Any element with class "es-skin" becomes the toggle. A choice
   that differs from the device's default is remembered on that device;
   switching back to the default forgets it again, so "auto" comes back.
   ========================================================================== */
(function () {
  var KEY = "evershroud-skin";
  var root = document.documentElement;
  var NAMES = { chart: "Chartroom", mist: "Mistglass" };

  function deviceDefault() {
    try {
      return window.matchMedia("(hover: none) and (pointer: coarse)").matches ? "mist" : "chart";
    } catch (e) { return "chart"; }
  }
  function stored() {
    try { var v = localStorage.getItem(KEY); return NAMES[v] ? v : null; } catch (e) { return null; }
  }
  function apply(skin) {
    root.setAttribute("data-skin", skin);
    var buttons = document.querySelectorAll(".es-skin");
    for (var i = 0; i < buttons.length; i++) {
      var other = skin === "mist" ? "chart" : "mist";
      buttons[i].textContent = NAMES[other];
      buttons[i].setAttribute("aria-label", "Switch to the " + NAMES[other] + " look");
      buttons[i].title = "Showing " + NAMES[skin] + (stored() ? " (your choice on this device)" : " (this device's default)");
    }
  }
  function toggle() {
    var next = root.getAttribute("data-skin") === "mist" ? "chart" : "mist";
    try {
      if (next === deviceDefault()) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, next);
    } catch (e) { /* storage blocked: the switch still works for this page */ }
    apply(next);
  }

  apply(stored() || deviceDefault());

  document.addEventListener("DOMContentLoaded", function () {
    apply(root.getAttribute("data-skin"));
    var buttons = document.querySelectorAll(".es-skin");
    for (var i = 0; i < buttons.length; i++) buttons[i].addEventListener("click", toggle);
  });

  window.EvershroudSkin = { toggle: toggle, current: function () { return root.getAttribute("data-skin"); } };
})();
