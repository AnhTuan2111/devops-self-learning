# Bài 26 — Vì sao cần Kubernetes, và dựng một cụm nhỏ trên máy

<img src="../../assets/readme/glyph/26.svg" width="132" align="right" alt="Ấn ký của Bài 26">

> **Module M4** · Kubernetes — Chạy container trên cả một cụm máy
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 25](../25-cd-va-rollback/) kết luận: Pipeline SSH vào server chạy một script deploy chạy lại nhiều lần vẫn an toàn (compose pull, up -d). Rollback là deploy lại tag cũ, với điều kiện migration database tương thích ngược.

## Câu hỏi của bài

**Mọi thứ đang chạy trên một server. Server đó chết thì sao, và khi một máy không còn đủ sức thì làm gì?**

## Bài này dẫn tới

Kubernetes điều khiển nhiều máy như một cụm, liên tục đưa trạng thái thật về trạng thái mong muốn. Đổi lại là chi phí vận hành lớn hơn hẳn Compose.

## Câu hỏi cho bài sau

Đã có một cụm. Chạy app Spring Boot lên đó bằng gì, và vì sao pod bị xoá lại tự sinh ra? [Bài 27](../27-pod-va-deployment/) trả lời câu này.

## Cần đã học trước

- [Bài 15 · Gỡ lỗi container](../15-go-loi-container/)

## Khái niệm sẽ gặp

- Giới hạn của một máy: máy chết là hệ thống chết
- Cụm (cluster): control plane và node; node chỉ là một máy Linux
- Trạng thái mong muốn và vòng lặp điều chỉnh
- kubectl và kubeconfig
- Cụm học trên máy: k3d hoặc kind
- Chi phí vận hành thật của Kubernetes

## Bài lab

Dựng một cụm k3d nhiều node và xem các node. Cố tình dừng một node (docker stop container của node đó) để thấy nó chuyển NotReady, rồi bật lại.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Nói được ba việc Kubernetes làm mà Compose trên một máy không làm
- [ ] Giải thích được control plane và node
- [ ] Dùng kubectl xem trạng thái cụm
- [ ] Giải thích được "trạng thái mong muốn" bằng một ví dụ

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
