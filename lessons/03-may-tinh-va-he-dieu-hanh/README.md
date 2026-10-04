# Bài 03 — Máy tính, Hệ điều hành, Process: 'server' thật ra là cái gì

<img src="../../assets/readme/glyph/03.svg" width="132" align="right" alt="Ấn ký của Bài 03">

> **Module M0** · Nền tảng tối thiểu — Request, process và phòng lab
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 02](../02-chan-doan-theo-chang/) kết luận: Mỗi mã lỗi là câu trả lời của một thành phần cụ thể: 502 và 504 do Nginx viết khi phía sau không trả lời hoặc trả lời quá chậm, 500 do chính app viết. Biết ai viết ra là khoanh được chặng hỏng, vì triệu chứng luôn chứng minh các chặng phía trước đã chạy tốt.

## Câu hỏi của bài

**502 nghĩa là phía sau Nginx không còn ai trả lời. Nhưng "app" thật ra là gì trên một máy chủ, vì sao nó có thể chết, và vì sao nó chết thì website sập?**

## Bài này dẫn tới

App là một process do kernel quản lý. Hết RAM thì kernel giết process lớn nhất, process chết thì port của nó trống và Nginx viết 502. Muốn app tự sống lại thì phải giao nó cho một process khác trông coi, tức biến nó thành service.

## Câu hỏi cho bài sau

Server thật chạy Linux, còn mọi lab tới giờ chạy trên Windows. Làm sao có một máy Linux thật ngay trên máy mình, để thấy process, signal và lỗi đúng như trên server? [Bài 04](../04-phong-lab-wsl-docker/) trả lời câu này.

## Cần đã học trước

- [Bài 02 · Chẩn đoán theo chặng: nhìn lỗi biết chỗ hỏng](../02-chan-doan-theo-chang/)

## Khái niệm sẽ gặp

- CPU, RAM, ổ đĩa, mạng: hết cái nào thì hỏng kiểu nào
- Kernel, user space và syscall
- Process, PID, thread
- Process sở hữu gì: vùng nhớ, user, thư mục làm việc, biến môi trường
- Process chết: SIGTERM, SIGKILL, OOM killer
- Service: process có người trông coi
- Vì sao app chết thì website sập

## Bài lab

Quan sát process của chính Spring Boot / Node trên máy mình. Tìm PID, xem RAM, kill nó, xem điều gì xảy ra. Tìm xem process nào đang giữ port 8080.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Chỉ ra được process nào đang giữ một port
- [ ] Giải thích được OOM (hết RAM) sẽ làm gì với app
- [ ] Phân biệt process và service

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
