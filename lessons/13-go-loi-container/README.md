# Bài 13 — Gỡ lỗi container

<img src="../../assets/readme/glyph/13.svg" width="132" align="right" alt="Ấn ký của Bài 13">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Có một quy trình chẩn đoán container hỏng thay vì thử bừa.

## Cần đã học trước

- [Bài 12 · Container sống và chết thế nào: signal, restart, log](../12-vong-doi-container/)

## Khái niệm sẽ gặp

- docker ps -a, logs, inspect, events, stats
- Đọc exit code và OOMKilled trong docker inspect
- Vào xem một container đã chết; docker run --entrypoint sh
- Bảng triệu chứng dẫn tới nguyên nhân cho container
- Image thiếu công cụ gỡ lỗi và cách xoay xở

## Bài lab

Tự gây năm kiểu hỏng — sai lệnh khởi động, thiếu biến môi trường, hết bộ nhớ, sai port, sai tên host của database — trộn thứ tự rồi chẩn đoán từng cái theo quy trình, ghi vào bảng triệu chứng.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Có một thứ tự lệnh cố định để chẩn đoán container hỏng
- [ ] Tìm được nguyên nhân container chết ngay sau khi khởi động
- [ ] Đọc được thông tin OOMKilled trong docker inspect
- [ ] Tự viết được bảng triệu chứng dẫn tới nguyên nhân của riêng mình

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
