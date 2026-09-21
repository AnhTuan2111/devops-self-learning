# Bài 20 — Docker Compose: cả hệ thống trong một file

> **Module M3** · Docker — Đóng gói ứng dụng
> Ước lượng: ~70 phút · Trạng thái: `todo`

## Mục tiêu

Một lệnh duy nhất dựng lên toàn bộ Spring Boot + PostgreSQL, tái lập được ở bất kỳ máy nào.

## Khái niệm sẽ gặp

- compose.yaml: services, volumes, networks
- depends_on và healthcheck
- env_file và .env
- profiles
- up -d, down, logs -f, ps, exec
- Biến môi trường và secret

## Bài lab

Viết compose.yaml cho project của bạn. Mục tiêu: xóa sạch mọi thứ rồi `docker compose up -d` là hệ thống sống lại.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] App đợi DB sẵn sàng rồi mới khởi động (healthcheck)
- [ ] Không có mật khẩu nào hard-code trong compose.yaml
- [ ] Người khác clone repo về chạy được ngay

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
