// Riêng Bài 04: Hình 1 cho hai cửa sổ gõ cùng lệnh (lặp khi đang trên màn hình), mỗi dải terminal tự gõ lệnh rồi in output khi
// cuộn tới lần đầu, Hình 2 cho bấm lệnh để xem lệnh xuống tới kernel nào, Hình 3 chạy vòng lặp của shell.
// Mọi lệnh và output là output thật trong bài. Bật giảm chuyển động thì không gõ, không lặp, mọi khối hiện sẵn.
// Không có JS thì Hình 1 và các dải terminal hiện đủ chữ, Hình 2 hiện hai chồng layer, Hình 3 hiện sáu bước bằng chữ.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const seenState = (el) => {
    const s = { visible: false };
    new IntersectionObserver((e) => { s.visible = e[0].isIntersecting; }, { threshold: 0.2 }).observe(el);
    return s;
  };
  const isCmd = (line) => /^(\$ |PS> )/.test(line);
  // Gõ từng dòng vào một khối code: dòng lệnh gõ từng chữ, dòng output hiện cả dòng
  async function typeInto(code, text, hold) {
    code.textContent = '';
    const lines = text.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const span = document.createElement('span');
      span.className = isCmd(line) ? 'cmd' : 'out';
      code.append(span);
      if (isCmd(line)) {
        const head = line.startsWith('PS> ') ? 4 : 2;
        span.textContent = line.slice(0, head);
        for (const ch of line.slice(head)) { span.textContent += ch; await hold(24); }
        await hold(260);
      } else {
        span.textContent = line;
        await hold(45);
      }
      if (i < lines.length - 1) code.append('\n');
    }
  }

  // ---------- Đầu trang: lệnh cài tự gõ một lần khi mở trang ----------
  const big = document.querySelector('.big-typed');
  if (big && !reduced) {
    const text = big.textContent;
    big.textContent = '';
    (async () => { await wait(400); for (const ch of text) { big.textContent += ch; await wait(70); } })();
  }

  // ---------- Hình 1: hai cửa sổ gõ cùng lệnh, lặp ----------
  const twins = document.querySelector('.twins');
  if (twins && !reduced) {
    const seen = seenState(twins);
    const hold = async (ms) => { await wait(ms); while (!seen.visible) await wait(300); };
    const screens = [...twins.querySelectorAll('.twin-screen code')];
    const texts = screens.map((c) => c.textContent);
    (async () => {
      for (;;) {
        await Promise.all(screens.map((c, i) => typeInto(c, texts[i], hold)));
        // Tô dòng cuối của hai cửa sổ, chỗ hai bên khác nhau
        screens.forEach((c) => c.lastElementChild.classList.add('hit'));
        await hold(3600);
      }
    })();
  }

  // ---------- Dải terminal: gõ khi cuộn tới lần đầu ----------
  if (!reduced) {
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      const code = e.target.querySelector('code');
      const text = code.textContent;
      const lines = text.split('\n').length;
      // Khối quá dài thì gõ nhanh hơn để người đọc không phải chờ
      const speed = lines > 6 ? 0.5 : 1;
      typeInto(code, text, (ms) => wait(ms * speed));
    }), { rootMargin: '0px 0px -15% 0px' });
    document.querySelectorAll('pre.band').forEach((pre) => {
      // Giữ chiều cao lúc gõ, để trang không giật
      pre.style.minHeight = `${pre.offsetHeight}px`;
      io.observe(pre);
    });
  }

  // ---------- Hình 2: cùng một lệnh, hai kernel ----------
  const dual = document.querySelector('.dual');
  if (dual) {
    const CMDS = {
      'uname-s': {
        cmd: 'uname -s',
        win: { out: 'MINGW64_NT-10.0-26300', down: ['shell', 'kernel'] },
        linux: { out: 'Linux', down: ['shell', 'kernel'] },
        note: 'Bên phải, kernel Linux trả lời là Linux. Bên trái, chữ MINGW64 do Git Bash thêm vào, báo lệnh đang chạy bằng bộ chương trình Windows của Git Bash. Trong phần còn lại của chuỗi, NT là tên kernel Windows, 10.0 là version, 26300 là số build; Windows 11 vẫn mang số 10.0.',
      },
      'uname-r': {
        cmd: 'uname -r',
        win: { out: '3.4.10-bc1f6498.x86_64', down: ['shell', 'kernel'] },
        linux: { out: '6.18.33.2-microsoft-standard-WSL2', down: ['shell', 'kernel'] },
        note: 'Bên phải là version kernel Linux; bên trái là version library giúp các lệnh của Git Bash chạy được trên Windows.',
      },
      free: {
        cmd: 'free -h',
        win: { out: 'bash: free: command not found', down: ['shell'] },
        linux: { out: '               total        used        free      shared  buff/cache   available\nMem:            10Gi       1.3Gi       5.8Gi       4.7Mi       3.8Gi       9.4Gi', down: ['shell', 'kernel'] },
        note: 'Git Bash không có lệnh free. Kernel Linux trả lời tổng 10 GB, mức trần RAM của VM, không phải 15,2 GB của laptop.',
      },
      which: {
        cmd: 'which ls',
        win: { out: '/usr/bin/ls', down: ['shell', 'kernel'] },
        linux: { out: '/usr/bin/ls', down: ['shell', 'kernel'] },
        note: 'Cùng một path, nhưng bên trái là tệp chương trình Windows, bên phải là tệp chương trình Linux.',
      },
    };
    const btns = [...dual.querySelectorAll('[data-cmd]')];
    const note = dual.querySelector('.dual-note');
    let run = 0;
    async function go(key) {
      const id = ++run;
      const c = CMDS[key];
      btns.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.cmd === key)));
      note.textContent = '';
      await Promise.all(['win', 'linux'].map(async (side) => {
        const box = dual.querySelector(`.side[data-side="${side}"]`);
        const code = box.querySelector('.side-screen code');
        const layers = [...box.querySelectorAll('.side-stack li')];
        layers.forEach((l) => l.classList.remove('pass', 'hit'));
        const hold = (ms) => (reduced ? Promise.resolve() : wait(ms));
        code.textContent = '';
        await typeInto(code, `$ ${c.cmd}`, hold);
        if (id !== run) return;
        // Lệnh đi xuống từng layer, layer cuối nó tới thì tô đậm
        for (const ly of c[side].down) {
          layers.forEach((l) => l.classList.replace('hit', 'pass'));
          box.querySelector(`[data-ly="${ly}"]`).classList.add('hit');
          await hold(380);
          if (id !== run) return;
        }
        code.append('\n');
        const out = document.createElement('span'); out.className = 'out'; out.textContent = c[side].out;
        code.append(out);
      }));
      if (id === run) note.textContent = c.note;
    }
    btns.forEach((b) => b.addEventListener('click', () => go(b.dataset.cmd)));
    btns.forEach((b) => b.setAttribute('aria-pressed', 'false'));
  }

  // ---------- Hình 3: vòng lặp của shell, lặp vì shell cứ đọc rồi chạy mãi ----------
  const loop = document.querySelector('.loop');
  if (loop && !reduced) {
    const steps = [...loop.querySelectorAll('.loop-steps li')];
    const typed = loop.querySelector('.loop-typed');
    const cmd = typed.textContent;
    const seen = seenState(loop);
    const hold = async (ms) => { await wait(ms); while (!seen.visible) await wait(250); };
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
  }
})();
