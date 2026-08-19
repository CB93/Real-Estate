// ---------- Header scroll state ----------
(function () {
  const header = document.getElementById('siteHeader');
  if (!header || header.classList.contains('is-solid')) return;
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// ---------- Gallery filter ----------
(function () {
  const filters = document.getElementById('filters');
  const grid = document.getElementById('galleryGrid');
  if (!filters || !grid) return;
  const items = Array.from(grid.querySelectorAll('.gallery-item'));

  filters.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    filters.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    items.forEach((item) => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('is-hidden', !match);
    });
  });
})();

// ---------- Lightbox (any [data-lightbox] group) ----------
(function () {
  const groups = Array.from(document.querySelectorAll('[data-lightbox]'));
  const lightbox = document.getElementById('lightbox');
  if (!groups.length || !lightbox) return;

  const lbImage = document.getElementById('lbImage');
  const lbCap = document.getElementById('lbCap');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  let items = [];
  let currentIndex = 0;

  function visibleIn(group) {
    return Array.from(group.querySelectorAll('a[data-caption]')).filter(
      (a) => !a.classList.contains('is-hidden')
    );
  }

  function openAt(index) {
    if (!items.length) return;
    currentIndex = (index + items.length) % items.length;
    const item = items[currentIndex];
    const caption = item.dataset.caption || '';
    lbImage.src = item.getAttribute('href');
    lbImage.alt = caption;
    lbCap.innerHTML =
      caption +
      (items.length > 1
        ? ' <span class="counter">' + (currentIndex + 1) + ' / ' + items.length + '</span>'
        : '');
    lbPrev.style.display = items.length > 1 ? '' : 'none';
    lbNext.style.display = items.length > 1 ? '' : 'none';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  groups.forEach((group) => {
    group.addEventListener('click', (e) => {
      const item = e.target.closest('a[data-caption]');
      if (!item || !group.contains(item)) return;
      e.preventDefault();
      items = group.dataset.lightbox === 'single' ? [item] : visibleIn(group);
      openAt(items.indexOf(item));
    });
  });

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', () => openAt(currentIndex - 1));
  lbNext.addEventListener('click', () => openAt(currentIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') openAt(currentIndex - 1);
    if (e.key === 'ArrowRight') openAt(currentIndex + 1);
  });
})();
