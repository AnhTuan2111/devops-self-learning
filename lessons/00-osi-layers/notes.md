# Ghi chú Bài 00: bảy tầng OSI

Chỗ ghi output lab thật, lỗi đã gặp, câu hỏi còn treo. Địa chỉ trong mạng nhà, MAC đầy đủ, tên router: ẩn trước khi ghi.

## Output lab trên máy mình, 30/10/2026

- `nslookup facebook.com`: IPv4 `57.144.64.1`, IPv6 `2a03:2880:f31a:1:face:b00c:0:25de`.
- `curl -v https://www.facebook.com/`: `www.facebook.com` ra `57.145.12.1`, `HTTP/1.1 200 OK`; curl 8.10.1 của Git for
  Windows dùng schannel nên không kể bắt tay TLS.
- `tracert -d facebook.com`: 14 chặng, chặng cuối 19 ms; chặng 6 không trả lời.
- `getmac`: ba card (VPN ảo, một card không nối mạng, WiFi).
- `nslookup khong-ton-tai-dau-nhe-12345.com`: `Non-existent domain`.

## Chưa chạy

- Tắt WiFi rồi chạy lại `curl -v`: trang bài ghi output là kỳ vọng (`Could not resolve host`).

## Câu hỏi còn treo

## Phản ứng thật của mình
