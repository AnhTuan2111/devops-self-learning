# Bài 33 — Gỡ lỗi pod

<img src="../../assets/readme/glyph/33.svg" width="132" align="right" alt="Ấn ký của Bài 33">

> **Module M4** · Kubernetes — Chạy container trên cả một cụm máy
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 32](../32-ingress-va-https/) kết luận: Ingress khai báo luật theo host và path, Ingress controller (một Nginx chạy trong cụm) thực thi luật đó, còn cert-manager tự cấp và tự gia hạn chứng chỉ.

## Câu hỏi của bài

**Pod kẹt ở Pending, CrashLoopBackOff hay ImagePullBackOff. Đọc gì, ở đâu để biết nguyên nhân?**

## Bài này dẫn tới

describe và events cho biết cụm đã cố làm gì, logs --previous cho biết app nói gì trước khi chết. Mỗi trạng thái trỏ về một nhóm nguyên nhân.

## Câu hỏi cho bài sau

Bộ manifest đã lớn và lặp lại cho mỗi môi trường, lại còn những việc chạy một lần hay theo lịch như backup. Quản lý chúng thế nào? [Bài 34](../34-helm-job-cronjob/) trả lời câu này.

## Cần đã học trước

- [Bài 30 · Probe và giới hạn tài nguyên](../30-probe-va-tai-nguyen/)
- [Bài 31 · Dữ liệu trong Kubernetes: PVC và StatefulSet](../31-du-lieu-trong-kubernetes/)
- [Bài 32 · Ingress và HTTPS trong cụm](../32-ingress-va-https/)

## Khái niệm sẽ gặp

- kubectl describe và events: đọc từ dưới lên
- kubectl logs --previous
- kubectl exec và container gỡ lỗi tạm thời
- Pending: thiếu tài nguyên, hay không có node phù hợp
- CrashLoopBackOff, ImagePullBackOff, CreateContainerConfigError, OOMKilled
- Bảng triệu chứng dẫn tới nguyên nhân cho Kubernetes (nối Bài 15)

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
