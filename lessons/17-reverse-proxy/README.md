# Bài 17 — Reverse proxy đứng trước ứng dụng

<img src="../../assets/readme/glyph/17.svg" width="132" align="right" alt="Ấn ký của Bài 17">

> **Module M2** · Server thật — Deploy lên một máy Linux thật
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Đặt Nginx trước Spring Boot, và phân biệt được lỗi 502, 504, 413 do đâu mà ra.

## Cần đã học trước

- [Bài 16 · Deploy thủ công bằng Compose lên server](../16-deploy-thu-cong/)

## Khái niệm sẽ gặp

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
- [ ] Nhìn một mã lỗi là biết Nginx hay app viết ra (nối Bài 00)
- [ ] Sửa được lỗi 413 và 504 bằng đúng dòng cấu hình
- [ ] Giải thích được vì sao app cần X-Forwarded-For

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
