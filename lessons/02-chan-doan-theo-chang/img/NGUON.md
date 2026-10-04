# Nguồn ảnh minh hoạ

Trừ sơ đồ reverse proxy lấy từ Wikimedia Commons, ảnh của bài này là ảnh chụp màn hình do người viết tự
chụp, từ trình duyệt và từ phần mềm chạy thật; ảnh chụp màn hình giữ màu, lưu WebP lossless, không đánh dấu thêm.

| Tệp | Nguồn | Tác giả | Giấy phép | Đã chỉnh |
|---|---|---|---|---|
| `img/trinh-duyet-refused.webp` | tự chụp | — | — | trang lỗi của Microsoft Edge khi gọi `http://127.0.0.1:9999/` (không ai listen), chụp bằng Playwright ngày 03/10/2026, giao diện tiếng Anh, khung 1000px, mật độ 2×; cắt sát vùng nội dung, bỏ nút Refresh |
| `img/trinh-duyet-nxdomain.webp` | tự chụp | — | — | trang lỗi của Microsoft Edge khi gọi một tên miền không tồn tại, chụp như trên ngày 03/10/2026 |
| `img/nginx-404.webp` | tự chụp | — | — | chụp màn hình trình duyệt (khung 340px, mật độ điểm ảnh 2×), Nginx 1.30.5 chạy thật trên máy người viết, 30/09/2026 (chép từ Bài 00 khi tách bài) |
| `img/nginx-502.webp` | tự chụp | — | — | như trên, 30/09/2026 |
| `img/nginx-504.webp` | tự chụp | — | — | như trên, 30/09/2026 |
| `img/whitelabel-404.webp` | tự chụp | — | — | trang Whitelabel Error Page của một ứng dụng Spring Boot 4.1.1 chạy thật (tạo từ start.spring.io, chỉ có starter web, port 8099), gọi một đường dẫn không có controller; chụp trong Edge, mật độ 2×, 03/10/2026; cắt bớt khoảng trắng bên dưới và bên phải |
| `img/whitelabel-500.webp` | tự chụp | — | — | như trên, gọi `/users/42` tới một controller cố tình ném `IllegalStateException` |
| `img/reverse-proxy.webp` | [File:Reverse proxy h2g2bob.svg](https://commons.wikimedia.org/wiki/File:Reverse_proxy_h2g2bob.svg) | H2g2bob | [CC0](http://creativecommons.org/publicdomain/zero/1.0/deed.en) | sơ đồ; bản PNG do Commons dựng từ SVG, thu về 1600px, chuyển hai tông mực/mặt đọc (ô Proxy màu đỏ thành xám đậm) — `hau-ky.py --max 1600` |
| `img/chung-chi-het-han.webp` | tự chụp | — | — | trang cảnh báo của Microsoft Edge khi mở `https://expired.badssl.com/` (chứng chỉ hết hạn 12/04/2015, đọc bằng `openssl x509 -noout -dates`), chụp bằng Playwright ngày 04/10/2026, giao diện tiếng Anh, khung 1000px, mật độ 2×; cắt sát vùng nội dung 1512×820 như hai trang lỗi ở Ảnh 1 |
| `img/xkcd-unreachable-state.webp` | [xkcd 2200, Unreachable State (2019)](https://xkcd.com/2200/) | Randall Munroe | [CC BY-NC 2.5](https://creativecommons.org/licenses/by-nc/2.5/) | truyện tranh; phóng 2 lần, chuyển hai tông — `hau-ky.py --phong-to 2` |
| `img/xkcd-fixing-problems.webp` | [xkcd 1739, Fixing Problems (2016)](https://xkcd.com/1739/) | Randall Munroe | [CC BY-NC 2.5](https://creativecommons.org/licenses/by-nc/2.5/) | truyện tranh; phóng 2 lần, chuyển hai tông |

Truyện tranh của xkcd (CC BY-NC 2.5) và turnoff.us (CC BY-NC-SA 4.0) chỉ được dùng phi thương mại; trang này
không thu tiền nên dùng được, và phải giữ tên tác giả cùng link về trang gốc. Bản đã chuyển hai tông của truyện
turnoff.us là ảnh phái sinh, chia sẻ lại theo đúng giấy phép CC BY-NC-SA 4.0.
