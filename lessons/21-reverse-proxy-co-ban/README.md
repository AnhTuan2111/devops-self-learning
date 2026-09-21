# Bài 21 — Reverse proxy: Nginx đứng trước ứng dụng để làm gì

> **Module M4** · Nginx — Đưa ứng dụng ra Internet
> Ước lượng: ~55 phút · Trạng thái: `todo`

## Mục tiêu

Cấu hình được Nginx nhận request từ ngoài và chuyển vào Spring Boot.

## Khái niệm sẽ gặp

- Forward proxy vs Reverse proxy
- nginx.conf, sites-available/enabled
- server block, listen, server_name
- location matching
- proxy_pass
- nginx -t, reload vs restart

## Bài lab

Cài Nginx, viết một server block trỏ về Spring Boot :8080, truy cập qua port 80.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Sửa config và reload không làm gián đoạn dịch vụ
- [ ] Hiểu thứ tự ưu tiên của location
- [ ] Đọc được error.log khi cấu hình sai

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
