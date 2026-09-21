# Bài 06 — Process và signal: app của bạn sống và chết thế nào

> **Module M1** · Linux — Điều khiển một server
> Ước lượng: ~50 phút · Trạng thái: `todo`

## Mục tiêu

Biết app còn sống không, nó ăn bao nhiêu RAM, và vì sao Ctrl+C đôi khi không tắt được nó.

## Khái niệm sẽ gặp

- ps top htop
- PID, PPID, PID 1
- Signal: SIGTERM SIGKILL SIGINT
- Foreground / background, &, nohup
- Zombie & orphan process
- Graceful shutdown

## Bài lab

Chạy Spring Boot, tìm PID, gửi SIGTERM vs SIGKILL và quan sát khác biệt trong log.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Tìm được process ăn nhiều CPU nhất
- [ ] Giải thích khác biệt kill vs kill -9
- [ ] Hiểu vì sao PID 1 trong container quan trọng

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
