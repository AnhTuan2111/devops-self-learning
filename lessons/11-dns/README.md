# Bài 11 — DNS: từ tên miền tới IP

> **Module M2** · Networking — Làm sao dữ liệu tới được máy bạn
> Ước lượng: ~45 phút · Trạng thái: `todo`

## Mục tiêu

Tự trỏ được một domain thật về server của mình, và debug được khi 'domain không vào được'.

## Khái niệm sẽ gặp

- Resolver, root, TLD, authoritative
- A, AAAA, CNAME, TXT, MX
- TTL và vì sao đổi DNS phải chờ
- dig / nslookup
- /etc/hosts
- DNS cache

## Bài lab

Dùng dig truy vết một domain thật từng tầng. Giả lập domain bằng /etc/hosts.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Đọc được output của dig
- [ ] Phân biệt A record và CNAME, biết khi nào dùng cái nào
- [ ] Giả lập được domain nội bộ bằng /etc/hosts

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
