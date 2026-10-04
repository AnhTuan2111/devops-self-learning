# Bài 09 — Dockerfile chuẩn production: nhỏ, không root, không bị giết vì hết bộ nhớ

<img src="../../assets/readme/glyph/09.svg" width="132" align="right" alt="Ấn ký của Bài 09">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 08](../08-dockerfile-dau-tien/) kết luận: Viết Dockerfile. Mỗi dòng tạo ra một layer, và thứ tự các dòng quyết định cache, tức quyết định build lại nhanh hay chậm.

## Câu hỏi của bài

**Image vừa build vừa nặng, chạy bằng root, và có thể bị kernel giết vì hết bộ nhớ. Làm sao cho nó đủ tốt để chạy production?**

## Bài này dẫn tới

Multi-stage build để image nhỏ, dòng USER để process không chạy bằng root, và cấu hình JVM tôn trọng giới hạn bộ nhớ của container để không bị giết với exit code 137.

## Câu hỏi cho bài sau

Cùng một image phải chạy ở máy dev lẫn production, với database và mật khẩu khác nhau. Đưa cấu hình vào bằng cách nào mà không phải build lại, và không làm lộ mật khẩu? [Bài 10](../10-cau-hinh-va-secret/) trả lời câu này.

## Cần đã học trước

- [Bài 03 · Máy tính, Hệ điều hành, Process: 'server' thật ra là cái gì](../03-may-tinh-va-he-dieu-hanh/)
- [Bài 08 · Dockerfile đầu tiên cho Spring Boot](../08-dockerfile-dau-tien/)

## Khái niệm sẽ gặp

- Multi-stage build: build bằng JDK, chạy bằng JRE
- Cache Maven/Gradle khi build trong Docker (nối cache theo layer ở Bài 08)
- User root và user thường; quyền của một process (Linux dạy đúng lúc); vì sao process không chạy bằng root không mở được port dưới 1024, và capabilities
- Chạy container bằng user thường: dòng USER
- JVM trong container: giới hạn bộ nhớ, MaxRAMPercentage; OOM đã gặp ở Bài 03

## Bài lab

Viết Dockerfile multi-stage, so dung lượng image trước và sau. Chạy container với giới hạn bộ nhớ quá thấp để thấy nó bị giết với exit code 137, rồi chỉnh JVM cho vừa.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích được multi-stage build bỏ đi những gì khỏi image cuối
- [ ] Nói được vì sao container không nên chạy bằng root
- [ ] Đọc được exit code 137 và nối nó với OOM
- [ ] Cấu hình được JVM để tôn trọng giới hạn bộ nhớ của container

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
