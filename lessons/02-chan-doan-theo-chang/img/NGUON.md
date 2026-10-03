# Nguồn ảnh minh hoạ

Mọi ảnh của bài này là ảnh chụp màn hình do người viết tự chụp, từ trình duyệt và từ phần mềm chạy
thật; ảnh chụp màn hình giữ màu, lưu WebP lossless. Các khung màu là phần đánh dấu thêm vào,
không có nhãn chữ trong ảnh.

| Tệp | Nguồn | Tác giả | Giấy phép | Đã chỉnh |
|---|---|---|---|---|
| `img/trinh-duyet-refused.webp` | tự chụp | — | — | trang lỗi của Microsoft Edge khi gọi `http://127.0.0.1:9999/` (không ai listen), chụp bằng Playwright ngày 03/10/2026, giao diện tiếng Anh, khung 1000px, mật độ 2×; cắt sát vùng nội dung, bỏ nút Refresh |
| `img/trinh-duyet-nxdomain.webp` | tự chụp | — | — | trang lỗi của Microsoft Edge khi gọi một tên miền không tồn tại, chụp như trên ngày 03/10/2026 |
| `img/nginx-404.webp` | tự chụp | — | — | chụp màn hình trình duyệt (khung 340px, mật độ điểm ảnh 2×), Nginx 1.30.5 chạy thật trên máy người viết, 30/09/2026 (chép từ Bài 00 khi tách bài) |
| `img/nginx-502.webp` | tự chụp | — | — | như trên, 30/09/2026 |
| `img/nginx-504.webp` | tự chụp | — | — | như trên, 30/09/2026 |
| `img/whitelabel-404.webp` | tự chụp | — | — | trang Whitelabel Error Page của một ứng dụng Spring Boot 4.1.1 chạy thật (tạo từ start.spring.io, chỉ có starter web, port 8099), gọi một đường dẫn không có controller; chụp trong Edge, mật độ 2×, 03/10/2026; cắt bớt khoảng trắng bên dưới và bên phải |
| `img/whitelabel-500.webp` | tự chụp | — | — | như trên, gọi `/users/42` tới một controller cố tình ném `IllegalStateException` |
| `img/rfc9110-5xx.webp` | tự chụp | — | — | chụp `https://www.rfc-editor.org/rfc/rfc9110.txt` ngày 03/10/2026, mật độ 2×; giữ mục 15.6.1 (500), 15.6.3 (502), 15.6.5 (504), thay mục 501 và 503 bằng `[...]`; khung lam quanh định nghĩa 500, khung đỏ quanh 502 và 504 (`scripts/anh/danh-dau.js`) |
