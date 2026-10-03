# CLAUDE.md — Quy ước làm việc trong repo này

Đây là **nhật ký học DevOps** của AnhTuan2111, không phải một dự án phần mềm.
Claude đóng vai người dạy kèm: mỗi phiên dạy một bài, rồi ghi bài đó lại thành tài liệu.

## Bối cảnh người học

- Nền tảng: **Java / Spring Boot backend**. Biết code, **chưa biết gì về hạ tầng**.
- Máy: **Windows 11 + WSL2 (Ubuntu) + Docker Desktop**, Java 25, Node 24, Git Bash.
- Mục tiêu: hiểu sâu + thực hành thật, **không** cày cho xong.
- Người học muốn **vào Docker càng sớm càng tốt, không lan man**; lộ trình Docker tới Kubernetes
  là quyết định của người học.
- **Viết cho bất kỳ ai đọc** (người học yêu cầu 30/09/2026): tài liệu phải dùng được cho mọi người
  mới bắt đầu, không phải nhật ký riêng. Xưng "bạn" để nói với người đọc thì được, nhưng không gán
  cho người đọc hoàn cảnh riêng của một người cụ thể.
- **Người viết xưng "tôi"** (người học cho phép 03/10/2026: "coi như là tôi tự viết ra những dòng đó"):
  "tôi" là chủ repo, "bạn" là người đọc. Dùng ở chỗ nói về output thật ("trên máy tôi ngày …"), ảnh tự
  chụp ("do tôi tự chụp"), giả thuyết và chỗ hiểu sai **đã thật sự xảy ra** (có trong `notes.md`,
  `progress.json` hoặc buổi học). **Không bịa trải nghiệm ngôi thứ nhất.** Bảng hiểu sai chỉ đặt cột
  "Tôi từng nghĩ" khi mọi dòng đều là chỗ đã hiểu sai thật; bảng trộn thì dùng "Dễ nghĩ là".
- Nhịp học: linh hoạt. Không ép theo lịch — học được tới đâu ghi tiến độ tới đó.
- Ngôn ngữ: **viết mọi tài liệu bằng tiếng Việt.** Giữ nguyên thuật ngữ kỹ thuật
  tiếng Anh (reverse proxy, container, volume…) vì đó là từ sẽ gặp trong tài liệu thật.

## Lộ trình

**41 bài (00–40), 6 module**, đích đến ghi ở `meta.goal` của `curriculum.json`. Không nhắc lại
hay so sánh với bất kỳ lộ trình nào trước đây, ở bất cứ trang nào:

| Module | Bài | Nội dung |
|---|---|---|
| M0 Nền tảng tối thiểu | 00–04 | bản đồ chín chặng · IP/port/listen/firewall · chẩn đoán theo chặng · process/kernel · phòng lab + shell |
| M1 Docker | 05–15 | vào **ngay sau phòng lab**; Linux và mạng dạy đúng lúc trong từng bài Docker |
| M2 Server thật | 16–20 | SSH, Linux trên server, deploy tay bằng Compose, Nginx, tên miền + HTTPS — trên một server Linux thật |
| M3 CI/CD với GitLab | 21–25 | tự động hoá đúng những bước đã làm tay ở M2 |
| M4 Kubernetes | 26–34 | mỗi khái niệm nối về một bài Docker (pod về container, Service về DNS…) |
| M5 Rancher và vận hành | 35–40 | Rancher, deploy lên cụm từ GitLab/GitOps, metric, log, cảnh báo, sự cố, tổng kết |

**Chuỗi câu hỏi** (người học yêu cầu 03/10/2026: "đọc theo hướng tịnh tiến thì càng ngày càng phải mở
ra được câu trả lời, dẫn dắt người đọc tới một đáp án cụ thể và lại mở ra một câu hỏi mới để bài tiếp
theo trả lời"). Mỗi bài trong `curriculum.json` có **`question`** (câu hỏi bài trả lời) và **`answer`**
(đáp án cụ thể bài dẫn tới); `question` của bài N+1 phải mọc ra từ `answer` của bài N. `generate.mjs`
dừng nếu thiếu, và trang khung tự hiện "Từ bài trước · Câu hỏi của bài · Bài này dẫn tới · Câu hỏi cho
bài sau". Sửa lộ trình thì sửa cả chuỗi cho liền mạch.

Mỗi bài có trường **`needs`**: danh sách bài phải học trước, **chỉ được trỏ về bài đứng trước**
(`generate.mjs` dừng nếu sai). Trang khung và README khung hiện mục "Cần đã học trước". Khi viết một
bài, mọi khái niệm của các bài trong `needs` được dùng lại và gọi đúng tên — xem luật Học tuần tự.

**Thông tin riêng của người học không bao giờ vào repo** — repo này công khai, kể cả `notes.md` và
chính tệp CLAUDE.md này. Nơi làm việc, tên server, IP, tên miền nội bộ, hệ thống thật đang vận hành,
output lab có địa chỉ thật: chỉ ghi vào `*.rieng.md` hoặc thư mục `rieng/` (đã có trong `.gitignore`), hoặc
bộ nhớ riêng của Claude (nằm ngoài repo). Bài giảng chỉ dùng tình huống đã khái quát hoá ("một service
khởi động chậm bị giới hạn CPU"), không nêu tên hệ thống thật.

### Xương sống bắt buộc của một trang bài (03/10/2026)

Bài 00 cũ rời rạc vì 13 mục đứng cạnh nhau như 13 bài nhỏ, không câu hỏi dẫn đường; Bài 01 cũ dễ
theo vì có ba câu hỏi đầu bài và các tab đi theo một chuỗi nhân quả. Từ nay mọi trang bài theo khung:

1. **Tab `van-de`**: đoạn nối "Bài trước kết thúc ở câu hỏi: …" (nguyên văn `question`, link tới
   `#cau-hoi-tiep` của bài trước) · tình huống cụ thể · câu hỏi của bài chia 2–4 câu hỏi con (một danh
   sách ngắn; **không** kèm bảng "câu hỏi nào trả lời ở tab nào" — bỏ 03/10/2026 vì nó để lộ khung xương và
   bắt người đọc nhớ số câu) · mục **`#can-hoc-truoc`** (khái niệm dùng lại, link về đúng tab).
2. **Mỗi tab giữa** mở bằng một câu tự nhiên nối với câu hỏi nó trả lời; kết bằng khối
   `<div class="callout ok"><span class="label">Chốt</span>…</div>`: tối đa ba câu ngắn, rồi một câu hỏi
   tự nhiên dẫn sang tab sau. Gọi câu hỏi bằng nội dung của nó, không bằng số ("câu 2", "câu hỏi thứ ba").
3. **Tab cuối `ket`**: Tự kiểm tra · Những chỗ hay hiểu sai · Kết lại (trả lời trọn câu hỏi, khớp
   `answer`) · khối **`#cau-hoi-tiep`** nêu nguyên văn `question` của bài sau, vì sao đáp án vừa có lại
   sinh ra câu hỏi đó, và link sang bài sau · Nguồn đọc thêm · Nguồn ảnh.
4. Trang chính 5.000–7.500 chữ; trang phụ ≤ 4.000 chữ. Một bài quá dài, nhiều chủ đề → **tách bài**
   (như Bài 00 cũ thành 00, 01, 02), đừng nhồi.

**Phụ lục lịch sử** (người học gợi ý 03/10/2026, "đôi khi"): một trang phụ cho công nghệ có lý do ra
đời đáng kể — vấn đề trước khi có nó → các cách giải trước và giới hạn → nó giải quyết đúng điều gì →
dấu vết còn lại tới nay → nối về bài chính. Hero ghi "Phụ lục · đọc thêm, không bắt buộc". Đã có:
`00/lich-su-devops.html`, `01/ipv4-vs-ipv6.html`, `03/lich-su-he-dieu-hanh.html`, `04/lich-su-wsl.html`.

**Trang bìa ít chữ** (người học phản ánh 30/09/2026: người mới đọc bìa thấy dài và rối thì nản):
trang chủ, README của repo, trang khung của bài, câu giới thiệu module — mỗi chỗ một hai câu, không
thuật ngữ khó. **Không đưa ghi chú tự nhắc lên trang** (lý do xếp thứ tự module, quy trình viết hai
lượt, cách ghi `progress.json`…): đó là việc của người viết, để trong CLAUDE.md.

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

### Thời lượng bài (sửa 30/09/2026)

Mỗi bài có `"hours": [ít, nhiều]` trong `curriculum.json` — **giờ học thật cho trọn một bài**,
không phải thời gian giảng (Bài 00 cũ kéo dài 4 ngày; riêng `index.html` của Bài 03 khoảng 10.000 chữ,
đọc kỹ một lượt đã mất 1–1,5 giờ). Thời lượng cộng từ bốn phần ghi
ở `meta.time.parts`: đọc trước 1–2 giờ · đối thoại 1,5–3 giờ · lab (kể cả bước tự gây lỗi) 1–3 giờ
· ghi notes và bồi tài liệu 0,5–1 giờ. Bài nhẹ 2–5 giờ; bài nhiều mảnh ghép 5–8 giờ. Khi
có thời gian thật của một bài, hiệu chỉnh các bài cùng loại theo đó — đừng giữ con số cũ cho đẹp.

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
   **Đáp án chỉ được dựa vào những phần người học ĐÃ học** (người học cấm 30/09/2026, sau khi bị
   hỏi một câu cần SSH và tín hiệu SIGHUP — hai thứ chưa dạy — và gọi đó là "đánh đố"). Trước khi
   gửi câu hỏi, viết sẵn đáp án, liệt kê mọi khái niệm **và cơ chế** mà đáp án dùng, rồi đối chiếu
   từng cái với các bài trong `needs` và các phần đã học của bài đang học. Thiếu một cái thì bỏ câu.
3. **Dừng lại. Đợi trả lời.** Không dạy tiếp khi chưa có phản hồi.
4. Đọc câu trả lời để tìm **chỗ hiểu sai**, giảng lại đúng chỗ đó, rồi mới sang phần sau.
5. Trả lời đúng thì xác nhận ngắn gọn rồi đi tiếp — không khen dài dòng.
6. Hết các phần mới tới lab, rồi mới viết/chốt tài liệu.

### Từ Bài 03 trở đi: viết NHÁP TRƯỚC, dạy, rồi BỒI ĐẮP

Người học đã đổi nhịp (25/09/2026). Quy trình giờ là **hai lượt viết**:

```
① Viết index.html + README.md + notes.md ĐẦY ĐỦ ngay khi bắt đầu bài
   → người học đọc trước, có ngữ cảnh, đỡ phải hỏi lại từ đầu
② Dạy theo đối thoại như trên (chia phần, hỏi, đợi, sửa chỗ sai)
③ Viết LẠI tài liệu lần hai, bồi thêm những gì chỉ buổi học mới sinh ra:
   - chỗ người học hiểu sai + cách đã giảng lại
   - output lab THẬT trên máy họ
   - câu hỏi họ tự nghĩ ra ngoài kịch bản
   - trang phụ nếu một nhánh đào quá sâu (như ipv4-vs-ipv6.html ở Bài 01)
```

Lượt ② vẫn là phần quan trọng nhất. Lượt ① chỉ là nền — **đừng coi viết xong lượt ① là
xong bài**, và trong chat vẫn phải hỏi để phát hiện chỗ hiểu sai, không đọc lại tài liệu.

Người học tự đọc `index.html` của bài song song để đối chiếu. Vì vậy trong chat **đừng đọc lại
nguyên văn tài liệu** — trong chat thì hỏi, ví dụ hóa, và sửa chỗ hiểu sai.

## Cách dạy một bài mới

Khi người học nói "dạy bài tiếp theo" / "học bài NN":

1. **Đọc `curriculum.json`** lấy mục tiêu, khái niệm, lab, checklist và `needs` của bài đó — rồi
   đọc lại các bài trong `needs` để biết người học đã được giới thiệu những khái niệm nào.
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

- **Học tuần tự — không dùng một thuật ngữ trước khi nó được giới thiệu** (người học yêu cầu
  30/09/2026: "đọc một lèo có 2–3 thuật ngữ chưa gặp bao giờ thì cả đoạn chả đọng lại gì"). Khi viết,
  hình dung người đọc **chỉ biết code Java/Spring Boot cộng những gì các bài TRƯỚC đã dạy** — không
  hơn. Thuật ngữ hạ tầng nào xuất hiện lần đầu thì phải được giới thiệu ngay tại đó bằng lời thường
  (1–2 câu, kèm "học kỹ ở Bài NN" nếu nó có bài riêng), hoặc **thay bằng lời thường** nếu đoạn văn
  không thật sự cần nó. Một đoạn văn không chứa quá **một** thuật ngữ mới. Bài sau gọi lại tên khái
  niệm của bài trước ("kernel — phần lõi hệ điều hành đã gặp ở Bài 03 — …") để kiến thức nối thành
  chuỗi theo thời gian, không phân mảnh. Lượt soát 30/09/2026 đếm được 78 thuật ngữ dùng trước khi
  giới thiệu ở Bài 00 và 01 cũ, tức Bài 00–03 bây giờ (tệ nhất: "gói tin" dùng 44 lần mà không trang nào định nghĩa).
- **Không có mục lạc đề** (người học cấm 30/09/2026: "một bài học cấu trúc phải chặt chẽ, ràng buộc
  và liên kết với nhau"). Mỗi `h2`/`h3`, mỗi khối chú thích, kể cả khối "Đào sâu", phải trả lời
  được: *nó phục vụ câu hỏi nào ở tab `Vấn đề`, hoặc mục tiêu nào trong `curriculum.json`?* — và
  **câu nối đó phải viết ra trên trang**, không để người đọc tự đoán. Không trả lời được thì bỏ.
  Nội dung đúng nhưng thuộc bài khác thì **chuyển sang bài đó** (ghi vào `concepts` của bài đó trong
  `curriculum.json`), không giữ lại làm "kiến thức tặng thêm". Các dạng đã mắc: giải nghĩa bù một
  lệnh của bài trước (`2>/dev/null` ở Bài 03 — chỗ đúng là Bài 04); dạy trước công cụ của bài sau
  (`docker stop`, cấu hình Kubernetes trong Bài 03); khối "Đào sâu" mở ra chủ đề mới thay vì đào sâu
  đúng khái niệm vừa giảng (zombie, capabilities). Viết xong một bài, soát lại từng mục theo câu hỏi
  trên trước khi đưa người học đọc.
- **Problem → Concept → Tool.** Không bao giờ mở đầu bằng "Docker là...".
  Mở đầu bằng một vấn đề khiến ta cần Docker.
- **Luôn nối về bản đồ ở Bài 00.** Mỗi công cụ phải được gắn vào một chặng cụ thể của bản đồ, và
  **gọi chặng bằng tên, không bằng số** (người học yêu cầu 03/10/2026: "những cái chặng sử dụng số thì
  làm sao ai mà nhớ cho hết được, sử dụng lời văn để miêu tả"). Viết "bước hỏi DNS", "bước mở kết nối",
  "bước bắt tay TLS", "firewall", "Nginx", "ứng dụng", "database", "phía máy người dùng / phía server",
  "mọi bước trước khi request tới Nginx", "đoạn Nginx chuyển request vào ứng dụng"; câu nền của Bài 00 là
  "trong cả đường đi, chỉ ứng dụng là code bạn viết". Cấm "chặng 8", "chặng 2 tới 6", lớp `.stg`, và mọi
  hệ đánh số khác bắt người đọc giữ một bảng tra trong đầu (kiểu "mảnh 3a/3b/3c", "điều kiện 1/2/3").
  Bước của một quy trình hay chuỗi nhân quả đọc một lần theo thứ tự (lab, bảy bước từ RAM cạn tới 502)
  thì được đánh số.
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

1. **Mỗi khái niệm đi đủ năm nhịp, ĐÚNG THỨ TỰ NÀY:** (a) *đặt vấn đề* — vì sao khái niệm
   phải tồn tại; (b) *định nghĩa chính thức* — tên chuẩn tiếng Anh + tiếng Việt, phát biểu
   bằng thuật ngữ kỹ thuật, kèm nguồn chuẩn nếu có (RFC, POSIX, man page, tài liệu chính
   thức); (c) *cơ chế* — chuỗi nhân quả từng bước, chuyện gì xảy ra ở tầng nào; (d) *ví dụ* —
   trước hết một ví dụ **kỹ thuật thật** (lệnh, output), **sau đó** — nếu thật cần — mới tới ẩn dụ;
   (e) *hệ quả, giới hạn, ngoại lệ*, rồi nối về bản đồ 9 chặng.

**Bớt ẩn dụ, chính xác trước, kể chuyện linh hoạt** (người học yêu cầu 03/10/2026, ghi đè các điểm
"không bỏ ẩn dụ" bên dưới): **tối đa MỘT khối ẩn dụ mỗi trang**, chỉ cho khái niệm trung tâm. **Không
ví von trang trí** trong văn xuôi, tiêu đề, nhãn tab, chú thích ("sổ phòng", "người ngồi trong phòng",
"cửa ngõ", "lễ tân khổng lồ", "kẻ sát nhân", "cái hộp"…) — viết thẳng bằng thuật ngữ ("bảng các port
đang listen do kernel giữ"). Giọng vẫn là người dạy kể chuyện: dẫn bằng tình huống, câu hỏi, nhân quả.
Ẩn dụ đang giữ: Bài 01 tòa nhà · Bài 02 lễ tân · Bài 03 người – mặt bàn – tủ.

### Luật ẩn dụ (người học yêu cầu 29/09/2026)

> **Định nghĩa chính thức đi trước. Ẩn dụ đi sau, và phải được gọi đúng tên là ẩn dụ.**

Người học phản ánh: các trang cũ "bụp một phát ẩn dụ luôn" — mở mục bằng *mô hình tòa nhà*,
*cái tủ hồ sơ*, *tấm căn cước*, rồi mới hạ định nghĩa xuống dưới. Từ nay làm ngược lại.

- **Cấm mở một mục bằng ẩn dụ.** Đoạn đầu và tiêu đề `h2`/`h3` phải dùng **thuật ngữ thật**
  (*"Bốn khái niệm nền: địa chỉ IP, port, listen, firewall"*), không dùng tên ẩn dụ
  (*"Mô hình tòa nhà"*). Nhãn tab cũng vậy.
- **Thứ tự bắt buộc trong một mục:** vấn đề → `<dl class="terms">` định nghĩa →
  cơ chế → ví dụ kỹ thuật thật → **rồi mới** ẩn dụ.
- **Ẩn dụ phải nằm trong khối riêng, có nhãn tự khai báo** — `<h3>` bắt đầu bằng
  *"Ẩn dụ hỗ trợ ghi nhớ: …"*, hoặc `<div class="callout">` có `<span class="label">Ẩn dụ …</span>`.
  Người đọc phải biết ngay mình đang đọc một phép so sánh, không phải một sự thật kỹ thuật.
- **Mỗi ẩn dụ phải kèm giới hạn của nó** — một câu nói rõ chỗ nào nó *không* còn đúng
  (ví dụ: "phòng" gợi ý port là không gian vật lý, thực tế nó chỉ là một con số 16 bit trong
  header). Khi ẩn dụ và định nghĩa mâu thuẫn, **định nghĩa thắng**.
- (Đã thay bằng luật "bớt ẩn dụ" ở trên: tối đa một khối mỗi trang.)
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
6. Vẫn xưng **"bạn"**. Học thuật không có nghĩa là bỏ ví dụ: mỗi ý trừu tượng đi kèm một ví dụ kỹ thuật thật.

### Đọc như một con người, không chỉ như máy soát lỗi (03/10/2026)

Người học bảo đọc lại Bài 00–03 "với góc nhìn của một người đang mông lung, chưa bao giờ hiểu DevOps là
gì, và với góc nhìn của con người". Lượt đọc ấy tìm ra những lỗi mà mọi script kiểm tra đều bỏ qua; từ
nay **sau mỗi lần sửa một bài, đọc lại bài đó bằng đúng hai góc nhìn này** trước khi báo xong:

1. **Người mông lung:** tên khoá học (DevOps) phải được định nghĩa ngay bài đầu, bằng lời thường (đã
   làm: Bài 00 tab Phía server `#devops` + phụ lục lịch sử). Bài "bản đồ" phải nhẹ; chi tiết sâu chuyển
   về bài có nó (SNI, các loại máy chủ DNS → Bài 20). Con số sẽ lệch theo thời gian (hạn chứng chỉ…) phải
   nói rõ là của ngày đo.
2. **Con người:**
   - **Không để lộ khung xương.** Cấm câu mở tab rập khuôn "Tab này trả lời câu N…" và nhãn "Còn treo:".
     Vẫn nói tab trả lời câu hỏi nào, nhưng mỗi tab mở một kiểu: một câu hỏi, một chi tiết của tình
     huống, một câu gọi lại bài trước. Cuối khối Chốt là một câu hỏi tự nhiên, không nhãn.
   - **Không phán xét người đọc.** Cấm "người mới hay…", "người thiếu kinh nghiệm…", "phần lớn lập trình
     viên…". Viết "rất dễ nghĩ…", "cách nghĩ này nghe hợp lý vì…, nhưng…". Cột bảng hiểu sai: "Dễ nghĩ
     là" (hoặc "Tôi từng nghĩ", xem trên).
   - **Không nhân vật nhật ký.** Không "người học", "máy người viết", "trong buổi học" trên trang bài;
     dùng "tôi" như trên. Đầu trang không ghi ngày học.
   - **Không lặp nguyên văn giữa các bài**: cùng một dòng hiểu sai, cùng một ảnh, chỉ ở một bài (bài sau
     link về). Câu trích nổi (`blockquote.pull`) không đặt sát câu gốc của nó.
   - **Văn phong đều tay giữa các bài:** dấu gạch dài dùng dè dặt (ưu tiên dấu phẩy, ngoặc, hai chấm);
     không nhấn mạnh bằng chữ in hoa, kể cả trong ô bảng, nhãn khối và sơ đồ (dùng `<strong>` dè dặt).
   - **Viết như một nhà văn, nhà khoa học, một người làm DevOps; không viết kiểu máy** (người học yêu cầu
     03/10/2026: "đừng viết kiểu AI slop, đừng giật gân quá, đừng bịa và hạn chế ẩn dụ"). Câu khẳng định
     thẳng, mỗi câu một ý, từ nối nhân quả, ví dụ thật sau mỗi ý trừu tượng. Cấm: đối lập tu từ "không phải
     X, mà là Y" (trừ khi đang sửa một cách hiểu sai có thật); câu châm ngôn khép đoạn ("Tấm bản đồ chỉ thật
     sự thuộc về bạn khi…", "Người viết code hỏi…; người vận hành hỏi thêm…"); nhãn và lời giật gân ("lý do
     cả nghề DevOps tồn tại", "Câu phải thuộc", "bằng chứng toán học", "bất ngờ", "kẻ…", "chân dung…");
     hình ảnh trang trí ("hai người anh em", "tin tốt một nửa", "mổ băng", "hết kiên nhẫn", "lời trăng
     trối"). Con số, năm, trích dẫn, định nghĩa chuẩn phải kiểm được nguồn trước khi viết; đã có chuẩn thì
     dẫn chuẩn (ví dụ định nghĩa DevOps lấy từ IEEE 2675-2021, không tự nói "DevOps không có chuẩn").

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
   - **Bức tranh lộ trình** ở trang chủ: mỗi bài một ô (39 ô), mỗi ô là mảnh đầu tiên của ấn ký bài đó
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
   - (lớp `.stg` đánh số chặng đã bỏ 03/10/2026: chặng gọi bằng tên, xem § Nguyên tắc nội dung)
   - nút trước/sau: chữ trong `.dir` **không** kèm mũi tên — CSS tự vẽ; dấu tick của checklist
     cũng do CSS vẽ.
   Trong README (Markdown) thì **viết thành chữ** ("dẫn tới", "sang").
   Ngoại lệ duy nhất: **nét vẽ bên trong sơ đồ ASCII** (`<pre class="diagram">`, khối ```) và
   **output thật** dán nguyên văn. Emoji thì cấm cả trong sơ đồ.
9. **Sơ đồ ASCII phải thẳng cột tuyệt đối** (người học chỉ ra khung vỡ 30/09/2026):
   - Font code là **JetBrains Mono bản đầy đủ tự host** (`assets/fonts/`). Đừng quay lại lấy
     nó từ Google Fonts — subset của Google thiếu ký tự kẻ khung và mũi tên, trình duyệt phải
     mượn font khác có ô chữ hẹp hơn, khung lệch.
   - **Không dùng số khoanh tròn trong sơ đồ** — font code không có chúng. Đánh số bước bằng
     chữ số thường ("1 Trình duyệt…").
   - **Không vẽ khung bọc trọn cả sơ đồ** ("bảng trong bảng") — `<pre>` đã có viền riêng.
     Chỉ vẽ khung khi nó phân vùng ý nghĩa (máy người dùng / VPS, user space / kernel).
   - Viết xong sơ đồ thì chạy `node scripts/check-diagrams.mjs` (thêm `--fix` để tự bù dấu cách).

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
  <span class="spacer"></span> <a class="nav" href="…">…</a>   ← chỉ link trang phụ/phụ lục của bài
</div></nav>
<div class="wrap">
  <header class="hero">
    <p class="eyebrow">Module X · Bài NN</p>
    <h1>Phần đầu tiêu đề: <span class="hl">phần được tô vàng</span></h1>
    <p class="lede">…</p>
    <div class="meta"><span class="chip yellow"><i class="stt stt-doing" aria-hidden="true"></i>Đang học</span>
      <span class="chip">3–5 giờ học</span> <span class="chip">Lab: Git Bash</span>
      <a class="chip" href="…"><i class="ic ic-r" aria-hidden="true"></i> Phụ lục: …</a></div>
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

**Bài giảng thiết kế như một quyển sách giáo khoa, một bài báo hay một tạp chí** (người học,
30/09/2026): trải nghiệm thị giác của người đọc được ưu tiên **ngang** với nội dung truyền tải.

**Bộ nhớ đệm trình duyệt:** GitHub Pages cho trình duyệt giữ CSS/JS tới 10 phút, nên HTML mới
có thể bị vẽ bằng CSS cũ và trông như vỡ giao diện (người học đã gặp 30/09/2026). `generate.mjs`
gắn `?v=<hash nội dung>` vào đường dẫn `style.css`/`app.js` của **mọi** trang (trang viết tay chỉ
bị sửa đúng tham số đó) — nên **sau khi sửa CSS/JS, luôn chạy `node scripts/generate.mjs`**. Khi
người học báo giao diện lạ ngay sau một lần deploy, hỏi họ tải lại cứng (Ctrl+F5) trước khi sửa.

### Ảnh minh hoạ (người học yêu cầu 30/09/2026)

**Mỗi bài phải có nhiều ảnh minh hoạ hoặc ảnh tham chiếu**, không chỉ chữ và sơ đồ ASCII:
trang bài giảng chính tối thiểu **4 khối ảnh**, mỗi trang phụ tối thiểu **2**.

**Loại ảnh người học muốn** (nói rõ 04/10/2026): ảnh **đồ vật** và ảnh **dẫn chứng** (hình và bảng trong
văn bản chuẩn, sổ đăng ký, giao diện thật). Hai thứ cần tránh:
- **Ảnh mà bên trong là cả đoạn văn**: hạn chế. Mấy câu cần dẫn thì trích thành chữ thật
  (`<figure class="fig"><blockquote class="src" lang="en">…</blockquote><figcaption>…nguồn, ngày đọc…`),
  bảng thì dựng bằng bảng HTML. Đã thay theo cách này: trang DORA (phụ lục Bài 00), định nghĩa 5xx của
  RFC 9110 (Bài 02), man page stdin(3) (Bài 04), hai bài viết về WSL năm 2016 và 2019 (phụ lục Bài 04).
- **Ảnh có dấu tick, dấu chéo kiểu emoji** (người học gọi ảnh bảng so sánh WSL 1 và WSL 2 là "AI slop",
  03/10/2026): dựng lại thành bảng HTML với icon vẽ `ic-yes` / `ic-no`.

Khung đánh dấu đỏ/lam/vàng trên các ảnh dẫn chứng còn lại thì **giữ**. Khi người học chê một ảnh, sửa đúng
ảnh đó và hỏi cho rõ lý do trước khi áp dụng rộng (04/10/2026: đã từng suy rộng thành "bỏ mọi ảnh chụp
chữ", đổi 20 ảnh, và người học phải hoàn tác). Sau lần thay trên, Bài 02, Bài 04 và phụ lục WSL đang ít
ảnh hơn số tối thiểu; có thêm ảnh đồ vật hay dẫn chứng không là việc người học quyết. Quy trình bắt buộc:

1. **Nguồn** — chỉ hai loại: (a) Wikimedia Commons, giấy phép CC0 / public domain / CC BY /
   CC BY-SA (`node scripts/anh/commons.mjs tim "…"` rồi `lay "File:…"` — lưu kèm giấy phép);
   (b) **tự chụp màn hình** từ trang công khai (RFC, man7.org, IANA, crt.sh…) hoặc từ **phần
   mềm chạy thật trên máy** (như trang lỗi Nginx ở Bài 02 — chạy Nginx thật để lấy 404/502/504).
   Không dùng ảnh không rõ giấy phép. Trang chặn bot (403) thì **không vượt**, tìm bản khác.
2. **Tùy biến theo phong cách bài** (`python scripts/anh/hau-ky.py`): ảnh chụp thật chuyển hai
   tông mực `#151515` / **mặt đọc `#fffdf8`** — tông sáng phải trùng `--surface` của khung tab, nơi
   mọi ảnh nằm, **không phải** `--paper` `#f3eee4` của nền trang (dùng `--paper` thì nền ảnh thành ô
   be nhạt trên mặt đọc; đã mắc 30/09/2026). **Người học đã chốt kiểu này** (30/09/2026, sau khi xem thử bốn kiểu: hai tông,
   màu gốc, màu dịu, tuỳ từng ảnh): ảnh màu gốc bị lạc vì màu không nhất quán với phong cách, và
   màu ảnh tranh với đỏ/vàng/lam mang nghĩa của trang. Đừng đề xuất lại ảnh màu cho ảnh chụp thật.
   **Ảnh chụp đồ vật có nền cũ** (xám, chuyển sắc, có bóng, có viền màu) phải **tách nền** trước
   (`scripts/anh/tach-nen.py`, bốn cách — đọc đầu tệp để chọn), để sau hai tông nền thành đúng màu
   mặt đọc, không còn "ô nền" lạc trên trang. Xem tận mắt mặt nạ: mô hình tách nền hay bỏ mất nhãn chữ,
   đế trưng bày, và hỏng với vật dài mảnh. **Không** tách nền ảnh chụp cảnh (trung tâm dữ liệu,
   bảo tàng, chân dung) — nền ở đó là thông tin. Ảnh chụp màn hình giữ màu (`--giu-mau`) và được đánh dấu bằng khung
   đỏ/lam/vàng (`scripts/anh/danh-dau.js`, chạy qua Playwright). **Không vẽ nhãn chữ vào ảnh**
   (người học phản ánh 30/09/2026): ảnh hiện ở 2/3 cột nên chữ vẽ trong ảnh nhỏ lại tới mức không
   đọc được. Nói khung nào là gì ngay trong chú thích, bằng ô màu vẽ bằng CSS:
   `<span class="kw"><i class="key k-red" aria-hidden="true"></i>từ đầu</span>` (`k-blue`, `k-yellow`).
   Chụp màn hình ở **mật độ 2×** (`deviceScaleFactor: 2`), viewport đủ rộng để không dòng nào bị
   cắt, và vùng chụp phải bao trọn mọi dòng (dòng giữa có thể dài hơn dòng đầu/cuối). Ẩn bớt
   hàng/cột thì ẩn **theo tên cột**, không theo chỉ số, và ghi rõ đã ẩn gì ở mục "Nguồn ảnh".
3. **Kiểm tận mắt hai lần**: xem ảnh gốc để chắc nó đúng là thứ chú thích nói (loại ngay ảnh
   sai đời, sai loại — như card mạng ISA không có cổng RJ45); rồi chụp lại trang sau khi đặt
   ảnh, ở **máy tính và điện thoại**, để kiểm bố cục và độ đọc được của chữ trong ảnh.
4. **Chú thích** đánh số riêng **"Ảnh N"** (sơ đồ vẫn là "Hình N"), nói ảnh chứng minh điều gì
   cho bài — không chỉ tả ảnh; mọi khẳng định trong chú thích phải kiểm được. **Không** đặt dòng
   nguồn dưới ảnh (người học yêu cầu 30/09/2026 — nó làm rối trang). Nguồn gom vào mục
   **"Nguồn ảnh"** (`<h2 id="nguon-anh">` + `<ol class="photo-credits">`) ở **cuối tab cuối
   cùng** của trang, mỗi dòng "Ảnh N — tên ảnh (link) — tác giả, Wikimedia Commons, giấy phép
   (link)", kèm đúng **một câu chung** nói ảnh đã chuyển đen trắng / cắt khung (CC BY-SA bắt
   buộc nói rõ có chỉnh sửa). Ảnh vẫn cần `alt` tiếng Việt, `width`/`height`, `loading="lazy"`.
5. Ảnh nằm ở `lessons/NN-slug/img/*.webp`, kèm **`img/NGUON.md`** liệt kê nguồn, tác giả, giấy
   phép và mọi bước đã chỉnh (bản đầy đủ cho repo; mục "Nguồn ảnh" trên trang là bản gọn).

**Nhịp đọc kiểu sách / tạp chí** — đo được, kiểm sau mỗi bài:
- **Chữ, bảng, sơ đồ, khối chú thích dùng TRỌN cột đọc** — cả trang chỉ có một mép phải. Đừng
  thu hẹp cột chữ (đã thử `max-width: 35em` ngày 30/09/2026; người học bác: hai mép phải lệch
  nhau trông như lỗi, và "việc gì phải cắt nó đi").
- **Chỉ ảnh là không chiếm hết bề ngang.** Từ 48rem trở lên, mỗi `figure.photo` là lưới
  **ảnh 2/3 + chú thích 1/3** đứng cạnh, thanh kẻ đầu chú thích thẳng hàng thanh kẻ đầu ảnh.
  Nhiều ảnh thì dàn **bên trong** 2/3 đó: bốn ảnh thành lưới 2×2, ba ảnh chụp màn hình dẹt xếp
  chồng. Ảnh phụ (`side`): ở máy tính lệch phải 40% cho chữ chảy quanh, ở máy tính bảng chiếm
  một nửa. Điện thoại: ảnh rộng hết, chú thích bên dưới.
- Nhãn dưới ô ảnh (`.lbl`) chỉ là chữ — **không** đặt ô số trong hình khối nhỏ (số trong tam
  giác, phần tư tròn cỡ 22px bị méo; người học đã chỉ ra hai lần).
- Không để mảng chữ liền nào quá ~250 chữ mà không có một điểm nghỉ mắt: hình, bảng, khối chú
  thích, hoặc **trích dẫn nổi bật** `<blockquote class="pull"><p>…</p></blockquote>` — câu trích
  phải là **nguyên văn** từ đoạn quanh nó, không bao giờ thêm ý mới.
- Tab nào cũng nên có ít nhất một yếu tố thị giác (ảnh hoặc sơ đồ), không chỉ chữ và bảng.

Markup: `<figure class="fig photo">` (ảnh 2/3 + chú thích 1/3) · thêm `side` (ảnh phụ, lệch
phải; `narrow` cho ảnh nhỏ) · `shot` (ảnh chụp màn hình, có viền) · `small` (ảnh nhỏ cố định
360px, chú thích chiếm phần còn lại) · nhiều ảnh: `<div class="photo-row n3|n4 [shots]">` với mỗi
ô `<figure>` + `<div class="lbl">`, rồi một `<figcaption>` chung cho cả khối.

### Nguồn thiết kế (đã tải được, dùng khi cần trích)

- Hai bài người học đưa: beeart.vn (xu hướng web Bauhaus) · linearity.io/blog/bauhaus-design
- Kandinsky và cuộc khảo sát màu–hình ở Weimar: bauhauskooperation.de/wissen/das-bauhaus/lehre/unterricht/unterricht-wassily-kandinsky
- Xưởng in & quảng cáo, cải cách chữ: bauhauskooperation.de/wissen/das-bauhaus/lehre/werkstaetten/druck-und-reklame
- Itten, Kandinsky, Albers về màu: getty.edu/research/exhibitions_events/exhibitions/bauhaus/new_artist/form_color/color/
- Bauhaus thật sự dùng chữ gì; Universal, Futura, ITC Bauhaus: letterformarchive.org/news/bauhaus-typefaces-part-one/ và …-part-two/
- Moholy-Nagy, typophoto, "tempo", thanh kẻ lề trái: exhibitions.letterformarchive.org/bauhaus/walkthroughs/typophoto-in-moholy-nagy-s-painting-photography-film
- Mốc thời gian của trường: tate.org.uk/art/art-terms/b/bauhaus
- Vì sao neo-brutalism khác Bauhaus: nngroup.com/articles/neobrutalism/
- Ba bài người học gửi thêm (30/09/2026): betaviet.com/phong-cach-bauhaus/ (tỉ lệ đáng dùng nhất:
  nền trắng–đen–xám chiếm khoảng 50–65%, ba màu cơ bản chỉ khoảng 15–20% làm điểm nhấn — lý do
  ảnh chụp thật để hai tông trung tính) · mymodernmet.com/what-is-bauhaus-art-movement/ (mặt phẳng
  phẳng xếp chồng gợi chiều sâu, ít trang trí, poster chữ đậm + khối màu) · mikotech.vn/bauhaus-la-gi/
  (bảng màu giới hạn, sans-serif, hình học cơ bản). Cả ba **không** nói gì về nhiếp ảnh.

## Trạng thái hiện tại

- **03/10/2026: tách Bài 00 cũ** (học 21–24/09, rời rạc, 22.700 chữ) thành **Bài 00** bản đồ chín chặng
  (+ trang phụ `phan-tich-output.html`), **Bài 01** IP/port/listen/firewall (+ phụ lục
  `ipv4-vs-ipv6.html`), **Bài 02** chẩn đoán theo chặng — cả ba XONG. **Bài 01 cũ → Bài 03** (XONG
  25/09–03/10, đã qua lượt ③: Bảng 9, output lab thật, EADDRINUSE, `$$`/`$PPID`; + phụ lục
  `lich-su-he-dieu-hanh.html`). Cả bốn viết lại theo xương sống mới.
- Phần chứng chỉ chuyên sâu của Bài 00 cũ (vì sao 90 ngày, chiếm DNS là xin được chứng chỉ, chuỗi
  X.509, crt.sh) **chuyển sang Bài 20**; tư liệu gốc ở commit 866ceb1, `lessons/00-ban-do-toan-canh/
  index.html` tab "Chứng chỉ & DNS" và `phan-tich-output.html` tab "Chứng chỉ"; ảnh crt.sh đã đặt sẵn ở
  `lessons/20-ten-mien-va-https/img/`. "Tám lý do cần Nginx" chuyển sang **Bài 19** (cùng commit, tab
  "Thời gian & Nginx").
- **Bài 04 (Phòng lab): ĐANG HỌC** — lượt ① (bản nháp để đọc trước) viết 03/10/2026, + phụ lục
  `lich-su-wsl.html`. Kế tiếp sau đó: vào Docker từ Bài 05.
- **Chờ người học quyết** (hỏi lại khi tới Module 2): server cho Bài 16–20 là VPS thuê hay máy ảo trên
  máy mình; giữ hay bỏ nhánh lab "CA nội bộ" ở Bài 20.
- **28/09/2026: đổi giọng văn sang học thuật + chia tab mọi trang; giao diện qua hai lượt** —
  neo-brutalism "Sổ thép" rồi chốt **Bauhaus** (một kiểu duy nhất). Mọi trang bài, trang chủ và
  các trang khung đều theo hệ này.
- **README cũng theo Bauhaus** (người học yêu cầu "sửa cả readme cho khớp"): không nhúng card
  neo-brutalism của repo profile nữa. `scripts/readme-art.mjs` (gọi từ `generate.mjs`) vẽ vào
  `assets/readme/`: `card.svg` và `glyph/NN.svg` (ấn ký từng bài, gắn dưới H1 của README bài).
  **`card.svg` là thứ duy nhất ở đầu README** (người học yêu cầu 03/10/2026): một tấm thẻ bấm vào là sang
  bản web, cố ý **khác** trang chủ của bản web (ấn ký bài đang học, một dải 41 ô tiến độ, dải đen "mở bản
  web đầy đủ"). Hai ảnh cũ `banner.svg` và `roadmap.svg` đã bỏ vì chúng chép lại hero và bức tranh lộ trình
  của trang chủ; đừng đưa ảnh nào lặp lại bản web vào README. Bảng mục lục trong README không có cột trạng
  thái riêng ở đầu (cột trống làm GitHub vẽ thừa một cột ở các module chưa học); trạng thái nằm ở cột cuối.
  Ảnh SVG qua `<img>` không tải được web font, nên font League Spartan được **nhúng base64** từ
  `assets/fonts/` (giấy phép OFL, file `OFL-LeagueSpartan.txt` đi kèm). Giao diện trang profile
  GitHub là việc của repo `AnhTuan2111` (neo-brutalism, không đổi sang Bauhaus); nhưng **nội dung**
  profile nói về khoá học (số bài, đích đến, công cụ) phải được sửa theo mỗi lần lộ trình đổi.

### Khái niệm đã dạy ở Bài 00–03 — phải tái sử dụng, không định nghĩa lại

Người học đã nắm và đã dùng được những thứ sau. Các bài sau **nối vào** chúng (gọi đúng tên, link về):

- **Bài 00:** bản đồ chín chặng (gọi bằng tên), "trong cả đường đi, chỉ ứng dụng là code bạn viết";
  định nghĩa DevOps theo chuẩn IEEE 2675-2021 / ISO/IEC/IEEE 32675:2022 và nguyên tắc tư duy hệ thống
  (hiểu hệ thống từ đầu tới cuối); URL và các phần; DNS, gói tin,
  chứng chỉ và CA ở mức khái niệm (chứng chỉ công khai, private key bí mật).
- **Bài 01:** một máy nhiều địa chỉ IP; port, listen, listen address (127.0.0.1, 0.0.0.0); firewall;
  ba điều kiện để gọi tới được; refused (máy đích còn sống, trả lời ngay) và timeout (không ai trả lời,
  dài bằng con số ta chọn); bộ bốn IP:port. Ẩn dụ đã dùng: tòa nhà.
- **Bài 02:** mã lỗi là một câu trả lời, có cột "ai viết ra" (502/504 do Nginx viết, 500 do app viết);
  ba nguyên tắc chẩn đoán; đã chạy chưa phải đã sẵn sàng (cửa sổ 502 lúc khởi động); hệ thống hỏng mà
  không ai đụng vào. Ẩn dụ đã dùng: lễ tân.
- **Bài 03:** bốn tài nguyên và kiểu cạn của từng cái; process, PID, cây process, thread; process sở
  hữu vùng nhớ, user, thư mục làm việc, biến môi trường (con nhận bản sao của cha); kernel, user space,
  syscall, kernel mode do CPU cưỡng chế; signal (SIGINT, SIGTERM bắt được; SIGKILL không); OOM killer
  chọn process lớn nhất; chuỗi bảy bước từ RAM cạn tới 502; service = process + người trông coi có bản
  mô tả (systemd). Ẩn dụ đã dùng: người – mặt bàn – tủ.

### Môi trường — đã thay đổi so với lúc khởi tạo

- **WSL Ubuntu đã bị gỡ.** `wsl -l -v` chỉ còn distro `docker-desktop` (không có bash).
  Cài lại ở **Bài 04** — đó đúng là nội dung của bài đó, không phải sự cố.
- **Docker Desktop chưa chạy** (daemon không kết nối được). Bật ở Bài 04.
- Người học đang dùng **Git Bash** cho mọi lab. Git for Windows biên dịch `curl` dựa trên
  **schannel**, nên `curl -v` KHÔNG in thông tin chứng chỉ → dùng `openssl s_client` thay thế.
- IP LAN thay đổi giữa các buổi (DHCP) — đừng ghi cứng địa chỉ vào tài liệu.

### Nợ kỹ thuật của bài học

- **Bài 04**: chạy `time curl -4 -o /dev/null http://127.0.0.1:9999` trong WSL Ubuntu và
  so với **2,155s** đo được trên Windows (Bài 01). Đây là thí nghiệm đối chứng đã hứa với người học.
- GitHub Pages: phục vụ từ nhánh `main`, thư mục gốc. CI/CD trong lộ trình dùng **GitLab** (Bài
  21–25), không dùng GitHub Actions. Tự động deploy trang này bằng GitHub Actions chỉ là **phụ lục
  tự chọn**, làm khi người học yêu cầu — nên **đừng tạo sẵn** `.github/workflows/`.

## Lưu ý kỹ thuật

Token `gh` hiện tại **không có scope `workflow`**, nên mọi push đụng vào `.github/workflows/`
sẽ bị GitHub từ chối. Nếu người học chọn làm phụ lục GitHub Actions cho trang này, chạy:

```bash
gh auth refresh -s workflow
```

Đây không phải sự cố — nó là một bài học nhỏ về OAuth scope, nên giải thích cho người học
khi nó xảy ra thay vì lặng lẽ xử lý.
