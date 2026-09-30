# Bài 22 — Build và push image lên GitLab Container Registry

<img src="../../assets/readme/glyph/22.svg" width="132" align="right" alt="Ấn ký của Bài 22">

> **Module M3** · CI/CD với GitLab — Từ git push tới server
> Ước lượng: 4–6 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Mỗi commit trên nhánh chính sinh ra một image có phiên bản rõ ràng, sẵn sàng deploy.

## Cần đã học trước

- [Bài 07 · Dockerfile chuẩn production: nhỏ, không root, không bị giết vì hết bộ nhớ](../07-dockerfile-production/)
- [Bài 21 · CI cho Spring Boot: build, test, cache](../21-ci-spring-boot/)

## Khái niệm sẽ gặp

- GitLab Container Registry
- Build image trong CI: Docker-in-Docker, hoặc công cụ không cần daemon như Kaniko, Buildah
- Chiến lược tag: SHA commit, semver; vì sao tránh latest (nối Bài 05)
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
