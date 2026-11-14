// Riêng Bài 02: Hình 1 cho hai request chạy song song (máy bạn và server), thanh đường đi dính ở trên sáng chỗ đang đọc,
// Hình 2 gõ cửa server, Hình 3 bấm làm hỏng từng chỗ, Hình 4 cho thời gian trôi.
// Bật giảm chuyển động thì Hình 1 in sẵn mọi dòng và đứng yên; các hình bấm được vẫn bấm được nhưng không có đoạn chạy.
// Không có JS thì Hình 1 hiện đủ các ô, Hình 3 và Hình 4 hiện màn hình lúc mọi chỗ chạy, và Bảng 1 có đủ lời báo.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const ORDER = ['dns', 'firewall', 'nginx', 'tls', 'app', 'db'];
  // Chạy vòng lặp chỉ khi phần tử đang nằm trên màn hình
  const watch = (el) => {
    const st = { visible: false };
    new IntersectionObserver((e) => { st.visible = e[0].isIntersecting; }, { threshold: 0.15 }).observe(el);
    return st;
  };

  // ---------- Hình 1: hai làn, lặp vì request tới server liên tục ----------
  const lanes = document.querySelector('.lanes');
  if (lanes) {
    const STEPS = [
      ['dns', 'Browser hỏi DNS: shop.example.com ở địa chỉ nào? DNS trả lời 203.0.113.10'],
      ['isp', 'mở kết nối TCP tới 203.0.113.10, port 443, qua các router của nhà mạng'],
      ['firewall', 'firewall: port 443 được phép, cho packet qua'],
      ['nginx', 'Nginx listen ở port 443'],
      ['tls', 'TLS handshake: Nginx gửi certificate của shop.example.com, certificate còn hạn'],
      ['app', 'Nginx chuyển request vào app ở port 8080, controller của bạn chạy'],
      ['db', 'app đọc dữ liệu trong PostgreSQL'],
      ['browser', 'câu trả lời 200 đi ngược về browser'],
    ];
    const log = lanes.querySelector('.lane-log');
    const local = lanes.querySelector('.lane-local');
    const server = lanes.querySelector('.lane-server');
    const st = (lane, name) => lane.querySelector(`.st[data-st="${name}"]`);
    const put = (lane, el) => {
      const box = lane.getBoundingClientRect(), r = el.getBoundingClientRect();
      lane.querySelector('.token').style.transform = `translate(${r.left - box.left + r.width / 2}px, ${r.top - box.top}px)`;
    };
    const say = (text) => {
      log.querySelectorAll('.now').forEach((li) => li.classList.remove('now'));
      const li = document.createElement('li');
      li.textContent = text; li.className = 'now';
      log.appendChild(li);
    };
    if (reduced) {
      say('trên máy bạn: browser gọi thẳng localhost:8080, app đọc PostgreSQL rồi trả lời 200');
      STEPS.forEach(([, t]) => say(t));
    } else {
      const seen = watch(lanes);
      (async () => {
        for (;;) {
          if (!seen.visible) { await wait(400); continue; }
          lanes.querySelectorAll('.lit').forEach((s) => s.classList.remove('lit'));
          lanes.querySelectorAll('.token').forEach((t) => t.classList.remove('on', 'back'));
          log.textContent = '';
          put(local, st(local, 'browser')); put(server, st(server, 'browser'));
          await wait(350);
          lanes.querySelectorAll('.token').forEach((t) => t.classList.add('on'));
          await wait(200);
          // Hai làn chạy cùng lúc: làn máy bạn xong sau vài bước, làn server còn đi tiếp
          (async () => {
            put(local, st(local, 'app'));
            say('trên máy bạn: browser gọi thẳng localhost:8080, app đọc PostgreSQL rồi trả lời 200');
            setTimeout(() => st(local, 'app').classList.add('lit'), 500);
            await wait(700);
            put(local, st(local, 'db'));
            setTimeout(() => st(local, 'db').classList.add('lit'), 500);
            await wait(700);
            local.querySelector('.token').classList.add('back');
            put(local, st(local, 'browser'));
          })();
          for (const [name, text] of STEPS) {
            const el = st(server, name);
            if (name === 'browser') server.querySelector('.token').classList.add('back');
            put(server, el);
            await wait(520);
            el.classList.add('lit');
            say(text);
            await wait(name === 'app' ? 1500 : 1000);
          }
          await wait(2600);
        }
      })();
    }
  }

  // ---------- Thanh đường đi: sáng chỗ đang đọc, tô đen những chỗ đã qua ----------
  const links = [...document.querySelectorAll('.route-bar a')];
  const targets = links.map((a) => document.getElementById(a.getAttribute('href').slice(1)));
  const updateBar = () => {
    const line = innerHeight * 0.35;
    let current = -1;
    targets.forEach((t, i) => { if (t && t.getBoundingClientRect().top <= line) current = i; });
    links.forEach((a, i) => {
      a.classList.toggle('active', i === current);
      a.classList.toggle('passed', i < current);
    });
  };
  let frame = 0;
  addEventListener('scroll', () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(updateBar); }, { passive: true });
  updateBar();

  // ---------- Hình 2: gõ cửa server ----------
  // Hai dòng lỗi là output thật ở phần firewall và Nginx, chỉ đổi địa chỉ và port.
  const knock = document.querySelector('.knock');
  if (knock) {
    const picks = [...knock.querySelectorAll('[data-case]')];
    const timer = knock.querySelector('.kn-timer');
    const gate = knock.querySelector('.kn-gate'), gateState = knock.querySelector('.kn-gate-state');
    const door = knock.querySelector('.kn-door'), doorState = knock.querySelector('.kn-door-state');
    const packet = knock.querySelector('.kn-packet');
    const road = knock.querySelector('.kn-road');
    const line = knock.querySelector('.kn-line');
    const stage = knock.querySelector('.knock-stage');
    let run = 0, clock = 0;
    // Toạ độ ngang (tính từ mép trái của đường đầu) của cửa firewall và cửa port 443
    const xOf = (el) => el.getBoundingClientRect().left - road.getBoundingClientRect().left;
    const fly = async (toX, ms, id) => {
      if (reduced) { packet.style.transform = `translateX(${toX}px)`; return; }
      packet.style.transition = `transform ${ms}ms linear`;
      packet.style.transform = `translateX(${toX}px)`;
      await wait(ms);
      return id === run;
    };
    const startClock = (id) => {
      const t0 = performance.now();
      clearInterval(clock);
      clock = setInterval(() => { if (id === run) timer.textContent = `${Math.round(performance.now() - t0)} ms`; }, 47);
    };
    const stopClock = (ms) => { clearInterval(clock); timer.textContent = `${ms} ms`; };
    async function go(kind) {
      const id = ++run;
      picks.forEach((p) => p.setAttribute('aria-checked', String(p.dataset.case === kind)));
      gate.classList.toggle('block', kind === 'drop');
      gateState.textContent = kind === 'drop' ? 'chặn port 443' : 'cho qua';
      door.classList.toggle('off', kind === 'refuse');
      door.classList.remove('open');
      doorState.textContent = kind === 'refuse' ? 'Nginx tắt' : 'Nginx chạy';
      line.className = 'kn-line wait';
      line.textContent = 'curl đang chờ...';
      timer.textContent = '0 ms';
      packet.style.transition = 'none'; packet.style.transform = 'translateX(0)'; packet.style.opacity = '1';
      const gateX = xOf(gate) - 4;
      const doorX = xOf(door) - 4;
      startClock(id);
      if (kind === 'drop') {
        if (!(await fly(gateX, 700, id)) && !reduced) return;
        packet.style.opacity = '0';
        if (!reduced) await wait(5014 - 700);
        if (id !== run) return;
        stopClock(5014);
        line.className = 'kn-line';
        line.textContent = 'curl: (28) Failed to connect to shop.example.com port 443 after 5014 ms: Timeout was reached';
      } else if (kind === 'refuse') {
        for (let i = 0; i < 3; i++) {
          if (!(await fly(doorX, 260, id)) && !reduced) return;
          if (!(await fly(0, 260, id)) && !reduced) return;
          if (!reduced) await wait(150);
        }
        if (id !== run) return;
        packet.style.opacity = '0';
        stopClock(2010);
        line.className = 'kn-line';
        line.textContent = 'curl: (7) Failed to connect to shop.example.com port 443 after 2010 ms: Could not connect to server';
      } else {
        if (!(await fly(doorX, 600, id)) && !reduced) return;
        door.classList.add('open');
        stopClock(clockMs());
        line.className = 'kn-line';
        line.textContent = 'kết nối đã mở, curl sang TLS handshake';
      }
    }
    const clockMs = () => parseInt(timer.textContent, 10) || 0;
    picks.forEach((p) => p.addEventListener('click', () => go(p.dataset.case)));
  }

  // ---------- Hình 3: bấm làm hỏng một chỗ, request đi lại từ đầu và dừng ở chỗ hỏng đầu tiên ----------
  // Lời báo là output thật trong bài (curl trên Windows và trang lỗi của Nginx, Spring Boot), không bịa thêm.
  const FAIL = {
    dns: { msg: 'curl: (6) Could not resolve host: shop.example.com', who: 'curl viết, theo câu trả lời "không có tên này" của DNS; server không biết gì' },
    firewall: { msg: 'curl: (28) Failed to connect to shop.example.com port 443 after 5014 ms: Timeout was reached', who: 'không ai trả lời; curl tự viết khi chờ hết giờ' },
    nginx: { msg: 'curl: (7) Failed to connect to shop.example.com port 443 after 2010 ms: Could not connect to server', who: 'hệ điều hành của server từ chối vì không ai listen ở port 443; curl viết dòng (7) theo lời từ chối ấy' },
    tls: { msg: 'curl: (35) schannel: ... SEC_E_CERT_EXPIRED (0x80090328) - The received certificate has expired.', who: 'curl tự kiểm tra ngày trên certificate rồi dừng; server vẫn chạy bình thường' },
    app: { msg: '502 Bad Gateway  nginx/1.30.5', who: 'Nginx viết, vì gọi vào app ở port 8080 thì bị từ chối' },
    db: { msg: 'HTTP/1.1 500', who: 'app viết status code 500; log của app mới ghi lý do: PostgreSQL tắt, nên ở port 5432 không có chương trình nào listen' },
  };
  const OK = { msg: 'HTTP/1.1 200', who: 'mọi chỗ chạy bình thường, app trả lời 200' };
  const breaker = document.querySelector('.breaker');
  if (breaker) {
    const btns = ORDER.map((n) => breaker.querySelector(`.bk-stop[data-stop="${n}"]`));
    const msg = breaker.querySelector('.bk-msg code');
    const who = breaker.querySelector('.bk-author');
    let run = 0;
    const show = (r) => { msg.textContent = r.msg; who.textContent = r.who; breaker.classList.toggle('err', r !== OK); };
    async function send() {
      const id = ++run;
      btns.forEach((b) => b.classList.remove('pass', 'stopped'));
      show({ msg: '...', who: 'request đang đi' });
      breaker.classList.remove('err');
      for (const b of btns) {
        if (id !== run) return;
        if (b.getAttribute('aria-pressed') === 'true') {
          b.classList.add('stopped');
          show(FAIL[b.dataset.stop]);
          return;
        }
        b.classList.add('pass');
        if (!reduced) await wait(260);
        b.classList.remove('pass');
      }
      if (id === run) show(OK);
    }
    btns.forEach((b) => b.addEventListener('click', () => {
      b.setAttribute('aria-pressed', String(b.getAttribute('aria-pressed') !== 'true'));
      send();
    }));
    // Lần đầu cuộn tới thì cho một request lành đi qua để thấy đường đi
    const once = new IntersectionObserver((e) => { if (e[0].isIntersecting) { once.disconnect(); send(); } }, { threshold: 0.4 });
    once.observe(breaker);
  }

  // ---------- Hình 4: thời gian trôi trên một server không ai đụng vào ----------
  // Số là ví dụ (ghi ở chú thích): certificate 90 ngày, domain 365 ngày, ổ 40 GB, đã dùng 12 GB, mỗi ngày thêm 0,2 GB log.
  const clockFig = document.querySelector('.clock');
  if (clockFig) {
    const range = clockFig.querySelector('#clock-range');
    const out = clockFig.querySelector('#clock-out');
    const play = clockFig.querySelector('.clock-play');
    const screenMsg = clockFig.querySelector('.bk-msg code');
    const screenWho = clockFig.querySelector('.bk-author');
    const meter = (m) => clockFig.querySelector(`.meter[data-m="${m}"]`);
    const since = { domain: 0, cert: 0, disk: 0 };   // ngày gia hạn, dọn log gần nhất
    const LIFE = { domain: 365, cert: 90 };
    const fmt = (n) => n.toFixed(1).replace('.', ',');
    let playing = 0;
    function render() {
      const day = +range.value;
      out.textContent = day;
      const left = (m) => LIFE[m] - (day - since[m]);
      const used = 12 + 0.2 * (day - since.disk);
      const dead = { domain: left('domain') <= 0, cert: left('cert') <= 0, disk: used >= 40 };
      ['domain', 'cert'].forEach((m) => {
        const el = meter(m), l = Math.max(0, left(m));
        el.querySelector('.m-bar i').style.transform = `scaleX(${l / LIFE[m]})`;
        el.querySelector('.m-val').textContent = dead[m] ? 'đã hết hạn' : `còn ${l} ngày`;
        el.classList.toggle('dead', dead[m]);
      });
      const d = meter('disk');
      d.querySelector('.m-bar i').style.transform = `scaleX(${Math.min(used, 40) / 40})`;
      d.querySelector('.m-val').textContent = dead.disk ? 'đầy, không ghi được nữa' : `đã dùng ${fmt(used)} GB`;
      d.classList.toggle('dead', dead.disk);
      // Màn hình người dùng hiện lỗi của chỗ hỏng đứng trước trên đường đi: DNS, rồi TLS, rồi app
      let r = { msg: 'HTTP/1.1 200', who: 'mọi chỗ còn hạn, ổ đĩa còn chỗ' };
      if (dead.disk) r = { msg: 'HTTP/1.1 500', who: 'app viết status code 500; lý do là PostgreSQL ghi vào ổ đầy, hệ điều hành trả về lỗi No space left on device, và PostgreSQL báo lại lỗi ấy cho app' };
      if (dead.cert) r = { msg: 'NET::ERR_CERT_DATE_INVALID', who: 'Browser tự kiểm tra ngày trên certificate rồi dừng' };
      if (dead.domain) r = { msg: 'DNS_PROBE_FINISHED_NXDOMAIN', who: 'Browser viết, theo câu trả lời "không có tên này" của DNS' };
      screenMsg.textContent = r.msg; screenWho.textContent = r.who;
      clockFig.classList.toggle('err', dead.domain || dead.cert || dead.disk);
    }
    range.addEventListener('input', () => {
      // Kéo lùi về trước ngày gia hạn thì coi như chưa gia hạn
      Object.keys(since).forEach((k) => { if (since[k] > +range.value) since[k] = 0; });
      render();
    });
    clockFig.querySelectorAll('[data-fix]').forEach((b) => b.addEventListener('click', () => { since[b.dataset.fix] = +range.value; render(); }));
    play.addEventListener('click', async () => {
      if (playing) { playing = 0; play.textContent = 'chạy'; return; }
      const id = playing = Date.now();
      play.textContent = 'dừng';
      if (+range.value >= +range.max) range.value = 0;
      while (playing === id && +range.value < +range.max) {
        range.value = +range.value + 1;
        render();
        await wait(reduced ? 0 : 25);
      }
      if (playing === id) { playing = 0; play.textContent = 'chạy'; }
    });
    render();
  }
})();
