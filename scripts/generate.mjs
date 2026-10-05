#!/usr/bin/env node
/**
 * Sinh mục lục từ curriculum.json + progress.json.
 *
 *   node scripts/generate.mjs
 *
 * Tạo ra:
 *   index.html            — trang chủ: hero, băng chữ chạy, thẻ lộ trình, 3 tab
 *   README.md             — mục lục dạng markdown cho GitHub
 *
 * Trang từng bài (lessons/NN-slug/) do tay viết khi học tới bài đó; script KHÔNG sinh trang khung.
 * Bài nào chưa có thư mục thì trang chủ và README chỉ ghi tên, không đặt link.
 *
 * Nguyên tắc: file này chỉ ĐỌC curriculum.json và progress.json.
 * Muốn sửa nội dung lộ trình thì sửa curriculum.json rồi chạy lại script.
 *   assets/readme/        — ảnh SVG cho README (xem scripts/readme-art.mjs)
 *
 * Giao diện theo hệ "Bauhaus" trong assets/style.css — đọc bảng luật ở đầu file đó.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { makeArt } from './readme-art.mjs';

// Bộ sinh hình Bauhaus sống trong assets/app.js (trình duyệt dùng nó để vẽ ấn ký đầu trang bài).
// Nạp chung một file để ô ở trang chủ và ấn ký ở trang bài không bao giờ lệch nhau.
const Bauhaus = createRequire(import.meta.url)('../assets/app.js');

// Số phiên bản tài sản = hash nội dung style.css + app.js. Gắn vào đường dẫn (?v=…) để khi CSS/JS
// đổi, trình duyệt buộc phải tải bản mới. Không có nó, GitHub Pages cho trình duyệt giữ bản cũ tới
// 10 phút (Cache-Control: max-age=600) và HTML mới bị vẽ bằng CSS cũ — người học đã gặp 30/09/2026.
const ASSET_V = createHash('sha1')
  .update(readFileSync(new URL('../assets/style.css', import.meta.url)))
  .update(readFileSync(new URL('../assets/app.js', import.meta.url)))
  .digest('hex').slice(0, 8);

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));

const curriculum = read('curriculum.json');
const progress = existsSync(join(ROOT, 'progress.json')) ? read('progress.json') : { lessons: {} };

const meta = curriculum.meta;
const allLessons = curriculum.modules.flatMap((m) =>
  m.lessons.map((l) => ({ ...l, moduleId: m.id, moduleTitle: m.title }))
);

// Học tuần tự: "needs" của mỗi bài chỉ được trỏ về bài ĐỨNG TRƯỚC nó. Sai là dừng luôn, không sinh trang.
const lessonById = Object.fromEntries(allLessons.map((l) => [l.id, l]));
for (const l of allLessons) {
  for (const n of l.needs ?? []) {
    if (!lessonById[n]) throw new Error(`Bài ${l.id}: needs trỏ tới Bài ${n} không tồn tại`);
    if (!(n < l.id)) throw new Error(`Bài ${l.id}: needs trỏ tới Bài ${n}, không phải một bài đứng trước`);
  }
}

// Bức tranh lộ trình trên web tính cỡ ô cho module dài nhất 11 bài (assets/style.css, .poster)
const POSTER_MAX = 11;
const longest = Math.max(...curriculum.modules.map((m) => m.lessons.length));
if (longest > POSTER_MAX) console.warn(`CẢNH BÁO  có module ${longest} bài > ${POSTER_MAX}: sửa số ${POSTER_MAX} trong .poster ở assets/style.css`);

// Chuỗi câu hỏi: mỗi bài trả lời một câu hỏi (question) và dẫn tới một đáp án cụ thể (answer);
// câu hỏi của bài sau phải sinh ra từ đáp án của bài trước. Thiếu là dừng.
for (const l of allLessons) {
  if (!l.question || !l.answer) throw new Error(`Bài ${l.id}: thiếu question hoặc answer trong curriculum.json`);
}

const statusOf = (id) => progress.lessons?.[id]?.status ?? 'todo';
const dateOf = (id) => progress.lessons?.[id]?.date ?? null;
const dirOf = (l) => `lessons/${l.id}-${l.slug}`;
const hasPage = (l) => existsSync(join(ROOT, dirOf(l), 'index.html'));

// Trạng thái mang hình, không chỉ mang màu: tròn đặc = xong · tam giác = đang học · vòng rỗng = chưa học.
// Hình VẼ bằng CSS (.stt-*), không dùng ký tự bàn phím làm icon.
const STT = (k) => `<i class="stt stt-${k}" aria-hidden="true"></i>`;
const STATUS_LABEL = { done: `${STT('done')}Xong`, doing: `${STT('doing')}Đang học`, todo: `${STT('todo')}Chưa học` };
const STATUS_CHIP = { done: 'lime', doing: 'yellow', todo: '' };

const doneCount = allLessons.filter((l) => statusOf(l.id) === 'done').length;
const current = allLessons.find((l) => statusOf(l.id) === 'doing') ?? allLessons.find((l) => statusOf(l.id) === 'todo');
const pct = Math.round((doneCount / allLessons.length) * 100);
// Thời lượng: giờ học THẬT cho trọn một bài (đọc trước, đối thoại, lab có bước tự gây lỗi, ghi
// chép), ghi thành khoảng [ít, nhiều] trong curriculum.json — không phải thời gian giảng.
const hrs = (l) => `${l.hours[0]}–${l.hours[1]} giờ`;
const hoursLo = allLessons.reduce((s, l) => s + l.hours[0], 0);
const hoursHi = allLessons.reduce((s, l) => s + l.hours[1], 0);
const totalHours = Math.round((hoursLo + hoursHi) / 20) * 10;   // số giữa, làm tròn chục — cho ô số liệu
const SITE = 'https://anhtuan2111.github.io/devops-self-learning/';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad2 = (n) => String(n).padStart(2, '0');
const shortTitle = (m) => m.title.split(' — ')[0];
// Ấn ký của bài ở đầu README của bài (ảnh do readme-art.mjs vẽ)
const glyphImg = (id) => `<img src="../../assets/readme/glyph/${id}.svg" width="132" align="right" alt="Ấn ký của Bài ${id}">`;
const viDate = (iso) => (iso ? iso.split('-').reverse().join('/') : '');
const VI_NUM = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười'];
const viNum = (n) => VI_NUM[n] ?? String(n);

const head = ({ title, desc, base }) => `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="stylesheet" href="${base}assets/style.css?v=${ASSET_V}">
<link rel="icon" href="${base}assets/favicon.svg">
</head>`;

/* ------------------------------------------------------------------ */
/* index.html                                                          */
/* ------------------------------------------------------------------ */

const STACK = [
  'Linux', 'Bash', 'Docker', 'Docker Compose', 'PostgreSQL', 'Spring Boot', 'SSH', 'Nginx',
  "Let's Encrypt", 'GitLab CI', 'Kubernetes', 'Helm', 'cert-manager', 'Rancher', 'Prometheus', 'Grafana',
];

const moduleStats = curriculum.modules.map((m) => {
  const done = m.lessons.filter((l) => statusOf(l.id) === 'done').length;
  const doing = m.lessons.some((l) => statusOf(l.id) === 'doing');
  return { m, done, doing, total: m.lessons.length };
});
// Bức tranh lộ trình: mỗi hàng một module (mang hình riêng của module), mỗi ô một bài.
// Ô = mảnh đầu tiên trong ấn ký của bài (Bauhaus.tile), CSS lo phần "chưa học thì chỉ còn viền".
const STATUS_TEXT = { done: 'đã xong', doing: 'đang học', todo: 'chưa học' };
const posterHtml = moduleStats
  .map((s, mi) => {
    const tiles = s.m.lessons
      .map((l) => {
        const st = statusOf(l.id);
        const label = `Bài ${l.id} · ${l.title} — ${STATUS_TEXT[st]}`;
        return hasPage(l)
          ? `<a class="ptile ${st}" href="${dirOf(l)}/" title="${esc(label)}" aria-label="${esc(label)}">${Bauhaus.tile(l.id)}</a>`
          : `<span class="ptile ${st}" title="${esc(label)}" aria-label="${esc(label)}">${Bauhaus.tile(l.id)}</span>`;
      })
      .join('');
    return `        <li class="prow">
          <a class="phead" href="#${s.m.id}"><span class="shp s-${mi}">${mi}</span><span class="nm">${esc(shortTitle(s.m))}</span><span class="ct">${s.done}/${s.total}</span></a>
          <span class="ptiles">${tiles}</span>
        </li>`;
  })
  .join('\n');

const modulesHtml = moduleStats
  .map(({ m, done, total }, mi) => {
    const rows = m.lessons
      .map((l) => {
        const st = statusOf(l.id);
        const d = dateOf(l.id);
        const sub = `${esc(l.question)} · ${hrs(l)}${d ? ` · học ${viDate(d)}` : ''}`;
        const tag = hasPage(l) ? 'a' : 'div';
        const href = hasPage(l) ? ` href="${dirOf(l)}/"` : '';
        return `        <${tag} class="lesson ${st}"${href}>
          <span class="num">${l.id}</span>
          <span class="txt">
            <span class="title">${esc(l.title)}</span>
            <span class="sub">${sub}</span>
          </span>
          <span class="status chip ${STATUS_CHIP[st]}">${STATUS_LABEL[st]}</span>
        </${tag}>`;
      })
      .join('\n');

    return `    <section class="module" id="${m.id}">
      <div class="module-head">
        <span class="module-id shp s-${mi}">${m.id}</span>
        <h2>${esc(m.title)}</h2>
        <span class="chip">${done}/${total} xong</span>
      </div>
      <p class="module-why">${esc(m.why)}</p>
      <div class="lesson-list">
${rows}
      </div>
    </section>`;
  })
  .join('\n\n');

const indexHtml = `${head({ title: meta.title, desc: meta.subtitle, base: '' })}
<body data-lesson="home">

<nav class="topbar">
  <div class="topbar-inner">
    <a class="home" href="./">devops-self-learning</a>
    <span class="spacer"></span>
    <a class="nav" href="#lo-trinh">Lộ trình</a>
    ${current ? `<a class="nav" href="${dirOf(current)}/">Đang học · ${current.id}</a>` : ''}
  </div>
</nav>

<div class="wrap-wide">

  <header class="home-hero">
    <div>
      <p class="eyebrow">Lộ trình tự học · mở cho mọi người</p>
      <h1>DevOps<br><span class="hl">từ số 0</span></h1>
      <p class="route"><span>chưa biết gì về hạ tầng</span><i class="ic ic-r arrow" aria-hidden="true"></i><span>tự deploy lên Kubernetes</span></p>
      <p class="lede">${esc(meta.what)} Học theo thứ tự; bài nào cũng có lý thuyết, một bài lab chạy
      thật và những lỗi hay gặp.</p>
      <div class="meta">
        <span class="chip ink">${esc(meta.stack)}</span>
      </div>
    </div>
    <div class="hh-stats" role="img" aria-label="Đã xong ${doneCount} trên ${allLessons.length} bài; khoảng ${hoursLo} tới ${hoursHi} giờ học; ${curriculum.modules.length} module">
      <div class="st st-c"><b>${pad2(doneCount)}<small>/${allLessons.length}</small></b><small>bài đã xong</small></div>
      <div class="st st-s"><b>~${totalHours}</b><small>giờ học</small></div>
      <div class="st st-t"><b>${curriculum.modules.length}</b><small>module</small></div>
    </div>
  </header>

  <p class="toolstrip"><span class="lbl">công cụ sẽ gặp</span>${STACK.map((s) => `<span class="t">${esc(s)}</span>`).join('')}</p>

  <section class="roadmap" aria-labelledby="roadmap-title">
    <div class="roadmap-head">
      <h2 id="roadmap-title">Lộ trình ${viNum(curriculum.modules.length)} module</h2>
      <span class="chip">lý thuyết · lab · lỗi thật</span>
      <span class="chip ink since">từ ${viDate(meta.started)}</span>
    </div>
    <div class="roadmap-body">
      <div class="roadmap-count">
        <div class="n">${pad2(doneCount)}<small>/${allLessons.length}</small></div>
        <div class="lbl">bài đã xong</div>
        ${current ? `<a class="chip yellow" href="${dirOf(current)}/">${STT('doing')}Đang học: Bài ${current.id} <i class="ic ic-r" aria-hidden="true"></i></a>` : ''}
      </div>
      <div>
        <p class="poster-legend"><span><i class="lg-todo"></i>chưa học: chỉ còn nét</span><span><i class="lg-done"></i>học xong: ô được tô màu</span><span><i class="lg-doing"></i>đang học: khung đen</span></p>
        <ol class="poster">
${posterHtml}
        </ol>
      </div>
    </div>
    <div class="roadmap-foot">
      <span>${curriculum.modules.length} module · ${allLessons.length} bài</span>
      <span>${esc(meta.env)}</span>
    </div>
  </section>

  <main class="tabs" data-tabs="Các phần của trang chủ">

  <section class="tab" id="lo-trinh" data-tab="Lộ trình" data-note="${curriculum.modules.length} module · ${allLessons.length} bài">
    <div class="callout ok">
      <span class="label">Đích đến</span>
      <p>${esc(meta.goal)}</p>
    </div>
${modulesHtml}

  </section>

  <section class="tab" id="cach-hoc" data-tab="Cách học" data-note="vấn đề, khái niệm, công cụ">
    <div class="callout ok">
      <span class="label">${esc(meta.principle)}</span>
      <p>Mỗi bài bắt đầu từ một <strong>vấn đề có thật</strong>, rồi tới <strong>khái niệm</strong>
      giải thích vì sao nó xảy ra, sau cùng mới tới <strong>công cụ</strong>.</p>
    </div>

    <h2 id="bon-tep">Mỗi bài gồm bốn phần</h2>
    <div class="table-scroll">
    <table>
      <caption><b>Bảng 1</b> Các tệp trong một thư mục bài học.</caption>
      <thead><tr><th>Tệp</th><th>Dùng để</th></tr></thead>
      <tbody>
        <tr><td><code>index.html</code></td><td>Bài giảng đầy đủ: giải thích, sơ đồ, bảng tra.</td></tr>
        <tr><td><code>README.md</code></td><td>Vở bài tập: các bước lab và danh sách tự kiểm tra.</td></tr>
        <tr><td><code>notes.md</code></td><td>Ghi chép: lỗi đã gặp, output thật.</td></tr>
        <tr><td><code>lab/</code></td><td>Các tệp đã viết trong bài: Dockerfile, cấu hình…</td></tr>
      </tbody>
    </table>
    </div>

    <h2 id="loi-co-chu-dich">Mỗi lab có một bước cố tình gây lỗi</h2>
    <p>Làm hỏng có chủ đích rồi tự sửa, để lần sau gặp lỗi thật thì đã biết nó là gì.</p>
  </section>

  <section class="tab" id="tai-nguyen" data-tab="Tài nguyên" data-note="Chỉ nguồn chính thức">
    <p class="panel-intro">Nguồn chính thức để tra cứu trong lúc học.</p>

    <h2 id="tai-lieu-chinh-thuc">Tài liệu chính thức</h2>
    <div class="table-scroll">
    <table>
      <caption><b>Bảng 2</b> Tài liệu gốc của các công cụ trong lộ trình.</caption>
      <thead><tr><th>Chủ đề</th><th>Nguồn</th></tr></thead>
      <tbody>
        <tr><td>Docker — Get started</td><td><a href="https://docs.docker.com/get-started/">docs.docker.com/get-started</a></td></tr>
        <tr><td>Dockerfile reference</td><td><a href="https://docs.docker.com/reference/dockerfile/">docs.docker.com/reference/dockerfile</a></td></tr>
        <tr><td>Docker Compose</td><td><a href="https://docs.docker.com/compose/">docs.docker.com/compose</a></td></tr>
        <tr><td>The Twelve-Factor App</td><td><a href="https://12factor.net/">12factor.net</a></td></tr>
        <tr><td>Nginx — Beginner's Guide</td><td><a href="https://nginx.org/en/docs/beginners_guide.html">nginx.org/en/docs/beginners_guide.html</a></td></tr>
        <tr><td>Let's Encrypt / Certbot</td><td><a href="https://certbot.eff.org/">certbot.eff.org</a></td></tr>
        <tr><td>GitLab CI/CD</td><td><a href="https://docs.gitlab.com/ci/">docs.gitlab.com/ci</a></td></tr>
        <tr><td>Cú pháp <code>.gitlab-ci.yml</code></td><td><a href="https://docs.gitlab.com/ci/yaml/">docs.gitlab.com/ci/yaml</a></td></tr>
        <tr><td>Kubernetes</td><td><a href="https://kubernetes.io/docs/home/">kubernetes.io/docs</a></td></tr>
        <tr><td>k3d — cụm Kubernetes học trên máy</td><td><a href="https://k3d.io/">k3d.io</a></td></tr>
        <tr><td>Helm</td><td><a href="https://helm.sh/docs/">helm.sh/docs</a></td></tr>
        <tr><td>cert-manager</td><td><a href="https://cert-manager.io/docs/">cert-manager.io/docs</a></td></tr>
        <tr><td>Rancher</td><td><a href="https://ranchermanager.docs.rancher.com/">ranchermanager.docs.rancher.com</a></td></tr>
        <tr><td>RKE2</td><td><a href="https://docs.rke2.io/">docs.rke2.io</a></td></tr>
        <tr><td>Spring Boot Actuator</td><td><a href="https://docs.spring.io/spring-boot/reference/actuator/index.html">docs.spring.io/spring-boot/reference/actuator</a></td></tr>
        <tr><td>Prometheus</td><td><a href="https://prometheus.io/docs/introduction/overview/">prometheus.io/docs</a></td></tr>
        <tr><td>Grafana</td><td><a href="https://grafana.com/docs/grafana/latest/">grafana.com/docs/grafana</a></td></tr>
        <tr><td>Linux man pages</td><td><a href="https://man7.org/linux/man-pages/">man7.org/linux/man-pages</a></td></tr>
        <tr><td>Chuẩn Internet (RFC)</td><td><a href="https://www.rfc-editor.org/">rfc-editor.org</a></td></tr>
      </tbody>
    </table>
    </div>

    <h2 id="hoc-nen-tang">Học nền tảng, miễn phí</h2>
    <div class="table-scroll">
    <table>
      <caption><b>Bảng 3</b> Nguồn học bổ trợ, chất lượng cao và miễn phí.</caption>
      <thead><tr><th>Chủ đề</th><th>Nguồn</th></tr></thead>
      <tbody>
        <tr><td>Linux từ đầu, rất dễ vào</td><td><a href="https://linuxjourney.com/">linuxjourney.com</a></td></tr>
        <tr><td>Giải thích một câu lệnh shell bất kỳ</td><td><a href="https://explainshell.com/">explainshell.com</a></td></tr>
        <tr><td>Lab Linux/Docker/K8s trên trình duyệt</td><td><a href="https://killercoda.com/">killercoda.com</a></td></tr>
        <tr><td>Sandbox Docker</td><td><a href="https://labs.play-with-docker.com/">labs.play-with-docker.com</a></td></tr>
        <tr><td>Bài hướng dẫn chính thức của Kubernetes</td><td><a href="https://kubernetes.io/docs/tutorials/">kubernetes.io/docs/tutorials</a></td></tr>
        <tr><td>Bản đồ nghề DevOps</td><td><a href="https://roadmap.sh/devops">roadmap.sh/devops</a></td></tr>
        <tr><td>Bảng tra cú pháp nhanh</td><td><a href="https://devhints.io/">devhints.io</a></td></tr>
      </tbody>
    </table>
    </div>

    <h2 id="tieng-viet">Video tiếng Việt</h2>
    <p>Tìm trên YouTube: <code>Docker tiếng Việt</code>, <code>Kubernetes tiếng Việt</code>,
    <code>GitLab CI tiếng Việt</code>. Xem xong thì tự gõ lại trên máy mình.</p>
  </section>

  </main>

  <footer class="page">
    <p>Bắt đầu ${viDate(meta.started)} · Môi trường: ${esc(meta.env)}</p>
  </footer>

</div>

<script src="assets/app.js?v=${ASSET_V}"></script>
</body>
</html>
`;

writeFileSync(join(ROOT, 'index.html'), indexHtml, 'utf8');

/* ------------------------------------------------------------------ */
/* README.md                                                           */
/* ------------------------------------------------------------------ */

// Ảnh Bauhaus cho README (GitHub không cho CSS): một thẻ dẫn sang bản web, và ấn ký từng bài.
// Thẻ cố ý khác trang chủ của bản web, để README không lặp lại thứ bấm vào là thấy.
const currentLesson =
  allLessons.find((l) => statusOf(l.id) === 'doing') ?? allLessons.find((l) => statusOf(l.id) === 'todo');
const artCount = makeArt(ROOT, Bauhaus).write({
  cardData: {
    done: doneCount,
    total: allLessons.length,
    modules: curriculum.modules.length,
    hoursRange: `${hoursLo}–${hoursHi}`,
    current: currentLesson && {
      id: currentLesson.id,
      status: statusOf(currentLesson.id),
      title: currentLesson.title.toLocaleLowerCase('vi'),
    },
    strip: curriculum.modules.map((m) => m.lessons.map((l) => statusOf(l.id))),
  },
  lessonIds: allLessons.map((l) => l.id),
});

const readmeModules = curriculum.modules
  .map((m) => {
    const rows = m.lessons
      .map((l) => {
        const st = statusOf(l.id);
        const d = dateOf(l.id);
        const state = st === 'done' ? `xong ${viDate(d)}` : st === 'doing' ? 'đang học' : '—';
        const name = hasPage(l) ? `[${l.title}](${dirOf(l)}/)` : l.title;
        return `| \`${l.id}\` | ${name} | ${l.question} | ${hrs(l)} | ${state} |`;
      })
      .join('\n');
    return `### ${m.id} · ${m.title}

> ${m.why}

| # | Bài | Câu hỏi của bài | Ước lượng | Trạng thái |
|---|---|---|---|---|
${rows}`;
  })
  .join('\n\n');

const readme = `<a href="${SITE}"><img src="assets/readme/card.svg" width="100%" alt="DevOps từ số 0: đã xong ${doneCount}/${allLessons.length} bài. Bấm để mở bản web đầy đủ."></a>

# ${meta.title}

> ${meta.subtitle}

${meta.what}

**Đích đến:** ${meta.goal}

| | |
|---|---|
| **Công cụ** | ${meta.stack} |
| **Môi trường** | ${meta.env} |
| **Quy mô** | ${allLessons.length} bài · ${curriculum.modules.length} module · khoảng ${hoursLo}–${hoursHi} giờ học |
| **Tiến độ** | ${doneCount}/${allLessons.length} bài đã xong |

Mỗi bài đi từ một **vấn đề có thật**, tới **khái niệm**, rồi mới tới **công cụ**. Bài nào cũng có
một lab chạy thật, với một bước cố tình gây lỗi rồi tự sửa.

---

## Mục lục

${readmeModules}

---

## Mỗi bài gồm

| Tệp | Dùng để |
|---|---|
| \`index.html\` | Bài giảng đầy đủ: giải thích, sơ đồ, bảng tra |
| \`README.md\` | Vở bài tập: các bước lab, danh sách tự kiểm tra |
| \`notes.md\` | Ghi chép: lỗi đã gặp, output thật |
| \`lab/\` | Các tệp đã viết trong bài |

## Tài liệu chính thức

| Chủ đề | Link |
|---|---|
| Docker — Get started | https://docs.docker.com/get-started/ |
| Docker — Dockerfile reference | https://docs.docker.com/reference/dockerfile/ |
| Docker Compose | https://docs.docker.com/compose/ |
| The Twelve-Factor App | https://12factor.net/ |
| Nginx — Beginner's Guide | https://nginx.org/en/docs/beginners_guide.html |
| Let's Encrypt / Certbot | https://certbot.eff.org/ |
| GitLab CI/CD | https://docs.gitlab.com/ci/ |
| Cú pháp \`.gitlab-ci.yml\` | https://docs.gitlab.com/ci/yaml/ |
| Kubernetes | https://kubernetes.io/docs/home/ |
| k3d — cụm Kubernetes học trên máy | https://k3d.io/ |
| Helm | https://helm.sh/docs/ |
| cert-manager | https://cert-manager.io/docs/ |
| Rancher | https://ranchermanager.docs.rancher.com/ |
| RKE2 | https://docs.rke2.io/ |
| Spring Boot Actuator | https://docs.spring.io/spring-boot/reference/actuator/index.html |
| Prometheus | https://prometheus.io/docs/introduction/overview/ |
| Grafana | https://grafana.com/docs/grafana/latest/ |
| Linux man pages | https://man7.org/linux/man-pages/ |
| Chuẩn Internet (RFC) | https://www.rfc-editor.org/ |

Thêm nguồn học bổ trợ ở tab Tài nguyên của [bản web](${SITE}#tai-nguyen).
`;

writeFileSync(join(ROOT, 'README.md'), readme, 'utf8');

/* ------------------------------------------------------------------ */
/* Thư mục từng bài (không ghi đè file đã có)                          */
/* ------------------------------------------------------------------ */

// .nojekyll: chặn GitHub Pages chạy Jekyll. Không có file này, Jekyll sẽ render
// README.md thành HTML trần và trỏ CSS vào assets/css/style.css của theme —
// đè lên thư mục assets/ của chính ta.
writeFileSync(join(ROOT, '.nojekyll'), '');

// Trang viết tay: chỉ cập nhật đúng tham số ?v= trong hai đường dẫn tài sản, không đụng nội dung.
let versioned = 0;
for (const d of readdirSync(join(ROOT, 'lessons'))) {
  for (const f of readdirSync(join(ROOT, 'lessons', d)).filter((x) => x.endsWith('.html'))) {
    const p = join(ROOT, 'lessons', d, f);
    const s = readFileSync(p, 'utf8');
    const t = s.replace(/(assets\/(?:style\.css|app\.js))(?:\?v=[0-9a-f]+)?"/g, `$1?v=${ASSET_V}"`);
    if (t !== s) { writeFileSync(p, t, 'utf8'); versioned++; }
  }
}

console.log(`OK  index.html + README.md + .nojekyll + ${artCount} ảnh README (assets/readme/) đã cập nhật`);
console.log(
  `OK  ${allLessons.length} bài · ${doneCount} xong (${pct}%) · ` +
    `${allLessons.filter(hasPage).length} bài đã có trang viết tay` +
    ` · tài sản v=${ASSET_V}${versioned ? ` (cập nhật đường dẫn ở ${versioned} trang)` : ''}`
);
