# Bài 30 — Ingress và HTTPS trong cụm

<img src="../../assets/readme/glyph/30.svg" width="132" align="right" alt="Ấn ký của Bài 30">

> **Module M4** · Kubernetes — Chạy container trên cả một cụm máy
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Đưa service ra ngoài cụm bằng tên miền và HTTPS, chứng chỉ tự gia hạn.

## Cần đã học trước

- [Bài 18 · Tên miền và HTTPS](../18-ten-mien-va-https/)
- [Bài 26 · Service và DNS trong cụm](../26-service-va-dns-trong-cum/)

## Khái niệm sẽ gặp

- Ingress và Ingress controller (nối Nginx ở Bài 17)
- Luật theo host và theo path
- Annotation: timeout, kích thước body — 413 và 504 lần nữa
- cert-manager: tự cấp và tự gia hạn chứng chỉ (nối Bài 18)
- Gateway API: thế hệ sau của Ingress

## Bài lab

Cài Ingress controller và cert-manager trên cụm học, cấu hình Ingress có HTTPS. Cố tình trỏ Ingress vào một tên Service sai để gặp 503, rồi sửa.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Viết được Ingress đưa một service ra ngoài theo tên miền
- [ ] Giải thích được Ingress controller làm việc giống Nginx ở Bài 17 thế nào
- [ ] Chứng chỉ trong cụm tự gia hạn
- [ ] Chẩn đoán được lỗi 503 từ Ingress

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
