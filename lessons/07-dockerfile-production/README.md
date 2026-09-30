# Bài 07 — Dockerfile chuẩn production: nhỏ, không root, không bị giết vì hết bộ nhớ

<img src="../../assets/readme/glyph/07.svg" width="132" align="right" alt="Ấn ký của Bài 07">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Biến image Spring Boot thành một image nhỏ, chạy không bằng root, và không bị giết vì hết bộ nhớ.

## Cần đã học trước

- [Bài 01 · Máy tính, Hệ điều hành, Process: 'server' thật ra là cái gì](../01-may-tinh-va-he-dieu-hanh/)
- [Bài 06 · Dockerfile đầu tiên cho Spring Boot](../06-dockerfile-dau-tien/)

## Khái niệm sẽ gặp

- Multi-stage build: build bằng JDK, chạy bằng JRE
- Cache Maven/Gradle khi build trong Docker (nối cache theo layer ở Bài 06)
- User root và user thường; quyền của một process (Linux dạy đúng lúc); vì sao process không chạy bằng root không mở được port dưới 1024, và capabilities
- Chạy container bằng user thường: dòng USER
- JVM trong container: giới hạn bộ nhớ, MaxRAMPercentage; OOM đã gặp ở Bài 01

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
