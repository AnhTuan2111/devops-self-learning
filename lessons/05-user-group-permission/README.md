# Bài 05 — User, group, permission: vì sao 'Permission denied'

> **Module M1** · Linux — Điều khiển một server
> Ước lượng: ~50 phút · Trạng thái: `todo`

## Mục tiêu

Không bao giờ phải sudo bừa nữa. Hiểu vì sao container production không được chạy bằng root.

## Khái niệm sẽ gặp

- root vs user thường
- rwx và số 755/644
- chmod chown chgrp
- sudo và /etc/sudoers
- umask
- Nguyên tắc least privilege

## Bài lab

Tạo user deploy, phân quyền thư mục app, cố tình gây lỗi Permission denied rồi tự sửa.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Đọc được output của ls -l không cần tra cứu
- [ ] Giải thích được vì sao chmod 777 là nguy hiểm
- [ ] Tạo được user riêng cho ứng dụng

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
