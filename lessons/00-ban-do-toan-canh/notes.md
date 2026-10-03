# Ghi chú — Bài 00

**Ngày học:** 21–24/09/2026, học theo đối thoại thầy–trò, ba lab.
Khi học, nội dung này là phần đầu của một bài lớn; ngày 03/10/2026 bài lớn được tách thành Bài 00
(bản đồ), Bài 01 (IP, port, listen, firewall) và Bài 02 (chẩn đoán). Ghi chú của hai bài kia nằm trong
thư mục của chúng.

---

## Kết quả lab thật

### Lab 1 — `nslookup`

Tên router trong nhà đã được ẩn.

```
Server:  (tên router, đã ẩn)
Address: fe80::10

Non-authoritative answer:
Name:    github.com
Address: 20.205.243.166
```

```
*** (tên router, đã ẩn) can't find khong-ton-tai-dau-nhe-12345.com: Non-existent domain
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

Vòng đời đúng **90 ngày**, còn **33 ngày** tại thời điểm đo.

---

## Lỗi đã gặp

| Lỗi | Nguyên nhân | Cách xử lý |
|---|---|---|
| `curl -v` không in thông tin chứng chỉ | `curl` của Git for Windows dùng thư viện TLS **schannel** của Windows, không phải OpenSSL | Đọc chứng chỉ bằng `openssl s_client` (Lab 3) |
| Nghi Git Bash gọi nhầm `curl.exe` của Windows | Giả thuyết sai: `which curl` trả về `/mingw64/bin/curl` | Kiểm giả thuyết bằng một lệnh trước khi tin |

---

## Chỗ tôi hiểu sai và đã được sửa

| Tôi nghĩ | Thực tế |
|---|---|
| Chứng chỉ = đăng ký tên miền với IP | Đó là DNS. Chứng chỉ chứng minh **danh tính** của một tên, và không chứa IP. |

Hai chỗ hiểu sai khác trong buổi học thuộc phần chứng chỉ chuyên sâu, sẽ gặp lại ở Bài 20:

| Tôi nghĩ | Thực tế |
|---|---|
| "Chứng chỉ bị đánh cắp" | Chứng chỉ **công khai**. Thứ bí mật và bị đánh cắp là **private key**. |
| Chiếm DNS thì chứng chỉ vẫn chặn được kẻ xấu | **Không.** Nắm DNS là xin được chứng chỉ hợp lệ thật, vì CA xác minh quyền sở hữu qua chính DNS. |

---

## Câu hỏi còn treo

- [ ] Mạng nhà có đường IPv6 ra Internet không? Kiểm bằng `curl -6 https://example.com` (thất bại nếu
      không có) và xem `ipconfig` có địa chỉ IPv6 bắt đầu bằng `2` hoặc `3` không.

---

## Lệnh muốn nhớ

```bash
# DNS
nslookup <tên-miền>                  # tên miền → địa chỉ IP, và ai đã trả lời

# HTTP / TLS
curl -v <url>                        # kể lại toàn bộ quá trình kết nối
curl -V                              # curl này dùng thư viện TLS nào
which curl                           # lệnh curl đang chạy nằm ở đâu

# Đọc chứng chỉ của một website bất kỳ
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates
```

---

## Câu mang theo

**Chín chặng, chỉ chặng 8 là code tôi viết.** Tám chặng còn lại là hạ tầng.
