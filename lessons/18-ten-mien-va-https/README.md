# Bài 18 — Tên miền và HTTPS

<img src="../../assets/readme/glyph/18.svg" width="132" align="right" alt="Ấn ký của Bài 18">

> **Module M2** · Server thật — Deploy lên một máy Linux thật
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Service có tên miền và ổ khóa HTTPS, chứng chỉ tự gia hạn mà không phải nhớ.

## Cần đã học trước

- [Bài 00 · Bản đồ toàn cảnh: một request đi từ browser tới code của bạn](../00-ban-do-toan-canh/)
- [Bài 17 · Reverse proxy đứng trước ứng dụng](../17-reverse-proxy/)

## Khái niệm sẽ gặp

- Bản ghi DNS: A, AAAA, CNAME, TXT; TTL
- dig và /etc/hosts
- Chứng chỉ, CA, ACME: HTTP-01 và DNS-01 (nối Bài 00)
- Certbot với Nginx; chuyển 80 sang 443; HSTS
- Tự gia hạn, và cách kiểm chứng nó thật sự chạy
- CAA, Certificate Transparency; proxy kiểu Cloudflare: lợi và hại
- Server nội bộ: chứng chỉ do CA nội bộ cấp

## Bài lab

Tuỳ server: có tên miền công khai thì cấp chứng chỉ Let's Encrypt và chạy renew --dry-run; server chỉ trong mạng nội bộ thì dùng chứng chỉ do CA nội bộ cấp. Cố tình trỏ sai bản ghi DNS để thấy triệu chứng, rồi sửa.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Đọc được một bản ghi DNS bằng dig
- [ ] Giải thích được CA kiểm tra quyền sở hữu tên miền thế nào
- [ ] Chứng minh được chứng chỉ sẽ tự gia hạn
- [ ] Nói được một lợi và một hại khi đặt proxy kiểu Cloudflare phía trước

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
