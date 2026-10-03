# Nguồn ảnh minh hoạ

Ảnh chụp thật lấy từ Wikimedia Commons, dùng theo giấy phép ghi bên dưới. Mọi ảnh chụp đồ vật đã được
tách khỏi nền cũ và hậu kỳ cho khớp phong cách trang (hai tông mực `#151515` / mặt đọc `#fffdf8`); ảnh
chụp màn hình do người viết tự chụp ngày 03/10/2026 từ trang công khai, mật độ 2×, giữ màu, khung đánh
dấu thêm vào và không có nhãn chữ trong ảnh. Ảnh phái sinh từ ảnh CC BY-SA được chia sẻ lại theo cùng
giấy phép đó.

| Tệp | Nguồn | Tác giả | Giấy phép | Đã chỉnh |
|---|---|---|---|---|
| `img/teletype-33.webp` | [File:Teletype Model 33 ASR (1968) (14689737122).png](https://commons.wikimedia.org/wiki/File:Teletype_Model_33_ASR_(1968)_(14689737122).png) | Dennis van Zuijlekom from Ermelo, The Netherlands | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) | tách nền bằng mô hình rembg — `tach-nen.py --cach mo-hinh`; xoá mảng thảm giữa hai chân đế và các mảnh rời nhỏ còn sót; chuyển hai tông mực/mặt đọc, đặt vào khung vuông 800×800 đệm màu mặt đọc |
| `img/vt100.webp` | [File:DEC VT100 terminal.jpg](https://commons.wikimedia.org/wiki/File:DEC_VT100_terminal.jpg) | Jason Scott | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0) | tách nền bằng mô hình rembg — `tach-nen.py --cach mo-hinh`; chuyển hai tông mực/mặt đọc, đặt vào khung vuông 800×800 đệm màu mặt đọc |
| `img/wsl1-wsl2-so-sanh.webp` | tự chụp | — | — | chụp màn hình [learn.microsoft.com/…/wsl/compare-versions](https://learn.microsoft.com/en-us/windows/wsl/compare-versions), vùng bảng "Comparing features"; khung đỏ hàng Full Linux Kernel, khung lam hàng Full system call compatibility, khung vàng hàng Performance across OS file systems |
| `img/man-stdin.webp` | tự chụp | — | — | chụp màn hình [man7.org stdin(3)](https://man7.org/linux/man-pages/man3/stdin.3.html), mục DESCRIPTION, cắt ngay dưới câu về file descriptor 0, 1, 2; khung đỏ quanh câu đó |
| `img/hello-world-bon-buoc.webp` | tự chụp | — | — | chụp màn hình [hub.docker.com/_/hello-world](https://hub.docker.com/_/hello-world), khối output mẫu từ "Hello from Docker!" tới hết bước 4; tắt ngắt dòng tự động của khung code để chữ không gãy; khung đỏ bước 1, khung lam bước 4 |
| `img/wsl1-tong-quan-2016.webp` | tự chụp | — | — | chụp màn hình [Windows Subsystem for Linux Overview (2016)](https://learn.microsoft.com/en-us/archive/blogs/wsl/windows-subsystem-for-linux-overview), mục "Windows Subsystem for Linux"; cắt bỏ mép thanh điều hướng bên trái; khung đỏ dòng driver lxss.sys/lxcore.sys, khung lam đoạn dịch syscall sang NT API. Dùng ở `lich-su-wsl.html` |
| `img/wsl2-cong-bo-2019.webp` | tự chụp | — | — | chụp màn hình [Announcing WSL 2](https://devblogs.microsoft.com/commandline/announcing-wsl-2/), từ ngày đăng tới đoạn "real Linux kernel"; xoá nút đếm lượt tương tác cạnh ngày đăng (tô màu nền); khung lam đoạn mở đầu, khung đỏ đoạn kết luận. Dùng ở `lich-su-wsl.html`; đã cắt bỏ dòng tên và ảnh đại diện của tác giả |

Ảnh `teletype-33.webp` dùng cùng tệp gốc trên Commons với ảnh Teletype ở phụ lục của Bài 03, nhưng được
xử lý riêng cho khung vuông của dải hai ảnh.
