# Ghi chú — Bài 00

**Ngày học:** 21–24/09/2026
**Hình thức:** đối thoại thầy–trò, 4 phần lý thuyết + 5 lab

---

## Kết quả lab thật

### Lab 1 — `nslookup`

```
Server:  wifi.cmcc
Address: fe80::10

Non-authoritative answer:
Name:    github.com
Address: 20.205.243.166
```

```
*** wifi.cmcc can't find khong-ton-tai-dau-nhe-12345.com: Non-existent domain
```

### Lab 2 — `curl -v https://example.com`

```
* IPv6: 2606:4700:10::ac42:93f3, 2606:4700:10::6814:179a
* IPv4: 104.20.23.154, 172.66.147.243
* Established connection to example.com (104.20.23.154 port 443) from 192.168.10.38 port 55289
> Host: example.com
< Server: cloudflare
< Age: 3889
< cf-cache-status: HIT
< CF-RAY: a40142dcc8e87164-HKG
```

### Lab 3 — chứng chỉ

```
subject=CN=example.com
issuer=C=US, O=SSL Corporation, CN=Cloudflare TLS Issuing ECC CA 3
notBefore=Jul 29 22:10:08 2026 GMT
notAfter=Oct 27 22:17:21 2026 GMT
```

→ vòng đời đúng **90 ngày**, còn **33 ngày** tại thời điểm đo.

### Lab 4 — refused vs timeout

```
127.0.0.1:9999      → curl: (7)  after 2076 ms     real 2.155s
10.255.255.1:9999   → curl: (28) after 5007 ms     real 5.066s
```

---

## Lỗi đã gặp

| Lỗi | Nguyên nhân | Cách xử lý |
|---|---|---|
| `time: The system cannot accept the time entered` | Chạy trong `cmd.exe`, ở đó `time` là lệnh **đặt đồng hồ hệ thống**, không phải đo thời gian | Chuyển sang Git Bash |
| `curl: option ---: is unknown` | `;` trong `cmd.exe` không phải dấu tách lệnh | Chuyển sang Git Bash |
| Lệnh cuối không in gì | Cờ `-s` giấu luôn cả thông báo lỗi | Bỏ `-s` |
| `curl -v` không in thông tin chứng chỉ | Git for Windows biên dịch curl dựa trên **schannel**, không phải OpenSSL | Dùng `openssl s_client` |
| `wsl bash -c ...` → `bash: not found` | **Ubuntu đã bị gỡ**, chỉ còn distro `docker-desktop` (không có bash) | Cài lại Ubuntu ở Bài 02 |
| Docker daemon không kết nối được | Docker Desktop chưa chạy | Bật Docker Desktop ở Bài 02 |

---

## Chỗ tôi hiểu sai và đã được sửa

| Tôi nghĩ | Thực tế |
|---|---|
| `127.0.0.1` là "IPv4 mặc định của máy" | Là **loopback**, một trong nhiều địa chỉ. Máy đang có ≥3 địa chỉ cùng lúc. |
| "Không mở cổng 8080" là một khái niệm | Là **hai** khái niệm: *có process listen không* và *firewall có cho qua không* → hai triệu chứng khác nhau |
| Máy hỏi nslookup có `127⁴` địa chỉ | Dải `127.0.0.0/8` có `2²⁴` ≈ 16,7 triệu — nhưng máy chỉ **được gán** `127.0.0.1` |
| VPS còn sống thì không thể `refused` | Ngược lại: **`refused` CHỈ xảy ra khi máy còn sống**. Máy chết thì `timeout`. |
| Lỗi chứng chỉ do "không dịch được DNS" | Lỗi cert **chứng minh** DNS và TCP đã chạy tốt. Nếu DNS hỏng thì đã dừng ở `NXDOMAIN`. |
| Chứng chỉ = đăng ký tên miền với IP | Đó là DNS. Chứng chỉ chứng minh **danh tính**, và không chứa IP. |
| "Chứng chỉ bị đánh cắp" | Chứng chỉ **công khai**. Thứ bí mật và bị đánh cắp là **private key**. |
| Mở firewall xong là đồng nghiệp vào được | Chưa chắc — **triệu chứng sẽ đổi** từ `timeout` sang `refused` nếu còn vướng listen address |
| Chiếm DNS thì cert vẫn chặn được kẻ xấu | **Không.** Nắm DNS là xin được cert hợp lệ thật, vì CA xác minh quyền sở hữu qua chính DNS. |

---

## Câu hỏi còn treo

- [ ] Chạy lại `time curl -4 http://127.0.0.1:9999` trong **WSL Ubuntu** để so con số với
      2,155s trên Windows → làm ở **Bài 02** sau khi cài lại Ubuntu
- [ ] `-RemoteAddress LocalSubnet` trong `New-NetFirewallRule` cụ thể bao gồm những dải nào?
- [ ] Nếu mạng WiFi bật **client isolation** thì mở firewall cũng vô ích — làm sao kiểm tra
      mạng có bật nó không?

---

## Lệnh muốn nhớ

```bash
# DNS
nslookup <domain>                    # tên miền → IP

# HTTP / TLS
curl -v <url>                        # xem toàn bộ quá trình kết nối
curl -I <url>                        # chỉ lấy header trả về
curl -4 <url>                        # ép dùng IPv4

# Đọc chứng chỉ của một site bất kỳ
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates

# Đo thời gian (Git Bash)
time curl -4 -o /dev/null --max-time 5 <url>

# Mở firewall đúng cách trên Windows (PowerShell, quyền Admin)
New-NetFirewallRule -DisplayName "ten-rule" -Direction Inbound `
  -LocalPort 8080 -Protocol TCP -RemoteAddress LocalSubnet -Action Allow
```

---

## Ba câu mang theo cả lộ trình

1. **Chín chặng, chỉ chặng ⑧ là code tôi viết.** Tám chặng còn lại là hạ tầng.
2. **Mọi mã lỗi HTTP đều là một câu trả lời.** Thấy số = đã vào được nhà.
   Không thấy số = còn đứng ngoài cổng.
3. **Hệ thống hỏng được mà không ai đụng vào.** Câu hỏi tự kiểm tra:
   *"Cái gì sẽ tự hỏng nếu tôi không động vào nó trong 6 tháng?"*
