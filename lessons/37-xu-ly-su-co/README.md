# Bài 37 — Xử lý sự cố: quy trình khi mọi thứ đang cháy

<img src="../../assets/readme/glyph/37.svg" width="132" align="right" alt="Ấn ký của Bài 37">

> **Module M5** · Rancher và vận hành — Quản lý cụm, theo dõi, xử lý sự cố
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Có một quy trình chẩn đoán theo tầng thay vì hoảng loạn thử mọi thứ.

## Cần đã học trước

- [Bài 31 · Gỡ lỗi pod](../31-go-loi-pod/)
- [Bài 36 · Log và cảnh báo](../36-log-va-canh-bao/)

## Khái niệm sẽ gặp

- Chẩn đoán theo tầng: DNS, Ingress, Service, pod, app, database (nối bản đồ 9 chặng ở Bài 00)
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
