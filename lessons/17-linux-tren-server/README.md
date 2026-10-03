# Bài 17 — Linux sinh tồn trên server

<img src="../../assets/readme/glyph/17.svg" width="132" align="right" alt="Ấn ký của Bài 17">

> **Module M2** · Server thật — Deploy lên một máy Linux thật
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 16](../16-ssh-vao-server/) kết luận: Bằng SSH với một cặp khóa: khóa bí mật ở lại máy mình, khóa công khai đặt trên server, và ~/.ssh/config biến việc đăng nhập thành một lệnh ngắn.

## Câu hỏi của bài

**Đã vào được một server lạ. Log nằm ở đâu, ổ đĩa và RAM còn bao nhiêu, ai đang giữ port nào, và một process được mở bao nhiêu file?**

## Bài này dẫn tới

Một bộ lệnh nhỏ trả lời hết: /var/log với tail và grep, df, du, free, ss và ulimit; kèm những quy tắc khi dùng chung server với người khác.

## Câu hỏi cho bài sau

Đã biết đi lại trên server. Đưa image và compose.yaml lên đó rồi chạy thật thì cần chính xác những bước nào? [Bài 18](../18-deploy-thu-cong/) trả lời câu này.

## Cần đã học trước

- [Bài 11 · Dữ liệu: volume, PostgreSQL và backup](../11-volume-va-du-lieu/)
- [Bài 16 · SSH vào server](../16-ssh-vao-server/)

## Khái niệm sẽ gặp

- Cây thư mục: /etc, /var/log, /home, /opt, /tmp
- Đọc log: tail -f, grep, less
- df, du, free: đầy đĩa và hết bộ nhớ
- Giới hạn số file một process được mở cùng lúc: ulimit -n, lỗi Too many open files, rò rỉ do quên đóng (try-with-resources)
- ss: process nào đang listen port nào, và từng kết nối đang mở (bộ bốn IP:port)
- sudo, user và group trên server
- Quy tắc khi dùng chung một server với người khác
- Firewall trên server: xem luật đang mở, cả IPv4 lẫn IPv6

## Bài lab

Đi một vòng server và trả lời: log nằm ở đâu, đĩa còn bao nhiêu, ai đang giữ port nào. Tạo một tệp lớn trong thư mục của mình để thấy df thay đổi, tìm ra nó bằng du, rồi dọn.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Tìm được log của một dịch vụ lạ trên server
- [ ] Tìm ra thư mục đang ăn nhiều đĩa nhất
- [ ] Liệt kê được mọi kết nối đang mở tới một port bằng ss (nối Bài 01)
- [ ] Đọc được firewall đang mở những cổng nào

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
