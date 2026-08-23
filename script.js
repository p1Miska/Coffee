/* ==========================================================
   КОФЕЙНИК — data + interactions
   Card images are placeholders (gradient + icon) for now —
   swap card.img with a real photo path per item later.
========================================================== */

const ICONS = {
  cup: '<path d="M4 3h13v9a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V3Z" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M17 6h1.5a2.5 2.5 0 0 1 0 5H17" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M2 20h18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  matcha: '<path d="M5 9h14l-1.5 8a3 3 0 0 1-3 2.5h-5A3 3 0 0 1 6.5 17L5 9Z" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M8 9c0-3 1.8-5 4-6.5C14.2 4 16 6 16 9" stroke="currentColor" stroke-width="1.4" fill="none"/>',
  tea: '<path d="M3 8h14v6a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Z" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M17 10h1a2.5 2.5 0 0 1 0 5h-1" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M7 3c-1 1.2-1 2 0 3M11 3c-1 1.2-1 2 0 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/>',
  lemonade: '<path d="M12 3c3 2 5 5.5 5 9a5 5 0 0 1-10 0c0-3.5 2-7 5-9Z" stroke="currentColor" stroke-width="1.4" fill="none"/>',
  bake: '<ellipse cx="12" cy="15" rx="8" ry="5" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M6 15c1-4 3-9 6-11 3 2 5 7 6 11" stroke="currentColor" stroke-width="1.4" fill="none"/>',
  extra: '<circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M12 8v8M8 12h8" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>'
};

function icon(name){
  return `<svg viewBox="0 0 24 24" fill="none">${ICONS[name] || ICONS.cup}</svg>`;
}

// prices: object keyed by size (200/300/400) -> number or null (unavailable)
// star: array of sizes that carry the printed "*" mark
const CATEGORIES = [
  {
    id: 'classic', label: 'Классическое меню', sizes: [200, 300, 400], type: 'sized',
    items: [
      { name: 'Двойной эспрессо', desc: '', prices: { 200: 170, 300: null, 400: null }, icon: 'cup' },
      { name: 'Американо', desc: '', prices: { 200: 170, 300: 220, 400: 270 }, star: [300], icon: 'cup' },
      { name: 'Флэт Уайт', desc: '', prices: { 200: 220, 300: 270, 400: 320 }, star: [300], icon: 'cup' },
      { name: 'Капучино', desc: '', prices: { 200: 180, 300: 230, 400: 280 }, star: [300], icon: 'cup' },
      { name: 'Латте', desc: '', prices: { 200: null, 300: 210, 400: 260 }, star: [300], icon: 'cup' },
      { name: 'Раф', desc: '', prices: { 200: null, 300: 270, 400: 320 }, star: [300], icon: 'cup' },
      { name: 'Бамбл', desc: '', prices: { 200: null, 300: 310, 400: null }, star: [300], icon: 'cup' },
      { name: 'Эспрессо-тоник', desc: '', prices: { 200: null, 300: 290, 400: null }, star: [300], icon: 'cup' },
      { name: 'Матча-латте', desc: '', prices: { 200: null, 300: 230, 400: 280 }, star: [300], icon: 'matcha' },
      { name: 'Матча-бамбл', desc: '', prices: { 200: null, 300: 310, 400: null }, star: [300], icon: 'matcha' },
      { name: 'Матча-тоник', desc: '', prices: { 200: null, 300: 290, 400: null }, star: [300], icon: 'matcha' },
      { name: 'Какао', desc: '', prices: { 200: 210, 300: 260, 400: 310 }, icon: 'cup' },
      { name: 'Чай', desc: '', prices: { 200: null, 300: null, 400: 130 }, icon: 'tea' }
    ]
  },
  {
    id: 'author', label: 'Авторское меню', sizes: [300, 400], iconDefault: 'cup', type: 'sized',
    items: [
      { name: 'Американо', sub: '«Лавандовые берега»', desc: 'эспрессо, сливки, лавандовый сироп, вода', prices: { 300: 250, 400: 300 }, star: [300], icon: 'cup' },
      { name: 'Капучино', sub: '«Кокосовые облака»', desc: 'эспрессо, молоко, кокосовый сироп, шоколадный сироп', prices: { 300: 260, 400: 310 }, star: [300], icon: 'cup' },
      { name: 'Мокко', sub: '«Загадка домового»', desc: 'эспрессо, какао, сливки, мятный сироп, шоколадный сироп', prices: { 300: 330, 400: 380 }, icon: 'cup' },
      { name: 'Эспрессо-тоник', sub: '«Алый мох»', desc: 'эспрессо, клубничный сок, тоник, лёд', prices: { 300: 320, 400: null }, icon: 'cup' },
      { name: 'Бамбл', sub: '«Закатный бор»', desc: 'эспрессо, ананасовый сок, апельсиновый сок, вишневый сироп, лёд', prices: { 300: 340, 400: null }, icon: 'cup' },
      { name: 'Матча-латте', sub: '«Миндаль в цвету»', desc: 'матча шот, миндальное молоко, вишневый сироп', prices: { 300: 280, 400: 330 }, star: [300], icon: 'matcha' },
      { name: 'Матча-тоник', sub: '«Багровый папоротник»', desc: 'матча шот, вишневый сок, тоник, лёд', prices: { 300: 320, 400: null }, icon: 'matcha' },
      { name: 'Матча-бамбл', sub: '«Пруд кои»', desc: 'матча шот, персиковый сок, вишневый сок, банановый сироп, лёд', prices: { 300: 340, 400: null }, icon: 'matcha' },
      { name: 'Чай', sub: '«Янтарная чаша»', desc: 'черный облепиховый чай, маракуйя, персиковый сок, вода', prices: { 300: 210, 400: 260 }, star: [300], icon: 'tea' },
      { name: 'Чай', sub: '«Ягодное лукошко»', desc: 'чай зелёный земляничный, клубника, вишневый сок, вода', prices: { 300: 210, 400: 260 }, star: [300], icon: 'tea' },
      { name: 'Лимонад', sub: '«Солнечная чаша»', desc: 'маракуйя, ананасовый сок, вода, лёд', prices: { 300: 220, 400: null }, icon: 'lemonade' },
      { name: 'Лимонад', sub: '«Красная поляна»', desc: 'клубника, вишневый сок, вода, лёд', prices: { 300: 220, 400: null }, icon: 'lemonade' }
    ]
  },
  {
    id: 'food', label: 'Еда', type: 'flat', icon: 'bake',
    items: [
      { name: 'Сэндвич с ветчиной', price: 220, icon: 'bake' },
      { name: 'Шарлотка', price: 150, icon: 'bake' },
      { name: 'Кекс с бананом', price: 100, icon: 'bake' },
      { name: 'Хлебцы с начинкой', price: 110, icon: 'bake' },
      { name: 'Чокопай', price: 50, icon: 'bake' },
      { name: 'Мини-кекс со сгущёнкой', price: 30, icon: 'bake' }
    ]
  },
  {
    id: 'extra', label: 'Дополнения', type: 'mixed',
    items: [
      { name: 'Альтернативное молоко', kind: 'sized', sizes: [200, 300, 400], prices: { 200: 50, 300: 60, 400: 70 }, icon: 'extra' },
      { name: 'Сироп', kind: 'sized', sizes: [200, 300, 400], prices: { 200: 30, 300: 35, 400: 40 }, icon: 'extra' },
      { name: 'Шот эспрессо', kind: 'flat', price: 50, icon: 'extra' },
      { name: 'Сливки / молоко', kind: 'flat', price: 30, icon: 'extra' },
      { name: 'Вода (газ / негаз, 0.5л)', kind: 'flat', price: 60, icon: 'extra' }
    ]
  }
];

function firstAvailableSize(prices, sizes){
  return sizes.find(s => prices[s] != null) ?? sizes[0];
}

function mediaMarkup(item, iconName){
  if (item.img){
    return `<img src="${item.img}" alt="${item.name}" class="card-photo" loading="lazy">`;
  }
  return `
    <svg class="card-flourish" viewBox="0 0 100 100" aria-hidden="true"><use href="#petal-burst"/></svg>
    ${icon(iconName)}
  `;
}

function buildSizedCard(item, sizes){
  const initial = firstAvailableSize(item.prices, sizes);
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-media${item.img ? ' has-photo' : ''}">
      ${mediaMarkup(item, item.icon || 'cup')}
    </div>
    <div class="card-body">
      <div>
        <div class="card-name">${item.name}${item.sub ? ' <span style="font-weight:600;opacity:.7">' + item.sub + '</span>' : ''}</div>
        ${item.desc ? `<div class="card-desc">${item.desc}</div>` : ''}
      </div>
      <div class="price-row">
        <span class="price" data-price>${item.prices[initial]} ₽</span>
        <span class="price-star" data-star style="${item.star && item.star.includes(initial) ? '' : 'display:none'}">*</span>
      </div>
      <div class="size-row" data-sizes></div>
    </div>
  `;
  const sizeRow = card.querySelector('[data-sizes]');
  const priceEl = card.querySelector('[data-price]');
  const starEl = card.querySelector('[data-star]');

  sizes.forEach(size => {
    const available = item.prices[size] != null;
    const btn = document.createElement('button');
    btn.className = 'size-btn' + (size === initial ? ' is-active' : '');
    btn.textContent = size + ' мл';
    btn.disabled = !available;
    btn.setAttribute('aria-label', `Объём ${size} мл`);
    if (available){
      btn.addEventListener('click', () => {
        sizeRow.querySelectorAll('.size-btn').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        priceEl.textContent = item.prices[size] + ' ₽';
        priceEl.classList.remove('is-swapping');
        void priceEl.offsetWidth;
        priceEl.classList.add('is-swapping');
        starEl.style.display = (item.star && item.star.includes(size)) ? '' : 'none';
      });
    }
    sizeRow.appendChild(btn);
  });

  return card;
}

function buildFlatCard(item){
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-media${item.img ? ' has-photo' : ''}">
      ${mediaMarkup(item, item.icon || 'bake')}
    </div>
    <div class="card-body">
      <div class="card-name">${item.name}</div>
      <div class="card-single-price">${item.price} ₽</div>
    </div>
  `;
  return card;
}

function fillGrid(cat, grid){
  grid.innerHTML = '';
  cat.items.forEach((item) => {
    let card;
    if (cat.type === 'sized') card = buildSizedCard(item, cat.sizes);
    else if (cat.type === 'flat') card = buildFlatCard(item);
    else { // mixed
      card = item.kind === 'sized' ? buildSizedCard(item, item.sizes) : buildFlatCard(item);
    }
    grid.appendChild(card);
  });
}

function renderCategory(cat, grid, animate){
  if (!animate){ fillGrid(cat, grid); return; }
  grid.classList.add('is-switching');
  window.setTimeout(() => {
    fillGrid(cat, grid);
    grid.classList.remove('is-switching');
  }, 200);
}

function init(){
  const tabsEl = document.getElementById('tabs');
  const tabsBarEl = document.getElementById('tabsBar');
  const gridEl = document.getElementById('menuGrid');
  const menuAnchor = document.getElementById('menu-grid-anchor');
  const header = document.getElementById('siteHeader');
  const root = document.documentElement;

  function syncHeaderHeight(){
    root.style.setProperty('--header-h', header.offsetHeight + 'px');
  }
  syncHeaderHeight();
  window.addEventListener('resize', syncHeaderHeight);

  function checkTabsOverflow(){
    if (!tabsEl || !tabsBarEl) return;
    tabsBarEl.classList.toggle('has-overflow', tabsEl.scrollWidth > tabsEl.clientWidth + 2);
  }

  CATEGORIES.forEach((cat, i) => {
    const btn = document.createElement('button');
    btn.className = 'tab-btn' + (i === 0 ? ' is-active' : '');
    btn.textContent = cat.label;
    btn.setAttribute('role', 'tab');
    btn.addEventListener('click', () => {
      if (btn.classList.contains('is-active')) return;
      tabsEl.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      renderCategory(cat, gridEl, true);
      // smoothly bring the list back to its top when switching sections
      if (menuAnchor){
        menuAnchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    tabsEl.appendChild(btn);
  });

  renderCategory(CATEGORIES[0], gridEl, false);
  checkTabsOverflow();
  window.addEventListener('resize', checkTabsOverflow);

  // Detect when the sticky tabs bar is actually "stuck" to the top, so it
  // can swap to a header-matching dark colour instead of blending into the
  // light page background scrolling underneath it. This is driven directly
  // off scroll position (rAF-throttled) rather than IntersectionObserver —
  // IO callbacks fire a frame or two late, which was visible as the bar
  // staying dark for a moment after the lighter section above it had
  // already scrolled into view.
  //
  // The two trigger points are deliberately asymmetric:
  // - turns dark only once safely PAST the stick point (darkPad) — so it
  //   never goes dark while any light content could still show above it.
  // - turns light a good bit BEFORE reaching the stick point (lightPad) —
  //   so it's already light well ahead of any light pixel becoming visible.
  const tabsSentinel = document.getElementById('tabsSentinel');
  const DARK_PAD = 90;   // px past the stick point required before → dark
  const LIGHT_PAD = 60;  // px of lead room *before* the stick point to → light
  let stuck = false;
  let tickingSticky = false;

  function updateStickyColor(){
    tickingSticky = false;
    if (!tabsSentinel || !tabsBarEl) return;
    const stickPoint = header.offsetHeight;
    const d = tabsSentinel.getBoundingClientRect().top;
    if (!stuck && d <= stickPoint - DARK_PAD) {
      stuck = true;   // scrolled solidly past the stick point — safe to go dark
    } else if (stuck && d >= stickPoint - LIGHT_PAD) {
      stuck = false;  // still short of the actual unstick point — go light early, with margin
    }
    tabsBarEl.classList.toggle('is-stuck', stuck);
  }
  function onStickyScroll(){
    if (tickingSticky) return;
    tickingSticky = true;
    requestAnimationFrame(updateStickyColor);
  }
  updateStickyColor();
  window.addEventListener('scroll', onStickyScroll, { passive: true });
  window.addEventListener('resize', updateStickyColor);

  // burger nav + view switching (acts like separate pages, no scroll-to-anchor)
  const burger = document.getElementById('burgerBtn');
  const navPanel = document.getElementById('navPanel');
  const views = document.querySelectorAll('.view');
  const viewLinks = document.querySelectorAll('[data-view-link]');

  function showView(name){
    views.forEach(v => v.classList.toggle('is-active', v.id === 'view-' + name));
    viewLinks.forEach(l => l.classList.toggle('is-current', l.dataset.viewLink === name));
    window.scrollTo({ top: 0, behavior: 'auto' });
    history.replaceState(null, '', name === 'menu' ? '#' : '#' + name);
  }

  viewLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showView(link.dataset.viewLink);
      navPanel.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  burger.addEventListener('click', () => {
    const open = navPanel.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
  });

  if (location.hash === '#info') showView('info');

  // scroll reveal for contacts section
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  revealEls.forEach(el => io.observe(el));
}

document.addEventListener('DOMContentLoaded', init);
