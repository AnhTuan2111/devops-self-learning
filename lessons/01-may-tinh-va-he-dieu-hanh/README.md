# Bài 01 — Máy tính, Hệ điều hành, Process: "server" thật ra là cái gì

> **Module M0** · Nền tảng · ~45 phút · không cần WSL, không cần Docker

📖 **Bài giảng đầy đủ:** [`index.html`](index.html) —
[bản online](https://anhtuan2111.github.io/devops-self-learning/lessons/01-may-tinh-va-he-dieu-hanh/)

File này là **workbook**: bản rút gọn để làm theo và tự chấm.

---

## Bài này trả lời ba câu

1. Thuê VPS thì **con số nào** trong bảng cấu hình sẽ hết trước?
2. Vì sao **hết RAM thì app CHẾT**, còn hết CPU thì app chỉ **CHẬM**?
3. Vì sao **app chết thì website sập** — chuỗi nhân quả đầy đủ tới con số 502?

---

## Server là gì

Một máy tính bình thường, khác laptop đúng ba điểm: chạy **24/7**, **không màn hình**,
và — quan trọng nhất — **không có ai ngồi trước nó**.

> Không ai bấm OK. Không ai khởi động lại. Không ai nhìn thấy khi nó báo lỗi.

Mọi kỹ thuật trong lộ trình (systemd, healthcheck, restart policy, monitoring, alert)
sinh ra để **thay thế một con người không có mặt ở đó**.

---

## Bốn tài nguyên

```
🗄️ DISK  = cái tủ hồ sơ   to, rẻ, CHẬM     · tắt điện vẫn còn
🪑 RAM   = mặt bàn        nhỏ, đắt, NHANH  · tắt điện SẠCH TRƠN
👤 CPU   = người làm việc · chỉ làm được với thứ ĐANG TRÊN BÀN
```

| Tài nguyên | Hết thì sao | Mức độ |
|---|---|---|
| **CPU** | công việc xếp hàng chờ | 😐 Chậm |
| **RAM** | **kernel GIẾT một process** | 💀 **Chết** |
| **DISK** | không ghi được gì nữa | 🤯 Lỗi rất lạ |
| **NETWORK** | gói tin bị vứt bỏ | ⏳ Timeout |

> **Hết CPU thì app CHẬM. Hết RAM thì app CHẾT.**

```
Hết CPU → app chậm    → Nginx hết kiên nhẫn  → 504
Hết RAM → app bị giết → Nginx gõ không ai mở → 502
```

**502 và 504 không phải hai mã lỗi cần học thuộc — chúng là hai loại tài nguyên đã cạn.**

---

## Process

```
app.jar trên đĩa          →          process đang chạy
────────────────                     ─────────────────
một file, nằm im                     PID 4123
không chiếm gì                       chiếm 800 MB RAM
không ai gọi được                    đang giữ phòng 8080
copy được, xóa được                  kill được — và chết là hết
```

**"Người ngồi trong phòng 8080" ở Bài 00 — chính là process này.**

Mỗi process sở hữu riêng: vùng RAM · bảng file descriptor · thư mục làm việc ·
**biến môi trường** · **user chạy nó**.

> Biến môi trường là thuộc tính của **process**, không phải của máy.
> Đó là lý do `export` ở terminal này không ảnh hưởng terminal kia,
> và lý do `docker run -e` hoạt động.

### Process vs Thread

```
PROCESS = một CĂN PHÒNG riêng, mặt bàn riêng
THREAD  = nhiều NGƯỜI trong CÙNG một phòng, chung mặt bàn
```

Spring Boot = **1 process**, hàng trăm thread. Hệ quả: **giết process là giết mọi thread**,
và **một thread làm tràn RAM thì cả process chết**.

---

## Kernel và syscall

App **không được** chạm phần cứng. Nó phải **xin kernel làm hộ** qua **syscall**.

```
USER SPACE   Spring Boot · Nginx · PostgreSQL · bash
                        │  syscall
KERNEL       độc quyền phần cứng
                        ▼
             CPU   RAM   DISK   NETWORK
```

**Kernel là người quản lý tòa nhà, giữ sổ phòng.** `listen(8080)` = xin kernel ghi vào sổ
*"phòng 8080 → PID 4123"*. Từ đó suy ra cả ba hiện tượng ở Bài 00:

```
Address already in use  →  kernel xem sổ, phòng đã có tên người khác
kill → refused          →  process chết, kernel XÓA TÊN khỏi sổ ngay
port <1024 cần root     →  kernel kiểm tra quyền TRƯỚC khi ghi sổ
```

### File descriptor — mọi thứ đều là file

```
fd 0 → stdin      fd 1 → stdout      fd 2 → stderr
```

> `2>/dev/null` mà bạn gõ ở Bài 00 nghĩa là: **chuyển fd số 2 vào hố đen.**

Mỗi kết nối TCP cũng là một fd. Vượt `ulimit -n` → `Too many open files` →
**process vẫn sống nhưng không nhận kết nối mới** → "lúc vào được lúc không", log không rõ ràng.

Nguyên nhân phổ biến: mở file/connection mà không đóng → trong Java, **dùng `try-with-resources`**.

---

## Khi process chết

| Cách chết | Kịp dọn dẹp? |
|---|---|
| Tự kết thúc / exception | ✅ |
| `SIGTERM` (`kill <pid>`) | ✅ **được báo trước** |
| `SIGKILL` (`kill -9`) | ❌ **chết ngay** |
| **OOM killer** | ❌ như SIGKILL |

```
SIGTERM  "Anh thu xếp rồi đi."  → @PreDestroy, đóng pool, flush log
SIGKILL  "Ra ngay."             → connection treo, transaction dở, mất log cuối
```

`docker stop` = SIGTERM → **đợi 10 giây** → SIGKILL.

### OOM Killer

RAM cạn → kernel **phải** giết ai đó → chấm điểm theo *ai ăn RAM nhiều nhất* →
**trên server Spring Boot, đó gần như luôn là JVM**.

```
Triệu chứng:  app BIẾN MẤT · log ứng dụng TRỐNG TRƠN · không ai đụng vào
```

Log trống vì app bị SIGKILL, không kịp viết. Dấu vết nằm ở **log của kernel**:

```bash
dmesg | grep -i "killed process"
journalctl -k | grep -i oom
```

---

## Chuỗi đầy đủ: từ RAM cạn tới 502

```
① RAM cạn
② kernel chọn JVM (ăn RAM nhiều nhất)
③ SIGKILL — process biến mất, không kịp log
④ kernel XÓA TÊN khỏi sổ phòng: 8080 → (trống)
⑤ Nginx gõ cửa 127.0.0.1:8080
⑥ kernel: "không có ai ở đây"        ← Connection refused
⑦ Nginx dịch cho người dùng:        502 Bad Gateway
```

> Người dùng thấy **502**, nhưng nguyên nhân thật ở **bước ①** — sáu bước phía trước.

---

## Process vs Service

| | Process | Service |
|---|---|---|
| Chết thì sao | **hết, không ai dựng dậy** | tự khởi động lại |
| Máy reboot | không tự chạy | tự chạy |
| Ai trông | — | `systemd` hoặc Docker |

```
systemd  Restart=always          → Bài 07
Docker   restart: unless-stopped → Bài 15, 20
```

Hai công cụ, **cùng một ý tưởng**: thay thế người trực.

---

## Lab

Chạy trong **Git Bash**. Cần 2 cửa sổ terminal.

```bash
# Lab 1 — sinh ra một process
node lab/server.js            # ghi lại PID nó in ra

# Lab 2 — đi ngược từ PORT → PID → tên chương trình  (cửa sổ 2)
curl http://localhost:8080
netstat -ano | grep 8080
tasklist //FI "PID eq <PID>"

# Lab 3 — file trên đĩa vs process trong RAM
ls -l lab/server.js
tasklist //FI "PID eq <PID>" //FO LIST

# Lab 4 — giết tử tế, xem phòng trống ngay
#   (ở cửa sổ 1 bấm Ctrl+C, quan sát dòng "[SIGINT] duoc bao truoc...")
time curl -4 http://localhost:8080
netstat -ano | grep 8080

# Lab 5 — giết ÉP, so sánh
node lab/server.js            # chạy lại
taskkill //F //PID <PID>      # cửa sổ tắt phụt, KHÔNG in gì

# Lab 6 — biến môi trường thuộc về process
export BI_MAT="xin chao"
echo $BI_MAT                  # → xin chao
#   mở cửa sổ MỚI:
echo $BI_MAT                  # → (trống)
```

**Điểm của Lab 4 vs Lab 5:**

```
Ctrl+C       →  "[SIGINT] duoc bao truoc, dang don dep..."   ← CÓ lời trăng trối
taskkill /F  →  tắt phụt, không in gì                        ← KHÔNG kịp nói gì
```

Đó chính xác là khác biệt **SIGTERM vs SIGKILL** — và là lý do OOM để lại log trống.

---

## Tự kiểm tra

- [ ] Ba điểm khác nhau giữa server và laptop, và vì sao điểm thứ ba quan trọng nhất
- [ ] Vì sao hết CPU thì app chậm, hết RAM thì app chết
- [ ] Nối được: hết CPU → 504, hết RAM → 502, và giải thích vì sao
- [ ] Phân biệt file `.jar` trên đĩa và process đang chạy
- [ ] **Chỉ ra được process nào đang giữ một port** (port → PID → tên)
- [ ] Giải thích `Address already in use` bằng khái niệm "sổ phòng của kernel"
- [ ] Phân biệt process và thread, vì sao giết process là giết mọi thread
- [ ] Giải thích con số `2` trong `2>/dev/null`
- [ ] **OOM làm gì với app**, và vì sao log ứng dụng trống trơn
- [ ] Biết tìm dấu vết OOM ở đâu khi log app không có gì
- [ ] **Phân biệt process và service**, vì sao server cần service
- [ ] Kể lại đủ 7 bước từ "RAM cạn" tới "người dùng thấy 502"

---

**Bài trước:** [00 — Bản đồ toàn cảnh](../00-ban-do-toan-canh/)
**Bài tiếp:** [02 — Dựng phòng lab: WSL2 Ubuntu + Docker Desktop](../02-dung-phong-lab/)

Ghi lỗi đã gặp và chỗ hiểu sai vào [`notes.md`](notes.md).
