// Riêng Bài 00: packet rơi qua tòa bảy layer ở đầu trang, thang máy sáng layer đang đọc, và bốn sơ đồ chạy lặp liên tục.
// Sơ đồ chỉ chạy khi đang nằm trên màn hình; bật giảm chuyển động thì đứng yên ở trạng thái cuối.
// Không có JS thì mọi thứ vẫn hiện đủ, chỉ đứng yên.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  // Theo dõi phần tử có đang nằm trên màn hình không
  function trackVisible(el) {
    const state = { visible: false };
    new IntersectionObserver((entries) => { state.visible = entries[0].isIntersecting; }, { threshold: 0.2 }).observe(el);
    return state;
  }

  // Chạy một chu kỳ rồi nghỉ, lặp mãi; chỉ chạy khi phần tử đang thấy và không bị bấm dừng.
  // Nút dừng (nếu có) đổi chữ giữa "dừng" và "chạy tiếp".
  function loop(el, cycle, { pauseBtn = null, rest = 1200 } = {}) {
    if (!el) return;
    if (reduced) { cycle.final?.(); return; }
    const seen = trackVisible(el);
    let paused = false;
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        paused = !paused;
        pauseBtn.textContent = paused ? 'chạy tiếp' : 'dừng';
        pauseBtn.setAttribute('aria-pressed', String(paused));
      });
    }
    (async () => {
      for (;;) {
        if (seen.visible && !paused) { await cycle.run(() => paused); await wait(rest); }
        else await wait(300);
      }
    })();
  }

  // ---------- Tòa bảy layer ở đầu trang ----------
  const tower = document.querySelector('.tower');
  if (tower) {
    const floors = [...tower.querySelectorAll('.floor')];
    const packet = tower.querySelector('.packet');
    loop(tower, {
      async run() {
        packet.className = 'packet';
        // Request like nằm giữa chiều cao của dải đang sáng
        const mid = (f) => `translateY(${f.offsetTop + (f.offsetHeight - packet.offsetHeight) / 2}px)`;
        packet.style.transform = mid(floors[0]);
        await wait(300);
        for (const floor of floors) {
          floors.forEach((f) => f.classList.remove('active'));
          floor.classList.add('active');
          packet.style.transform = mid(floor);
          const layer = Number(floor.dataset.layer);
          if (layer <= 4) packet.classList.add(`has${layer}`);
          await wait(430);
        }
        await wait(600);
        packet.classList.add('gone');
        floors.forEach((f) => f.classList.remove('active'));
        await wait(500);
      },
      final() { packet.classList.add('has4', 'has3', 'has2'); },
    }, { rest: 900 });
  }

  // ---------- Thang máy: sáng layer đang đọc ----------
  const elevator = document.querySelector('.elevator');
  const stops = [...elevator.querySelectorAll('a')];
  const targets = stops.map((a) => document.getElementById(a.getAttribute('href').slice(1)));
  function updateElevator() {
    // Nút xếp theo thứ tự đoạn trên trang (layer 1 trên cùng, vì bài giảng từ layer 1 lên layer 7), nên cuộn xuống thì
    // nút sáng cũng đi xuống. Chọn đoạn nằm gần vạch đọc nhất ở phía trên nó.
    const line = innerHeight * 0.3;
    let current = 0, best = -Infinity;
    targets.forEach((t, i) => {
      const top = t ? t.getBoundingClientRect().top : Infinity;
      if (top <= line && top > best) { best = top; current = i; }
    });
    stops.forEach((a, i) => a.classList.toggle('active', i === current));
    // Màn hẹp: thang máy là một hàng cuộn ngang, kéo nút đang sáng vào giữa
    if (elevator.scrollWidth > elevator.clientWidth) {
      const a = stops[current];
      elevator.scrollTo({ left: a.offsetLeft - (elevator.clientWidth - a.offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' });
    }
  }
  let frame = 0;
  addEventListener('scroll', () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(updateElevator); }, { passive: true });
  updateElevator();

  // ---------- Hiện dần khi cuộn tới (chỉ một lần, đây là lúc vào trang chứ không phải chuyển động của sơ đồ) ----------
  // Lớp js trên <html>: chỉ khi script chạy thì hình mới ẩn chờ hiện dần; tắt JS thì mọi hình hiện sẵn
  document.documentElement.classList.add('js');

  // Lab thành tab: bấm tên lab thì lab ấy trượt vào, các lab khác ẩn. Không có JS thì cả bốn lab hiện nối tiếp.
  (() => {
    const lab = document.getElementById('lab');
    if (!lab) return;
    const heads = [...lab.querySelectorAll(':scope > h2.lab-h')];
    if (heads.length < 2) return;
    const panels = heads.map((h, i) => {
      const panel = document.createElement('div');
      panel.className = 'lab-panel'; panel.id = 'lab-panel-' + (i + 1); panel.setAttribute('role', 'tabpanel');
      h.before(panel);
      let n = h;
      while (n && !(n !== h && n.matches('h2.lab-h'))) { const next = n.nextElementSibling; panel.appendChild(n); n = next; }
      return panel;
    });
    const bar = document.createElement('div');
    bar.className = 'lab-tabs'; bar.setAttribute('role', 'tablist'); bar.setAttribute('aria-label', 'Chọn lab');
    const marker = document.createElement('i'); marker.className = 'lab-tab-mark'; marker.setAttribute('aria-hidden', 'true');
    const names = ['MAC', 'tracert', 'nslookup', 'curl'];
    const tabs = heads.map((h, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.setAttribute('role', 'tab'); b.setAttribute('aria-controls', panels[i].id);
      const peek = h.querySelector('.lab-peek');
      b.className = 'lab-tab ' + ([...(peek ? peek.classList : [])].find((c) => /^c\d$/.test(c)) || '');
      b.innerHTML = '<small>lab ' + (i + 1) + '</small><b>' + names[i] + '</b>';
      b.addEventListener('click', () => show(i, true));
      bar.appendChild(b); return b;
    });
    bar.appendChild(marker);
    panels[0].before(bar);
    let current = -1;
    function place() {
      const t = tabs[Math.max(current, 0)];
      marker.style.transform = 'translateX(' + t.offsetLeft + 'px)';
      marker.style.width = t.offsetWidth + 'px';
    }
    function show(i, userClick) {
      if (i === current) return;
      const dir = i > current ? 1 : -1;
      panels.forEach((p, k) => {
        const on = k === i;
        p.hidden = !on;
        p.classList.remove('in-fwd', 'in-back');
        if (on && current !== -1 && !reduced) { void p.offsetWidth; p.classList.add(dir > 0 ? 'in-fwd' : 'in-back'); }
      });
      tabs.forEach((t, k) => { t.setAttribute('aria-selected', String(k === i)); t.tabIndex = k === i ? 0 : -1; });
      current = i; place();
      if (userClick) history.replaceState(null, '', '#lab-' + (i + 1));
    }
    bar.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const k = (current + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
      show(k, true); tabs[k].focus(); e.preventDefault();
    });
    // Link #lab-N (kể cả từ nơi khác trong trang) mở đúng tab rồi cuộn tới
    const fromHash = () => { const m = /^#lab-(\d)$/.exec(location.hash); if (m && panels[m[1] - 1]) { show(m[1] - 1, false); return true; } return false; };
    window.addEventListener('hashchange', fromHash);
    document.addEventListener('click', (e) => { const a = e.target.closest && e.target.closest('a[href^="#lab-"]'); if (a) setTimeout(fromHash, 0); });
    addEventListener('resize', place);
    if (!fromHash()) show(0, false);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
    lab.classList.add('tabbed');
  })();
  const revealIo = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('shown'); revealIo.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.part figure, .part .callout, .part .table-scroll')
    .forEach((el) => { el.classList.add('reveal'); revealIo.observe(el); });

  // ---------- Hình 2: hai tòa nhà ----------
  const towers = document.querySelector('.two-towers');
  if (towers) {
    const down = [...towers.querySelectorAll('[data-side="down"] .cell')];
    const up = [...towers.querySelectorAll('[data-side="up"] .cell')].reverse();
    const bridge = towers.querySelector('.bridge');
    const step = async (c) => { c.classList.add('active'); await wait(330); c.classList.replace('active', 'passed'); };
    loop(towers, {
      async run() {
        [...down, ...up].forEach((c) => c.classList.remove('active', 'passed'));
        bridge.classList.remove('running');
        await wait(250);
        for (const c of down) await step(c);
        bridge.classList.add('running'); await wait(950);
        for (const c of up) await step(c);
      },
    }, { pauseBtn: towers.querySelector('.diagram-btn') });
    // Rê lên một ô thì sáng cùng layer ở tòa bên kia
    const clearMatch = () => towers.querySelectorAll('.cell.match').forEach((c) => c.classList.remove('match'));
    towers.addEventListener('mouseover', (e) => {
      const cell = e.target.closest('.cell');
      clearMatch();
      if (cell) towers.querySelectorAll(`.cell[data-layer="${cell.dataset.layer}"]`).forEach((c) => c.classList.add('match'));
    });
    towers.addEventListener('mouseleave', clearMatch);
  }

  // Chạy một lần khi phần tử vào màn hình
  function onceVisible(el, fn) {
    if (!el) return;
    if (reduced) { fn(); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); fn(); }
    }, { threshold: 0.25 });
    io.observe(el);
  }

  // ---------- Hình 4 và Hình 5: chỉ hiện một lần, không lặp (chỉ mô hình bảy layer mới cần chạy liên tục) ----------
  const tcp = document.querySelector('.tcp-header');
  onceVisible(tcp, () => tcp.classList.add('shown'));
  const route = document.querySelector('.route');
  if (route) {
    route.querySelectorAll('li.hop').forEach((li, i) => li.style.setProperty('--i', i));
    onceVisible(route, () => route.classList.add('shown'));
  }

  // ---------- Hình 6: máy đóng gói, đóng gói rồi bóc ra rồi lại đóng gói (boomerang) ----------
  const encap = document.querySelector('.encap');
  if (encap) {
    const block = (name) => encap.querySelector(`.encap-block.${name}`);
    const packOrder = ['http', 'tls', 'tcp', 'ip', 'mac'];
    const phases = [...encap.querySelectorAll('.encap-phase')];
    const showPhase = (name) => phases.forEach((p) => p.classList.toggle('active', p.dataset.phase === name));
    loop(encap, {
      async run() {
        // Máy bạn: layer trên viết trước, mỗi layer dưới gắn thêm một header ở bên trái
        showPhase('pack');
        encap.classList.remove('tls-on');
        encap.querySelectorAll('.encap-block').forEach((b) => b.classList.remove('on', 'peeled', 'read'));
        await wait(300);
        for (const name of packOrder) {
          block(name).classList.add('on');
          if (name === 'tls') encap.classList.add('tls-on');
          await wait(520);
        }
        await wait(1400);
        // Server: bóc từ ngoài vào trong, tới lời nhắn HTTP thì đọc
        showPhase('unpack');
        for (const name of [...packOrder].reverse()) {
          if (name === 'http') { block(name).classList.add('read'); break; }
          block(name).classList.add('peeled');
          if (name === 'tls') encap.classList.remove('tls-on');
          await wait(520);
        }
        await wait(1400);
      },
      final() {
        encap.querySelectorAll('.encap-block').forEach((b) => b.classList.add('on'));
        encap.classList.add('tls-on');
        showPhase('pack');
      },
    }, { pauseBtn: encap.querySelector('.diagram-btn'), rest: 300 });
  }

  // ---------- Hình 7: packet qua router ----------
  const hosts = document.querySelector('.three-hosts');
  if (hosts) {
    const cell = (host, layer) => hosts.querySelector(`[data-host="${host}"] .host-cell[data-layer="${layer}"]`);
    const path = [
      ...[7, 6, 5, 4, 3, 2, 1].map((l) => cell('client', l)),
      ...[1, 2, 3, 2, 1].map((l) => cell('router', l)),
      ...[1, 2, 3, 4, 5, 6, 7].map((l) => cell('server', l)),
    ];
    loop(hosts, {
      async run() {
        hosts.querySelectorAll('.host-cell').forEach((c) => c.classList.remove('active', 'passed'));
        await wait(250);
        for (const c of path) {
          c.classList.remove('passed'); c.classList.add('active');
          await wait(300);
          c.classList.replace('active', 'passed');
        }
      },
    }, { pauseBtn: document.querySelector('.host-btn .diagram-btn') });
  }

  // ---------- Bảng 1: rê lên một dòng thì thang máy soi layer tương ứng ----------
  document.querySelectorAll('.layer-table tbody tr').forEach((tr) => {
    const layers = (tr.dataset.layers || '').split(' ').filter(Boolean);
    tr.addEventListener('mouseenter', () => layers.forEach((l) => elevator.querySelector(`.el-floor[data-layer="${l}"]`)?.classList.add('hint')));
    tr.addEventListener('mouseleave', () => elevator.querySelectorAll('.hint').forEach((x) => x.classList.remove('hint')));
  });
})();
