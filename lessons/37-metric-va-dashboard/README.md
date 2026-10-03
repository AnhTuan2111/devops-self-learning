# Bài 37 — Metric và dashboard

<img src="../../assets/readme/glyph/37.svg" width="132" align="right" alt="Ấn ký của Bài 37">

> **Module M5** · Rancher và vận hành — Quản lý cụm, theo dõi, xử lý sự cố
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 36](../36-deploy-len-cum-tu-gitlab/) kết luận: Pipeline deploy bằng helm với quyền tối thiểu, hoặc GitOps với Fleet: cụm tự đồng bộ theo Git và ghi đè mọi thay đổi tay.

## Câu hỏi của bài

**Hệ thống đã tự deploy. Làm sao biết nó đang khoẻ hay đang yếu dần, trước khi người dùng gặp lỗi?**

## Bài này dẫn tới

Đo bằng metric: Actuator và Micrometer phơi số liệu, Prometheus thu về, Grafana vẽ bốn tín hiệu vàng.

## Câu hỏi cho bài sau

Dashboard cho thấy đang có lỗi. Tìm nguyên nhân một lỗi từ ba ngày trước ở đâu, và làm sao được báo ngay mà không phải ngồi nhìn dashboard? [Bài 38](../38-log-va-canh-bao/) trả lời câu này.

## Cần đã học trước

- [Bài 30 · Probe và giới hạn tài nguyên](../30-probe-va-tai-nguyen/)
- [Bài 35 · Rancher: quản lý cụm qua một giao diện](../35-rancher/)

## Khái niệm sẽ gặp

- Metric, log, trace khác nhau thế nào
- Micrometer: metric qua Actuator (đã dùng làm probe ở Bài 30)
- Prometheus: mô hình scrape; ServiceMonitor
- Grafana dashboard
- Bốn tín hiệu vàng: độ trễ, lưu lượng, lỗi, độ bão hoà
- Bộ giám sát có sẵn của Rancher

## Bài lab

Cài bộ giám sát, cho Prometheus lấy metric từ Actuator, vẽ dashboard bộ nhớ, CPU, số request, độ trễ p95. Cố tình tắt endpoint metric để thấy target báo down, rồi sửa.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích được metric khác log thế nào
- [ ] Mở được metric của Spring Boot cho Prometheus
- [ ] Vẽ được dashboard có đủ bốn tín hiệu vàng
- [ ] Tìm được service nào đang chậm từ dashboard

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
