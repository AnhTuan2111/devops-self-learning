# Bài 33 — Rancher: quản lý cụm qua một giao diện

<img src="../../assets/readme/glyph/33.svg" width="132" align="right" alt="Ấn ký của Bài 33">

> **Module M5** · Rancher và vận hành — Quản lý cụm, theo dõi, xử lý sự cố
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Hiểu Rancher đứng ở đâu so với Kubernetes, và đọc được mọi thứ trên giao diện Rancher bằng ngôn ngữ kubectl.

## Cần đã học trước

- [Bài 32 · Helm, Job và CronJob](../32-helm-job-cronjob/)

## Khái niệm sẽ gặp

- Rancher là lớp quản lý nhiều cụm, không phải một loại Kubernetes
- RKE2 và k3s: các bản Kubernetes của Rancher
- Project, namespace và phân quyền (RBAC)
- Mỗi nút bấm trên Rancher là một lời gọi API Kubernetes
- Xem workload, log, event trên giao diện
- Lấy kubeconfig từ Rancher

## Bài lab

Chạy Rancher bản học trên máy, import cụm k3d, đối chiếu từng màn hình với lệnh kubectl tương ứng. Cố tình dùng một tài khoản ít quyền để thấy RBAC chặn, rồi cấp đúng quyền.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích được Rancher khác Kubernetes ở đâu
- [ ] Tìm được log và event của một pod trên Rancher
- [ ] Nói được một thao tác trên Rancher tương ứng với lệnh kubectl nào
- [ ] Giải thích được project và namespace trong Rancher

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
