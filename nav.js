(function () {
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  var backdrop = document.getElementById('backdrop');
  if (!burger || !drawer || !backdrop) return;
  function open() { drawer.classList.add('open'); backdrop.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function close() { drawer.classList.remove('open'); backdrop.classList.remove('open'); document.body.style.overflow = ''; }
  burger.addEventListener('click', open);
  backdrop.addEventListener('click', close);
  var c = document.getElementById('drawerClose');
  if (c) c.addEventListener('click', close);
  drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', close); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
})();
