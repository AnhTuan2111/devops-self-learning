# 🧱 DevOps Self-Learning

> Từ 0 → tự quản lý server → deploy production → CI/CD

Đây là nhật ký học tập của tôi, không phải một khóa học. Mỗi bài là một thư mục chứa
lý thuyết, bài lab đã thực sự chạy, lỗi đã gặp và cách đã sửa.

**Stack thực hành:** Spring Boot + PostgreSQL + Docker + Nginx + GitHub Actions
**Môi trường:** Windows 11 + WSL2 Ubuntu + Docker Desktop
**Bắt đầu:** 2026-09-21

```
Tiến độ  ░░░░░░░░░░░░░░░░░░░░  1/43 bài (2%)
```

---

## Nguyên tắc

**Problem → Concept → Tool. Không học lệnh, học hệ thống.**

Mỗi bài đi theo đúng thứ tự này:

```
Problem  →  Concept  →  Tool
   │           │           │
   │           │           └── Docker, Nginx, GitHub Actions...
   │           └── Tại sao cần nó, nó giải quyết gì
   └── Một tình huống có thật khiến ta cần thứ đó
```

Học ngược lại (Tool trước) là lý do nhiều người nhớ 200 câu lệnh
nhưng vẫn không biết vì sao website không vào được.

---

## Cấu trúc thư mục

```
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
```

Sau khi sửa `curriculum.json` hoặc `progress.json`:

```bash
node scripts/generate.mjs
```

---

## Mục lục

### M0 · Nền tảng — Server và Internet thực sự là gì

> Nếu bỏ qua tầng này, Docker và Nginx sẽ chỉ là một đống lệnh học thuộc. Đây là tầng quyết định bạn có debug được production hay không.

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
| ✅ | `00` | [Bản đồ toàn cảnh: một request đi từ browser tới code của bạn](lessons/00-ban-do-toan-canh/) | Vẽ lại được bằng trí nhớ toàn bộ đường đi của một HTTP request, và gọi tên được mọi thành phần trên đường đi đó. | 45' | 2026-09-24 |
| ⬜ | `01` | [Máy tính, Hệ điều hành, Process: 'server' thật ra là cái gì](lessons/01-may-tinh-va-he-dieu-hanh/) | Hiểu server chỉ là một máy tính chạy 24/7, và mọi thứ bạn deploy cuối cùng đều là một process đang chạy. | 45' | — |
| ⬜ | `02` | [Dựng phòng lab: WSL2 Ubuntu + Docker Desktop](lessons/02-dung-phong-lab/) | Có một môi trường Linux thật trên chính máy Windows để thực hành cả lộ trình mà không tốn tiền VPS. | 45' | — |

### M1 · Linux — Điều khiển một server

> Mọi server production đều là Linux. Đây là ngôn ngữ chung của toàn bộ nghề DevOps.

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
| ⬜ | `03` | [Filesystem và điều hướng: bản đồ của một máy Linux](lessons/03-filesystem-va-dieu-huong/) | Đi lại trong một server lạ mà không bị lạc, và biết cái mình cần nằm ở thư mục nào. | 40' | — |
| ⬜ | `04` | [Đọc và thao tác file: bộ công cụ điều tra](lessons/04-doc-va-thao-tac-file/) | Tìm được một dòng log trong 2 triệu dòng, và chỉnh sửa file config trên server không có giao diện. | 50' | — |
| ⬜ | `05` | [User, group, permission: vì sao 'Permission denied'](lessons/05-user-group-permission/) | Không bao giờ phải sudo bừa nữa. Hiểu vì sao container production không được chạy bằng root. | 50' | — |
| ⬜ | `06` | [Process và signal: app của bạn sống và chết thế nào](lessons/06-process-va-signal/) | Biết app còn sống không, nó ăn bao nhiêu RAM, và vì sao Ctrl+C đôi khi không tắt được nó. | 50' | — |
| ⬜ | `07` | [systemd: biến app thành service tự khởi động lại](lessons/07-systemd-va-service/) | Tự viết một service để Spring Boot tự chạy khi server khởi động và tự sống lại khi crash. | 55' | — |
| ⬜ | `08` | [Package, biến môi trường và shell script đầu tiên](lessons/08-package-env-shell-script/) | Cài phần mềm lên server đúng cách, và tự động hóa một việc lặp lại bằng script. | 55' | — |

### M2 · Networking — Làm sao dữ liệu tới được máy bạn

> Phần lớn sự cố production là lỗi mạng hoặc cấu hình mạng. Đây là tầng phân biệt người sửa được lỗi và người đoán mò.

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
| ⬜ | `09` | [IP, localhost và cái bẫy 127.0.0.1 vs 0.0.0.0](lessons/09-ip-localhost-0000/) | Hiểu lỗi kinh điển nhất khi Dockerize: app chạy ngon ở local nhưng container không ai gọi được. | 50' | — |
| ⬜ | `10` | [Port và socket: 'Address already in use'](lessons/10-port-va-socket/) | Biết chính xác ai đang giữ port nào, và hiểu một kết nối TCP hình thành ra sao. | 45' | — |
| ⬜ | `11` | [DNS: từ tên miền tới IP](lessons/11-dns/) | Tự trỏ được một domain thật về server của mình, và debug được khi 'domain không vào được'. | 45' | — |
| ⬜ | `12` | [HTTP/HTTPS và curl như một công cụ điều tra](lessons/12-http-https-curl/) | Debug API bằng dòng lệnh, đọc được header, hiểu status code nói gì về tầng nào đang hỏng. | 50' | — |
| ⬜ | `13` | [SSH và firewall: cánh cửa duy nhất vào server](lessons/13-ssh-va-firewall/) | Vào server an toàn bằng key thay vì mật khẩu, và chỉ mở đúng những cổng cần mở. | 55' | — |

### M3 · Docker — Đóng gói ứng dụng

> Docker giải quyết đúng một vấn đề: 'máy tôi chạy được mà'. Học nó sau khi đã hiểu Linux thì nó rất tự nhiên.

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
| ⬜ | `14` | [Vì sao có Docker: container KHÔNG phải máy ảo](lessons/14-vi-sao-co-docker/) | Hiểu container thật ra chỉ là một process Linux bị cô lập, không phải một máy tính thu nhỏ. | 50' | — |
| ⬜ | `15` | [Image và Container: vòng đời đầy đủ](lessons/15-image-va-container/) | Thành thạo thao tác hằng ngày với container mà không cần tra lệnh. | 50' | — |
| ⬜ | `16` | [Dockerfile và layer cache: vì sao build lại chậm](lessons/16-dockerfile-va-layer/) | Viết Dockerfile đúng thứ tự để build nhanh, và hiểu mỗi dòng tạo ra cái gì. | 55' | — |
| ⬜ | `17` | [Dockerize Spring Boot đúng chuẩn production](lessons/17-dockerize-spring-boot/) | Biến project Spring Boot của bạn thành một image nhỏ, an toàn, chạy non-root. | 60' | — |
| ⬜ | `18` | [Volume và bind mount: vì sao database mất dữ liệu](lessons/18-volume-va-du-lieu/) | Không bao giờ mất dữ liệu production vì xóa nhầm container. | 55' | — |
| ⬜ | `19` | [Docker network: container gọi nhau bằng tên](lessons/19-docker-network/) | Hiểu vì sao trong Compose bạn viết jdbc:postgresql://db:5432 thay vì localhost. | 50' | — |
| ⬜ | `20` | [Docker Compose: cả hệ thống trong một file](lessons/20-docker-compose/) | Một lệnh duy nhất dựng lên toàn bộ Spring Boot + PostgreSQL, tái lập được ở bất kỳ máy nào. | 70' | — |

### M4 · Nginx — Đưa ứng dụng ra Internet

> Spring Boot không nên nói chuyện trực tiếp với Internet. Nginx là lớp cửa: TLS, static file, rate limit, load balancing.

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
| ⬜ | `21` | [Reverse proxy: Nginx đứng trước ứng dụng để làm gì](lessons/21-reverse-proxy-co-ban/) | Cấu hình được Nginx nhận request từ ngoài và chuyển vào Spring Boot. | 55' | — |
| ⬜ | `22` | [Phục vụ static file và ứng dụng SPA](lessons/22-static-file-va-spa/) | Cho Nginx trả frontend build sẵn, còn /api thì đẩy về backend. | 50' | — |
| ⬜ | `23` | [Header, log, timeout, rate limit: Nginx trong thực chiến](lessons/23-nginx-header-log-timeout/) | Cấu hình những thứ mà thiếu nó production sẽ có bug rất khó tìm. | 55' | — |
| ⬜ | `24` | [Nginx trong Docker Compose: ráp toàn bộ hệ thống](lessons/24-nginx-trong-compose/) | Toàn bộ stack Nginx + Spring Boot + PostgreSQL chạy bằng một lệnh, database không lộ ra Internet. | 60' | — |

### M5 · Production — VPS thật, domain thật, HTTPS thật

> Đây là milestone quan trọng nhất. Chạy được ở local không phải là deploy. Tầng này biến bạn thành người quản lý hạ tầng.

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
| ⬜ | `25` | [Chọn VPS và hardening ngày đầu tiên](lessons/25-vps-va-hardening/) | Có một server thật trên Internet và khóa nó lại trước khi kẻ khác tìm thấy. | 70' | — |
| ⬜ | `26` | [Deploy thủ công lần đầu: cảm nhận nỗi đau](lessons/26-deploy-thu-cong-lan-dau/) | Tự tay deploy một lần, để hiểu CI/CD sau này đang tự động hóa CÁI GÌ. | 70' | — |
| ⬜ | `27` | [Domain và DNS thật](lessons/27-domain-va-dns-that/) | Gõ tên miền của bạn vào trình duyệt và thấy ứng dụng của bạn hiện lên. | 50' | — |
| ⬜ | `28` | [HTTPS với Let's Encrypt và tự động gia hạn](lessons/28-https-lets-encrypt/) | Ổ khóa xanh trên trình duyệt, và chứng chỉ tự gia hạn mà bạn không phải nhớ. | 65' | — |
| ⬜ | `29` | [Quản lý secret và backup: thứ bạn chỉ tiếc khi đã muộn](lessons/29-secret-va-backup/) | Không commit mật khẩu lên GitHub, và có thể khôi phục database sau khi mất sạch. | 65' | — |

### M6 · CI/CD — Tự động hóa toàn bộ

> CI/CD không phải một công cụ, nó là quy trình. Bạn chỉ tự động hóa tốt cái bạn đã làm thủ công thành thạo.

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
| ⬜ | `30` | [CI/CD là quy trình, không phải tool](lessons/30-ci-cd-la-quy-trinh/) | Vẽ được pipeline mình cần TRƯỚC khi viết dòng YAML nào. | 45' | — |
| ⬜ | `31` | [GitHub Actions cơ bản — và deploy chính website học tập này](lessons/31-github-actions-co-ban/) | Pipeline đầu tiên trong đời: mỗi lần push, trang tài liệu học tập của bạn tự động lên mạng. | 60' | — |
| ⬜ | `32` | [CI cho Spring Boot: build, test, cache](lessons/32-ci-cho-spring-boot/) | Không bao giờ merge một commit làm hỏng build hoặc gãy test. | 65' | — |
| ⬜ | `33` | [Build và push Docker image lên registry](lessons/33-build-va-push-image/) | Mỗi commit trên main sinh ra một image có phiên bản rõ ràng, sẵn sàng deploy. | 65' | — |
| ⬜ | `34` | [CD: tự động deploy lên VPS](lessons/34-cd-deploy-len-vps/) | git push → production tự cập nhật. Không SSH thủ công nữa. | 75' | — |
| ⬜ | `35` | [Zero-downtime và rollback: khi deploy hỏng lúc 5 giờ chiều](lessons/35-zero-downtime-va-rollback/) | Deploy mà người dùng không thấy lỗi, và quay về bản cũ trong dưới 1 phút. | 75' | — |

### M7 · Monitoring & Vận hành — Biết server còn sống

> Deploy được chưa phải là xong. Câu hỏi thật: nếu server chết lúc 3 giờ sáng thì bạn biết bằng cách nào?

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
| ⬜ | `36` | [Log: từ docker logs tới log tập trung](lessons/36-log-tap-trung/) | Tìm được nguyên nhân một lỗi xảy ra 3 ngày trước, kể cả khi container đã bị thay. | 65' | — |
| ⬜ | `37` | [Metrics với Prometheus, Grafana và Spring Actuator](lessons/37-metrics-prometheus-grafana/) | Có một dashboard trả lời được: hệ thống đang khỏe hay yếu, và yếu ở đâu. | 75' | — |
| ⬜ | `38` | [Alert: được báo trước khi người dùng phàn nàn](lessons/38-alert-va-uptime/) | Server chết lúc 3h sáng thì điện thoại bạn kêu, chứ không phải sếp gọi lúc 8h. | 65' | — |
| ⬜ | `39` | [Xử lý sự cố: quy trình khi mọi thứ đang cháy](lessons/39-su-co-va-runbook/) | Có một quy trình debug theo tầng thay vì hoảng loạn thử mọi thứ. | 70' | — |

### M8 · Mở rộng — Khi hệ thống lớn lên

> Chỉ học tầng này SAU khi đã làm chủ mọi tầng trên. Học Kubernetes trước khi hiểu Linux là con đường ngắn nhất tới việc bỏ cuộc.

| | # | Bài | Mục tiêu | Ước lượng | Đã học |
|---|---|---|---|---|---|
| ⬜ | `40` | [Infrastructure as Code: Ansible và Terraform nhập môn](lessons/40-infrastructure-as-code/) | Dựng lại toàn bộ server từ số 0 bằng code, không cần nhớ mình đã gõ gì. | 80' | — |
| ⬜ | `41` | [Kubernetes nhập môn: khi nào bạn THỰC SỰ cần nó](lessons/41-kubernetes-nhap-mon/) | Hiểu K8s giải quyết vấn đề gì, và trung thực trả lời được: dự án của mình có cần nó không. | 90' | — |
| ⬜ | `42` | [Tổng kết: tự vẽ lại toàn bộ hệ thống](lessons/42-tong-ket/) | Chứng minh bạn đã hiểu, bằng cách giải thích được từng mũi tên trong kiến trúc của chính mình. | 60' | — |

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
| YouTube | Từ khóa hữu ích: `"Docker tiếng Việt"`, `"Nginx reverse proxy tiếng Việt"`, `"CI/CD GitHub Actions tiếng Việt"`, `"deploy Spring Boot lên VPS"` |

> **Cách dùng đúng:** video tiếng Việt để *hiểu nhanh ý tưởng*, tài liệu chính thức để *làm cho đúng*.
> Đừng chỉ xem video — bài nào cũng phải tự gõ lại trên máy mình thì mới vào đầu.

---

## Quy ước ghi tiến độ

Mỗi bài học xong thì cập nhật `progress.json`:

```json
{
  "lessons": {
    "00": { "status": "done", "date": "2026-09-21", "note": "hiểu rồi nhưng còn mơ hồ về NAT" }
  }
}
```

`status` nhận một trong: `todo` · `doing` · `done`.
Rồi chạy `node scripts/generate.mjs` để cập nhật README và trang web.
