# Bài 04 — Phòng lab: WSL2, Docker Desktop và shell tối thiểu

<img src="../../assets/readme/glyph/04.svg" width="132" align="right" alt="Ấn ký của Bài 04">

> **Module M0** · Nền tảng tối thiểu — Request, process và phòng lab
> Ước lượng: 3–5 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Từ bài trước

[Bài 03](../03-may-tinh-va-he-dieu-hanh/) kết luận: App là một process do kernel quản lý. Hết RAM thì kernel giết process lớn nhất, process chết thì port của nó trống và Nginx viết 502. Muốn app tự sống lại thì phải giao nó cho một process khác trông coi, tức biến nó thành service.

## Câu hỏi của bài

**Server thật chạy Linux, còn mọi lab tới giờ chạy trên Windows. Làm sao có một máy Linux thật ngay trên máy mình, để thấy process, signal và lỗi đúng như trên server?**

## Bài này dẫn tới

WSL2 chạy một kernel Linux thật trong một máy ảo nhẹ; bash và vài lệnh tối thiểu đủ để điều khiển nó. Docker Desktop dùng chính máy Linux đó để chạy container, và lệnh docker run hello-world đầu tiên đã chạy được.

## Câu hỏi cho bài sau

hello-world vừa chạy "trong một container". Container là một máy ảo nhỏ như WSL2, hay chỉ là một process như ở Bài 03? [Bài 05](../05-container-dau-tien/) trả lời câu này.

## Cần đã học trước

- [Bài 03 · Máy tính, Hệ điều hành, Process: 'server' thật ra là cái gì](../03-may-tinh-va-he-dieu-hanh/)

## Khái niệm sẽ gặp

- WSL2: một máy ảo Linux nhẹ chạy trong Windows
- Máy ảo (VM) là gì — để bài sau so với container
- Terminal, shell, bash; lệnh, tham số, PATH
- Đi lại và đọc tệp: pwd, ls, cd, cat, less, nano
- Pipe | và chuyển hướng: ba luồng vào/ra chuẩn (0 stdin, 1 stdout, 2 stderr), >, 2>/dev/null — giải nghĩa lệnh openssl … 2>/dev/null ở Bài 00
- Process và signal thật trên Linux: ps, kill, kill -9 (thấy lại Bài 03)
- Docker Desktop với WSL backend: docker version, docker run hello-world

## Bài lab

Cài Ubuntu trên WSL2, bật Docker Desktop, chạy hello-world. Cố tình tắt Docker Desktop rồi chạy lại lệnh docker để gặp lỗi "Cannot connect to the Docker daemon", rồi tự sửa. Chạy lại kill và kill -9 trên một process Linux thật. Làm nốt phép đo đối chứng đã hứa ở Bài 01: thời gian một kết nối bị từ chối trên Linux so với 2,155 giây đo trên Windows.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích được WSL2 là một máy ảo có kernel Linux riêng
- [ ] Tới một thư mục, xem và sửa một tệp bằng nano mà không cần chuột
- [ ] Đọc được lỗi "Cannot connect to the Docker daemon" nói lên điều gì, và sửa được
- [ ] Dùng pipe để lọc output của một lệnh
- [ ] Giải thích được con số 2 trong 2>/dev/null
- [ ] Gửi được SIGTERM và SIGKILL tới một process Linux và đọc được khác biệt

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
