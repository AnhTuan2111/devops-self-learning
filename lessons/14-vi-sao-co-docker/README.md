# Bài 14 — Vì sao có Docker: container KHÔNG phải máy ảo

> **Module M3** · Docker — Đóng gói ứng dụng
> Ước lượng: ~50 phút · Trạng thái: `todo`

## Mục tiêu

Hiểu container thật ra chỉ là một process Linux bị cô lập, không phải một máy tính thu nhỏ.

## Khái niệm sẽ gặp

- Vấn đề trước Docker
- VM vs Container
- namespace (pid, net, mnt, user)
- cgroup
- Union filesystem / layer
- Docker Engine, daemon, client

## Bài lab

Chạy một container rồi dùng ps trên host để tìm chính process đó. Chứng minh nó chỉ là process.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích container khác VM bằng ngôn ngữ của mình
- [ ] Chỉ ra process của container trên host
- [ ] Nói được Docker giải quyết vấn đề gì, và KHÔNG giải quyết vấn đề gì

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
