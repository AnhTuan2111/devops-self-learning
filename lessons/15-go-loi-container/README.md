# Bài 15 — Gỡ lỗi container

<img src="../../assets/readme/glyph/15.svg" width="132" align="right" alt="Ấn ký của Bài 15">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 14](../14-vong-doi-container/) kết luận: docker stop gửi SIGTERM, chờ, rồi mới SIGKILL. App phải tắt êm, CMD phải ở dạng exec để nhận được signal, restart policy dựng container dậy, và log cần được xoay vòng.

## Câu hỏi của bài

**Container chết ngay sau khi khởi động, hoặc chạy mà không ai gọi được. Có thứ tự kiểm tra cố định nào thay cho thử bừa không?**

## Bài này dẫn tới

Có: ps -a, logs, inspect để đọc exit code và OOMKilled, rồi vào bên trong. Mỗi triệu chứng trỏ về một nhóm nguyên nhân trong bảng triệu chứng.

## Câu hỏi cho bài sau

Hệ thống đã chạy được trên máy mình. Để đưa nó lên một server ở xa, không màn hình, ta điều khiển server đó bằng cách nào cho an toàn? [Bài 16](../16-ssh-vao-server/) trả lời câu này.

## Cần đã học trước

- [Bài 14 · Container sống và chết thế nào: signal, restart, log](../14-vong-doi-container/)

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
