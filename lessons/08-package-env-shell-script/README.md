# Bài 08 — Package, biến môi trường và shell script đầu tiên

> **Module M1** · Linux — Điều khiển một server
> Ước lượng: ~55 phút · Trạng thái: `todo`

## Mục tiêu

Cài phần mềm lên server đúng cách, và tự động hóa một việc lặp lại bằng script.

## Khái niệm sẽ gặp

- apt update/install/remove
- PATH và cách shell tìm lệnh
- export, env, .bashrc vs .profile
- Shell script: shebang, biến, if, for
- set -e và xử lý lỗi
- cron

## Bài lab

Viết script backup.sh nén một thư mục, gắn timestamp vào tên file, và hẹn giờ chạy bằng cron.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích được command not found bằng PATH
- [ ] Viết script có xử lý lỗi, không im lặng thất bại
- [ ] Đặt được một cron job và xác minh nó chạy

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
