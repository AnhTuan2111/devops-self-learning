# Bài 34 — CD: tự động deploy lên VPS

> **Module M6** · CI/CD — Tự động hóa toàn bộ
> Ước lượng: ~75 phút · Trạng thái: `todo`

## Mục tiêu

git push → production tự cập nhật. Không SSH thủ công nữa.

## Khái niệm sẽ gặp

- GitHub Secrets và Environments
- Deploy key / SSH từ Actions
- Script deploy idempotent
- docker compose pull && up -d
- Environment protection rule
- Vì sao KHÔNG build trên server production

## Bài lab

Workflow SSH vào VPS, pull image mới, restart stack. Deploy thật một thay đổi nhỏ.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Đẩy một commit và thấy production đổi mà không đụng terminal
- [ ] Secret không lộ trong log
- [ ] Deploy hỏng thì workflow phải đỏ, không im lặng

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
