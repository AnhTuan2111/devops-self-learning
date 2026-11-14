# Ghi chú Bài 03: server là cái gì

Chỗ ghi output thật, lỗi đã gặp, câu hỏi còn treo.

## Output trên máy mình, 14/11/2026

- Laptop: AMD Ryzen 5 7535HS, 6 nhân, 12 luồng, 15,2 GB RAM; lúc đếm có 264 process trên Windows.
- `java -jar target/sample-app.jar` (Java 25.0.2): `PID = 6088`; lần chạy sau `PID = 28132`.
- `netstat -ano | grep ":8080"`: hai dòng `LISTENING 6088` (IPv4, IPv6). Có lần netstat in trạng thái `FIN_WAIT_1` hay `CLOSED`
  cho chính dòng listen ấy, chạy lại thì về `LISTENING`; chưa tìm hiểu vì sao.
- `tasklist //FI "PID eq 6088"`: `java.exe 6088 Console 3 183,884 K`; tệp jar 24.505.709 byte.
- Chạy bản thứ hai: `Web server failed to start. Port 8080 was already in use.`
- `taskkill //F //PID 6088` rồi `curl`: `curl: (7) ... after 2220 ms`.
- OOM trên Ubuntu 26.04 trong WSL, kernel 6.18.33.2: `systemd-run --scope -p MemoryMax=300M -p MemorySwapMax=0 python3
  lab/eat-ram.py` in tới 250 MB rồi chết, mã thoát 137; `dmesg`: `Memory cgroup out of memory: Killed process 2628 (python3)
  ... anon-rss:306432kB`. Script in chữ tiếng Anh (`held 50 MB`); hai lần chạy trước (PID 17489 bằng `python3 -c`, PID 2616
  khi script còn in chữ tiếng Việt không dấu) cho cùng các con số.

- 14/11/2026: Python 3.14.4 trong Ubuntu, PID 1 là systemd.
## Chỗ hiểu sai đã có từ buổi học cũ

- 502 lúc cao điểm là vì RAM đầy nên app không đủ chỗ khởi động. Thật ra app đang chạy thì bị kernel giết, RAM của nó được thu
  lại ngay.

## Câu hỏi còn treo
