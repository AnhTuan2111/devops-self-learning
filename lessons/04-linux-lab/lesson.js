// Riêng Bài 04: một dòng lệnh gõ ở bash đi xuống qua các lớp ở đầu trang rồi kết quả đi lên, thanh điều hướng sáng phần
// đang đọc, và Hình 2 chạy vòng lặp của shell. Hai hình chỉ chạy khi đang nằm trên màn hình; bật giảm chuyển động thì
// đứng yên. Không có JS thì đầu trang hiện đủ sáu lớp, Hình 2 hiện đủ sáu bước bằng chữ.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const seenState = (el) => {
    const s = { visible: false };
    new IntersectionObserver((e) => { s.visible = e[0].isIntersecting; }, { threshold: 0.2 }).observe(el);
    return s;
  };

  // ---------- Đầu trang: gõ lệnh, lệnh đi xuống tới kernel Linux, kết quả đi lên lại bash ----------
  // Lệnh và kết quả là output thật trong bài.
  const stack = document.querySelector('.stack');
  if (stack) {
    const typed = stack.querySelector('.typed');
    const prompt = stack.querySelector('.prompt');
    const note = stack.querySelector('.stack-note');
    const base = note.textContent;
    const layer = (n) => stack.querySelector(`.ly-${n}`);
    const CMDS = [
      { cmd: 'uname -r', out: '6.18.33.2-microsoft-standard-WSL2' },
      { cmd: 'which java', out: '/usr/bin/java' },
      { cmd: 'curl -s localhost:8080/', out: '{"pid":2338,"app":"sample-app"}' },
    ];
    if (reduced) { typed.textContent = CMDS[0].cmd; }
    else {
      const seen = seenState(stack);
      const hold = async (ms) => { await wait(ms); while (!seen.visible) await wait(300); };
      (async () => {
        for (let i = 0; ; i = (i + 1) % CMDS.length) {
          const { cmd, out } = CMDS[i];
          stack.querySelectorAll('.lit, .back').forEach((l) => l.classList.remove('lit', 'back'));
          note.textContent = base;
          prompt.hidden = false;
          typed.textContent = '';
          for (const ch of cmd) { typed.textContent += ch; await hold(70); }
          await hold(400);
          // Lệnh đi xuống: bash, Ubuntu, kernel Linux; dừng ở kernel vì kernel mới là thứ chạm phần cứng của máy ảo
          for (const n of ['bash', 'ubuntu', 'linux']) { layer(n).classList.add('lit'); await hold(380); }
          note.textContent = 'kernel Linux tạo process, chạy lệnh';
          await hold(700);
          // Kết quả đi lên lại tới bash
          for (const n of ['linux', 'ubuntu', 'bash']) { layer(n).classList.replace('lit', 'back'); await hold(260); }
          prompt.hidden = true;
          typed.textContent = out;
          note.textContent = 'process in kết quả ra cửa sổ, bash chờ dòng tiếp theo';
          await hold(2200);
        }
      })();
    }
  }

  // ---------- Thanh điều hướng: sáng phần đang đọc ----------
  const links = [...document.querySelectorAll('.cmd-nav a')];
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

  // ---------- Hình 2: vòng lặp của shell, lặp vì shell cứ đọc rồi chạy mãi, có nút dừng ----------
  const loop = document.querySelector('.loop');
  if (loop && !reduced) {
    const steps = [...loop.querySelectorAll('.loop-steps li')];
    const typed = loop.querySelector('.loop-typed');
    const cmd = typed.textContent;
    const btn = loop.querySelector('.diagram-btn');
    const seen = seenState(loop);
    let paused = false;
    btn.addEventListener('click', () => {
      paused = !paused;
      btn.textContent = paused ? 'chạy tiếp' : 'dừng';
      btn.setAttribute('aria-pressed', String(paused));
    });
    const hold = async (ms) => { await wait(ms); while (paused || !seen.visible) await wait(250); };
    (async () => {
      for (;;) {
        steps.forEach((li) => li.classList.remove('now', 'done'));
        typed.textContent = '';
        for (const ch of cmd) { typed.textContent += ch; await hold(55); }
        await hold(500);
        for (const li of steps) {
          li.classList.add('now');
          await hold(li.dataset.step === 'run' ? 1800 : 1300);
          li.classList.replace('now', 'done');
        }
        await hold(900);
      }
    })();
  } else if (loop) {
    loop.querySelector('.loop-btns').hidden = true;
  }
})();
