/**
 * Đánh dấu tài liệu thật trước khi chụp màn hình — bước 2 của quy trình ảnh minh hoạ.
 * Nạp vào trang bằng Playwright: await page.addScriptTag({ path: 'scripts/anh/danh-dau.js' }),
 * rồi: const r = await page.evaluate(() => window.__annotate({ marks, clipFrom, clipTo }));
 *      await page.screenshot({ path, clip: r.clip, fullPage: true });
 *   marks: [{ find, label?, color?: red|blue|yellow, occurrence?, leftOf?, spanTo?, spanOcc? }]
 *   clipFrom / clipTo: chuỗi mở đầu / kết thúc vùng cần chụp. Mặc định (spanClip) vùng chụp bao trọn
 *   MỌI dòng ở giữa — dòng giữa thường dài hơn dòng đầu/cuối, chỉ lấy hai dòng biên sẽ cắt mất mép phải.
 *   label: KHÔNG dùng cho ảnh trong bài — ảnh hiện ở 2/3 cột nên chữ vẽ trong ảnh không đọc được;
 *   nói khung nào là gì bằng ô màu .key trong chú thích (xem CLAUDE.md, mục Ảnh minh hoạ).
 *   Chụp với deviceScaleFactor: 2 để chữ trong ảnh còn nét.
 * Khung màu đỏ/lam/vàng, đúng màu của hệ Bauhaus.
 * Trang có CSP chặn font: mở context với { bypassCSP: true }. Trang chặn bot (403): KHÔNG vượt,
 * tìm bản khác của cùng tài liệu (vd. man7.org thay cho freedesktop.org).
 */
window.__annotate = async function ({ marks, clipFrom, clipTo, pad = 14, root = document, spanClip = true }) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=League+Spartan:wght@700&display=swap';
  document.head.appendChild(link);
  await new Promise((r) => setTimeout(r, 900));
  const COLORS = { red: '#d42a1f', blue: '#1d4f9f', yellow: '#f5b800', ink: '#151515' };
  function lineRect(str, occurrence = 0) {
    const walker = document.createTreeWalker(root.body || root, NodeFilter.SHOW_TEXT);
    let n, seen = 0;
    while ((n = walker.nextNode())) {
      let i = n.data.indexOf(str);
      while (i >= 0) {
        if (seen++ === occurrence) {
          const s = n.data.lastIndexOf('\n', i) + 1;
          let e = n.data.indexOf('\n', i); if (e < 0) e = n.data.length;
          const r = document.createRange(); r.setStart(n, s); r.setEnd(n, e);
          const rects = [...r.getClientRects()].filter((x) => x.width > 2);
          const L = Math.min(...rects.map((x) => x.left)), T = Math.min(...rects.map((x) => x.top));
          const R = Math.max(...rects.map((x) => x.right)), B = Math.max(...rects.map((x) => x.bottom));
          return { left: L + scrollX, top: T + scrollY, right: R + scrollX, bottom: B + scrollY };
        }
        i = n.data.indexOf(str, i + 1);
      }
    }
    return null;
  }
  const out = { missing: [] };
  for (const m of marks) {
    const r = lineRect(m.find, m.occurrence || 0);
    if (!r) { out.missing.push(m.find); continue; }
    if (m.spanTo) { const S = lineRect(m.spanTo, m.spanOcc || 0); if (S) { r.bottom = Math.max(r.bottom, S.bottom); r.right = Math.max(r.right, S.right); } }
    if (m.leftOf) { const L = lineRect(m.leftOf, m.occurrence || 0); if (L) r.left = Math.min(r.left, L.left); }
    const c = COLORS[m.color || 'red'];
    const box = document.createElement('div');
    Object.assign(box.style, { position: 'absolute', left: r.left - 4 + 'px', top: r.top - 2 + 'px', width: r.right - r.left + 8 + 'px',
      height: r.bottom - r.top + 4 + 'px', border: `3px solid ${c}`, background: m.color === 'yellow' ? 'rgba(245,184,0,.18)' : 'rgba(245,184,0,.22)', zIndex: 9999, boxSizing: 'border-box' });
    document.body.appendChild(box);
    if (m.label) {
      const tag = document.createElement('div');
      tag.textContent = m.label;
      Object.assign(tag.style, { position: 'absolute', left: r.right + 10 + 'px', top: r.top - 3 + 'px', background: c, color: m.color === 'yellow' ? '#151515' : '#fff',
        font: "700 14px/1.35 'League Spartan', 'Segoe UI', sans-serif", padding: '3px 9px 1px', zIndex: 10000, whiteSpace: 'nowrap', textTransform: 'lowercase' });
      if (m.labelLeft) { tag.style.left = ''; tag.style.right = (document.documentElement.clientWidth - r.left + 10) + 'px'; }
      document.body.appendChild(tag);
      const tr = tag.getBoundingClientRect(); out.maxRight = Math.max(out.maxRight || 0, tr.right + scrollX);
    }
  }
  const a = lineRect(clipFrom), b = lineRect(clipTo);
  if (a && b && spanClip) {
    // bao trọn mọi dòng nằm giữa clipFrom và clipTo (dòng giữa có thể dài hơn hai dòng biên)
    let L = Math.min(a.left, b.left), R = Math.max(a.right, b.right);
    for (const el of document.querySelectorAll('pre, table, div[style*="absolute"]')) {
      for (const r of el.getClientRects()) {
        const top = r.top + scrollY, bottom = r.bottom + scrollY;
        if (bottom <= a.top || top >= b.bottom || r.width < 2) continue;
        if (el.tagName === 'PRE') {
          const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n;
          while ((n = w.nextNode())) { const rg = document.createRange(); rg.selectNodeContents(n);
            for (const x of rg.getClientRects()) { const t = x.top + scrollY; if (t >= a.top - 1 && t < b.bottom && x.width > 2) { L = Math.min(L, x.left + scrollX); R = Math.max(R, x.right + scrollX); } } }
        } else if (top >= a.top - 60 && bottom <= b.bottom + 60) {   // chỉ khối nằm gọn trong vùng (bỏ bảng dàn trang bao cả trang)
          L = Math.min(L, r.left + scrollX); R = Math.max(R, r.right + scrollX);
        }
      }
    }
    out.clip = { x: Math.max(0, L - pad), y: a.top - pad, width: R - L + pad * 2, height: b.bottom - a.top + pad * 2 };
  } else if (a && b) out.clip = { x: Math.max(0, Math.min(a.left, b.left) - pad), y: a.top - pad, width: Math.max(a.right, b.right, out.maxRight || 0) - Math.min(a.left, b.left) + pad * 2, height: b.bottom - a.top + pad * 2 };
  return out;
};
