# Bài 28 — Service và DNS trong cụm

<img src="../../assets/readme/glyph/28.svg" width="132" align="right" alt="Ấn ký của Bài 28">

> **Module M4** · Kubernetes — Chạy container trên cả một cụm máy
> Ước lượng: 4–6 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 27](../27-pod-va-deployment/) kết luận: Bằng Deployment: nó giữ đủ số bản sao pod, tự thay pod chết, cập nhật dần từng bản và quay lại được khi bản mới hỏng.

## Câu hỏi của bài

**Pod liên tục bị thay, và mỗi lần thay lại đổi địa chỉ IP. Vậy app gọi PostgreSQL, và người ngoài gọi app, bằng địa chỉ nào?**

## Bài này dẫn tới

Bằng Service: một tên và một địa chỉ ổn định, chọn pod theo label. DNS của cụm phân giải tên Service, giống DNS nội bộ của Docker ở Bài 12.

## Câu hỏi cho bài sau

Cấu hình và mật khẩu đang nằm cứng trong manifest. Đưa chúng vào pod bằng cách nào cho tách bạch và an toàn? [Bài 29](../29-configmap-va-secret/) trả lời câu này.

## Cần đã học trước

- [Bài 12 · Docker network: container gọi nhau bằng tên](../12-docker-network/)
- [Bài 27 · Pod và Deployment](../27-pod-va-deployment/)

## Khái niệm sẽ gặp

- Vì sao không gọi thẳng IP của pod
- Service: ClusterIP, NodePort, LoadBalancer
- Label và selector
- DNS trong cụm: tên-service.namespace.svc (nối Bài 12)
- kubectl port-forward
- Namespace của Kubernetes: chia cụm thành vùng tên riêng (khác namespace Linux ở Bài 05)

## Bài lab

Tạo Service cho app và cho PostgreSQL, cho chúng gọi nhau bằng tên. Cố tình để selector lệch label để Service không có endpoint nào, chẩn đoán và sửa.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích được vì sao cần Service thay vì IP của pod
- [ ] Chọn đúng loại Service cho từng việc
- [ ] Chẩn đoán được Service không có endpoint
- [ ] Gọi được một service trong cụm từ máy mình bằng port-forward

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
