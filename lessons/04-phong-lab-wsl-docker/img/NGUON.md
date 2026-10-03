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
| `img/hypervisor-hai-kieu.webp` | [File:Hyperviseur.svg](https://commons.wikimedia.org/wiki/File:Hyperviseur.svg) | Scsami | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) | sơ đồ; bản PNG rộng 1920px do Commons dựng từ SVG, thu về 1600px, chuyển hai tông mực/mặt đọc — `hau-ky.py --max 1600` |
| `img/ba-luong-chuan.webp` | [File:Stdstreams-notitle.svg](https://commons.wikimedia.org/wiki/File:Stdstreams-notitle.svg) | Danielpr85, theo bản vẽ gốc của TuukkaH | public domain | sơ đồ; thu về 1400px, chuyển hai tông — `hau-ky.py --max 1400` |
| `img/pipeline.webp` | [File:Pipeline.svg](https://commons.wikimedia.org/wiki/File:Pipeline.svg) | XcepticZP, theo bản vẽ gốc của TuukkaH | public domain | sơ đồ; thu về 1200px, chuyển hai tông — `hau-ky.py --max 1200` |
| `img/xkcd-sandwich.webp` | [xkcd 149, Sandwich](https://xkcd.com/149/) | Randall Munroe | [CC BY-NC 2.5](https://creativecommons.org/licenses/by-nc/2.5/) | truyện tranh; ảnh gốc 360×299, phóng 3 lần, chuyển hai tông — `hau-ky.py --phong-to 3`. Giấy phép phi thương mại: chỉ dùng được vì trang này không thu tiền |
| `img/bash-tren-windows-2017.webp` | [File:Linux on Windows 10.png](https://commons.wikimedia.org/wiki/File:Linux_on_Windows_10.png) | François-Dominique | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | ảnh chụp màn hình ngày 19/01/2017; giữ nguyên màu và kích thước, chỉ đổi sang WebP — `hau-ky.py --giu-mau`. Dùng ở phụ lục `lich-su-wsl.html` |
| `img/ubuntu-wsl2-2023.webp` | [File:Ubuntu on Windows.png](https://commons.wikimedia.org/wiki/File:Ubuntu_on_Windows.png) | François-Dominique | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | ảnh chụp màn hình ngày 06/05/2023 (Windows 11, WSL 2); giữ nguyên màu và kích thước — `hau-ky.py --giu-mau`. Dùng ở phụ lục `lich-su-wsl.html` |
| `img/hello-world-bon-buoc.webp` | tự chụp | — | — | chụp màn hình [hub.docker.com/_/hello-world](https://hub.docker.com/_/hello-world), khối output mẫu từ "Hello from Docker!" tới hết bước 4; tắt ngắt dòng tự động của khung code để chữ không gãy; khung đỏ bước 1, khung lam bước 4 |

Ảnh `teletype-33.webp` dùng cùng tệp gốc trên Commons với ảnh Teletype ở phụ lục của Bài 03, nhưng được
xử lý riêng cho khung vuông của dải hai ảnh.

Bảng so sánh WSL 1 và WSL 2, đoạn trích trang hướng dẫn stdin(3) và hai bài viết về WSL năm 2016, 2019 nằm trên
trang dưới dạng chữ thật (bảng HTML và trích nguyên văn), có nguồn và ngày đọc ngay trong chú thích, nên không
có trong bảng này.

Ảnh đã xem mà không dùng: ảnh Satya Nadella trước slide "Microsoft ♥ Linux" (File:Microsoft Linux.jpg trên
Commons) ghi CC BY-SA 4.0 nhưng nguồn là trang báo chí của Microsoft và không có bằng chứng cho phép, nên coi là
không rõ giấy phép. Pinterest (người học gợi ý 04/10/2026) chặn kết quả tìm kiếm bằng tường đăng nhập, nên không
lấy ảnh từ đó.
