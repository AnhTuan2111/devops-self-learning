# Bài 02 — Chẩn đoán theo chặng: nhìn lỗi biết chỗ hỏng

<img src="../../assets/readme/glyph/02.svg" width="132" align="right" alt="Ấn ký của Bài 02">

> **Module M0** · Nền tảng tối thiểu — Request, process và phòng lab
> Ước lượng: 3–5 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 01](../01-ip-port-listen-firewall/) kết luận: Muốn gọi tới được cần đủ ba điều kiện, theo thứ tự gói tin gặp chúng: đúng địa chỉ IP, firewall cho đi qua, và có chương trình listen ở port đó trên đúng địa chỉ. Refused hay timeout cho biết điều kiện nào đang thiếu.

## Câu hỏi của bài

**Kết nối tới được rồi mà trang vẫn báo 502, 500 hay 504. Lỗi đó do ai viết ra, và nó cho biết chặng nào đang hỏng?**

## Bài này dẫn tới

Mỗi mã lỗi là câu trả lời của một thành phần cụ thể: 502 và 504 do Nginx viết khi phía sau không trả lời hoặc trả lời quá chậm, 500 do chính app viết. Biết ai viết ra là khoanh được chặng hỏng, vì triệu chứng luôn chứng minh các chặng phía trước đã chạy tốt.

## Câu hỏi cho bài sau

502 nghĩa là phía sau Nginx không còn ai trả lời. Nhưng "app" thật ra là gì trên một máy chủ, vì sao nó có thể chết, và vì sao nó chết thì website sập? [Bài 03](../03-may-tinh-va-he-dieu-hanh/) trả lời câu này.

## Cần đã học trước

- [Bài 01 · IP, port, listen, firewall: vì sao gọi không tới](../01-ip-port-listen-firewall/)

## Khái niệm sẽ gặp

- Mã trạng thái HTTP theo nhóm: 2xx, 3xx, 4xx, 5xx
- Ai viết ra lỗi: trình duyệt, curl, Nginx hay app
- 502 và 500: hai mã hay bị nhầm
- 504: phía sau trả lời quá chậm
- Ba nguyên tắc chẩn đoán
- Đã chạy chưa phải đã sẵn sàng: cửa sổ 502 lúc app khởi động
- Hệ thống hỏng mà không ai đụng vào: thời gian tự nó là nguyên nhân

## Bài lab

Đọc lại output các lab trước theo câu hỏi "ai viết ra dòng này": NXDOMAIN, refused, timeout. Dùng curl -i xem mã trạng thái và header Server của một trang có thật và một trang không tồn tại để biết ai đã trả lời.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Nhìn một mã lỗi nói được ai viết ra nó
- [ ] Phân biệt 502 với 500, và nói được mỗi cái hỏng ở đâu
- [ ] Áp được ba nguyên tắc chẩn đoán vào một sự cố
- [ ] Kể được ba thứ sẽ tự hỏng nếu không ai động vào trong sáu tháng

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
