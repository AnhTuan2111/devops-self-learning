#!/usr/bin/env bash
#
# Bài 00 — Lab: nhìn tận mắt từng chặng của một request
#
# Chạy trong Git Bash (hoặc một shell Linux). KHÔNG chạy trong cmd.exe:
# ở đó cú pháp của `|` và `2>/dev/null` khác hẳn.
#
#   bash lab/lab-00.sh
#
# Script chỉ gom ba lab của tab Lab vào một chỗ. Cách đọc từng dòng output nằm trong
# index.html (tab Lab) và phan-tich-output.html.
set -u

hr() { printf '\n\033[1m%s\033[0m\n' "── $* ──────────────────────────────"; }

hr "Lab 1 · chặng 2, DNS: tên miền dịch ra địa chỉ"
nslookup github.com

hr "Lab 1 · bước tự gây lỗi: một tên miền không tồn tại (NXDOMAIN)"
nslookup khong-ton-tai-dau-nhe-12345.com

hr "Lab 2 · chặng 2, 3, 4, 5 nối tiếp nhau, và dấu vết của chặng 7"
# Tự tìm trong output:
#   IPv4: ...                → chặng 2: DNS đã trả lời
#   Established connection   → chặng 3: kết nối TCP đã mở
#   ALPN: server accepted    → chặng 4: bắt tay TLS xong
#   > GET / HTTP/1.1         → chặng 5: request đi ra
#   > Host: example.com      → dòng cho server biết request dành cho website nào
#   < HTTP/1.1 200 OK        → câu trả lời đi về
#   < Server: cloudflare     → chặng 7 ngoài đời thật: một reverse proxy đứng trước website
curl -v https://example.com 2>&1 | head -40

hr "Lab 3 · chặng 4: đọc chứng chỉ của một website thật"
# subject  = chứng chỉ cấp cho tên miền nào
# issuer   = ai đã ký (CA)
# notAfter = ngày hết hạn
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates

hr "Xong"
cat <<'EOF'

  Bước cuối không cần lệnh: đóng tài liệu, vẽ lại chín chặng theo thứ tự, và ghi bên
  cạnh mỗi chặng dòng output nào ở trên đã cho bạn nhìn thấy nó.

EOF
