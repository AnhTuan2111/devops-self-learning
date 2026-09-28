#!/usr/bin/env node
/**
 * Sinh mục lục từ curriculum.json + progress.json.
 *
 *   node scripts/generate.mjs
 *
 * Tạo ra:
 *   index.html            — trang chủ: hero, băng chữ chạy, thẻ lộ trình, 3 tab
 *   README.md             — mục lục dạng markdown cho GitHub
 *   lessons/NN-slug/      — thư mục từng bài, kèm README.md khung (KHÔNG ghi đè nếu đã có)
 *
 * Nguyên tắc: file này chỉ ĐỌC curriculum.json và progress.json.
 * Muốn sửa nội dung lộ trình thì sửa curriculum.json rồi chạy lại script.
 *   assets/readme/        — ảnh SVG cho README (xem scripts/readme-art.mjs)
 *
 * Giao diện theo hệ "Bauhaus" trong assets/style.css — đọc bảng luật ở đầu file đó.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { makeArt } from './readme-art.mjs';

// Bộ sinh hình Bauhaus sống trong assets/app.js (trình duyệt dùng nó để vẽ ấn ký đầu trang bài).
// Nạp chung một file để ô ở trang chủ và ấn ký ở trang bài không bao giờ lệch nhau.
const Bauhaus = createRequire(import.meta.url)('../assets/app.js');

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

// Trạng thái mang hình, không chỉ mang màu: tròn đặc = xong · tam giác = đang học · vòng rỗng = chưa học.
// Hình VẼ bằng CSS (.stt-*), không dùng ký tự bàn phím làm icon.
const STT = (k) => `<i class="stt stt-${k}" aria-hidden="true"></i>`;
const STATUS_LABEL = { done: `${STT('done')}Xong`, doing: `${STT('doing')}Đang học`, todo: `${STT('todo')}Chưa học` };
const STATUS_CHIP = { done: 'lime', doing: 'yellow', todo: '' };
const STATUS_MARK = { done: 'xong', doing: 'đang học', todo: '' };   // README: chữ, không emoji

const doneCount = allLessons.filter((l) => statusOf(l.id) === 'done').length;
const current = allLessons.find((l) => statusOf(l.id) === 'doing') ?? allLessons.find((l) => statusOf(l.id) === 'todo');
const pct = Math.round((doneCount / allLessons.length) * 100);
const totalHours = Math.round(allLessons.reduce((s, l) => s + l.est, 0) / 60);
const SITE = 'https://anhtuan2111.github.io/devops-self-learning/';

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const pad2 = (n) => String(n).padStart(2, '0');
const shortTitle = (m) => m.title.split(' — ')[0];
// Ấn ký của bài ở đầu README của bài (ảnh do readme-art.mjs vẽ)
const glyphImg = (id) => `<img src="../../assets/readme/glyph/${id}.svg" width="132" align="right" alt="Ấn ký của Bài ${id}">`;
const viDate = (iso) => (iso ? iso.split('-').reverse().join('/') : '');

const head = ({ title, desc, base }) => `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="stylesheet" href="${base}assets/style.css">
<link rel="icon" href="${base}assets/favicon.svg">
</head>`;

/* ------------------------------------------------------------------ */
/* index.html                                                          */
/* ------------------------------------------------------------------ */

const STACK = [
  'Linux', 'Bash', 'systemd', 'TCP/IP', 'DNS', 'HTTP/HTTPS', 'SSH', 'Docker', 'Docker Compose',
  'Nginx', "Let's Encrypt", 'PostgreSQL', 'Spring Boot', 'GitHub Actions', 'Prometheus', 'Grafana',
  'Ansible', 'Terraform', 'Kubernetes',
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
        return `<a class="ptile ${st}" href="${dirOf(l)}/" title="${esc(label)}" aria-label="${esc(label)}">${Bauhaus.tile(l.id)}</a>`;
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
        const sub = `${esc(l.goal)} · ~${l.est} phút${d ? ` · học ${viDate(d)}` : ''}`;
        return `        <a class="lesson ${st}" href="${dirOf(l)}/">
          <span class="num">${l.id}</span>
          <span class="txt">
            <span class="title">${esc(l.title)}</span>
            <span class="sub">${sub}</span>
          </span>
          <span class="status chip ${STATUS_CHIP[st]}">${STATUS_LABEL[st]}</span>
        </a>`;
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
      <p class="eyebrow">Nhật ký tự học · học công khai</p>
      <h1>DevOps<br><span class="hl">từ số 0</span></h1>
      <p class="route"><span>Java / Spring Boot backend</span><i class="ic ic-r arrow" aria-hidden="true"></i><span>vận hành được hệ thống của chính mình</span></p>
      <p class="lede">Đây là nhật ký tự học DevOps của một lập trình viên backend: người đã viết được
      API bằng Spring Boot, nhưng gần như chưa biết gì về tầng hạ tầng nằm bên dưới đoạn code ấy —
      máy chủ chạy trên nền gì, gói tin đi qua những chặng nào, vì sao một hệ thống đang chạy tốt
      lại có thể tự hỏng mà không ai chạm vào. Mỗi bài không chép lại từ một khoá học nào; nó được
      viết sau một buổi học đối thoại thật, gồm phần giảng giải <em>vì sao</em>, sơ đồ cơ chế, bài
      lab đã chạy trên chính máy người học, và cả những chỗ đã hiểu sai cùng cách đã sửa.</p>
      <div class="meta">
        <span class="chip ink">${esc(meta.stack)}</span>
      </div>
    </div>
    <div class="hh-stats" role="img" aria-label="Đã xong ${doneCount} trên ${allLessons.length} bài; khoảng ${totalHours} giờ học; ${curriculum.modules.length} module">
      <div class="st st-c"><b>${pad2(doneCount)}<small>/${allLessons.length}</small></b><small>bài đã xong</small></div>
      <div class="st st-s"><b>~${totalHours}</b><small>giờ học</small></div>
      <div class="st st-t"><b>${curriculum.modules.length}</b><small>module</small></div>
    </div>
  </header>

  <p class="toolstrip"><span class="lbl">công cụ sẽ gặp</span>${STACK.map((s) => `<span class="t">${esc(s)}</span>`).join('')}</p>

  <section class="roadmap" aria-labelledby="roadmap-title">
    <div class="roadmap-head">
      <h2 id="roadmap-title">Lộ trình chín chặng</h2>
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
    <p class="panel-intro">Thứ tự chín module không được xếp tuỳ tiện. Mỗi module dựa trên những
    gì module trước đã dựng: không hiểu process thì không hiểu vì sao container "chạy" mà app chưa
    "sẵn sàng"; không hiểu port và listen address thì không hiểu vì sao Nginx trả 502; không tự tay
    deploy một lần cho thật đau thì không biết CI/CD đang tự động hoá cái gì. Vì vậy lộ trình đi từ
    cái máy (Linux), ra đường truyền (mạng), rồi mới tới cách đóng gói (Docker), cách mở cửa ra
    Internet (Nginx), đưa lên máy thật (production), tự động hoá (CI/CD), theo dõi (monitoring), và
    chỉ ở cuối cùng mới bàn tới mở rộng quy mô.</p>

${modulesHtml}

  </section>

  <section class="tab" id="cach-hoc" data-tab="Cách học" data-note="Problem, Concept, Tool">
    <h2 id="nguyen-tac">Nguyên tắc xuyên suốt</h2>
    <div class="callout ok">
      <span class="label">${esc(meta.principle)}</span>
      <p>Mỗi bài bắt đầu bằng một <strong>vấn đề có thật</strong> — một tình huống cụ thể, thường là
      một sự cố — rồi mới tới <strong>khái niệm</strong> giải thích vì sao vấn đề đó xảy ra, và chỉ sau
      cùng mới tới <strong>công cụ</strong> dùng để xử lý nó. Học theo chiều ngược lại, tức là học công
      cụ trước, là con đường ngắn nhất để thuộc hai trăm câu lệnh mà vẫn không giải thích được vì sao
      một website không vào được.</p>
    </div>
    <p>Lý do nằm ở cách trí nhớ làm việc. Một câu lệnh học thuộc là một mẩu thông tin rời rạc: nó
    không nối vào đâu, nên khi gặp một tình huống lệch đi một chút so với lúc học, ta không biết nên
    đổi tham số nào. Ngược lại, một <em>cơ chế</em> đã hiểu là một mô hình có thể suy luận được: biết
    gói tin phải đi qua firewall trước khi tới process đang listen, ta tự suy ra rằng <code>timeout</code>
    và <code>connection refused</code> chỉ về hai chặng khác nhau, mà không cần ai dặn trước.</p>

    <h2 id="bon-tep">Mỗi bài gồm bốn tệp, và chúng bổ sung chứ không lặp lại nhau</h2>
    <div class="table-scroll">
    <table>
      <caption><b>Bảng 1</b> Vai trò của từng tệp trong một thư mục bài học.</caption>
      <thead><tr><th>Tệp</th><th>Vai trò</th><th>Đọc khi nào</th></tr></thead>
      <tbody>
        <tr><td><code>index.html</code></td><td><strong>Sách giáo khoa.</strong> Bài giảng đầy đủ, chia tab, có sơ đồ, bảng tra, phần đào sâu học thuật và nguồn tham khảo.</td><td>Đọc trước buổi học để có ngữ cảnh, và đọc lại khi cần hiểu <em>vì sao</em>.</td></tr>
        <tr><td><code>README.md</code></td><td><strong>Vở bài tập.</strong> Bản rút gọn để làm theo: bảng tra nhanh, các bước lab, danh sách tự chấm.</td><td>Mở cạnh terminal khi làm lab.</td></tr>
        <tr><td><code>notes.md</code></td><td><strong>Ghi chép thô.</strong> Lỗi đã gặp, câu hỏi còn treo, output lab thật dán nguyên văn.</td><td>Khi gặp lại một lỗi và muốn biết lần trước đã sửa ra sao.</td></tr>
        <tr><td><code>lab/</code></td><td><strong>Tệp thật đã viết:</strong> script, Dockerfile, <code>compose.yaml</code>, cấu hình Nginx…</td><td>Khi cần chép lại một cấu hình đã chạy được.</td></tr>
      </tbody>
    </table>
    </div>

    <h2 id="hai-luot">Viết hai lượt: nháp trước, bồi đắp sau</h2>
    <p>Từ Bài 01, mỗi bài được viết theo hai lượt. Ở <strong>lượt thứ nhất</strong>, tài liệu được viết
    đầy đủ ngay khi bắt đầu bài, để người học đọc trước và bước vào buổi học với một khung hiểu
    biết sẵn có. Sau đó là <strong>buổi học đối thoại</strong>: bài được chia thành vài phần, cuối mỗi
    phần có những câu hỏi buộc phải suy luận chứ không phải nhắc lại, và chỗ nào trả lời sai thì
    được giảng lại đúng chỗ đó. Ở <strong>lượt thứ hai</strong>, tài liệu được viết lại để bồi thêm
    những thứ chỉ buổi học mới sinh ra: những chỗ đã hiểu sai và cách đã giảng lại, output lab thật
    trên máy người học, và những câu hỏi nằm ngoài kịch bản. Chính lượt thứ hai làm cho tài liệu
    này khác một giáo trình chung chung — nó ghi lại <em>đường đi thật</em> của một người học.</p>

    <h2 id="loi-co-chu-dich">Mỗi lab đều có một bước cố tình gây lỗi</h2>
    <p>Không bài lab nào dừng ở chỗ "chạy được". Mỗi bài đều có ít nhất một bước <strong>cố ý làm
    hỏng</strong> hệ thống — tắt process, chặn port, cấu hình sai — rồi quan sát triệu chứng và tự
    sửa. Lý do rất thực dụng: gặp một lỗi lần đầu tiên trong môi trường an toàn, khi đã biết trước
    nguyên nhân, là cách duy nhất để lần sau gặp đúng lỗi đó trên production mà không hoảng. Triệu
    chứng lúc ấy không còn là một thông báo khó hiểu, mà là một thứ đã từng thấy và đã từng sửa.</p>

    <h2 id="ghi-tien-do">Ghi tiến độ</h2>
    <p>Trạng thái từng bài nằm trong <code>progress.json</code>, nhận một trong ba giá trị
    <code>todo</code>, <code>doing</code>, <code>done</code>, kèm ngày học và một dòng ghi chú. Toàn bộ
    lộ trình nằm trong <code>curriculum.json</code>. Trang này, <code>README.md</code> và khung của
    các bài chưa học đều được sinh lại từ hai tệp đó bằng lệnh dưới đây — nên muốn sửa nội dung lộ
    trình thì sửa JSON, đừng sửa tay vào HTML.</p>
    <pre><code>node scripts/generate.mjs</code></pre>
  </section>

  <section class="tab" id="tai-nguyen" data-tab="Tài nguyên" data-note="Chỉ nguồn chính thức">
    <p class="panel-intro">Tài liệu chính thức là nguồn chuẩn để <em>làm cho đúng</em>; video tiếng
    Việt là nguồn tốt để <em>hiểu nhanh ý tưởng</em>. Hai loại này không thay thế được nhau, và
    không loại nào thay được việc tự gõ lại từng lệnh trên máy mình.</p>

    <h2 id="tai-lieu-chinh-thuc">Tài liệu chính thức</h2>
    <div class="table-scroll">
    <table>
      <caption><b>Bảng 2</b> Tài liệu gốc của các công cụ trong lộ trình.</caption>
      <thead><tr><th>Chủ đề</th><th>Nguồn</th></tr></thead>
      <tbody>
        <tr><td>Docker — Get started</td><td><a href="https://docs.docker.com/get-started/">docs.docker.com/get-started</a></td></tr>
        <tr><td>Dockerfile reference</td><td><a href="https://docs.docker.com/reference/dockerfile/">docs.docker.com/reference/dockerfile</a></td></tr>
        <tr><td>Docker Compose</td><td><a href="https://docs.docker.com/compose/">docs.docker.com/compose</a></td></tr>
        <tr><td>Nginx — Beginner's Guide</td><td><a href="https://nginx.org/en/docs/beginners_guide.html">nginx.org/en/docs/beginners_guide.html</a></td></tr>
        <tr><td>GitHub Actions</td><td><a href="https://docs.github.com/en/actions">docs.github.com/en/actions</a></td></tr>
        <tr><td>Let's Encrypt / Certbot</td><td><a href="https://certbot.eff.org/">certbot.eff.org</a></td></tr>
        <tr><td>Ubuntu Server</td><td><a href="https://documentation.ubuntu.com/server/">documentation.ubuntu.com/server</a></td></tr>
        <tr><td>Linux man pages</td><td><a href="https://man7.org/linux/man-pages/">man7.org/linux/man-pages</a></td></tr>
        <tr><td>Chuẩn Internet (RFC)</td><td><a href="https://www.rfc-editor.org/">rfc-editor.org</a></td></tr>
        <tr><td>Prometheus</td><td><a href="https://prometheus.io/docs/introduction/overview/">prometheus.io/docs</a></td></tr>
        <tr><td>Kubernetes</td><td><a href="https://kubernetes.io/docs/home/">kubernetes.io/docs</a></td></tr>
        <tr><td>The Twelve-Factor App</td><td><a href="https://12factor.net/">12factor.net</a></td></tr>
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
        <tr><td>Bản đồ nghề DevOps</td><td><a href="https://roadmap.sh/devops">roadmap.sh/devops</a></td></tr>
        <tr><td>Full Stack Open — phần CI/CD</td><td><a href="https://fullstackopen.com/en/part11">fullstackopen.com/en/part11</a></td></tr>
        <tr><td>Bảng tra cú pháp nhanh</td><td><a href="https://devhints.io/">devhints.io</a></td></tr>
      </tbody>
    </table>
    </div>

    <h2 id="tieng-viet">Tiếng Việt có video</h2>
    <p><strong>F8 — fullstack.edu.vn</strong>: tìm khoá <em>"DevOps for Engineers"</em>, miễn phí,
    tiếng Việt, đi lần lượt qua Docker, Linux, Compose, VPS rồi tới deploy; phù hợp làm nguồn video chính. Trên
    YouTube, các từ khoá hữu ích là <code>Docker tiếng Việt</code>, <code>Nginx reverse proxy tiếng
    Việt</code>, <code>CI/CD GitHub Actions tiếng Việt</code> và <code>deploy Spring Boot lên VPS</code>.</p>
    <div class="callout warn">
      <span class="label">Cách dùng đúng</span>
      <p>Chỉ xem video thì kiến thức ở lại trong video. Bài nào cũng phải tự gõ lại trên máy mình,
      tự gây lỗi và tự sửa, thì mới thực sự thành của mình.</p>
    </div>
  </section>

  </main>

  <footer class="page">
    <p>Bắt đầu ${viDate(meta.started)} · Môi trường: ${esc(meta.env)}</p>
    <p>Trang này được sinh tự động từ <code>curriculum.json</code> + <code>progress.json</code> bằng <code>scripts/generate.mjs</code>.</p>
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

// Ảnh Bauhaus cho README (GitHub không cho CSS): tiêu đề, bức tranh lộ trình, ấn ký từng bài.
// Vẽ bằng chính bộ sinh hình của bản web, nên README và trang web luôn khớp nhau.
const artCount = makeArt(ROOT, Bauhaus).write({
  stats: { done: doneCount, total: allLessons.length, hours: totalHours, modules: curriculum.modules.length },
  rows: moduleStats.map((s) => ({
    name: shortTitle(s.m).toLocaleLowerCase('vi'),
    done: s.done,
    lessons: s.m.lessons.map((l) => ({ id: l.id, status: statusOf(l.id) })),
  })),
  lessonIds: allLessons.map((l) => l.id),
});

const readmeModules = curriculum.modules
  .map((m) => {
    const rows = m.lessons
      .map((l) => {
        const st = statusOf(l.id);
        const d = dateOf(l.id);
        return `| ${STATUS_MARK[st]} | \`${l.id}\` | [${l.title}](${dirOf(l)}/) | ${l.goal} | ${l.est}' | ${d ? viDate(d) : '—'} |`;
      })
      .join('\n');
    return `### ${m.id} · ${m.title}

> ${m.why}

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
${rows}`;
  })
  .join('\n\n');

const readme = `<a href="${SITE}"><img src="assets/readme/banner.svg" width="100%" alt="DevOps từ số 0 — nhật ký tự học, đã xong ${doneCount}/${allLessons.length} bài"></a>

<img src="assets/readme/roadmap.svg" width="100%" alt="Bức tranh lộ trình: mỗi hàng một module, mỗi ô một bài; ô đã học được tô màu">

**[Đọc bản web đầy đủ, có tab và sơ đồ](${SITE})**

# ${meta.title}

> ${meta.subtitle}

Đây là nhật ký tự học DevOps của một lập trình viên backend Java/Spring Boot — người viết được
code, nhưng gần như chưa biết gì về tầng hạ tầng nằm bên dưới code đó. Nó không phải một khoá
học được chép lại: mỗi bài là một thư mục ghi lại một buổi học đối thoại thật, gồm phần giảng giải
*vì sao*, sơ đồ cơ chế, bài lab đã thực sự chạy trên máy người học, những chỗ đã hiểu sai và cách
đã sửa. Bản web (GitHub Pages) là nơi đọc chính, vì ở đó mỗi bài được chia tab, có bảng tra, sơ đồ
và phần đào sâu học thuật; tệp này là mục lục để duyệt nhanh trên GitHub.

| | |
|---|---|
| **Stack thực hành** | ${meta.stack} |
| **Môi trường** | ${meta.env} |
| **Bắt đầu** | ${viDate(meta.started)} |
| **Quy mô** | ${allLessons.length} bài · ${curriculum.modules.length} module · khoảng ${totalHours} giờ |
| **Tiến độ** | ${doneCount}/${allLessons.length} bài đã xong (${pct}%) — xem bức tranh lộ trình trên bản web |

---

## Nguyên tắc

**${meta.principle}**

Mỗi bài đi theo đúng thứ tự dưới đây. Trước hết là một **vấn đề có thật** — thường là một sự cố cụ
thể — để có lý do phải học; sau đó là **khái niệm** giải thích vì sao vấn đề ấy xảy ra, ở tầng nào
của hệ thống; chỉ sau cùng mới tới **công cụ** dùng để xử lý nó.

\`\`\`
Problem  →  Concept  →  Tool
   │           │           │
   │           │           └── Docker, Nginx, GitHub Actions...
   │           └── Tại sao cần nó, nó giải quyết gì, cơ chế bên dưới là gì
   └── Một tình huống có thật khiến ta cần thứ đó
\`\`\`

Học theo chiều ngược lại — công cụ trước — là lý do nhiều người thuộc hai trăm câu lệnh mà vẫn
không giải thích được vì sao một website không vào được. Một câu lệnh học thuộc là một mẩu thông
tin rời rạc, không suy luận tiếp được; một cơ chế đã hiểu thì dùng được cả trong những tình huống
chưa ai dặn trước.

---

## Cấu trúc thư mục

\`\`\`
devops-self-learning/
├── README.md              ← bạn đang đọc, mục lục chính
├── index.html             ← trang chủ bản web (sinh tự động)
├── curriculum.json        ← nguồn sự thật: toàn bộ lộ trình
├── progress.json          ← trạng thái từng bài
├── assets/                ← hệ thiết kế Bauhaus: style.css, app.js, font, ảnh README
├── scripts/generate.mjs   ← sinh README.md + index.html từ 2 tệp JSON trên
└── lessons/
    └── NN-ten-bai/
        ├── index.html     ← sách giáo khoa: bài giảng đầy đủ, chia tab
        ├── README.md      ← vở bài tập: tra nhanh, lab, tự chấm
        ├── notes.md       ← ghi chép thô: lỗi đã gặp, output thật
        └── lab/           ← tệp thật đã viết trong bài
\`\`\`

\`index.html\` và \`README.md\` của một bài **bổ sung cho nhau, không lặp lại nhau**: bản HTML dạy và
giải thích *vì sao*, bản Markdown để làm theo và tự chấm. Sau khi sửa \`curriculum.json\` hoặc
\`progress.json\`, chạy lại:

\`\`\`bash
node scripts/generate.mjs
\`\`\`

---

## Mục lục

${readmeModules}

---

## Tài nguyên tham khảo

Tài liệu chính thức là nguồn chuẩn để *làm cho đúng*; video tiếng Việt là nguồn tốt để *hiểu nhanh
ý tưởng*. Hai loại không thay thế được nhau, và không loại nào thay được việc tự gõ lại từng lệnh.

### Tài liệu chính thức

| Chủ đề | Link |
|---|---|
| Docker — Get started | https://docs.docker.com/get-started/ |
| Docker — Dockerfile reference | https://docs.docker.com/reference/dockerfile/ |
| Docker Compose | https://docs.docker.com/compose/ |
| Nginx — Beginner's Guide | https://nginx.org/en/docs/beginners_guide.html |
| GitHub Actions | https://docs.github.com/en/actions |
| Let's Encrypt / Certbot | https://certbot.eff.org/ |
| Ubuntu Server docs | https://documentation.ubuntu.com/server/ |
| Linux man pages | https://man7.org/linux/man-pages/ |
| Chuẩn Internet (RFC) | https://www.rfc-editor.org/ |
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
| F8 — fullstack.edu.vn | Tìm khoá **"DevOps for Engineers"**. Miễn phí, tiếng Việt, đi lần lượt qua Docker, Linux, Compose, VPS rồi tới deploy. Dùng làm nguồn video chính. |
| YouTube | Từ khoá hữu ích: \`"Docker tiếng Việt"\`, \`"Nginx reverse proxy tiếng Việt"\`, \`"CI/CD GitHub Actions tiếng Việt"\`, \`"deploy Spring Boot lên VPS"\` |

> **Cách dùng đúng:** chỉ xem video thì kiến thức ở lại trong video. Bài nào cũng phải tự gõ lại
> trên máy mình, tự gây lỗi và tự sửa, thì mới thực sự thành của mình.

---

## Quy ước ghi tiến độ

Mỗi bài học xong thì cập nhật \`progress.json\`. Trường \`status\` nhận một trong ba giá trị
\`todo\` · \`doing\` · \`done\`; trường \`note\` là một dòng ghi lại điều đáng nhớ nhất, kể cả điều
còn mơ hồ:

\`\`\`json
{
  "lessons": {
    "00": { "status": "done", "date": "2026-09-21", "note": "hiểu rồi nhưng còn mơ hồ về NAT" }
  }
}
\`\`\`

Rồi chạy \`node scripts/generate.mjs\` để cập nhật README, trang chủ và khung các bài. Hai ảnh ở
đầu tệp này — tiêu đề và bức tranh lộ trình — cũng do script đó vẽ lại từ \`progress.json\`, bằng
đúng bộ sinh hình của bản web: học xong một bài thì ô của bài đó trong tranh được tô màu. Ảnh nằm
trong \`assets/readme/\`, nhúng sẵn font League Spartan (giấy phép OFL) vì GitHub không tải web font
cho ảnh SVG.
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
  const mod = curriculum.modules.find((m) => m.id === l.moduleId);
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
  const [t1, t2] = l.title.includes(':') ? [l.title.slice(0, l.title.indexOf(':') + 1), l.title.slice(l.title.indexOf(':') + 1).trim()] : [l.title, ''];

  return head({ title: `Bài ${l.id} — ${l.title}`, desc: l.goal, base: '../../' }).replace('<!doctype html>', `<!doctype html>\n${SENTINEL}`) + `
<body data-lesson="${l.id}">

<nav class="topbar">
  <div class="topbar-inner">
    <a class="home" href="../../">devops-self-learning</a>
    <span class="crumb">/ bai-${l.id}</span>
    <span class="spacer"></span>
    <a class="nav" href="../../#${l.moduleId}">Module ${l.moduleId.slice(1)}</a>
  </div>
</nav>

<div class="wrap">

<header class="hero">
  <p class="eyebrow">Module ${l.moduleId.slice(1)} · Bài ${l.id}</p>
  <h1>${esc(t1)}${t2 ? ` <span class="hl">${esc(t2)}</span>` : ''}</h1>
  <p class="lede">${esc(l.goal)}</p>
  <div class="meta">
    <span class="chip ${STATUS_CHIP[st]}">${STATUS_LABEL[st]}</span>
    <span class="chip">~${l.est} phút</span>
    <span class="chip">${esc(l.moduleTitle.split(' — ')[0])}</span>
  </div>
</header>

<main class="tabs" data-tabs="Các phần của Bài ${l.id}">

<section class="tab" id="tong-quan" data-tab="Tổng quan" data-note="Khung bài">
  <div class="callout${st === 'done' ? ' ok' : ''}">
    <span class="label">${st === 'done' ? 'Đã học, chưa viết lại' : 'Trang này mới là khung'}</span>
    <p>${
      st === 'done'
        ? 'Bài này đã được học xong nhưng chưa được viết lại thành tài liệu đầy đủ. Những gì bên dưới là phần khung mà lộ trình đã định từ trước.'
        : 'Bài này chưa được học, nên trang hiện chỉ gồm những gì lộ trình đã định sẵn: mục tiêu, các khái niệm sẽ gặp, bài lab dự kiến và danh sách tự kiểm tra. Nội dung đầy đủ — phần giảng giải theo lối học thuật, sơ đồ cơ chế, bảng tra triệu chứng và phần mổ băng output thật — sẽ được viết vào đúng buổi học bài này, theo hai lượt: viết nháp trước để đọc, rồi bồi đắp sau buổi đối thoại.'
    }</p>
  </div>

  <h2 id="muc-tieu">Mục tiêu</h2>
  <p>${esc(l.goal)}</p>

  <h2 id="vi-tri">Vì sao bài này nằm ở ${esc(l.moduleId)}</h2>
  <p>${esc(mod.why)}</p>

  <h2 id="khai-niem">Khái niệm sẽ gặp</h2>
  <ul>
${l.concepts.map((c) => `    <li>${esc(c)}</li>`).join('\n')}
  </ul>
</section>

<section class="tab" id="bai-lab" data-tab="Lab" data-note="Dự kiến">
  <h2 id="lab">Bài lab dự kiến</h2>
  <p>${esc(l.lab)}</p>
  <div class="callout warn">
    <span class="label">Luật của mọi bài lab</span>
    <p>Bài lab sẽ không dừng ở chỗ "chạy được". Sẽ có ít nhất một bước cố tình làm hỏng hệ thống,
    quan sát triệu chứng, rồi tự sửa — vì gặp một lỗi lần đầu trong môi trường an toàn là cách duy
    nhất để lần sau gặp nó trên production mà không hoảng.</p>
  </div>
</section>

<section class="tab" id="tu-kiem-tra" data-tab="Tự kiểm tra" data-note="${l.checklist.length} mục">
  <p>Học xong phải tự làm được những việc dưới đây mà không nhìn tài liệu. Bấm vào từng dòng để
  đánh dấu khi đã tự tin; dấu tick được nhớ lại trên trình duyệt này.</p>
  <ul class="check">
${l.checklist.map((c) => `    <li>${esc(c)}</li>`).join('\n')}
  </ul>
</section>

</main>

<nav class="prevnext">
${link(prev, 'Bài trước', '')}
${link(next, 'Bài tiếp', ' class="next"')}
</nav>

<footer class="page">
  <p>Bài ${l.id} · Module ${l.moduleId} — ${esc(l.moduleTitle)} · DevOps Self-Learning</p>
  <p>Trang khung sinh tự động từ <code>curriculum.json</code>.</p>
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

${glyphImg(l.id)}

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

console.log(`OK  index.html + README.md + .nojekyll + ${artCount} ảnh README (assets/readme/) đã cập nhật`);
console.log(
  `OK  ${allLessons.length} bài · ${doneCount} xong (${pct}%) · ` +
    `${created} README mới · ${stubs} trang HTML sinh tự động ` +
    `(${allLessons.length - stubs} viết tay, không đụng tới)`
);
