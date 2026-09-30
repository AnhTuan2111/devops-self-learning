# Bài 14 — SSH vào server

<img src="../../assets/readme/glyph/14.svg" width="132" align="right" alt="Ấn ký của Bài 14">

> **Module M2** · Server thật — Deploy lên một máy Linux thật
> Ước lượng: 3–5 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Vào server an toàn bằng khóa, cấu hình một lần rồi chỉ cần gõ ssh tên-server.

## Cần đã học trước

- [Bài 02 · Phòng lab: WSL2, Docker Desktop và shell tối thiểu](../02-phong-lab-wsl-docker/)

## Khái niệm sẽ gặp

- Cặp khóa công khai và khóa bí mật: khóa dùng để làm gì (nối chứng chỉ ở Bài 00)
- Chữ ký số ở mức khái niệm
- ssh-keygen và authorized_keys
- ~/.ssh/config
- scp và rsync
- known_hosts và cảnh báo "host key changed"
- Quy tắc khi dùng chung một server với người khác

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
