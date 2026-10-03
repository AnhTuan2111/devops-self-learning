# Bài 23 — CI cho Spring Boot: build, test, cache

<img src="../../assets/readme/glyph/23.svg" width="132" align="right" alt="Ấn ký của Bài 23">

> **Module M3** · CI/CD với GitLab — Từ git push tới server
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 22](../22-gitlab-ci-co-ban/) kết luận: Bằng tệp .gitlab-ci.yml gồm các stage và job. Runner chạy từng job trong một image, còn biến CI giữ secret ngoài code và ngoài log.

## Câu hỏi của bài

**Pipeline đã chạy. Làm sao nó chặn được một commit làm gãy build hay gãy test trước khi được merge?**

## Bài này dẫn tới

Job build và test bằng Maven, có cache và có PostgreSQL cho integration test, chạy trên mọi merge request; pipeline đỏ thì không merge được.

## Câu hỏi cho bài sau

Code đã được kiểm tra tự động. Làm sao mỗi commit tốt tự sinh ra một image có phiên bản rõ ràng, sẵn sàng deploy? [Bài 24](../24-build-va-push-image/) trả lời câu này.

## Cần đã học trước

- [Bài 13 · Docker Compose: cả hệ thống trong một file](../13-docker-compose/)
- [Bài 22 · GitLab CI cơ bản](../22-gitlab-ci-co-ban/)

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
