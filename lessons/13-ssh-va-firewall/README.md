# Bài 13 — SSH và firewall: cánh cửa duy nhất vào server

> **Module M2** · Networking — Làm sao dữ liệu tới được máy bạn
> Ước lượng: ~55 phút · Trạng thái: `todo`

## Mục tiêu

Vào server an toàn bằng key thay vì mật khẩu, và chỉ mở đúng những cổng cần mở.

## Khái niệm sẽ gặp

- SSH là gì, public/private key
- ssh-keygen, authorized_keys
- ~/.ssh/config
- scp và rsync
- ufw / iptables cơ bản
- Vì sao tắt đăng nhập bằng password

## Bài lab

Tạo SSH key, cấu hình đăng nhập không mật khẩu vào WSL, bật ufw và tự chặn/mở port.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] SSH vào máy khác không cần gõ mật khẩu
- [ ] Copy file hai chiều bằng scp/rsync
- [ ] Cấu hình ufw chỉ mở 22/80/443

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
