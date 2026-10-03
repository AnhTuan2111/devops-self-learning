# Bài 21 — CI/CD là quy trình, không phải công cụ

<img src="../../assets/readme/glyph/21.svg" width="132" align="right" alt="Ấn ký của Bài 21">

> **Module M3** · CI/CD với GitLab — Từ git push tới server
> Ước lượng: 2–4 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 20](../20-ten-mien-va-https/) kết luận: Trỏ bản ghi DNS về server, xin chứng chỉ từ một CA bằng cách chứng minh quyền sở hữu tên miền, cho Nginx dùng chứng chỉ đó, và kiểm chứng rằng việc gia hạn thật sự chạy.

## Câu hỏi của bài

**Deploy bằng tay theo runbook vừa chậm vừa dễ sót bước. Bước nào nên giao cho máy làm, và theo thứ tự nào?**

## Bài này dẫn tới

Một pipeline gồm build, test, đóng gói, deploy. Bước nào lặp lại và kiểm tra được thì tự động hoá, bước nào rủi ro thì có người duyệt.

## Câu hỏi cho bài sau

Đã vẽ được pipeline trên giấy. Viết nó ra thế nào để GitLab tự chạy mỗi lần push? [Bài 22](../22-gitlab-ci-co-ban/) trả lời câu này.

## Cần đã học trước

- [Bài 18 · Deploy thủ công bằng Compose lên server](../18-deploy-thu-cong/)

## Khái niệm sẽ gặp

- CI, CD và Continuous Deployment
- Build, test, package, deploy
- Artifact và registry
- Môi trường dev, staging, production
- Pipeline chậm là pipeline vô dụng

## Bài lab

Chuyển runbook của Bài 18 thành sơ đồ pipeline từng bước, đánh dấu bước nào tự động được và bước nào cần người duyệt. Cố tình bỏ một bước trong runbook khi deploy tay để thấy vì sao con người là mắt xích dễ gãy nhất.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Phân biệt được CI, Continuous Delivery và Continuous Deployment
- [ ] Vẽ được pipeline cho project của mình
- [ ] Chỉ ra được bước nào trong runbook dễ sai nhất khi làm tay

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
