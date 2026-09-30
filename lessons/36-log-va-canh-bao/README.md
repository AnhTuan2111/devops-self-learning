# Bài 36 — Log và cảnh báo

<img src="../../assets/readme/glyph/36.svg" width="132" align="right" alt="Ấn ký của Bài 36">

> **Module M5** · Rancher và vận hành — Quản lý cụm, theo dõi, xử lý sự cố
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Tìm được nguyên nhân một lỗi xảy ra 3 ngày trước, và được báo trước khi người dùng phàn nàn.

## Cần đã học trước

- [Bài 35 · Metric và dashboard](../35-metric-va-dashboard/)

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
