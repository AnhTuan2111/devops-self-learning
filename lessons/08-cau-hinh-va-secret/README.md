# Bài 08 — Cấu hình và secret: một image, nhiều môi trường

<img src="../../assets/readme/glyph/08.svg" width="132" align="right" alt="Ấn ký của Bài 08">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 3–5 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Chạy cùng một image ở dev, staging và production chỉ bằng cách đổi cấu hình, và không bao giờ nhúng mật khẩu vào image.

## Cần đã học trước

- [Bài 06 · Dockerfile đầu tiên cho Spring Boot](../06-dockerfile-dau-tien/)

## Khái niệm sẽ gặp

- Biến môi trường: export, env, ${...} (Linux dạy đúng lúc)
- 12-factor: tách cấu hình khỏi code
- docker run -e và --env-file
- Spring Boot đọc cấu hình từ biến môi trường
- Vì sao secret không được nằm trong image hay trong Git
- Xử lý khi lỡ commit secret

## Bài lab

Chạy cùng một image với hai bộ biến môi trường khác nhau. Cố tình nhúng mật khẩu vào Dockerfile rồi dùng docker history lấy nó ra, để thấy vì sao không được làm vậy.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Chạy được một image với cấu hình khác mà không build lại
- [ ] Giải thích được vì sao secret trong image coi như đã lộ
- [ ] Biết phải làm gì trong giờ đầu tiên sau khi lỡ commit secret
- [ ] Kể được thứ tự Spring Boot ưu tiên các nguồn cấu hình

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
