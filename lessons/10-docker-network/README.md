# Bài 10 — Docker network: container gọi nhau bằng tên

<img src="../../assets/readme/glyph/10.svg" width="132" align="right" alt="Ấn ký của Bài 10">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 3–5 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Hiểu vì sao trong Docker bạn viết jdbc:postgresql://db:5432 thay vì localhost, và sửa được khi hai container không thấy nhau.

## Cần đã học trước

- [Bài 04 · Gọi được app trong container: port và listen address](../04-port-va-publish/)
- [Bài 09 · Dữ liệu: volume, PostgreSQL và backup](../09-volume-va-du-lieu/)

## Khái niệm sẽ gặp

- localhost bên trong container là chính container đó
- Bridge network và network tự tạo
- DNS nội bộ của Docker: gọi nhau bằng tên (DNS dạy đúng lúc)
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
