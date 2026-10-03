# Bài 01 — IP, port, listen, firewall: vì sao gọi không tới

<img src="../../assets/readme/glyph/01.svg" width="132" align="right" alt="Ấn ký của Bài 01">

> **Module M0** · Nền tảng tối thiểu · 3–5 giờ học (đọc trước, đối thoại, lab, ghi chép) · chỉ cần Git Bash và Node

**Bài giảng đầy đủ:** [`index.html`](index.html) —
[bản online](https://anhtuan2111.github.io/devops-self-learning/lessons/01-ip-port-listen-firewall/) ·
**Phụ lục lịch sử:** [`ipv4-vs-ipv6.html`](ipv4-vs-ipv6.html)

File này là **vở bài tập** của bài: bảng tra, các bước lab kèm lý do và kết quả kỳ vọng, danh sách tự
kiểm tra. Phần giảng vì sao, sơ đồ và ảnh nằm trong `index.html`; output đầy đủ của các lần chạy thật
nằm trong [`notes.md`](notes.md).

---

## Câu hỏi của bài

[Bài 00](../00-ban-do-toan-canh/) kết thúc ở câu hỏi này:

**App chạy ngon khi gọi bằng localhost:8080 trên chính máy mình, nhưng người khác gọi vào thì không được. Chặng mở kết nối hỏng ở đâu?**

Bài tách chặng 3 của bản đồ (mở kết nối) thành bốn câu nhỏ. Hãy thử tự trả lời trước khi đọc:

1. Một máy có những địa chỉ IP nào, và vì sao `localhost` luôn trỏ về máy của chính người gõ nó?
2. Trong một máy có hàng chục chương trình, kết nối được giao cho đúng chương trình bằng cách nào?
3. Firewall chặn ở đâu, và vì sao phải đủ ba điều kiện thì người khác mới gọi tới được?
4. Khi thiếu một điều kiện, triệu chứng trông thế nào, và `refused` khác `timeout` ra sao?

## Cần đã học trước

- [Bài 00](../00-ban-do-toan-canh/): bản đồ chín chặng; URL gồm host và port; DNS đổi tên thành địa chỉ
  IP; mạng chuyển gói tin qua các router; TCP mở một đường truyền tin cậy; lệnh `curl`.

---

## Thuật ngữ

| Thuật ngữ | Tiếng Việt | Định nghĩa một câu |
|---|---|---|
| IP address | địa chỉ IP | Con số định danh một giao diện mạng; IPv4 dài 32 bit, viết thành bốn số 0–255. |
| Network interface | giao diện mạng | Điểm một máy nối vào một mạng (card WiFi, cổng cáp, card ảo); mỗi giao diện có địa chỉ riêng. |
| Loopback | giao diện vòng lặp | Giao diện ảo, gói tin gửi tới nó quay ngược vào chính máy đó; địa chỉ `127.0.0.1`, IPv6 là `::1`. |
| `localhost` | — | Cái tên mà mọi máy dịch về loopback **của chính nó**. |
| Mạng riêng | private network | Dải `10.x`, `172.16.x`–`172.31.x`, `192.168.x`: dùng trong mạng nội bộ, không bao giờ ra Internet. |
| Link-local | — | Địa chỉ IPv6 bắt đầu bằng `fe80`, chỉ có nghĩa giữa các thiết bị nối trực tiếp. |
| DHCP | — | Cơ chế router cho máy **thuê** địa chỉ trong một thời hạn; địa chỉ có thể đổi. |
| Port | cổng | Con số 16 bit (0–65535) trong phần đầu gói tin TCP, dùng để chọn chương trình nhận. |
| Listen | lắng nghe | Chương trình xin hệ điều hành giao cho nó mọi kết nối tới một port. |
| Listen address | địa chỉ listen | Địa chỉ mà chương trình gắn port vào: `127.0.0.1` (chỉ trong máy), một IP cụ thể, hay `0.0.0.0` (mọi địa chỉ). |
| Firewall | tường lửa | Bộ lọc gói tin theo luật, làm việc **trước** khi gói tin tới chương trình đang listen. |
| Three-way handshake | bắt tay ba bước | `SYN`, `SYN-ACK`, `ACK`: cách TCP mở một kết nối. |
| RST | gói reset | Gói hệ điều hành gửi lại khi `SYN` tới một port không ai listen. |
| Bộ bốn | — | Địa chỉ và port của bên gọi, địa chỉ và port của bên nhận: bốn con số nhận diện một kết nối. |
| Ephemeral port | port tạm | Port của bên gọi, hệ điều hành tự cấp (thường 49152–65535) và thu hồi khi kết nối đóng. |
| Refused | bị từ chối | Bên gọi nhận được `RST`; `curl` báo mã `(7)`. |
| Timeout | hết giờ chờ | Bên gọi chờ quá thời hạn mà không có câu trả lời; `curl` báo mã `(28)`. |

---

## Ba điều kiện để người khác gọi tới được

Gói tin từ máy khác gặp ba điều kiện theo đúng thứ tự dưới đây. Thiếu điều kiện nào thì triệu chứng
mang dấu của điều kiện đó.

| # | Điều kiện | Thiếu thì thấy gì |
|---|---|---|
| 1 | Gọi đúng địa chỉ: địa chỉ của máy bạn trong mạng chung, như `192.168.10.38:8080`, không phải `localhost` | `refused`, ở chính máy người gọi |
| 2 | Firewall trên máy bạn cho gói tin từ ngoài vào port 8080 | `timeout` |
| 3 | App listen trên địa chỉ được gọi tới hoặc trên `0.0.0.0`, không chỉ `127.0.0.1` | `refused` |

Hai hệ quả cần nhớ:

- Thiếu điều kiện 1 và thiếu điều kiện 3 cho **cùng** triệu chứng `refused`, nên gặp `refused` thì kiểm cả hai.
- **Sửa đúng một điều kiện thì triệu chứng đổi.** Mở firewall xong mà triệu chứng đổi từ `timeout` sang
  `refused` nghĩa là firewall đã sửa đúng, giờ gói tin vấp ở điều kiện 3.

### Ẩn dụ hỗ trợ ghi nhớ: một tòa nhà

Phép so sánh này **không phải định nghĩa**, chỉ giúp giữ bốn vai tách bạch:

```
địa chỉ IP           =  một LỐI VÀO của tòa nhà (tòa nhà có nhiều lối vào)
port                 =  số PHÒNG bên trong tòa nhà
chương trình listen  =  NGƯỜI ngồi trong phòng, tự chọn tiếp khách
                        đến từ lối vào nào (listen address)
firewall             =  BẢO VỆ ở lối vào, lọc ai được đi vào
```

> **Giới hạn của ẩn dụ.** Không có căn phòng nào: port chỉ là con số 16 bit trong phần đầu gói tin, và
> hệ điều hành dùng nó để tra bảng listen. "Lối vào" cũng gợi ý thứ vật lý, trong khi giao diện mạng có
> thể là card ảo do phần mềm tạo ra. Khi ẩn dụ và định nghĩa mâu thuẫn, định nghĩa thắng.

---

## Refused và timeout

| | `refused` | `timeout` |
|---|---|---|
| Ở tầng TCP | `SYN` đi, `RST` quay về | `SYN` đi, không gì quay về; bên gọi gửi lại `SYN` rồi bỏ cuộc |
| Ai quyết định lúc dừng | Bên gọi dừng vì **nhận được câu trả lời** | Bên gọi dừng vì **ta bảo nó dừng** (`--max-time`) |
| Máy đích | **Còn sống**: phải có hệ điều hành đang chạy mới gửi được `RST` | Có thể sống mà firewall vứt gói tin lặng lẽ, hoặc không có máy nào |
| Thường chỉ về | Điều kiện 1 hoặc 3 | Điều kiện 2, hoặc địa chỉ không có máy |
| `curl` | `(7)` `CURLE_COULDNT_CONNECT` | `(28)` `CURLE_OPERATION_TIMEDOUT` |

Đừng phân biệt bằng tốc độ: trên Windows, một lần `refused` tới chính máy mình mất hơn hai giây.
Ngoại lệ cần biết: firewall cấu hình **từ chối** (thay vì vứt bỏ) thì bên gọi cũng thấy `refused`.

---

## Lab

Tất cả chạy trong **Git Bash** trên Windows. Lab 1 và Lab 2 đo hai triệu chứng; Lab 3 tự gây lỗi ở
điều kiện 3 rồi tự sửa.

### Lab 1 — tự gây `refused`, rồi tự gây `timeout`

```bash
time curl -4 -o /dev/null http://127.0.0.1:9999
time curl -4 -o /dev/null --max-time 5 http://10.255.255.1:9999
```

**Vì sao hai lệnh này:** port 9999 của chính máy mình thì máy chắc chắn đang sống mà không ai listen,
nên phải ra `refused`. Địa chỉ `10.255.255.1` thuộc dải mạng riêng nhưng trong mạng gia đình bình thường
không có máy nào mang nó, nên `SYN` không tới được máy nào và không có gì quay về: cách an toàn để tự tạo `timeout`. Cờ `-4` buộc dùng
IPv4; `-o /dev/null` bỏ phần nội dung nhận được (Bài 04 giải thích ký hiệu này).

**Kỳ vọng:** lệnh 1 báo `curl: (7)`, lệnh 2 báo `curl: (28)` sau đúng khoảng 5 giây.

**Số đo thật (24/09/2026):** refused `real 2.155s` (curl báo `after 2076 ms`); timeout `real 5.066s`.

### Lab 2 — chứng minh `timeout` do ta quyết định

```bash
time curl -4 -o /dev/null --max-time 15 http://10.255.255.1:9999
time curl -4 -o /dev/null --max-time 15 http://127.0.0.1:9999
```

**Vì sao:** nếu `timeout` là do ta quyết định thì đổi 5 thành 15 phải kéo nó lên đúng 15 giây, còn
`refused` có điểm kết thúc của riêng nó nên không đổi.

**Kỳ vọng và số đo thật (03/10/2026):** timeout `real 15.059s`, refused `real 2.082s`.

Nếu lệnh thứ nhất dừng sớm với `No route to host`, nghĩa là mạng của bạn chủ động từ chối đường tới
dải `10.x`: đó là một lời từ chối, không phải sự im lặng. Ghi lại vào `notes.md`.

### Lab 3 — tự gây lỗi ở điều kiện 3: listen sai địa chỉ

Tệp [`lab/nghe.js`](lab/nghe.js) là một server nhỏ chạy bằng Node, listen port 8080 trên địa chỉ bạn
truyền vào. Trước hết tìm địa chỉ WiFi của máy bằng `ipconfig` (dòng `IPv4 Address` dưới mục card WiFi).
Mở hai cửa sổ Git Bash ở thư mục bài này.

```bash
# Cửa sổ 1 — chỉ listen trên loopback
node lab/nghe.js 127.0.0.1

# Cửa sổ 2 — thay 192.168.x.y bằng địa chỉ WiFi của máy bạn
netstat -ano | grep ":8080 " | grep LISTEN
curl http://127.0.0.1:8080
curl http://192.168.x.y:8080
```

**Kỳ vọng:** `netstat` in `127.0.0.1:8080 … LISTENING`; gọi `127.0.0.1` nhận `xin chao tu 127.0.0.1`;
gọi địa chỉ WiFi ra `curl: (7)`. App vẫn chạy ngon, chỉ là nó không nhận kết nối gọi tới địa chỉ WiFi.

**Sửa:** Ctrl+C ở cửa sổ 1, chạy `node lab/nghe.js 0.0.0.0`, lặp lại ba lệnh. `netstat` đổi thành
`0.0.0.0:8080`, cả hai `curl` đều nhận được câu trả lời.

**Bước thêm, nếu có máy thứ hai hoặc điện thoại cùng WiFi:** mở `http://192.168.x.y:8080` từ đó. Quay
lâu rồi báo lỗi là điều kiện 2: firewall đang vứt kết nối đi vào. Thêm luật ở mục dưới, thử lại, rồi gỡ:

```powershell
Remove-NetFirewallRule -DisplayName "Spring Boot dev 8080"
```

Gọi địa chỉ WiFi **từ chính máy mình** không kiểm được firewall, vì gói tin không thật sự đi ra mạng;
muốn kiểm điều kiện 2, gói tin phải đến từ máy khác.

---

## Thói quen phải bỏ từ hôm nay

Gặp lỗi mạng, **đừng tắt firewall** cho nhanh. Mở **đúng một port, cho đúng nguồn cần thiết** (PowerShell,
quyền quản trị):

```powershell
New-NetFirewallRule -DisplayName "Spring Boot dev 8080" `
  -Direction Inbound -LocalPort 8080 -Protocol TCP `
  -RemoteAddress LocalSubnet -Action Allow
```

Nguyên tắc đứng sau: **least privilege**, đặc quyền tối thiểu. Thói quen hình thành trên máy dev là thói
quen người ta mang lên máy chủ thật.

---

## Tự kiểm tra

- [ ] Giải thích được vì sao `localhost` là một từ tương đối
- [ ] Nói được một máy có mấy địa chỉ IP, và vì sao chúng không thay thế được nhau
- [ ] Kể được ba điều kiện để gọi tới được một app, theo đúng thứ tự gói tin gặp chúng
- [ ] Giải thích được listen `127.0.0.1` khác listen `0.0.0.0` thế nào
- [ ] Phân biệt được `refused` và `timeout`, và điều kiện nào thiếu sinh ra cái nào
- [ ] Giải thích được vì sao `refused` chỉ xảy ra khi máy đích còn sống
- [ ] Đọc được bộ bốn của một kết nối trong output `curl -v`
- [ ] Nói được vì sao một server không đặt trên laptop ở nhà

## Kết lại

Muốn gọi tới được cần đủ ba điều kiện: đúng địa chỉ IP, có chương trình listen ở port đó trên đúng địa
chỉ, và firewall cho đi qua. `refused` hay `timeout` cho biết điều kiện nào đang thiếu.

## Câu hỏi cho bài sau

Khi đủ ba điều kiện thì kết nối mở được, nhưng có kết nối chưa có nghĩa là có câu trả lời đúng:

**Kết nối tới được rồi mà trang vẫn báo 502, 500 hay 504. Lỗi đó do ai viết ra, và nó cho biết chặng nào đang hỏng?**

[Bài 02 — Chẩn đoán theo chặng](../02-chan-doan-theo-chang/) trả lời câu này.
