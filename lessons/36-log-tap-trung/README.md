# Bài 36 — Log: từ docker logs tới log tập trung

> **Module M7** · Monitoring & Vận hành — Biết server còn sống
> Ước lượng: ~65 phút · Trạng thái: `todo`

## Mục tiêu

Tìm được nguyên nhân một lỗi xảy ra 3 ngày trước, kể cả khi container đã bị thay.

## Khái niệm sẽ gặp

- Log level và structured logging (JSON)
- docker logs và log driver
- Log rotation, đầy ổ cứng vì log
- Correlation ID xuyên request
- Loki + Promtail hoặc giải pháp nhẹ
- Cái gì KHÔNG được log (PII, token)

## Bài lab

Bật structured log cho Spring Boot, cấu hình log rotation, truy một request qua nhiều tầng bằng correlation ID.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Log không bao giờ làm đầy ổ cứng
- [ ] Truy được một request từ Nginx xuống app
- [ ] Không có mật khẩu/token nào trong log

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
