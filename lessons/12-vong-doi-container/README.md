# Bài 12 — Container sống và chết thế nào: signal, restart, log

<img src="../../assets/readme/glyph/12.svg" width="132" align="right" alt="Ấn ký của Bài 12">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 4–6 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Container tắt êm không mất request đang xử lý, tự sống lại khi chết, và log không làm đầy ổ đĩa.

## Cần đã học trước

- [Bài 01 · Máy tính, Hệ điều hành, Process: 'server' thật ra là cái gì](../01-may-tinh-va-he-dieu-hanh/)
- [Bài 11 · Docker Compose: cả hệ thống trong một file](../11-docker-compose/)

## Khái niệm sẽ gặp

- Signal: SIGTERM, SIGKILL, SIGINT (nối Bài 01)
- PID 1 trong container, và vì sao dạng shell của CMD làm mất signal
- docker stop, thời gian chờ, và tắt êm (graceful shutdown) của Spring Boot
- Restart policy: no, on-failure, always, unless-stopped
- docker logs, log driver và xoay vòng log
- Exit code 0, 1, 137, 143 nói lên điều gì

## Bài lab

Chạy Spring Boot với CMD dạng shell và dạng exec, docker stop cả hai và so thời gian tắt. Cố tình cho app crash liên tục để quan sát restart policy. Cấu hình xoay vòng log để log không nuốt ổ đĩa.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích được vì sao docker stop đôi khi phải chờ 10 giây
- [ ] Cấu hình được Spring Boot tắt êm
- [ ] Chọn đúng restart policy cho một service
- [ ] Đọc được exit code 143 và 137 khác nhau thế nào

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
