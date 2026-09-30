# Bài 34 — Deploy lên cụm từ GitLab, và GitOps

<img src="../../assets/readme/glyph/34.svg" width="132" align="right" alt="Ấn ký của Bài 34">

> **Module M5** · Rancher và vận hành — Quản lý cụm, theo dõi, xử lý sự cố
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

git push là service trên cụm tự cập nhật, qua pipeline hoặc qua GitOps.

## Cần đã học trước

- [Bài 23 · Deploy tự động và rollback](../23-cd-va-rollback/)
- [Bài 33 · Rancher: quản lý cụm qua một giao diện](../33-rancher/)

## Khái niệm sẽ gặp

- Deploy từ pipeline bằng kubectl hoặc helm với quyền hạn chế
- ServiceAccount và kubeconfig riêng cho CI
- GitOps: cụm tự đồng bộ theo nội dung Git
- Fleet của Rancher
- Rollback trên cụm: helm rollback hoặc git revert
- Vì sao không nên kubectl apply bằng tay lên production

## Bài lab

Pipeline GitLab deploy Helm chart lên cụm học; sau đó chuyển sang Fleet. Cố tình sửa tay một thứ trên cụm để thấy GitOps ghi đè lại theo Git.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Pipeline deploy lên cụm với quyền tối thiểu
- [ ] Giải thích được GitOps khác deploy bằng pipeline ở đâu
- [ ] Rollback được một lần deploy trên cụm
- [ ] Nói được vì sao sửa tay trên cụm là nguồn gốc của sự cố

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
