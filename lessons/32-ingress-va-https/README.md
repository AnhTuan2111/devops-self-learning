# Bài 32 — Ingress và HTTPS trong cụm

<img src="../../assets/readme/glyph/32.svg" width="132" align="right" alt="Ấn ký của Bài 32">

> **Module M4** · Kubernetes — Chạy container trên cả một cụm máy
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 31](../31-du-lieu-trong-kubernetes/) kết luận: Trong PersistentVolume, xin qua PVC và gắn với StatefulSet để mỗi bản sao giữ đúng ổ đĩa của mình. Nhiều khi database nên nằm ngoài cụm.

## Câu hỏi của bài

**Service mới gọi được từ trong cụm. Đưa app ra ngoài bằng tên miền và HTTPS thì làm thế nào?**

## Bài này dẫn tới

Ingress khai báo luật theo host và path, Ingress controller (một Nginx chạy trong cụm) thực thi luật đó, còn cert-manager tự cấp và tự gia hạn chứng chỉ.

## Câu hỏi cho bài sau

Pod kẹt ở Pending, CrashLoopBackOff hay ImagePullBackOff. Đọc gì, ở đâu để biết nguyên nhân? [Bài 33](../33-go-loi-pod/) trả lời câu này.

## Cần đã học trước

- [Bài 20 · Tên miền và HTTPS](../20-ten-mien-va-https/)
- [Bài 28 · Service và DNS trong cụm](../28-service-va-dns-trong-cum/)

## Khái niệm sẽ gặp

- Ingress và Ingress controller (nối Nginx ở Bài 19)
- Luật theo host và theo path
- Annotation: timeout, kích thước body — 413 và 504 lần nữa
- cert-manager: tự cấp và tự gia hạn chứng chỉ (nối Bài 20)
- Gateway API: thế hệ sau của Ingress

## Bài lab

Cài Ingress controller và cert-manager trên cụm học, cấu hình Ingress có HTTPS. Cố tình trỏ Ingress vào một tên Service sai để gặp 503, rồi sửa.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Viết được Ingress đưa một service ra ngoài theo tên miền
- [ ] Giải thích được Ingress controller làm việc giống Nginx ở Bài 19 thế nào
- [ ] Chứng chỉ trong cụm tự gia hạn
- [ ] Chẩn đoán được lỗi 503 từ Ingress

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
