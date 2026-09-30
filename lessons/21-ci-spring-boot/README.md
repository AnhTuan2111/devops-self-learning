# Bài 21 — CI cho Spring Boot: build, test, cache

<img src="../../assets/readme/glyph/21.svg" width="132" align="right" alt="Ấn ký của Bài 21">

> **Module M3** · CI/CD với GitLab — Từ git push tới server
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Không merge một commit làm hỏng build hay gãy test.

## Cần đã học trước

- [Bài 11 · Docker Compose: cả hệ thống trong một file](../11-docker-compose/)
- [Bài 20 · GitLab CI cơ bản](../20-gitlab-ci-co-ban/)

## Khái niệm sẽ gặp

- Job Maven/Gradle trong image JDK
- Cache dependency giữa các lần chạy
- services: PostgreSQL cho integration test
- Merge request pipeline: pipeline phải xanh mới được merge
- Báo cáo test hiện trong GitLab

## Bài lab

Pipeline chạy mvn verify trên mọi merge request, có cache, có PostgreSQL. Cố tình đẩy một test gãy để thấy merge request bị chặn.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Pipeline của bạn chạy test trên mọi merge request
- [ ] Giải thích được cache giúp gì và khi nào cache làm sai
- [ ] Chạy được integration test với PostgreSQL trong pipeline
- [ ] Chặn được việc merge khi pipeline đỏ

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
