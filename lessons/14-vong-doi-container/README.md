# Bài 14 — Container sống và chết thế nào: signal, restart, log

<img src="../../assets/readme/glyph/14.svg" width="132" align="right" alt="Ấn ký của Bài 14">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 4–6 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 13](../13-docker-compose/) kết luận: Mô tả toàn bộ trong compose.yaml rồi chạy docker compose up. Healthcheck giải quyết chuyện "đã chạy chưa phải đã sẵn sàng" giữa các service.

## Câu hỏi của bài

**Hệ thống đã lên bằng một lệnh. Khi container bị dừng, bị giết hay tự chết, request đang xử lý ra sao, và ai dựng nó dậy?**

## Bài này dẫn tới

docker stop gửi SIGTERM, chờ, rồi mới SIGKILL. App phải tắt êm, CMD phải ở dạng exec để nhận được signal, restart policy dựng container dậy, và log cần được xoay vòng.

## Câu hỏi cho bài sau

Container chết ngay sau khi khởi động, hoặc chạy mà không ai gọi được. Có thứ tự kiểm tra cố định nào thay cho thử bừa không? [Bài 15](../15-go-loi-container/) trả lời câu này.

## Cần đã học trước

- [Bài 03 · Máy tính, Hệ điều hành, Process: 'server' thật ra là cái gì](../03-may-tinh-va-he-dieu-hanh/)
- [Bài 13 · Docker Compose: cả hệ thống trong một file](../13-docker-compose/)

## Khái niệm sẽ gặp

- Signal: SIGTERM, SIGKILL, SIGINT (nối Bài 03)
- PID 1 trong container: nhận nuôi process mồ côi, dọn zombie; và vì sao dạng shell của CMD làm mất signal
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
