# Bài 33 — Build và push Docker image lên registry

> **Module M6** · CI/CD — Tự động hóa toàn bộ
> Ước lượng: ~65 phút · Trạng thái: `todo`

## Mục tiêu

Mỗi commit trên main sinh ra một image có phiên bản rõ ràng, sẵn sàng deploy.

## Khái niệm sẽ gặp

- GHCR vs Docker Hub
- docker/build-push-action
- Buildx và cache layer trên CI
- Chiến lược tag: latest, sha, semver
- Đăng nhập registry bằng token
- Quét lỗ hổng image

## Bài lab

Workflow build image Spring Boot và push lên GitHub Container Registry với tag theo commit SHA.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Pull được image đó về máy và chạy
- [ ] Mỗi image truy ngược được về đúng commit
- [ ] Build trên CI có dùng cache

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
