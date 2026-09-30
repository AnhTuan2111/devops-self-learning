# Bài 23 — Deploy tự động và rollback

<img src="../../assets/readme/glyph/23.svg" width="132" align="right" alt="Ấn ký của Bài 23">

> **Module M3** · CI/CD với GitLab — Từ git push tới server
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

git push là server tự cập nhật, và quay về bản cũ trong dưới một phút.

## Cần đã học trước

- [Bài 17 · Reverse proxy đứng trước ứng dụng](../17-reverse-proxy/)
- [Bài 22 · Build và push image lên GitLab Container Registry](../22-build-va-push-image/)

## Khái niệm sẽ gặp

- Deploy từ pipeline qua SSH: khóa riêng cho CI (nối Bài 14)
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
