# Bài 28 — HTTPS với Let's Encrypt và tự động gia hạn

> **Module M5** · Production — VPS thật, domain thật, HTTPS thật
> Ước lượng: ~65 phút · Trạng thái: `todo`

## Mục tiêu

Ổ khóa xanh trên trình duyệt, và chứng chỉ tự gia hạn mà bạn không phải nhớ.

## Khái niệm sẽ gặp

- TLS, certificate, CA
- ACME challenge (HTTP-01, DNS-01)
- Certbot
- Redirect 80 → 443
- HSTS
- Auto-renew và cách kiểm tra nó thật sự chạy
- Certbot với Nginx trong Docker

## Bài lab

Cấp chứng chỉ cho domain, ép HTTPS, chạy thử renew --dry-run.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] https:// hoạt động, http:// tự chuyển sang https
- [ ] Kiểm chứng được auto-renew hoạt động
- [ ] Biết chứng chỉ hết hạn ngày nào và ai sẽ báo bạn

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
