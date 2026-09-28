/**
 * Vẽ ảnh SVG cho README trên GitHub, cùng hệ "Bauhaus" với bản web.
 *
 * Vì sao phải là ảnh: GitHub không cho CSS trong README, và ảnh SVG hiển thị qua <img>
 * không tải được web font. Nên mọi thứ — màu, hình, và font League Spartan (nhúng base64,
 * giấy phép OFL, xem assets/fonts/OFL-LeagueSpartan.txt) — phải nằm gọn trong từng file SVG.
 *
 * Hình học lấy từ CHÍNH bộ sinh hình của trang web (Bauhaus trong assets/app.js), nên ấn ký
 * của một bài trên README và trên trang web luôn giống hệt nhau.
 *
 * Được gọi từ scripts/generate.mjs; ghi vào assets/readme/.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const C = { paper: '#f3eee4', surface: '#fffdf8', ink: '#151515', ink2: '#3a3731', ink3: '#5f5950', line: '#d6cebf', red: '#d42a1f', yellow: '#f5b800', blue: '#1d4f9f', ghost: '#b9b0a0' };

// Màu của ô hình học — cùng tên class với style.css, để SVG của app.js dùng lại được nguyên văn
const SHAPE_CSS = `
.b-paper,.f-paper{fill:${C.surface}}.b-ink,.f-ink{fill:${C.ink}}.b-red,.f-red{fill:${C.red}}.b-blue,.f-blue{fill:${C.blue}}.b-yellow,.f-yellow{fill:${C.yellow}}
.r{fill:none}.r-paper{stroke:${C.surface}}.r-ink{stroke:${C.ink}}.r-red{stroke:${C.red}}.r-blue{stroke:${C.blue}}.r-yellow{stroke:${C.yellow}}
.todo .b{fill:${C.surface};stroke:${C.line};stroke-width:1}.todo .f{fill:none;stroke:${C.ghost};stroke-width:2.5}.todo .r{stroke:${C.ghost};stroke-width:2.5}`;

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function makeArt(ROOT, Bauhaus) {
  const font = (name) => readFileSync(join(ROOT, 'assets/fonts', name)).toString('base64');
  const range = (name) => readFileSync(join(ROOT, 'assets/fonts', name), 'utf8').trim();

  // Font đầy đủ (latin + tiếng Việt, trục độ đậm 500–900) cho ảnh có chữ
  const FULL_FONT = ['latin', 'vietnamese'].map((s) =>
    `@font-face{font-family:'LS';font-weight:500 900;src:url(data:font/woff2;base64,${font(`league-spartan-${s}.woff2`)}) format('woff2');unicode-range:${range(`league-spartan-${s}.range`)}}`
  ).join('');
  // Chỉ chữ số — cho 43 ảnh ấn ký, mỗi ảnh chỉ cần in số bài
  const DIGIT_FONT = `@font-face{font-family:'LS';font-weight:900;src:url(data:font/woff2;base64,${font('league-spartan-digits-900.woff2')}) format('woff2')}`;

  const TEXT_CSS = `.t{font-family:'LS','Futura','Century Gothic',sans-serif}`;

  const doc = ({ w, h, title, fontCss, css = '', body }) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="t">
<title id="t">${esc(title)}</title>
<style>${fontCss}${TEXT_CSS}${SHAPE_CSS}${css}</style>
${body}
</svg>
`;
  const inner = (svg) => svg.replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');

  // Hình của module — cùng hình học với .shp.s-0 … .s-8 trong style.css
  function moduleShape(i, x, y, s) {
    const cx = x + s / 2, cy = y + s / 2, r = s / 2;
    const num = (fill, dy = 0, dx = 0, anchor = 'middle', size = s * 0.46) =>
      `<text class="t" x="${cx + dx}" y="${cy + size * 0.36 + dy}" font-size="${size}" font-weight="800" fill="${fill}" text-anchor="${anchor}">${i}</text>`;
    switch (i) {
      case 0: return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${C.blue}"/>` + num('#fff');
      case 1: return `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="${C.red}"/>` + num('#fff');
      case 2: return `<path d="M${cx} ${y}L${x + s} ${y + s}H${x}Z" fill="${C.yellow}"/>` + num(C.ink, s * 0.2, 0, 'middle', s * 0.38);
      case 3: return `<path d="M${x} ${y + s}V${y}A${s} ${s} 0 0 1 ${x + s} ${y + s}Z" fill="${C.ink}"/>` + num('#fff', s * 0.18, -s * 0.18, 'middle', s * 0.4);
      case 4: return `<path d="M${x} ${y + s}V${cy}A${r} ${r} 0 0 1 ${x + s} ${cy}V${y + s}Z" fill="${C.blue}"/>` + num('#fff', s * 0.08);
      case 5: return `<circle cx="${cx}" cy="${cy}" r="${r - 3}" fill="none" stroke="${C.red}" stroke-width="5"/>` + num(C.red);
      case 6: return `<path d="M${cx} ${y}L${x + s} ${cy}L${cx} ${y + s}L${x} ${cy}Z" fill="${C.yellow}"/>` + num(C.ink, 0, 0, 'middle', s * 0.4);
      case 7: return `<path d="M${x} ${y + s}A${r} ${s} 0 0 1 ${x + s} ${y + s}Z" fill="${C.ink}"/>` + num('#fff', s * 0.2, 0, 'middle', s * 0.4);
      default: return `<rect x="${x + 2.5}" y="${y + 2.5}" width="${s - 5}" height="${s - 5}" fill="none" stroke="${C.blue}" stroke-width="5"/>` + num(C.blue);
    }
  }

  // ---------- Ảnh đầu README: tiêu đề + ba hình mang ba con số ----------
  function banner({ done, total, hours, modules }) {
    const W = 1000, H = 400;
    // Độ rộng đo bằng League Spartan 800 cỡ 120px trong trình duyệt: "devops" 382 · "từ số 0" 384
    let b = `<rect width="${W}" height="${H}" fill="${C.paper}"/>`;
    b += `<rect x="36" y="42" width="13" height="13" fill="${C.red}"/>`;
    b += `<text class="t" x="60" y="55" font-size="20" font-weight="600" fill="${C.ink2}">nhật ký tự học · học công khai</text>`;
    b += `<text class="t" x="32" y="178" font-size="120" font-weight="800" fill="${C.ink}" letter-spacing="-1.4">devops</text>`;
    b += `<rect x="32" y="200" width="414" height="116" fill="${C.yellow}"/>`;
    b += `<text class="t" x="46" y="298" font-size="120" font-weight="800" fill="${C.ink}" letter-spacing="-1.4">từ số 0</text>`;
    b += `<text class="t" x="36" y="350" font-size="22" font-weight="600" fill="${C.ink}">từ backend java / spring boot</text>`;
    b += `<text class="t" x="36" y="378" font-size="22" font-weight="600" fill="${C.ink}">tới tự vận hành hệ thống của chính mình</text>`;
    // Ba hình: tròn = bài đã xong · vuông = số giờ · tam giác = số module (như .hh-stats trên web)
    const ox = 650, oy = 44;
    b += `<circle cx="${ox + 210}" cy="${oy + 110}" r="110" fill="${C.blue}"/>`;
    b += `<text class="t" x="${ox + 210}" y="${oy + 128}" text-anchor="middle" fill="#fff" font-weight="900"><tspan font-size="74">${String(done).padStart(2, '0')}</tspan><tspan font-size="28">/${total}</tspan></text>`;
    b += `<text class="t" x="${ox + 210}" y="${oy + 160}" text-anchor="middle" fill="#fff" font-size="16" font-weight="600">bài đã xong</text>`;
    b += `<rect x="${ox}" y="${oy + 182}" width="128" height="128" fill="${C.red}"/>`;
    b += `<text class="t" x="${ox + 64}" y="${oy + 252}" text-anchor="middle" fill="#fff" font-size="42" font-weight="900">~${hours}</text>`;
    b += `<text class="t" x="${ox + 64}" y="${oy + 276}" text-anchor="middle" fill="#fff" font-size="15" font-weight="600">giờ học</text>`;
    b += `<path d="M${ox + 238} ${oy + 192}L${ox + 306} ${oy + 310}H${ox + 170}Z" fill="${C.yellow}"/>`;
    b += `<text class="t" x="${ox + 238}" y="${oy + 282}" text-anchor="middle" fill="${C.ink}" font-size="32" font-weight="900">${modules}</text>`;
    b += `<text class="t" x="${ox + 238}" y="${oy + 301}" text-anchor="middle" fill="${C.ink}" font-size="13" font-weight="600">module</text>`;
    b += `<rect x="0" y="${H - 8}" width="${W}" height="8" fill="${C.ink}"/>`;
    return doc({ w: W, h: H, title: `DevOps từ số 0 — đã xong ${done}/${total} bài, khoảng ${hours} giờ, ${modules} module`, fontCss: FULL_FONT, body: b });
  }

  // ---------- Bức tranh lộ trình: mỗi hàng một module, mỗi ô một bài ----------
  function roadmap(rows) {
    const T = 62, X0 = 340, top = 104, W = X0 + 7 * T + 40, H = top + rows.length * T + 34;
    let b = `<rect width="${W}" height="${H}" fill="${C.paper}"/>`;
    b += `<text class="t" x="32" y="56" font-size="40" font-weight="800" fill="${C.ink}">lộ trình chín chặng</text>`;
    b += `<rect x="32" y="74" width="${W - 64}" height="4" fill="${C.ink}"/>`;
    // Chú thích — hình vẽ, không dùng ký tự
    const lg = [['chưa học: chỉ còn nét', 'todo'], ['học xong: ô được tô màu', 'done'], ['đang học: khung đen', 'doing']];
    let lx = 32;                         // chú thích bắt đầu từ lề trái cho đủ chỗ ba mục
    lg.forEach(([label, k]) => {
      if (k === 'todo') b += `<rect x="${lx}" y="${top - 16}" width="12" height="12" fill="none" stroke="${C.ghost}" stroke-width="2"/>`;
      if (k === 'done') b += `<rect x="${lx}" y="${top - 16}" width="12" height="12" fill="${C.red}"/>`;
      if (k === 'doing') b += `<rect x="${lx + 1.5}" y="${top - 14.5}" width="9" height="9" fill="${C.yellow}" stroke="${C.ink}" stroke-width="3"/>`;
      b += `<text class="t" x="${lx + 18}" y="${top - 6}" font-size="14" font-weight="500" fill="${C.ink2}">${label}</text>`;
      lx += label.length * 8 + 44;
    });
    rows.forEach((row, i) => {
      const y = top + 8 + i * T;
      b += moduleShape(i, 32, y + (T - 32) / 2, 32);
      b += `<text class="t" x="78" y="${y + T / 2 + 6}" font-size="19" font-weight="700" fill="${C.ink}">${esc(row.name)}</text>`;
      b += `<text class="t" x="${X0 - 24}" y="${y + T / 2 + 5}" font-size="14" font-weight="500" fill="${C.ink3}" text-anchor="end">${row.done}/${row.lessons.length}</text>`;
      row.lessons.forEach((l, j) => {
        const x = X0 + j * T, s = T / 100;
        b += `<g class="${l.status}" transform="translate(${x} ${y}) scale(${s})">${inner(Bauhaus.tile(l.id))}</g>`;
        if (l.status === 'doing') b += `<rect x="${x + 2}" y="${y + 2}" width="${T - 4}" height="${T - 4}" fill="none" stroke="${C.ink}" stroke-width="4"/>`;
      });
    });
    b += `<rect x="0" y="${H - 6}" width="${W}" height="6" fill="${C.ink}"/>`;
    const doneAll = rows.reduce((n, r) => n + r.done, 0), all = rows.reduce((n, r) => n + r.lessons.length, 0);
    return doc({ w: W, h: H, title: `Bức tranh lộ trình: ${doneAll}/${all} bài đã được tô màu`, fontCss: FULL_FONT, body: b });
  }

  // ---------- Ấn ký của một bài (dùng ở đầu README của bài) ----------
  function glyph(num) {
    return doc({ w: 400, h: 400, title: `Ấn ký của Bài ${num}`, fontCss: DIGIT_FONT,
      css: `.gn{font-family:'LS','Futura','Arial Black',sans-serif;font-weight:900;font-size:124px;fill:#fff;letter-spacing:-2px}`,
      body: inner(Bauhaus.glyph(num)) });
  }

  return {
    write({ stats, rows, lessonIds }) {
      const out = join(ROOT, 'assets/readme');
      mkdirSync(join(out, 'glyph'), { recursive: true });
      writeFileSync(join(out, 'banner.svg'), banner(stats), 'utf8');
      writeFileSync(join(out, 'roadmap.svg'), roadmap(rows), 'utf8');
      for (const id of lessonIds) writeFileSync(join(out, 'glyph', `${id}.svg`), glyph(id), 'utf8');
      return 2 + lessonIds.length;
    },
  };
}
