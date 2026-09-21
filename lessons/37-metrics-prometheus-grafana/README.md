# Bài 37 — Metrics với Prometheus, Grafana và Spring Actuator

> **Module M7** · Monitoring & Vận hành — Biết server còn sống
> Ước lượng: ~75 phút · Trạng thái: `todo`

## Mục tiêu

Có một dashboard trả lời được: hệ thống đang khỏe hay yếu, và yếu ở đâu.

## Khái niệm sẽ gặp

- Metric vs Log vs Trace
- Spring Boot Actuator + Micrometer
- Prometheus scrape model
- node_exporter, cAdvisor
- Grafana dashboard
- 4 golden signals: latency, traffic, errors, saturation

## Bài lab

Dựng Prometheus + Grafana bằng compose, vẽ dashboard cho RAM, CPU, request rate, latency p95.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Nhìn dashboard biết ngay hệ thống có bất thường không
- [ ] Hiểu ý nghĩa p95 latency
- [ ] Biết ngưỡng nào là nguy hiểm với hệ thống của mình

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
