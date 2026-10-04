# Bài 10 — Cấu hình và secret: một image, nhiều môi trường

<img src="../../assets/readme/glyph/10.svg" width="132" align="right" alt="Ấn ký của Bài 10">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 3–5 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 09](../09-dockerfile-production/) kết luận: Multi-stage build để image nhỏ, dòng USER để process không chạy bằng root, và cấu hình JVM tôn trọng giới hạn bộ nhớ của container để không bị giết với exit code 137.

## Câu hỏi của bài

**Cùng một image phải chạy ở máy dev lẫn production, với database và mật khẩu khác nhau. Đưa cấu hình vào bằng cách nào mà không phải build lại, và không làm lộ mật khẩu?**

## Bài này dẫn tới

Qua biến môi trường lúc chạy container, đúng cơ chế bản sao biến môi trường của process ở Bài 03. Secret không bao giờ nằm trong image hay trong Git, vì layer giữ lại mọi thứ đã từng được ghi vào.

## Câu hỏi cho bài sau

Xoá container PostgreSQL là dữ liệu mất sạch. Dữ liệu phải nằm ở đâu để sống lâu hơn container? [Bài 11](../11-volume-va-du-lieu/) trả lời câu này.

## Cần đã học trước

- [Bài 08 · Dockerfile đầu tiên cho Spring Boot](../08-dockerfile-dau-tien/)

## Khái niệm sẽ gặp

- Biến môi trường: export, env, ${...} (Linux dạy đúng lúc)
- ENV và ARG trong Dockerfile
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
