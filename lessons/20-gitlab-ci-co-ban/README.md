# Bài 20 — GitLab CI cơ bản

<img src="../../assets/readme/glyph/20.svg" width="132" align="right" alt="Ấn ký của Bài 20">

> **Module M3** · CI/CD với GitLab — Từ git push tới server
> Ước lượng: 4–6 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Pipeline đầu tiên trên GitLab: mỗi lần push, code tự được kiểm tra.

## Cần đã học trước

- [Bài 19 · CI/CD là quy trình, không phải công cụ](../19-cicd-la-quy-trinh/)

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
