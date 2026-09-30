# Bài 32 — Helm, Job và CronJob

<img src="../../assets/readme/glyph/32.svg" width="132" align="right" alt="Ấn ký của Bài 32">

> **Module M4** · Kubernetes — Chạy container trên cả một cụm máy
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Đóng gói bộ manifest thành một chart dùng lại cho nhiều môi trường, và chạy tác vụ một lần hoặc theo lịch.

## Cần đã học trước

- [Bài 29 · Dữ liệu trong Kubernetes: PVC và StatefulSet](../29-du-lieu-trong-kubernetes/)
- [Bài 31 · Gỡ lỗi pod](../31-go-loi-pod/)

## Khái niệm sẽ gặp

- Vấn đề lặp manifest giữa các môi trường
- Helm chart, values, template, release
- helm install, upgrade, rollback
- Cài phần mềm có sẵn bằng chart
- Job: tác vụ chạy một lần, như một đợt kiểm thử tải
- CronJob: tác vụ theo lịch, như backup

## Bài lab

Chuyển manifest của app thành Helm chart có values riêng cho dev và prod. Viết CronJob backup PostgreSQL. Cố tình đặt sai một value để helm upgrade hỏng, rồi helm rollback.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Viết được Helm chart cho app của mình
- [ ] Deploy cùng một chart lên hai môi trường khác cấu hình
- [ ] Rollback được một release
- [ ] Viết được CronJob chạy theo lịch

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
