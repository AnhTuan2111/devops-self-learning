# Bài 06 — Dockerfile đầu tiên cho Spring Boot

<img src="../../assets/readme/glyph/06.svg" width="132" align="right" alt="Ấn ký của Bài 06">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 4–6 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Tự viết Dockerfile đóng gói project Spring Boot của bạn, và hiểu mỗi dòng tạo ra layer nào.

## Cần đã học trước

- [Bài 04 · Gọi được app trong container: port và listen address](../04-port-va-publish/)
- [Bài 05 · Image và registry: image được làm từ những lớp nào](../05-image-va-registry/)

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
