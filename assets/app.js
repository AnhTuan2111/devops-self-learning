/* DevOps Self-Learning — hành vi dùng chung cho mọi trang (hệ "Bauhaus", một kiểu duy nhất).
   0. Bộ sinh hình Bauhaus — hàm thuần, không đụng DOM. scripts/generate.mjs cũng require
      chính file này, nên ô của một bài ở trang chủ và ấn ký ở đầu trang bài luôn khớp nhau.
   1. Ấn ký của bài ở đầu trang (lưới 4×4 ô hình học, sinh cố định từ số bài)
   2. Nút bài trước / bài sau ở góc phải topbar
   3. Chia trang thành TAB từ các <section class="tab"> nằm trong [data-tabs]
   4. Danh sách "Tự kiểm tra" bấm được, nhớ theo trang, có thước đếm
   5. Nút chép lệnh trên mọi <pre> không phải sơ đồ
   Không có JS thì trang vẫn đọc được trọn vẹn: mọi tab hiện nối tiếp nhau.
   Mọi truy cập localStorage đều bọc try/catch — chế độ ẩn danh có thể chặn nó. */

(function (G) {
  // ---- 0. Bộ sinh hình ----
  // Mỗi ô vuông = một nền + một hình cơ bản đã xoay. Vốn hình mở rộng từ tròn–vuông–tam giác
  // sang nửa tròn, phần tư tròn, vòng khuyên, vòm, thoi, sọc, lá — đều dựng từ cung và đoạn thẳng.
  // Màu viết bằng CLASS (f-red, b-ink…), không viết mã màu, để CSS đổi được trạng thái (ô chưa học
  // chỉ còn nét viền) mà không phải sinh lại SVG.
  var Bauhaus = (function () {
    var KINDS = ['circle', 'dot', 'ring', 'half', 'quarter', 'tri', 'bars', 'arch', 'diamond', 'square', 'leaf'];
    var BG = ['paper', 'paper', 'paper', 'ink', 'red', 'blue', 'yellow'];   // giấy chiếm ưu thế — Itten
    var COLS = ['ink', 'red', 'blue', 'yellow', 'paper'];

    function hash(s) {
      var h = 2166136261 >>> 0; s = String(s);
      for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
      return h >>> 0;
    }
    function rng(seed) {                 // mulberry32: cùng hạt giống thì cùng dãy số, ở mọi máy
      var a = seed >>> 0;
      return function () {
        a = (a + 0x6D2B79F5) >>> 0;
        var t = Math.imul(a ^ (a >>> 15), a | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }
    function pick(r, arr) { return arr[Math.floor(r() * arr.length)]; }
    function n(v) { return Math.round(v * 10) / 10; }

    function shape(kind, x, y, s, rot, col) {
      var k = s / 100, cx = n(x + s / 2), cy = n(y + s / 2), X = x + s, Y = y + s;
      var f = ' class="f f-' + col + '"', b;
      switch (kind) {
        case 'circle':  b = '<circle cx="' + cx + '" cy="' + cy + '" r="' + n(50 * k) + '"' + f + '/>'; break;
        case 'dot':     b = '<circle cx="' + cx + '" cy="' + cy + '" r="' + n(24 * k) + '"' + f + '/>'; break;
        case 'ring':    b = '<circle cx="' + cx + '" cy="' + cy + '" r="' + n(33 * k) + '" stroke-width="' + n(16 * k) + '" class="r r-' + col + '"/>'; break;
        case 'half':    b = '<path d="M' + x + ' ' + Y + 'A' + n(50 * k) + ' ' + n(50 * k) + ' 0 0 1 ' + X + ' ' + Y + 'Z"' + f + '/>'; break;
        case 'quarter': b = '<path d="M' + x + ' ' + Y + 'V' + y + 'A' + s + ' ' + s + ' 0 0 1 ' + X + ' ' + Y + 'Z"' + f + '/>'; break;
        case 'tri':     b = '<path d="M' + x + ' ' + y + 'L' + X + ' ' + Y + 'H' + x + 'Z"' + f + '/>'; break;
        case 'bars':    b = [12, 42, 72].map(function (o) { return '<rect x="' + x + '" y="' + n(y + o * k) + '" width="' + s + '" height="' + n(16 * k) + '"' + f + '/>'; }).join(''); break;
        case 'arch':    b = '<path d="M' + n(x + 16 * k) + ' ' + Y + 'V' + n(y + 50 * k) + 'A' + n(34 * k) + ' ' + n(34 * k) + ' 0 0 1 ' + n(x + 84 * k) + ' ' + n(y + 50 * k) + 'V' + Y + 'Z"' + f + '/>'; break;
        case 'diamond': b = '<path d="M' + cx + ' ' + y + 'L' + X + ' ' + cy + 'L' + cx + ' ' + Y + 'L' + x + ' ' + cy + 'Z"' + f + '/>'; break;
        case 'square':  b = '<rect x="' + n(x + 22 * k) + '" y="' + n(y + 22 * k) + '" width="' + n(56 * k) + '" height="' + n(56 * k) + '"' + f + '/>'; break;
        default:        b = '<path d="M' + x + ' ' + y + 'A' + s + ' ' + s + ' 0 0 0 ' + X + ' ' + Y + 'A' + s + ' ' + s + ' 0 0 0 ' + x + ' ' + y + 'Z"' + f + '/>'; // leaf
      }
      return rot ? '<g transform="rotate(' + rot * 90 + ' ' + cx + ' ' + cy + ')">' + b + '</g>' : b;
    }

    function cell(r, x, y, s) {
      var bg = pick(r, BG);
      var fg = pick(r, COLS.filter(function (c) { return c !== bg; }));
      var kind = pick(r, KINDS);
      var rot = Math.floor(r() * 4);
      return '<rect x="' + x + '" y="' + y + '" width="' + s + '" height="' + s + '" class="b b-' + bg + '"/>' + shape(kind, x, y, s, rot, fg);
    }

    // Ấn ký 4×4 của một bài; khối 2×2 ở một góc mang số bài.
    function glyph(num) {
      var r = rng(hash('glyph:' + num)), S = 100, out = '';
      var corner = Math.floor(r() * 4), bx = (corner % 2) * 2, by = Math.floor(corner / 2) * 2;
      for (var j = 0; j < 4; j++) for (var i = 0; i < 4; i++) {
        if (i >= bx && i < bx + 2 && j >= by && j < by + 2) continue;
        out += cell(r, i * S, j * S, S);
      }
      out += '<rect x="' + bx * S + '" y="' + by * S + '" width="200" height="200" class="b b-' + pick(r, ['ink', 'blue', 'red']) + '"/>' +
        '<text x="' + (bx * S + 100) + '" y="' + (by * S + 142) + '" class="gn" text-anchor="middle">' + num + '</text>';
      return '<svg viewBox="0 0 400 400" aria-hidden="true" focusable="false">' + out + '</svg>';
    }

    // Ô của một bài ở trang chủ = ô ĐẦU TIÊN được vẽ trong ấn ký của chính bài đó
    // (cùng hạt giống, cùng thứ tự rút số), nên hai nơi luôn khớp nhau.
    function tile(num) {
      var r = rng(hash('glyph:' + num));
      r();                                 // bỏ qua lượt rút chọn góc cho khối số
      return '<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false">' + cell(r, 0, 0, 100) + '</svg>';
    }

    return { glyph: glyph, tile: tile, hash: hash, rng: rng };
  })();

  if (typeof module === 'object' && module.exports) { module.exports = Bauhaus; return; }
  G.Bauhaus = Bauhaus;

  var root = document.documentElement;

  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function write(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Hệ cũ có chế độ tối và bảng màu; dọn thuộc tính nếu trang nào còn script khởi động cũ
  root.removeAttribute('data-theme');
  root.removeAttribute('data-palette');

  // ---- 1. Ấn ký của bài ----
  function initHeroMark() {
    var hero = document.querySelector('header.hero, header.page');
    if (!hero || hero.querySelector('.hero-mark')) return;
    var m = /^\d+/.exec(document.body.getAttribute('data-lesson') || '');
    if (!m) return;
    var mark = document.createElement('div');
    mark.className = 'hero-mark';
    mark.innerHTML = Bauhaus.glyph(m[0]);
    hero.insertBefore(mark, hero.firstChild);
  }

  // ---- 2. Bài trước / bài sau ở góc phải topbar ----
  // Lấy từ chính <nav class="prevnext"> cuối trang, nên chỉ có một nguồn sự thật cho liên kết.
  function initCornerNav() {
    var pn = document.querySelector('nav.prevnext');
    var inner = document.querySelector('.topbar-inner');
    if (!pn || !inner || inner.querySelector('.corner-nav')) return;
    var links = pn.querySelectorAll('a');
    if (!links.length) return;
    var box = document.createElement('nav');
    box.className = 'corner-nav';
    box.setAttribute('aria-label', 'Trang trước và trang sau');
    Array.prototype.forEach.call(links, function (a) {
      var t = a.querySelector('.t'), d = a.querySelector('.dir');
      var title = (t ? t.textContent : a.textContent).replace(/\s+/g, ' ').trim();
      var dir = d ? d.textContent.replace(/[\u2190\u2192]/g, '').trim() : '';   // phòng trang cũ còn mũi tên ký tự
      var num = (/^(\d+)/.exec(title) || [])[1];
      var name = title.replace(/^\d+\s*·\s*/, '');
      var next = a.classList.contains('next');
      var c = document.createElement('a');
      c.href = a.getAttribute('href');
      c.className = 'cn ' + (next ? 'cn-next' : 'cn-prev');
      c.title = (dir ? dir + ': ' : '') + title;
      c.setAttribute('aria-label', c.title);
      var label = '<span class="cn-n">' + esc(num || name) + '</span>' + (num ? '<span class="cn-t">' + esc(name) + '</span>' : '');
      c.innerHTML = next ? label + '<i class="ic ic-r cn-a" aria-hidden="true"></i>' : '<i class="ic ic-l cn-a" aria-hidden="true"></i>' + label;
      box.appendChild(c);
    });
    inner.appendChild(box);
  }

  // ---- Chiều cao phần dính trên cùng, để tiêu đề không bị che khi nhảy tới #id ----
  function measureSticky() {
    var top = document.querySelector('.topbar');
    var scroller = document.querySelector('.tabbar-scroll');
    // Ở điện thoại topbar không dính (xem style.css), nên không tính vào phần bị che
    var th = top && getComputedStyle(top).position === 'sticky' ? top.offsetHeight : 0;
    // Thanh tab chỉ che nội dung khi nó nằm ngang; ở máy tính nó là cột dọc bên trái
    var bar = scroller && getComputedStyle(scroller).flexDirection === 'row' ? scroller.parentNode.offsetHeight : 0;
    root.style.setProperty('--topbar-h', th + 'px');
    root.style.setProperty('--stick-h', (th + bar) + 'px');
  }

  // ---- 2. Tab ----
  function initTabs(box) {
    var panels = Array.prototype.filter.call(box.children, function (el) {
      return el.matches('section.tab');
    });
    if (panels.length < 2) return;

    var bar = document.createElement('div');
    bar.className = 'tabbar';
    var scroller = document.createElement('div');
    scroller.className = 'tabbar-scroll';
    scroller.setAttribute('role', 'tablist');
    scroller.setAttribute('aria-label', box.getAttribute('data-tabs') || 'Các phần của trang');
    bar.appendChild(scroller);

    var btns = panels.map(function (p, i) {
      if (!p.id) p.id = 'phan-' + (i + 1);
      var label = p.getAttribute('data-tab') || ('Phần ' + (i + 1));

      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'tabbtn';
      b.id = 'tab-' + p.id;
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-controls', p.id);
      b.innerHTML = '<span class="tn shp s-' + (i % 6) + '">' + pad(i + 1) + '</span><span class="tl">' + esc(label) + '</span>';
      scroller.appendChild(b);

      p.setAttribute('role', 'tabpanel');
      p.setAttribute('aria-labelledby', b.id);
      p.setAttribute('tabindex', '-1');

      // Đầu tab: hình mang số + tên + thanh kẻ (+ ghi chú nếu có data-note)
      var head = document.createElement('div');
      head.className = 'panel-head';
      var note = p.getAttribute('data-note');
      head.innerHTML =
        '<span class="ph-n shp s-' + (i % 6) + '">' + pad(i + 1) + '</span>' +
        '<span class="ph-t">' + esc(label) + '</span>' +
        '<span class="ph-rule" aria-hidden="true"></span>' +
        (note ? '<span class="ph-note">' + esc(note) + '</span>' : '');
      p.insertBefore(head, p.firstChild);

      // Chân tab: đi sang tab trước/sau mà không phải cuộn ngược lên
      var foot = document.createElement('div');
      foot.className = 'panel-foot';
      var prev = panels[i - 1], next = panels[i + 1];
      var html = '';
      if (prev) html += '<button type="button" data-go="' + (i - 1) + '"><span class="dir">tab trước</span><span class="t">' + pad(i) + ' · ' + esc(prev.getAttribute('data-tab') || '') + '</span></button>';
      if (next) html += '<button type="button" class="next' + (prev ? '' : ' only-next') + '" data-go="' + (i + 1) + '"><span class="dir">tab tiếp</span><span class="t">' + pad(i + 2) + ' · ' + esc(next.getAttribute('data-tab') || '') + '</span></button>';
      foot.innerHTML = html;
      if (html) p.appendChild(foot);
      return b;
    });

    box.insertBefore(bar, box.firstChild);
    box.classList.add('is-ready');

    var current = -1;
    function show(i, opts) {
      opts = opts || {};
      if (i < 0 || i >= panels.length) i = 0;
      panels.forEach(function (p, j) {
        var on = j === i;
        p.hidden = !on;
        btns[j].setAttribute('aria-selected', on ? 'true' : 'false');
        btns[j].tabIndex = on ? 0 : -1;
      });
      current = i;
      // Thanh tab nằm ngang (điện thoại): đưa nút đang chọn vào tầm nhìn, không cuộn trang
      var b = btns[i];
      if (getComputedStyle(scroller).flexDirection === 'row') {
        var left = b.offsetLeft - scroller.offsetLeft;
        if (left < scroller.scrollLeft || left + b.offsetWidth > scroller.scrollLeft + scroller.clientWidth) {
          scroller.scrollLeft = left - 12;
        }
      }
      if (opts.hash) {
        try { history.replaceState(null, '', '#' + panels[i].id); } catch (e) {}
      }
      if (opts.toTop) {
        var y = box.getBoundingClientRect().top + window.pageYOffset - parseInt(getComputedStyle(root).getPropertyValue('--topbar-h'), 10) - 8;
        if (window.pageYOffset > y) window.scrollTo(0, y);
      }
    }

    scroller.addEventListener('click', function (e) {
      var b = e.target.closest('.tabbtn');
      if (!b) return;
      show(btns.indexOf(b), { hash: true, toTop: true });
    });
    scroller.addEventListener('keydown', function (e) {
      var i = btns.indexOf(document.activeElement);
      if (i < 0) return;
      var j = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') j = (i + 1) % btns.length;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') j = (i - 1 + btns.length) % btns.length;
      else if (e.key === 'Home') j = 0;
      else if (e.key === 'End') j = btns.length - 1;
      if (j === null) return;
      e.preventDefault();
      btns[j].focus();
      show(j, { hash: true });
    });
    box.addEventListener('click', function (e) {
      var go = e.target.closest('.panel-foot [data-go]');
      if (!go) return;
      show(+go.getAttribute('data-go'), { hash: true, toTop: true });
      btns[current].focus({ preventScroll: true });
    });

    // Đường dẫn #id: mở đúng tab chứa phần tử đó, rồi cuộn tới nó
    function fromHash(initial) {
      var id = '';
      try { id = decodeURIComponent(location.hash.slice(1)); } catch (e) { id = location.hash.slice(1); }
      var el = id && document.getElementById(id);
      var panel = el && (el.matches('section.tab') ? el : el.closest('section.tab'));
      var i = panel ? panels.indexOf(panel) : -1;
      if (i < 0) { if (initial) show(0); return; }
      show(i);
      if (el !== panel) {
        requestAnimationFrame(function () { el.scrollIntoView(); });
      } else if (!initial) {
        show(i, { toTop: true });
      }
    }
    fromHash(true);
    window.addEventListener('hashchange', function () { fromHash(false); });
  }

  // ---- 3. Tự kiểm tra ----
  function initChecklists() {
    var page = document.body.getAttribute('data-lesson') || location.pathname;
    document.querySelectorAll('ul.check').forEach(function (ul, u) {
      var items = ul.querySelectorAll(':scope > li');
      if (!items.length) return;

      var meter = document.createElement('div');
      meter.className = 'check-meter';
      meter.setAttribute('aria-live', 'polite');
      ul.parentNode.insertBefore(meter, ul.nextSibling);

      function paintMeter() {
        var done = ul.querySelectorAll(':scope > li.done').length;
        var cells = '';
        for (var k = 0; k < items.length; k++) cells += '<i class="' + (k < done ? 'on' : '') + '"></i>';
        meter.innerHTML = '<span>đã nắm ' + done + '/' + items.length + '</span><span class="cells" aria-hidden="true">' + cells + '</span>';
      }

      items.forEach(function (li, i) {
        // Giữ khoá cũ cho danh sách đầu tiên, để dấu tick đã lưu không mất
        var key = 'devops-check:' + page + ':' + (u ? u + '-' : '') + i;
        if (read(key) === '1') li.classList.add('done');
        li.setAttribute('role', 'checkbox');
        li.setAttribute('tabindex', '0');
        li.setAttribute('aria-checked', li.classList.contains('done') ? 'true' : 'false');
        li.style.cursor = 'pointer';
        function toggle(e) {
          if (e && e.target.closest('a')) return;
          li.classList.toggle('done');
          var on = li.classList.contains('done');
          li.setAttribute('aria-checked', on ? 'true' : 'false');
          write(key, on ? '1' : '0');
          paintMeter();
        }
        li.addEventListener('click', toggle);
        li.addEventListener('keydown', function (e) {
          if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); }
        });
      });
      paintMeter();
    });
  }

  // ---- 4. Nút chép lệnh ----
  function initCopy() {
    document.querySelectorAll('pre:not(.diagram)').forEach(function (pre) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.textContent = 'chép';
      btn.setAttribute('aria-label', 'Chép khối lệnh này');
      btn.addEventListener('click', function () {
        var text = (pre.querySelector('code') || pre).innerText.replace(/\n?chép$/, '');
        function ok() { btn.textContent = 'đã chép'; setTimeout(function () { btn.textContent = 'chép'; }, 1400); }
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(ok, function () {});
        }
      });
      pre.appendChild(btn);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initHeroMark();
    initCornerNav();
    initCopy();
    initChecklists();
    document.querySelectorAll('[data-tabs]').forEach(initTabs);
    measureSticky();
    window.addEventListener('resize', measureSticky);
  });
})(this);
