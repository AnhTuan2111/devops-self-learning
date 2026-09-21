# Bài 16 — Dockerfile và layer cache: vì sao build lại chậm

> **Module M3** · Docker — Đóng gói ứng dụng
> Ước lượng: ~55 phút · Trạng thái: `todo`

## Mục tiêu

Viết Dockerfile đúng thứ tự để build nhanh, và hiểu mỗi dòng tạo ra cái gì.

## Khái niệm sẽ gặp

- FROM WORKDIR COPY RUN CMD ENTRYPOINT ENV EXPOSE
- Layer và cache invalidation
- COPY vs ADD
- CMD vs ENTRYPOINT
- .dockerignore
- Thứ tự lệnh quyết định tốc độ build

## Bài lab

Build một image, sửa 1 dòng code, build lại. Đảo thứ tự lệnh và đo lại thời gian build.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích vì sao COPY file dependency trước code
- [ ] Phân biệt CMD và ENTRYPOINT bằng ví dụ
- [ ] Viết .dockerignore hợp lý

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
