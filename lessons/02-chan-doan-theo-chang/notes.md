# Ghi chú — Bài 02

**Ngày học:** 21–24/09/2026, trong buổi học đối thoại khi bài này còn là phần chẩn đoán của Bài 00 gộp.
Tách thành bài riêng ngày 03/10/2026.
**Hình thức:** đối thoại thầy–trò; lab đọc output theo câu hỏi "ai viết ra dòng này".

---

## Output đã có từ các lab trước, đọc lại theo câu hỏi "ai viết"

```
*** <máy chủ DNS> can't find khong-ton-tai-dau-nhe-12345.com: Non-existent domain
curl: (7) Failed to connect to 127.0.0.1 port 9999 after 2076 ms: Could not connect to server
curl: (28) Connection timed out after 5007 milliseconds
```

| Dòng | Ai viết ra chữ | Thông tin gốc | Chặng |
|---|---|---|---|
| `Non-existent domain` | nslookup | Máy chủ DNS (`NXDOMAIN`) | 2 |
| `(7) Failed to connect` | curl | Hệ điều hành máy đích từ chối | 3 |
| `(28) Connection timed out` | curl | Không ai cả | 3 hoặc 6 |

---

## Lab 2–4 (thêm khi tách bài, chưa làm)

Dán output thật của bạn vào đây.

### Lab 2 — `curl -sS -i https://example.com/` và `.../khong-ton-tai`

```
(chưa có)
```

Mã trạng thái thấy được: ____ và ____. Header `Server` ghi: ____.

### Lab 3 — gõ sai tên, gọi sai port

```
(chưa có)
```

Có dòng `HTTP/...` nào không? ____ Vì sao? ____

### Lab 4 — `httpbin.org/status/502`

```
(chưa có)
```

Ai đã viết ra con số 502 này? ____

---

## Chỗ tôi hiểu sai và đã được sửa

| Tôi nghĩ | Thực tế |
|---|---|
| Lỗi chứng chỉ do "không dịch được DNS" | Lỗi ở chặng 4 **chứng minh** DNS và kết nối đã chạy tốt. DNS hỏng thì đã dừng ở `NXDOMAIN` (nguyên tắc 2). |
| Mở firewall xong là đồng nghiệp vào được | Chưa chắc: **triệu chứng sẽ đổi** từ `timeout` sang `refused` nếu còn vướng listen address, và chính sự đổi đó là bằng chứng firewall đã đúng (nguyên tắc 3). |

---

## Câu hỏi còn treo

_(chưa có)_

---

## Ba câu mang theo

1. **Mọi mã lỗi HTTP đều là một câu trả lời.** Có số là đã có chương trình HTTP đọc request; không có
   số là request còn dừng ở nửa đầu bản đồ.
2. **Mỗi lỗi có một tác giả.** Biết ai viết ra là biết request đã đi tới đâu. Nhận ra tác giả bằng chữ
   ký, không bằng con số.
3. **Hệ thống hỏng được mà không ai đụng vào.** Câu hỏi tự kiểm tra: *"Cái gì sẽ tự hỏng nếu tôi không
   động vào nó trong sáu tháng?"*
