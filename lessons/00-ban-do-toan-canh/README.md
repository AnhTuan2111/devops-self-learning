# Bài 00 — Bản đồ toàn cảnh: một request đi qua chín chặng

<img src="../../assets/readme/glyph/00.svg" width="132" align="right" alt="Ấn ký của Bài 00">

> **Module M0** · Nền tảng tối thiểu — Request, process và phòng lab
> 3 lab · 3–5 giờ học

## Câu hỏi của bài

**Từ lúc gõ một địa chỉ vào trình duyệt tới lúc code Spring Boot của bạn chạy, request đi qua những
chặng nào, và chặng nào thật sự là code của bạn?**

Bài chia câu hỏi thành ba câu nhỏ: một URL nói gì; request đi qua những chặng nào; chặng nào là code
của bạn, và ai lo phần còn lại.

| Trang | Nội dung |
|---|---|
| **[index.html](index.html)** | Bài giảng chính: URL, bản đồ chín chặng, từng chặng trên máy người dùng và trên server, lab |
| **[phan-tich-output.html](phan-tich-output.html)** | Mổ băng output thật của ba lab, từng dòng một (đọc thêm) |
| **[lich-su-devops.html](lich-su-devops.html)** | Phụ lục: DevOps ra đời từ đâu, vì sao hai đội phát triển và vận hành phải nhập lại (đọc thêm) |

File này là **vở bài tập**: nó không giảng lại, chỉ giữ những gì cần có trong tay khi tự làm lab và tự
chấm. Phần giải thích vì sao, kèm sơ đồ, nằm trong `index.html`; nên đọc trang đó trước một lượt.

---

## Thuật ngữ

Mỗi định nghĩa cố ý ngắn một câu; bản đầy đủ nằm trong bài giảng.

| Thuật ngữ | Tiếng Việt | Định nghĩa một câu |
|---|---|---|
| Request | yêu cầu | Thông điệp client gửi đi để xin một thứ gì đó, ví dụ `GET /users/42`. |
| Client / Server | máy khách / máy chủ | Client gửi request và chờ trả lời (trình duyệt, `curl`); server nhận request và trả lời. |
| Hạ tầng | infrastructure | Mọi thứ nằm giữa người dùng và code của bạn: mạng, máy chủ, các chương trình chạy trước hoặc sau ứng dụng. |
| URL | địa chỉ tài nguyên | Chuỗi gồm năm phần `scheme://host:port/path?query`. |
| Địa chỉ IP | IP address | Con số định danh một máy trên mạng (chính xác hơn: một giao diện mạng của máy, học ở Bài 01). |
| DNS | hệ thống tên miền | Hệ thống máy chủ trải khắp thế giới, dịch tên miền thành địa chỉ IP. |
| Gói tin | packet | Mẩu dữ liệu nhỏ mà mạng chuyển đi; phần đầu ghi địa chỉ nơi gửi và nơi nhận. |
| Router | bộ định tuyến | Thiết bị nối các mạng với nhau, chuyển gói tin sang mạng gần đích hơn. |
| TCP | | Giao thức mở một kết nối tin cậy giữa hai máy trước khi gửi dữ liệu. |
| TLS | | Lớp bảo mật vừa chứng minh danh tính server vừa mã hoá dữ liệu; `https` là HTTP chạy trên TLS. |
| Chứng chỉ | certificate | Tài liệu điện tử ghi rằng nó thuộc về tên miền nào, hiệu lực tới khi nào, do một CA ký. |
| CA | tổ chức cấp chứng chỉ | Tổ chức mà trình duyệt và hệ điều hành đã tin sẵn, có quyền ký chứng chỉ. |
| HTTP, header | | Quy ước viết request và response; header là các dòng `Tên: giá trị` đi kèm. |
| Firewall | tường lửa | Bộ lọc quyết định gói tin nào được đi vào server. |
| Reverse proxy | | Chương trình đứng trước ứng dụng, nhận request thay nó rồi chuyển vào trong; ở lộ trình này là Nginx. |
| DevOps | | Cách tổ chức công việc để một nhóm chịu trách nhiệm cho phần mềm từ lúc viết tới lúc chạy ổn định, thay vì chia cho hai đội phát triển và vận hành. |

---

## Năm phần của một URL

```
https://api.example.com:443/users/42?active=true
└─┬─┘   └──────┬───────┘ └┬┘└───┬──┘└─────┬────┘
scheme       host       port  path      query
```

- **scheme, host, port** là việc của hạ tầng: mã hoá hay không, đi tới máy nào, chương trình nào nhận.
- **path, query** là việc của code bạn: `@GetMapping` khớp path, `@RequestParam` đọc query.
- Không ghi port thì client tự điền: `http` dùng 80, `https` dùng 443.

---

## Bản đồ chín chặng

```
  ┌─────────────────── MÁY NGƯỜI DÙNG ──────────────────────┐
  │  1 TRÌNH DUYỆT   tách URL: scheme, host, port, path     │
  │  2 DNS           hỏi "api.example.com là địa chỉ nào?"  │
  │                  được trả lời: 203.0.113.10             │
  │  3 TCP           mở kết nối tới 203.0.113.10, port 443  │
  │  4 TLS           kiểm tra chứng chỉ, bật mã hoá         │
  │  5 HTTP          gửi "GET /users/42" kèm các header     │
  └───────────────────────────┬─────────────────────────────┘
                              │
                     ~~~ INTERNET ~~~
                              │
  ┌──────────── SERVER (một máy chạy suốt ngày đêm) ────────┐
  │  6 FIREWALL      dữ liệu tới port 443 có được vào?      │
  │  7 NGINX         nhận ở port 443, gỡ mã hoá, đọc Host,  │
  │                  chuyển request vào ứng dụng            │
  │  8 SPRING BOOT   nhận ở port 8080, chạy code của bạn    │
  │  9 POSTGRESQL    nhận ở port 5432, đọc và ghi dữ liệu   │
  └─────────────────────────────────────────────────────────┘
```

**Chín chặng. Chỉ chặng 8 là code bạn viết.** Tám chặng còn lại là hạ tầng, nên khi web hỏng mà code
không đổi, hãy nghi tám chặng kia trước.

Từng có thời tám chặng ấy thuộc về một đội khác: đội phát triển viết chặng 8 rồi bàn giao, đội vận hành lo
phần còn lại, và khi có sự cố mỗi bên chỉ thấy nửa tấm bản đồ. **DevOps** là cách làm để một nhóm chịu
trách nhiệm cho cả chín chặng. Phần còn lại của lộ trình là lần lượt nhận trách nhiệm cho từng chặng.

| Chặng | Học kỹ ở |
|---|---|
| 1 Trình duyệt | bài này |
| 2 DNS | Bài 20 |
| 3 TCP | Bài 01 |
| 4 TLS | Bài 20 |
| 5 HTTP | Bài 02 |
| 6 Firewall | Bài 01, Bài 17 |
| 7 Nginx | Bài 19 |
| 8 Spring Boot | Bài 03, Bài 08 |
| 9 PostgreSQL | Bài 11 |

Bốn chặng 2, 4, 6, 7 chỉ xuất hiện khi ứng dụng rời máy dev để lên server: trên máy bạn, trình duyệt gọi
thẳng `localhost:8080`, không có tên miền để dịch, không ai mã hoá, không ai chặn ở giữa.

---

## Lab

Chạy trong **Git Bash** trên Windows. Mỗi lab soi vào một vài chặng; tự trả lời câu hỏi của lab trước khi
đọc output thật.

### Lab 1 — chặng 2: DNS, và một tên miền không tồn tại

```bash
nslookup github.com
nslookup khong-ton-tai-dau-nhe-12345.com
```

**Vì sao:** thấy tận mắt bước dịch tên thành địa chỉ, và thấy request dừng ở chặng 2 khi tên không tồn tại.
Lệnh thứ hai là **bước tự gây lỗi** của bài.

**Câu hỏi:** dòng `Server:` là ai? Khi gặp `Non-existent domain`, request đã tới chặng nào?

**Đáp án:** `Server:` là máy chủ DNS đang trả lời, thường là router trong nhà. `Non-existent domain`
(NXDOMAIN) nghĩa là request chưa qua khỏi chặng 2: chưa có kết nối nào được mở.

### Lab 2 — chặng 2 tới 5, và dấu vết chặng 7

```bash
curl -v https://example.com
```

**Vì sao:** một request trọn vẹn, `curl` kể lại từng bước. Dòng bắt đầu bằng `*` là lời `curl` tự kể,
`>` là dữ liệu gửi đi, `<` là dữ liệu nhận về.

**Câu hỏi:** dòng nào thuộc chặng 2, 3, 4, 5? Ai đã trả lời request?

**Đáp án:** `IPv4: …` là chặng 2; `Established connection …` là chặng 3; `ALPN: server accepted …` là
chặng 4; `> GET / HTTP/1.1` là chặng 5. Dòng `< Server: cloudflare` cho thấy một reverse proxy của
Cloudflare đã trả lời, đúng vị trí chặng 7.

### Lab 3 — chặng 4: đọc chứng chỉ

```bash
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates
```

**Vì sao:** bản `curl` của Git Bash dùng thư viện TLS của Windows (schannel), không in chứng chỉ, nên phải
đọc bằng `openssl`. Dấu `|` và `2>/dev/null` được giải nghĩa ở Bài 04.

**Câu hỏi:** chứng chỉ do ai ký, và còn bao nhiêu ngày thì hết hạn?

**Đáp án (đo ngày 24/09/2026):** do `SSL Corporation` ký (đơn vị ký mang tên Cloudflare), hiệu lực từ
29/07 tới 27/10/2026, tức 90 ngày, còn 33 ngày. Chạy hôm nay bạn sẽ thấy một chứng chỉ khác, vì chứng chỉ
được thay định kỳ trước khi hết hạn; cách đọc giữ nguyên.

### Tự vẽ lại bản đồ

Đóng tài liệu, vẽ chín chặng theo thứ tự, ghi bên cạnh mỗi chặng nó chạy ở đâu và dòng output nào ở ba lab
đã cho bạn thấy nó.

---

## Tự kiểm tra

- [ ] Giải thích được từng phần của `https://example.com:443/users/42?x=1`, và phần nào là việc của code
- [ ] Kể được chín chặng theo đúng thứ tự, và chặng nào chạy ở đâu
- [ ] Chỉ ra được một dòng output của `curl -v` thuộc chặng nào
- [ ] Nói được khi gặp `Non-existent domain` thì request đã dừng ở chặng nào
- [ ] Đọc được ai ký chứng chỉ của một website và khi nào nó hết hạn
- [ ] Nói được vì sao chỉ chặng 8 là code của bạn, và điều đó đổi cách bạn tìm lỗi ra sao
- [ ] Nói được DevOps là gì bằng lời của mình, và nó liên quan gì tới tám chặng không phải code của bạn

## Những chỗ hay hiểu sai

| Dễ nghĩ là | Thực tế |
|---|---|
| Web không vào được thì mở code ra xem trước. | Code không đổi thì nguyên nhân thường nằm ở tám chặng hạ tầng. |
| Chứng chỉ là thứ gắn tên miền với địa chỉ IP. | Đó là việc của DNS (chặng 2). Chứng chỉ (chặng 4) chứng minh danh tính và không chứa địa chỉ IP. |
| `nslookup` tự biết địa chỉ của mọi tên miền. | Nó hỏi một máy chủ DNS rồi in lại câu trả lời; dòng `Server:` cho biết ai trả lời. |
| DevOps là một công cụ, hoặc tên một chức danh. | DevOps là một cách tổ chức công việc: một nhóm chịu trách nhiệm từ lúc viết code tới lúc nó chạy ổn định. Công cụ chỉ giúp làm việc đó. |

---

## Kết lại

Request đi qua **chín chặng**: trình duyệt, DNS, mở kết nối, mã hoá, gửi request, firewall, reverse proxy,
ứng dụng, database. Năm chặng đầu trên máy người dùng, bốn chặng sau trên server, ở giữa là Internet.
**Chỉ chặng 8 là code bạn viết.** DevOps là cách làm để một nhóm chịu trách nhiệm cho cả chín chặng ấy.

**Câu hỏi cho bài sau.** Trong chín chặng, chặng 3 (mở kết nối tới đúng máy, đúng chương trình) là chỗ
dễ vấp đầu tiên, ngay trên máy dev. Từ đó sinh ra câu hỏi của
[Bài 01](../01-ip-port-listen-firewall/): *App chạy ngon khi gọi bằng localhost:8080 trên chính máy mình,
nhưng người khác gọi vào thì không được. Chặng mở kết nối hỏng ở đâu?*

Ghi chép thô, output thật và những chỗ đã hiểu sai nằm ở [`notes.md`](notes.md).

## Nguồn đọc thêm

- RFC 3986 — URI Generic Syntax: https://www.rfc-editor.org/rfc/rfc3986
- RFC 1034, RFC 1035 — Domain Names: https://www.rfc-editor.org/rfc/rfc1035
- RFC 9293 — TCP: https://www.rfc-editor.org/rfc/rfc9293
- RFC 8446 — TLS 1.3: https://www.rfc-editor.org/rfc/rfc8446
- RFC 9110 — HTTP Semantics: https://www.rfc-editor.org/rfc/rfc9110
- Nginx — Beginner's Guide: https://nginx.org/en/docs/beginners_guide.html
- curl — trang hướng dẫn: https://curl.se/docs/manpage.html
