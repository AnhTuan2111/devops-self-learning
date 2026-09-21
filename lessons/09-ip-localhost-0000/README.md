# Bài 09 — IP, localhost và cái bẫy 127.0.0.1 vs 0.0.0.0

> **Module M2** · Networking — Làm sao dữ liệu tới được máy bạn
> Ước lượng: ~50 phút · Trạng thái: `todo`

## Mục tiêu

Hiểu lỗi kinh điển nhất khi Dockerize: app chạy ngon ở local nhưng container không ai gọi được.

## Khái niệm sẽ gặp

- IPv4, subnet mask, CIDR
- Private IP vs Public IP
- loopback 127.0.0.1
- 0.0.0.0 nghĩa là gì
- NAT
- ip addr, ip route

## Bài lab

Cho một app bind vào 127.0.0.1 rồi vào 0.0.0.0, thử gọi từ ngoài container và quan sát khác biệt.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích chính xác 0.0.0.0 khác 127.0.0.1 ở đâu
- [ ] Biết máy mình có IP nào trong mạng LAN
- [ ] Hiểu vì sao Docker container không thấy localhost của host

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
