# Bài 26 — Service và DNS trong cụm

<img src="../../assets/readme/glyph/26.svg" width="132" align="right" alt="Ấn ký của Bài 26">

> **Module M4** · Kubernetes — Chạy container trên cả một cụm máy
> Ước lượng: 4–6 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Các pod gọi nhau ổn định bằng tên, dù pod liên tục bị thay.

## Cần đã học trước

- [Bài 10 · Docker network: container gọi nhau bằng tên](../10-docker-network/)
- [Bài 25 · Pod và Deployment](../25-pod-va-deployment/)

## Khái niệm sẽ gặp

- Vì sao không gọi thẳng IP của pod
- Service: ClusterIP, NodePort, LoadBalancer
- Label và selector
- DNS trong cụm: tên-service.namespace.svc (nối Bài 10)
- kubectl port-forward
- Namespace

## Bài lab

Tạo Service cho app và cho PostgreSQL, cho chúng gọi nhau bằng tên. Cố tình để selector lệch label để Service không có endpoint nào, chẩn đoán và sửa.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích được vì sao cần Service thay vì IP của pod
- [ ] Chọn đúng loại Service cho từng việc
- [ ] Chẩn đoán được Service không có endpoint
- [ ] Gọi được một service trong cụm từ máy mình bằng port-forward

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
