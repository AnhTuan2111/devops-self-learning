# Bài 04 — Gọi được app trong container: port và listen address

<img src="../../assets/readme/glyph/04.svg" width="132" align="right" alt="Ấn ký của Bài 04">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 3–5 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Không bao giờ còn mắc lỗi kinh điển: app chạy trong container nhưng từ ngoài không ai gọi được.

## Cần đã học trước

- [Bài 00 · Bản đồ toàn cảnh: một request đi từ browser tới code của bạn](../00-ban-do-toan-canh/)
- [Bài 03 · Container đầu tiên: nó chỉ là một process bị cô lập](../03-container-dau-tien/)

## Khái niệm sẽ gặp

- Nhắc lại từ Bài 00: IP, port, listen address
- Container có mạng riêng, IP riêng
- Publish port: -p cổng_máy:cổng_container
- 127.0.0.1 và 0.0.0.0 bên trong container (server.address của Spring Boot)
- Lỗi "port is already allocated" và cách tìm ai đang giữ port
- curl để kiểm tra từ ngoài vào

## Bài lab

Chạy một app trong container, lần lượt cho nó listen 127.0.0.1 rồi 0.0.0.0, gọi từ máy bằng curl và so kết quả. Cố tình publish trùng một port đang có người dùng để gặp lỗi "port is already allocated", rồi tự sửa.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích được vì sao app listen 127.0.0.1 trong container thì từ ngoài không gọi được
- [ ] Viết đúng tham số -p khi biết cổng máy và cổng container
- [ ] Tìm ra ai đang giữ một port khi gặp lỗi port đã bị chiếm
- [ ] Phân biệt refused và timeout khi gọi vào container (nối Bài 00)

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
