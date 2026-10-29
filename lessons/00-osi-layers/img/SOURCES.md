# Nguồn ảnh minh hoạ, Bài 00

Ảnh chụp thật lấy từ Wikimedia Commons, dùng theo giấy phép ghi bên dưới. Ảnh đã được hậu kỳ cho khớp phong cách trang
(hai tông mực `#151515` / mặt đọc `#fffdf8`). Ảnh phái
sinh từ ảnh CC BY-SA được chia sẻ lại theo cùng giấy phép đó. Trên trang, mỗi ảnh là link sang trang nguồn và hiện tác giả, giấy phép khi rê chuột.

| Ảnh | Tệp | Nguồn | Tác giả | Giấy phép | Đã chỉnh |
|---|---|---|---|---|---|
| Ảnh 1 | `nic-two-port.webp` | [File:Intel X540-T2.jpg](https://commons.wikimedia.org/wiki/File:Intel_X540-T2.jpg) | Dmitry Nosachev | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | tách nền bằng mô hình rembg, `remove-bg.py --method model`; chuyển hai tông, đặt vào khung đệm màu mặt đọc |
| Ảnh 2 | `submarine-cable.webp` | [File:Submarine Optical Cables.jpg](https://commons.wikimedia.org/wiki/File:Submarine_Optical_Cables.jpg) | Lonnie Hagadorn | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | tách phông xám chuyển sắc, cắt vệt bóng quanh đế, `remove-bg.py --method backdrop --crop-base`; chuyển hai tông, đặt vào khung đệm màu mặt đọc |
| Ảnh 3 | `switch-8-port.webp` | [File:Lancom GS-1108-3486.jpg](https://commons.wikimedia.org/wiki/File:Lancom_GS-1108-3486.jpg) | Raimond Spekking | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | tách nền trắng bằng `remove-bg.py --method solid`; đặt vào khung 1200×560, chuyển hai tông |
| Ảnh 3 | `access-point.webp` | [File:Unifi AC Lite Access Point.jpg](https://commons.wikimedia.org/wiki/File:Unifi_AC_Lite_Access_Point.jpg) | ServerGuruBrisbane | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0) | ảnh chụp cảnh nên không tách nền; cắt còn access point và sợi cáp, chuyển hai tông |
| Ảnh 4 | `home-router.webp` | [File:Linksys-Wireless-G-Router.jpg](https://commons.wikimedia.org/wiki/File:Linksys-Wireless-G-Router.jpg) | Evan-Amos | Public domain | tách nền bằng mô hình rembg (isnet-general-use), `remove-bg.py --method model`; chuyển hai tông, đặt vào khung đệm màu mặt đọc |

Hình 1 là lời trích chữ thật từ ITU-T X.200; Hình 6 vẽ lại theo Figure 12 của X.200 bằng HTML và CSS, không dùng ảnh chụp
hình đó vì văn bản X.200 ghi "All rights reserved".
