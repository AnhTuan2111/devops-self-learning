# Bài 25 — Deploy tự động và rollback

<img src="../../assets/readme/glyph/25.svg" width="132" align="right" alt="Ấn ký của Bài 25">

> **Module M3** · CI/CD với GitLab — Từ git push tới server
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 24](../24-build-va-push-image/) kết luận: Pipeline build image và push lên GitLab Container Registry với tag theo SHA của commit, không dùng latest.

## Câu hỏi của bài

**Mỗi commit đã có image riêng. Làm sao server tự cập nhật sau mỗi lần merge, và quay về bản cũ thật nhanh khi bản mới hỏng?**

## Bài này dẫn tới

Pipeline SSH vào server chạy một script deploy chạy lại nhiều lần vẫn an toàn (compose pull, up -d). Rollback là deploy lại tag cũ, với điều kiện migration database tương thích ngược.

## Câu hỏi cho bài sau

Mọi thứ đang chạy trên một server. Server đó chết thì sao, và khi một máy không còn đủ sức thì làm gì? [Bài 26](../26-vi-sao-kubernetes/) trả lời câu này.

## Cần đã học trước

- [Bài 19 · Reverse proxy đứng trước ứng dụng](../19-reverse-proxy/)
- [Bài 24 · Build và push image lên GitLab Container Registry](../24-build-va-push-image/)

## Khái niệm sẽ gặp

- Deploy từ pipeline qua SSH: khóa riêng cho CI (nối Bài 16)
- Script deploy chạy lại nhiều lần vẫn an toàn (idempotent)
- docker compose pull và up -d
- Environments và bước duyệt tay trước production
- Rollback bằng tag image cũ
- Migration database tương thích ngược

## Bài lab

Pipeline deploy lên server sau mỗi lần merge. Cố tình deploy một bản lỗi rồi rollback về tag trước, đo thời gian từ lúc phát hiện tới lúc hệ thống lành.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Deploy lên server không cần SSH tay
- [ ] Rollback được trong dưới một phút
- [ ] Giải thích được vì sao script deploy phải idempotent
- [ ] Nói được vì sao migration phải tương thích ngược thì mới rollback được

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
