# Bài 29 — Dữ liệu trong Kubernetes: PVC và StatefulSet

<img src="../../assets/readme/glyph/29.svg" width="132" align="right" alt="Ấn ký của Bài 29">

> **Module M4** · Kubernetes — Chạy container trên cả một cụm máy
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Chạy PostgreSQL trong cụm mà không mất dữ liệu khi pod bị thay, và biết khi nào không nên làm vậy.

## Cần đã học trước

- [Bài 09 · Dữ liệu: volume, PostgreSQL và backup](../09-volume-va-du-lieu/)
- [Bài 28 · Probe và giới hạn tài nguyên](../28-probe-va-tai-nguyen/)

## Khái niệm sẽ gặp

- Ổ đĩa trong pod là tạm thời
- PersistentVolume, PersistentVolumeClaim, StorageClass
- StatefulSet: tên ổn định, ổ đĩa riêng cho từng bản sao
- Backup database chạy trong cụm
- Database trong cụm hay dịch vụ bên ngoài: đánh đổi

## Bài lab

Chạy PostgreSQL bằng StatefulSet có PVC, xoá pod để chứng minh dữ liệu còn. Cố tình dùng Deployment không có PVC để thấy dữ liệu mất. Backup và khôi phục.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích được PVC khác volume của Docker ở đâu (nối Bài 09)
- [ ] Nói được vì sao database dùng StatefulSet chứ không dùng Deployment
- [ ] Khôi phục được database trong cụm từ backup
- [ ] Kể được một lý do nên và một lý do không nên chạy database trong cụm

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
