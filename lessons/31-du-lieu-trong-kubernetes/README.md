# Bài 31 — Dữ liệu trong Kubernetes: PVC và StatefulSet

<img src="../../assets/readme/glyph/31.svg" width="132" align="right" alt="Ấn ký của Bài 31">

> **Module M4** · Kubernetes — Chạy container trên cả một cụm máy
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 30](../30-probe-va-tai-nguyen/) kết luận: Probe cho cụm biết app đã khởi động xong, đã sẵn sàng hay đã treo. Requests và limits đặt đúng thì app không bị bóp CPU tới mức chết đứng, cũng không bị OOMKilled.

## Câu hỏi của bài

**Pod PostgreSQL bị thay là mất dữ liệu. Trong một cụm nhiều máy, dữ liệu sống ở đâu?**

## Bài này dẫn tới

Trong PersistentVolume, xin qua PVC và gắn với StatefulSet để mỗi bản sao giữ đúng ổ đĩa của mình. Nhiều khi database nên nằm ngoài cụm.

## Câu hỏi cho bài sau

Service mới gọi được từ trong cụm. Đưa app ra ngoài bằng tên miền và HTTPS thì làm thế nào? [Bài 32](../32-ingress-va-https/) trả lời câu này.

## Cần đã học trước

- [Bài 11 · Dữ liệu: volume, PostgreSQL và backup](../11-volume-va-du-lieu/)
- [Bài 30 · Probe và giới hạn tài nguyên](../30-probe-va-tai-nguyen/)

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

- [ ] Giải thích được PVC khác volume của Docker ở đâu (nối Bài 11)
- [ ] Nói được vì sao database dùng StatefulSet chứ không dùng Deployment
- [ ] Khôi phục được database trong cụm từ backup
- [ ] Kể được một lý do nên và một lý do không nên chạy database trong cụm

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
