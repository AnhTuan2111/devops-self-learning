# Bài 32 — CI cho Spring Boot: build, test, cache

> **Module M6** · CI/CD — Tự động hóa toàn bộ
> Ước lượng: ~65 phút · Trạng thái: `todo`

## Mục tiêu

Không bao giờ merge một commit làm hỏng build hoặc gãy test.

## Khái niệm sẽ gặp

- setup-java action
- Cache Maven/Gradle
- Chạy test tự động
- Service container cho integration test
- Branch protection, required check
- Test report và coverage

## Bài lab

Workflow chạy `mvn verify` trên mọi pull request, có cache, có PostgreSQL service container.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] PR đỏ thì không merge được
- [ ] Build lần 2 nhanh hơn hẳn nhờ cache
- [ ] Integration test chạy với DB thật trong CI

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
