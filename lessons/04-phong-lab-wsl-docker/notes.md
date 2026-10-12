# Ghi chú Bài 04

> Chỗ ghi thô. Viết xấu cũng được. Dán **nguyên văn** output trên máy bạn vào các khối trống; sau này
> đọc lại phần này hữu ích hơn lý thuyết nhiều, vì nó là thứ chính mình đã chạy và đã vấp.
>
> Đừng dán địa chỉ IP thật, tên máy hay tên user nếu bạn định công khai tệp này; thay bằng `<ip>`,
> `<may>`, `<user>`.

**Ngày học:**

---

## Kết quả lab thật

### Lab 1: Cài Ubuntu trên WSL2

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

```

Năm dòng cuối của `sudo dmesg | tail -5`:

```

```

### Lab 2: Đi lại, đọc và sửa tệp

```
$ pwd

$ cat ghi-chu.txt

```

Ba lỗi tự gây ra, chép nguyên văn:

```
$ cd /Etc

$ ls /root

$ sudo ls /root

```

### Lab 3: Chạy app mẫu

Hai dòng cuối khi app khởi động xong:

```

```

```
$ curl http://localhost:8080/

$ curl -i http://localhost:8080/ghi-chu

```

Dòng có chữ `refused` trong log của app, chép nguyên văn:

```

```

Dòng đó nói app đã gọi tới đâu, và vì sao bị từ chối?

### Lab 4: Giết app bằng hai cách

| Cách dừng | Dòng cuối app in ra | `echo $?` | 128 + số signal |
|---|---|---|---|
| `kill <PID>` | | | 128 + 15 = 143 |
| `kill -9 <PID>` | | | 128 + 9 = 137 |
| Ctrl+C (đoán trước rồi mới bấm) | | | 128 + 2 = ? |

### Lab 5: Chạy hai bản cùng lúc

Thông báo của bản thứ hai, và exit status của nó:

```

```

Process đang giữ port 8080 tìm được bằng lệnh nào, PID bao nhiêu?

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

## Phản ứng thật của mình

Trích nguyên văn từ buổi học (05/10/2026), để dùng làm chất liệu khi viết lại bài.

- Về Git Bash: "lệnh đó đã được biên dịch sang windows để chạy trên máy windows nhưng mà nó cũng chỉ là hàng đè tem thôi chứ không phải linux thật"
- Trả lời "cần gì để thấy OOM killer": "cần có linux trên máy" (thiếu chữ kernel; được sửa thành kernel Linux, không chỉ các lệnh)
- Về máy ảo: "máy ảo tách biệt khỏi máy vật lý nhờ việc kernel của nó được cấp phát vùng tài nguyên riêng nên không thể động tới tài nguyên của máy thật được"

---

## Lỗi đã gặp ngoài kịch bản

| Thấy gì | Ở đâu | Nguyên nhân | Đã sửa bằng |
|---|---|---|---|
| | | | |

---

## Câu hỏi còn treo

-
