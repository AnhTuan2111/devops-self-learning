# Bài 02 — Chẩn đoán theo chặng: nhìn lỗi biết chỗ hỏng

<img src="../../assets/readme/glyph/02.svg" width="132" align="right" alt="Ấn ký của Bài 02">

> **Module M0** · Nền tảng tối thiểu — Request, process và phòng lab
> 3–5 giờ học · 4 lab, chỉ cần Git Bash và `curl`

File này là **vở bài tập** của bài. Phần giảng giải vì sao, kèm hình, ảnh chụp và ví dụ đầy đủ,
nằm trong [`index.html`](index.html). Ở đây chỉ giữ những gì cần có trong tay khi tự làm lab và
tự chấm: câu hỏi của bài, bảng tra để dò lỗi, các bước lab kèm lý do và kết quả kỳ vọng, và danh
sách tự kiểm tra.

---

## Câu hỏi của bài

[Bài 01](../01-ip-port-listen-firewall/) kết thúc ở câu hỏi này, và bài này trả lời nó:

> **Kết nối tới được rồi mà trang vẫn báo 502, 500 hay 504. Lỗi đó do ai viết ra, và nó cho biết
> chặng nào đang hỏng?**

Bốn câu hỏi con, mỗi câu một tab trong bài giảng:

1. Mã trạng thái HTTP nói gì, và việc nhận được một mã chứng minh điều gì?
2. Ai viết ra mỗi trang lỗi, và nhận ra người viết bằng cách nào?
3. 502 và 504 khác 500 thế nào, và mỗi mã chỉ về chặng nào?
4. Ba nguyên tắc nào giúp khoanh vùng chặng hỏng, kể cả khi không ai đụng vào hệ thống?

### Cần đã học trước

- Bản đồ chín chặng, và Nginx đứng trước ứng dụng trên server: [Bài 00](../00-ban-do-toan-canh/)
- HTTP request, response và header: [Bài 00](../00-ban-do-toan-canh/)
- Port, listen, ba điều kiện để gọi tới được (gọi đúng địa chỉ, firewall cho qua, có chương trình
  listen đúng địa chỉ): [Bài 01](../01-ip-port-listen-firewall/)
- Refused và timeout: [Bài 01](../01-ip-port-listen-firewall/)

---

## Thuật ngữ

| Thuật ngữ | Định nghĩa một câu |
|---|---|
| Mã trạng thái (status code) | Con số ba chữ số ở dòng đầu của mọi HTTP response, cho biết kết quả xử lý request; ý nghĩa chuẩn hoá trong RFC 9110. |
| Dòng trạng thái (status line) | Dòng đầu của response: phiên bản giao thức, mã trạng thái, câu mô tả, ví dụ `HTTP/1.1 404 Not Found`. |
| Trang lỗi (error page) | Nội dung một chương trình gửi kèm mã 4xx hoặc 5xx; mỗi chương trình có kiểu trang lỗi riêng, nên giao diện là dấu hiệu nhận ra tác giả. |
| Header `Server` | Header trong đó chương trình gửi câu trả lời tự ghi tên mình; là manh mối về tác giả, không phải bằng chứng tuyệt đối. |
| `NXDOMAIN` | Câu trả lời của DNS cho biết tên miền không tồn tại. |
| Phía sau (upstream) | Máy chủ mà một reverse proxy chuyển request tới; phía sau của Nginx là ứng dụng Spring Boot. |

---

## Mã trạng thái: có mã chứng minh điều gì

| Nhóm | Nghĩa |
|---|---|
| 1xx | Thông tin tạm |
| 2xx | Thành công |
| 3xx | Chuyển hướng |
| 4xx | Lỗi thuộc về **request**: sai đường dẫn, thiếu quyền, dữ liệu sai |
| 5xx | Lỗi thuộc về **phía server**: request hợp lệ nhưng server không xử lý được |

Nhóm cho biết lỗi thuộc về phía nào, **không** cho biết chương trình nào đã viết ra câu trả lời.

Muốn trả về một mã, phải có một chương trình HTTP đã đọc được request, nên **có mã nghĩa là mọi
bước trước khi request tới Nginx đã chạy tốt** (hỏi DNS, mở kết nối, bắt tay TLS, qua firewall). Lỗi
xảy ra trước cuộc trao đổi HTTP thì không bao giờ có mã. Các bước dưới đây xếp theo thứ tự request
đi qua:

```
DNS          đổi tên ra địa chỉ      hỏng: "không tìm thấy tên"  không có mã
TCP          mở kết nối              hỏng: refused hoặc timeout  không có mã
TLS          thoả thuận mã hoá       hỏng: lỗi chứng chỉ         không có mã
HTTP         gửi request
Firewall     cho gói tin vào server  hỏng: timeout               không có mã
────────────────────────────────────────────────────────────────────────────
Nginx        đọc request             trả lời bằng một mã trạng thái
Spring Boot  đọc request             trả lời bằng một mã trạng thái
```

---

## Bảng tra: triệu chứng, ai viết ra, chặng hỏng

Một chương trình chỉ viết được thông báo lỗi khi nó còn chạy và đã nhận được request. Vì vậy biết
**ai viết ra** là biết request đã đi tới đâu. Khi gặp sự cố, tra theo hàng, rồi bắt đầu nghi ngờ từ
cột cuối.

| Người dùng thấy | **Ai viết ra** | Chặng liên quan | Nghi ngờ đầu tiên |
|---|---|---|---|
| Không tìm thấy tên miền (`ERR_NAME_NOT_RESOLVED`) | **Trình duyệt**, sau câu `NXDOMAIN` của DNS | DNS | Gõ sai, tên miền chưa trỏ về server, hoặc đã hết hạn |
| Timeout | **Không ai cả**; trình duyệt tự bỏ cuộc | Mở kết nối TCP, firewall của server | Máy tắt, sai IP, firewall lặng lẽ bỏ gói tin |
| Refused (`ERR_CONNECTION_REFUSED`) | **Hệ điều hành** của server từ chối; trình duyệt viết chữ | Mở kết nối TCP tới Nginx | Máy sống nhưng không ai listen: Nginx đã tắt |
| Lỗi chứng chỉ (`ERR_CERT_DATE_INVALID`) | **Trình duyệt** | Bắt tay TLS | Chứng chỉ hết hạn hoặc cấp cho tên miền khác |
| **502** Bad Gateway | **Nginx** | Nginx chuyển request vào ứng dụng | Ứng dụng đã tắt, gọi sai port, hoặc chưa khởi động xong |
| **504** Gateway Timeout | **Nginx** | Nginx chuyển request vào ứng dụng | Ứng dụng còn sống nhưng trả lời quá chậm |
| **503** Service Unavailable | Nginx hoặc ứng dụng | Nginx, ứng dụng | Quá tải, bảo trì, hoặc bị chặn vì gửi quá nhiều request |
| **500** Internal Server Error | **Spring Boot** | Ứng dụng | Exception trong code: giờ mới đọc log và code |
| **404** Not Found | Nginx *hoặc* Spring Boot, xem chữ ký | Nginx, ứng dụng | Sai đường dẫn, hoặc Nginx chuyển nhầm chỗ |
| **500**, log báo không lấy được kết nối database | Spring Boot | Database | Database tắt, quá tải, hoặc kết nối mượn mà không trả |

**Con số không phải chữ ký.** Ứng dụng cũng có thể tự trả về 502. Xác định tác giả bằng chữ ký
(giao diện trang, header `Server`, dòng `nginx/1.30.5` ở cuối), rồi mới dùng con số.

```
Nginx:   "404 Not Found / nginx/1.30.5"   ← có ký tên: request dừng ở Nginx
Spring:  "Whitelabel Error Page" / JSON    ← không có dòng nginx: request đã tới ứng dụng
```

Spring Boot không ký tên trong header `Server`, và dòng trạng thái của nó chỉ có con số
(`HTTP/1.1 500`, không câu mô tả). Nhận ra nó bằng khuôn trang Whitelabel hoặc khuôn JSON
`{"status":…, "error":…, "path":…}`.

---

## 502, 504 và 500: ba kết cục khi Nginx gọi vào trong

Với ứng dụng, Nginx là **bên đi gọi**: nó mở một kết nối thứ hai tới `127.0.0.1:8080`. Kết nối
này có ba kết cục:

```
a) bị từ chối: không ai listen 8080        → Nginx gửi ngay 502
b) mở được, nhưng ứng dụng mãi không trả lời → hết giờ chờ, Nginx gửi 504
c) ứng dụng trả lời, kể cả bằng trang 500  → Nginx chuyển ra nguyên vẹn
```

| Mã | Ai viết | Ứng dụng nhận được request? | Log ứng dụng |
|---|---|---|---|
| 502 | Nginx | Không | Trống trơn về request này |
| 500 | Spring Boot | Có | Có stack trace |

```
502  →  Chưa cần mở code. Đi xem: ứng dụng còn chạy không? còn listen 8080 không?
500  →  Lúc này mới mở code. Đi xem: log ứng dụng, stack trace.
```

---

## Ba nguyên tắc chẩn đoán

- **Có mã là đã có người đọc request.** Có mã thì soi từ Nginx trở vào: Nginx, ứng dụng, database.
  Không có mã thì soi các bước trước Nginx: DNS, mở kết nối TCP, bắt tay TLS, firewall. Một câu hỏi
  có hoặc không chia đôi vùng nghi ngờ.
- **Triệu chứng chứng minh các bước trước.** Lỗi chứng chỉ chứng minh DNS đã trả lời và kết nối đã mở,
  vì bước bắt tay TLS chỉ diễn ra sau hai bước ấy.
- **Sửa một tầng thì triệu chứng đổi.** Timeout chuyển thành refused sau khi mở firewall là bằng
  chứng firewall đã đúng. Vì vậy sửa từng thứ một.

**Thời gian cũng là một nguyên nhân:**

- Thang giây, **cửa sổ 502**: Spring Boot cần 15–60 giây sau khi bật mới listen 8080; trong lúc đó
  Nginx bị từ chối và viết 502. Cách giải là đợi ứng dụng báo sẵn sàng rồi mới chuyển request vào
  (Bài 13, Bài 30).
- Thang tháng, **hệ thống tự hỏng**: chứng chỉ hết hạn, tên miền hết hạn, ổ đĩa đầy vì log, bộ nhớ
  rò rỉ, token hết hạn. Cách giải là tự động hoá (Bài 20) và cảnh báo trước (Bài 38).

> Câu hỏi để tự kiểm tra một hệ thống: **"Cái gì sẽ tự hỏng nếu tôi không động vào nó trong sáu tháng?"**

---

## Lab

Chạy trong Git Bash. Mục tiêu là tập một thói quen: với mỗi dòng output, hỏi "ai viết ra dòng này,
và nó chứng minh request đã tới đâu?".

### Lab 1 — đọc lại output cũ, hỏi "ai viết"

Vì sao: ba dòng này bạn đã gặp ở Bài 00 và Bài 01, nhưng khi đó chỉ đọc để hiểu DNS, refused,
timeout. Đọc lại theo câu hỏi tác giả là bước đầu của chẩn đoán.

```
*** <máy chủ DNS> can't find khong-ton-tai-dau-nhe-12345.com: Non-existent domain
curl: (7) Failed to connect to 127.0.0.1 port 9999 after 2076 ms: Could not connect to server
curl: (28) Connection timed out after 5007 milliseconds
```

Kết quả kỳ vọng: dòng 1 do nslookup viết, thông tin gốc từ máy chủ DNS (request dừng ở bước hỏi
DNS); dòng 2 do curl viết, lời từ chối từ hệ điều hành máy đích (request dừng ở bước mở kết nối, máy
còn sống); dòng 3 do curl viết, **không ai** gửi gì về (5007 ms là thời gian curl tự chờ).

### Lab 2 — đọc dòng trạng thái và header `Server`

Vì sao: đây là cách nhìn thấy mã trạng thái và chữ ký của người gửi câu trả lời, thay vì chỉ nhìn
trang hiển thị.

```bash
curl -sS -i https://example.com/
curl -sS -i https://example.com/khong-ton-tai
```

Kết quả kỳ vọng: `HTTP/1.1 200 OK` rồi `HTTP/1.1 404 Not Found`, cả hai có `Server: cloudflare` và
`cf-cache-status: HIT`. Có dòng trạng thái nghĩa là các bước hỏi DNS, mở kết nối và bắt tay TLS
đều đã chạy tốt. Câu trả lời lấy từ
bản lưu sẵn của Cloudflare: header `Server` chỉ cho biết chương trình **cuối cùng** gửi câu trả lời.

### Lab 3 — tự gây lỗi: gõ sai tên, gọi sai port

Vì sao: cố tình làm hỏng bước hỏi DNS và bước mở kết nối để thấy rằng khi chưa có cuộc trao đổi
HTTP thì không có dòng trạng thái nào, dù đã thêm `-i`. Hãy dự đoán trước khi chạy.

```bash
curl -sS -i https://khong-ton-tai-dau-nhe-12345.com/
time curl -sS -i http://127.0.0.1:9999/
```

Kết quả kỳ vọng: `curl: (6) Could not resolve host` và `curl: (7) Failed to connect`, không có
dòng `HTTP/...`. Số trong ngoặc là mã lỗi của curl, không phải mã trạng thái HTTP. Lần gọi port 9999
tốn khoảng 2 giây trên Windows. Mở hai địa chỉ này bằng trình duyệt để thấy cùng lỗi, nhưng giờ do
trình duyệt viết.

### Lab 4 — con số không phải chữ ký

Vì sao: chứng minh rằng một mã 502 có thể do chính ứng dụng viết ra, nên phải nhìn chữ ký. Nếu
`httpbin.org` không trả lời thì bỏ qua.

```bash
curl -sS -i https://httpbin.org/status/500
curl -sS -i https://httpbin.org/status/502
```

Kết quả kỳ vọng: `HTTP/1.1 502 BAD GATEWAY` với `Server: gunicorn/...` và nội dung rỗng. Không có
chữ ký `nginx` nào: chính ứng dụng đã chọn gửi con số 502.

---

## Những chỗ hay hiểu sai

| Dễ nghĩ là | Thực tế |
|---|---|
| Lỗi chứng chỉ chắc do DNS không dịch được tên | Lỗi chứng chỉ **chứng minh** DNS đã trả lời và kết nối đã mở |
| Thấy 502 thì mở code ra đọc | Ứng dụng không nhận request; log trống. Xem ứng dụng còn chạy và listen không |
| Thấy 500 là Nginx hỏng | 500 do **ứng dụng** viết; Nginx chỉ chuyển ra |
| Mã 502 thì chắc chắn do Nginx viết | Con số ai cũng gửi được; xem chữ ký |
| Server mất điện thì người dùng thấy refused hoặc 502 | Thấy **timeout**: không còn ai để từ chối hay viết 502 |
| Không ai cập nhật gì thì hệ thống không thể hỏng | Thời gian tự nó là nguyên nhân: chứng chỉ, tên miền, ổ đĩa, bộ nhớ |

---

## Tự kiểm tra

- [ ] Nhìn một mã lỗi nói được ai viết ra nó, và nó chứng minh request đã tới chặng nào
- [ ] Phân biệt 502 với 500, và nói được mỗi cái hỏng ở đâu
- [ ] Giải thích được vì sao 504 nghĩa là ứng dụng còn sống
- [ ] Áp được ba nguyên tắc chẩn đoán vào một sự cố
- [ ] Nói được vì sao con số 502 chưa đủ để kết luận Nginx đã viết ra nó
- [ ] Kể được ba thứ sẽ tự hỏng nếu không ai động vào trong sáu tháng

---

## Câu hỏi cho bài sau

Bài này dừng ở kết luận: 502 nghĩa là Nginx gọi vào trong mà không ai trả lời, vì ứng dụng đã tắt
hoặc chưa listen xong. Nhưng "ứng dụng đã tắt" là chuyện gì trên máy chủ? Từ đó nảy ra câu hỏi:

> **502 nghĩa là phía sau Nginx không còn ai trả lời. Nhưng "app" thật ra là gì trên một máy chủ,
> vì sao nó có thể chết, và vì sao nó chết thì website sập?**

[Bài 03 — Máy tính, hệ điều hành, process](../03-may-tinh-va-he-dieu-hanh/) trả lời câu này.

Ghi lỗi đã gặp và chỗ hiểu sai vào [`notes.md`](notes.md).

---

## Nguồn đọc thêm

- RFC 9110 — *HTTP Semantics*, mục 15 (mã trạng thái): https://www.rfc-editor.org/rfc/rfc9110.html#name-status-codes
- MDN — *HTTP response status codes*: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
- MDN — header *Server*: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Server
- Nginx — *ngx_http_proxy_module*: https://nginx.org/en/docs/http/ngx_http_proxy_module.html
- Spring Boot — *Error Handling*: https://docs.spring.io/spring-boot/reference/web/servlet.html#web.servlet.spring-mvc.error-handling
- curl — trang hướng dẫn: https://curl.se/docs/manpage.html
