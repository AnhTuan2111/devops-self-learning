# Ghi chú — Bài 01

**Ngày học:** 21–24/09/2026 (học chung buổi với Bài 00, tách thành bài riêng ngày 03/10/2026)
**Hình thức:** đối thoại thầy–trò + lab trên Git Bash, Windows 11

Ghi chú thô: output lab thật, lỗi đã gặp, chỗ hiểu sai, câu hỏi còn treo. Bài giảng đầy đủ ở
[`index.html`](index.html), vở bài tập ở [`README.md`](README.md).

---

## Kết quả lab thật

### Lab 1 — refused và timeout (24/09/2026)

```
127.0.0.1:9999      → curl: (7)  after 2076 ms     real 2.155s
10.255.255.1:9999   → curl: (28) after 5007 ms     real 5.066s
```

Refused tới chính máy mình mà mất hơn 2 giây: Windows thử lại vài lần trước khi kết luận bị từ chối.
Đã dùng `-4` và gõ thẳng `127.0.0.1`, nên không phải chuyện `localhost` thử `::1` trước.

### Lab 2 — `--max-time 15` (chạy lại ngày 03/10/2026 khi tách bài)

```
$ time curl -4 -o /dev/null --max-time 15 http://10.255.255.1:9999
curl: (28) Connection timed out after 15003 milliseconds
real    0m15.059s

$ time curl -4 -o /dev/null --max-time 15 http://127.0.0.1:9999
curl: (7) Failed to connect to 127.0.0.1 port 9999 after 2017 ms: Could not connect to server
real    0m2.082s
```

Timeout khớp `--max-time` tới từng mili-giây; refused vẫn khoảng 2 giây. Kết luận: phân biệt hai triệu
chứng bằng **ai quyết định lúc dừng**, không bằng tốc độ.

### Lab 3 — listen address (output của người viết, 03/10/2026)

Lab này thêm vào khi tách bài, chưa chạy trong buổi học. Địa chỉ WiFi thật đã được thay bằng
`192.168.10.38`.

```
# listen 127.0.0.1
PID 25800 dang listen 127.0.0.1:8080
  TCP    127.0.0.1:8080         0.0.0.0:0              LISTENING       25800
$ curl http://127.0.0.1:8080
xin chao tu 127.0.0.1
$ curl http://192.168.10.38:8080
curl: (7) Failed to connect to 192.168.10.38 port 8080 after 2039 ms: Could not connect to server

# listen 0.0.0.0
PID 25352 dang listen 0.0.0.0:8080
  TCP    0.0.0.0:8080           0.0.0.0:0              LISTENING       25352
$ curl http://127.0.0.1:8080
xin chao tu 0.0.0.0
$ curl http://192.168.10.38:8080
xin chao tu 0.0.0.0
```

Output của bạn (dán vào đây, nhớ thay địa chỉ thật nếu định đưa lên chỗ công khai):

```

```

### Dòng kết nối trong `curl -v https://example.com` (lab Bài 00, 24/09/2026)

```
* Established connection to example.com (104.20.23.154 port 443) from 192.168.10.38 port 55289
```

Bộ bốn: `192.168.10.38:55289` (bên gọi, port tạm do hệ điều hành cấp) tới `104.20.23.154:443` (bên
nhận). Địa chỉ WiFi của cùng máy đã đổi từ `192.168.110.203` sang `192.168.10.38` giữa hai lần đo:
router cho thuê địa chỉ qua DHCP.

---

## Lỗi đã gặp

| Lỗi | Nguyên nhân | Cách xử lý |
|---|---|---|
| `time: The system cannot accept the time entered` | Chạy trong `cmd.exe`, ở đó `time` là lệnh **đặt đồng hồ hệ thống**, không phải đo thời gian | Chuyển sang Git Bash |
| `curl: option ---: is unknown` | Trong `cmd.exe`, `;` không phải dấu tách hai lệnh | Chuyển sang Git Bash |
| Lệnh cuối không in gì | Cờ `-s` của `curl` giấu luôn cả thông báo lỗi | Bỏ `-s` khi muốn xem lỗi |

---

## Chỗ hiểu sai và đã được sửa

| Lúc đầu nghĩ | Thực tế |
|---|---|
| `127.0.0.1` là "IPv4 mặc định của máy" | Là **loopback**, một trong nhiều địa chỉ. Máy lúc đó có ít nhất ba địa chỉ cùng lúc. |
| "Không mở cổng 8080" là một khái niệm | Là **hai** khái niệm: có chương trình listen không, và firewall có cho qua không. Hai triệu chứng khác nhau. |
| Dải `127.0.0.0/8` có `127⁴` địa chỉ | `/8` đếm bit: dải có `2²⁴`, khoảng 16,7 triệu địa chỉ, dù máy thường chỉ dùng `127.0.0.1`. |
| Máy chủ còn sống thì không thể `refused` | Ngược lại: `refused` **chỉ** xảy ra khi máy còn sống, vì phải có hệ điều hành đang chạy mới gửi được `RST`. |
| Mở firewall xong là đồng nghiệp vào được | Chưa chắc. Nếu app chỉ listen `127.0.0.1`, triệu chứng đổi từ `timeout` sang `refused`; triệu chứng đổi chứng tỏ firewall đã sửa đúng. |
| Refused nhanh, timeout chậm | Trên Windows refused cũng mất 2 giây. Phân biệt bằng ai quyết định lúc dừng. |

---

## Câu hỏi còn treo

- [ ] Chạy lại `time curl -4 -o /dev/null http://127.0.0.1:9999` trong **WSL Ubuntu** để so với
      2,155 s trên Windows. Làm ở [Bài 04](../04-phong-lab-wsl-docker/), sau khi dựng phòng lab Linux.
- [ ] `-RemoteAddress LocalSubnet` trong `New-NetFirewallRule` cụ thể bao gồm những dải nào? Chỗ tra:
      mục tham số `-RemoteAddress` trong tài liệu `New-NetFirewallRule` của Microsoft Learn.
- [ ] Nếu mạng WiFi bật **client isolation** (các máy cùng WiFi không được nói chuyện trực tiếp với
      nhau) thì mở firewall cũng vô ích. Làm sao kiểm tra một mạng có bật nó không, và triệu chứng lúc
      đó là `refused` hay `timeout`?

---

## Lệnh muốn nhớ

```bash
# Đo thời gian và ép IPv4 (Git Bash)
time curl -4 -o /dev/null --max-time 5 <url>

# Xem port nào đang có chương trình listen (Windows)
netstat -ano | grep LISTEN

# Địa chỉ IP của từng giao diện mạng (Windows)
ipconfig
```

```powershell
# Mở firewall đúng một port, đúng nguồn (PowerShell, quyền quản trị)
New-NetFirewallRule -DisplayName "Spring Boot dev 8080" -Direction Inbound `
  -LocalPort 8080 -Protocol TCP -RemoteAddress LocalSubnet -Action Allow

# Gỡ khi xong việc
Remove-NetFirewallRule -DisplayName "Spring Boot dev 8080"
```
