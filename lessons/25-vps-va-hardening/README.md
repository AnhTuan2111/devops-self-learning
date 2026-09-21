# Bài 25 — Chọn VPS và hardening ngày đầu tiên

> **Module M5** · Production — VPS thật, domain thật, HTTPS thật
> Ước lượng: ~70 phút · Trạng thái: `todo`

## Mục tiêu

Có một server thật trên Internet và khóa nó lại trước khi kẻ khác tìm thấy.

## Khái niệm sẽ gặp

- Chọn nhà cung cấp và cấu hình
- Tạo user sudo, tắt root login
- SSH key only, đổi port SSH
- ufw
- fail2ban
- unattended-upgrades
- Timezone, hostname, swap

## Bài lab

Dựng một VPS Ubuntu, chạy toàn bộ checklist hardening, xem log để thấy bot đã quét bạn trong vòng vài phút.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Không đăng nhập được bằng password nữa
- [ ] ufw chỉ cho 22/80/443
- [ ] Tự tin rằng mất laptop vẫn không mất server

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
