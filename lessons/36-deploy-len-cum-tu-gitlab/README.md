# Bài 36 — Deploy lên cụm từ GitLab, và GitOps

<img src="../../assets/readme/glyph/36.svg" width="132" align="right" alt="Ấn ký của Bài 36">

> **Module M5** · Rancher và vận hành — Quản lý cụm, theo dõi, xử lý sự cố
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 35](../35-rancher/) kết luận: Rancher là lớp quản lý nhiều cụm: mỗi màn hình là một lời gọi API Kubernetes, và RBAC chia quyền theo project và namespace.

## Câu hỏi của bài

**Đang deploy lên cụm bằng tay qua Rancher hoặc kubectl. Làm sao git push là cụm tự cập nhật, và không ai sửa tay được nữa?**

## Bài này dẫn tới

Pipeline deploy bằng helm với quyền tối thiểu, hoặc GitOps với Fleet: cụm tự đồng bộ theo Git và ghi đè mọi thay đổi tay.

## Câu hỏi cho bài sau

Hệ thống đã tự deploy. Làm sao biết nó đang khoẻ hay đang yếu dần, trước khi người dùng gặp lỗi? [Bài 37](../37-metric-va-dashboard/) trả lời câu này.

## Cần đã học trước

- [Bài 25 · Deploy tự động và rollback](../25-cd-va-rollback/)
- [Bài 35 · Rancher: quản lý cụm qua một giao diện](../35-rancher/)

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
