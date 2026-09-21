# Bài 39 — Xử lý sự cố: quy trình khi mọi thứ đang cháy

> **Module M7** · Monitoring & Vận hành — Biết server còn sống
> Ước lượng: ~70 phút · Trạng thái: `todo`

## Mục tiêu

Có một quy trình debug theo tầng thay vì hoảng loạn thử mọi thứ.

## Khái niệm sẽ gặp

- Debug theo tầng: DNS → Nginx → App → DB
- Lệnh chẩn đoán nhanh: df -h, free -h, docker stats, journalctl
- Đầy disk, hết RAM, cạn connection pool
- Postmortem không đổ lỗi
- Runbook cho từng loại sự cố

## Bài lab

Tự gây 3 sự cố (đầy disk, DB chết, app treo) và viết runbook xử lý cho từng loại.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Có checklist chẩn đoán theo thứ tự cố định
- [ ] Khoanh vùng được lỗi nằm ở tầng nào trong 5 phút
- [ ] Có runbook viết sẵn cho ít nhất 3 sự cố

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
