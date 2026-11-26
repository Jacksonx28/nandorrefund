(() => {
  const root = document.documentElement;
  const systemTheme = matchMedia('(prefers-color-scheme: dark)');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let saved;
  try { saved = localStorage.getItem('nandor-theme'); } catch (_) { /* Storage may be unavailable. */ }
  let explicit = saved === 'light' || saved === 'dark';
  root.dataset.theme = explicit ? saved : (systemTheme.matches ? 'dark' : 'light');
  const sync = () => {
    const dark = root.dataset.theme === 'dark';
    document.querySelectorAll('.theme-toggle').forEach(button => {
      button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      button.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
      button.querySelector('.theme-label').textContent = dark ? 'Light' : 'Dark';
    });
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#08090b' : '#f5f4f1');
  };
  systemTheme.addEventListener('change', event => {
    if (!explicit) { root.dataset.theme = event.matches ? 'dark' : 'light'; sync(); }
  });
  addEventListener('storage', event => {
    if (event.key !== 'nandor-theme') return;
    explicit = ['light', 'dark'].includes(event.newValue);
    root.dataset.theme = explicit ? event.newValue : (systemTheme.matches ? 'dark' : 'light');
    sync();
  });
  document.addEventListener('DOMContentLoaded', () => {
    sync();
    document.querySelectorAll('.theme-toggle').forEach(button => {
      button.addEventListener('click', () => {
        root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
        explicit = true;
        try { localStorage.setItem('nandor-theme', root.dataset.theme); } catch (_) { /* Keep the current tab usable. */ }
        sync();
      });
    });
    document.addEventListener('click', event => {
      const control = event.target.closest('button, .btn');
      if (!control || control.disabled || reducedMotion.matches) return;
      control.animate([{scale:'1'}, {scale:'.96'}, {scale:'1'}], {duration:240, easing:'cubic-bezier(.2,.8,.2,1)'});
    });
  });
})();
