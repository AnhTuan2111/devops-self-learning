# Bài 24 — Build và push image lên GitLab Container Registry

<img src="../../assets/readme/glyph/24.svg" width="132" align="right" alt="Ấn ký của Bài 24">

> **Module M3** · CI/CD với GitLab — Từ git push tới server
> Ước lượng: 4–6 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 23](../23-ci-spring-boot/) kết luận: Job build và test bằng Maven, có cache và có PostgreSQL cho integration test, chạy trên mọi merge request; pipeline đỏ thì không merge được.

## Câu hỏi của bài

**Code đã được kiểm tra tự động. Làm sao mỗi commit tốt tự sinh ra một image có phiên bản rõ ràng, sẵn sàng deploy?**

## Bài này dẫn tới

Pipeline build image và push lên GitLab Container Registry với tag theo SHA của commit, không dùng latest.

## Câu hỏi cho bài sau

Mỗi commit đã có image riêng. Làm sao server tự cập nhật sau mỗi lần merge, và quay về bản cũ thật nhanh khi bản mới hỏng? [Bài 25](../25-cd-va-rollback/) trả lời câu này.

## Cần đã học trước

- [Bài 09 · Dockerfile chuẩn production: nhỏ, không root, không bị giết vì hết bộ nhớ](../09-dockerfile-production/)
- [Bài 23 · CI cho Spring Boot: build, test, cache](../23-ci-spring-boot/)

## Khái niệm sẽ gặp

- GitLab Container Registry
- Build image trong CI: Docker-in-Docker, hoặc công cụ không cần daemon như Kaniko, Buildah
- Chiến lược tag: SHA commit, semver; vì sao tránh latest (nối Bài 07)
- Đăng nhập registry bằng token của job
- Quét lỗ hổng image

## Bài lab

Pipeline build image Spring Boot và push lên registry với tag theo SHA commit. Cố tình dùng sai thông tin đăng nhập registry để gặp lỗi "unauthorized", rồi sửa.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Mỗi commit trên nhánh chính có một image tương ứng trong registry
- [ ] Giải thích được vì sao tag theo SHA an toàn hơn latest
- [ ] Đọc được kết quả quét lỗ hổng của một image

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
