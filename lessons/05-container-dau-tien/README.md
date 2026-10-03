# Bài 05 — Container đầu tiên: nó chỉ là một process bị cô lập

<img src="../../assets/readme/glyph/05.svg" width="132" align="right" alt="Ấn ký của Bài 05">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 4–6 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 04](../04-phong-lab-wsl-docker/) kết luận: WSL2 chạy một kernel Linux thật trong một máy ảo nhẹ; bash và vài lệnh tối thiểu đủ để điều khiển nó. Docker Desktop dùng chính máy Linux đó để chạy container, và lệnh docker run hello-world đầu tiên đã chạy được.

## Câu hỏi của bài

**hello-world vừa chạy "trong một container". Container là một máy ảo nhỏ như WSL2, hay chỉ là một process như ở Bài 03?**

## Bài này dẫn tới

Container là một process Linux bình thường được kernel giới hạn tầm nhìn (namespace) và tài nguyên (cgroup). Nó chạy từ một image và dùng chung kernel với máy, không có kernel riêng như máy ảo.

## Câu hỏi cho bài sau

Container là một process có mạng riêng. Vậy làm sao gọi được app chạy bên trong nó từ trình duyệt trên máy mình? [Bài 06](../06-port-va-publish/) trả lời câu này.

## Cần đã học trước

- [Bài 03 · Máy tính, Hệ điều hành, Process: 'server' thật ra là cái gì](../03-may-tinh-va-he-dieu-hanh/)
- [Bài 04 · Phòng lab: WSL2, Docker Desktop và shell tối thiểu](../04-phong-lab-wsl-docker/)

## Khái niệm sẽ gặp

- Vấn đề "máy tôi chạy được mà" và vì sao Docker ra đời
- Image và container (giống class và object)
- docker run, ps, logs, exec, stop, start, rm
- Namespace: process trong container thấy gì và không thấy gì
- Cgroup: giới hạn CPU và bộ nhớ cho một process
- Container khác máy ảo ở đâu (nối Bài 04)

## Bài lab

Chạy container Nginx và PostgreSQL, exec vào trong xem danh sách process và hostname, rồi so với cảnh nhìn từ ngoài bằng docker top. Cố tình xoá một container đang chạy, và chạy một container không có -d rồi đóng terminal, để thấy chuyện gì xảy ra.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích bằng lời thường vì sao container không phải máy ảo
- [ ] Nói được image khác container ở điểm nào
- [ ] Vào được bên trong một container đang chạy và thoát ra
- [ ] Chỉ ra được cùng một process có PID khác nhau khi nhìn từ trong và từ ngoài container

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
