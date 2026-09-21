# Bài 07 — systemd: biến app thành service tự khởi động lại

> **Module M1** · Linux — Điều khiển một server
> Ước lượng: ~55 phút · Trạng thái: `todo`

## Mục tiêu

Tự viết một service để Spring Boot tự chạy khi server khởi động và tự sống lại khi crash.

## Khái niệm sẽ gặp

- systemd là gì
- systemctl start/stop/status/enable
- Unit file .service
- Restart policy
- journalctl
- Vì sao Docker sau này thay thế phần lớn việc này

## Bài lab

Đóng gói một jar Spring Boot thành systemd service, reboot WSL, kiểm tra nó tự chạy.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Viết được một unit file từ đầu
- [ ] Đọc log service bằng journalctl
- [ ] Cho service tự restart khi bị kill

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
