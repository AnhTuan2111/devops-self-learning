# Bài 38 — Alert: được báo trước khi người dùng phàn nàn

> **Module M7** · Monitoring & Vận hành — Biết server còn sống
> Ước lượng: ~65 phút · Trạng thái: `todo`

## Mục tiêu

Server chết lúc 3h sáng thì điện thoại bạn kêu, chứ không phải sếp gọi lúc 8h.

## Khái niệm sẽ gặp

- Uptime monitoring từ bên ngoài
- Alertmanager và routing
- Ngưỡng cảnh báo hợp lý
- Alert fatigue: vì sao cảnh báo quá nhiều là vô dụng
- On-call và runbook
- Healthcheck endpoint đúng cách

## Bài lab

Cấu hình alert khi service chết hoặc lỗi 5xx vượt ngưỡng. Cố tình làm sập service để kiểm chứng.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Tự tay làm sập app và nhận được cảnh báo
- [ ] Mỗi cảnh báo đều có hành động cụ thể phải làm
- [ ] Không có cảnh báo nào bị bỏ qua vì quá ồn

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
