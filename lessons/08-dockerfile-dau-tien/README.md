# Bài 08 — Dockerfile đầu tiên cho Spring Boot

<img src="../../assets/readme/glyph/08.svg" width="132" align="right" alt="Ấn ký của Bài 08">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 4–6 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 07](../07-image-va-registry/) kết luận: Image là một chồng layer chỉ đọc, tải về từ registry theo tên và tag. Layer giống nhau được dùng chung, còn chỉ digest mới định danh chắc chắn một image.

## Câu hỏi của bài

**Tới giờ ta toàn chạy image người khác làm sẵn. Làm sao tự đóng gói chính app Spring Boot của mình thành image?**

## Bài này dẫn tới

Viết Dockerfile. Mỗi dòng tạo ra một layer, và thứ tự các dòng quyết định cache, tức quyết định build lại nhanh hay chậm.

## Câu hỏi cho bài sau

Image vừa build vừa nặng, chạy bằng root, và có thể bị kernel giết vì hết bộ nhớ. Làm sao cho nó đủ tốt để chạy production? [Bài 09](../09-dockerfile-production/) trả lời câu này.

## Cần đã học trước

- [Bài 06 · Gọi được app trong container: port và listen address](../06-port-va-publish/)
- [Bài 07 · Image và registry: image được làm từ những lớp nào](../07-image-va-registry/)

## Khái niệm sẽ gặp

- FROM, WORKDIR, COPY, RUN, CMD, ENTRYPOINT, EXPOSE
- Build context và .dockerignore
- Cache theo layer: vì sao thứ tự các dòng quyết định tốc độ build
- CMD và ENTRYPOINT khác nhau thế nào
- docker build, gắn tag và chạy image tự build

## Bài lab

Viết Dockerfile cho jar Spring Boot, build rồi chạy. Sửa một dòng code, build lại và đo thời gian; đảo thứ tự các lệnh COPY để phá cache rồi đo lại. Cố tình bỏ .dockerignore để thấy build context phình to.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Viết được Dockerfile chạy được cho một project Spring Boot
- [ ] Giải thích được vì sao đổi một dòng thì mọi dòng sau nó phải build lại
- [ ] Nói được CMD khác ENTRYPOINT thế nào
- [ ] Biết .dockerignore nên chứa những gì

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
