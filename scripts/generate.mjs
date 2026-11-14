#!/usr/bin/env node
/**
 * Sinh trang chủ và README từ curriculum.json.
 *
 *   node scripts/generate.mjs
 *
 * Tạo ra:
 *   index.html:   trang chủ "DevOps lang băm": lưới module, dải ô bài, mục lục dính, thẻ bài
 *                 (giao diện ở assets/home.css, hành vi ở assets/home.js)
 *   README.md:    mục lục dạng markdown cho GitHub
 *   assets/readme/: ảnh SVG cho README (xem scripts/readme-art.mjs)
 *
 * Trang từng bài (lessons/NN-slug/) do tay viết khi học tới bài đó; script KHÔNG sinh trang khung.
 * Bài nào chưa có trang thì trang chủ và README chỉ ghi tên, không đặt link.
 *
 * Mỗi bài trong curriculum.json có: id, slug, title, desc (khái niệm làm được gì, vướng ở đâu),
 * lab (thực hành ở đâu, khoá trong meta.lab), needs (danh sách khái niệm cần biết, không phải số bài).
 */

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { makeArt } from './readme-art.mjs';

// Bộ sinh hình Bauhaus sống trong assets/app.js (trang bài dùng nó để vẽ ấn ký đầu trang).
const Bauhaus = createRequire(import.meta.url)('../assets/app.js');
// Bảng thuật ngữ dùng chung (assets/terms.js): trang chủ tự gắn tooltip cho lần nhắc đầu tiên trong mô tả mỗi bài.
const GLOSSARY = createRequire(import.meta.url)('../assets/terms.js');

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));
// Đổi CRLF về LF trước khi băm: Git trên Windows lấy tệp ra với CRLF, trên Linux (CI, GitHub Pages) là LF; không đổi thì
// hai máy ra hai mã ?v= khác nhau cho cùng một nội dung.
const lf = (buf) => buf.toString('utf8').replace(/\r\n/g, '\n');
const asset = (p) => lf(readFileSync(join(ROOT, 'assets', p)));

// Số phiên bản tài sản = hash nội dung. Gắn vào đường dẫn (?v=…) để khi CSS/JS đổi, trình duyệt buộc
// phải tải bản mới; GitHub Pages cho trình duyệt giữ bản cũ tới 10 phút.
const hashOf = (...files) => { const h = createHash('sha1'); files.forEach((f) => h.update(asset(f))); return h.digest('hex').slice(0, 8); };
const ASSET_V = hashOf('style.css', 'app.js', 'terms.css', 'terms.js');
const HOME_V = hashOf('home.css', 'home.js', 'terms.css', 'terms.js');

const curriculum = readJson('curriculum.json');
const meta = curriculum.meta;
const modules = curriculum.modules;
const allLessons = modules.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleId: m.id })));

// Kiểm dữ liệu: id không trùng, có đủ trường, slug và khoá nơi thực hành viết tiếng Anh không dấu,
// nơi thực hành nằm trong bảng meta.lab.
const seen = new Set();
for (const l of allLessons) {
  if (seen.has(l.id)) throw new Error(`Bài ${l.id}: id bị trùng`);
  seen.add(l.id);
  for (const k of ['slug', 'title', 'desc', 'lab']) if (!l[k]) throw new Error(`Bài ${l.id}: thiếu ${k}`);
  if (!/^[a-z0-9-]+$/.test(l.slug)) throw new Error(`Bài ${l.id}: slug "${l.slug}" chỉ được có a-z, 0-9 và gạch nối`);
  if (!meta.lab[l.lab]) throw new Error(`Bài ${l.id}: lab "${l.lab}" không có trong meta.lab`);
  if (!Array.isArray(l.needs)) throw new Error(`Bài ${l.id}: needs phải là danh sách khái niệm`);
}

const dirOf = (l) => `lessons/${l.id}-${l.slug}`;
const hasPage = (l) => existsSync(join(ROOT, dirOf(l), 'index.html'));
const SITE = 'https://anhtuan2111.github.io/devops-self-learning/';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Mỗi module một màu nhấn và một hình, theo vòng hình của repo.
const COLORS = ['blue', 'red', 'yellow', 'ink', 'blue', 'red', 'yellow', 'ink', 'blue', 'red'];
const colorOf = (i) => COLORS[i % COLORS.length];
const shapeOf = (i) => `s${i % 10}`;
const rangeOf = (m) => `${m.lessons[0].id}-${m.lessons.at(-1).id}`;
const anchor = (m) => m.id.toLowerCase();

// Gắn tooltip cho lần nhắc đầu tiên của mỗi thuật ngữ trong một đoạn mô tả. Thuật ngữ dài xét trước (TCP/IP trước IP),
// và không bao giờ gắn vào chữ đã nằm trong một nút thuật ngữ khác.
const TERMS = Object.entries(GLOSSARY).sort((a, b) => b[1].label.length - a[1].label.length);
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
function withTerms(text, title = '') {
  let html = esc(text);
  for (const [key, { label }] of TERMS) {
    // Thuật ngữ là chính chủ đề của bài (nằm trong tên bài) thì không cần tooltip
    if (new RegExp(`(^|[^\\p{L}])${escRe(label)}($|[^\\p{L}])`, 'iu').test(title)) continue;
    const re = new RegExp(`(^|[^\\p{L}\\p{N}/>-])(${escRe(label)})(?=$|[^\\p{L}\\p{N}</-])`, 'u');
    let done = false;
    html = html.split(/(<button[^>]*>.*?<\/button>)/).map((part) => {
      if (done || part.startsWith('<button') || !re.test(part)) return part;
      done = true;
      return part.replace(re, `$1<button type="button" class="term" data-term="${key}">$2</button>`);
    }).join('');
  }
  return html;
}

/* ------------------------------------------------------------------ */
/* index.html                                                          */
/* ------------------------------------------------------------------ */

const shapeTiles = modules.map((m, i) =>
  `<a class="shape-tile" href="#${anchor(m)}" aria-label="${m.id} ${esc(m.title)}"><span class="shp ${shapeOf(i)}"></span><b>${m.id}</b></a>`).join('');

const stripTiles = modules.flatMap((m, i) => m.lessons.map((l) =>
  `<a class="tile c-${colorOf(i)}" href="#lesson-${l.id}" data-title="${l.id} · ${esc(l.title)}"><span>${l.id}</span></a>`)).join('');

const tocItems = modules.map((m, i) =>
  `<li><a class="c-${colorOf(i)}" href="#${anchor(m)}"><span class="shp ${shapeOf(i)}"></span><span class="toc-name">${esc(m.title)}</span><span class="toc-range">${rangeOf(m)}</span></a></li>`).join('');

const lessonCard = (l) => {
  const tag = esc(meta.lab[l.lab]);
  const title = hasPage(l) ? `<a href="${dirOf(l)}/" target="_blank" rel="noopener noreferrer">${esc(l.title)}</a>` : esc(l.title);
  const needs = l.needs.length
    ? `<div class="needs"><span class="needs-label">Cần biết</span>${l.needs.map((k) => `<button class="chip" type="button" aria-expanded="false">${esc(k)}</button>`).join('')}</div>`
    : '';
  return `<article class="card" id="lesson-${l.id}">
  <div class="card-tags"><span class="card-num">${l.id}</span><span class="lab-tag lab-${l.lab}">${tag}</span></div>
  <button class="card-more" type="button" aria-expanded="false" aria-label="Mô tả bài ${l.id}"></button>
  <h3>${title}</h3>
  <p>${withTerms(l.desc, l.title)}</p>
  ${needs}
</article>`;
};

const moduleSections = modules.map((m, i) => `<section class="mod c-${colorOf(i)}" id="${anchor(m)}">
<header class="mod-head">
  <span class="shp big ${shapeOf(i)}" aria-hidden="true"></span>
  <div>
    <p class="mod-num">${m.id} · bài ${rangeOf(m)}</p>
    <h2>${esc(m.title)}</h2>
    <p class="mod-intro">${esc(m.intro)}</p>
  </div>
</header>
<div class="cards">
${m.lessons.map(lessonCard).join('\n')}
</div>
</section>`).join('\n');

const indexHtml = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#f3eee4">
<title>${esc(meta.title)}: lộ trình</title>
<meta name="description" content="${esc(meta.subtitle)}, ${allLessons.length} bài, ${modules.length} module, từ bảy tầng OSI tới Kubernetes, GitOps và vận hành.">
<link rel="stylesheet" href="assets/home.css?v=${HOME_V}">
<link rel="stylesheet" href="assets/terms.css?v=${HOME_V}">
<link rel="icon" href="assets/favicon.svg">
</head>
<body>
<div class="progress-bar" aria-hidden="true"></div>

<header class="hero">
  <div class="hero-text">
    <h1>devops <span class="hl">lang băm</span></h1>
  </div>
  <nav class="hero-shapes" aria-label="Các module">
    <div class="shape-scroll">${shapeTiles}</div>
    <button class="search-btn" type="button" aria-expanded="false" aria-controls="search-drop"><span class="ic-search" aria-hidden="true"></span>tìm</button>
    <div class="search-drop" id="search-drop" role="search">
      <input id="search-input" type="search" placeholder="Ví dụ: Pod, DNS, Terraform" aria-label="Tìm bài" autocomplete="off">
      <output for="search-input" aria-live="polite"></output>
    </div>
  </nav>
</header>

<nav class="strip" aria-label="Cả khoá, mỗi ô một bài">
  ${stripTiles}
</nav>

<div class="main-grid">
  <aside class="toc">
    <p class="toc-title">module</p>
    <ol>${tocItems}</ol>
  </aside>
  <main>
    <div class="filter" role="search">
      <label for="filter-input">tìm bài</label>
      <input id="filter-input" type="search" placeholder="Ví dụ: Pod, DNS, Terraform" autocomplete="off">
      <output for="filter-input" aria-live="polite"></output>
    </div>
${moduleSections}
  </main>
</div>

<footer class="site-footer">${esc(meta.title)} · ${esc(meta.subtitle.toLocaleLowerCase('vi'))}</footer>

<script src="assets/terms.js?v=${HOME_V}"></script>
<script src="assets/home.js?v=${HOME_V}"></script>
</body>
</html>
`;
writeFileSync(join(ROOT, 'index.html'), indexHtml, 'utf8');

/* ------------------------------------------------------------------ */
/* README.md                                                           */
/* ------------------------------------------------------------------ */

const artCount = makeArt(ROOT, Bauhaus).write({
  cardData: {
    total: allLessons.length,
    modules: modules.length,
    moduleSizes: modules.map((m) => m.lessons.length),
  },
  lessonIds: allLessons.map((l) => l.id),
});

// Mục lục là một bảng duy nhất, mỗi module mở bằng một dòng tên in đậm, để GitHub dàn mọi cột cùng một bề rộng.
const readmeRows = modules.map((m) => {
  const rows = m.lessons.map((l) => {
    const name = hasPage(l) ? `[${l.title}](${SITE}${dirOf(l)}/)` : l.title;
    return `| \`${l.id}\` | ${name} | ${l.needs.join(', ') || 'không'} | ${meta.lab[l.lab]} |`;
  }).join('\n');
  return `| | **${m.id} · ${m.title}** | | |\n${rows}`;
}).join('\n');
const readmeModules = `| Số | Bài | Cần biết | Lab |\n|---|---|---|---|\n${readmeRows}`;

const readme = `<a href="${SITE}"><img src="assets/readme/card.svg" width="100%" alt="${meta.title}: khoá tự học DevOps, ${allLessons.length} bài. Bấm để mở bản web."></a>

# ${meta.title}

Khoá tự học DevOps bằng tiếng Việt, viết cho người đã làm được app Java, Spring Boot nhưng chưa làm việc với server, mạng,
container hay Kubernetes. Khoá đi từ đường đi của một request trên Internet tới lúc đưa app lên cụm Kubernetes và theo dõi app
khi nó đã chạy. Mình viết khoá này trong lúc tự học, học tới đâu viết tới đó, nên phần lớn bài trong mục lục dưới đây mới có
tên, chưa có nội dung. Bài đã viết thì tên bài có link sang bản web.

Bản web của khoá nằm ở ${SITE}.

## Mục lục

${readmeModules}
`;
writeFileSync(join(ROOT, 'README.md'), readme, 'utf8');

/* ------------------------------------------------------------------ */
/* Việc phụ                                                            */
/* ------------------------------------------------------------------ */

// .nojekyll: chặn GitHub Pages chạy Jekyll, không thì Jekyll render README.md đè lên trang chủ.
writeFileSync(join(ROOT, '.nojekyll'), '');

// Trang bài viết tay: chỉ cập nhật đúng tham số ?v= trong hai đường dẫn tài sản, không đụng nội dung.
let versioned = 0;
if (existsSync(join(ROOT, 'lessons'))) {
  for (const d of readdirSync(join(ROOT, 'lessons'))) {
    for (const f of readdirSync(join(ROOT, 'lessons', d)).filter((x) => x.endsWith('.html'))) {
      const p = join(ROOT, 'lessons', d, f);
      const s = readFileSync(p, 'utf8');
      // lesson.css và lesson.js riêng của từng bài cũng gắn ?v= theo nội dung của chính tệp đó
      const lessonV = (f) => {
        const fp = join(ROOT, 'lessons', d, f);
        return existsSync(fp) ? createHash('sha1').update(lf(readFileSync(fp))).digest('hex').slice(0, 8) : null;
      };
      const t = s
        .replace(/(assets\/(?:style\.css|app\.js|terms\.css|terms\.js))(?:\?v=[0-9a-f]+)?"/g, `$1?v=${ASSET_V}"`)
        .replace(/"(lesson\.(?:css|js))(?:\?v=[0-9a-f]+)?"/g, (m, f) => (lessonV(f) ? `"${f}?v=${lessonV(f)}"` : m));
      if (t !== s) { writeFileSync(p, t, 'utf8'); versioned++; }
    }
  }
}

console.log(`OK  index.html + README.md + .nojekyll + ${artCount} ảnh README (assets/readme/) đã cập nhật`);
console.log(`OK  ${allLessons.length} bài · ${allLessons.filter(hasPage).length} bài đã có trang viết tay` +
  ` · trang chủ v=${HOME_V} · trang bài v=${ASSET_V}${versioned ? ` (cập nhật ${versioned} trang)` : ''}`);
