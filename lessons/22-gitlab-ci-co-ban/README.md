# Bài 22 — GitLab CI cơ bản

<img src="../../assets/readme/glyph/22.svg" width="132" align="right" alt="Ấn ký của Bài 22">

> **Module M3** · CI/CD với GitLab — Từ git push tới server
> Ước lượng: 4–6 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 21](../21-cicd-la-quy-trinh/) kết luận: Một pipeline gồm build, test, đóng gói, deploy. Bước nào lặp lại và kiểm tra được thì tự động hoá, bước nào rủi ro thì có người duyệt.

## Câu hỏi của bài

**Đã vẽ được pipeline trên giấy. Viết nó ra thế nào để GitLab tự chạy mỗi lần push?**

## Bài này dẫn tới

Bằng tệp .gitlab-ci.yml gồm các stage và job. Runner chạy từng job trong một image, còn biến CI giữ secret ngoài code và ngoài log.

## Câu hỏi cho bài sau

Pipeline đã chạy. Làm sao nó chặn được một commit làm gãy build hay gãy test trước khi được merge? [Bài 23](../23-ci-spring-boot/) trả lời câu này.

## Cần đã học trước

- [Bài 21 · CI/CD là quy trình, không phải công cụ](../21-cicd-la-quy-trinh/)

## Khái niệm sẽ gặp

- .gitlab-ci.yml: stages, jobs, script
- Runner: ai thật sự chạy job, và job chạy trong image nào
- rules: khi nào một job chạy
- Biến CI/CD; biến được bảo vệ và được che trong log
- Artifact truyền giữa các job
- Đọc log của một pipeline hỏng

## Bài lab

Tạo project GitLab và viết pipeline hai stage. Cố tình viết sai YAML và làm một job thất bại để đọc log, rồi sửa.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Viết được .gitlab-ci.yml có nhiều stage
- [ ] Giải thích được runner là gì và job chạy ở đâu
- [ ] Giấu được một secret khỏi log của pipeline
- [ ] Tìm ra nguyên nhân một job thất bại từ log

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
