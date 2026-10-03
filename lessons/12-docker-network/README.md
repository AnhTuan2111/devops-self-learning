# Bài 12 — Docker network: container gọi nhau bằng tên

<img src="../../assets/readme/glyph/12.svg" width="132" align="right" alt="Ấn ký của Bài 12">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 3–5 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 11](../11-volume-va-du-lieu/) kết luận: Trong volume hoặc bind mount, nằm ngoài filesystem tạm thời của container. Và một bản backup chỉ có giá trị khi đã khôi phục thử thành công.

## Câu hỏi của bài

**App và PostgreSQL giờ là hai container. Vì sao app gọi localhost:5432 thì bị từ chối, và hai container gọi nhau bằng cách nào?**

## Bài này dẫn tới

Mỗi container có localhost của riêng nó. Đặt chúng vào chung một network tự tạo thì Docker cung cấp DNS nội bộ, và chúng gọi nhau bằng tên, như db:5432.

## Câu hỏi cho bài sau

Mỗi lần dựng lại phải gõ tay hai container, một network, một volume và cả đống tham số. Làm sao dựng lại cả hệ thống bằng một lệnh? [Bài 13](../13-docker-compose/) trả lời câu này.

## Cần đã học trước

- [Bài 06 · Gọi được app trong container: port và listen address](../06-port-va-publish/)
- [Bài 11 · Dữ liệu: volume, PostgreSQL và backup](../11-volume-va-du-lieu/)

## Khái niệm sẽ gặp

- localhost bên trong container là chính container đó
- Bridge network và network tự tạo
- DNS nội bộ của Docker: gọi nhau bằng tên (nối DNS ở Bài 00)
- Chỉ publish những cổng cần lộ ra ngoài
- host.docker.internal
- ping và nslookup từ trong container

## Bài lab

Cho Spring Boot và PostgreSQL vào chung một network và nối bằng tên. Cố tình để app dùng localhost:5432 để gặp "Connection refused", rồi sửa. Tách hai container ra hai network để thấy tên không còn phân giải được.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích được vì sao localhost trong container không trỏ tới máy bạn
- [ ] Nối được hai container bằng tên
- [ ] Chẩn đoán được lỗi "Unknown host" và "Connection refused" giữa hai container
- [ ] Biết cổng nào cần publish và cổng nào nên giấu

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
