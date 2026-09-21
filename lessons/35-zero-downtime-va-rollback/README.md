# Bài 35 — Zero-downtime và rollback: khi deploy hỏng lúc 5 giờ chiều

> **Module M6** · CI/CD — Tự động hóa toàn bộ
> Ước lượng: ~75 phút · Trạng thái: `todo`

## Mục tiêu

Deploy mà người dùng không thấy lỗi, và quay về bản cũ trong dưới 1 phút.

## Khái niệm sẽ gặp

- Downtime khi restart container
- Health check và readiness
- Rolling update thủ công với Nginx
- Blue-green cơ bản
- Rollback bằng image tag
- Database migration và backward compatibility

## Bài lab

Đo downtime hiện tại bằng vòng lặp curl, rồi cải tiến để giảm về gần 0. Thực hành rollback.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Đo được downtime bằng số cụ thể
- [ ] Rollback về bản trước trong 1 lệnh
- [ ] Hiểu vì sao migration DB là phần nguy hiểm nhất

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
