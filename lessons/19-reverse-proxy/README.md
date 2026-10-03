# Bài 19 — Reverse proxy đứng trước ứng dụng

<img src="../../assets/readme/glyph/19.svg" width="132" align="right" alt="Ấn ký của Bài 19">

> **Module M2** · Server thật — Deploy lên một máy Linux thật
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 18](../18-deploy-thu-cong/) kết luận: Đưa image qua registry hoặc docker save và load, chạy Compose với cấu hình production, kiểm tra từ máy mình, và ghi mọi bước thành một runbook.

## Câu hỏi của bài

**App đang lộ thẳng port 8080 ra ngoài. Vì sao nên đặt Nginx đứng trước, và khi đã đặt thì 502, 504, 413 sinh ra từ đâu?**

## Bài này dẫn tới

Nginx nhận mọi request ở port 80 và 443 rồi chuyển vào app, giấu app và database. 502 khi app không trả lời, 504 khi app trả lời quá chậm, 413 khi body quá lớn; mỗi lỗi sửa bằng đúng một dòng cấu hình.

## Câu hỏi cho bài sau

Người dùng vẫn phải gõ địa chỉ IP, và trình duyệt báo "không an toàn". Làm sao có tên miền và ổ khoá HTTPS tự gia hạn? [Bài 20](../20-ten-mien-va-https/) trả lời câu này.

## Cần đã học trước

- [Bài 18 · Deploy thủ công bằng Compose lên server](../18-deploy-thu-cong/)

## Khái niệm sẽ gặp

- Vì sao cần Nginx khi Spring Boot đã tự chạy được web server
- Reverse proxy và forward proxy
- Nginx trong Compose: server block, listen, location, proxy_pass
- Header X-Forwarded-For, X-Forwarded-Proto và IP thật của client
- proxy_read_timeout (504), client_max_body_size (413), upstream chết (502)
- Chỉ lộ cổng 80/443, giấu cổng của app và database
- nginx -t và reload

## Bài lab

Thêm Nginx vào Compose trên server. Cố tình tắt app để gặp 502, làm API chậm để gặp 504, upload tệp lớn để gặp 413, rồi sửa từng lỗi bằng cấu hình.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Viết được server block chuyển request vào Spring Boot
- [ ] Nhìn một mã lỗi là biết Nginx hay app viết ra (nối Bài 02)
- [ ] Sửa được lỗi 413 và 504 bằng đúng dòng cấu hình
- [ ] Giải thích được vì sao app cần X-Forwarded-For

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
