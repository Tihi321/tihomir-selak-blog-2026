// Runs synchronously in <head> before first paint, so the stored theme
// applies with no flash. External file because CSP forbids inline scripts.
// The ts-theme cookie is shared with tihomir-selak.from.hr and wins over
// localStorage, so both sites open in the same theme.
(function () {
  var root = document.documentElement;
  var theme = null;
  try {
    var match = document.cookie.match(/(?:^|;\s*)ts-theme=(light|dark)(?:;|$)/);
    theme = match ? match[1] : localStorage.getItem("ts-theme");
  } catch (error) {
    // Storage can be blocked. Fall back to the OS theme.
  }
  if (theme === "light" || theme === "dark") {
    root.setAttribute("data-theme", theme);
  }
  root.setAttribute("data-js", "");
})();
