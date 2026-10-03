# Nguồn ảnh minh hoạ

Ảnh chụp thật lấy từ Wikimedia Commons, dùng theo giấy phép ghi bên dưới. Mọi ảnh đã được
hậu kỳ cho khớp phong cách trang (hai tông mực/mặt đọc); ảnh chụp màn hình do người viết tự chụp
từ trang công khai hoặc từ phần mềm chạy thật trên máy. Ảnh phái sinh từ ảnh CC BY-SA được
chia sẻ lại theo cùng giấy phép đó.

| Tệp | Nguồn | Tác giả | Giấy phép | Đã chỉnh |
|---|---|---|---|---|
| `img/tu-may-chu-nersc.webp` | [File:Rear of rack at NERSC data center - closeup.jpg](https://commons.wikimedia.org/wiki/File:Rear_of_rack_at_NERSC_data_center_-_closeup.jpg) | Derrick Coetzee from Berkeley, CA, USA | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) | chuyển hai tông mực/mặt đọc (xám, kéo tương phản), cắt khung dọc 3:4 |
| `img/cpu-ryzen.webp` | [File:AMD Ryzen 9 9950X.jpg](https://commons.wikimedia.org/wiki/File:AMD_Ryzen_9_9950X.jpg) | 4300streetcar | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) | tách nền theo màu đế chip xanh ngọc, bỏ bóng đổ — `tach-nen.py --cach mau --hue 160-215`; chuyển hai tông mực/mặt đọc (xám, kéo tương phản), đặt vào khung 4:3 đệm màu mặt đọc |
| `img/ram-ddr4.webp` | [File:16 GiB-DDR4-RAM-Riegel RAM019FIX Small Crop 90 PCNT.png](https://commons.wikimedia.org/wiki/File:16_GiB-DDR4-RAM-Riegel_RAM019FIX_Small_Crop_90_PCNT.png) | PantheraLeo1359531 | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) | xoá viền nền nâu sẫm nối liền mép ảnh — `tach-nen.py --cach nen-tron`; chuyển hai tông mực/mặt đọc (xám, kéo tương phản), đặt vào khung 4:3 đệm màu mặt đọc |
| `img/o-cung-nvme.webp` | [File:Western Digital SN850X NVME solid state drive 8TB front side.jpg](https://commons.wikimedia.org/wiki/File:Western_Digital_SN850X_NVME_solid_state_drive_8TB_front_side.jpg) | 4300streetcar | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0) | tách nền xám bằng mô hình rembg (isnet-general-use) — `tach-nen.py --cach mo-hinh`; chuyển hai tông mực/mặt đọc (xám, kéo tương phản), đặt vào khung 4:3 đệm màu mặt đọc |
| `img/card-mang-pci.webp` | [File:Ethernet NIC 100Mbit PCI.jpg](https://commons.wikimedia.org/wiki/File:Ethernet_NIC_100Mbit_PCI.jpg) | afrank99 | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) | tách nền xám chuyển sắc bằng mô hình rembg (isnet-general-use) — `tach-nen.py --cach mo-hinh`; chuyển hai tông mực/mặt đọc (xám, kéo tương phản), đặt vào khung 4:3 đệm màu mặt đọc |
| `img/thompson-ritchie.webp` | [File:Ken Thompson and Dennis Ritchie--1973.jpg](https://commons.wikimedia.org/wiki/File:Ken_Thompson_and_Dennis_Ritchie--1973.jpg) | Unknown authorUnknown author | [Public domain]() | chuyển hai tông mực/mặt đọc (xám, kéo tương phản), phóng 2 lần (ảnh gốc chỉ 310×201) |
| `img/man-signal7.webp` | tự chụp | — | — | chụp màn hình man7.org 30/09/2026, mật độ 2×, cắt từ dòng tiêu đề bảng tới dòng SIGTERM; khung đánh dấu thêm vào, không nhãn chữ |
| `img/systemd-restart.webp` | tự chụp | — | — | chụp màn hình man7.org 30/09/2026, mật độ 2×; ẩn ba cột on-abnormal, on-abort, on-watchdog và bỏ thụt đầu dòng; khung đánh dấu thêm vào, không nhãn chữ |

## Phụ lục `lich-su-he-dieu-hanh.html`

Ảnh 3 của phụ lục dùng lại `img/thompson-ritchie.webp` ở trên.

| Tệp | Nguồn | Tác giả | Giấy phép | Đã chỉnh |
|---|---|---|---|---|
| `img/ibm-7090.webp` | [File:IBM 7090 computer.jpg](https://commons.wikimedia.org/wiki/File:IBM_7090_computer.jpg) | NASA Ames Research Center / Emerson Shaw | Public domain | chuyển hai tông mực/mặt đọc (xám, kéo tương phản), cắt khung 4:3 — `hau-ky.py --cover 800x600` |
| `img/bo-the-dut-lo.webp` | [File:Punched card program deck.agr.jpg](https://commons.wikimedia.org/wiki/File:Punched_card_program_deck.agr.jpg) | ArnoldReinhold | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0) | tách nền đen bằng mô hình rembg (isnet-general-use) — `tach-nen.py --cach mo-hinh`; chuyển hai tông mực/mặt đọc, đặt vào khung 4:3 đệm màu mặt đọc — `hau-ky.py --fit 800x600 --dem 0.05` |
| `img/teletype-asr33.webp` | [File:Teletype Model 33 ASR (1968) (14689737122).png](https://commons.wikimedia.org/wiki/File:Teletype_Model_33_ASR_(1968)_(14689737122).png) | Dennis van Zuijlekom from Ermelo, The Netherlands | [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0) | tách nền phòng bảo tàng bằng mô hình rembg (isnet-general-use) — `tach-nen.py --cach mo-hinh`; chuyển hai tông mực/mặt đọc, đặt vào khung dọc 3:4 đệm màu mặt đọc — `hau-ky.py --fit 720x960 --dem 0.05` |
| `img/unix-v7-kernel.webp` | [File:Version 7 UNIX SIMH PDP11 Kernels Shell.png](https://commons.wikimedia.org/wiki/File:Version_7_UNIX_SIMH_PDP11_Kernels_Shell.png) | Huihermit | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) | giữ màu (ảnh chụp màn hình); cắt bỏ phần nền đen trống bên phải (giữ 418 px đầu của bề ngang); phóng 2 lần kiểu điểm ảnh gần nhất cho chữ còn nét; vẽ thêm ba khung đánh dấu đỏ (sáu tệp kernel), lam (`/bin/sh`), vàng (`init`), không nhãn chữ; lưu WebP lossless |
