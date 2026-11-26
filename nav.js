(() => {
  const burger = document.getElementById('burger');
  const drawer = document.getElementById('drawer');
  const backdrop = document.getElementById('backdrop');
  if (!burger || !drawer || !backdrop) return;
  const closeButton = document.getElementById('drawerClose');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-controls', 'drawer');
  drawer.setAttribute('role', 'dialog');
  drawer.setAttribute('aria-modal', 'true');
  drawer.inert = true;
  let previousFocus;
  const background = [...document.body.children].filter(el => ![drawer, backdrop].includes(el) && !['SCRIPT', 'STYLE'].includes(el.tagName));
  const priorInert = new Map();
  function close() {
    if (!drawer.classList.contains('open')) return;
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    drawer.inert = true;
    background.forEach(el => { el.inert = priorInert.get(el) || false; });
    document.body.style.overflow = '';
    burger.setAttribute('aria-expanded', 'false');
    if (previousFocus?.isConnected) previousFocus.focus();
  }
  function open() {
    previousFocus = document.activeElement;
    background.forEach(el => { priorInert.set(el, el.inert); el.inert = true; });
    drawer.inert = false;
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    burger.setAttribute('aria-expanded', 'true');
    closeButton.focus();
  }
  burger.addEventListener('click', open);
  backdrop.addEventListener('click', close);
  closeButton.addEventListener('click', close);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  document.addEventListener('keydown', event => {
    if (!drawer.classList.contains('open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'Tab') {
      const focusable = [...drawer.querySelectorAll('a,button')];
      const first = focusable[0], last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  window.matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) close(); });
  document.querySelectorAll('a.active').forEach(a => a.setAttribute('aria-current', 'page'));
})();
