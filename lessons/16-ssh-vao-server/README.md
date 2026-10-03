# Bài 16 — SSH vào server

<img src="../../assets/readme/glyph/16.svg" width="132" align="right" alt="Ấn ký của Bài 16">

> **Module M2** · Server thật — Deploy lên một máy Linux thật
> Ước lượng: 3–5 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 15](../15-go-loi-container/) kết luận: Có: ps -a, logs, inspect để đọc exit code và OOMKilled, rồi vào bên trong. Mỗi triệu chứng trỏ về một nhóm nguyên nhân trong bảng triệu chứng.

## Câu hỏi của bài

**Hệ thống đã chạy được trên máy mình. Để đưa nó lên một server ở xa, không màn hình, ta điều khiển server đó bằng cách nào cho an toàn?**

## Bài này dẫn tới

Bằng SSH với một cặp khóa: khóa bí mật ở lại máy mình, khóa công khai đặt trên server, và ~/.ssh/config biến việc đăng nhập thành một lệnh ngắn.

## Câu hỏi cho bài sau

Đã vào được một server lạ. Log nằm ở đâu, ổ đĩa và RAM còn bao nhiêu, ai đang giữ port nào, và một process được mở bao nhiêu file? [Bài 17](../17-linux-tren-server/) trả lời câu này.

## Cần đã học trước

- [Bài 04 · Phòng lab: WSL2, Docker Desktop và shell tối thiểu](../04-phong-lab-wsl-docker/)

## Khái niệm sẽ gặp

- Cặp khóa công khai và khóa bí mật: khóa dùng để làm gì (nối chứng chỉ ở Bài 00)
- Chữ ký số ở mức khái niệm
- ssh-keygen và authorized_keys
- ~/.ssh/config
- scp và rsync
- known_hosts và cảnh báo "host key changed"

## Bài lab

Tạo khóa, đăng nhập server bằng khóa, cấu hình ~/.ssh/config. Cố tình đặt quyền tệp khóa quá rộng để SSH từ chối dùng nó, rồi sửa.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích được khóa công khai và khóa bí mật, cái nào được phép đưa cho người khác
- [ ] Đăng nhập server chỉ bằng ssh tên-server
- [ ] Chép được tệp lên và xuống server
- [ ] Biết phải làm gì khi gặp cảnh báo host key changed

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
