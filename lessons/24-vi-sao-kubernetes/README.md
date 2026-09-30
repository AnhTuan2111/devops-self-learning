# Bài 24 — Vì sao cần Kubernetes, và dựng một cụm nhỏ trên máy

<img src="../../assets/readme/glyph/24.svg" width="132" align="right" alt="Ấn ký của Bài 24">

> **Module M4** · Kubernetes — Chạy container trên cả một cụm máy
> Ước lượng: 4–7 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Nói được Kubernetes giải quyết điều gì mà Compose trên một máy không làm được, và có một cụm để thực hành.

## Cần đã học trước

- [Bài 13 · Gỡ lỗi container](../13-go-loi-container/)

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
