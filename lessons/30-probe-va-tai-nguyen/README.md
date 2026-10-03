# Bài 30 — Probe và giới hạn tài nguyên

<img src="../../assets/readme/glyph/30.svg" width="132" align="right" alt="Ấn ký của Bài 30">

> **Module M4** · Kubernetes — Chạy container trên cả một cụm máy
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 29](../29-configmap-va-secret/) kết luận: ConfigMap cho cấu hình, Secret cho dữ liệu nhạy cảm, nạp vào pod qua biến môi trường hoặc tệp. Và base64 của Secret không phải là mã hoá.

## Câu hỏi của bài

**Pod báo Running mà người dùng vẫn gặp lỗi, hoặc pod bị khởi động lại liên tục. Làm sao cụm biết app đã sẵn sàng thật, và cấp bao nhiêu tài nguyên là đủ?**

## Bài này dẫn tới

Probe cho cụm biết app đã khởi động xong, đã sẵn sàng hay đã treo. Requests và limits đặt đúng thì app không bị bóp CPU tới mức chết đứng, cũng không bị OOMKilled.

## Câu hỏi cho bài sau

Pod PostgreSQL bị thay là mất dữ liệu. Trong một cụm nhiều máy, dữ liệu sống ở đâu? [Bài 31](../31-du-lieu-trong-kubernetes/) trả lời câu này.

## Cần đã học trước

- [Bài 14 · Container sống và chết thế nào: signal, restart, log](../14-vong-doi-container/)
- [Bài 29 · ConfigMap và Secret](../29-configmap-va-secret/)

## Khái niệm sẽ gặp

- startupProbe, readinessProbe, livenessProbe khác nhau thế nào
- Actuator health làm probe
- requests và limits: CPU và bộ nhớ
- CPU bị bóp (throttling) làm Spring Boot khởi động rất chậm
- OOMKilled (nối Bài 03 và 09)
- Liveness đặt sai gây vòng khởi động lại vô tận

## Bài lab

Đặt CPU limit thấp để thấy Spring Boot khởi động rất chậm và bị liveness giết liên tục, rồi sửa bằng startupProbe. Đặt limit bộ nhớ quá thấp để gặp OOMKilled, rồi chỉnh cho vừa.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Chọn đúng loại probe cho từng mục đích
- [ ] Giải thích được vì sao "container chạy" chưa phải "app sẵn sàng" (nối Bài 02)
- [ ] Đặt được requests và limits hợp lý cho Spring Boot
- [ ] Chẩn đoán được một pod bị khởi động lại liên tục vì probe

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
