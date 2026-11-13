# Ghi chú Bài 02: người làm DevOps nắm chỗ nào

Chỗ ghi output thật, lỗi đã gặp, câu hỏi còn treo.

## Output trên máy mình, 14/11/2026

Windows 11, Git Bash, curl 8.10.1 (Schannel).

- `curl -sS https://khong-ton-tai-dau-nhe-12345.com/`: `curl: (6) Could not resolve host`. Chạy lại với tên `this-name-does-not-exist-12345.com` (tên Bài 00 dùng) cho cùng dòng lỗi; trang dùng tên này.
- `curl -sS --connect-timeout 5 http://10.255.255.1/`: `curl: (28) ... after 5014 ms: Timeout was reached`.
- `curl -sS http://127.0.0.1:9999/`: `curl: (7) ... after 2010 ms: Could not connect to server`.
- `curl -sS https://expired.badssl.com/`: `curl: (35) schannel: ... SEC_E_CERT_EXPIRED`.
- `curl -sS -i https://httpbin.org/status/502`: `HTTP/1.1 502 Bad Gateway`.
- `curl -sS -o /dev/null -w "%{http_code}\n" https://example.com/no-such-page`: `404` (lần đầu chạy với
  `/khong-co-trang-nay`, cùng kết quả).
- `curl -sS http://localhost:5432/`: `curl: (7) ... after 2233 ms` (laptop không chạy PostgreSQL).
- `curl -sS https://wrong.host.badssl.com/`: `curl: (60) schannel: ... SEC_E_WRONG_PRINCIPAL`.
- `curl -sS --connect-timeout 5 https://example.com:8443/`: `curl: (28) SSL/TLS connection timeout`; không dùng trong trang
  vì kết nối mở được rồi mới hết giờ ở bước TLS.
- Tắt app mẫu rồi `curl -sS http://localhost:8080/`: `curl: (7) ... after 2220 ms`.
- App mẫu trên Ubuntu trong WSL, không có PostgreSQL, `curl -s -i http://localhost:8080/notes`: `HTTP/1.1 500`, log có
  `java.net.ConnectException: Connection refused (connect failed)`.

Ảnh trang lỗi lấy lại từ bài cũ (chụp 30/09 tới 04/10/2026).

## Câu hỏi còn treo
