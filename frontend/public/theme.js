/* Inline, blocking, no flash: must run before first paint so the correct
   theme class is on <html> before CSS paints. localStorage is read directly
   rather than via Astro.props so this works on every page. */
(function () {
  var KEY = 'ts-theme';
  var stored = null;
  try {
    stored = localStorage.getItem(KEY);
  } catch (e) {
    /* private mode / storage disabled — fall back to system preference */
  }
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  var theme = stored === 'light' || stored === 'dark' ? stored : prefersDark ? 'dark' : 'light';
  var root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;
})();