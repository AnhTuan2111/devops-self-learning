# Bài 12 — HTTP/HTTPS và curl như một công cụ điều tra

<img src="../../assets/readme/glyph/12.svg" width="132" align="right" alt="Ấn ký của Bài 12">

> **Module M2** · Networking — Làm sao dữ liệu tới được máy bạn
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Debug API bằng dòng lệnh, đọc được header, hiểu status code nói gì về tầng nào đang hỏng.

## Khái niệm sẽ gặp

- Request line, header, body
- Method, status code theo nhóm
- Header quan trọng: Host, Content-Type, Authorization, X-Forwarded-For
- Keep-alive
- TLS handshake ở mức khái niệm
- curl -v -I -X -H -d

## Bài lab

Gọi API Spring Boot bằng curl, xem verbose, phân biệt lỗi 502/504 do Nginx và 500 do app.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Gọi được POST có JSON body bằng curl
- [ ] Đọc được toàn bộ header trong curl -v
- [ ] Nói được 502 khác 504 ở đâu và lỗi nằm ở tầng nào

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
