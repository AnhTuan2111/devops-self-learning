# Bài 11 — Docker Compose: cả hệ thống trong một file

<img src="../../assets/readme/glyph/11.svg" width="132" align="right" alt="Ấn ký của Bài 11">

> **Module M1** · Docker — Đóng gói và chạy ứng dụng
> Ước lượng: 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Một lệnh dựng lên toàn bộ Spring Boot + PostgreSQL, tái lập được trên máy bất kỳ.

## Cần đã học trước

- [Bài 07 · Dockerfile chuẩn production: nhỏ, không root, không bị giết vì hết bộ nhớ](../07-dockerfile-production/)
- [Bài 08 · Cấu hình và secret: một image, nhiều môi trường](../08-cau-hinh-va-secret/)
- [Bài 09 · Dữ liệu: volume, PostgreSQL và backup](../09-volume-va-du-lieu/)
- [Bài 10 · Docker network: container gọi nhau bằng tên](../10-docker-network/)

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
