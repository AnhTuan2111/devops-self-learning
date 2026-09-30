# Bài 31 — Gỡ lỗi pod

<img src="../../assets/readme/glyph/31.svg" width="132" align="right" alt="Ấn ký của Bài 31">

> **Module M4** · Kubernetes — Chạy container trên cả một cụm máy
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Chẩn đoán có hệ thống mọi kiểu pod hỏng: Pending, CrashLoopBackOff, ImagePullBackOff, OOMKilled.

## Cần đã học trước

- [Bài 28 · Probe và giới hạn tài nguyên](../28-probe-va-tai-nguyen/)
- [Bài 29 · Dữ liệu trong Kubernetes: PVC và StatefulSet](../29-du-lieu-trong-kubernetes/)
- [Bài 30 · Ingress và HTTPS trong cụm](../30-ingress-va-https/)

## Khái niệm sẽ gặp

- kubectl describe và events: đọc từ dưới lên
- kubectl logs --previous
- kubectl exec và container gỡ lỗi tạm thời
- Pending: thiếu tài nguyên, hay không có node phù hợp
- CrashLoopBackOff, ImagePullBackOff, CreateContainerConfigError, OOMKilled
- Bảng triệu chứng dẫn tới nguyên nhân cho Kubernetes (nối Bài 13)

## Bài lab

Tự gây sáu kiểu pod hỏng, trộn thứ tự rồi chẩn đoán từng cái chỉ bằng kubectl, ghi vào bảng triệu chứng.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Có một thứ tự lệnh cố định để chẩn đoán pod hỏng
- [ ] Đọc được events để biết vì sao pod Pending
- [ ] Xem được log của lần chạy trước khi pod đã khởi động lại
- [ ] Phân biệt được năm trạng thái lỗi phổ biến nhất

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
