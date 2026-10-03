/**
 * Vẽ ảnh SVG cho README trên GitHub, cùng hệ "Bauhaus" với bản web: một thẻ dẫn sang bản web
 * (card.svg) và ấn ký của từng bài.
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

import { readFileSync, writeFileSync, mkdirSync, readdirSync, unlinkSync, existsSync } from 'node:fs';
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

  // ---------- Thẻ đầu README: một tấm thẻ dẫn sang bản web ----------
  // Cố ý KHÁC trang chủ của bản web (trang chủ đã có tiêu đề lớn, ba hình số liệu và bức tranh lộ
  // trình): thẻ này chỉ nói ba điều — đang học bài nào, đi được bao xa, và bấm vào đâu để đọc tiếp.
  function card({ done, total, modules, hoursRange, current, strip }) {
    const W = 1000, H = 300, BAND = 236, X = 240;
    let b = `<rect width="${W}" height="${H}" fill="${C.paper}"/>`;
    // Ấn ký của bài đang học: cùng hình với đầu trang bài đó trên bản web
    if (current) b += `<g transform="translate(28 28) scale(0.48)">${inner(Bauhaus.glyph(current.id))}</g>`;
    b += `<rect x="${X}" y="34" width="12" height="12" fill="${C.red}"/>`;
    b += `<text class="t" x="${X + 20}" y="45" font-size="17" font-weight="600" fill="${C.ink2}">lộ trình tự học · mở cho mọi người</text>`;
    b += `<text class="t" x="${X - 4}" y="106" font-size="60" font-weight="800" fill="${C.ink}" letter-spacing="-0.8">devops từ số 0</text>`;
    const now = current
      ? (current.status === 'doing' ? 'đang học' : 'bài tiếp theo') + ` · bài ${current.id} · ${current.title}`
      : `đã học xong cả ${total} bài`;
    b += `<text class="t" x="${X}" y="142" font-size="19" font-weight="600" fill="${C.ink}">${esc(now)}</text>`;
    // Một dải ô vuông: mỗi bài một ô, cách thêm một khoảng giữa hai module
    const SQ = 12, GAP = 3, MGAP = 8;
    let x = X;
    strip.forEach((mod, mi) => {
      if (mi > 0) x += MGAP;
      mod.forEach((st) => {
        if (st === 'done') b += `<rect x="${x}" y="160" width="${SQ}" height="${SQ}" fill="${C.red}"/>`;
        else if (st === 'doing') b += `<rect x="${x + 1.5}" y="161.5" width="${SQ - 3}" height="${SQ - 3}" fill="${C.yellow}" stroke="${C.ink}" stroke-width="3"/>`;
        else b += `<rect x="${x + 0.75}" y="160.75" width="${SQ - 1.5}" height="${SQ - 1.5}" fill="${C.surface}" stroke="${C.ghost}" stroke-width="1.5"/>`;
        x += SQ + GAP;
      });
    });
    b += `<text class="t" x="${X}" y="204" font-size="16" font-weight="500" fill="${C.ink3}">${done}/${total} bài đã xong · ${modules} module · khoảng ${hoursRange} giờ học</text>`;
    // Dải đen: lời mời bấm vào, kèm mũi tên vẽ bằng nét (không dùng ký tự)
    b += `<rect x="0" y="${BAND}" width="${W}" height="${H - BAND}" fill="${C.ink}"/>`;
    b += `<text class="t" x="32" y="${BAND + 41}" font-size="26" font-weight="800" fill="#fff">mở bản web đầy đủ</text>`;
    const ax = 282, ay = BAND + 32;
    b += `<path d="M${ax} ${ay}H${ax + 40}M${ax + 28} ${ay - 11}L${ax + 41} ${ay}L${ax + 28} ${ay + 11}" fill="none" stroke="${C.yellow}" stroke-width="5" stroke-linecap="square"/>`;
    b += `<text class="t" x="${W - 32}" y="${BAND + 39}" font-size="18" font-weight="600" fill="${C.yellow}" text-anchor="end">anhtuan2111.github.io/devops-self-learning</text>`;
    const title = current
      ? `DevOps từ số 0: ${current.status === 'doing' ? 'đang học' : 'bài tiếp theo là'} Bài ${current.id}, đã xong ${done}/${total} bài. Bấm để mở bản web.`
      : `DevOps từ số 0: đã xong cả ${total} bài. Bấm để mở bản web.`;
    return doc({ w: W, h: H, title, fontCss: FULL_FONT, css: `.gn{font-family:'LS','Futura','Arial Black',sans-serif;font-weight:900;font-size:124px;fill:#fff;letter-spacing:-2px}`, body: b });
  }

  // ---------- Ấn ký của một bài (dùng ở đầu README của bài) ----------
  function glyph(num) {
    return doc({ w: 400, h: 400, title: `Ấn ký của Bài ${num}`, fontCss: DIGIT_FONT,
      css: `.gn{font-family:'LS','Futura','Arial Black',sans-serif;font-weight:900;font-size:124px;fill:#fff;letter-spacing:-2px}`,
      body: inner(Bauhaus.glyph(num)) });
  }

  return {
    write({ cardData, lessonIds }) {
      const out = join(ROOT, 'assets/readme');
      mkdirSync(join(out, 'glyph'), { recursive: true });
      writeFileSync(join(out, 'card.svg'), card(cardData), 'utf8');
      // Hai ảnh cũ (tiêu đề và bức tranh lộ trình) lặp lại trang chủ của bản web nên đã bỏ
      for (const old of ['banner.svg', 'roadmap.svg']) if (existsSync(join(out, old))) unlinkSync(join(out, old));
      for (const id of lessonIds) writeFileSync(join(out, 'glyph', `${id}.svg`), glyph(id), 'utf8');
      // Dọn ấn ký của những bài không còn trong lộ trình, để thư mục ảnh luôn khớp curriculum.json
      for (const f of readdirSync(join(out, 'glyph'))) {
        if (f.endsWith('.svg') && !lessonIds.includes(f.slice(0, -4))) unlinkSync(join(out, 'glyph', f));
      }
      return 1 + lessonIds.length;
    },
  };
}
