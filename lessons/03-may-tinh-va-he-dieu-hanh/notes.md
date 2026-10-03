# Ghi chú — Bài 03

> Chỗ ghi thô. Viết xấu cũng được. Sau này đọc lại phần này hữu ích hơn lý thuyết nhiều,
> vì nó là thứ *chính mình* đã vấp.

**Ngày học:** 25/09 – 03/10/2026

---

## Kết quả lab thật

### Lab 1 — sinh ra process

```
PID = 3464  |  dang giu phong 8080
Ctrl+C de tat tu te  ·  taskkill //F //PID 3464 de giet ep
```

PID tôi nhận được: 3464, rồi 27348, rồi 29140 — mỗi lần chạy lại là một PID mới.

### Lab 2 — đi ngược PORT → PID → tên chương trình

```
$ curl http://localhost:8080
con song

$ netstat -ano | grep 8080
  TCP    0.0.0.0:8080           0.0.0.0:0              LISTENING       29140
  TCP    [::]:8080              [::]:0                 LISTENING       29140
  TCP    [::1]:52835            [::1]:8080             TIME_WAIT       0

$ tasklist //FI "PID eq 29140"
Image Name                     PID Session Name        Session#    Mem Usage
========================= ======== ================ =========== ============
node.exe                     29140 Console                    1     54,532 K
```

PID trong `netstat` **có khớp** với PID mà Node tự in ra không?  ☑ Có  ☐ Không

Dòng `TIME_WAIT` với PID `0` là dấu vết kết nối của chính `curl` vừa đóng (đi qua `::1`), không phải
người ngồi trong phòng.

### Lab 3 — file trên đĩa vs process trong RAM

| | Kích thước |
|---|---|
| `lab/server.js` trên đĩa | 1.188 byte |
| Process trong RAM | 54.532 KB (cột `Mem Usage` ở Lab 2) |

Chênh nhau bao nhiêu lần? Khoảng **47.000 lần**. Để so: một process `java.exe` tự bật để thử chiếm
732.832 KB, gấp hơn 13 lần process Node.

### Lab 4 — giết tử tế (Ctrl+C)

Có thấy dòng `[SIGINT] duoc bao truoc, dang don dep...` không?  ☑ Có  ☐ Không (PID 3464, rồi PID 29140)

```
$ time curl -4 http://localhost:8080
curl: (7) Failed to connect to localhost port 8080 after 2030 ms: Could not connect to server

real    0m2.087s
user    0m0.015s
sys     0m0.000s

$ netstat -ano | grep 8080
(không in gì: phòng 8080 đã biến mất khỏi sổ)
```

2,087 giây, gần với 2,155 giây ở Bài 01: cùng một hành vi thử lại của Windows khi bị từ chối kết nối.

### Lab 5 — giết ép (`taskkill //F`)

Có thấy dòng `[SIGINT]` không?  ☐ Có  ☑ Không (PID 27348)

Khác biệt tôi quan sát được giữa Ctrl+C và `taskkill //F`: Ctrl+C in hai dòng `[SIGINT]` rồi mới thoát;
`taskkill //F` làm process biến mất mà cửa sổ không in thêm gì. Ngay sau đó:

```
$ curl http://localhost:8080
curl: (7) Failed to connect to localhost port 8080 after 2252 ms: Could not connect to server

$ netstat -ano | grep 8080
(không in gì: kernel đã xoá tên khỏi sổ phòng)
```

### Lab 6 — biến môi trường

Cửa sổ 1: `echo $BI_MAT` → `xin chao`
Cửa sổ 2: `echo $BI_MAT` → (dòng trống)

```
# cửa sổ 1
$ echo $$
1227
$ bash
$ echo $$
1493
$ echo $PPID
1227
$ exit
$ node -e "console.log(process.env.BI_MAT)"
xin chao

# cửa sổ 2
$ node -e "console.log(process.env.BI_MAT)"
undefined
```

---

## Lỗi đã gặp

| Lỗi | Nguyên nhân | Cách xử lý |
|---|---|---|
| `Error: Cannot find module '…\devops_selfLearning\lab\server.js'` | Chạy `node lab/server.js` từ thư mục gốc của repo. Node tính đường dẫn tương đối từ **thư mục làm việc (cwd) của process**, không từ chỗ file nằm | `cd` vào thư mục của bài rồi mới chạy |
| `Error: listen EADDRINUSE: address already in use :::8080` (kèm `syscall: 'listen'`) | Một process `java.exe` khác đang giữ 8080. Kernel tra sổ phòng và từ chối lời xin `listen`; Node không bắt lỗi này nên process chết luôn | Tắt process đang giữ phòng, hoặc đổi port |

---

## Chỗ tôi hiểu sai và đã được sửa

| Tôi nghĩ | Thực tế |
|---|---|
| 502 lúc cao điểm là vì RAM đầy nên app không đủ chỗ để khởi động; khởi động lại thì phải giết bớt process khác | App **đang chạy** thì bị kernel giết để lấy lại RAM. RAM của nó được thu hồi ngay, nên khởi động lại chỉ là tạo một process mới vào chỗ trống |
| Đổi biến môi trường không ảnh hưởng app vì app đã "nạp sẵn" giá trị | Process giữ **bản sao riêng** của biến môi trường từ lúc được tạo; dù đọc lại bao nhiêu lần nó vẫn thấy giá trị cũ. Muốn giá trị mới thì phải tạo process mới |
| Process mồ côi thì tài nguyên bị thu hồi, nên đóng terminal là có 502 | Mồ côi chỉ đổi PPID; process vẫn giữ RAM và giữ port. Tài nguyên chỉ bị thu hồi khi chính process chết. RAM được thu hồi là **hệ quả** của việc chết, không phải nguyên nhân của 502 |
| Viết một đoạn C chạy thẳng lệnh CPU là lách được kernel, vì kernel cũng viết bằng C | Ranh giới do **CPU cưỡng chế** (user mode / kernel mode), không do ngôn ngữ. Đoạn C đó vẫn là một process trong user space |
| Nginx master chạy bằng root nên trước khi hạ quyền nó chạm được phần cứng | root là một **user**, kernel đọc nó để quyết định có cho phép hay không; kernel mode là một **chế độ của CPU**. Process root vẫn ở user space, vẫn phải xin qua syscall |
| Server mất điện thì người dùng gặp "lỗi TCP" | Gặp **timeout**: không còn kernel nào để gửi lời từ chối, nên không ai viết ra lỗi cả |
| Bị `kill -9` thì các object trong RAM không được dọn | RAM được kernel thu hồi hết. Thứ bị bỏ dở là những thứ nằm ngoài process: connection treo ở phía database, transaction dở, log còn trong bộ đệm |
| OOM killer giết process chiếm quá nửa RAM, và chắc chắn giết nó | Chấm điểm **chủ yếu theo RAM** và **so với các process khác**: lớn nhất thì nhiều khả năng bị chọn nhất |
| Chạy `node` là chạy một process khác, nên nó không đọc được biến đặt bằng `export` | Process **con** sinh ra sau `export` nhận bản sao. Khác process không quan trọng; quan trọng là **cha của nó là ai** — Node chạy ở cửa sổ 1 in `xin chao`, ở cửa sổ 2 in `undefined` |
| Chạy lại `node server.js` có thể tự tắt bản đang chạy | Bản mới gặp `EADDRINUSE` và chết; bản cũ vẫn giữ phòng |
| systemd dựng app dậy ngay, nên người dùng chỉ thấy 502 trong chốc lát | Process mới đã chạy nhưng Spring Boot còn cần 15–60 giây mới listen 8080 — **process đang chạy chưa phải app sẵn sàng**. Nếu script vẫn ngốn RAM thì app bị giết, dựng dậy, rồi lại bị giết |

---

## Ý tự nghĩ ra ngoài kịch bản

- Ngay sau khi app được dựng lại, JVM còn nhỏ, nên script sao lưu có thể trở thành process lớn nhất và
  bị OOM killer giết thay. Hệ quả: bản sao lưu đêm đó thất bại mà không ai biết.

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

# Trên Linux (Bài 04 trở đi)
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
