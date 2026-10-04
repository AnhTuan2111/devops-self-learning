# Bài 01 — IP, port, listen, firewall: vì sao gọi không tới

<img src="../../assets/readme/glyph/01.svg" width="132" align="right" alt="Ấn ký của Bài 01">

> **Module M0** · Nền tảng tối thiểu — Request, process và phòng lab
> Ước lượng: 3–5 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 00](../00-ban-do-toan-canh/) kết luận: Chín chặng: trình duyệt, DNS, mở kết nối, mã hoá, gửi request, firewall, reverse proxy, ứng dụng, database. Trong cả đường đi, chỉ ứng dụng là code bạn viết; tám chặng còn lại là hạ tầng, và phần lớn sự cố nằm ở đó.

## Câu hỏi của bài

**App chạy bình thường khi gọi bằng localhost:8080 trên chính máy mình, nhưng người khác gọi vào thì không được. Chặng mở kết nối hỏng ở đâu?**

## Bài này dẫn tới

Muốn gọi tới được cần đủ ba điều kiện, theo thứ tự gói tin gặp chúng: đúng địa chỉ IP, firewall cho đi qua, và có chương trình listen ở port đó trên đúng địa chỉ. Refused hay timeout cho biết điều kiện nào đang thiếu.

## Câu hỏi cho bài sau

Kết nối tới được rồi mà trang vẫn báo 502, 500 hay 504. Lỗi đó do ai viết ra, và nó cho biết chặng nào đang hỏng? [Bài 02](../02-chan-doan-theo-chang/) trả lời câu này.

## Cần đã học trước

- [Bài 00 · Bản đồ toàn cảnh: một request đi qua chín chặng](../00-ban-do-toan-canh/)

## Khái niệm sẽ gặp

- Địa chỉ IP và network interface: một máy có nhiều địa chỉ
- Port: con số chọn đúng chương trình trong máy
- Listen và listen address: 127.0.0.1, IP mạng LAN, 0.0.0.0
- Ba dải địa chỉ đặc biệt: loopback, mạng riêng, link-local
- Firewall: lớp chặn trước khi gói tin tới chương trình
- Ba điều kiện để gọi tới được một app
- TCP: bắt tay ba bước, và bộ bốn IP:port của một kết nối
- Refused và timeout: ai trả lời, và vì sao một cái tức thì còn một cái phải chờ

## Bài lab

Gọi một app bằng localhost, bằng IP mạng LAN và từ máy khác; đổi listen address giữa 127.0.0.1 và 0.0.0.0. Cố tình gọi vào một port không ai listen và vào một địa chỉ không ai trả lời, rồi đo thời gian refused và timeout bằng time curl.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích được vì sao localhost là một từ tương đối
- [ ] Kể được ba điều kiện để gọi tới được một app
- [ ] Phân biệt được refused và timeout, và điều kiện nào thiếu sinh ra cái nào
- [ ] Nói được vì sao một server không đặt trên laptop ở nhà

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
