# Bài 06 — Gọi được app trong container: port và listen address

<img src="../../assets/readme/glyph/06.svg" width="132" align="right" alt="Ấn ký của Bài 06">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 3–5 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 05](../05-container-dau-tien/) kết luận: Container là một process Linux bình thường được kernel giới hạn tầm nhìn (namespace) và tài nguyên (cgroup). Nó chạy từ một image và dùng chung kernel với máy, không có kernel riêng như máy ảo.

## Câu hỏi của bài

**Container là một process có mạng riêng. Vậy làm sao gọi được app chạy bên trong nó từ trình duyệt trên máy mình?**

## Bài này dẫn tới

Phải publish port bằng -p cổng_máy:cổng_container, và app trong container phải listen 0.0.0.0: đúng ba điều kiện của Bài 01, áp vào một mạng mới.

## Câu hỏi cho bài sau

Container chạy từ image. Image là gì, lấy về từ đâu, và vì sao tải image thứ hai lại nhanh hơn image đầu? [Bài 07](../07-image-va-registry/) trả lời câu này.

## Cần đã học trước

- [Bài 01 · IP, port, listen, firewall: vì sao gọi không tới](../01-ip-port-listen-firewall/)
- [Bài 05 · Container đầu tiên: nó chỉ là một process bị cô lập](../05-container-dau-tien/)

## Khái niệm sẽ gặp

- Nhắc lại từ Bài 01: IP, port, listen address
- Container có mạng riêng, IP riêng
- Publish port: -p cổng_máy:cổng_container
- 127.0.0.1 và 0.0.0.0 bên trong container (server.address của Spring Boot)
- Lỗi "port is already allocated" và cách tìm ai đang giữ port (nối Bài 03)
- curl để kiểm tra từ ngoài vào

## Bài lab

Chạy một image có sẵn cho chọn địa chỉ listen bằng tham số (ví dụ python -m http.server --bind 127.0.0.1), lần lượt cho nó listen 127.0.0.1 rồi 0.0.0.0, gọi từ máy bằng curl và so kết quả. Cố tình publish trùng một port đang có người dùng để gặp lỗi "port is already allocated", rồi tự sửa.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích được vì sao app listen 127.0.0.1 trong container thì từ ngoài không gọi được
- [ ] Viết đúng tham số -p khi biết cổng máy và cổng container
- [ ] Tìm ra ai đang giữ một port khi gặp lỗi port đã bị chiếm
- [ ] Phân biệt được refused, timeout và Empty reply khi gọi vào container (nối Bài 01)

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
