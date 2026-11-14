# Ghi chú Bài 04: phòng lab Linux trên Windows

Chỗ ghi output thật, lỗi đã gặp, câu hỏi còn treo. Tên user và tên máy trong WSL đã đổi thành `user`, `host`.

## Output trên máy mình, 14/11/2026

- `wsl -l -v`: Ubuntu và docker-desktop, cả hai VERSION 2. `wsl --version`: WSL 2.7.13.0, kernel 6.18.33.2-2.
- Ubuntu 26.04.1 LTS, `uname -r`: `6.18.33.2-microsoft-standard-WSL2`. Git Bash: `uname -r` ra `3.4.10-bc1f6498.x86_64`,
  `uname -s` ra `MINGW64_NT-10.0-26300`.
- `apt install openjdk-25-jre-headless` khi chưa `apt update`: 404 Not Found cho bản 25.0.4.1; sau `apt update` cài được
  25.0.5.0.3.
- App mẫu chạy trên Ubuntu: PID 2338, `Started SampleApp in 2.16 seconds`; `/notes` trả 500 vì không có PostgreSQL.
- `which java`: `/usr/bin/java`; `which ls`: `/usr/bin/ls`; `type cd`: `cd is a shell builtin`.
- Gõ `lsx` trong bash tương tác: Ubuntu gợi ý 14 lệnh gần giống tên.

- 14/11/2026, so Git Bash với Ubuntu: `which ls` cả hai ra `/usr/bin/ls`; `free -h` trong Git Bash ra `bash: free: command not found`, trong Ubuntu tổng 10Gi.
## Phản ứng thật từ buổi học cũ (05/10/2026)

- Về Git Bash: "lệnh đó đã được biên dịch sang windows để chạy trên máy windows nhưng mà nó cũng chỉ là hàng đè tem thôi chứ
  không phải linux thật".

## Câu hỏi còn treo
