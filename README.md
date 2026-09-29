<a href="https://anhtuan2111.github.io/devops-self-learning/"><img src="assets/readme/banner.svg" width="100%" alt="DevOps từ số 0 — nhật ký tự học, đã xong 1/43 bài"></a>

<img src="assets/readme/roadmap.svg" width="100%" alt="Bức tranh lộ trình: mỗi hàng một module, mỗi ô một bài; ô đã học được tô màu">

**[Đọc bản web đầy đủ, có tab và sơ đồ](https://anhtuan2111.github.io/devops-self-learning/)**

# DevOps Self-Learning

> Từ số 0, tới tự quản lý server, deploy production và CI/CD

Đây là nhật ký tự học DevOps của một lập trình viên backend Java/Spring Boot — người viết được
code, nhưng gần như chưa biết gì về tầng hạ tầng nằm bên dưới code đó. Nó không phải một khoá
học được chép lại: mỗi bài là một thư mục ghi lại một buổi học đối thoại thật, gồm phần giảng giải
*vì sao*, sơ đồ cơ chế, bài lab đã thực sự chạy trên máy người học, những chỗ đã hiểu sai và cách
đã sửa. Bản web (GitHub Pages) là nơi đọc chính, vì ở đó mỗi bài được chia tab, có bảng tra, sơ đồ
và phần đào sâu học thuật; tệp này là mục lục để duyệt nhanh trên GitHub.

| | |
|---|---|
| **Stack thực hành** | Spring Boot + PostgreSQL + Docker + Nginx + GitHub Actions |
| **Môi trường** | Windows 11 + WSL2 Ubuntu + Docker Desktop |
| **Bắt đầu** | 21/09/2026 |
| **Quy mô** | 43 bài · 9 module |
| **Thời lượng** | khoảng 209–346 giờ học thật — học đều 6–8 giờ mỗi tuần thì mất chừng 6–13 tháng |
| **Tiến độ** | 1/43 bài đã xong (2%) — xem bức tranh lộ trình trên bản web |

### Thời lượng được ước lượng thế nào

Con số ghi ở mỗi bài là **giờ học thật cho trọn một bài, không phải thời gian giảng**. Một bài tự học
không kết thúc khi đọc xong trang giảng: nó chỉ xong khi đã giải thích lại được bằng lời của mình,
đã chạy lab trên máy thật, đã cố tình làm hỏng rồi tự sửa, và đã ghi lại những gì chỉ buổi học đó mới
sinh ra. Vì vậy thời lượng được cộng từ bốn phần:

| Phần | Thường mất |
|---|---|
| Đọc trước index.html và README.md | 1–2 giờ |
| Học đối thoại: trả lời câu hỏi, sửa chỗ hiểu sai | 1,5–3 giờ |
| Lab, kể cả bước tự gây lỗi rồi tự sửa | 1–3 giờ |
| Ghi notes.md và bồi tài liệu lượt hai | 0,5–1 giờ |

Bài nhẹ (khái niệm, cài đặt) rơi vào khoảng 3–6 giờ; bài có nhiều mảnh ghép hoặc đụng tới server
thật (Compose, VPS, CD, Kubernetes) có thể tới 10–16 giờ. Đây là **ước lượng**, và nên chia một bài
thành nhiều buổi — Bài 00 kéo dài bốn ngày. Nếu một bài mất lâu hơn con số ghi ở đây, điều đó
thường có nghĩa là bạn đang học kỹ, không phải đang học chậm.

---

## Nguyên tắc

**Problem, rồi Concept, rồi Tool. Không học lệnh, học hệ thống.**

Mỗi bài đi theo đúng thứ tự dưới đây. Trước hết là một **vấn đề có thật** — thường là một sự cố cụ
thể — để có lý do phải học; sau đó là **khái niệm** giải thích vì sao vấn đề ấy xảy ra, ở tầng nào
của hệ thống; chỉ sau cùng mới tới **công cụ** dùng để xử lý nó.

```
Problem  →  Concept  →  Tool
   │           │           │
   │           │           └── Docker, Nginx, GitHub Actions...
   │           └── Tại sao cần nó, nó giải quyết gì, cơ chế bên dưới là gì
   └── Một tình huống có thật khiến ta cần thứ đó
```

Học theo chiều ngược lại — công cụ trước — là lý do nhiều người thuộc hai trăm câu lệnh mà vẫn
không giải thích được vì sao một website không vào được. Một câu lệnh học thuộc là một mẩu thông
tin rời rạc, không suy luận tiếp được; một cơ chế đã hiểu thì dùng được cả trong những tình huống
chưa ai dặn trước.

---

## Cấu trúc thư mục

```
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
```

`index.html` và `README.md` của một bài **bổ sung cho nhau, không lặp lại nhau**: bản HTML dạy và
giải thích *vì sao*, bản Markdown để làm theo và tự chấm. Sau khi sửa `curriculum.json` hoặc
`progress.json`, chạy lại:

```bash
node scripts/generate.mjs
```

---

## Mục lục

### M0 · Nền tảng — Server và Internet thực sự là gì

> Nếu bỏ qua tầng này, Docker và Nginx sẽ chỉ là một đống lệnh học thuộc. Đây là tầng quyết định bạn có debug được production hay không.

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
| xong | `00` | [Bản đồ toàn cảnh: một request đi từ browser tới code của bạn](lessons/00-ban-do-toan-canh/) | Vẽ lại được bằng trí nhớ toàn bộ đường đi của một HTTP request, và gọi tên được mọi thành phần trên đường đi đó. | 6–10 giờ | 24/09/2026 |
| đang học | `01` | [Máy tính, Hệ điều hành, Process: 'server' thật ra là cái gì](lessons/01-may-tinh-va-he-dieu-hanh/) | Hiểu server chỉ là một máy tính chạy 24/7, và mọi thứ bạn deploy cuối cùng đều là một process đang chạy. | 5–8 giờ | 25/09/2026 |
|  | `02` | [Dựng phòng lab: WSL2 Ubuntu + Docker Desktop](lessons/02-dung-phong-lab/) | Có một môi trường Linux thật trên chính máy Windows để thực hành cả lộ trình mà không tốn tiền VPS. | 3–6 giờ | — |

### M1 · Linux — Điều khiển một server

> Mọi server production đều là Linux. Đây là ngôn ngữ chung của toàn bộ nghề DevOps.

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
|  | `03` | [Filesystem và điều hướng: bản đồ của một máy Linux](lessons/03-filesystem-va-dieu-huong/) | Đi lại trong một server lạ mà không bị lạc, và biết cái mình cần nằm ở thư mục nào. | 3–5 giờ | — |
|  | `04` | [Đọc và thao tác file: bộ công cụ điều tra](lessons/04-doc-va-thao-tac-file/) | Tìm được một dòng log trong 2 triệu dòng, và chỉnh sửa file config trên server không có giao diện. | 4–6 giờ | — |
|  | `05` | [User, group, permission: vì sao 'Permission denied'](lessons/05-user-group-permission/) | Không bao giờ phải sudo bừa nữa. Hiểu vì sao container production không được chạy bằng root. | 4–7 giờ | — |
|  | `06` | [Process và signal: app của bạn sống và chết thế nào](lessons/06-process-va-signal/) | Biết app còn sống không, nó ăn bao nhiêu RAM, và vì sao Ctrl+C đôi khi không tắt được nó. | 4–7 giờ | — |
|  | `07` | [systemd: biến app thành service tự khởi động lại](lessons/07-systemd-va-service/) | Tự viết một service để Spring Boot tự chạy khi server khởi động và tự sống lại khi crash. | 5–8 giờ | — |
|  | `08` | [Package, biến môi trường và shell script đầu tiên](lessons/08-package-env-shell-script/) | Cài phần mềm lên server đúng cách, và tự động hóa một việc lặp lại bằng script. | 5–8 giờ | — |

### M2 · Networking — Làm sao dữ liệu tới được máy bạn

> Phần lớn sự cố production là lỗi mạng hoặc cấu hình mạng. Đây là tầng phân biệt người sửa được lỗi và người đoán mò.

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
|  | `09` | [IP, localhost và cái bẫy 127.0.0.1 vs 0.0.0.0](lessons/09-ip-localhost-0000/) | Hiểu lỗi kinh điển nhất khi Dockerize: app chạy ngon ở local nhưng container không ai gọi được. | 4–6 giờ | — |
|  | `10` | [Port và socket: 'Address already in use'](lessons/10-port-va-socket/) | Biết chính xác ai đang giữ port nào, và hiểu một kết nối TCP hình thành ra sao. | 4–6 giờ | — |
|  | `11` | [DNS: từ tên miền tới IP](lessons/11-dns/) | Tự trỏ được một domain thật về server của mình, và debug được khi 'domain không vào được'. | 4–7 giờ | — |
|  | `12` | [HTTP/HTTPS và curl như một công cụ điều tra](lessons/12-http-https-curl/) | Debug API bằng dòng lệnh, đọc được header, hiểu status code nói gì về tầng nào đang hỏng. | 4–7 giờ | — |
|  | `13` | [SSH và firewall: cánh cửa duy nhất vào server](lessons/13-ssh-va-firewall/) | Vào server an toàn bằng key thay vì mật khẩu, và chỉ mở đúng những cổng cần mở. | 5–8 giờ | — |

### M3 · Docker — Đóng gói ứng dụng

> Docker giải quyết đúng một vấn đề: 'máy tôi chạy được mà'. Học nó sau khi đã hiểu Linux thì nó rất tự nhiên.

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
|  | `14` | [Vì sao có Docker: container KHÔNG phải máy ảo](lessons/14-vi-sao-co-docker/) | Hiểu container thật ra chỉ là một process Linux bị cô lập, không phải một máy tính thu nhỏ. | 4–6 giờ | — |
|  | `15` | [Image và Container: vòng đời đầy đủ](lessons/15-image-va-container/) | Thành thạo thao tác hằng ngày với container mà không cần tra lệnh. | 4–6 giờ | — |
|  | `16` | [Dockerfile và layer cache: vì sao build lại chậm](lessons/16-dockerfile-va-layer/) | Viết Dockerfile đúng thứ tự để build nhanh, và hiểu mỗi dòng tạo ra cái gì. | 5–8 giờ | — |
|  | `17` | [Dockerize Spring Boot đúng chuẩn production](lessons/17-dockerize-spring-boot/) | Biến project Spring Boot của bạn thành một image nhỏ, an toàn, chạy non-root. | 6–10 giờ | — |
|  | `18` | [Volume và bind mount: vì sao database mất dữ liệu](lessons/18-volume-va-du-lieu/) | Không bao giờ mất dữ liệu production vì xóa nhầm container. | 4–7 giờ | — |
|  | `19` | [Docker network: container gọi nhau bằng tên](lessons/19-docker-network/) | Hiểu vì sao trong Compose bạn viết jdbc:postgresql://db:5432 thay vì localhost. | 4–7 giờ | — |
|  | `20` | [Docker Compose: cả hệ thống trong một file](lessons/20-docker-compose/) | Một lệnh duy nhất dựng lên toàn bộ Spring Boot + PostgreSQL, tái lập được ở bất kỳ máy nào. | 6–10 giờ | — |

### M4 · Nginx — Đưa ứng dụng ra Internet

> Spring Boot không nên nói chuyện trực tiếp với Internet. Nginx là lớp cửa: TLS, static file, rate limit, load balancing.

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
|  | `21` | [Reverse proxy: Nginx đứng trước ứng dụng để làm gì](lessons/21-reverse-proxy-co-ban/) | Cấu hình được Nginx nhận request từ ngoài và chuyển vào Spring Boot. | 4–7 giờ | — |
|  | `22` | [Phục vụ static file và ứng dụng SPA](lessons/22-static-file-va-spa/) | Cho Nginx trả frontend build sẵn, còn /api thì đẩy về backend. | 4–6 giờ | — |
|  | `23` | [Header, log, timeout, rate limit: Nginx trong thực chiến](lessons/23-nginx-header-log-timeout/) | Cấu hình những thứ mà thiếu nó production sẽ có bug rất khó tìm. | 5–8 giờ | — |
|  | `24` | [Nginx trong Docker Compose: ráp toàn bộ hệ thống](lessons/24-nginx-trong-compose/) | Toàn bộ stack Nginx + Spring Boot + PostgreSQL chạy bằng một lệnh, database không lộ ra Internet. | 6–10 giờ | — |

### M5 · Production — VPS thật, domain thật, HTTPS thật

> Đây là milestone quan trọng nhất. Chạy được ở local không phải là deploy. Tầng này biến bạn thành người quản lý hạ tầng.

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
|  | `25` | [Chọn VPS và hardening ngày đầu tiên](lessons/25-vps-va-hardening/) | Có một server thật trên Internet và khóa nó lại trước khi kẻ khác tìm thấy. | 6–10 giờ | — |
|  | `26` | [Deploy thủ công lần đầu: cảm nhận nỗi đau](lessons/26-deploy-thu-cong-lan-dau/) | Tự tay deploy một lần, để hiểu CI/CD sau này đang tự động hóa CÁI GÌ. | 6–10 giờ | — |
|  | `27` | [Domain và DNS thật](lessons/27-domain-va-dns-that/) | Gõ tên miền của bạn vào trình duyệt và thấy ứng dụng của bạn hiện lên. | 3–6 giờ | — |
|  | `28` | [HTTPS với Let's Encrypt và tự động gia hạn](lessons/28-https-lets-encrypt/) | Ổ khóa xanh trên trình duyệt, và chứng chỉ tự gia hạn mà bạn không phải nhớ. | 5–8 giờ | — |
|  | `29` | [Quản lý secret và backup: thứ bạn chỉ tiếc khi đã muộn](lessons/29-secret-va-backup/) | Không commit mật khẩu lên GitHub, và có thể khôi phục database sau khi mất sạch. | 5–8 giờ | — |

### M6 · CI/CD — Tự động hóa toàn bộ

> CI/CD không phải một công cụ, nó là quy trình. Bạn chỉ tự động hóa tốt cái bạn đã làm thủ công thành thạo.

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
|  | `30` | [CI/CD là quy trình, không phải tool](lessons/30-ci-cd-la-quy-trinh/) | Vẽ được pipeline mình cần TRƯỚC khi viết dòng YAML nào. | 3–5 giờ | — |
|  | `31` | [GitHub Actions cơ bản — và deploy chính website học tập này](lessons/31-github-actions-co-ban/) | Pipeline đầu tiên trong đời: mỗi lần push, trang tài liệu học tập của bạn tự động lên mạng. | 5–8 giờ | — |
|  | `32` | [CI cho Spring Boot: build, test, cache](lessons/32-ci-cho-spring-boot/) | Không bao giờ merge một commit làm hỏng build hoặc gãy test. | 5–8 giờ | — |
|  | `33` | [Build và push Docker image lên registry](lessons/33-build-va-push-image/) | Mỗi commit trên main sinh ra một image có phiên bản rõ ràng, sẵn sàng deploy. | 4–7 giờ | — |
|  | `34` | [CD: tự động deploy lên VPS](lessons/34-cd-deploy-len-vps/) | git push là production tự cập nhật. Không SSH thủ công nữa. | 6–10 giờ | — |
|  | `35` | [Zero-downtime và rollback: khi deploy hỏng lúc 5 giờ chiều](lessons/35-zero-downtime-va-rollback/) | Deploy mà người dùng không thấy lỗi, và quay về bản cũ trong dưới 1 phút. | 6–10 giờ | — |

### M7 · Monitoring & Vận hành — Biết server còn sống

> Deploy được chưa phải là xong. Câu hỏi thật: nếu server chết lúc 3 giờ sáng thì bạn biết bằng cách nào?

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
|  | `36` | [Log: từ docker logs tới log tập trung](lessons/36-log-tap-trung/) | Tìm được nguyên nhân một lỗi xảy ra 3 ngày trước, kể cả khi container đã bị thay. | 5–8 giờ | — |
|  | `37` | [Metrics với Prometheus, Grafana và Spring Actuator](lessons/37-metrics-prometheus-grafana/) | Có một dashboard trả lời được: hệ thống đang khỏe hay yếu, và yếu ở đâu. | 6–10 giờ | — |
|  | `38` | [Alert: được báo trước khi người dùng phàn nàn](lessons/38-alert-va-uptime/) | Server chết lúc 3h sáng thì điện thoại bạn kêu, chứ không phải sếp gọi lúc 8h. | 5–8 giờ | — |
|  | `39` | [Xử lý sự cố: quy trình khi mọi thứ đang cháy](lessons/39-su-co-va-runbook/) | Có một quy trình debug theo tầng thay vì hoảng loạn thử mọi thứ. | 5–8 giờ | — |

### M8 · Mở rộng — Khi hệ thống lớn lên

> Chỉ học tầng này SAU khi đã làm chủ mọi tầng trên. Học Kubernetes trước khi hiểu Linux là con đường ngắn nhất tới việc bỏ cuộc.

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
|  | `40` | [Infrastructure as Code: Ansible và Terraform nhập môn](lessons/40-infrastructure-as-code/) | Dựng lại toàn bộ server từ số 0 bằng code, không cần nhớ mình đã gõ gì. | 8–14 giờ | — |
|  | `41` | [Kubernetes nhập môn: khi nào bạn THỰC SỰ cần nó](lessons/41-kubernetes-nhap-mon/) | Hiểu K8s giải quyết vấn đề gì, và trung thực trả lời được: dự án của mình có cần nó không. | 10–16 giờ | — |
|  | `42` | [Tổng kết: tự vẽ lại toàn bộ hệ thống](lessons/42-tong-ket/) | Chứng minh bạn đã hiểu, bằng cách giải thích được từng mũi tên trong kiến trúc của chính mình. | 4–8 giờ | — |

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
| YouTube | Từ khoá hữu ích: `"Docker tiếng Việt"`, `"Nginx reverse proxy tiếng Việt"`, `"CI/CD GitHub Actions tiếng Việt"`, `"deploy Spring Boot lên VPS"` |

> **Cách dùng đúng:** chỉ xem video thì kiến thức ở lại trong video. Bài nào cũng phải tự gõ lại
> trên máy mình, tự gây lỗi và tự sửa, thì mới thực sự thành của mình.

---

## Quy ước ghi tiến độ

Mỗi bài học xong thì cập nhật `progress.json`. Trường `status` nhận một trong ba giá trị
`todo` · `doing` · `done`; trường `note` là một dòng ghi lại điều đáng nhớ nhất, kể cả điều
còn mơ hồ:

```json
{
  "lessons": {
    "00": { "status": "done", "date": "2026-09-21", "note": "hiểu rồi nhưng còn mơ hồ về NAT" }
  }
}
```

Rồi chạy `node scripts/generate.mjs` để cập nhật README, trang chủ và khung các bài. Hai ảnh ở
đầu tệp này — tiêu đề và bức tranh lộ trình — cũng do script đó vẽ lại từ `progress.json`, bằng
đúng bộ sinh hình của bản web: học xong một bài thì ô của bài đó trong tranh được tô màu. Ảnh nằm
trong `assets/readme/`, nhúng sẵn font League Spartan (giấy phép OFL) vì GitHub không tải web font
cho ảnh SVG.
