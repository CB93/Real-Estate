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

// ---------- Lightbox ----------
(function () {
  const grid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  if (!grid || !lightbox) return;

  const lbImage = document.getElementById('lbImage');
  const lbCap = document.getElementById('lbCap');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');

  let visibleItems = [];
  let currentIndex = 0;

  function getVisibleItems() {
    return Array.from(grid.querySelectorAll('.gallery-item:not(.is-hidden)'));
  }

  function openAt(index) {
    visibleItems = getVisibleItems();
    if (!visibleItems.length) return;
    currentIndex = (index + visibleItems.length) % visibleItems.length;
    const item = visibleItems[currentIndex];
    const caption = item.dataset.caption || '';
    lbImage.src = item.getAttribute('href');
    lbImage.alt = caption;
    lbCap.innerHTML = caption + ' <span class="counter">' + (currentIndex + 1) + ' / ' + visibleItems.length + '</span>';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  grid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    e.preventDefault();
    openAt(getVisibleItems().indexOf(item));
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
