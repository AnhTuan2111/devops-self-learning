# Bài 24 — Nginx trong Docker Compose: ráp toàn bộ hệ thống

> **Module M4** · Nginx — Đưa ứng dụng ra Internet
> Ước lượng: ~60 phút · Trạng thái: `todo`

## Mục tiêu

Toàn bộ stack Nginx + Spring Boot + PostgreSQL chạy bằng một lệnh, database không lộ ra Internet.

## Khái niệm sẽ gặp

- Nginx container và mount config
- Chỉ publish 80/443, giấu 8080 và 5432
- Network phân tầng
- Reload Nginx trong container
- Cấu trúc thư mục project chuẩn

## Bài lab

Thêm service nginx vào compose.yaml, bỏ toàn bộ ports của app và db, chỉ còn Nginx lộ ra ngoài.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Từ host không truy cập trực tiếp được :8080 và :5432
- [ ] Vẫn vào được app qua :80
- [ ] Vẽ lại được sơ đồ network của compose

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
