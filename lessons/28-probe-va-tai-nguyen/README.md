# Bài 28 — Probe và giới hạn tài nguyên

<img src="../../assets/readme/glyph/28.svg" width="132" align="right" alt="Ấn ký của Bài 28">

> **Module M4** · Kubernetes — Chạy container trên cả một cụm máy
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Pod chỉ nhận traffic khi app thật sự sẵn sàng, và không bị giết oan vì CPU hay bộ nhớ.

## Cần đã học trước

- [Bài 12 · Container sống và chết thế nào: signal, restart, log](../12-vong-doi-container/)
- [Bài 27 · ConfigMap và Secret](../27-configmap-va-secret/)

## Khái niệm sẽ gặp

- startupProbe, readinessProbe, livenessProbe khác nhau thế nào
- Actuator health làm probe
- requests và limits: CPU và bộ nhớ
- CPU bị bóp (throttling) làm Spring Boot khởi động rất chậm
- OOMKilled (nối Bài 01 và 07)
- Liveness đặt sai gây vòng khởi động lại vô tận

## Bài lab

Đặt CPU limit thấp để thấy Spring Boot khởi động rất chậm và bị liveness giết liên tục, rồi sửa bằng startupProbe. Đặt limit bộ nhớ quá thấp để gặp OOMKilled, rồi chỉnh cho vừa.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Chọn đúng loại probe cho từng mục đích
- [ ] Giải thích được vì sao "container chạy" chưa phải "app sẵn sàng" (nối Bài 00)
- [ ] Đặt được requests và limits hợp lý cho Spring Boot
- [ ] Chẩn đoán được một pod bị khởi động lại liên tục vì probe

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
