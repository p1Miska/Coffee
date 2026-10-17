/* Кофейник — напитки и взаимодействия меню. */

const ICONS = {
  cup: '<path d="M4 3h13v9a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V3Z" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M17 6h1.5a2.5 2.5 0 0 1 0 5H17" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M2 20h18" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>',
  matcha: '<path d="M5 9h14l-1.5 8a3 3 0 0 1-3 2.5h-5A3 3 0 0 1 6.5 17L5 9Z" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M8 9c0-3 1.8-5 4-6.5C14.2 4 16 6 16 9" stroke="currentColor" stroke-width="1.4" fill="none"/>',
  tea: '<path d="M3 8h14v6a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8Z" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M17 10h1a2.5 2.5 0 0 1 0 5h-1" stroke="currentColor" stroke-width="1.4" fill="none"/><path d="M7 3c-1 1.2-1 2 0 3M11 3c-1 1.2-1 2 0 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/>'
};

function icon(name){
  return `<svg viewBox="0 0 24 24" fill="none">${ICONS[name] || ICONS.cup}</svg>`;
}

// The two photographed menus are the source for available sizes and prices.
const CATEGORIES = [
  {
    id: 'classic', label: 'Классическое меню', sizes: [200, 300, 400], type: 'sized',
    items: [
      { name: 'Двойной эспрессо', prices: { 200: 170 }, img: 'images/espresso-americano.webp', icon: 'cup' },
      { name: 'Флэт уайт', prices: { 200: 220, 300: 270, 400: 320 }, img: 'images/flat-white.webp', icon: 'cup' },
      { name: 'Капучино', prices: { 200: 180, 300: 230, 400: 280 }, img: 'images/cappuccino.webp', icon: 'cup' },
      { name: 'Латте', prices: { 300: 210, 400: 260 }, img: 'images/latte.webp', icon: 'cup' },
      { name: 'Раф', prices: { 300: 270, 400: 320 }, img: 'images/raf.webp', icon: 'cup' },
      { name: 'Американо', prices: { 200: 170, 300: 220, 400: 270 }, img: 'images/espresso-americano.webp', icon: 'cup' },
      { name: 'Моккачино', prices: { 200: 230, 300: 280, 400: 330 }, icon: 'cup' },
      { name: 'Матча-латте', prices: { 300: 230, 400: 280 }, img: 'images/matcha-latte.webp', icon: 'matcha' },
      { name: 'Какао', prices: { 200: 210, 300: 260, 400: 310 }, img: 'images/cocoa.webp', icon: 'cup' },
      { name: 'Чай', prices: { 300: 100, 400: 150 }, img: 'images/tea.webp', icon: 'tea' }
    ]
  },
  {
    id: 'author', label: 'Авторское меню', sizes: [300, 400], type: 'sized',
    items: [
      { name: 'Капучино', sub: '«Кокосовые берега»', prices: { 300: 260, 400: 310 }, icon: 'cup' },
      { name: 'Моккачино', sub: '«Загадка домового»', prices: { 300: 330, 400: 380 }, icon: 'cup' },
      { name: 'Эспрессо-тоник', sub: '«Алый мох»', prices: { 300: 320, 400: 370 }, img: 'images/espresso-tonic-alyi-mokh.webp', icon: 'cup' },
      { name: 'Матча-латте', sub: '«Миндаль в цвету»', prices: { 300: 290, 400: 340 }, img: 'images/matcha-latte-almond.webp', icon: 'matcha' },
      { name: 'Матча-бамбл', sub: '«Сливочный персик»', prices: { 300: 350, 400: 400 }, img: 'images/matcha-bumble-peach.webp', icon: 'matcha' },
      { name: 'Чай', sub: '«Янтарная чаша»', prices: { 300: 220, 400: 270 }, icon: 'tea' },
      { name: 'Чай', sub: '«Ягодное лукошко»', prices: { 300: 220, 400: 270 }, icon: 'tea' }
    ]
  }
];

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
  const availableSizes = sizes.filter(size => item.prices[size] != null);
  const initial = availableSizes[0];
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <div class="card-media${item.img ? ' has-photo' : ''}">
      ${mediaMarkup(item, item.icon || 'cup')}
    </div>
    <div class="card-body">
      <div>
        <div class="card-name">${item.name}</div>
        ${item.sub ? `<div class="card-sub">${item.sub}</div>` : ''}
      </div>
      <div class="price-row">
        <span class="price" data-price>${item.prices[initial]} ₽</span>
      </div>
      <div class="size-row" data-sizes></div>
    </div>
  `;
  const sizeRow = card.querySelector('[data-sizes]');
  const priceEl = card.querySelector('[data-price]');
  let selectedSize = initial;

  availableSizes.forEach(size => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'size-btn' + (size === initial ? ' is-active' : '');
    btn.textContent = size + ' мл';
    btn.setAttribute('aria-label', `Объём ${size} мл`);
    btn.setAttribute('aria-pressed', String(size === initial));
    btn.addEventListener('click', () => {
      if (size === selectedSize) return;
      selectedSize = size;
      sizeRow.querySelectorAll('.size-btn').forEach(b => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-pressed', String(active));
      });
      priceEl.textContent = item.prices[size] + ' ₽';
      priceEl.classList.remove('is-swapping');
      void priceEl.offsetWidth;
      priceEl.classList.add('is-swapping');
    });
    sizeRow.appendChild(btn);
  });

  return card;
}

function fillGrid(cat, grid){
  grid.innerHTML = '';
  cat.items.forEach((item) => {
    grid.appendChild(buildSizedCard(item, cat.sizes));
  });
}

let categoryTimer;
function renderCategory(cat, grid, animate){
  window.clearTimeout(categoryTimer);
  if (!animate){ fillGrid(cat, grid); return; }
  grid.classList.add('is-switching');
  categoryTimer = window.setTimeout(() => {
    fillGrid(cat, grid);
    grid.classList.remove('is-switching');
  }, 200);
}

function init(){
  const tabsEl = document.getElementById('tabs');
  const headerTabsEl = document.getElementById('headerTabs');
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

  let activeCategoryId = CATEGORIES[0].id;

  function selectCategory(cat, source){
    if (cat.id === activeCategoryId) return;
    activeCategoryId = cat.id;
    [tabsEl, headerTabsEl].forEach(group => {
      group.querySelectorAll('[role="tab"]').forEach(button => {
        const selected = button.dataset.category === cat.id;
        button.classList.toggle('is-active', selected);
        button.setAttribute('aria-selected', String(selected));
        button.tabIndex = selected ? 0 : -1;
      });
    });
    gridEl.setAttribute('aria-label', cat.label);
    renderCategory(cat, gridEl, true);
    (source === headerTabsEl ? gridEl : menuAnchor)
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function addCategoryTab(cat, i, group, compact){
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = (compact ? 'header-tab-' : 'tab-') + cat.id;
    btn.className = (compact ? 'header-tab-btn' : 'tab-btn') + (i === 0 ? ' is-active' : '');
    btn.textContent = compact ? (cat.id === 'classic' ? 'Классика' : 'Авторские') : cat.label;
    btn.dataset.category = cat.id;
    btn.setAttribute('aria-label', cat.label);
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-controls', 'menuGrid');
    btn.setAttribute('aria-selected', String(i === 0));
    btn.tabIndex = i === 0 ? 0 : -1;
    btn.addEventListener('click', () => selectCategory(cat, group));
    btn.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const buttons = Array.from(group.querySelectorAll('[role="tab"]'));
      const current = buttons.indexOf(btn);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 :
        (current + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
      buttons[next].focus();
      buttons[next].click();
    });
    group.appendChild(btn);
  }

  CATEGORIES.forEach((cat, i) => {
    addCategoryTab(cat, i, tabsEl, false);
    addCategoryTab(cat, i, headerTabsEl, true);
  });

  gridEl.setAttribute('aria-label', CATEGORIES[0].label);
  renderCategory(CATEGORIES[0], gridEl, false);

  // On wide and phone screens, the section tabs move into the header once
  // their original row scrolls away. Medium screens keep the sticky row.
  const tabsSentinel = document.getElementById('tabsSentinel');
  const DARK_PAD = 90;
  const LIGHT_PAD = 60;
  let stuck = false;
  let tickingSticky = false;

  function updateStickyColor(){
    tickingSticky = false;
    if (!tabsSentinel || !tabsBarEl) return;
    const menuVisible = document.getElementById('view-menu').classList.contains('is-active');
    if (window.matchMedia('(min-width: 960px), (max-width: 720px)').matches){
      const showHeaderTabs = menuVisible &&
        tabsBarEl.getBoundingClientRect().bottom <= header.offsetHeight;
      header.classList.toggle('show-category-nav', showHeaderTabs);
      tabsBarEl.classList.remove('is-stuck');
      stuck = false;
      return;
    }
    header.classList.remove('show-category-nav');
    if (!menuVisible){
      tabsBarEl.classList.remove('is-stuck');
      stuck = false;
      return;
    }
    const stickPoint = header.offsetHeight;
    const d = tabsSentinel.getBoundingClientRect().top;
    if (!stuck && d <= stickPoint - DARK_PAD) {
      stuck = true;
    } else if (stuck && d >= stickPoint - LIGHT_PAD) {
      stuck = false;
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

  function showView(name, updateHistory = true){
    views.forEach(v => v.classList.toggle('is-active', v.id === 'view-' + name));
    viewLinks.forEach(l => {
      const current = l.dataset.viewLink === name;
      l.classList.toggle('is-current', current);
      if (l.classList.contains('nav-link')){
        if (current) l.setAttribute('aria-current', 'page');
        else l.removeAttribute('aria-current');
      }
    });
    navPanel.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: 'auto' });
    requestAnimationFrame(updateStickyColor);
    const hash = name === 'menu' ? '#menu' : '#info';
    if (updateHistory && location.hash !== hash) history.pushState(null, '', hash);
  }

  viewLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      showView(link.dataset.viewLink);
    });
  });

  burger.addEventListener('click', () => {
    const open = navPanel.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', open);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape' || !navPanel.classList.contains('is-open')) return;
    navPanel.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.focus();
  });

  if (location.hash === '#info') showView('info', false);
  window.addEventListener('popstate', () => showView(location.hash === '#info' ? 'info' : 'menu', false));
}

document.addEventListener('DOMContentLoaded', init);
