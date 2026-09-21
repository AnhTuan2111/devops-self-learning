# Bài 00 — Bản đồ toàn cảnh: một request đi từ browser tới code của bạn

> **Module M0** · Nền tảng — Server và Internet thực sự là gì
> ~45 phút · Không cần cài gì · Không có code

📖 **Bài giảng đầy đủ:** mở [`index.html`](index.html) trong trình duyệt
*(hoặc xem bản online sau khi bật GitHub Pages)*

File `README.md` này là **workbook** — bản rút gọn để làm theo và tự chấm.

---

## Mục tiêu

Vẽ lại được bằng trí nhớ toàn bộ đường đi của một HTTP request, và gọi tên
được mọi thành phần trên đường đi đó.

## Vấn đề khởi đầu

> 9 giờ tối, sếp nhắn: *"Web không vào được em ơi."*

Không có bản đồ → mở code ra đọc (thường sai chỗ, vì code không đổi gì từ hôm qua).
Có bản đồ → hỏi *"Màn hình báo gì?"* và khoanh vùng ngay được chặng đang hỏng.

## Bản đồ cần thuộc

```
  ① Trình duyệt tách URL
  ② DNS          tên miền  →  IP
  ③ TCP          mở kết nối tới IP:443
  ④ TLS          bắt tay, kiểm chứng chỉ, mã hóa
  ⑤ HTTP         gửi GET /users/42 + headers
         ~~~ INTERNET ~~~
  ⑥ FIREWALL     port 443 có mở không
  ⑦ NGINX        gỡ TLS → đọc Host → đẩy vào app
  ⑧ SPRING BOOT  :8080   định tuyến, chạy logic
  ⑨ POSTGRESQL   :5432   truy vấn dữ liệu
         → đường về: DB → App → Nginx → Internet
```

**Chỉ chặng ⑧ là code bạn viết.** Tám chặng còn lại là hạ tầng.
Đó là toàn bộ lý do nghề DevOps tồn tại.

## Bảng tra nhanh: triệu chứng → chặng hỏng

| Bạn thấy | Hỏng ở | Nghi ngờ đầu tiên |
|---|---|---|
| `NXDOMAIN` / không tìm thấy máy chủ | ② DNS | Domain chưa trỏ, gõ sai, hết hạn |
| Quay mãi → **timeout** | ③ / ⑥ | Server tắt, sai IP, firewall nuốt gói tin |
| `Connection refused` | ③ | Tới được máy, nhưng **không ai listen** port đó |
| `ERR_CERT_DATE_INVALID` | ④ TLS | Chứng chỉ hết hạn / sai tên miền |
| **502** Bad Gateway | ⑦→⑧ | Nginx sống, **app chết** |
| **504** Gateway Timeout | ⑦→⑧ | App sống nhưng **quá chậm** |
| **500** Internal Server Error | ⑧ | App tự ném exception → **giờ mới đọc code** |
| **404** Not Found | ⑦ / ⑧ | Sai path, định tuyến nhầm |
| `connection pool exhausted` | ⑨ | DB chết hoặc quá tải |

> **502 vs 500** là cặp dễ nhầm nhất và hữu ích nhất.
> 502 = gõ cửa app không ai mở → lỗi **hạ tầng**.
> 500 = app mở cửa rồi ngã → lỗi **code**.

## Vì sao cần Nginx dù Spring Boot đã tự chạy được web server

1. **Port 80/443 cần quyền root** — không muốn app chạy bằng root
2. **Chứng chỉ TLS** cần gia hạn 90 ngày/lần — không nên nhồi vào app
3. **Một IP, nhiều app** — Nginx đọc header `Host` để phân luồng theo domain
4. **File tĩnh** — Nginx trả file rẻ hơn JVM rất nhiều
5. **Lớp chắn** — rate limit, giới hạn body, chặn rác *trước khi* chạm vào app
6. **Deploy không đứt** — đổi app phía sau mà kết nối phía trước không gãy

> **Mẫu tư duy:** mỗi tầng tồn tại vì nó *gỡ một trách nhiệm ra khỏi tầng khác*.
> Gặp công cụ mới, luôn hỏi: **"Nó gánh hộ ai việc gì?"**

---

## Lab

Chạy trong **Git Bash** hoặc **terminal Ubuntu (WSL)**.

### Lab 1 — Nhìn chặng ② (DNS)

```bash
nslookup github.com
nslookup khong-ton-tai-dau-nhe-12345.com
```

Lệnh đầu cho ra IP. Lệnh sau cho ra `NXDOMAIN` — chính là thứ nằm sau màn hình
"không tìm thấy máy chủ" của trình duyệt.

### Lab 2 — Nhìn chặng ③ ④ ⑤ cùng lúc

```bash
curl -v https://example.com
```

Tự tìm từng dòng và gắn vào đúng chặng:

| Dòng | Chặng |
|---|---|
| `Trying 93.184.…:443` | ③ TCP đang mở kết nối |
| `Connected to example.com` | ③ TCP xong |
| `SSL connection using TLS…` | ④ TLS bắt tay xong |
| `subject: CN=…` | ④ Chứng chỉ cấp cho ai |
| `> GET / HTTP/1.1` | ⑤ Request đi ra (`>` = gửi) |
| `< HTTP/1.1 200 OK` | Đường về (`<` = nhận) |

Gọn hơn, chỉ lấy header trả về:

```bash
curl -I https://github.com
```

### Lab 3 — Tự gây "Connection refused"

```bash
curl http://localhost:9999
```

**Tự trả lời trước khi xem đáp án:** vì sao là *refused* chứ không phải *timeout*?

<details>
<summary>Đáp án</summary>

Vì gói tin **đã tới đích**. Kernel nhận được, nhìn port 9999, thấy không process nào
đăng ký nghe ở đó, nên **chủ động trả lời**: không có ai ở đây.

**Timeout** thì ngược lại — gửi đi và không nhận được gì hết, gói tin rơi vào im lặng.
Thường do firewall nuốt nó, hoặc máy đích không tồn tại.

**Một lời từ chối rõ ràng khác hẳn với sự im lặng.** Khác biệt này sẽ giúp bạn
khoanh vùng sự cố rất nhanh ở Bài 39.
</details>

### Bài tập cuối

Đóng hết tài liệu. Tự vẽ lại sơ đồ ① → ⑨ bằng trí nhớ, rồi mở ra đối chiếu.
**Chỗ nào quên chính là chỗ cần đọc lại.**

---

## Tự kiểm tra

- [ ] Giải thích được `localhost:8080` từng phần, và vì sao không gửi link đó cho người khác được
- [ ] Phân biệt domain / IP / port — cái nào là tên, địa chỉ, cửa
- [ ] Nói được ≥3 lý do cần Nginx dù Spring Boot đã tự chạy được web server
- [ ] Phân biệt 502 và 500, biết cái nào thì mới nên mở code ra đọc
- [ ] Giải thích được "Connection refused" khác "Timeout"
- [ ] Vẽ lại sơ đồ ① → ⑨ không cần nhìn tài liệu

---

## Bản đồ này dẫn tới đâu

```
Linux      → cái máy ở chặng ⑥⑦⑧⑨ chạy trên nền gì
Networking → chặng ② ③
Docker     → cách đóng gói chặng ⑧ và ⑨ cho gọn
Nginx      → chặng ⑦
VPS        → cái hộp chứa toàn bộ nửa dưới sơ đồ
HTTPS      → chặng ④
CI/CD      → cách thay mới chặng ⑧ mà không phải làm tay
Monitoring → cách biết chặng nào đang hỏng, trước khi sếp nhắn tin
```

**Bài tiếp:** [01 — Máy tính, Hệ điều hành, Process: "server" thật ra là cái gì](../01-may-tinh-va-he-dieu-hanh/)

Ghi lại lỗi đã gặp và câu hỏi còn treo vào [`notes.md`](notes.md).
