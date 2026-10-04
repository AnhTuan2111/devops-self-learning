# Bài 20 — Tên miền và HTTPS

<img src="../../assets/readme/glyph/20.svg" width="132" align="right" alt="Ấn ký của Bài 20">

> **Module M2** · Server thật — Deploy lên một máy Linux thật
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 19](../19-reverse-proxy/) kết luận: Nginx nhận mọi request ở port 80 và 443 rồi chuyển vào app, giấu app và database. 502 khi app không trả lời, 504 khi app trả lời quá chậm, 413 khi body quá lớn; mỗi lỗi sửa bằng đúng một dòng cấu hình.

## Câu hỏi của bài

**Người dùng vẫn phải gõ địa chỉ IP, và trình duyệt báo "không an toàn". Làm sao có tên miền và ổ khoá HTTPS tự gia hạn?**

## Bài này dẫn tới

Trỏ bản ghi DNS về server, xin chứng chỉ từ một CA bằng cách chứng minh quyền sở hữu tên miền, cho Nginx dùng chứng chỉ đó, và kiểm chứng rằng việc gia hạn thật sự chạy.

## Câu hỏi cho bài sau

Deploy bằng tay theo runbook vừa chậm vừa dễ sót bước. Bước nào nên giao cho máy làm, và theo thứ tự nào? [Bài 21](../21-cicd-la-quy-trinh/) trả lời câu này.

## Cần đã học trước

- [Bài 00 · Bản đồ toàn cảnh: một request đi qua chín chặng](../00-ban-do-toan-canh/)
- [Bài 19 · Reverse proxy đứng trước ứng dụng](../19-reverse-proxy/)

## Khái niệm sẽ gặp

- Bản ghi DNS: A, AAAA, CNAME, TXT; TTL
- dig và /etc/hosts
- Đọc chứng chỉ X.509 và chuỗi tin cậy bằng openssl
- Vì sao chứng chỉ chỉ sống 90 ngày, và xu hướng còn ngắn hơn
- Nắm được DNS là xin được chứng chỉ hợp lệ: bảo vệ tài khoản tên miền
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
