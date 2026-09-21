# Bài 18 — Volume và bind mount: vì sao database mất dữ liệu

> **Module M3** · Docker — Đóng gói ứng dụng
> Ước lượng: ~55 phút · Trạng thái: `todo`

## Mục tiêu

Không bao giờ mất dữ liệu production vì xóa nhầm container.

## Khái niệm sẽ gặp

- Container filesystem là tạm thời
- Named volume vs bind mount vs tmpfs
- docker volume ls/inspect/rm
- Quyền file giữa host và container
- Backup volume

## Bài lab

Gắn volume cho PostgreSQL, xóa container, tạo lại, chứng minh dữ liệu vẫn còn. Rồi backup volume ra file.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Phân biệt rõ named volume và bind mount, biết khi nào dùng cái nào
- [ ] Backup và restore được dữ liệu một volume
- [ ] Xử lý được lỗi permission khi bind mount

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
