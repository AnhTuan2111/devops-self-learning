# Bài 35 — Metric và dashboard

<img src="../../assets/readme/glyph/35.svg" width="132" align="right" alt="Ấn ký của Bài 35">

> **Module M5** · Rancher và vận hành — Quản lý cụm, theo dõi, xử lý sự cố
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Có một dashboard trả lời được: service đang khoẻ hay yếu, và yếu ở đâu.

## Cần đã học trước

- [Bài 28 · Probe và giới hạn tài nguyên](../28-probe-va-tai-nguyen/)
- [Bài 33 · Rancher: quản lý cụm qua một giao diện](../33-rancher/)

## Khái niệm sẽ gặp

- Metric, log, trace khác nhau thế nào
- Spring Boot Actuator và Micrometer
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
