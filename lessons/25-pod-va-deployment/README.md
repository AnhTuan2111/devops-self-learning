# Bài 25 — Pod và Deployment

<img src="../../assets/readme/glyph/25.svg" width="132" align="right" alt="Ấn ký của Bài 25">

> **Module M4** · Kubernetes — Chạy container trên cả một cụm máy
> Ước lượng: 4–6 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Chạy Spring Boot trên Kubernetes bằng Deployment, cập nhật phiên bản không gián đoạn, và quay lại khi hỏng.

## Cần đã học trước

- [Bài 12 · Container sống và chết thế nào: signal, restart, log](../12-vong-doi-container/)
- [Bài 22 · Build và push image lên GitLab Container Registry](../22-build-va-push-image/)
- [Bài 24 · Vì sao cần Kubernetes, và dựng một cụm nhỏ trên máy](../24-vi-sao-kubernetes/)

## Khái niệm sẽ gặp

- Pod: một hoặc vài container chạy chung (nối Bài 03)
- Manifest YAML: apiVersion, kind, metadata, spec
- Deployment và ReplicaSet: luôn giữ đủ số bản sao
- Rolling update và kubectl rollout undo
- kubectl apply, get, describe, logs
- restartPolicy (nối Bài 12)

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
