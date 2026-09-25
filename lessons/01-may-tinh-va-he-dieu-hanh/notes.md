# Ghi chú — Bài 01

> Chỗ ghi thô. Viết xấu cũng được. Sau này đọc lại phần này hữu ích hơn lý thuyết nhiều,
> vì nó là thứ *chính mình* đã vấp.

**Ngày học:**

---

## Kết quả lab thật

### Lab 1 — sinh ra process

```
(dán dòng "PID = ... | dang giu phong 8080" vào đây)
```

PID tôi nhận được:

### Lab 2 — đi ngược PORT → PID → tên chương trình

```
$ netstat -ano | grep 8080
(dán vào đây)

$ tasklist //FI "PID eq <PID>"
(dán vào đây)
```

PID trong `netstat` **có khớp** với PID mà Node tự in ra không?  ☐ Có  ☐ Không

### Lab 3 — file trên đĩa vs process trong RAM

| | Kích thước |
|---|---|
| `lab/server.js` trên đĩa | |
| Process trong RAM | |

Chênh nhau bao nhiêu lần?

### Lab 4 — giết tử tế (Ctrl+C)

Có thấy dòng `[SIGINT] duoc bao truoc, dang don dep...` không?  ☐ Có  ☐ Không

```
$ time curl -4 http://localhost:8080
(dán vào đây — so con số với 2,155s ở Bài 00)

$ netstat -ano | grep 8080
(phòng 8080 đã biến mất khỏi sổ chưa?)
```

### Lab 5 — giết ép (`taskkill //F`)

Có thấy dòng `[SIGINT]` không?  ☐ Có  ☐ Không

Khác biệt tôi quan sát được giữa Ctrl+C và `taskkill //F`:

### Lab 6 — biến môi trường

Cửa sổ 1: `echo $BI_MAT` →
Cửa sổ 2: `echo $BI_MAT` →

---

## Lỗi đã gặp

| Lỗi | Nguyên nhân | Cách xử lý |
|---|---|---|
| | | |

---

## Chỗ tôi hiểu sai và đã được sửa

| Tôi nghĩ | Thực tế |
|---|---|
| | |

---

## Câu hỏi còn treo

-

---

## Lệnh muốn nhớ

```bash
# Ai đang giữ port này?  (Windows)
netstat -ano | grep 8080
tasklist //FI "PID eq <PID>"

# Giết process
taskkill //PID <PID>        # tử tế  — app ĐƯỢC BÁO TRƯỚC
taskkill //F //PID <PID>    # ép     — app KHÔNG kịp nói gì

# Trên Linux (Bài 02 trở đi)
ss -tlnp | grep 8080        # ai giữ port
ps aux | grep java          # process nào đang chạy
kill <PID>                  # SIGTERM — được báo trước
kill -9 <PID>               # SIGKILL — chết ngay
dmesg | grep -i "killed process"    # kernel đã giết ai vì OOM
```

---

## Ba câu mang theo

1. **Hết CPU thì app CHẬM (504). Hết RAM thì app CHẾT (502).**
2. **Kernel giữ sổ phòng.** Process chết → kernel xóa tên → gõ cửa thì `refused`.
3. **Process chết là hết. Service thì có người dựng dậy.** Vì không ai ngồi trước server.
