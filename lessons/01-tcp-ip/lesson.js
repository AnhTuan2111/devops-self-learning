// Riêng Bài 01: lưới router ở đầu trang, tuyến đường điều hướng có gói tin đếm TTL lùi, và các sơ đồ của bài.
// Lưới router, gộp tầng và tracert chạy lặp liên tục khi đang nằm trên màn hình; tra bảng route, BGP, DNS, bóc byte
// chạy theo lần bấm hoặc chạy một lần khi cuộn tới.
// Bật giảm chuyển động thì mọi thứ đứng yên ở trạng thái cuối. Không có JS thì chữ và số liệu vẫn đủ trong HTML.
(() => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const NS = 'http://www.w3.org/2000/svg';
  const svgEl = (tag, attrs = {}, parent = null) => {
    const el = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
    if (parent) parent.appendChild(el);
    return el;
  };

  function trackVisible(el) {
    const state = { visible: false };
    new IntersectionObserver((e) => { state.visible = e[0].isIntersecting; }, { threshold: 0.2 }).observe(el);
    return state;
  }
  function onceVisible(el, fn) {
    if (!el) return;
    if (reduced) { fn(); return; }
    const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { io.disconnect(); fn(); } }, { threshold: 0.3 });
    io.observe(el);
  }
  // Chạy một chu kỳ rồi nghỉ, lặp mãi; chỉ chạy khi phần tử đang thấy
  function loop(el, cycle, rest = 1200) {
    const seen = trackVisible(el);
    (async () => { for (;;) { if (seen.visible) { await cycle(); await wait(rest); } else await wait(300); } })();
  }

  // ---------- Đầu trang: bốn gói của một lời nhắn đi bốn đường qua lưới router ----------
  // Lặp liên tục, chỉ chạy khi đang thấy.
  const mesh = document.querySelector('.mesh');
  if (mesh) {
    const svg = mesh.querySelector('.mesh-svg');
    const N = { S: [26, 115], A: [100, 45], B: [100, 185], C: [185, 28], E: [185, 115], F: [185, 202], G: [268, 58], H: [268, 172], D: [334, 115] };
    const links = ['SA', 'SB', 'AC', 'AE', 'BE', 'BF', 'CG', 'EG', 'EH', 'FH', 'GD', 'HD', 'CE', 'EF'];
    const linkEl = {};
    links.forEach((l) => { linkEl[l] = svgEl('line', { class: 'link', x1: N[l[0]][0], y1: N[l[0]][1], x2: N[l[1]][0], y2: N[l[1]][1] }, svg); });
    const rt = {};
    for (const k of 'ABCEFGH') rt[k] = svgEl('circle', { class: 'rt', cx: N[k][0], cy: N[k][1], r: 10 }, svg);
    for (const [k, label] of [['S', 'máy bạn'], ['D', 'server']]) {
      svgEl('rect', { class: 'end', x: N[k][0] - 24, y: N[k][1] - 15, width: 48, height: 30 }, svg);
      svgEl('text', { class: 'end-label', x: N[k][0], y: N[k][1] + 4 }, svg).textContent = label;
    }
    const boom = svgEl('circle', { class: 'boom', cx: N.E[0], cy: N.E[1], r: 8 }, svg);
    const pkLayer = svgEl('g', {}, svg);
    const slots = [...mesh.querySelectorAll('.tray-slots i')];
    const tray = mesh.querySelector('.tray-slots');
    const status = mesh.querySelector('.mesh-status');
    const seen = trackVisible(mesh);

    const makePacket = (n) => {
      const g = svgEl('g', { class: `pk p${n}` }, pkLayer);
      svgEl('rect', { x: -9, y: -8, width: 18, height: 16 }, g);
      svgEl('text', { x: 0, y: 1 }, g).textContent = n;
      g.setAttribute('transform', `translate(${N.S[0]} ${N.S[1]})`);
      return g;
    };
    // Đi dọc một chuỗi nút với tốc độ px/ms; đứng lại khi khuất màn hình
    const travel = (g, route, speed, onNode) => new Promise((resolve) => {
      const pts = route.split('').map((k) => N[k]);
      let seg = 0, t = 0, last = performance.now();
      const step = (now) => {
        const dt = now - last; last = now;
        if (seen.visible) t += dt * speed;
        let [x1, y1] = pts[seg], [x2, y2] = pts[seg + 1];
        let len = Math.hypot(x2 - x1, y2 - y1);
        while (t >= len) {
          t -= len; seg++;
          const key = route[seg];
          if (onNode && onNode(key) === false) { resolve(false); return; }
          if (seg >= pts.length - 1) { g.setAttribute('transform', `translate(${pts[seg][0]} ${pts[seg][1]})`); resolve(true); return; }
          [x1, y1] = pts[seg]; [x2, y2] = pts[seg + 1]; len = Math.hypot(x2 - x1, y2 - y1);
        }
        const r = t / len;
        g.setAttribute('transform', `translate(${x1 + (x2 - x1) * r} ${y1 + (y2 - y1) * r})`);
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    const flash = (k, cls, ms = 260) => { rt[k]?.classList.add(cls); setTimeout(() => rt[k]?.classList.remove(cls), ms); return true; };
    const hold = async (ms) => { let left = ms; while (left > 0) { await wait(100); if (seen.visible) left -= 100; } };

    let arrived = [];
    const land = (n) => {
      const s = slots[arrived.length];
      arrived.push(n);
      s.textContent = n; s.className = 'in';
    };
    async function cycle() {
      pkLayer.textContent = '';
      arrived = [];
      slots.forEach((s) => { s.textContent = ''; s.className = ''; });
      tray.classList.remove('done');
      status.textContent = 'một request, cắt thành bốn gói';
      await hold(700);
      status.textContent = 'mỗi gói tự đi, router chỉ đọc địa chỉ nhận';
      const go = (n, route, speed, delay) => hold(delay).then(() => {
        const g = makePacket(n);
        return travel(g, route, speed, (k) => {
          if (n === 3 && k === 'E') {
            rt.E.classList.add('drop'); boom.classList.remove('on'); void boom.getBBox(); boom.classList.add('on');
            g.classList.add('lost');
            status.textContent = 'hàng chờ của router đầy, gói 3 bị bỏ';
            setTimeout(() => rt.E.classList.remove('drop'), 700);
            return false;
          }
          return k === 'D' ? true : flash(k, 'busy');
        }).then((ok) => { g.remove(); if (ok) land(n); });   // gói tới nơi rời lưới, rơi vào khay
      });
      await Promise.all([
        go(1, 'SACGD', 0.075, 0),
        go(2, 'SAEGD', 0.11, 250),
        go(3, 'SBEHD', 0.09, 450),
        go(4, 'SBFHD', 0.085, 650),
      ]);
      status.textContent = `tới nơi lộn thứ tự: ${arrived.join(' ')}, thiếu gói 3`;
      await hold(1300);
      status.textContent = 'máy nhận báo thiếu gói 3, TCP ở máy gửi gửi lại gói ấy';
      const again = makePacket(3);
      await travel(again, 'SBFHD', 0.12, (k) => (k === 'D' ? true : flash(k, 'busy')));
      again.remove();
      land(3);
      await hold(700);
      status.textContent = 'TCP ráp lại đúng thứ tự: 1 2 3 4';
      tray.classList.add('done');
      slots.forEach((s, i) => { s.textContent = i + 1; s.className = `in k${i + 1}`; });
      pkLayer.textContent = '';
      await hold(2200);
    }
    if (reduced) {
      slots.forEach((s, i) => { s.textContent = i + 1; s.className = `in k${i + 1}`; });
      status.textContent = 'tới nơi lộn thứ tự, TCP ráp lại: 1 2 3 4';
    } else {
      (async () => { for (;;) { if (seen.visible) await cycle(); else await wait(300); } })();
    }
  }

  // ---------- Tuyến đường điều hướng: sáng ga đang đọc, gói tin trượt theo vị trí cuộn và đếm TTL lùi ----------
  const nav = document.querySelector('.line-nav');
  if (nav) {
    const stops = [...nav.querySelectorAll('a')];
    const targets = stops.map((a) => document.getElementById(a.getAttribute('href').slice(1)));
    const track = nav.querySelector('.line-track');
    const fill = nav.querySelector('.line-fill');
    const dot = nav.querySelector('.line-dot');
    const ttl = dot.querySelector('em');
    const center = (a) => a.offsetTop + a.offsetHeight / 2;
    function layoutTrack() {
      if (getComputedStyle(track).display === 'none') return false;
      const top = center(stops[0]);
      track.style.top = `${top}px`;
      track.style.height = `${center(stops[stops.length - 1]) - top}px`;
      track.style.bottom = 'auto';
      return true;
    }
    let vertical = layoutTrack();
    function update() {
      const line = innerHeight * 0.3;
      const tops = targets.map((t) => (t ? t.getBoundingClientRect().top - line : Infinity));
      let cur = 0;
      tops.forEach((t, i) => { if (t <= 0) cur = i; });
      stops.forEach((a, i) => { a.classList.toggle('active', i === cur); a.classList.toggle('passed', i < cur); });
      // TTL bắt đầu 64, qua mỗi ga trừ một, như qua mỗi router
      ttl.textContent = String(64 - cur);
      if (vertical) {
        const next = Math.min(cur + 1, stops.length - 1);
        const span = tops[next] - tops[cur];
        const p = next === cur || !isFinite(span) || span === 0 ? 0 : Math.min(1, Math.max(0, -tops[cur] / span));
        const y0 = center(stops[cur]) - center(stops[0]);
        const y1 = center(stops[next]) - center(stops[0]);
        const y = tops[0] > 0 ? 0 : y0 + (y1 - y0) * p;
        dot.style.top = `${y}px`;
        fill.style.height = `${y}px`;
      } else if (nav.scrollWidth > nav.clientWidth) {
        const a = stops[cur];
        nav.scrollTo({ left: a.offsetLeft - (nav.clientWidth - a.offsetWidth) / 2, behavior: reduced ? 'auto' : 'smooth' });
      }
    }
    let frame = 0;
    addEventListener('scroll', () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); }, { passive: true });
    addEventListener('resize', () => { vertical = layoutTrack(); update(); });
    update();
  }

  // ---------- Hiện dần khi cuộn tới ----------
  const revealIo = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('shown'); revealIo.unobserve(e.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.part figure, .part .callout, .part .table-scroll')
    .forEach((el) => { el.classList.add('reveal'); revealIo.observe(el); });

  // ---------- Hình 2: bảy tầng gộp thành bốn ----------
  const merge = document.querySelector('.merge');
  if (merge) {
    // Hiện các khối rồi lặp: tách ra theo OSI, gộp lại như TCP/IP
    if (reduced) merge.classList.add('shown');
    else loop(merge, async () => {
      merge.classList.add('shown');
      await wait(1800);
      merge.classList.add('split');
      await wait(2200);
      merge.classList.remove('split');
    }, 400);
    // Rê lên một khối TCP/IP thì viền các tầng OSI mà nó gộp
    const cover = { app: [7, 6, 5], tra: [4], int: [3], lnk: [2, 1] };
    const cells = [...merge.querySelectorAll('.osi .m-cell')];
    merge.querySelectorAll('.t-block').forEach((b) => {
      const key = Object.keys(cover).find((k) => b.classList.contains(k));
      b.addEventListener('mouseenter', () => cover[key].forEach((n) => cells[7 - n].classList.add('lit')));
      b.addEventListener('mouseleave', () => cells.forEach((c) => c.classList.remove('lit')));
    });
  }

  // ---------- Hình 4: tra bảng route, khớp dài nhất thắng ----------
  const lookup = document.querySelector('.lookup');
  if (lookup) {
    const toInt = (ip) => {
      const p = ip.trim().split('.');
      if (p.length !== 4 || p.some((x) => !/^\d{1,3}$/.test(x) || Number(x) > 255)) return null;
      return p.reduce((a, x) => ((a << 8) | Number(x)) >>> 0, 0);
    };
    const rows = [...lookup.querySelectorAll('.lookup-rows li')];
    const bitsIp = lookup.querySelector('.bits-ip');
    const bitsRow = lookup.querySelector('.bits-row');
    const out = lookup.querySelector('.lookup-out');
    const chips = [...lookup.querySelectorAll('.ip-chip')];
    const input = lookup.querySelector('.lookup-try input');
    for (let i = 0; i < 32; i++) bitsRow.appendChild(document.createElement('b'));
    const bitEls = [...bitsRow.children];
    let run = 0;
    async function check(ip) {
      const me = ++run;
      const v = toInt(ip);
      bitsIp.textContent = ip;
      bitEls.forEach((b, i) => { b.textContent = (v >>> (31 - i)) & 1; b.classList.remove('on'); });
      rows.forEach((r) => { r.className = ''; r.querySelector('.lr-bar i').style.width = '0'; r.querySelector('.lr-res').textContent = ''; });
      out.textContent = 'đang so từng dòng';
      let best = null;
      for (const r of rows) {
        const len = Number(r.dataset.len);
        const net = toInt(r.dataset.net);
        const hit = len === 0 || (v >>> (32 - len)) === (net >>> (32 - len));
        bitEls.forEach((b, i) => b.classList.toggle('on', i < len));
        r.querySelector('.lr-bar i').style.width = `${(len / 32) * 100}%`;
        if (!reduced) await wait(520);
        if (me !== run) return;
        r.classList.add(hit ? 'match' : 'miss');
        r.querySelector('.lr-res').textContent = hit ? (len === 0 ? "khớp mọi địa chỉ" : `khớp ${len} bit`) : 'không khớp';
        if (hit && (!best || len > Number(best.dataset.len))) best = r;
      }
      bitEls.forEach((b) => b.classList.remove('on'));
      if (!reduced) await wait(250);
      if (me !== run) return;
      best.classList.add('win');
      best.querySelector('.lr-res').textContent = 'thắng';
      const len = Number(best.dataset.len);
      bitEls.forEach((b, i) => b.classList.toggle('on', i < len));
      out.innerHTML = `dòng <em>/${len}</em> thắng: ${best.dataset.via}`;
    }
    const pick = (chip) => {
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      check(chip.dataset.ip);
    };
    chips.forEach((c) => c.addEventListener('click', () => pick(c)));
    input.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter') return;
      const ok = toInt(input.value) !== null;
      input.classList.toggle('bad', !ok);
      if (ok) { chips.forEach((c) => c.setAttribute('aria-pressed', 'false')); check(input.value.trim()); }
    });
    input.addEventListener('input', () => {
      const ok = toInt(input.value) !== null;
      input.classList.toggle('bad', input.value !== '' && !ok);
      if (ok) { chips.forEach((c) => c.setAttribute('aria-pressed', 'false')); check(input.value.trim()); }
    });
    onceVisible(lookup, () => pick(chips[0]));
  }

  // ---------- Hình 5: tracert dò đường bằng TTL ----------
  const probe = document.querySelector('.probe');
  if (probe) {
    const path = probe.querySelector('.probe-path');
    const nodes = [...path.querySelectorAll('.p-node')];
    const pkt = path.querySelector('.probe-pkt');
    const ttlEl = pkt.querySelector('em');
    const tag = pkt.querySelector('b');
    const logs = [...probe.querySelectorAll('.probe-log li')];
    const xOf = (n) => `${n.offsetLeft + n.offsetWidth / 2}px`;
    const reset = () => {
      nodes.forEach((n) => n.classList.remove('hit', 'seen'));
      logs.forEach((l) => l.classList.remove('on', 'last'));
      pkt.classList.remove('show', 'back');
    };
    async function trace() {
      reset();
      for (let start = 1; start <= 5; start++) {
        let t = start;
        pkt.classList.remove('back'); tag.textContent = 'TTL'; ttlEl.textContent = t;
        pkt.style.transition = 'none'; pkt.style.left = xOf(nodes[0]); void pkt.offsetWidth; pkt.style.transition = '';
        pkt.classList.add('show');
        await wait(350);
        let stop = 0;
        for (let i = 1; i < nodes.length; i++) {
          pkt.style.left = xOf(nodes[i]);
          await wait(430);
          if (nodes[i].classList.contains('dst')) { stop = i; break; }
          t -= 1; ttlEl.textContent = t;
          if (t === 0) { stop = i; break; }
        }
        nodes[stop].classList.add('hit');
        await wait(380);
        // Lời báo đi ngược về máy bạn: Time Exceeded từ router, hay Echo Reply từ đích
        const atDst = nodes[stop].classList.contains('dst');
        pkt.classList.add('back'); tag.textContent = atDst ? 'đáp' : 'hết hạn'; ttlEl.textContent = atDst ? 'ok' : 'hết';
        pkt.style.left = xOf(nodes[0]);
        await wait(420 + stop * 60);
        nodes[stop].classList.replace('hit', 'seen');
        logs[stop - 1].classList.add('on');
        if (atDst) { logs[stop - 1].classList.add('last'); nodes[stop].classList.add('hit'); }
        await wait(250);
      }
      pkt.classList.remove('show');
      await wait(1600);
    }
    if (reduced) logs.forEach((l, i) => l.classList.add('on', ...(i === logs.length - 1 ? ['last'] : [])));
    else loop(probe, trace);
  }

  // ---------- Hình 6: lời báo BGP lan giữa các AS ----------
  const bgp = document.querySelector('.bgp');
  if (bgp) {
    const svg = bgp.querySelector('.bgp-svg');
    // Tám AS và đường nối lấy từ AS path thật trên RIPEstat ngày 30/10/2026
    const AS = {
      32934: { x: 572, y: 150, name: 'Facebook', from: null },
      3491: { x: 430, y: 40, name: 'PCCW Global', from: 32934 },
      18106: { x: 430, y: 112, name: 'Viewqwest', from: 32934 },
      2914: { x: 430, y: 184, name: 'NTT', from: 32934 },
      1299: { x: 430, y: 256, name: 'Arelion', from: 32934 },
      174: { x: 285, y: 256, name: 'Cogent', from: 1299 },
      50673: { x: 150, y: 256, name: 'Serverius', from: 174 },
      202365: { x: 70, y: 150, name: 'mạng nhỏ ở Hà Lan', from: 50673 },
    };
    const W = 96, H = 38;
    const pathOf = (asn) => { const out = []; for (let a = Number(asn); a; a = AS[a].from) out.push(a); return out.join(' '); };
    const edges = {};
    const edgeLayer = svgEl('g', {}, svg);
    const msgLayer = svgEl('g', {}, svg);
    for (const [asn, a] of Object.entries(AS)) {
      if (!a.from) continue;
      const b = AS[a.from];
      edges[asn] = svgEl('line', { class: 'edge', x1: a.x, y1: a.y, x2: b.x, y2: b.y }, edgeLayer);
    }
    for (const [asn, a] of Object.entries(AS)) {
      const g = svgEl('g', { class: `as${a.from ? '' : ' origin'}` }, svg);
      svgEl('rect', { x: a.x - W / 2, y: a.y - H / 2, width: W, height: H }, g);
      svgEl('text', { class: 'asn', x: a.x, y: a.y - 2 }, g).textContent = `AS${asn}`;
      svgEl('text', { class: 'asname', x: a.x, y: a.y + 12 }, g).textContent = a.name;
      a.g = g;
      if (!a.from) continue;
      // Ô AS path: cột phải đặt bên trái nút, hàng dưới đặt dưới nút, nút ngoài cùng bên trái đặt trên nút
      const text = pathOf(asn);
      const tw = text.length * 6.6 + 12;
      let tx, ty;
      if (a.x === 430 && a.y < 250) { tx = a.x - W / 2 - tw - 10; ty = a.y - 9; }
      else if (a.y > 250) { tx = a.x - tw / 2; ty = a.y + H / 2 + 6; }
      else { tx = Math.max(4, a.x - tw / 2); ty = a.y - H / 2 - 24; }
      const tg = svgEl('g', { class: 'path-tag' }, svg);
      svgEl('rect', { x: tx, y: ty, width: tw, height: 18 }, tg);
      svgEl('text', { x: tx + 6, y: ty + 9.5 }, tg).textContent = text;
      a.tag = tg; a.tagText = tg.querySelector('text'); a.text = text;
    }
    const state = bgp.querySelector('.bgp-state');
    const btnW = bgp.querySelector('.bgp-withdraw');
    const btnA = bgp.querySelector('.bgp-announce');
    // Thứ tự lan: các AS nối thẳng Facebook trước, rồi tới AS nhận lại từ chúng
    const order = Object.keys(AS).filter((k) => AS[k].from).sort((a, b) => pathOf(a).split(' ').length - pathOf(b).split(' ').length);
    const sendMsg = (asn, withdraw) => new Promise((resolve) => {
      const a = AS[asn], b = AS[a.from];
      if (reduced) { resolve(); return; }
      const m = svgEl('g', { class: `msg${withdraw ? ' wd' : ''}` }, msgLayer);
      svgEl('rect', { x: -7, y: -7, width: 14, height: 14 }, m);
      const t0 = performance.now(), dur = 520;
      const step = (now) => {
        const r = Math.min(1, (now - t0) / dur);
        m.setAttribute('transform', `translate(${b.x + (a.x - b.x) * r} ${b.y + (a.y - b.y) * r})`);
        if (r < 1) requestAnimationFrame(step); else { m.remove(); resolve(); }
      };
      requestAnimationFrame(step);
    });
    let busy = false;
    async function spread(withdraw) {
      if (busy) return;
      busy = true; btnW.disabled = true; btnA.disabled = true;
      state.textContent = withdraw ? 'AS32934 rút quảng bá, các AS lần lượt xoá đường' : 'AS32934 quảng bá: dải 57.144.64.0/23 ở chỗ tôi';
      state.classList.toggle('down', withdraw);
      let depth = 0;
      for (const asn of order) {
        const d = pathOf(asn).split(' ').length;
        if (d !== depth && !reduced) { depth = d; await wait(150); }
        sendMsg(asn, withdraw).then(() => {
          const a = AS[asn];
          edges[asn].classList.toggle('up', !withdraw);
          edges[asn].classList.toggle('gone', withdraw);
          a.tag.classList.add('on');
          a.tag.classList.toggle('lost', withdraw);
          // Giữ nguyên bề rộng ô: chữ "mất đường" ngắn hơn AS path ngắn nhất nên không tràn sang khung AS
          a.tagText.textContent = withdraw ? 'mất đường' : a.text;
        });
        if (!reduced) await wait(d === depth ? 140 : 0);
        if (!reduced && order[order.indexOf(asn) + 1] && pathOf(order[order.indexOf(asn) + 1]).split(' ').length !== d) await wait(600);
      }
      if (!reduced) await wait(700);
      state.textContent = withdraw
        ? 'mọi AS đã xoá đường, gói tới 57.144.64.0/23 không còn đường để đi'
        : 'dải 57.144.64.0/23 đang được quảng bá; ô vàng là AS path mỗi AS gửi tiếp cho AS kế bên';
      busy = false;
      btnW.disabled = withdraw; btnA.disabled = !withdraw;
    }
    btnA.disabled = true;
    btnW.addEventListener('click', () => spread(true));
    btnA.addEventListener('click', () => spread(false));
    onceVisible(bgp, () => spread(false));
  }

  // ---------- Hình 8: resolver đi hỏi từng cấp, rồi trả lời từ cache ----------
  const walk = document.querySelector('.dns-walk');
  if (walk) {
    const stage = walk.querySelector('.dw-stage');
    const node = (n) => stage.querySelector(`[data-n="${n}"]`);
    const msg = stage.querySelector('.dw-msg');
    const log = walk.querySelector('.dw-log');
    const cache = walk.querySelector('.dw-cache');
    const cacheTtl = walk.querySelector('.dw-ttl');
    const ask = walk.querySelector('.dw-ask');
    const ask2 = walk.querySelector('.dw-ask2');
    const pos = (el) => {
      const s = stage.getBoundingClientRect(), r = el.getBoundingClientRect();
      return [r.left - s.left + r.width / 2, r.top - s.top + r.height / 2];
    };
    let ttl = 0, timer = 0;
    const setCache = (v) => {
      ttl = v;
      cache.classList.toggle('full', v > 0);
      cacheTtl.textContent = v > 0 ? `57.144.64.1 · TTL ${v}` : 'trống';
    };
    const startCountdown = () => {
      clearInterval(timer);
      timer = setInterval(() => { setCache(Math.max(0, ttl - 1)); if (ttl === 0) clearInterval(timer); }, 1000);
    };
    // Một bước: tin nhắn bay từ nút này sang nút kia, nút đang nói chuyện sáng lên
    const hop = async (from, to, text, answer = false) => {
      const a = node(from), b = node(to);
      a.classList.add('talk');
      msg.textContent = text; msg.classList.toggle('ans', answer);
      msg.style.transition = 'none';
      const [x1, y1] = pos(a); msg.style.left = `${x1}px`; msg.style.top = `${y1}px`;
      void msg.offsetWidth; msg.style.transition = ''; msg.classList.add('show');
      await wait(60);
      const [x2, y2] = pos(b); msg.style.left = `${x2}px`; msg.style.top = `${y2}px`;
      await wait(650);
      a.classList.remove('talk'); b.classList.add('talk');
      await wait(450);
      b.classList.remove('talk');
    };
    let busy = false;
    const lock = (v) => { busy = v; ask.disabled = v; ask2.disabled = v; };
    async function full() {
      if (busy) return;
      lock(true);
      clearInterval(timer); setCache(0);
      log.innerHTML = 'laptop hỏi resolver: <code>facebook.com</code> ở đâu?';
      await hop('laptop', 'resolver', 'A facebook.com?');
      log.innerHTML = 'cache trống, resolver hỏi gốc';
      await hop('resolver', 'root', 'facebook.com?');
      log.innerHTML = '<code>f.root-servers.net</code>, 4 ms: com thì hỏi <code>gtld-servers.net</code>';
      await hop('root', 'resolver', 'đi hỏi com.', true);
      await hop('resolver', 'tld', 'facebook.com?');
      log.innerHTML = '<code>h.gtld-servers.net</code>, 275 ms: hỏi <code>ns.facebook.com</code>';
      await hop('tld', 'resolver', 'đi hỏi ns.facebook.com', true);
      await hop('resolver', 'fb', 'facebook.com?');
      log.innerHTML = '<code>c.ns.facebook.com</code>, 223 ms: <code>57.144.64.1</code>, TTL 60';
      await hop('fb', 'resolver', '57.144.64.1 TTL 60', true);
      setCache(60); startCountdown();
      log.innerHTML = 'resolver cất câu trả lời vào cache, giữ tối đa 60 giây, rồi trả cho laptop';
      await hop('resolver', 'laptop', '57.144.64.1', true);
      msg.classList.remove('show');
      lock(false);
    }
    async function cached() {
      if (busy) return;
      if (ttl === 0) { full(); return; }
      lock(true);
      await hop('laptop', 'resolver', 'A facebook.com?');
      log.innerHTML = `còn trong cache, resolver trả lời ngay, không hỏi ai; TTL còn ${ttl} giây`;
      await hop('resolver', 'laptop', `57.144.64.1 TTL ${ttl}`, true);
      msg.classList.remove('show');
      lock(false);
    }
    ask.addEventListener('click', full);
    ask2.addEventListener('click', cached);
    if (reduced) { setCache(60); log.innerHTML = 'resolver hỏi gốc, rồi <code>com</code>, rồi <code>ns.facebook.com</code>, được <code>57.144.64.1</code> với TTL 60 và cất vào cache'; }
    else onceVisible(walk, full);
  }

  // ---------- Hình 9: bóc 141 byte thật của gói số 4 ----------
  const dissect = document.querySelector('.dissect');
  if (dissect) {
    // Chép nguyên văn phần hex của tshark -x (cũng in trong khối "output nguyên văn" ngay dưới hình)
    const HEX = [
      '00 15 5d 8a 9e 59 00 15 5d bb 07 66 08 00 45 00',
      '00 7f 6d e2 40 00 40 06 8b 4b ac 15 15 88 68 14',
      '17 9a b9 46 00 50 5f 14 57 f1 c4 02 1d 98 80 18',
      '00 3f 41 bd 00 00 01 01 08 0a e9 ab 47 b4 be 66',
      '38 75 47 45 54 20 2f 20 48 54 54 50 2f 31 2e 31',
      '0d 0a 48 6f 73 74 3a 20 65 78 61 6d 70 6c 65 2e',
      '63 6f 6d 0d 0a 55 73 65 72 2d 41 67 65 6e 74 3a',
      '20 63 75 72 6c 2f 38 2e 31 38 2e 30 0d 0a 41 63',
      '63 65 70 74 3a 20 2a 2f 2a 0d 0a 0d 0a',
    ].join(' ').split(' ');
    // Ranh giới các lớp và các trường, theo output -O eth,ip,tcp,http của tshark
    const LAYERS = { eth: [0, 13, 'c2'], ip: [14, 33, 'c3'], tcp: [34, 65, 'c4'], http: [66, 140, 'c7'] };
    const FIELDS = [
      [0, 5, 'MAC nhận <code>00:15:5d:8a:9e:59</code>, card ảo phía Windows'],
      [6, 11, 'MAC gửi <code>00:15:5d:bb:07:66</code>, card mạng của WSL'],
      [12, 13, 'loại <code>08 00</code>: phần sau là IPv4'],
      [14, 14, '<code>45</code>: số 4 là IPv4, số 5 là độ dài phần đầu tính theo khối 4 byte, 5 khối là 20 byte'],
      [15, 15, 'ô đánh dấu độ ưu tiên của gói, để trống'],
      [16, 17, 'tổng độ dài của gói IP: <code>00 7f</code>, tức 127 byte'],
      [18, 19, 'số định danh của gói'],
      [20, 21, 'cờ <code>40 00</code>: router không được cắt gói này thành gói nhỏ hơn'],
      [22, 22, 'TTL <code>40</code>, tức 64, mỗi router trừ 1'],
      [23, 23, 'giao thức bên trong: <code>06</code>, tức TCP'],
      [24, 25, 'mã kiểm tra lỗi của phần đầu IP'],
      [26, 29, 'IP gửi <code>ac 15 15 88</code>, tức 172.21.21.136'],
      [30, 33, 'IP nhận <code>68 14 17 9a</code>, tức 104.20.23.154 của example.com'],
      [34, 35, 'port gửi <code>b9 46</code>, tức 47430 của curl'],
      [36, 37, 'port nhận <code>00 50</code>, tức 80 của http'],
      [38, 41, 'số thứ tự TCP đánh cho mẩu này (sequence number)'],
      [42, 45, 'số báo đã nhận (acknowledgment number)'],
      [46, 46, '<code>80</code>: phần đầu TCP dài 8 khối 4 byte, tức 32 byte'],
      [47, 47, 'cờ <code>18</code>: ACK báo đã nhận, kèm cờ PSH bảo bên nhận đưa dữ liệu lên chương trình ngay'],
      [48, 49, 'máy gửi gói này báo nó còn nhận thêm được bao nhiêu byte'],
      [50, 51, 'mã kiểm tra lỗi của phần TCP'],
      [52, 53, 'ô dành cho dữ liệu khẩn, gói này không dùng nên để 0'],
      [54, 65, 'tuỳ chọn TCP, ở đây là thời điểm gửi'],
    ];
    const hexBox = dissect.querySelector('.dx-hex');
    const field = dissect.querySelector('.dx-field');
    const items = [...dissect.querySelectorAll('.dx-layers li')];
    const layerOf = (i) => Object.keys(LAYERS).find((k) => i >= LAYERS[k][0] && i <= LAYERS[k][1]);
    const cells = HEX.map((h, i) => {
      const s = document.createElement('span');
      s.textContent = h; s.className = LAYERS[layerOf(i)][2]; s.style.setProperty('--i', i);
      s.dataset.i = i;
      hexBox.appendChild(s);
      return s;
    });
    // Dòng HTTP chứa một byte: cắt lời nhắn tại các cặp \r\n
    const httpText = HEX.slice(66).map((h) => String.fromCharCode(parseInt(h, 16))).join('');
    const httpLine = (i) => {
      const off = i - 66; let start = httpText.lastIndexOf('\r\n', off - 1); start = start < 0 ? 0 : start + 2;
      let end = httpText.indexOf('\r\n', off); end = end < 0 ? httpText.length : end;
      return httpText.slice(start, end) || '(dòng trống: hết phần header)';
    };
    const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    const clear = () => { cells.forEach((c) => c.classList.remove('hot', 'off', 'pick')); items.forEach((li) => li.classList.remove('on')); };
    const showLayer = (key) => {
      clear();
      const [a, b] = LAYERS[key];
      cells.forEach((c, i) => c.classList.add(i >= a && i <= b ? 'hot' : 'off'));
      items.find((li) => li.dataset.layer === key).classList.add('on');
      field.innerHTML = `${items.find((li) => li.dataset.layer === key).querySelector('b').textContent}: byte ${a} tới ${b}, ${b - a + 1} byte`;
    };
    const showByte = (i) => {
      clear();
      const key = layerOf(i);
      items.find((li) => li.dataset.layer === key).classList.add('on');
      if (key === 'http') {
        const ch = String.fromCharCode(parseInt(HEX[i], 16));
        const name = ch === '\r' ? '\\r' : ch === '\n' ? '\\n' : ch === ' ' ? 'dấu cách' : ch;
        cells[i].classList.add('pick');
        field.innerHTML = `byte ${i}: <code>${HEX[i]}</code> là ký tự <code>${esc(name)}</code>, thuộc dòng <code>${esc(httpLine(i))}</code>`;
        return;
      }
      const f = FIELDS.find(([a, b]) => i >= a && i <= b);
      for (let k = f[0]; k <= f[1]; k++) cells[k].classList.add('pick');
      field.innerHTML = `byte ${f[0]}${f[1] > f[0] ? ` tới ${f[1]}` : ''}: ${f[2]}`;
    };
    items.forEach((li) => {
      li.tabIndex = 0;
      li.addEventListener('mouseenter', () => showLayer(li.dataset.layer));
      li.addEventListener('focus', () => showLayer(li.dataset.layer));
      li.addEventListener('click', () => showLayer(li.dataset.layer));
    });
    hexBox.addEventListener('mouseover', (e) => { const c = e.target.closest('span'); if (c) showByte(Number(c.dataset.i)); });
    hexBox.addEventListener('click', (e) => { const c = e.target.closest('span'); if (c) showByte(Number(c.dataset.i)); });
    dissect.addEventListener('mouseleave', () => { clear(); field.textContent = 'rê chuột hoặc chạm vào một lớp, hoặc một byte'; });
    if (!reduced) {
      hexBox.classList.add('pour');
      onceVisible(dissect, async () => {
        hexBox.classList.add('go');
        await wait(141 * 6 + 500);
        hexBox.classList.remove('pour', 'go');
        // Bóc từ lớp ngoài vào lớp trong, như bên nhận làm
        for (const k of ['eth', 'ip', 'tcp', 'http']) { showLayer(k); await wait(900); }
        clear(); field.textContent = 'rê chuột hoặc chạm vào một lớp, hoặc một byte';
      });
    }
  }
})();
