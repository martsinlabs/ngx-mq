// Default to the dark theme on first visit for a sharper, IDE-like feel.
// The user's explicit choice (light/dark/os) is still respected afterwards.
(function () {
  try {
    if (!localStorage.getItem('tsd-theme')) {
      localStorage.setItem('tsd-theme', 'dark');
      document.documentElement.dataset.theme = 'dark';
    }
  } catch (_) {
    /* localStorage may be unavailable; ignore. */
  }
})();
