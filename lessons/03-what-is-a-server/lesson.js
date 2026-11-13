// Riêng Bài 03: bốn nhân CPU chia lượt cho năm process ở đầu trang, thanh điều hướng sáng phần đang đọc, và Hình 2 kể
// một đêm server hết RAM. Hai hình chỉ chạy khi đang nằm trên màn hình; bật giảm chuyển động thì đứng yên.
// Không có JS thì đầu trang hiện bốn nhân trống, Hình 2 hiện thanh RAM lúc script sao lưu mới chạy, kèm năm bước bằng chữ.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const seenState = (el) => {
    const s = { visible: false };
    new IntersectionObserver((e) => { s.visible = e[0].isIntersecting; }, { threshold: 0.2 }).observe(el);
    return s;
  };

  // ---------- Đầu trang: kernel chia lượt CPU, lặp vì việc chia lượt chạy suốt ----------
  const cpu = document.querySelector('.cpu');
  if (cpu) {
    const PROCS = ['java', 'nginx', 'postgres', 'bash', 'backup'];
    const slots = [...cpu.querySelectorAll('.core-slot')];
    const queue = cpu.querySelector('.q-items');
    const paint = (start, animate) => {
      slots.forEach((slot, i) => {
        const name = PROCS[(start + i) % PROCS.length];
        slot.className = `core-slot p-${name}`;
        slot.textContent = name === 'backup' ? 'sao lưu' : name;
        if (animate) { void slot.offsetWidth; slot.classList.add('swap'); }
      });
      queue.innerHTML = '';
      const waiting = PROCS[(start + slots.length) % PROCS.length];
      const tag = document.createElement('span');
      tag.className = `p-${waiting}`;
      tag.textContent = waiting === 'backup' ? 'sao lưu' : waiting;
      queue.append(tag);
    };
    paint(0, false);
    if (!reduced) {
      const seen = seenState(cpu);
      let start = 0;
      (async () => {
        for (;;) {
          await wait(seen.visible ? 900 : 400);
          if (!seen.visible) continue;
          start = (start + 1) % PROCS.length;
          paint(start, true);
        }
      })();
    }
  }

  // ---------- Thanh điều hướng: sáng phần đang đọc ----------
  const links = [...document.querySelectorAll('.board-nav a')];
  const parts = links.map((a) => document.getElementById(a.getAttribute('href').slice(1)));
  const updateNav = () => {
    const line = innerHeight * 0.3;
    let current = 0;
    parts.forEach((p, i) => { if (p && p.getBoundingClientRect().top <= line) current = i; });
    links.forEach((a, i) => a.classList.toggle('active', i === current));
  };
  let frame = 0;
  addEventListener('scroll', () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(updateNav); }, { passive: true });
  updateNav();

  // ---------- Hiện dần khi cuộn tới, chỉ một lần ----------
  if (!reduced) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('shown'); io.unobserve(e.target); }
    }), { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('.part figure.photo, .part .photo-row, .part .callout, .part .table-scroll')
      .forEach((el) => { el.classList.add('reveal'); io.observe(el); });
  }

  // ---------- Hình 2: một đêm hết RAM, lặp lại câu chuyện, có nút dừng ----------
  const ram = document.querySelector('.ram');
  if (ram && !reduced) {
    const seg = (name) => ram.querySelector(`.ram-seg.${name}`);
    const steps = [...ram.querySelectorAll('.ram-log li')];
    const btn = ram.querySelector('.diagram-btn');
    const seen = seenState(ram);
    let paused = false;
    btn.addEventListener('click', () => {
      paused = !paused;
      btn.textContent = paused ? 'chạy tiếp' : 'dừng';
      btn.setAttribute('aria-pressed', String(paused));
    });
    // Chờ khi đang dừng hay khi hình ra khỏi màn hình, để câu chuyện không trôi mất lúc không ai xem
    const hold = async (ms) => { await wait(ms); while (paused || !seen.visible) await wait(250); };
    const step = (i) => steps.forEach((li, k) => li.classList.toggle('now', k === i));
    const width = (name, pct) => { seg(name).style.flexBasis = `${pct}%`; };
    (async () => {
      for (;;) {
        // Bước 1: bốn process quen thuộc, script chưa chạy
        ram.classList.remove('full');
        seg('java').classList.remove('marked');
        width('java', 42.5); width('backup', 0);
        step(0); await hold(2200);
        // Bước 2: script sao lưu giữ RAM mỗi lúc một nhiều
        step(1);
        for (const pct of [3, 6, 9, 12, 15]) { width('backup', pct); await hold(450); }
        // Bước 3: RAM đầy
        ram.classList.add('full'); step(2); await hold(1600);
        // Bước 4: OOM killer chọn process lớn nhất
        seg('java').classList.add('marked'); step(3); await hold(1800);
        // Bước 5: java bị giết, RAM trống lại, Nginx trả 502
        width('java', 0); ram.classList.remove('full'); step(4); await hold(2800);
      }
    })();
  } else if (ram) {
    ram.querySelector('.ram-btns').hidden = true;
  }
})();
