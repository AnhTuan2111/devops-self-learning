# Bài 29 — Quản lý secret và backup: thứ bạn chỉ tiếc khi đã muộn

> **Module M5** · Production — VPS thật, domain thật, HTTPS thật
> Ước lượng: ~65 phút · Trạng thái: `todo`

## Mục tiêu

Không commit mật khẩu lên GitHub, và có thể khôi phục database sau khi mất sạch.

## Khái niệm sẽ gặp

- 12-factor config
- .env và .gitignore
- Xử lý khi lỡ commit secret
- pg_dump / pg_restore
- Backup tự động bằng cron
- Lưu backup ra ngoài server
- Restore drill

## Bài lab

Viết script backup DB tự động hằng ngày, rồi XÓA database và khôi phục lại từ backup.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Không có secret nào trong git history
- [ ] Backup chạy tự động và có retention
- [ ] Đã thực sự restore thành công ít nhất một lần

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
