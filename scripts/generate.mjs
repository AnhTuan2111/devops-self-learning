#!/usr/bin/env node
/**
 * Sinh trang chủ và README từ curriculum.json + progress.json.
 *
 *   node scripts/generate.mjs
 *
 * Tạo ra:
 *   index.html:   trang chủ "DevOps lang băm": lưới 10 module, dải ô bài, mục lục dính, thẻ bài
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

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));
const asset = (p) => readFileSync(join(ROOT, 'assets', p));

// Số phiên bản tài sản = hash nội dung. Gắn vào đường dẫn (?v=…) để khi CSS/JS đổi, trình duyệt buộc
// phải tải bản mới; GitHub Pages cho trình duyệt giữ bản cũ tới 10 phút.
const hashOf = (...files) => { const h = createHash('sha1'); files.forEach((f) => h.update(asset(f))); return h.digest('hex').slice(0, 8); };
const ASSET_V = hashOf('style.css', 'app.js');
const HOME_V = hashOf('home.css', 'home.js');

const curriculum = readJson('curriculum.json');
const progress = existsSync(join(ROOT, 'progress.json')) ? readJson('progress.json') : { lessons: {} };
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

const statusOf = (id) => progress.lessons?.[id]?.status ?? 'todo';
const dirOf = (l) => `lessons/${l.id}-${l.slug}`;
const hasPage = (l) => existsSync(join(ROOT, dirOf(l), 'index.html'));
const doneCount = allLessons.filter((l) => statusOf(l.id) === 'done').length;
const SITE = 'https://anhtuan2111.github.io/devops-self-learning/';
const STATUS_TEXT = { done: 'đã xong', doing: 'đang học', todo: '' };

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Mỗi module một màu nhấn và một hình, theo vòng hình của repo.
const COLORS = ['blue', 'red', 'yellow', 'ink', 'blue', 'red', 'yellow', 'ink', 'blue', 'red'];
const colorOf = (i) => COLORS[i % COLORS.length];
const shapeOf = (i) => `s${i % 10}`;
const rangeOf = (m) => `${m.lessons[0].id}-${m.lessons.at(-1).id}`;
const anchor = (m) => m.id.toLowerCase();

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
  const st = STATUS_TEXT[statusOf(l.id)];
  const tag = esc(meta.lab[l.lab]) + (st ? ` · ${st}` : '');
  const title = hasPage(l) ? `<a href="${dirOf(l)}/">${esc(l.title)}</a>` : esc(l.title);
  const needs = l.needs.length
    ? `<div class="needs"><span class="needs-label">Cần biết</span>${l.needs.map((k) => `<button class="chip" type="button" aria-expanded="false">${esc(k)}</button>`).join('')}</div>`
    : '';
  return `<article class="card" id="lesson-${l.id}">
  <div class="card-tags"><span class="card-num">${l.id}</span><span class="lab-tag lab-${l.lab}">${tag}</span></div>
  <h4>${title}</h4>
  <p>${esc(l.desc)}</p>
  ${needs}
</article>`;
};

const moduleSections = modules.map((m, i) => `<section class="mod c-${colorOf(i)}" id="${anchor(m)}">
<header class="mod-head">
  <span class="shp big ${shapeOf(i)}" aria-hidden="true"></span>
  <div>
    <p class="mod-num">${m.id} · bài ${rangeOf(m)}</p>
    <h3>${esc(m.title)}</h3>
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
<link rel="icon" href="assets/favicon.svg">
</head>
<body>
<div class="progress-bar" aria-hidden="true"></div>

<header class="hero">
  <div class="hero-text">
    <h1>devops <span class="hl">lang băm</span></h1>
  </div>
  <nav class="hero-shapes" aria-label="Mười module">
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

<script src="assets/home.js?v=${HOME_V}"></script>
</body>
</html>
`;
writeFileSync(join(ROOT, 'index.html'), indexHtml, 'utf8');

/* ------------------------------------------------------------------ */
/* README.md                                                           */
/* ------------------------------------------------------------------ */

const currentLesson = allLessons.find((l) => statusOf(l.id) === 'doing') ?? allLessons.find((l) => statusOf(l.id) === 'todo');
const artCount = makeArt(ROOT, Bauhaus).write({
  cardData: {
    done: doneCount,
    total: allLessons.length,
    modules: modules.length,
    current: currentLesson && { id: currentLesson.id, status: statusOf(currentLesson.id), title: currentLesson.title.toLocaleLowerCase('vi') },
    strip: modules.map((m) => m.lessons.map((l) => statusOf(l.id))),
  },
  lessonIds: allLessons.map((l) => l.id),
});

const readmeModules = modules.map((m) => {
  const rows = m.lessons.map((l) => {
    const st = statusOf(l.id);
    const name = hasPage(l) ? `[${l.title}](${SITE}${dirOf(l)}/)` : l.title;
    return `| \`${l.id}\` | ${name} | ${l.needs.join(', ') || 'không'} | ${meta.lab[l.lab]} | ${STATUS_TEXT[st] || 'chưa học'} |`;
  }).join('\n');
  return `### ${m.id} · ${m.title}

${m.intro}

| # | Bài | Cần biết | Thực hành | Trạng thái |
|---|---|---|---|---|
${rows}`;
}).join('\n\n');

const readme = `<a href="${SITE}"><img src="assets/readme/card.svg" width="100%" alt="${meta.title}: đã xong ${doneCount}/${allLessons.length} bài. Bấm để mở bản web."></a>

# ${meta.title}

${meta.goal}

${allLessons.length} bài, ${modules.length} module. Mỗi bài đọc riêng được; bài nào cần biết trước khái niệm gì thì ghi ở cột "Cần biết".
Cột "Thực hành" cho biết lab chạy ở đâu: máy bạn, server, cloud, GitLab, cụm Kubernetes, hoặc chỉ đọc.

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
        return existsSync(fp) ? createHash('sha1').update(readFileSync(fp)).digest('hex').slice(0, 8) : null;
      };
      const t = s
        .replace(/(assets\/(?:style\.css|app\.js))(?:\?v=[0-9a-f]+)?"/g, `$1?v=${ASSET_V}"`)
        .replace(/"(lesson\.(?:css|js))(?:\?v=[0-9a-f]+)?"/g, (m, f) => (lessonV(f) ? `"${f}?v=${lessonV(f)}"` : m));
      if (t !== s) { writeFileSync(p, t, 'utf8'); versioned++; }
    }
  }
}

console.log(`OK  index.html + README.md + .nojekyll + ${artCount} ảnh README (assets/readme/) đã cập nhật`);
console.log(`OK  ${allLessons.length} bài · ${doneCount} xong · ${allLessons.filter(hasPage).length} bài đã có trang viết tay` +
  ` · trang chủ v=${HOME_V} · trang bài v=${ASSET_V}${versioned ? ` (cập nhật ${versioned} trang)` : ''}`);
