# Bài 27 — Domain và DNS thật

<img src="../../assets/readme/glyph/27.svg" width="132" align="right" alt="Ấn ký của Bài 27">

> **Module M5** · Production — VPS thật, domain thật, HTTPS thật
> Ước lượng: 3–6 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Gõ tên miền của bạn vào trình duyệt và thấy ứng dụng của bạn hiện lên.

## Khái niệm sẽ gặp

- Mua/dùng domain
- A record trỏ về IP VPS
- Subdomain cho api/staging
- TTL khi chuyển server
- Kiểm chứng bằng dig từ nhiều nơi
- Cloudflare proxy: lợi và hại

## Bài lab

Trỏ domain về VPS, cấu hình server_name trong Nginx, xác minh bằng dig và curl.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] domain và www đều vào được
- [ ] Có subdomain riêng cho API
- [ ] Giải thích được vì sao đôi khi phải chờ DNS

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
