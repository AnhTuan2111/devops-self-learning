// Hành vi của trang lộ trình: khái niệm "Cần biết" chỉ ra bài dạy nó, ô lọc bài, mục lục theo module đang đọc,
// hàng M0-M9 dính ở màn hẹp, thanh tiến độ đọc.
// Không có JS thì trang vẫn đọc được đủ, chỉ mất mấy thứ này.
(() => {
  const cards = [...document.querySelectorAll('.card')].map((el) => ({
    el,
    id: el.id.replace('lesson-', ''),
    title: el.querySelector('h4').textContent,
    desc: el.querySelector('p').textContent,
    needs: [...el.querySelectorAll('.chip')].map((c) => c.textContent).join(' '),
  }));
  const tiles = new Map([...document.querySelectorAll('.strip .tile')].map((t) => [t.getAttribute('href').replace('#lesson-', ''), t]));

  // Khái niệm mà tên không xuất hiện nguyên chữ trong tên hay mô tả bài dạy nó thì chỉ tay ở đây.
  const ALIASES = {
    'oom killer': ['03'], 'kernel': ['03'], 'process': ['03'], 'syscall': ['03'], 'cpu': ['03', '09'], 'ram': ['03', '09'],
    'cài một app lên server': ['13'], 'deploy tay': ['13'], 'biến môi trường': ['03', '13'],
    'lệnh linux cơ bản': ['04'], 'linux': ['04'], 'shell': ['04'], 'router': ['01'], 'mạng riêng': ['01', '08'],
    'reverse proxy': ['14'], 'chứng chỉ': ['15'], 'log': ['06'], 'git': ['26'], 'yaml': [], 'database': [],
    'container': ['18', '19'], 'dns': ['01', '15'], 'pipeline': ['27', '28'], 'load balancer': ['16', '34'],
    'listen và port': ['08'], 'ip và port': ['08'], 'tcp/ip': ['01'], 'volume': ['21', '43'],
    'http': ['00', '01'], 'image': ['19', '20'], 'cloud': ['34'], 'server': ['03', '11'], 'tls': ['02', '15'],
  };

  // Tìm một từ đứng riêng (không dính vào chữ khác), để "IP" không khớp vào "Pipeline".
  const hasWord = (text, word, caseSensitive) => {
    const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}($|[^\\p{L}\\p{N}])`, caseSensitive ? 'u' : 'iu').test(text);
  };
  const hasAllWords = (text, concept, caseSensitive) =>
    concept.split(/\s+/).filter((w) => w !== 'và').every((w) => hasWord(text, w, caseSensitive));

  // Bài dạy một khái niệm: chỉ xét các bài đứng trước bài đang đọc, ưu tiên tên bài, rồi mới tới mô tả.
  function lessonsTeaching(concept, currentId) {
    const earlier = cards.filter((c) => c.id < currentId);
    const alias = ALIASES[concept.toLowerCase()];
    if (alias) return earlier.filter((c) => alias.includes(c.id));
    for (const caseSensitive of [true, false]) {
      const found = earlier.filter((c) => hasAllWords(c.title, concept, caseSensitive));
      if (found.length) return found;
    }
    return earlier.filter((c) => hasAllWords(c.desc, concept, false)).slice(0, 3);
  }

  // Điện thoại: khung "dạy ở" trượt lên từ đáy (sheet) thay vì nổi cạnh chữ.
  const narrow = matchMedia('(max-width: 699px)');
  const backdrop = Object.assign(document.createElement('div'), { className: 'sheet-backdrop' });
  const sheet = Object.assign(document.createElement('div'), { className: 'sheet' });
  sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'true');
  sheet.innerHTML = '<div class="sheet-handle" aria-hidden="true"></div><div class="sheet-body"></div>';
  document.body.append(backdrop, sheet);
  const sheetBody = sheet.querySelector('.sheet-body');
  let openChip = null;
  function openSheet(html, label) {
    sheetBody.innerHTML = html; sheetBody.scrollTop = 0;
    sheet.setAttribute('aria-label', label);
    sheet.classList.add('open'); backdrop.classList.add('open');
  }
  function closeSheet() {
    sheet.classList.remove('open'); backdrop.classList.remove('open'); sheet.style.transform = '';
    if (openChip) openChip.setAttribute('aria-expanded', 'false');
    openChip = null;
  }
  backdrop.addEventListener('click', closeSheet);
  // Vuốt thanh nắm xuống để đóng.
  let startY = null;
  const handle = sheet.querySelector('.sheet-handle');
  handle.addEventListener('touchstart', (e) => { startY = e.touches[0].clientY; sheet.style.transition = 'none'; }, { passive: true });
  handle.addEventListener('touchmove', (e) => {
    if (startY === null) return;
    sheet.style.transform = `translateY(${Math.max(0, e.touches[0].clientY - startY)}px)`;
  }, { passive: true });
  handle.addEventListener('touchend', (e) => {
    const dy = e.changedTouches[0].clientY - startY; startY = null; sheet.style.transition = '';
    if (dy > 70) closeSheet(); else sheet.style.transform = '';
  });
  // Chạm một bài trong sheet: đóng sheet, cuộn tới bài đó và mở nó ra.
  sheetBody.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#lesson-"]');
    if (!a) return;
    e.preventDefault();
    const el = document.getElementById(a.getAttribute('href').slice(1));
    closeSheet();
    el?.classList.add('open');
    el?.scrollIntoView({ block: 'start' });
  });

  let popup = null;
  function closePopup() {
    if (!popup) return;
    popup.remove(); popup = null;
    document.querySelectorAll('.lit').forEach((e) => e.classList.remove('lit'));
    if (openChip) openChip.setAttribute('aria-expanded', 'false');
    openChip = null;
  }
  const lessonList = (found) => found.length
    ? found.map((c) => `<a href="#lesson-${c.id}"><b>${c.id}</b><span>${c.title}</span></a>`).join('')
    : '<span class="empty">Không có bài riêng trong khoá, chỉ cần biết ở mức dùng hằng ngày.</span>';
  function showTaught(chip) {
    if (openChip === chip) return;
    closePopup();
    const found = lessonsTeaching(chip.textContent, chip.closest('.card').id.replace('lesson-', ''));
    if (narrow.matches) {
      openSheet(`<p class="sheet-title">${chip.textContent} · dạy ở</p><div class="sheet-list">${lessonList(found)}</div>`, `${chip.textContent} dạy ở`);
      chip.setAttribute('aria-expanded', 'true');
      openChip = chip;
      return;
    }
    popup = document.createElement('div');
    popup.className = 'taught-pop';
    popup.innerHTML = `<span class="taught-title">${chip.textContent} · dạy ở</span>` + lessonList(found);
    document.body.append(popup);
    const r = chip.getBoundingClientRect();
    const left = Math.min(r.left + scrollX, scrollX + document.documentElement.clientWidth - popup.offsetWidth - 16);
    popup.style.left = `${Math.max(16, left)}px`;
    // Không đủ chỗ phía dưới thì hiện khung phía trên khái niệm.
    const below = r.bottom + 8 + popup.offsetHeight <= innerHeight;
    popup.style.top = `${(below ? r.bottom + 8 : r.top - 8 - popup.offsetHeight) + scrollY}px`;
    found.forEach((c) => { c.el.classList.add('lit'); tiles.get(c.id)?.classList.add('lit'); });
    chip.setAttribute('aria-expanded', 'true');
    openChip = chip;
  }

  document.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (chip) {
      if (openChip === chip) { closePopup(); closeSheet(); } else showTaught(chip);
      e.stopPropagation(); return;
    }
    // Điện thoại: chạm vào dòng bài thì mở hoặc gập phần mô tả.
    const card = e.target.closest('.card');
    if (narrow.matches && card && !e.target.closest('a')) { card.classList.toggle('open'); return; }
    if (popup && !popup.contains(e.target)) closePopup();
    if (e.target.closest('.taught-pop a')) closePopup();
  });
  if (matchMedia('(hover: hover)').matches) {
    let closeTimer;
    document.addEventListener('mouseover', (e) => {
      const chip = e.target.closest('.chip');
      if (chip) { clearTimeout(closeTimer); showTaught(chip); return; }
      if (popup && popup.contains(e.target)) { clearTimeout(closeTimer); return; }
      if (popup) { clearTimeout(closeTimer); closeTimer = setTimeout(closePopup, 250); }
    });
  }
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { closePopup(); closeSheet(); } });
  addEventListener('resize', closePopup);

  // Ô lọc bài: so với tên, mô tả và khái niệm cần biết, bỏ dấu để gõ không dấu vẫn ra.
  const fold = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
  cards.forEach((c) => { c.haystack = fold(`${c.id} ${c.title} ${c.desc} ${c.needs}`); });
  const wideInput = document.getElementById('filter-input');
  const narrowInput = document.getElementById('search-input');
  const wideCount = document.querySelector('.filter output');
  const narrowCount = document.querySelector('.search-drop output');
  function filterLessons(text) {
    closePopup(); closeSheet();
    const q = fold(text.trim());
    let shown = 0;
    cards.forEach((c) => {
      const match = !q || q.split(/\s+/).every((w) => c.haystack.includes(w));
      c.el.classList.toggle('is-hidden', !match);
      tiles.get(c.id)?.classList.toggle('dim', !match);
      if (match) shown++;
    });
    document.querySelectorAll('.mod').forEach((m) => m.classList.toggle('is-hidden', !m.querySelector('.card:not(.is-hidden)')));
    wideCount.textContent = narrowCount.textContent = q ? `${shown} bài` : '';
  }
  wideInput.addEventListener('input', () => filterLessons(wideInput.value));
  // Màn hẹp: gõ tới đâu lọc tới đó, ngừng gõ một chút thì cuộn tới bài đầu tiên còn lại.
  let scrollTimer;
  narrowInput.addEventListener('input', () => {
    filterLessons(narrowInput.value);
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      if (narrowInput.value.trim()) document.querySelector('.mod:not(.is-hidden)')?.scrollIntoView({ block: 'start' });
    }, 350);
  });
  const searchBtn = document.querySelector('.search-btn');
  const searchDrop = document.querySelector('.search-drop');
  function toggleSearch(open) {
    searchDrop.classList.toggle('open', open);
    searchBtn.setAttribute('aria-expanded', String(open));
    // Ô tìm mở thì phần dính cao hơn, nên chỗ chừa khi nhảy tới một đoạn phải tính lại theo chiều cao thật.
    document.documentElement.style.scrollPaddingTop = open ? `${searchBtn.parentElement.offsetHeight + 12}px` : '';
    if (open) narrowInput.focus();
    else if (narrowInput.value) { narrowInput.value = ''; filterLessons(''); }
  }
  searchBtn.addEventListener('click', () => toggleSearch(!searchDrop.classList.contains('open')));
  narrowInput.addEventListener('keydown', (e) => { if (e.key === 'Escape') { toggleSearch(false); searchBtn.focus(); } });

  // Hàng M0-M9: tô module đang đọc và kéo nó vào tầm nhìn nếu hàng đang cuộn ngang.
  const shapeRow = document.querySelector('.shape-scroll');
  function markShape(id) {
    shapeRow.querySelectorAll('.shape-tile').forEach((t) => {
      const on = t.getAttribute('href') === `#${id}`;
      t.setAttribute('aria-current', String(on));
      if (on && shapeRow.scrollWidth > shapeRow.clientWidth) {
        shapeRow.scrollTo({ left: t.offsetLeft - (shapeRow.clientWidth - t.offsetWidth) / 2, behavior: 'smooth' });
      }
    });
  }

  // Mục lục: đánh dấu module đang nằm trên màn hình.
  const tocLinks = new Map([...document.querySelectorAll('.toc a')].map((a) => [a.getAttribute('href').slice(1), a]));
  const visible = new Set();
  const modIo = new IntersectionObserver((entries) => {
    entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
    const first = [...document.querySelectorAll('.mod')].find((m) => visible.has(m.id));
    tocLinks.forEach((a, id) => a.setAttribute('aria-current', String(first?.id === id)));
    if (first) markShape(first.id);
  }, { rootMargin: '-30% 0px -60% 0px' });
  document.querySelectorAll('.mod').forEach((m) => modIo.observe(m));

  narrow.addEventListener('change', () => { closePopup(); closeSheet(); });

  // Link sang trang khác mở ở thẻ mới (người học 30/10/2026: "link gì cũng thế"); link nhảy trong cùng trang thì giữ nguyên.
  document.querySelectorAll('a[href]').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  });

  // Thanh tiến độ đọc ở mép trên.
  const bar = document.querySelector('.progress-bar');
  const updateBar = () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${h > 0 ? scrollY / h : 0})`;
  };
  addEventListener('scroll', updateBar, { passive: true });
  updateBar();
})();
