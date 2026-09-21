# Bài 23 — Header, log, timeout, rate limit: Nginx trong thực chiến

> **Module M4** · Nginx — Đưa ứng dụng ra Internet
> Ước lượng: ~55 phút · Trạng thái: `todo`

## Mục tiêu

Cấu hình những thứ mà thiếu nó production sẽ có bug rất khó tìm.

## Khái niệm sẽ gặp

- X-Forwarded-For / Proto và IP thật của client
- client_max_body_size (lỗi upload 413)
- proxy_read_timeout (lỗi 504)
- access_log / error_log format
- limit_req rate limiting
- Security header cơ bản

## Bài lab

Gây lỗi 413 khi upload file lớn và 504 khi API chậm, rồi sửa bằng config.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Spring Boot log ra đúng IP client chứ không phải IP Nginx
- [ ] Upload file lớn không bị 413
- [ ] Biết chỉnh timeout ở đúng chỗ

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
