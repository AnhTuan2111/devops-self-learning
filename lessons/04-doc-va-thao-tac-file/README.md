# Bài 04 — Đọc và thao tác file: bộ công cụ điều tra

<img src="../../assets/readme/glyph/04.svg" width="132" align="right" alt="Ấn ký của Bài 04">

> **Module M1** · Linux — Điều khiển một server
> Ước lượng: 4–6 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Tìm được một dòng log trong 2 triệu dòng, và chỉnh sửa file config trên server không có giao diện.

## Khái niệm sẽ gặp

- cat less head tail
- grep và regex cơ bản
- find
- cp mv rm mkdir touch
- nano / vim tối thiểu
- Redirect > >> và pipe |
- stdin/stdout/stderr

## Bài lab

Sinh một file log giả 100k dòng, dùng grep/tail/pipe để tìm ra lỗi trong đó.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Theo dõi log realtime bằng tail -f
- [ ] Lọc log bằng grep + pipe nhiều tầng
- [ ] Sửa và lưu một file bằng nano hoặc vim

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết vào đúng buổi học,
cùng với `index.html` ghi lại những gì đã thực sự làm và những lỗi đã gặp.*
