# Bài 09 — Dữ liệu: volume, PostgreSQL và backup

<img src="../../assets/readme/glyph/09.svg" width="132" align="right" alt="Ấn ký của Bài 09">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 4–6 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Không bao giờ mất dữ liệu vì xoá nhầm container, và khôi phục được database từ bản backup.

## Cần đã học trước

- [Bài 03 · Container đầu tiên: nó chỉ là một process bị cô lập](../03-container-dau-tien/)
- [Bài 08 · Cấu hình và secret: một image, nhiều môi trường](../08-cau-hinh-va-secret/)

## Khái niệm sẽ gặp

- Filesystem của container là tạm thời
- Named volume, bind mount, tmpfs
- Quyền tệp rwx và chủ sở hữu (Linux dạy đúng lúc)
- Lỗi Permission denied giữa máy và container
- pg_dump và pg_restore
- Diễn tập khôi phục: backup chưa từng khôi phục thử thì chưa phải backup

## Bài lab

Chạy PostgreSQL không volume, tạo dữ liệu, xoá container để thấy mất sạch; làm lại với volume. Cố tình bind mount một thư mục sai quyền để gặp Permission denied rồi sửa. Backup ra tệp, xoá database, khôi phục lại.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích được vì sao dữ liệu mất khi xoá container không có volume
- [ ] Chọn đúng giữa named volume và bind mount cho từng việc
- [ ] Đọc được chuỗi quyền rwx và sửa được lỗi Permission denied
- [ ] Tự khôi phục được database từ một tệp backup

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
