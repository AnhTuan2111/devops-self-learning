# Bài 27 — Pod và Deployment

<img src="../../assets/readme/glyph/27.svg" width="132" align="right" alt="Ấn ký của Bài 27">

> **Module M4** · Kubernetes — Chạy container trên cả một cụm máy
> Ước lượng: 4–6 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 26](../26-vi-sao-kubernetes/) kết luận: Kubernetes điều khiển nhiều máy như một cụm, liên tục đưa trạng thái thật về trạng thái mong muốn. Đổi lại là chi phí vận hành lớn hơn hẳn Compose.

## Câu hỏi của bài

**Đã có một cụm. Chạy app Spring Boot lên đó bằng gì, và vì sao pod bị xoá lại tự sinh ra?**

## Bài này dẫn tới

Bằng Deployment: nó giữ đủ số bản sao pod, tự thay pod chết, cập nhật dần từng bản và quay lại được khi bản mới hỏng.

## Câu hỏi cho bài sau

Pod liên tục bị thay, và mỗi lần thay lại đổi địa chỉ IP. Vậy app gọi PostgreSQL, và người ngoài gọi app, bằng địa chỉ nào? [Bài 28](../28-service-va-dns-trong-cum/) trả lời câu này.

## Cần đã học trước

- [Bài 14 · Container sống và chết thế nào: signal, restart, log](../14-vong-doi-container/)
- [Bài 24 · Build và push image lên GitLab Container Registry](../24-build-va-push-image/)
- [Bài 26 · Vì sao cần Kubernetes, và dựng một cụm nhỏ trên máy](../26-vi-sao-kubernetes/)

## Khái niệm sẽ gặp

- Pod: một hoặc vài container chạy chung (nối Bài 05)
- Manifest YAML: apiVersion, kind, metadata, spec
- Deployment và ReplicaSet: luôn giữ đủ số bản sao
- Rolling update và kubectl rollout undo
- kubectl apply, get, describe, logs
- restartPolicy (nối Bài 14)

## Bài lab

Deploy image Spring Boot bằng một Deployment 3 bản sao, xoá một pod để thấy nó tự sinh lại, rồi cập nhật phiên bản. Cố tình đặt sai tag image để gặp ImagePullBackOff, rồi rollout undo.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Viết được manifest Deployment cho app của mình
- [ ] Giải thích được vì sao pod bị xoá lại tự sinh ra
- [ ] Cập nhật phiên bản và quay lại được
- [ ] Đọc được trạng thái ImagePullBackOff nói lên điều gì

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
