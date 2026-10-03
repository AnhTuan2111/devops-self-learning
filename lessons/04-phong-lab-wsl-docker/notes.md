# Ghi chú — Bài 04

> Chỗ ghi thô. Viết xấu cũng được. Dán **nguyên văn** output trên máy bạn vào các khối trống; sau này
> đọc lại phần này hữu ích hơn lý thuyết nhiều, vì nó là thứ chính mình đã chạy và đã vấp.
>
> Đừng dán địa chỉ IP thật, tên máy hay tên user nếu bạn định công khai tệp này; thay bằng `<ip>`,
> `<may>`, `<user>`.

**Ngày học:**

---

## Kết quả lab thật

### Lab 1 — Cài Ubuntu trên WSL2

Lệnh cài đã dùng, và máy có đòi khởi động lại không:

```
PS> wsl --install -d Ubuntu

```

```
PS> wsl -l -v

```

Cột `VERSION` của Ubuntu là: ___

```
$ uname -r

$ ps -p 1 -o pid,comm

```

Dòng đầu tiên của `sudo dmesg | less`:

```

```

### Lab 2 — Đi lại, đọc và sửa tệp

```
$ pwd

$ echo $PATH

$ which ls

$ type cd

```

Ba lỗi tự gây ra, chép nguyên văn:

```
$ cd /Etc

$ ls /root

$ sudo ls /root

```

### Lab 3 — stdout và stderr

```
$ ls /etc/hostname /khong-co

$ ls /etc/hostname /khong-co > ketqua.txt

$ cat ketqua.txt

$ ls /etc/hostname /khong-co 2> /dev/null

$ ls -l /proc/$$/fd

```

Lệnh `openssl` của Bài 00, **không** có `2>/dev/null` — những dòng nào chen vào?

```

```

Cùng lệnh, **có** `2>/dev/null`:

```

```

Những dòng biến mất (tức `s_client` ghi ra số 2):

### Lab 4 — Signal thật

| Gửi | Cửa sổ 1 in gì | `echo $?` | 128 + số signal |
|---|---|---|---|
| `kill <PID>` tới `sleep 1000` | | | 128 + 15 = 143 |
| `kill -9 <PID>` tới `sleep 1000` | | | 128 + 9 = 137 |
| `kill <PID>` tới `nghe-signal.sh` | | | (handler tự chọn) |
| `kill -9 <PID>` tới `nghe-signal.sh` | | | |

Handler có kịp in dòng `[SIGTERM] duoc bao truoc…` với `kill -9` không?  ☐ Có  ☐ Không

### Lab 5 — Docker Desktop và hello-world

```
$ docker version

```

```
$ docker run hello-world

```

Lần chạy thứ hai, dòng nào không còn?

```
PS> wsl -l -v

```

### Lab 6 — Tắt daemon

Trong Git Bash:

```
$ docker version

```

Trong Ubuntu:

```
$ docker version

```

- Ai viết ra thông báo?
- Client có đang chạy không? Bằng chứng nằm ở dòng nào?
- Đầu bên kia thiếu gì?
- Sau khi mở lại Docker Desktop, phần `Server` có quay về không?

---

## Phép đo đối chứng: refused trên Linux và trên Windows

Dự đoán của tôi **trước khi chạy** (bao nhiêu mili-giây, và vì sao):

```
$ time curl -4 -o /dev/null http://127.0.0.1:9999

```

| | Windows, Git Bash (Bài 01) | Linux, Ubuntu trên WSL2 (bài này) |
|---|---|---|
| curl báo `after … ms` | 2076 ms | |
| `real` của `time` | 2,155 s | |

Chênh lệch nói lên điều gì về hai kernel?

---

## Lỗi đã gặp ngoài kịch bản

| Thấy gì | Ở đâu | Nguyên nhân | Đã sửa bằng |
|---|---|---|---|
| | | | |

---

## Câu hỏi còn treo

-
