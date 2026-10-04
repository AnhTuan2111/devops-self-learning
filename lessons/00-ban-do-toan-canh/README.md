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
| **[phan-tich-output.html](phan-tich-output.html)** | Đọc output thật: output của ba lab, giải thích từng dòng một (đọc thêm) |
| **[lich-su-devops.html](lich-su-devops.html)** | Phụ lục Lịch sử DevOps: DevOps ra đời từ đâu, vì sao hai đội phát triển và vận hành phải nhập lại (đọc thêm) |

File này là **vở bài tập**, không giảng lại: chỉ giữ những gì cần có trong tay khi làm lab và tự chấm.
Phần giải thích vì sao, kèm sơ đồ, nằm trong `index.html`, nên đọc trang đó trước một lượt.

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
| DevOps | | Theo chuẩn IEEE 2675-2021: tập hợp các nguyên tắc và cách làm giúp các bên liên quan giao tiếp và cộng tác tốt hơn để đặc tả, phát triển và vận hành phần mềm, đồng thời cải tiến liên tục suốt vòng đời của nó. |

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
  ┌─────────────────── máy người dùng ──────────────────────┐
  │  Trình duyệt     tách URL: scheme, host, port, path     │
  │  DNS             hỏi "api.example.com là địa chỉ nào?"  │
  │                  được trả lời: 203.0.113.10             │
  │  TCP             mở kết nối tới 203.0.113.10, port 443  │
  │  TLS             kiểm tra chứng chỉ, bật mã hoá         │
  │  HTTP            gửi "GET /users/42" kèm các header     │
  └───────────────────────────┬─────────────────────────────┘
                              │
                     ~~~ Internet ~~~
                              │
  ┌──────────── server (một máy chạy suốt ngày đêm) ────────┐
  │  Firewall        dữ liệu tới port 443 có được vào?      │
  │  Nginx           nhận ở port 443, gỡ mã hoá, đọc Host,  │
  │                  chuyển request vào ứng dụng            │
  │  Spring Boot     nhận ở port 8080, chạy code của bạn    │
  │  PostgreSQL      nhận ở port 5432, đọc và ghi dữ liệu   │
  └─────────────────────────────────────────────────────────┘
```

Đọc từ trên xuống theo thứ tự request đi qua. **Trong cả đường đi, chỉ ứng dụng là code bạn viết.** Tám
chặng còn lại là hạ tầng, nên khi web hỏng mà code không đổi, hãy nghi tám chặng kia trước.

Từng có thời tám chặng ấy thuộc về một đội khác: đội phát triển viết ứng dụng rồi bàn giao, đội vận hành
lo phần còn lại, và khi có sự cố mỗi bên chỉ thấy nửa tấm bản đồ. Chuẩn IEEE 2675-2021 (chuẩn quốc tế
ISO/IEC/IEEE 32675:2022) định nghĩa **DevOps** là tập hợp các nguyên tắc và cách làm giúp các bên liên
quan giao tiếp và cộng tác tốt hơn, nhằm đặc tả, phát triển và vận hành phần mềm, đồng thời cải tiến liên
tục mọi khía cạnh trong vòng đời của nó. Đọc trên tấm bản đồ (lời diễn giải của bài, không trích từ
chuẩn), các bên ấy trước hết là người viết ứng dụng và người giữ phần còn lại của đường đi. Các bài sau
lần lượt dạy cách nhận trách nhiệm cho từng chặng.

| Thành phần | Học kỹ ở |
|---|---|
| Trình duyệt | bài này |
| DNS | Bài 20 |
| TCP | Bài 01 |
| TLS | Bài 20 |
| HTTP | Bài 02 |
| Firewall | Bài 01, Bài 17 |
| Nginx | Bài 19 |
| Spring Boot | Bài 03, Bài 08 |
| PostgreSQL | Bài 11 |

Bốn chặng DNS, TLS, firewall và Nginx chỉ xuất hiện khi ứng dụng rời máy dev để lên server: trên máy bạn,
trình duyệt gọi thẳng `localhost:8080`, không có tên miền để dịch, không ai mã hoá, không ai chặn ở giữa.

---

## Lab

Chạy trong **Git Bash** trên Windows. Mỗi lab soi vào một vài chặng; tự trả lời câu hỏi của lab trước khi
đọc output thật.

### Lab 1 — DNS, và một tên miền không tồn tại

```bash
nslookup github.com
nslookup khong-ton-tai-dau-nhe-12345.com
```

**Vì sao:** thấy tận mắt bước dịch tên thành địa chỉ, và thấy request dừng ngay ở bước hỏi DNS khi tên
không tồn tại. Lệnh thứ hai là **bước tự gây lỗi** của bài.

**Câu hỏi:** dòng `Server:` là ai? Khi gặp `Non-existent domain`, request đã đi tới đâu trên bản đồ?

**Đáp án:** `Server:` là máy chủ DNS đang trả lời, thường là router trong nhà. `Non-existent domain`
(NXDOMAIN) nghĩa là request chưa qua khỏi bước hỏi DNS: chưa có kết nối nào được mở.

### Lab 2 — từ DNS tới request HTTP, và dấu vết của reverse proxy

```bash
curl -v https://example.com
```

**Vì sao:** một request trọn vẹn, `curl` kể lại từng bước. Dòng bắt đầu bằng `*` là lời `curl` tự kể,
`>` là dữ liệu gửi đi, `<` là dữ liệu nhận về.

**Câu hỏi:** dòng nào cho thấy DNS đã trả lời, kết nối TCP đã mở, bắt tay TLS đã xong, request HTTP đã
đi ra? Ai đã trả lời request?

**Đáp án:** `IPv4: …` là câu trả lời của DNS; `Established connection …` là kết nối TCP đã mở;
`ALPN: server accepted …` là bắt tay TLS xong; `> GET / HTTP/1.1` là request HTTP đi ra. Dòng
`< Server: cloudflare` cho thấy một reverse proxy của Cloudflare đã trả lời, đúng vị trí của Nginx trên
bản đồ.

### Lab 3 — TLS: đọc chứng chỉ

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
- [ ] Nói được vì sao trong chín chặng chỉ ứng dụng là code của bạn, và điều đó đổi cách bạn tìm lỗi ra sao
- [ ] Nói lại được định nghĩa DevOps của chuẩn IEEE 2675-2021 bằng lời của mình, và chỉ ra các bên liên quan trong định nghĩa ấy là ai trên tấm bản đồ chín chặng

## Những chỗ hay hiểu sai

| Dễ nghĩ là | Thực tế |
|---|---|
| Web không vào được thì mở code ra xem trước. | Code không đổi thì nguyên nhân thường nằm ở tám chặng hạ tầng. |
| Chứng chỉ là thứ gắn tên miền với địa chỉ IP. | Đó là việc của DNS. Chứng chỉ, được kiểm tra lúc bắt tay TLS, chứng minh rằng máy đang trả lời có quyền dùng tên miền đó. |
| `nslookup` tự biết địa chỉ của mọi tên miền. | Nó hỏi một máy chủ DNS rồi in lại câu trả lời; dòng `Server:` cho biết ai trả lời. |
| DevOps là một công cụ, hoặc tên một chức danh. | Chuẩn IEEE 2675-2021 định nghĩa DevOps là một tập hợp nguyên tắc và cách làm giúp các bên liên quan cộng tác tốt hơn suốt vòng đời phần mềm. Công cụ chỉ giúp áp dụng các nguyên tắc ấy. |

---

## Kết lại

Request đi qua **chín chặng**: trình duyệt, DNS, mở kết nối, mã hoá, gửi request, firewall, reverse proxy,
ứng dụng, database. Năm chặng đầu trên máy người dùng, bốn chặng sau trên server, ở giữa là Internet.
Trong cả đường đi, chỉ ứng dụng là code bạn viết. Theo chuẩn IEEE 2675-2021, DevOps là tập hợp nguyên tắc
và cách làm giúp các bên liên quan cộng tác tốt hơn suốt vòng đời phần mềm; nguyên tắc tư duy hệ thống của
chuẩn khuyến khích hiểu trọn hệ thống từ đầu tới cuối, và tấm bản đồ này là bước đầu của việc đó.

**Câu hỏi cho bài sau.** Trong chín chặng, bước mở kết nối tới đúng máy, đúng chương trình là chỗ dễ vấp
đầu tiên, ngay trên máy dev. Từ đó sinh ra câu hỏi của
[Bài 01](../01-ip-port-listen-firewall/): *App chạy bình thường khi gọi bằng localhost:8080 trên chính máy mình,
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
- IEEE 2675-2021 — IEEE Standard for DevOps (trang giới thiệu; toàn văn phải trả phí): https://standards.ieee.org/ieee/2675/6830/
- ISO/IEC/IEEE 32675:2022 — bản chuẩn quốc tế của IEEE 2675-2021: https://www.iso.org/standard/83670.html
