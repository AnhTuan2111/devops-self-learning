# Bài 39 — Xử lý sự cố: quy trình khi mọi thứ đang cháy

<img src="../../assets/readme/glyph/39.svg" width="132" align="right" alt="Ấn ký của Bài 39">

> **Module M5** · Rancher và vận hành — Quản lý cụm, theo dõi, xử lý sự cố
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 38](../38-log-va-canh-bao/) kết luận: Log có cấu trúc được gom tập trung và truy theo correlation ID; cảnh báo với ngưỡng hợp lý gửi tới người trực.

## Câu hỏi của bài

**Cảnh báo vừa kêu lúc nửa đêm. Làm gì, theo thứ tự nào, để tìm ra chỗ hỏng thay vì thử bừa?**

## Bài này dẫn tới

Chẩn đoán theo chặng của bản đồ chín chặng, làm theo runbook, khôi phục dịch vụ trước rồi mới tìm nguyên nhân, và viết postmortem không đổ lỗi.

## Câu hỏi cho bài sau

Đã đi qua từng mảnh. Bạn có tự dựng lại được toàn bộ hệ thống từ một repo trống, và giải thích được từng mũi tên trong đó không? [Bài 40](../40-tong-ket/) trả lời câu này.

## Cần đã học trước

- [Bài 33 · Gỡ lỗi pod](../33-go-loi-pod/)
- [Bài 38 · Log và cảnh báo](../38-log-va-canh-bao/)

## Khái niệm sẽ gặp

- Chẩn đoán theo tầng: DNS, Ingress, Service, pod, app, database (nối bản đồ chín chặng ở Bài 00 và chẩn đoán theo chặng ở Bài 02)
- Đầy đĩa, hết bộ nhớ, cạn connection pool
- Runbook cho từng loại sự cố
- Postmortem không đổ lỗi
- Giao tiếp khi đang có sự cố

## Bài lab

Tự gây ba sự cố trên cụm học — database chết, pod bị OOM, Ingress cấu hình sai — xử lý theo quy trình, và viết runbook cho từng loại.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Có một thứ tự chẩn đoán theo tầng và làm theo được khi đang căng thẳng
- [ ] Viết được runbook cho một loại sự cố
- [ ] Viết được một postmortem không đổ lỗi

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
