# Bài 03 — Container đầu tiên: nó chỉ là một process bị cô lập

<img src="../../assets/readme/glyph/03.svg" width="132" align="right" alt="Ấn ký của Bài 03">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 4–6 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Chạy, xem, vào trong và xoá container thành thạo, và chứng minh được container chỉ là một process Linux bị giới hạn tầm nhìn.

## Cần đã học trước

- [Bài 01 · Máy tính, Hệ điều hành, Process: 'server' thật ra là cái gì](../01-may-tinh-va-he-dieu-hanh/)
- [Bài 02 · Phòng lab: WSL2, Docker Desktop và shell tối thiểu](../02-phong-lab-wsl-docker/)

## Khái niệm sẽ gặp

- Vấn đề "máy tôi chạy được mà" và vì sao Docker ra đời
- Image và container (giống class và object)
- docker run, ps, logs, exec, stop, start, rm
- Namespace: process trong container thấy gì và không thấy gì
- Cgroup: giới hạn CPU và bộ nhớ cho một process
- Container khác máy ảo ở đâu

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
