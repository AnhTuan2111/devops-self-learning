# Bài 27 — ConfigMap và Secret

<img src="../../assets/readme/glyph/27.svg" width="132" align="right" alt="Ấn ký của Bài 27">

> **Module M4** · Kubernetes — Chạy container trên cả một cụm máy
> Ước lượng: 3–5 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Tách cấu hình khỏi manifest, và biết Secret của Kubernetes bảo vệ được tới đâu.

## Cần đã học trước

- [Bài 08 · Cấu hình và secret: một image, nhiều môi trường](../08-cau-hinh-va-secret/)
- [Bài 26 · Service và DNS trong cụm](../26-service-va-dns-trong-cum/)

## Khái niệm sẽ gặp

- ConfigMap: cấu hình dạng biến môi trường hoặc tệp
- Secret: base64 không phải là mã hoá
- Nạp vào pod: env, envFrom, volume
- Đổi cấu hình thì pod có tự nhận không
- Không commit Secret vào Git; các cách quản lý secret an toàn

## Bài lab

Chuyển cấu hình Spring Boot sang ConfigMap và Secret. Cố tình tham chiếu một key không tồn tại để pod kẹt ở CreateContainerConfigError, rồi sửa.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Đưa được cấu hình vào pod bằng ConfigMap
- [ ] Giải thích được vì sao Secret không tự động an toàn
- [ ] Biết đổi ConfigMap xong phải làm gì để pod nhận
- [ ] Đọc được lỗi CreateContainerConfigError

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
