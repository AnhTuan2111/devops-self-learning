# Bài 07 — Image và registry: image được làm từ những lớp nào

<img src="../../assets/readme/glyph/07.svg" width="132" align="right" alt="Ấn ký của Bài 07">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 3–5 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 06](../06-port-va-publish/) kết luận: Phải publish port bằng -p cổng_máy:cổng_container, và app trong container phải listen 0.0.0.0: đúng ba điều kiện của Bài 01, áp vào một mạng mới.

## Câu hỏi của bài

**Container chạy từ image. Image là gì, lấy về từ đâu, và vì sao tải image thứ hai lại nhanh hơn image đầu?**

## Bài này dẫn tới

Image là một chồng layer chỉ đọc, tải về từ registry theo tên và tag. Layer giống nhau được dùng chung, còn chỉ digest mới định danh chắc chắn một image.

## Câu hỏi cho bài sau

Tới giờ ta toàn chạy image người khác làm sẵn. Làm sao tự đóng gói chính app Spring Boot của mình thành image? [Bài 08](../08-dockerfile-dau-tien/) trả lời câu này.

## Cần đã học trước

- [Bài 05 · Container đầu tiên: nó chỉ là một process bị cô lập](../05-container-dau-tien/)

## Khái niệm sẽ gặp

- Layer: image là một chồng các lớp chỉ đọc
- Registry, repository, tag; Docker Hub
- Tag latest và vì sao không nên tin nó
- Digest: định danh không bao giờ đổi của một image
- docker pull, push, login, images, history, rmi
- Image chính thức và image lạ: rủi ro bảo mật

## Bài lab

Pull hai tag của cùng một image và xem history để thấy những layer được dùng chung. Cố tình pull một tag không tồn tại để gặp lỗi "manifest unknown", đọc lỗi và sửa.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích được vì sao pull tag thứ hai nhanh hơn tag đầu
- [ ] Nói được tag khác digest ở điểm nào, và khi nào cần digest
- [ ] Đọc được tên đầy đủ của một image: registry, repository, tag
- [ ] Kể được một rủi ro khi dùng image không rõ nguồn gốc

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
