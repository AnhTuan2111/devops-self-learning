# Bài 19 — Docker network: container gọi nhau bằng tên

<img src="../../assets/readme/glyph/19.svg" width="132" align="right" alt="Ấn ký của Bài 19">

> **Module M3** · Docker — Đóng gói ứng dụng
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Hiểu vì sao trong Compose bạn viết jdbc:postgresql://db:5432 thay vì localhost.

## Khái niệm sẽ gặp

- bridge, host, none
- User-defined network và DNS nội bộ
- Port publishing -p host:container
- host.docker.internal
- Container isolation

## Bài lab

Tạo network riêng, cho 2 container ping nhau bằng tên, rồi tháo network ra và quan sát nó hỏng thế nào.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích vì sao đổi localhost thành tên service
- [ ] Biết port nào thực sự lộ ra ngoài
- [ ] Cô lập được database không cho truy cập từ ngoài

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
