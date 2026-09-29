# Bài 22 — Phục vụ static file và ứng dụng SPA

<img src="../../assets/readme/glyph/22.svg" width="132" align="right" alt="Ấn ký của Bài 22">

> **Module M4** · Nginx — Đưa ứng dụng ra Internet
> Ước lượng: 4–6 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Cho Nginx trả frontend build sẵn, còn /api thì đẩy về backend.

## Khái niệm sẽ gặp

- root vs alias
- index, try_files
- Vấn đề F5 mất route trong SPA
- Cache-Control cho asset
- gzip / brotli
- Tách /api và /

## Bài lab

Serve một bản build React/Vue tĩnh, cấu hình try_files, và route /api về Spring Boot.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Refresh trang con của SPA không bị 404
- [ ] Asset có cache header hợp lý
- [ ] Phân biệt được root và alias

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
