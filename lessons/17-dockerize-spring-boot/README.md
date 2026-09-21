# Bài 17 — Dockerize Spring Boot đúng chuẩn production

> **Module M3** · Docker — Đóng gói ứng dụng
> Ước lượng: ~60 phút · Trạng thái: `todo`

## Mục tiêu

Biến project Spring Boot của bạn thành một image nhỏ, an toàn, chạy non-root.

## Khái niệm sẽ gặp

- Multi-stage build
- Maven/Gradle cache trong Docker
- JRE slim vs JDK
- USER non-root
- JVM trong container: memory limit
- HEALTHCHECK

## Bài lab

Viết Dockerfile multi-stage cho project Spring Boot của bạn, so sánh dung lượng image trước/sau.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Image cuối nhỏ hơn đáng kể so với bản build ngây thơ
- [ ] Container chạy bằng user không phải root
- [ ] App nhận được biến môi trường từ ngoài

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
