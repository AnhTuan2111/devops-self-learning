# Bài 38 — Log và cảnh báo

<img src="../../assets/readme/glyph/38.svg" width="132" align="right" alt="Ấn ký của Bài 38">

> **Module M5** · Rancher và vận hành — Quản lý cụm, theo dõi, xử lý sự cố
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 37](../37-metric-va-dashboard/) kết luận: Đo bằng metric: Actuator và Micrometer phơi số liệu, Prometheus thu về, Grafana vẽ bốn tín hiệu vàng.

## Câu hỏi của bài

**Dashboard cho thấy đang có lỗi. Tìm nguyên nhân một lỗi từ ba ngày trước ở đâu, và làm sao được báo ngay mà không phải ngồi nhìn dashboard?**

## Bài này dẫn tới

Log có cấu trúc được gom tập trung và truy theo correlation ID; cảnh báo với ngưỡng hợp lý gửi tới người trực.

## Câu hỏi cho bài sau

Cảnh báo vừa kêu lúc nửa đêm. Làm gì, theo thứ tự nào, để tìm ra chỗ hỏng thay vì thử bừa? [Bài 39](../39-xu-ly-su-co/) trả lời câu này.

## Cần đã học trước

- [Bài 37 · Metric và dashboard](../37-metric-va-dashboard/)

## Khái niệm sẽ gặp

- Log ra stdout và log có cấu trúc (JSON)
- Correlation ID xuyên suốt một request
- Log tập trung trong cụm
- Alertmanager và luật cảnh báo
- Ngưỡng hợp lý, và vì sao cảnh báo quá nhiều là vô dụng
- Cảnh báo chứng chỉ sắp hết hạn
- Không log dữ liệu cá nhân và token

## Bài lab

Bật log JSON có correlation ID, truy một request qua nhiều pod. Cấu hình cảnh báo khi lỗi 5xx vượt ngưỡng và khi chứng chỉ sắp hết hạn. Cố tình làm sập service để kiểm chứng cảnh báo thật sự tới.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Truy được một request qua nhiều service bằng correlation ID
- [ ] Có cảnh báo khi service chết hoặc lỗi tăng vọt
- [ ] Có cảnh báo trước khi chứng chỉ hết hạn
- [ ] Kể được những gì không bao giờ được ghi vào log

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
