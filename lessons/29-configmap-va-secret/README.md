# Bài 29 — ConfigMap và Secret

<img src="../../assets/readme/glyph/29.svg" width="132" align="right" alt="Ấn ký của Bài 29">

> **Module M4** · Kubernetes — Chạy container trên cả một cụm máy
> Ước lượng: 3–5 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 28](../28-service-va-dns-trong-cum/) kết luận: Bằng Service: một tên và một địa chỉ ổn định, chọn pod theo label. DNS của cụm phân giải tên Service, giống DNS nội bộ của Docker ở Bài 12.

## Câu hỏi của bài

**Cấu hình và mật khẩu đang nằm cứng trong manifest. Đưa chúng vào pod bằng cách nào cho tách bạch và an toàn?**

## Bài này dẫn tới

ConfigMap cho cấu hình, Secret cho dữ liệu nhạy cảm, nạp vào pod qua biến môi trường hoặc tệp. Và base64 của Secret không phải là mã hoá.

## Câu hỏi cho bài sau

Pod báo Running mà người dùng vẫn gặp lỗi, hoặc pod bị khởi động lại liên tục. Làm sao cụm biết app đã sẵn sàng thật, và cấp bao nhiêu tài nguyên là đủ? [Bài 30](../30-probe-va-tai-nguyen/) trả lời câu này.

## Cần đã học trước

- [Bài 10 · Cấu hình và secret: một image, nhiều môi trường](../10-cau-hinh-va-secret/)
- [Bài 28 · Service và DNS trong cụm](../28-service-va-dns-trong-cum/)

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
