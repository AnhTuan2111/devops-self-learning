# Bài 15 — Linux sinh tồn trên server

<img src="../../assets/readme/glyph/15.svg" width="132" align="right" alt="Ấn ký của Bài 15">

> **Module M2** · Server thật — Deploy lên một máy Linux thật
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Đi lại trên một server lạ, tìm log, xem ổ đĩa, bộ nhớ và port mà không bị lạc.

## Cần đã học trước

- [Bài 09 · Dữ liệu: volume, PostgreSQL và backup](../09-volume-va-du-lieu/)
- [Bài 14 · SSH vào server](../14-ssh-vao-server/)

## Khái niệm sẽ gặp

- Cây thư mục: /etc, /var/log, /home, /opt, /tmp
- Đọc log: tail -f, grep, less
- df, du, free: đầy đĩa và hết bộ nhớ
- ss: process nào đang listen port nào, và từng kết nối đang mở (bộ bốn IP:port)
- sudo, user và group trên server
- Firewall trên server: xem luật đang mở, cả IPv4 lẫn IPv6

## Bài lab

Đi một vòng server và trả lời: log nằm ở đâu, đĩa còn bao nhiêu, ai đang giữ port nào. Tạo một tệp lớn trong thư mục của mình để thấy df thay đổi, tìm ra nó bằng du, rồi dọn.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Tìm được log của một dịch vụ lạ trên server
- [ ] Tìm ra thư mục đang ăn nhiều đĩa nhất
- [ ] Biết process nào đang giữ một port
- [ ] Đọc được firewall đang mở những cổng nào

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
