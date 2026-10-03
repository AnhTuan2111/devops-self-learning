# Bài 18 — Deploy thủ công bằng Compose lên server

<img src="../../assets/readme/glyph/18.svg" width="132" align="right" alt="Ấn ký của Bài 18">

> **Module M2** · Server thật — Deploy lên một máy Linux thật
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 17](../17-linux-tren-server/) kết luận: Một bộ lệnh nhỏ trả lời hết: /var/log với tail và grep, df, du, free, ss và ulimit; kèm những quy tắc khi dùng chung server với người khác.

## Câu hỏi của bài

**Đã biết đi lại trên server. Đưa image và compose.yaml lên đó rồi chạy thật thì cần chính xác những bước nào?**

## Bài này dẫn tới

Đưa image qua registry hoặc docker save và load, chạy Compose với cấu hình production, kiểm tra từ máy mình, và ghi mọi bước thành một runbook.

## Câu hỏi cho bài sau

App đang lộ thẳng port 8080 ra ngoài. Vì sao nên đặt Nginx đứng trước, và khi đã đặt thì 502, 504, 413 sinh ra từ đâu? [Bài 19](../19-reverse-proxy/) trả lời câu này.

## Cần đã học trước

- [Bài 13 · Docker Compose: cả hệ thống trong một file](../13-docker-compose/)
- [Bài 15 · Gỡ lỗi container](../15-go-loi-container/)
- [Bài 17 · Linux sinh tồn trên server](../17-linux-tren-server/)

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
