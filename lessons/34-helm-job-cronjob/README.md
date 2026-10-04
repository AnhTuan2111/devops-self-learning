# Bài 34 — Helm, Job và CronJob

<img src="../../assets/readme/glyph/34.svg" width="132" align="right" alt="Ấn ký của Bài 34">

> **Module M4** · Kubernetes — Chạy container trên cả một cụm máy
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 33](../33-go-loi-pod/) kết luận: describe và events cho biết cụm đã cố làm gì, logs --previous cho biết app nói gì trước khi chết. Mỗi trạng thái trỏ về một nhóm nguyên nhân.

## Câu hỏi của bài

**Bộ manifest đã lớn và lặp lại cho mỗi môi trường, lại còn những việc chạy một lần hay theo lịch như backup. Quản lý chúng thế nào?**

## Bài này dẫn tới

Helm đóng manifest thành chart có values riêng cho từng môi trường, cài và rollback theo release. Job chạy một lần, CronJob chạy theo lịch.

## Câu hỏi cho bài sau

Quản lý một cụm bằng kubectl và tệp YAML thì ổn. Khi có nhiều cụm và nhiều người cùng làm, nhìn và phân quyền thế nào? [Bài 35](../35-rancher/) trả lời câu này.

## Cần đã học trước

- [Bài 31 · Dữ liệu trong Kubernetes: PVC và StatefulSet](../31-du-lieu-trong-kubernetes/)
- [Bài 33 · Gỡ lỗi pod](../33-go-loi-pod/)

## Khái niệm sẽ gặp

- Vấn đề lặp manifest giữa các môi trường
- Helm chart, values, template, release
- helm install, upgrade, rollback
- Cài phần mềm có sẵn bằng chart
- Job: tác vụ chạy một lần, như một đợt kiểm thử tải
- CronJob: tác vụ theo lịch, như backup

## Bài lab

Chuyển manifest của app thành Helm chart có values riêng cho dev và prod. Viết CronJob backup PostgreSQL. Cố tình đặt sai một value để helm upgrade hỏng, rồi helm rollback.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Viết được Helm chart cho app của mình
- [ ] Deploy cùng một chart lên hai môi trường khác cấu hình
- [ ] Rollback được một release
- [ ] Viết được CronJob chạy theo lịch

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
