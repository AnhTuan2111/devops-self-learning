# Bài 00 — Bản đồ toàn cảnh: một request đi từ browser tới code của bạn

<img src="../../assets/readme/glyph/00.svg" width="132" align="right" alt="Ấn ký của Bài 00">

> **Module M0** · Nền tảng — Server và Internet thực sự là gì
> Học ngày **21–24/09/2026** · đối thoại thầy–trò · 4 phần + 5 lab

## Ba trang tài liệu của bài này

| Trang | Nội dung |
|---|---|
| **[index.html](index.html)** | Bài giảng chính — bốn khái niệm nền, 9 chặng, bảng triệu chứng, chứng chỉ TLS |
| **[phan-tich-output.html](phan-tich-output.html)** | Mổ băng output thật từng dòng — `nslookup`, `curl -v`, `openssl` |
| **[ipv4-vs-ipv6.html](ipv4-vs-ipv6.html)** | Phụ lục — vì sao IP cạn kiệt, NAT, và vì sao *phải* thuê VPS |

File này là **vở bài tập** (workbook) của bài. Nó không giảng lại từ đầu — phần giải thích
vì sao, kèm sơ đồ và ví dụ đầy đủ, nằm trong `index.html`. Ở đây chỉ giữ lại những gì cần
có trong tay khi tự làm lab và tự chấm: các mô hình đã chốt, bảng tra để dò lỗi, các bước
lab kèm lý do và kết quả kỳ vọng, và danh sách tự kiểm tra. Nên đọc `index.html` trước một
lượt, rồi mở file này bên cạnh terminal.

---

## Thuật ngữ

Bảng này định nghĩa những từ sẽ xuất hiện liên tục từ đây tới cuối lộ trình. Mỗi định nghĩa
cố ý ngắn một câu; phiên bản đầy đủ nằm trong bài giảng.

| Thuật ngữ | Tiếng Việt | Định nghĩa một câu |
|---|---|---|
| URL | địa chỉ tài nguyên | Chuỗi gồm năm phần `scheme://host:port/path?query`, trong đó chỉ `path` và `query` là thứ ứng dụng của bạn đọc. |
| DNS | hệ thống tên miền | Hệ thống phân tán dịch một cái **tên** (`github.com`) thành một **địa chỉ IP** mà máy tính gửi gói tin tới được. |
| IP address | địa chỉ IP | Địa chỉ của **một cửa ngõ mạng** (network interface) của máy, không phải của cả cái máy. |
| Port | cổng | Con số 0–65535 chỉ "phòng" bên trong một cửa ngõ; một kết nối luôn nhắm tới cặp IP + port. |
| Listen | lắng nghe | Việc một process xin hệ điều hành giữ một port để nhận kết nối, kèm lựa chọn nhận từ cửa ngõ nào. |
| Loopback | địa chỉ vòng lặp | Card mạng ảo `127.0.0.1` — gói tin gửi tới đây không bao giờ rời khỏi máy. |
| Firewall | tường lửa | Bộ lọc đứng ở cửa ngõ, quyết định gói tin nào được đi vào (hoặc ra). |
| TCP | giao thức điều khiển truyền | Giao thức mở một "đường ống" tin cậy giữa hai đầu trước khi gửi dữ liệu. |
| TLS | bảo mật tầng truyền tải | Lớp nằm trên TCP, vừa **chứng minh danh tính** máy chủ vừa **mã hóa** dữ liệu; `https` = HTTP chạy trên TLS. |
| Certificate | chứng chỉ | "Tấm căn cước" công khai của một tên miền, được một CA ký bảo lãnh. |
| CA | tổ chức cấp chứng chỉ | Bên thứ ba mà trình duyệt tin sẵn, có quyền ký chứng chỉ (Let's Encrypt, DigiCert…). |
| Private key | khóa bí mật | File bí mật trên server, thứ duy nhất chứng minh tấm căn cước kia đúng là của bạn. |
| Reverse proxy | proxy ngược | Máy chủ đứng trước ứng dụng, nhận request thay nó rồi chuyển vào trong — ở lộ trình này là Nginx. |
| `refused` / `timeout` | bị từ chối / hết giờ chờ | Hai cách một kết nối thất bại **trước khi** có bất kỳ câu trả lời HTTP nào; nghĩa của chúng khác hẳn nhau. |

---

## Bốn khái niệm nền: địa chỉ IP, port, listen, firewall

Bốn khái niệm này rất dễ bị gộp làm một trong đầu người mới, và phần lớn nhầm lẫn về mạng đều
bắt nguồn từ việc gộp đó. Chúng nằm ở bốn tầng khác nhau của ngăn xếp mạng, hỏng theo bốn kiểu
khác nhau và cho ra bốn triệu chứng khác nhau — định nghĩa chính xác của từng cái nằm ở bảng
thuật ngữ phía trên.

### Ẩn dụ hỗ trợ ghi nhớ: một tòa nhà

Bốn định nghĩa kia chính xác nhưng trừu tượng. Phép so sánh dưới đây **không phải định nghĩa**,
nó chỉ giúp giữ bốn vai tách bạch trong trí nhớ:

```
IP address          =  địa chỉ của MỘT CỬA NGÕ vào tòa nhà
port                =  số PHÒNG bên trong tòa nhà
process đang listen =  có NGƯỜI ngồi trong phòng đó — và người đó
                       tự chọn sẽ tiếp khách đến từ cửa ngõ NÀO
firewall            =  BẢO VỆ đứng ở cửa ngõ, lọc ai được vào
```

> **Giới hạn của ẩn dụ.** Chữ "phòng" gợi ý port là một không gian vật lý có sẵn. Thực tế không
> có cái phòng nào cả: port chỉ là một con số 16 bit trong phần đầu gói tin, và hệ điều hành
> dùng con số đó tra một bảng xem nên giao gói cho process nào. Khi ẩn dụ và định nghĩa mâu
> thuẫn, **định nghĩa thắng**.

Hệ quả quan trọng nhất là câu sau, cần thuộc lòng:

> **Một địa chỉ IP không định danh một MÁY. Nó định danh một CỬA NGÕ MẠNG của máy đó.**

Một chiếc laptop bình thường đang có ít nhất ba cửa ngõ cùng lúc. Chúng cùng dẫn vào một
máy, nhưng không thay thế được cho nhau, bởi vì mỗi cửa mở ra một hướng khác:

```
127.0.0.1       →  cửa hông, chỉ mở vào bên trong nhà
192.168.10.38   →  cửa chính, mở ra mạng WiFi       (DHCP cấp — CÓ THỂ ĐỔI)
10.8.0.2        →  cửa sau, mở ra mạng nội bộ qua VPN
```

Từ đó suy ra vì sao gửi link `localhost:8080` cho đồng nghiệp là vô ích: trên máy họ,
`localhost` được dịch thành cửa hông của **chính máy họ**, nên request không bao giờ rời
khỏi bàn của họ.

> `localhost` không phải một địa điểm. Nó là một **từ tương đối** — giống chữ *"ở đây"*.

---

## Bản đồ 9 chặng

Khi đưa mô hình tòa nhà từ mạng LAN lên Internet thật, đường đi của một request mọc thêm
bốn thứ: DNS (vì người dùng chỉ biết tên), TLS (vì phải mã hóa và chứng minh danh tính),
firewall (vì cửa ngõ giờ phơi ra Internet), và Nginx (vì phải có ai gỡ mã hóa và phân luồng).
Ghép lại, ta được chín chặng nối tiếp nhau:

```
1 Trình duyệt tách URL
2 DNS          tên miền  →  IP
3 TCP          mở kết nối tới IP:443
4 TLS          bắt tay, kiểm chứng chỉ, mã hóa
5 HTTP         gửi GET /users/42 + headers
       ~~~ INTERNET ~~~
6 FIREWALL     port 443 có mở không
7 NGINX        gỡ TLS → đọc Host → đẩy vào app     [cửa CHÍNH]
8 SPRING BOOT  :8080   định tuyến, chạy logic      [cửa HÔNG]
9 POSTGRESQL   :5432   truy vấn dữ liệu            [cửa HÔNG]
```

**Chín chặng. Chỉ chặng 8 là code bạn viết.** Tám chặng còn lại là hạ tầng, và do đó khi
"web không vào được" mà code không đổi dòng nào, xác suất lỗi nằm ở tám chặng kia lớn hơn
rất nhiều. Đó chính là lý do nghề DevOps tồn tại.

Bản đồ này còn cho thấy một điều thú vị: cùng một cấu hình có thể là lỗi ở chỗ này và là
tính năng ở chỗ khác.

> Việc app *chỉ listen ở `127.0.0.1`* là **bug** trên máy dev (đồng nghiệp không vào được),
> nhưng là **feature bảo mật** trên production (chỉ Nginx đứng cùng máy mới gọi vào được).
> Cùng một cấu hình — bối cảnh quyết định.

---

## Bảng tra: triệu chứng, ai viết ra, chặng hỏng

Cột quan trọng nhất của bảng là **"ai viết ra"**. Mỗi thông báo lỗi đều do một thành phần cụ
thể soạn ra, và biết được tác giả nghĩa là biết request đã đi tới đâu trên bản đồ. Khi gặp sự
cố, hãy tra theo hàng, rồi bắt đầu nghi ngờ từ cột cuối.

| Người dùng thấy | **Ai viết ra** | Chặng | Nghi ngờ đầu tiên |
|---|---|---|---|
| `NXDOMAIN` | Máy **của người dùng** | 2 | Domain chưa trỏ, gõ sai, hết hạn |
| `Timeout` | **Không ai cả** | 3, 6 | Máy chết, sai IP, firewall nuốt gói tin |
| `Connection refused` | **Kernel** của server | 3, 7 | Máy sống nhưng phòng trống: Nginx chết |
| `ERR_CERT_DATE_INVALID` | **Trình duyệt** người dùng | 4 | Cert hết hạn / sai tên miền |
| **502** Bad Gateway | **Nginx** | 7 tới 8 | App chết, sai port, container chưa lên |
| **504** Gateway Timeout | **Nginx** | 7 tới 8 | App sống nhưng quá chậm |
| **500** Internal Server Error | **Spring Boot** | 8 | Bug code — giờ mới đọc code |
| **404** Not Found | Nginx *hoặc* Spring Boot | 7, 8 | Sai path / định tuyến nhầm |
| `pool exhausted` | Spring Boot | 9 | DB chết hoặc quá tải |

### Cặp quan trọng nhất: 502 và 500

Hai mã này trông giống nhau vì đều bắt đầu bằng số 5, nhưng chúng kể hai câu chuyện ngược
nhau. Với 502, Nginx tự viết trang lỗi vì không gọi được app — nghĩa là code của bạn chưa
chạy dòng nào, và log ứng dụng sẽ trống trơn. Với 500, app đã nhận request, đã chạy, rồi tự
ném exception — Nginx chỉ bê hộ trang lỗi đó ra, và log ứng dụng sẽ có một stack trace chờ
sẵn. Chính sự vắng mặt của log cũng là một bằng chứng.

```
502  →  ĐỪNG mở code. Code không chạy dòng nào cả.  (log app TRỐNG TRƠN)
500  →  GIỜ mới mở code. App đã chạy và tự ném exception.  (có stack trace)
```

### Phân biệt tác giả 404 bằng mắt

Mã 404 có thể đến từ hai tác giả khác nhau, và nhìn vào trang lỗi là đủ phân biệt: trang của
Nginx luôn "ký tên" phiên bản ở cuối, còn trang của Spring Boot là Whitelabel Error Page
hoặc một khối JSON.

```
Nginx:  "404 Not Found / nginx/1.24.0"   ← có KÝ TÊN → lỗi cấu hình
Spring: "Whitelabel Error Page" / JSON    ← app có nhận → sai route
```

---

## Ba nguyên tắc chẩn đoán

**1. Mọi mã lỗi HTTP đều là một CÂU TRẢ LỜI.** Muốn nhận được `502`, `500` hay `404`, trình
duyệt phải bắt tay thành công với một ai đó trước đã. Ngược lại, `refused` và `timeout`
không phải mã HTTP; chúng có nghĩa là chưa có câu trả lời nào cả. Vì vậy chỉ một câu hỏi
"có thấy con số không?" đã loại được một nửa bản đồ:

```
Thấy SỐ     →  đã vào được nhà  →  soi NỬA TRONG (7, 8, 9)
Không thấy  →  còn ngoài cổng   →  soi NỬA NGOÀI (2, 3, 6, 7)
```

**2. Triệu chứng không chỉ cho biết chặng nào hỏng — nó còn chứng minh mọi chặng TRƯỚC đó đã
chạy tốt.** Ví dụ, thấy lỗi chứng chỉ nghĩa là DNS đã dịch đúng tên và TCP đã nối được, vì
nếu không thì request đã dừng ở `NXDOMAIN` hay `timeout` từ trước. Hai chặng bị loại khỏi
vùng nghi ngờ mà không cần kiểm tra gì.

**3. Sửa một tầng thì triệu chứng ĐỔI, chứ không chắc hết lỗi.** Và triệu chứng mới chính là
bằng chứng rằng tầng vừa sửa đã đúng. Chẳng hạn, `timeout` đổi thành `refused` sau khi mở
firewall có nghĩa là gói tin giờ đã tới nơi; thủ phạm còn lại nằm ở chặng sau firewall. Do
đó người có kinh nghiệm sửa từng tầng một, chứ không sửa năm thứ cùng lúc rồi đoán.

### Phép thử dứt khoát: refused và timeout

Cách phân biệt đáng tin nhất không phải là tốc độ (tốc độ phụ thuộc hệ điều hành, xem Lab
4), mà là **ai quyết định dừng**. `refused` có điểm kết thúc của riêng nó vì máy bên kia đã
trả lời "không có ai"; `timeout` thì kéo dài đúng bằng con số ta đặt, vì không có ai trả lời
và chính ta phải bảo curl thôi chờ.

```
refused  →  curl dừng vì NHẬN ĐƯỢC CÂU TRẢ LỜI.  Có điểm kết thúc của riêng nó.
timeout  →  curl dừng vì TA bảo dừng.  Thời lượng là con số BẠN chọn.
```

---

## Chứng chỉ TLS

Chứng chỉ không liên quan gì tới việc gán tên miền với IP — **đó là việc của DNS**. Chứng chỉ
giải quyết một bài toán khác: khi một máy nói "tôi là api.tuan.dev", lấy gì để tin nó?

Lời giải mà web đang dùng tên là **hạ tầng khóa công khai** (public key infrastructure, PKI).
Nó chuyển bài toán "làm sao tin một người lạ" thành "làm sao tin một bên thứ ba mà cả hai cùng
tin", rồi để bên thứ ba đó đứng ra bảo lãnh. Bốn thành phần:

| Thuật ngữ | Là gì |
|---|---|
| **Certificate** | Tài liệu điện tử định dạng X.509, ghi "khóa công khai này thuộc về tên miền này", có thời hạn, được CA ký |
| **CA** — Certificate Authority | Tổ chức được trình duyệt tin, có quyền ký chứng chỉ sau khi kiểm tra người xin đang kiểm soát tên miền |
| **Public key** | Nửa công khai của cặp khóa, nằm ngay trong chứng chỉ |
| **Private key** | Nửa bí mật, chỉ nằm trên máy chủ — thứ duy nhất chứng minh mình là chủ chứng chỉ |

### Ẩn dụ hỗ trợ ghi nhớ: giấy tờ tùy thân

Cấu trúc lòng tin này không phải phát minh của ngành máy tính; xã hội đã dùng nó từ lâu:

| Đời thật | TLS |
|---|---|
| Thẻ căn cước | Certificate |
| Bộ Công an cấp | **CA** (Let's Encrypt, DigiCert…) |
| Con dấu khó làm giả | Chữ ký số của CA |
| Bạn tin Bộ Công an | Trình duyệt có sẵn danh sách CA đáng tin |

> **Giới hạn của ẩn dụ.** Căn cước ngoài đời chứng minh *bạn là ai*. Chứng chỉ phổ biến nhất
> trên web (loại **DV** — Domain Validated) chỉ ghi được mỗi tên miền, và CA cấp nó sau khi
> kiểm tra người xin *đang kiểm soát tên miền*, chứ không kiểm tra người đó là ai. Khác biệt
> này chính là lý do mục "DNS là gốc rễ của lòng tin" bên dưới đáng sợ đến thế.

Cần tách bạch hai thứ hay bị gọi nhầm. Chứng chỉ là **công khai** — bấm vào ổ khóa trên trình
duyệt là xem được chứng chỉ của bất kỳ website nào. Thứ bí mật, và là thứ bị đánh cắp trong
các vụ lộ lọt, là **private key**:

```
Certificate  →  CÔNG KHAI. Ai cũng tải được.
Private key  →  BÍ MẬT. ĐÂY mới là thứ bị đánh cắp.
```

**Vì sao chứng chỉ chỉ sống 90 ngày.** Có ba lý do nối vào nhau. Thứ nhất, hạn ngắn giới hạn
thiệt hại: nếu private key lộ, kẻ xấu chỉ mạo danh được tới ngày chứng chỉ hết hạn. Thứ hai,
hạn ngắn **ép phải tự động hóa**, vì không ai gia hạn tay bốn lần một năm mà không quên. Thứ
ba, cơ chế thu hồi chứng chỉ của trình duyệt không đáng tin trong thực tế, nên hạn ngắn *chính
là* cơ chế thu hồi. Lý do thứ hai là một nguyên tắc sẽ gặp lại nhiều lần trong lộ trình:

> Quy trình chạy 1 lần/10 năm thì chắc chắn đã hỏng, chỉ là chưa ai biết.
> Quy trình chạy 4 lần/năm thì luôn được kiểm chứng.
> (Cùng logic: backup không restore thử thì không phải backup.)

### DNS là gốc rễ của lòng tin

CA không có cách nào biết "chủ sở hữu" một tên miền là ai; nó chỉ kiểm tra được ai đang
**kiểm soát** tên miền đó, thường bằng cách yêu cầu tạo một bản ghi DNS. Hệ quả là kẻ chiếm
được tài khoản quản lý DNS có thể **xin được một chứng chỉ hợp lệ thật**, và người dùng vẫn
thấy ổ khóa bình thường.

> **CA không biết chủ sở hữu là ai. CA chỉ biết ai đang KIỂM SOÁT tên miền.**

Vì vậy ba việc phòng thủ là: bật 2FA cho tài khoản nhà đăng ký tên miền (ưu tiên hơn cả 2FA
GitHub); khai báo bản ghi CAA để chỉ định CA nào được cấp chứng chỉ cho tên miền của bạn; và
theo dõi Certificate Transparency — sổ công khai ghi lại mọi chứng chỉ được cấp. Việc thứ hai
và thứ ba sẽ làm thật ở Bài 27–28.

---

## Hệ thống hỏng mà không ai đụng vào

Phần lớn dev mang trong đầu mô hình "có lỗi tức là ai đó vừa thay đổi cái gì". Mô hình đó
sai với cả một nhóm sự cố, trong đó **thời gian trôi qua tự nó là nguyên nhân**:

```
Chứng chỉ TLS hết hạn          ← 90 ngày
Tên miền hết hạn               ← 1 năm
Ổ cứng đầy dần vì log          ← vài tháng
Memory leak tích tụ            ← vài tuần
API key / token hết hạn        ← tùy nhà cung cấp
```

Không sự cố nào trong số đó bị bắt bởi code review, unit test hay staging, bởi vì chúng không
nằm trong code. Cách chống lại chúng là tự động hóa (gia hạn chứng chỉ bằng timer, Bài 28) và
giám sát có cảnh báo trước (Bài 38).

> **Câu hỏi tự kiểm tra:** *"Cái gì trong hệ thống này sẽ tự hỏng nếu tôi không động vào nó
> trong 6 tháng?"*

Một biến thể của cùng ý tưởng là `"container đang chạy"` ≠ `"app sẵn sàng"`. Docker báo
container `Up` ngay giây đầu tiên vì process đã khởi động, nhưng Spring Boot cần thêm 15–60
giây để nạp context và mở port 8080. Khoảng chênh đó là **cửa sổ 502 ở mọi lần deploy**. Đó là
lý do `depends_on` trong Docker Compose không đủ (Bài 20), và vì sao cần zero-downtime deploy
(Bài 35).

---

## Tám lý do cần Nginx dù Spring Boot tự chạy được web server

Mẫu tư duy đứng sau danh sách này là: mỗi tầng trong hệ thống tồn tại vì nó **gỡ một trách
nhiệm ra khỏi tầng khác**. Mỗi dòng dưới đây là một trách nhiệm mà Nginx gánh hộ ứng dụng.

1. **Gỡ TLS** — app không cần biết HTTPS tồn tại, và gia hạn chứng chỉ không phải restart app.
2. **Lớp chắn** — rate limit, giới hạn kích thước body, chặn rác được xử lý *trước khi* chạm
   vào app.
3. **Giảm attack surface** — lỗ hổng trong dependency vẫn nằm đó, nhưng không ai từ Internet
   chạm trực tiếp tới được.
4. **Lễ tân** — nhận việc, đưa vào trong, bê kết quả ra; khách không bao giờ vào trong.
5. **Port <1024 cần root** — Nginx khởi động bằng root chỉ để chiếm port 80/443, rồi *hạ quyền
   ngay* cho các tiến trình con.
6. **Một IP, nhiều app** — Nginx đọc header `Host` để biết khách đang hỏi website nào.
7. **File tĩnh** — trả file ảnh, CSS, JS là việc Nginx làm rẻ hơn JVM rất nhiều.
8. **Deploy không đứt** — khởi động bản mới, đợi nó sẵn sàng, rồi mới chuyển luồng sang.

> Gặp công cụ mới, luôn hỏi: **"Nó gánh hộ ai việc gì?"** Trả lời được câu đó là hiểu công cụ,
> chứ không chỉ thuộc lệnh của nó.

---

## Lab

Mục tiêu của phần lab là **nhìn tận mắt** từng chặng trên bản đồ, bằng những công cụ có sẵn
trên máy. Mỗi bước dưới đây ghi rõ ba điều: làm để thấy gì, kết quả kỳ vọng (lấy từ lần chạy
thật trên máy học ngày 24/09/2026), và nếu kết quả khác thì nó nói lên điều gì.

**Lưu ý:** chạy trong **Git Bash** hoặc WSL. **Không** chạy trong `cmd.exe` — ở đó `time` là lệnh
**đặt đồng hồ hệ thống** chứ không phải đo thời gian, và `;` không tách được hai lệnh. Đây là
lỗi đã thực sự gặp trong buổi học.

Cách nhanh nhất là chạy cả kịch bản một lượt:

```bash
bash lab/lab-00.sh
```

Hoặc làm từng bước như dưới đây để có thời gian đọc output.

### Lab 1 — chặng 2 DNS: tên miền dịch ra số

```bash
nslookup github.com
nslookup khong-ton-tai-dau-nhe-12345.com
```

Lệnh thứ nhất cho thấy DNS làm đúng việc của nó: nhận một cái tên, trả về một địa chỉ IP. Kỳ
vọng thấy dòng `Server:` là máy chủ DNS mà máy bạn đang hỏi (trên máy học là router WiFi
`wifi.cmcc`, địa chỉ link-local `fe80::10`) và một dòng `Address:` là IP của GitHub. Lệnh thứ
hai cố ý hỏi một tên không tồn tại để thấy chặng 2 **hỏng** trông thế nào: kỳ vọng
`Non-existent domain`, tức `NXDOMAIN`. Nếu lệnh thứ nhất cũng báo lỗi, thì vấn đề nằm ở kết
nối tới máy chủ DNS (mạng, router), chứ chưa liên quan gì tới GitHub.

### Lab 2 — chặng 3, 4, 5 nối nhau

```bash
curl -v https://example.com
```

Cờ `-v` (verbose) bắt curl in ra từng bước nó làm, nên ta thấy được ba chặng nối tiếp nhau
trên màn hình: dòng `Established connection` là chặng 3 (TCP đã thông, để ý cả port phía
mình), các dòng bắt tay là chặng 4, dòng `> GET /` và `> Host: example.com` là chặng 5. Trên
máy học, dòng `< Server: cloudflare` còn cho thấy một reverse proxy ngoài đời thật đang đứng
trước website. Lưu ý: curl của Git for Windows được biên dịch trên **schannel** chứ không phải
OpenSSL, nên nó **không in** thông tin chứng chỉ — đó không phải lỗi của bạn, và là lý do có
Lab 3.

### Lab 3 — chặng 4: đọc tấm "căn cước" của một website thật

```bash
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates
```

Lệnh này lấy chứng chỉ mà server trình ra trong lúc bắt tay TLS, rồi chỉ in bốn trường quan
trọng. `subject` là chứng chỉ cấp cho ai, `issuer` là CA nào ký bảo lãnh, còn `notBefore` và
`notAfter` là khoảng thời gian chứng chỉ có hiệu lực. Kết quả đo thật ngày 24/09/2026:
`notBefore=Jul 29 22:10:08 2026 GMT`, `notAfter=Oct 27 22:17:21 2026 GMT` — vòng đời đúng **90
ngày**, còn **33 ngày** tại thời điểm đo. Nếu `subject` không khớp với tên miền bạn gõ, trình
duyệt sẽ báo lỗi chứng chỉ; nếu `notAfter` đã qua, đó chính là kịch bản "sáng thứ Hai web sập".

### Lab 4 — tự gây `refused`, rồi tự gây `timeout`, và so sánh

```bash
time curl -4 -o /dev/null http://127.0.0.1:9999
time curl -4 -o /dev/null --max-time 5 http://10.255.255.1:9999
```

Đây là bước "cố tình gây lỗi" của bài. Lệnh thứ nhất gõ vào phòng 9999 của chính máy mình —
máy chắc chắn sống nhưng không có ai ngồi trong phòng, nên kernel trả lời "không có ai" và
curl nhận `refused`. Lệnh thứ hai gửi tới một địa chỉ không có ai trả lời, nên curl chờ cho
tới khi hết 5 giây ta cho phép. Kết quả đo thật trên Windows:

```
127.0.0.1:9999      → curl: (7)  after 2076 ms     real 2.155s
10.255.255.1:9999   → curl: (28) after 5007 ms     real 5.066s
```

Mã `(7)` là không kết nối được, mã `(28)` là hết giờ. Con số 2 giây của `refused` là đặc thù
của Windows (nó tự thử lại vài lần trước khi bỏ cuộc); trên Linux kernel trả lời gần như tức
thì. Vì vậy đừng dùng tốc độ để phân biệt hai loại lỗi — hãy dùng Lab 5.

### Lab 5 — chứng minh: `timeout` do TA quyết định, `refused` thì không

```bash
time curl -4 -o /dev/null --max-time 15 http://10.255.255.1:9999
```

Chỉ đổi `5` thành `15`. Kỳ vọng: lần này lệnh chạy đúng khoảng 15 giây, chứng minh thời lượng
của `timeout` là con số **ta** chọn. Ngược lại, dù đặt `--max-time` bao nhiêu cho lệnh `refused`
ở Lab 4, nó vẫn dừng ở khoảng 2 giây, bởi vì nó có điểm kết thúc của riêng nó. Nếu lệnh này
dừng sớm với một thông báo khác (chẳng hạn `No route to host`), nghĩa là mạng của bạn đã chủ
động từ chối đường đi tới dải `10.x` — kết quả đó vẫn dạy được điều gì đó, hãy ghi vào
`notes.md`.

Kết quả thật và phần mổ xẻ từng dòng nằm ở **[phan-tich-output.html](phan-tich-output.html)**

---

## Tự kiểm tra

Chỉ đánh dấu khi trả lời được bằng lời của mình, không nhìn lại tài liệu.

- [ ] Giải thích `localhost:8080` từng phần, và vì sao không gửi link đó cho người khác được
- [ ] Nói được một máy có mấy địa chỉ IP, và vì sao chúng không thay thế được nhau
- [ ] Tách được *"có ai đang listen"* với *"firewall có cho qua"* — hai khái niệm, hai triệu chứng
- [ ] Giải thích vì sao `refused` **chỉ** xảy ra khi máy còn sống
- [ ] Phân biệt 502 / 500, nói được **ai viết ra** mỗi trang lỗi
- [ ] Nói được ≥3 lý do cần Nginx dù Spring Boot đã tự chạy được web server
- [ ] Giải thích chứng chỉ TLS là gì, và vì sao nó chỉ sống 90 ngày
- [ ] Giải thích vì sao chiếm được DNS là chiếm được cả HTTPS
- [ ] Kể được 3 thứ sẽ tự hỏng nếu không ai động vào trong 6 tháng
- [ ] Vẽ lại sơ đồ từ chặng 1 tới chặng 9 không cần nhìn tài liệu

---

## Còn treo sang bài sau

Có một thí nghiệm đối chứng chưa làm được vì phòng lab Linux đã bị gỡ: chạy lại
`time curl -4 -o /dev/null http://127.0.0.1:9999` trong **WSL Ubuntu** để so với con số
**2,155s** đo trên Windows. Việc này làm ở **Bài 02**, ngay sau khi cài lại Ubuntu.

Lỗi đã gặp trong buổi học và chín chỗ hiểu sai đã được sửa (chẳng hạn "VPS còn sống thì không
thể `refused`" — thực tế là ngược lại) được ghi ở [`notes.md`](notes.md).

**Bài tiếp:** [01 — Máy tính, Hệ điều hành, Process](../01-may-tinh-va-he-dieu-hanh/)

---

## Nguồn đọc thêm

Chỉ gồm tài liệu chuẩn và tài liệu chính thức — nơi định nghĩa gốc của những khái niệm trong bài.

- RFC 3986 — cú pháp chung của URI (năm phần của một URL): https://www.rfc-editor.org/rfc/rfc3986
- RFC 1035 — đặc tả DNS: https://www.rfc-editor.org/rfc/rfc1035
- RFC 9293 — đặc tả TCP hiện hành: https://www.rfc-editor.org/rfc/rfc9293
- RFC 8446 — TLS 1.3: https://www.rfc-editor.org/rfc/rfc8446
- RFC 9110 — ngữ nghĩa HTTP, gồm định nghĩa các mã 404, 500, 502, 504: https://www.rfc-editor.org/rfc/rfc9110
- RFC 5280 — cấu trúc chứng chỉ X.509: https://www.rfc-editor.org/rfc/rfc5280
- RFC 8659 — bản ghi DNS CAA: https://www.rfc-editor.org/rfc/rfc8659
- RFC 6962 — Certificate Transparency: https://www.rfc-editor.org/rfc/rfc6962
- `connect(2)` — nơi Linux định nghĩa lỗi `ECONNREFUSED` và `ETIMEDOUT`: https://man7.org/linux/man-pages/man2/connect.2.html
- Tài liệu chính thức của curl: https://curl.se/docs/manpage.html
- Let's Encrypt — tài liệu và FAQ: https://letsencrypt.org/docs/
