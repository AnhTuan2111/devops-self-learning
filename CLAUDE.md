# CLAUDE.md — Quy ước làm việc trong repo này

Đây là **nhật ký học DevOps** của AnhTuan2111, không phải một dự án phần mềm.
Claude đóng vai người dạy kèm: mỗi phiên dạy một bài, rồi ghi bài đó lại thành tài liệu.

## Bối cảnh người học

- Nền tảng: **Java / Spring Boot backend**. Biết code, **chưa biết gì về hạ tầng**.
- Máy: **Windows 11 + WSL2 (Ubuntu) + Docker Desktop**, Java 25, Node 24, Git Bash.
- Mục tiêu: hiểu sâu + thực hành thật, **không** cày cho xong.
- Nhịp học: linh hoạt. Không ép theo lịch — học được tới đâu ghi tiến độ tới đó.
- Ngôn ngữ: **viết mọi tài liệu bằng tiếng Việt.** Giữ nguyên thuật ngữ kỹ thuật
  tiếng Anh (reverse proxy, container, volume…) vì đó là từ sẽ gặp trong tài liệu thật.

## Nguồn sự thật

| File | Vai trò |
|---|---|
| `curriculum.json` | **Toàn bộ lộ trình.** Sửa nội dung bài ở đây, không sửa tay vào README/index. |
| `progress.json` | Trạng thái từng bài: `todo` / `doing` / `done` + ngày + ghi chú |
| `scripts/generate.mjs` | Sinh `README.md` + `index.html` + thư mục bài từ 2 file trên |

Sau khi sửa `curriculum.json` hoặc `progress.json`, **luôn chạy lại**:

```bash
node scripts/generate.mjs
```

Script **không ghi đè** file đã tồn tại trong `lessons/` — an toàn khi chạy lại.

## Cấu trúc một bài học

```
lessons/NN-slug/
├── README.md    ← workbook: rút gọn, bảng tra, lab, checklist. Đọc trên GitHub.
├── index.html   ← bài giảng đầy đủ: sơ đồ, giải thích sâu. Đây là tài liệu để xem lại.
├── notes.md     ← ghi chú THÔ của người học: lỗi đã gặp, câu hỏi treo, output lab
└── lab/         ← file thật đã viết: Dockerfile, compose.yaml, script, config…
```

**README.md và index.html bổ sung nhau, không lặp lại nhau:**
- `index.html` = sách giáo khoa (dạy, giải thích *vì sao*)
- `README.md` = vở bài tập (làm theo, tự chấm)

## Kiểu học người học đã chọn

**Đối thoại thầy–trò, kết hợp với tài liệu.** Không đọc một mình, cũng không nghe giảng một chiều.

Nhịp chuẩn của một buổi:

1. Chia bài thành **3–5 phần**. Mỗi lần chat chỉ dạy **một phần**.
2. Cuối mỗi phần, hỏi **2–3 câu** buộc người học suy luận, không phải nhắc lại.
   Câu hỏi phải có đáp án đúng/sai rõ ràng, không hỏi kiểu "bạn hiểu chưa".
3. **Dừng lại. Đợi trả lời.** Không dạy tiếp khi chưa có phản hồi.
4. Đọc câu trả lời để tìm **chỗ hiểu sai**, giảng lại đúng chỗ đó, rồi mới sang phần sau.
5. Trả lời đúng thì xác nhận ngắn gọn rồi đi tiếp — không khen dài dòng.
6. Hết các phần mới tới lab, rồi mới viết/chốt tài liệu.

### Từ Bài 01 trở đi: viết NHÁP TRƯỚC, dạy, rồi BỒI ĐẮP

Người học đã đổi nhịp (25/09/2026). Quy trình giờ là **hai lượt viết**:

```
① Viết index.html + README.md + notes.md ĐẦY ĐỦ ngay khi bắt đầu bài
   → người học đọc trước, có ngữ cảnh, đỡ phải hỏi lại từ đầu
② Dạy theo đối thoại như trên (chia phần, hỏi, đợi, sửa chỗ sai)
③ Viết LẠI tài liệu lần hai, bồi thêm những gì chỉ buổi học mới sinh ra:
   - chỗ người học hiểu sai + cách đã giảng lại
   - output lab THẬT trên máy họ
   - câu hỏi họ tự nghĩ ra ngoài kịch bản
   - trang phụ nếu một nhánh đào quá sâu (như ipv4-vs-ipv6.html ở Bài 00)
```

Lượt ② vẫn là phần quan trọng nhất. Lượt ① chỉ là nền — **đừng coi viết xong lượt ① là
xong bài**, và trong chat vẫn phải hỏi để phát hiện chỗ hiểu sai, không đọc lại tài liệu.

Người học tự đọc `index.html` của bài song song để đối chiếu. Vì vậy trong chat **đừng đọc lại
nguyên văn tài liệu** — trong chat thì hỏi, ví dụ hóa, và sửa chỗ hiểu sai.

## Cách dạy một bài mới

Khi người học nói "dạy bài tiếp theo" / "học bài NN":

1. **Đọc `curriculum.json`** lấy mục tiêu, khái niệm, lab, checklist của bài đó.
2. **Dạy ngay trong chat trước** — giải thích, hỏi lại, để người học phản hồi.
   Không im lặng đi viết file rồi bảo "xong rồi, đọc đi".
3. **Viết `index.html`** theo đúng cấu trúc bài 00 (dùng nó làm mẫu), **chia tab** theo
   § Hệ thiết kế bên dưới:
   - Tab đầu `Vấn đề` — một tình huống có thật, cụ thể, đau
   - Các tab giữa — khái niệm, giải thích **vì sao** trước **cái gì**, theo § Giọng văn
   - Sơ đồ ASCII trong `<figure class="fig"><pre class="diagram">` có `<figcaption>` đánh số
   - Ít nhất một **bảng tra triệu chứng → nguyên nhân** nếu bài có liên quan sự cố
   - Tab `Lab` — lệnh chạy được trên WSL/Git Bash, có bước "tự gây lỗi rồi tự sửa"
   - Tab cuối — `Tự kiểm tra` (`<ul class="check">`), `Kết lại`, `Nguồn đọc thêm` (`<ol class="refs">`)
4. **Viết `README.md`** bản workbook rút gọn.
5. **Tạo `notes.md`** có sẵn chỗ trống cho người học điền output lab thật.
6. **Cập nhật `progress.json`** → chạy `node scripts/generate.mjs`.
7. **Commit** với message dạng: `Bài NN — <tiêu đề ngắn>`

## Nguyên tắc nội dung (quan trọng)

- **Problem → Concept → Tool.** Không bao giờ mở đầu bằng "Docker là...".
  Mở đầu bằng một vấn đề khiến ta cần Docker.
- **Luôn nối về bản đồ ở Bài 00.** Mỗi công cụ phải được gắn vào một chặng ①–⑨ cụ thể.
- **Mỗi lab phải có một bước cố tình gây lỗi**, rồi tự sửa. Gặp lỗi có chủ đích ở môi trường
  an toàn là cách duy nhất để sau này không hoảng khi gặp nó trên production.
- **Đừng liệt kê lệnh.** Giải thích cơ chế, rồi lệnh tự nhiên theo sau.
- **Trung thực.** Nếu một công cụ có nhược điểm (Kubernetes phức tạp, Cloudflare proxy có mặt trái)
  thì nói ra.
- Chỉ dẫn link tài liệu **chính thức** hoặc nguồn chắc chắn tồn tại. Không bịa URL khóa học.

## Giọng văn — học thuật, nhưng dễ hiểu (đổi 28/09/2026)

Người học yêu cầu: **học thuật càng nhiều càng tốt, dễ hiểu càng tốt, thà viết một đoạn
dài còn hơn ngắn gọn.** Áp dụng cho `index.html` và các trang phụ; `README.md` giữ khung
vở bài tập nhưng mỗi bước vẫn phải có câu giải thích *vì sao*.

1. **Mỗi khái niệm đi đủ năm nhịp:** (a) *đặt vấn đề* — vì sao khái niệm phải tồn tại;
   (b) *định nghĩa chính xác* — tên chuẩn tiếng Anh + tiếng Việt, và nguồn chuẩn nếu có
   (RFC, POSIX, man page, tài liệu chính thức); (c) *cơ chế* — chuỗi nhân quả từng bước,
   chuyện gì xảy ra ở tầng nào; (d) *ví dụ* — một ẩn dụ đời thường (mô hình tòa nhà…) **và**
   một ví dụ kỹ thuật thật (lệnh, output); (e) *hệ quả, giới hạn, ngoại lệ*, rồi nối về bản
   đồ 9 chặng.
2. **Viết thành đoạn văn liền mạch** với từ nối lập luận: *bởi vì, do đó, hệ quả là, nói cách
   khác, ngược lại, điều này dẫn tới*. Không dùng gạch đầu dòng cụt để thay cho lập luận;
   gạch đầu dòng chỉ dành cho thứ rời rạc thật (bước lab, checklist, danh sách lệnh).
3. **Dài nhưng không rối:** câu có thể dài, nhưng mỗi câu một ý chính. Định nghĩa thuật ngữ
   ngay lần đầu xuất hiện, không dùng thuật ngữ trước khi định nghĩa. Sau mỗi ý trừu tượng
   là một ví dụ cụ thể.
4. **Hình thức học thuật:** hình và bảng đánh số (*Hình 1*, *Bảng 2*) kèm chú thích; thuật
   ngữ quan trọng gom vào `<dl class="terms">`; cuối trang có *Nguồn đọc thêm* chỉ gồm nguồn
   chính thức (rfc-editor.org, man7.org, docs chính thức).
5. **Trung thực về độ chắc chắn:** phân biệt *luôn luôn* với *thường thì*. Năm, con số lịch
   sử, số hiệu RFC chỉ viết khi chắc chắn — không chắc thì bỏ, đừng bịa cho có vẻ học thuật.
6. Vẫn xưng **"bạn"**. Vẫn giữ các ẩn dụ đã dạy ở Bài 00 — học thuật không có nghĩa là bỏ ví dụ.

Trong **chat** vẫn giữ nhịp đối thoại (chia phần, hỏi, đợi) — nhưng phần giảng trước câu hỏi
cũng theo năm nhịp trên, không giảng cụt.

## Hệ thiết kế "Bauhaus" (đổi 28/09/2026 — thay cho neo-brutalism "Sổ thép")

Người học yêu cầu **một kiểu duy nhất**: không chế độ tối, không bảng màu thay thế, không nút
đổi giao diện. Toàn bộ nằm trong `assets/style.css` (đầu file có bảng luật) và `assets/app.js`
(tab, ô số bài ở đầu trang, checklist, nút chép lệnh).

**Luật, và nguồn của từng luật** (đã kiểm chứng trên trang thật, xem § Nguồn thiết kế):

1. **Phẳng.** Không bóng đổ, không gradient, không bo góc cho khối chữ nhật. Cấu trúc do
   **thanh kẻ đen dày** và **kích thước** tạo ra. Bóng offset cứng và viền dày quanh mọi thứ là
   dấu hiệu của *neo-brutalism* — đừng để chúng quay lại.
2. **Đỏ · vàng · lam + đen + giấy ngà.** Màu bão hoà chỉ chiếm **diện tích nhỏ** (thanh kẻ, ô
   nhãn, hình học) — "tương phản diện tích" của Itten. Không đặt chữ vàng trên nền sáng: vàng
   luôn là **nền** dưới chữ đen.
3. **Hình học mang chức năng.** Vốn hình: tròn, vuông, tam giác, nửa tròn, phần tư tròn, vòng
   khuyên, vòm, thoi, sọc, lá — ghép thành lưới ô vuông. Chúng đánh số tab, định danh module,
   định danh bài, mang số liệu — không bao giờ để trang trí suông:
   - **Ấn ký của bài**: lưới 4×4 ở đầu trang, `Bauhaus.glyph(số bài)` trong `app.js` sinh
     **cố định** từ số bài (cùng số → cùng hình ở mọi máy). Trang phụ của một bài dùng chung ấn ký.
   - **Bức tranh lộ trình** ở trang chủ: 43 ô, mỗi ô là mảnh đầu tiên của ấn ký bài đó
     (`Bauhaus.tile`). Chưa học = chỉ còn nét; học xong = tô màu; đang học = khung đen.
   - **Hình của module** cố định: `.shp.s-0` … `s-8` = tròn lam · vuông đỏ · tam giác vàng ·
     phần tư đen · vòm lam · vòng khuyên đỏ · thoi vàng · bán nguyệt đen · vuông rỗng lam.
     Tab và đầu tab xoay vòng 6 hình đầu.
   - `scripts/generate.mjs` **require chính `assets/app.js`** để lấy bộ sinh hình, nên phần
     đầu `app.js` phải giữ thuần (không chạm DOM trước dòng `module.exports`).
4. **Chữ thường** cho chữ hiển thị (h1, h2, tab, nhãn, chip) theo Herbert Bayer (1925); **thân
   bài viết hoa/thường bình thường** vì dễ đọc hơn. Code trong tiêu đề giữ nguyên hoa/thường.
5. **Bất đối xứng:** máy tính có cột tab dọc hẹp bên trái + cột đọc rộng bên phải; căn trái,
   không trục giữa.
6. **Chữ:** League Spartan (hiển thị, sans hình học) · Be Vietnam Pro (thân, grotesk trung tính
   vẽ cho tiếng Việt) · JetBrains Mono (code). Cả ba có subset vietnamese. Futura/Kabel **không
   phải** chữ của Bauhaus (chỉ lấy cảm hứng); **không dùng** font "ITC Bauhaus".
7. **Dễ đọc thắng thẩm mỹ** (Moholy-Nagy, 1923): lựa chọn nào làm khó đọc thì bỏ.
8. **Cấm dùng ký tự bàn phím làm icon** (người học yêu cầu 28/09/2026): không mũi tên ký tự,
   không chấm/vuông/tam giác ký tự, không dấu tick ký tự, không emoji, không số khoanh tròn
   trong chữ hiển thị (kể cả `data-note`, `data-tab`). Dùng icon **vẽ** có sẵn trong `style.css`:
   - mũi tên, tick, chéo: `<i class="ic ic-r"></i>` · `ic-l` · `ic-yes` · `ic-no`
     (trong câu thì thêm `role="img" aria-label="sang"`; trang trí thì `aria-hidden="true"`)
   - trạng thái: `<i class="stt stt-done"></i>` · `stt-doing` · `stt-todo`
   - số chặng của bản đồ 9 chặng: `<span class="stg">8</span>`
   - nút trước/sau: chữ trong `.dir` **không** kèm mũi tên — CSS tự vẽ; dấu tick của checklist
     cũng do CSS vẽ.
   Trong README (Markdown) thì **viết thành chữ** ("chặng 8", "7 tới 8", "dẫn tới").
   Ngoại lệ duy nhất: **nét vẽ bên trong sơ đồ ASCII** (`<pre class="diagram">`, khối ```) và
   **output thật** dán nguyên văn. Emoji thì cấm cả trong sơ đồ.

**Hình + màu = nghĩa** (theo bảng tương ứng của Kandinsky ở Weimar: vàng–tam giác, đỏ–vuông,
lam–tròn — một *quy ước* của trường, không phải cảm nhận phổ quát, nên luôn kèm chữ). Khối chú
thích dùng **thanh kẻ dày ở lề trái** như Moholy-Nagy đánh dấu đoạn cần chú ý:

| Class | Hình + màu | Dùng cho |
|---|---|---|
| `.callout.story` | chấm tròn đỏ lớn, không thanh kẻ | tình huống, câu chuyện mở bài |
| `.callout.define` | vuông đỏ | định nghĩa |
| `.callout` | tròn lam | nối với kiến thức cũ, mẹo |
| `.callout.deep` | vòng rỗng, thanh mảnh đen, chữ nhỏ | đào sâu học thuật: lịch sử, chuẩn, RFC |
| `.callout.ok` | khối đen, thanh vàng | ghim lại, nguyên tắc — mảng lớn tạo nhịp |
| `.callout.warn` | tam giác vàng | vấn đề, cảnh báo, thói quen phải bỏ |

Chip giữ tên lớp cũ nhưng nghĩa mới: `lime` = xong (lam) · `yellow` = đang học (vàng) ·
`pink`/`orange` = nhấn (đỏ) · `ink`/`violet` = đen. Trạng thái luôn kèm hình vẽ `.stt-*`:
tròn đặc = xong · tam giác = đang học · vòng rỗng = chưa học.

**Khung một trang bài** (chép nguyên, chỉ đổi nội dung):

```html
<head>
  …meta charset/viewport, <title>Bài NN — …</title>, <meta name="description">…
  <link rel="stylesheet" href="../../assets/style.css">
  <link rel="icon" href="../../assets/favicon.svg">
</head>
<body data-lesson="NN">
<nav class="topbar"><div class="topbar-inner">
  <a class="home" href="../../">devops-self-learning</a><span class="crumb">/ bai-NN</span>
  <span class="spacer"></span> <a class="nav" href="…">…</a>
</div></nav>
<div class="wrap">
  <header class="hero">
    <p class="eyebrow">Module X · Bài NN · ngày</p>
    <h1>Phần đầu tiêu đề: <span class="hl">phần được tô vàng</span></h1>
    <p class="lede">…</p>
    <div class="meta"><span class="chip yellow"><i class="stt stt-doing" aria-hidden="true"></i>Đang học</span>
      <a class="chip" href="…"><i class="ic ic-r" aria-hidden="true"></i> …</a></div>
  </header>
  <main class="tabs" data-tabs="Các phần của Bài NN">
    <section class="tab" id="van-de" data-tab="Vấn đề" data-note="ghi chú ngắn">…</section>
    <section class="tab" id="…" data-tab="…">…</section>
  </main>
  <nav class="prevnext"><a href="…">…</a><a class="next" href="…">…</a></nav>
  <footer class="page">…</footer>
</div>
<script src="../../assets/app.js"></script>
```

**Luật tab:** 4–7 tab một trang; mỗi tab một mạch ý trọn vẹn; nhãn tab ≤ 3 chữ; `id` của
section và của mọi tiêu đề bên trong phải **duy nhất** trong trang (link `#id` tự mở đúng tab).
JS tự vẽ thanh tab, đầu tab (ô số + tên) và nút "tab trước / tab tiếp" — **đừng viết tay**.
Không có JS thì mọi tab hiện nối tiếp nhau, trang vẫn đọc được.

Số bài của ấn ký lấy từ `body[data-lesson]` (chữ số đầu) — nhớ đặt đúng.

**Nút trang trước / trang sau ở góc phải topbar** do `app.js` dựng từ `<nav class="prevnext">` cuối
trang — chỉ cần viết `prevnext`, và **đừng** thêm link topbar trỏ trùng tới hai trang đó.

**Không viết `style="…"` inline** — cần thì thêm class vào `style.css`.

### Nguồn thiết kế (đã tải được, dùng khi cần trích)

- Hai bài người học đưa: beeart.vn (xu hướng web Bauhaus) · linearity.io/blog/bauhaus-design
- Kandinsky và cuộc khảo sát màu–hình ở Weimar: bauhauskooperation.de/wissen/das-bauhaus/lehre/unterricht/unterricht-wassily-kandinsky
- Xưởng in & quảng cáo, cải cách chữ: bauhauskooperation.de/wissen/das-bauhaus/lehre/werkstaetten/druck-und-reklame
- Itten, Kandinsky, Albers về màu: getty.edu/research/exhibitions_events/exhibitions/bauhaus/new_artist/form_color/color/
- Bauhaus thật sự dùng chữ gì; Universal, Futura, ITC Bauhaus: letterformarchive.org/news/bauhaus-typefaces-part-one/ và …-part-two/
- Moholy-Nagy, typophoto, "tempo", thanh kẻ lề trái: exhibitions.letterformarchive.org/bauhaus/walkthroughs/typophoto-in-moholy-nagy-s-painting-photography-film
- Mốc thời gian của trường: tate.org.uk/art/art-terms/b/bauhaus
- Vì sao neo-brutalism khác Bauhaus: nngroup.com/articles/neobrutalism/

## Trạng thái hiện tại

- **Bài 00: XONG** (21–24/09/2026). Có 3 trang: `index.html` (bài giảng),
  `phan-tich-output.html` (mổ băng output thật), `ipv4-vs-ipv6.html` (phụ lục).
  Dùng bộ ba trang này làm **khuôn mẫu** cho các bài sau.
- **Bài 01: ĐANG HỌC.** Lượt ① đã xong — `index.html`, `README.md`, `notes.md`, `lab/server.js`
  đã viết đầy đủ để người học đọc trước. **Còn phải làm lượt ③** (bồi đắp sau buổi đối thoại):
  chỗ hiểu sai, output lab thật, câu hỏi ngoài kịch bản.
- Kế tiếp: **Bài 02** — Dựng phòng lab (cài lại WSL Ubuntu + bật Docker Desktop)
- **28/09/2026: đổi giọng văn sang học thuật + chia tab mọi trang; giao diện qua hai lượt** —
  neo-brutalism "Sổ thép" rồi chốt **Bauhaus** (một kiểu duy nhất). Bài 00 (3 trang), Bài 01,
  trang chủ và 41 trang khung đều đã theo hệ mới. README gốc nhúng card `learning.svg` do repo
  profile `AnhTuan2111` vẽ (card đó vẫn kiểu neo-brutalism của profile) — **đừng tự vẽ card tiến
  độ thứ hai**.

### Khái niệm đã dạy ở Bài 00 — phải tái sử dụng, không định nghĩa lại

Người học đã nắm và đã dùng được những thứ sau. Các bài sau **nối vào** chúng:

- **Mô hình tòa nhà**: IP = cửa ngõ · port = phòng · process listen = người ngồi trong phòng,
  tự chọn tiếp khách từ cửa nào · firewall = bảo vệ ở cửa ngõ
- **Nginx = lễ tân**: nhận việc, đi vào trong hỏi giúp, bê kết quả ra. Khách không vào trong.
- **Bản đồ 9 chặng** ①–⑨, và "chỉ chặng ⑧ là code bạn viết"
- **Bảng triệu chứng có cột "ai viết ra"** — 502 do Nginx viết, 500 do Spring Boot viết
- 3 nguyên tắc: *mã HTTP là một câu trả lời* · *triệu chứng chứng minh chặng trước đã chạy tốt* ·
  *sửa một tầng thì triệu chứng đổi*
- **refused vs timeout**: refused có điểm kết thúc của riêng nó; timeout dài bằng con số ta chọn
- **Chứng chỉ = căn cước, CA = Bộ Công an**; cert công khai / private key bí mật
- **DNS là gốc rễ của lòng tin** — nắm DNS là xin được cert hợp lệ
- **Hệ thống hỏng mà không ai đụng vào** — thời gian tự nó là nguyên nhân sự cố
- `"container đang chạy"` ≠ `"app sẵn sàng"`

### Môi trường — đã thay đổi so với lúc khởi tạo

- **WSL Ubuntu đã bị gỡ.** `wsl -l -v` chỉ còn distro `docker-desktop` (không có bash).
  Cài lại ở **Bài 02** — đó đúng là nội dung của bài đó, không phải sự cố.
- **Docker Desktop chưa chạy** (daemon không kết nối được). Bật ở Bài 02.
- Người học đang dùng **Git Bash** cho mọi lab. Git for Windows biên dịch `curl` dựa trên
  **schannel**, nên `curl -v` KHÔNG in thông tin chứng chỉ → dùng `openssl s_client` thay thế.
- IP LAN thay đổi giữa các buổi (DHCP) — đừng ghi cứng địa chỉ vào tài liệu.

### Nợ kỹ thuật của bài học

- **Bài 02**: chạy `time curl -4 -o /dev/null http://127.0.0.1:9999` trong WSL Ubuntu và
  so với **2,155s** đo được trên Windows. Đây là thí nghiệm đối chứng đã hứa với người học.
- GitHub Pages: phục vụ từ nhánh `main`, thư mục gốc.
  Ở **Bài 31** sẽ thay bằng workflow GitHub Actions thật — đó là bài lab CI/CD đầu tiên,
  nên **đừng tạo sẵn** `.github/workflows/` trước bài đó.

## Lưu ý kỹ thuật

Token `gh` hiện tại **không có scope `workflow`**, nên mọi push đụng vào `.github/workflows/`
sẽ bị GitHub từ chối. Đúng lúc bắt đầu **Bài 31**, chạy:

```bash
gh auth refresh -s workflow
```

Đây không phải sự cố — nó là một bài học nhỏ về OAuth scope, nên giải thích cho người học
khi nó xảy ra thay vì lặng lẽ xử lý.
