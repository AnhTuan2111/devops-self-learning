// Riêng Bài 00: gói tin rơi qua tòa bảy tầng ở đầu trang, thang máy sáng tầng đang đọc, và bốn sơ đồ chạy lặp liên tục.
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

  // ---------- Tòa bảy tầng ở đầu trang ----------
  const tower = document.querySelector('.tower');
  if (tower) {
    const floors = [...tower.querySelectorAll('.floor')];
    const packet = tower.querySelector('.packet');
    loop(tower, {
      async run() {
        packet.className = 'packet';
        packet.style.top = '5px';
        await wait(300);
        for (const floor of floors) {
          floors.forEach((f) => f.classList.remove('active'));
          floor.classList.add('active');
          packet.style.top = `${floor.offsetTop + 5}px`;
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

  // ---------- Thang máy: sáng tầng đang đọc ----------
  const elevator = document.querySelector('.elevator');
  const stops = [...elevator.querySelectorAll('a')];
  const targets = stops.map((a) => document.getElementById(a.getAttribute('href').slice(1)));
  function updateElevator() {
    // Bài giảng từ tầng 1 lên tầng 7 trong khi thang máy xếp tầng 7 trên cùng, nên không chọn theo thứ tự nút
    // mà chọn đoạn nằm gần vạch đọc nhất ở phía trên nó.
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
    // Rê lên một ô thì sáng cùng tầng ở tòa bên kia
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

  // ---------- Hình 4 và Hình 5: chỉ hiện một lần, không lặp (chỉ mô hình bảy tầng mới cần chạy liên tục) ----------
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
        // Máy bạn: tầng trên viết trước, mỗi tầng dưới gắn thêm một lớp ở bên trái
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

  // ---------- Hình 7: gói tin qua router ----------
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

  // ---------- Bảng 1: rê lên một dòng thì thang máy soi tầng tương ứng ----------
  document.querySelectorAll('.layer-table tbody tr').forEach((tr) => {
    const layers = (tr.dataset.layers || '').split(' ').filter(Boolean);
    tr.addEventListener('mouseenter', () => layers.forEach((l) => elevator.querySelector(`.el-floor[data-layer="${l}"]`)?.classList.add('hint')));
    tr.addEventListener('mouseleave', () => elevator.querySelectorAll('.hint').forEach((x) => x.classList.remove('hint')));
  });
})();
