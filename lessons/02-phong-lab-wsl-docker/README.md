# Bài 02 — Phòng lab: WSL2, Docker Desktop và shell tối thiểu

<img src="../../assets/readme/glyph/02.svg" width="132" align="right" alt="Ấn ký của Bài 02">

> **Module M0** · Nền tảng tối thiểu — Request, process và phòng lab
> Ước lượng: 3–5 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Mục tiêu

Có một máy Linux thật ngay trong Windows, Docker chạy được trong đó, và đủ vài lệnh shell để đi lại, đọc và sửa tệp.

## Cần đã học trước

- [Bài 01 · Máy tính, Hệ điều hành, Process: 'server' thật ra là cái gì](../01-may-tinh-va-he-dieu-hanh/)

## Khái niệm sẽ gặp

- WSL2: một máy ảo Linux nhẹ chạy trong Windows
- Máy ảo (VM) là gì — để bài sau so với container
- Terminal, shell, bash; lệnh, tham số, PATH
- Đi lại và đọc tệp: pwd, ls, cd, cat, less, nano
- Pipe | và chuyển hướng: ba luồng vào/ra chuẩn (0 stdin, 1 stdout, 2 stderr), >, 2>/dev/null — giải nghĩa lệnh openssl … 2>/dev/null ở Bài 00
- Docker Desktop với WSL backend: docker version, docker run hello-world

## Bài lab

Cài Ubuntu trên WSL2, bật Docker Desktop, chạy hello-world. Cố tình tắt Docker Desktop rồi chạy lại lệnh docker để gặp lỗi "Cannot connect to the Docker daemon", rồi tự sửa. Làm nốt phép đo đối chứng đã hứa ở Bài 00: thời gian một kết nối bị từ chối trên Linux so với 2,155 giây đo trên Windows.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích được WSL2 là một máy ảo có kernel Linux riêng
- [ ] Tới một thư mục, xem và sửa một tệp bằng nano mà không cần chuột
- [ ] Đọc được lỗi "Cannot connect to the Docker daemon" nói lên điều gì, và sửa được
- [ ] Dùng pipe để lọc output của một lệnh
- [ ] Giải thích được con số 2 trong 2>/dev/null

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
