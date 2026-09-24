#!/usr/bin/env bash
#
# Bài 00 — Lab: nhìn từng chặng của một HTTP request bằng mắt
#
# Chạy trong Git Bash hoặc WSL Ubuntu. KHÔNG chạy trong cmd.exe —
# ở đó `time` là lệnh đặt đồng hồ hệ thống và `;` không tách lệnh được.
#
#   bash lab-00.sh
#
set -u

hr() { printf '\n\033[1m%s\033[0m\n' "── $* ──────────────────────────────"; }

hr "Lab 1 · chặng ② DNS — tên miền dịch ra số"
nslookup github.com

hr "Lab 1b · chặng ② hỏng — NXDOMAIN"
nslookup khong-ton-tai-dau-nhe-12345.com

hr "Lab 2 · chặng ③④⑤ nối nhau"
# Tự tìm trong output:
#   Trying <ip>:443          → ③ TCP đang mở kết nối
#   Established connection   → ③ ống đã thông (để ý CẢ port phía mình)
#   ALPN                     → ④ thỏa thuận giao thức trong lúc bắt tay TLS
#   > GET / HTTP/1.1         → ⑤ request đi ra
#   > Host: example.com      → ⑤ dòng Nginx đọc để biết hỏi web nào
#   < HTTP/1.1 200 OK        → đường về
#   < Server: cloudflare     → ⑦ reverse proxy ngoài đời thật
curl -v https://example.com 2>&1 | head -40

hr "Lab 3 · chặng ④ — đọc tấm 'căn cước' của một website thật"
# subject  = cấp cho AI
# issuer   = AI ký bảo lãnh (CA)
# notAfter = HẾT HẠN — thủ phạm của 'sáng thứ Hai'
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates

hr "Lab 4a · BỊ TỪ CHỐI — máy sống, phòng trống"
# Kỳ vọng: curl: (7). Nó tự dừng vì NHẬN ĐƯỢC CÂU TRẢ LỜI.
time curl -4 -o /dev/null http://127.0.0.1:9999

hr "Lab 4b · SỰ IM LẶNG — không ai ở địa chỉ đó"
# Kỳ vọng: curl: (28) ở đúng 5 giây. Nó dừng vì TA bảo nó dừng.
time curl -4 -o /dev/null --max-time 5 http://10.255.255.1:9999

hr "Lab 5 · chứng minh: timeout do TA quyết định, refused thì không"
# Đổi 5 → 15 và quan sát: lần này nó chạy đúng 15 giây.
# Còn Lab 4a thì đặt --max-time bao nhiêu cũng vẫn dừng ở ~2 giây.
time curl -4 -o /dev/null --max-time 15 http://10.255.255.1:9999

hr "Xong"
cat <<'EOF'

  refused  →  có điểm kết thúc CỦA RIÊNG NÓ
  timeout  →  thời lượng là con số BẠN chọn

  Thấy SỐ (502/504/500/404)  →  đã vào được nhà  →  soi nửa trong (⑦⑧⑨)
  Không thấy số              →  còn ngoài cổng   →  soi nửa ngoài (②③⑥⑦)

EOF
