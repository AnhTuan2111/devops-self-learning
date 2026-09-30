# Bài 16 — Deploy thủ công bằng Compose lên server

<img src="../../assets/readme/glyph/16.svg" width="132" align="right" alt="Ấn ký của Bài 16">

> **Module M2** · Server thật — Deploy lên một máy Linux thật
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Tự tay đưa hệ thống lên server thật một lần, và ghi lại chính xác từng bước để sau này tự động hoá.

## Cần đã học trước

- [Bài 11 · Docker Compose: cả hệ thống trong một file](../11-docker-compose/)
- [Bài 13 · Gỡ lỗi container](../13-go-loi-container/)
- [Bài 15 · Linux sinh tồn trên server](../15-linux-tren-server/)

## Khái niệm sẽ gặp

- Đưa image lên server: qua registry, hoặc docker save và docker load
- Cấu trúc thư mục deploy trên server
- Chạy Compose trên server với cấu hình production
- Kiểm tra từ máy mình bằng curl
- Runbook: ghi lại từng lệnh đã gõ
- Vì sao không build trên server production

## Bài lab

Deploy toàn bộ stack lên server bằng tay, gọi được từ máy mình. Cố tình deploy thiếu tệp .env để gặp lỗi khởi động trên server, đọc log và sửa. Ghi runbook đầy đủ.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Đưa được một image từ máy mình lên server
- [ ] Khởi động được stack trên server và gọi được từ ngoài
- [ ] Có một runbook đủ để người khác làm lại được
- [ ] Giải thích được vì sao không build image ngay trên server production

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
