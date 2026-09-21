# Bài 10 — Port và socket: 'Address already in use'

> **Module M2** · Networking — Làm sao dữ liệu tới được máy bạn
> Ước lượng: ~45 phút · Trạng thái: `todo`

## Mục tiêu

Biết chính xác ai đang giữ port nào, và hiểu một kết nối TCP hình thành ra sao.

## Khái niệm sẽ gặp

- Port, well-known port
- TCP vs UDP
- 3-way handshake
- Socket = IP + port
- ss / netstat / lsof
- Port mapping

## Bài lab

Gây lỗi 'port already in use' có chủ đích, dùng ss/lsof truy ra thủ phạm và xử lý.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Liệt kê mọi port đang listen trên máy
- [ ] Truy từ port ra PID ra tên process
- [ ] Giải thích vì sao port < 1024 cần quyền root

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
