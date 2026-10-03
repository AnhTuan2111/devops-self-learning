# Bài 13 — Docker Compose: cả hệ thống trong một file

<img src="../../assets/readme/glyph/13.svg" width="132" align="right" alt="Ấn ký của Bài 13">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 12](../12-docker-network/) kết luận: Mỗi container có localhost của riêng nó. Đặt chúng vào chung một network tự tạo thì Docker cung cấp DNS nội bộ, và chúng gọi nhau bằng tên, như db:5432.

## Câu hỏi của bài

**Mỗi lần dựng lại phải gõ tay hai container, một network, một volume và cả đống tham số. Làm sao dựng lại cả hệ thống bằng một lệnh?**

## Bài này dẫn tới

Mô tả toàn bộ trong compose.yaml rồi chạy docker compose up. Healthcheck giải quyết chuyện "đã chạy chưa phải đã sẵn sàng" giữa các service.

## Câu hỏi cho bài sau

Hệ thống đã lên bằng một lệnh. Khi container bị dừng, bị giết hay tự chết, request đang xử lý ra sao, và ai dựng nó dậy? [Bài 14](../14-vong-doi-container/) trả lời câu này.

## Cần đã học trước

- [Bài 09 · Dockerfile chuẩn production: nhỏ, không root, không bị giết vì hết bộ nhớ](../09-dockerfile-production/)
- [Bài 10 · Cấu hình và secret: một image, nhiều môi trường](../10-cau-hinh-va-secret/)
- [Bài 11 · Dữ liệu: volume, PostgreSQL và backup](../11-volume-va-du-lieu/)
- [Bài 12 · Docker network: container gọi nhau bằng tên](../12-docker-network/)

## Khái niệm sẽ gặp

- compose.yaml: services, volumes, networks
- depends_on và vì sao nó không đợi app sẵn sàng
- HEALTHCHECK trong Dockerfile, healthcheck trong Compose và depends_on: condition: service_healthy
- env_file và .env
- up -d, down, logs -f, ps, exec
- Compose hợp với một máy (dev hoặc một server nhỏ); cần nhiều máy thì tới Kubernetes

## Bài lab

Viết compose.yaml cho project của bạn: xoá sạch mọi thứ rồi docker compose up -d là hệ thống sống lại. Cố tình để app khởi động trước database để gặp lỗi kết nối lúc khởi động, rồi sửa bằng healthcheck.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Viết được compose.yaml cho app + database từ đầu
- [ ] Giải thích được vì sao depends_on mặc định không đủ
- [ ] Dựng lại được toàn bộ hệ thống chỉ bằng một lệnh
- [ ] Đọc log của từng service trong Compose

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
