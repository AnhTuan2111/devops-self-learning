#!/usr/bin/env node
/**
 * Sinh mục lục từ curriculum.json + progress.json.
 *
 *   node scripts/generate.mjs
 *
 * Tạo ra:
 *   index.html            — trang chủ (mục lục + tiến độ)
 *   README.md             — mục lục dạng markdown cho GitHub
 *   lessons/NN-slug/      — thư mục từng bài, kèm README.md khung (KHÔNG ghi đè nếu đã có)
 *
 * Nguyên tắc: file này chỉ ĐỌC curriculum.json và progress.json.
 * Muốn sửa nội dung lộ trình thì sửa curriculum.json rồi chạy lại script.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));

const curriculum = read('curriculum.json');
const progress = existsSync(join(ROOT, 'progress.json')) ? read('progress.json') : { lessons: {} };

const meta = curriculum.meta;
const allLessons = curriculum.modules.flatMap((m) =>
  m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title }))
);

const statusOf = (id) => progress.lessons?.[id]?.status ?? 'todo';
const dateOf = (id) => progress.lessons?.[id]?.date ?? null;
const dirOf = (l) => `lessons/${l.id}-${l.slug}`;

const STATUS_LABEL = { done: 'Xong', doing: 'Đang học', todo: 'Chưa học' };
const STATUS_MARK = { done: '✅', doing: '🔸', todo: '⬜' };

const doneCount = allLessons.filter((l) => statusOf(l.id) === 'done').length;
const pct = Math.round((doneCount / allLessons.length) * 100);
const totalHours = Math.round(allLessons.reduce((s, l) => s + l.est, 0) / 60);

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ------------------------------------------------------------------ */
/* index.html                                                          */
/* ------------------------------------------------------------------ */

const modulesHtml = curriculum.modules
  .map((m) => {
    const rows = m.lessons
      .map((l) => {
        const st = statusOf(l.id);
        const d = dateOf(l.id);
        const sub = d ? `${esc(l.goal)} <em>· học ngày ${d}</em>` : esc(l.goal);
        return `        <a class="lesson" href="${dirOf(l)}/">
          <span class="num">${l.id}</span>
          <span>
            <span class="title">${esc(l.title)}</span>
            <span class="sub">${sub}</span>
          </span>
          <span class="status ${st}">${STATUS_LABEL[st]}</span>
        </a>`;
      })
      .join('\n');

    return `    <section class="module">
      <div class="module-head">
        <span class="module-id">${m.id}</span>
        <h2 id="${m.id}">${esc(m.title)}</h2>
      </div>
      <p class="module-why">${esc(m.why)}</p>
      <div class="lesson-list">
${rows}
      </div>
    </section>`;
  })
  .join('\n\n');

const indexHtml = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.subtitle)}">
<link rel="stylesheet" href="assets/style.css">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧱</text></svg>">
</head>
<body>

<nav class="topbar">
  <div class="topbar-inner">
    <a class="home" href="./">🧱 ${esc(meta.title)}</a>
    <span class="spacer"></span>
    <a class="nav" href="#M0">Lộ trình</a>
    <a class="nav" href="#cach-hoc">Cách học</a>
    <button class="theme-btn" type="button">Tối</button>
  </div>
</nav>

<div class="wrap-wide">

  <header class="page">
    <p class="eyebrow">Nhật ký học tập</p>
    <h1>${esc(meta.subtitle)}</h1>
    <p class="lede">Đây là tài liệu tôi tự viết lại trong quá trình học, không phải tài liệu chép từ nơi khác.
    Mỗi bài là một thư mục: lý thuyết, bài lab đã làm, lỗi đã gặp, và cách đã sửa.</p>
    <div class="meta">
      <span class="pill acc">${allLessons.length} bài</span>
      <span class="pill">9 module</span>
      <span class="pill">~${totalHours} giờ</span>
      <span class="pill">${esc(meta.stack)}</span>
    </div>
  </header>

  <div class="progress-box">
    <div class="progress-top">
      <strong>Tiến độ</strong>
      <span>${doneCount}/${allLessons.length} bài · ${pct}%</span>
    </div>
    <div class="bar"><i style="width:${pct}%"></i></div>
  </div>

  <section id="cach-hoc">
    <h2>Cách dùng tài liệu này</h2>
    <div class="table-scroll">
    <table>
      <thead><tr><th>Trong mỗi thư mục bài học</th><th>Là gì</th></tr></thead>
      <tbody>
        <tr><td><code>README.md</code></td><td>Lý thuyết và hướng dẫn lab — đọc trước khi làm</td></tr>
        <tr><td><code>index.html</code></td><td>Bản ghi lại buổi học sau khi làm xong — thứ để xem lại về sau</td></tr>
        <tr><td><code>lab/</code></td><td>File thật đã viết trong bài: script, Dockerfile, config…</td></tr>
        <tr><td><code>notes.md</code></td><td>Ghi chú thô của tôi: lỗi đã gặp, câu hỏi còn treo</td></tr>
      </tbody>
    </table>
    </div>

    <div class="callout">
      <span class="label">Nguyên tắc xuyên suốt</span>
      <p><strong>${esc(meta.principle)}</strong> Mỗi bài bắt đầu bằng một vấn đề có thật, rồi mới tới khái niệm,
      rồi mới tới công cụ. Học ngược lại thì chỉ nhớ được lệnh chứ không sửa được sự cố.</p>
    </div>
  </section>

${modulesHtml}

  <footer class="page">
    <p>Bắt đầu ${meta.started} · Môi trường: ${esc(meta.env)}</p>
    <p>Trang này được sinh tự động từ <code>curriculum.json</code> bằng <code>scripts/generate.mjs</code>.</p>
  </footer>

</div>

<script src="assets/app.js"></script>
</body>
</html>
`;

writeFileSync(join(ROOT, 'index.html'), indexHtml, 'utf8');

/* ------------------------------------------------------------------ */
/* README.md                                                           */
/* ------------------------------------------------------------------ */

const barChars = '█'.repeat(Math.round(pct / 5)) + '░'.repeat(20 - Math.round(pct / 5));

const readmeModules = curriculum.modules
  .map((m) => {
    const rows = m.lessons
      .map((l) => {
        const st = statusOf(l.id);
        const d = dateOf(l.id);
        return `| ${STATUS_MARK[st]} | \`${l.id}\` | [${l.title}](${dirOf(l)}/) | ${l.goal} | ${l.est}' | ${d ?? '—'} |`;
      })
      .join('\n');
    return `### ${m.id} · ${m.title}

> ${m.why}

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
${rows}`;
  })
  .join('\n\n');

const readme = `# 🧱 ${meta.title}

> ${meta.subtitle}

Đây là nhật ký học tập của tôi, không phải một khóa học. Mỗi bài là một thư mục chứa
lý thuyết, bài lab đã thực sự chạy, lỗi đã gặp và cách đã sửa.

**Stack thực hành:** ${meta.stack}
**Môi trường:** ${meta.env}
**Bắt đầu:** ${meta.started}

\`\`\`
Tiến độ  ${barChars}  ${doneCount}/${allLessons.length} bài (${pct}%)
\`\`\`

---

## Nguyên tắc

**${meta.principle}**

Mỗi bài đi theo đúng thứ tự này:

\`\`\`
Problem  →  Concept  →  Tool
   │           │           │
   │           │           └── Docker, Nginx, GitHub Actions...
   │           └── Tại sao cần nó, nó giải quyết gì
   └── Một tình huống có thật khiến ta cần thứ đó
\`\`\`

Học ngược lại (Tool trước) là lý do nhiều người nhớ 200 câu lệnh
nhưng vẫn không biết vì sao website không vào được.

---

## Cấu trúc thư mục

\`\`\`
devops-self-learning/
├── README.md              ← bạn đang đọc, mục lục chính
├── index.html             ← bản web của mục lục này
├── curriculum.json        ← nguồn sự thật: toàn bộ lộ trình
├── progress.json          ← trạng thái từng bài
├── assets/                ← style dùng chung cho mọi trang HTML
├── scripts/generate.mjs   ← sinh README.md + index.html từ 2 file JSON trên
└── lessons/
    └── NN-ten-bai/
        ├── README.md      ← lý thuyết + hướng dẫn lab
        ├── index.html     ← bản ghi lại buổi học (tài liệu để xem lại)
        ├── notes.md       ← ghi chú thô, lỗi đã gặp
        └── lab/           ← file thật đã viết trong bài
\`\`\`

Sau khi sửa \`curriculum.json\` hoặc \`progress.json\`:

\`\`\`bash
node scripts/generate.mjs
\`\`\`

---

## Mục lục

${readmeModules}

---

## Tài nguyên tham khảo

### Tài liệu chính thức (nguồn chuẩn, đọc khi cần làm đúng)

| Chủ đề | Link |
|---|---|
| Docker — Get started | https://docs.docker.com/get-started/ |
| Docker — Dockerfile reference | https://docs.docker.com/reference/dockerfile/ |
| Docker Compose | https://docs.docker.com/compose/ |
| Nginx — Beginner's Guide | https://nginx.org/en/docs/beginners_guide.html |
| GitHub Actions | https://docs.github.com/en/actions |
| Let's Encrypt / Certbot | https://certbot.eff.org/ |
| Ubuntu Server docs | https://documentation.ubuntu.com/server/ |
| Prometheus | https://prometheus.io/docs/introduction/overview/ |
| Kubernetes | https://kubernetes.io/docs/home/ |
| The Twelve-Factor App | https://12factor.net/ |

### Học nền tảng (miễn phí, chất lượng cao)

| Chủ đề | Link |
|---|---|
| Linux từ đầu, rất dễ vào | https://linuxjourney.com/ |
| Giải thích một câu lệnh shell bất kỳ | https://explainshell.com/ |
| Lab Linux/Docker/K8s chạy trên trình duyệt | https://killercoda.com/ |
| Sandbox Docker miễn phí | https://labs.play-with-docker.com/ |
| Roadmap DevOps (bản đồ nghề) | https://roadmap.sh/devops |
| Full Stack Open — phần CI/CD (rất sát thực tế) | https://fullstackopen.com/en/part11 |
| Bảng tra cú pháp nhanh | https://devhints.io/ |

### Tiếng Việt có video

| Nguồn | Ghi chú |
|---|---|
| F8 — fullstack.edu.vn | Tìm khóa **"DevOps for Engineers"**. Miễn phí, tiếng Việt, đi qua Docker → Linux → Compose → VPS → deploy. Dùng làm nguồn video chính. |
| YouTube | Từ khóa hữu ích: \`"Docker tiếng Việt"\`, \`"Nginx reverse proxy tiếng Việt"\`, \`"CI/CD GitHub Actions tiếng Việt"\`, \`"deploy Spring Boot lên VPS"\` |

> **Cách dùng đúng:** video tiếng Việt để *hiểu nhanh ý tưởng*, tài liệu chính thức để *làm cho đúng*.
> Đừng chỉ xem video — bài nào cũng phải tự gõ lại trên máy mình thì mới vào đầu.

---

## Quy ước ghi tiến độ

Mỗi bài học xong thì cập nhật \`progress.json\`:

\`\`\`json
{
  "lessons": {
    "00": { "status": "done", "date": "2026-09-21", "note": "hiểu rồi nhưng còn mơ hồ về NAT" }
  }
}
\`\`\`

\`status\` nhận một trong: \`todo\` · \`doing\` · \`done\`.
Rồi chạy \`node scripts/generate.mjs\` để cập nhật README và trang web.
`;

writeFileSync(join(ROOT, 'README.md'), readme, 'utf8');

/* ------------------------------------------------------------------ */
/* Thư mục từng bài (không ghi đè file đã có)                          */
/* ------------------------------------------------------------------ */

/**
 * Mỗi thư mục bài PHẢI có index.html, nếu không GitHub Pages sẽ tự render
 * README.md bằng Jekyll — ra một trang HTML trần, không có CSS của ta.
 *
 * File sinh tự động mang dấu SENTINEL ở dòng 2. Chạy lại script thì file có
 * dấu đó sẽ được ghi đè (để cập nhật theo curriculum.json), còn file viết tay
 * (như bài 00) thì KHÔNG bao giờ bị đụng tới.
 */
const SENTINEL = '<!-- devops-selflearning:generated-stub -->';

function stubHtml(l, prev, next) {
  const st = statusOf(l.id);
  const link = (x, dir, cls) =>
    x
      ? `  <a${cls} href="../${x.id}-${x.slug}/">
    <span class="dir">${dir}</span>
    <span class="t">${x.id} · ${esc(x.title.split(':')[0])}</span>
  </a>`
      : `  <a${cls} href="../../">
    <span class="dir">${dir}</span>
    <span class="t">Mục lục</span>
  </a>`;

  return `<!doctype html>
${SENTINEL}
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Bài ${l.id} — ${esc(l.title)}</title>
<meta name="description" content="${esc(l.goal)}">
<link rel="stylesheet" href="../../assets/style.css">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>📘</text></svg>">
</head>
<body data-lesson="${l.id}">

<nav class="topbar">
  <div class="topbar-inner">
    <a class="home" href="../../">🧱 DevOps Self-Learning</a>
    <span class="spacer"></span>
    <a class="nav" href="../../#${l.moduleId}">${l.moduleId}</a>
    <button class="theme-btn" type="button">Tối</button>
  </div>
</nav>

<div class="wrap">

<header class="page">
  <p class="eyebrow">Module ${l.moduleId} · Bài ${l.id}</p>
  <h1>${esc(l.title)}</h1>
  <p class="lede">${esc(l.goal)}</p>
  <div class="meta">
    <span class="pill ${st === 'done' ? 'ok' : st === 'doing' ? 'warn' : ''}">${STATUS_LABEL[st]}</span>
    <span class="pill">~${l.est} phút</span>
    <span class="pill">${esc(l.moduleTitle)}</span>
  </div>
</header>

<div class="callout${st === 'done' ? ' ok' : ''}">
  <span class="label">${st === 'done' ? 'Đã học' : 'Chưa học'}</span>
  <p>${
    st === 'done'
      ? 'Bài này đã học xong nhưng chưa viết lại thành tài liệu đầy đủ.'
      : 'Trang này mới chỉ là khung bài. Nội dung đầy đủ — giải thích, sơ đồ, bảng tra và phần mổ băng lab — sẽ được viết vào đúng buổi học bài này.'
  }</p>
</div>

<h2 id="muc-tieu">Mục tiêu</h2>
<p>${esc(l.goal)}</p>

<h2 id="khai-niem">Khái niệm sẽ gặp</h2>
<ul>
${l.concepts.map((c) => `  <li>${esc(c)}</li>`).join('\n')}
</ul>

<h2 id="lab">Bài lab</h2>
<p>${esc(l.lab)}</p>

<h2 id="tu-kiem-tra">Tự kiểm tra</h2>
<p>Học xong phải tự làm được, không nhìn tài liệu. Bấm vào từng dòng để đánh dấu.</p>
<ul class="check">
${l.checklist.map((c) => `  <li>${esc(c)}</li>`).join('\n')}
</ul>

<div class="prevnext">
${link(prev, '← Bài trước', '')}
${link(next, 'Bài tiếp →', ' class="next"')}
</div>

<footer class="page">
  <p>Bài ${l.id} · Module ${l.moduleId} — ${esc(l.moduleTitle)} · DevOps Self-Learning</p>
</footer>

</div>

<script src="../../assets/app.js"></script>
</body>
</html>
`;
}

// .nojekyll: chặn GitHub Pages chạy Jekyll. Không có file này, Jekyll sẽ render
// README.md thành HTML trần và trỏ CSS vào assets/css/style.css của theme —
// đè lên thư mục assets/ của chính ta.
writeFileSync(join(ROOT, '.nojekyll'), '');

let created = 0;
let stubs = 0;
for (const [i, l] of allLessons.entries()) {
  const dir = join(ROOT, dirOf(l));
  mkdirSync(join(dir, 'lab'), { recursive: true });

  const gitkeep = join(dir, 'lab', '.gitkeep');
  if (!existsSync(gitkeep)) writeFileSync(gitkeep, '');

  const htmlPath = join(dir, 'index.html');
  const handWritten =
    existsSync(htmlPath) && !readFileSync(htmlPath, 'utf8').includes(SENTINEL);
  if (!handWritten) {
    writeFileSync(htmlPath, stubHtml(l, allLessons[i - 1], allLessons[i + 1]), 'utf8');
    stubs++;
  }

  const readmePath = join(dir, 'README.md');
  if (!existsSync(readmePath)) {
    const body = `# Bài ${l.id} — ${l.title}

> **Module ${l.moduleId}** · ${l.moduleTitle}
> Ước lượng: ~${l.est} phút · Trạng thái: \`${statusOf(l.id)}\`

## Mục tiêu

${l.goal}

## Khái niệm sẽ gặp

${l.concepts.map((c) => `- ${c}`).join('\n')}

## Bài lab

${l.lab}

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

${l.checklist.map((c) => `- [ ] ${c}`).join('\n')}

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với \`index.html\` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
`;
    writeFileSync(readmePath, body, 'utf8');
    created++;
  }

  const notesPath = join(dir, 'notes.md');
  if (!existsSync(notesPath)) {
    writeFileSync(
      notesPath,
      `# Ghi chú — Bài ${l.id}\n\n## Lỗi đã gặp\n\n_(chưa có)_\n\n## Câu hỏi còn treo\n\n_(chưa có)_\n\n## Lệnh muốn nhớ\n\n_(chưa có)_\n`,
      'utf8'
    );
  }
}

console.log(`✔ index.html + README.md + .nojekyll đã cập nhật`);
console.log(
  `✔ ${allLessons.length} bài · ${doneCount} xong (${pct}%) · ` +
    `${created} README mới · ${stubs} trang HTML sinh tự động ` +
    `(${allLessons.length - stubs} viết tay, không đụng tới)`
);
