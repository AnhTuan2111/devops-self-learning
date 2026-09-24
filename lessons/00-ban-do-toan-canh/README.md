# Bài 00 — Bản đồ toàn cảnh: một request đi từ browser tới code của bạn

> **Module M0** · Nền tảng — Server và Internet thực sự là gì
> Học ngày **21–24/09/2026** · đối thoại thầy–trò · 4 phần + 5 lab

## 📖 Ba trang tài liệu của bài này

| Trang | Nội dung |
|---|---|
| **[index.html](index.html)** | Bài giảng chính — mô hình tòa nhà, 9 chặng, bảng triệu chứng, chứng chỉ TLS |
| **[phan-tich-output.html](phan-tich-output.html)** | Mổ băng output thật từng dòng — `nslookup`, `curl -v`, `openssl` |
| **[ipv4-vs-ipv6.html](ipv4-vs-ipv6.html)** | Phụ lục — vì sao IP cạn kiệt, NAT, và vì sao *phải* thuê VPS |

File này là **workbook**: bản rút gọn để làm theo và tự chấm.

---

## Mô hình tòa nhà — bộ khái niệm dùng suốt lộ trình

```
IP address          =  địa chỉ của MỘT CỬA NGÕ vào tòa nhà
port                =  số PHÒNG bên trong tòa nhà
process đang listen =  có NGƯỜI ngồi trong phòng đó — và người đó
                       tự chọn sẽ tiếp khách đến từ cửa ngõ NÀO
firewall            =  BẢO VỆ đứng ở cửa ngõ, lọc ai được vào
```

> **Một địa chỉ IP không định danh một MÁY. Nó định danh một CỬA NGÕ MẠNG của máy đó.**

```
127.0.0.1       →  cửa hông, chỉ mở vào bên trong nhà
192.168.10.38   →  cửa chính, mở ra mạng WiFi       (DHCP cấp — CÓ THỂ ĐỔI)
10.72.1.23      →  cửa sau, mở ra mạng công ty / VPN
```

> `localhost` không phải một địa điểm. Nó là một **từ tương đối** — giống chữ *"ở đây"*.

---

## Bản đồ 9 chặng

```
① Trình duyệt tách URL
② DNS          tên miền  →  IP
③ TCP          mở kết nối tới IP:443
④ TLS          bắt tay, kiểm chứng chỉ, mã hóa
⑤ HTTP         gửi GET /users/42 + headers
       ~~~ INTERNET ~~~
⑥ FIREWALL     port 443 có mở không
⑦ NGINX        gỡ TLS → đọc Host → đẩy vào app     [cửa CHÍNH]
⑧ SPRING BOOT  :8080   định tuyến, chạy logic      [cửa HÔNG]
⑨ POSTGRESQL   :5432   truy vấn dữ liệu            [cửa HÔNG]
```

**Chín chặng. Chỉ chặng ⑧ là code bạn viết.** Đó là lý do nghề DevOps tồn tại.

> Việc app *chỉ listen ở `127.0.0.1`* là **bug** trên máy dev, nhưng là **feature bảo mật**
> trên production. Cùng một cấu hình — bối cảnh quyết định.

---

## Bảng tra: triệu chứng → ai viết ra → chặng hỏng

| Người dùng thấy | **Ai viết ra** | Chặng | Nghi ngờ đầu tiên |
|---|---|---|---|
| `NXDOMAIN` | Máy **của người dùng** | ② | Domain chưa trỏ, gõ sai, hết hạn |
| `Timeout` | **Không ai cả** | ③ ⑥ | Máy chết, sai IP, firewall nuốt gói tin |
| `Connection refused` | **Kernel** của server | ③ ⑦ | Máy sống, phòng trống → Nginx chết |
| `ERR_CERT_DATE_INVALID` | **Trình duyệt** người dùng | ④ | Cert hết hạn / sai tên miền |
| **502** Bad Gateway | **Nginx** | ⑦→⑧ | App chết, sai port, container chưa lên |
| **504** Gateway Timeout | **Nginx** | ⑦→⑧ | App sống nhưng quá chậm |
| **500** Internal Server Error | **Spring Boot** | ⑧ | Bug code — giờ mới đọc code |
| **404** Not Found | Nginx *hoặc* Spring Boot | ⑦ ⑧ | Sai path / định tuyến nhầm |
| `pool exhausted` | Spring Boot | ⑨ | DB chết hoặc quá tải |

### Cặp quan trọng nhất

```
502  →  ĐỪNG mở code. Code không chạy dòng nào cả.  (log app TRỐNG TRƠN)
500  →  GIỜ mới mở code. App đã chạy và tự ném exception.  (có stack trace)
```

### Phân biệt tác giả 404 bằng mắt

```
Nginx:  "404 Not Found / nginx/1.24.0"   ← có KÝ TÊN → lỗi cấu hình
Spring: "Whitelabel Error Page" / JSON    ← app có nhận → sai route
```

---

## Ba nguyên tắc chẩn đoán

**1. Mọi mã lỗi HTTP đều là một CÂU TRẢ LỜI.**
```
Thấy SỐ     →  đã vào được nhà  →  soi NỬA TRONG (⑦⑧⑨)
Không thấy  →  còn ngoài cổng   →  soi NỬA NGOÀI (②③⑥⑦)
```
Một câu hỏi vừa loại bỏ một nửa bản đồ.

**2. Triệu chứng còn chứng minh mọi chặng TRƯỚC đó đã chạy tốt.**
Lỗi cert ⟹ DNS ổn và mạng ổn, khỏi phải kiểm tra.

**3. Sửa một tầng thì triệu chứng ĐỔI, chứ không chắc hết lỗi.**
`timeout` → `refused` nghĩa là firewall đã đúng, thủ phạm nằm sau nó.

### Phép thử dứt khoát refused vs timeout

```
refused  →  curl dừng vì NHẬN ĐƯỢC CÂU TRẢ LỜI.  Có điểm kết thúc của riêng nó.
timeout  →  curl dừng vì TA bảo dừng.  Thời lượng là con số BẠN chọn.
```

---

## Chứng chỉ TLS

Không liên quan gì tới việc gán tên miền với IP — **đó là DNS**. Nó chứng minh **danh tính**.

| Đời thật | TLS |
|---|---|
| Thẻ căn cước | Certificate |
| Bộ Công an cấp | **CA** (Let's Encrypt, DigiCert…) |
| Con dấu khó làm giả | Chữ ký số của CA |
| Bạn tin Bộ Công an | Trình duyệt có sẵn danh sách CA đáng tin |

```
Certificate  →  CÔNG KHAI. Ai cũng tải được.
Private key  →  BÍ MẬT. ĐÂY mới là thứ bị đánh cắp.
```

**Vì sao chỉ 90 ngày:** ① giới hạn thiệt hại khi key lộ · ② **ÉP phải tự động hóa** ·
③ cơ chế thu hồi của trình duyệt không đáng tin, nên hạn ngắn *chính là* thu hồi.

> Quy trình chạy 1 lần/10 năm → chắc chắn đã hỏng, chỉ là chưa ai biết.
> Quy trình chạy 4 lần/năm → luôn được kiểm chứng.
> (Cùng logic: backup không restore thử thì không phải backup.)

### DNS là gốc rễ của lòng tin

Kẻ chiếm được tài khoản DNS **xin được cert hợp lệ thật** — vì CA xác minh quyền sở hữu
thông qua chính DNS. Ổ khóa vẫn xanh.

> **CA không biết chủ sở hữu là ai. CA chỉ biết ai đang KIỂM SOÁT tên miền.**

Việc cần làm: ① 2FA cho tài khoản domain (ưu tiên hơn cả 2FA GitHub) · ② bản ghi CAA ·
③ theo dõi Certificate Transparency.

---

## Hệ thống hỏng mà không ai đụng vào

```
Chứng chỉ TLS hết hạn          ← 90 ngày
Tên miền hết hạn               ← 1 năm
Ổ cứng đầy dần vì log          ← vài tháng
Memory leak tích tụ            ← vài tuần
API key / token hết hạn        ← tùy nhà cung cấp
```

Không cái nào bị bắt bởi code review, unit test hay staging.

> **Câu hỏi tự kiểm tra:** *"Cái gì trong hệ thống này sẽ tự hỏng nếu tôi không động vào nó
> trong 6 tháng?"*

**Anh em của nó:** `"container đang chạy"` ≠ `"app sẵn sàng"`. Docker báo `Up` ngay giây đầu,
Spring Boot cần thêm 15–60s → **cửa sổ 502 ở mọi lần deploy**. Đó là lý do `depends_on`
không đủ (Bài 20) và vì sao cần zero-downtime deploy (Bài 35).

---

## Tám lý do cần Nginx dù Spring Boot tự chạy được web server

1. **Gỡ TLS** — app không cần biết HTTPS tồn tại
2. **Lớp chắn** — rate limit, giới hạn body, chặn rác *trước khi* chạm app
3. **Giảm attack surface** — lỗ hổng vẫn nằm đó nhưng không ai từ ngoài chạm tới
4. **Lễ tân** — nhận việc, đưa vào trong, bê kết quả ra
5. **Port <1024 cần root** — Nginx chiếm port bằng root rồi *hạ quyền ngay*
6. **Một IP, nhiều app** — đọc header `Host` để phân luồng
7. **File tĩnh** — Nginx trả file rẻ hơn JVM rất nhiều
8. **Deploy không đứt** — đợi bản mới sẵn sàng rồi mới chuyển luồng

> **Mẫu tư duy:** mỗi tầng tồn tại vì nó *gỡ một trách nhiệm ra khỏi tầng khác*.
> Gặp công cụ mới, hỏi: **"Nó gánh hộ ai việc gì?"**

---

## Lab

⚠️ Chạy trong **Git Bash** hoặc WSL. **Không** chạy trong `cmd.exe` — ở đó `time` là lệnh
đặt đồng hồ hệ thống, và `;` không tách lệnh được.

```bash
bash lab/lab-00.sh
```

Hoặc từng lệnh một:

```bash
# ② DNS
nslookup github.com
nslookup khong-ton-tai-dau-nhe-12345.com

# ③④⑤
curl -v https://example.com

# ④ đọc "căn cước" của một website thật
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates

# refused vs timeout
time curl -4 -o /dev/null http://127.0.0.1:9999
time curl -4 -o /dev/null --max-time 5  http://10.255.255.1:9999
time curl -4 -o /dev/null --max-time 15 http://10.255.255.1:9999   # chứng minh: 15s
```

Kết quả thật và phần mổ xẻ từng dòng → **[phan-tich-output.html](phan-tich-output.html)**

---

## Tự kiểm tra

- [ ] Giải thích `localhost:8080` từng phần, và vì sao không gửi link đó cho người khác được
- [ ] Nói được một máy có mấy địa chỉ IP, và vì sao chúng không thay thế được nhau
- [ ] Tách được *"có ai đang listen"* với *"firewall có cho qua"* — hai khái niệm, hai triệu chứng
- [ ] Giải thích vì sao `refused` **chỉ** xảy ra khi máy còn sống
- [ ] Phân biệt 502 / 500, nói được **ai viết ra** mỗi trang lỗi
- [ ] Nói được ≥3 lý do cần Nginx dù Spring Boot đã tự chạy được web server
- [ ] Giải thích chứng chỉ TLS là gì, và vì sao nó chỉ sống 90 ngày
- [ ] Giải thích vì sao chiếm được DNS là chiếm được cả HTTPS
- [ ] Kể được 3 thứ sẽ tự hỏng nếu không ai động vào trong 6 tháng
- [ ] Vẽ lại sơ đồ ① → ⑨ không cần nhìn tài liệu

---

## Còn treo sang bài sau

- Chạy lại `time curl -4 http://127.0.0.1:9999` trong **WSL Ubuntu** để so với 2,155s trên
  Windows → **Bài 02**, sau khi cài lại Ubuntu (hiện đã bị gỡ)

**Bài tiếp:** [01 — Máy tính, Hệ điều hành, Process](../01-may-tinh-va-he-dieu-hanh/)

Lỗi đã gặp và chỗ hiểu sai đã được sửa → [`notes.md`](notes.md)
