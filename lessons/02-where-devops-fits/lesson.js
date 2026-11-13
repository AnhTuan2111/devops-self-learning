// Riêng Bài 02: request chạy vòng qua sáu chỗ ở đầu trang, thanh điều hướng sáng phần đang đọc, và Hình 2 cho bấm làm hỏng
// từng chỗ. Bật giảm chuyển động thì đầu trang đứng yên, Hình 2 vẫn bấm được nhưng không có đoạn chạy.
// Không có JS thì đầu trang hiện đủ sáu chỗ, Hình 2 hiện màn hình lúc mọi chỗ chạy, và Bảng 1 ngay dưới có đủ lời báo.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const ORDER = ['dns', 'firewall', 'nginx', 'tls', 'app', 'db'];

  // ---------- Đầu trang: một request đi qua sáu chỗ, lặp vì request tới server liên tục ----------
  const trip = document.querySelector('.trip-grid');
  if (trip && !reduced) {
    const dot = trip.querySelector('.trip-dot');
    const stop = (name) => trip.querySelector(`[data-stop="${name}"]`);
    const note = document.querySelector('.trip-note');
    const noteText = note.textContent;
    let visible = false;
    new IntersectionObserver((e) => { visible = e[0].isIntersecting; }, { threshold: 0.2 }).observe(trip);
    const moveTo = (el) => {
      const box = trip.getBoundingClientRect(), r = el.getBoundingClientRect();
      dot.style.transform = `translate(${r.left - box.left + r.width / 2}px, ${r.top - box.top}px)`;
    };
    (async () => {
      for (;;) {
        if (!visible) { await wait(400); continue; }
        trip.querySelectorAll('.lit').forEach((s) => s.classList.remove('lit'));
        dot.classList.remove('on');
        moveTo(stop('dns'));
        await wait(300);
        dot.classList.add('on');
        for (const name of ORDER) {
          moveTo(stop(name));
          await wait(460);
          stop(name).classList.add('lit');
          note.textContent = name === 'app' ? 'tới app, chỗ duy nhất là code bạn viết' : noteText;
          await wait(name === 'app' ? 1300 : 420);
        }
        await wait(900);
        note.textContent = noteText;
      }
    })();
  }

  // ---------- Thanh điều hướng: sáng phần đang đọc ----------
  const links = [...document.querySelectorAll('.stop-nav a')];
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
    document.querySelectorAll('.part figure, .part .photo-row, .part .callout, .part .table-scroll')
      .forEach((el) => { el.classList.add('reveal'); io.observe(el); });
  }

  // ---------- Hình 2: bấm làm hỏng một chỗ, request đi lại từ đầu và dừng ở chỗ hỏng đầu tiên ----------
  // Lời báo là output thật trong bài (curl trên Windows và trang lỗi của Nginx, Spring Boot), không bịa thêm.
  const FAIL = {
    dns: { msg: 'curl: (6) Could not resolve host: shop.example.com', who: 'curl viết, theo câu trả lời "không có tên này" của DNS; server không biết gì' },
    firewall: { msg: 'curl: (28) Failed to connect to shop.example.com port 443 after 5014 ms: Timeout was reached', who: 'không ai trả lời; curl tự viết khi chờ hết giờ' },
    nginx: { msg: 'curl: (7) Failed to connect to shop.example.com port 443 after 2010 ms: Could not connect to server', who: 'hệ điều hành của server từ chối vì không ai nhận kết nối ở port 443; curl in ra lời từ chối ấy' },
    tls: { msg: 'curl: (35) schannel: ... SEC_E_CERT_EXPIRED (0x80090328) - The received certificate has expired.', who: 'curl tự kiểm tra ngày trên chứng chỉ rồi dừng; server vẫn chạy bình thường' },
    app: { msg: '502 Bad Gateway  ·  nginx/1.30.5', who: 'Nginx viết, vì gọi vào app ở port 8080 thì bị từ chối' },
    db: { msg: 'HTTP/1.1 500', who: 'app viết mã 500; lý do (không chương trình nào nhận kết nối ở port 5432 của PostgreSQL) chỉ có trong log của app' },
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
})();
