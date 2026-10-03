# Bài 01 — Máy tính, Hệ điều hành, Process: "server" thật ra là cái gì

<img src="../../assets/readme/glyph/01.svg" width="132" align="right" alt="Ấn ký của Bài 01">

> **Module M0** · Nền tảng tối thiểu · 5–8 giờ học (đọc trước, đối thoại, lab, ghi chép) · không cần WSL, không cần Docker

**Bài giảng đầy đủ:** [`index.html`](index.html) —
[bản online](https://anhtuan2111.github.io/devops-self-learning/lessons/01-may-tinh-va-he-dieu-hanh/)

File này là **vở bài tập** (workbook) của bài. Phần giảng vì sao, sơ đồ đầy đủ và ví dụ nằm
trong `index.html`; ở đây chỉ giữ những mô hình đã chốt, bảng tra, các bước lab kèm lý do và
kết quả kỳ vọng, cùng danh sách tự kiểm tra. Mỗi lab có kèm con số của một lần chạy thật; output
đầy đủ nằm trong [`notes.md`](notes.md).

---

## Bài này trả lời ba câu

Cả bài xoay quanh ba câu hỏi rất thực tế, và mỗi phần bên dưới là một mảnh để ghép thành câu
trả lời. Hãy thử tự trả lời trước khi đọc, rồi so lại khi làm xong lab.

1. Chọn cấu hình server thì **con số nào** sẽ hết trước?
2. Vì sao **hết RAM thì app CHẾT**, còn hết CPU thì app chỉ **CHẬM**?
3. Vì sao **app chết thì website sập** — chuỗi nhân quả đầy đủ tới con số 502?

---

## Thuật ngữ

| Thuật ngữ | Tiếng Việt | Định nghĩa một câu |
|---|---|---|
| Server | máy chủ | Một máy tính bình thường chạy 24/7, không màn hình, và không có ai ngồi trước nó. |
| CPU | bộ xử lý | Thành phần thực thi lệnh; chỉ làm việc được với dữ liệu đang nằm trong RAM. |
| RAM | bộ nhớ trong | Vùng nhớ nhanh, nhỏ, đắt, mất sạch khi tắt điện — nơi mọi process đang chạy phải nằm. |
| Disk | ổ đĩa | Vùng lưu trữ lớn, rẻ, chậm, còn nguyên khi tắt điện — nơi file `.jar` nằm im. |
| Process | tiến trình | Một chương trình **đang chạy**, được kernel cấp PID, vùng RAM riêng và các tài nguyên riêng. |
| PID | mã tiến trình | Con số kernel dùng để gọi tên một process cụ thể. |
| Thread | luồng | Một mạch thực thi bên trong process; các thread của cùng process chia chung vùng RAM. |
| Kernel | nhân hệ điều hành | Phần duy nhất của hệ điều hành được chạm trực tiếp vào phần cứng. |
| User space | không gian người dùng | Vùng nơi mọi ứng dụng (Spring Boot, Nginx, bash) chạy, không có quyền chạm phần cứng. |
| Syscall | lời gọi hệ thống | Cách một process nhờ kernel làm hộ một việc cần phần cứng: mở file, mở port, tạo process. |
| Signal | tín hiệu | Thông điệp ngắn kernel gửi tới process, ví dụ "hãy dừng lại" (`SIGTERM`) hay "chết ngay" (`SIGKILL`). |
| OOM killer | bộ giết khi hết bộ nhớ | Cơ chế của kernel Linux chọn và giết một process khi RAM cạn, để cả máy không treo. |
| Service | dịch vụ | Một process có "người trông" — tự khởi động cùng máy và tự dựng dậy khi chết. |

---

## Server là gì

Một server chỉ là một máy tính bình thường, khác laptop của bạn đúng ba điểm: nó chạy
**24/7**, nó **không có màn hình**, và — quan trọng nhất — **không có ai ngồi trước nó**. Hai
điểm đầu chỉ là chuyện phần cứng, còn điểm thứ ba thay đổi toàn bộ cách phải vận hành, bởi vì
mọi thứ trên laptop vẫn "tự lành" được là nhờ có bạn ở đó.

> Không ai bấm OK. Không ai khởi động lại. Không ai nhìn thấy khi nó báo lỗi.

Nói cách khác, gần như mọi kỹ thuật trong lộ trình này đều sinh ra để **thay thế một con người không có mặt ở đó**. Gặp
một công cụ mới, hãy thử hỏi: nó đang làm thay việc gì mà một người trực lẽ ra sẽ làm?

---

## Bốn tài nguyên

Mọi con số trong bảng cấu hình server quy về bốn loại tài nguyên, định nghĩa như sau.

| Tài nguyên | Là gì | Đơn vị đo | Bền vững |
|---|---|---|---|
| **CPU** | Đơn vị thực thi lệnh; mỗi *core* tại một thời điểm chạy một luồng lệnh. "vCPU" là core ảo được chia cho máy ảo. | số core | — |
| **RAM** | Nơi chứa dữ liệu và mã lệnh **đang được dùng**; nhanh hơn đĩa nhiều bậc độ lớn | GB | **volatile** — mất điện là mất sạch |
| **Disk** | Nơi lưu dữ liệu bền vững: file chương trình, database, log | GB | **persistent** — tắt máy vẫn còn |
| **Network** | Card mạng và đường truyền nối máy với bên ngoài | Mbps | — |

### Ẩn dụ hỗ trợ ghi nhớ: người, mặt bàn, cái tủ

Bốn định nghĩa trên chính xác nhưng khô, và điều quan trọng không phải từng loại riêng lẻ mà là
**quan hệ** giữa chúng. Phép so sánh dưới đây **không phải định nghĩa**:

```
DISK  = cái tủ hồ sơ   to, rẻ, CHẬM     · tắt điện vẫn còn
RAM   = mặt bàn        nhỏ, đắt, NHANH  · tắt điện SẠCH TRƠN
CPU   = người làm việc · chỉ làm được với thứ ĐANG TRÊN BÀN
```

Quy luật rút ra: **muốn dùng file nào, phải bê nó từ tủ lên bàn trước** — đó chính là 30 giây
JVM đọc hàng nghìn file class từ đĩa lên RAM lúc khởi động.

> **Giới hạn của ẩn dụ.** "Một người, một cái bàn" gợi ý mỗi lúc chỉ có một việc chạy; thực tế
> CPU nhiều core chạy song song thật, và kernel còn luân phiên hàng trăm chương trình trên cùng
> một core. Ẩn dụ cũng bỏ qua **cache**, bộ nhớ nhỏ nằm ngay trong chip CPU, nhanh hơn RAM nhiều bậc —
> nói cho đúng thì "mặt bàn" là cache, còn RAM đã là cái giá sách kê cạnh bàn.

Điều đáng học nhất không phải là định nghĩa từng loại, mà là **mỗi loại khi cạn thì gây ra
triệu chứng khác nhau**. Đây chính là bảng tra dùng khi một server bắt đầu có vấn đề:

| Tài nguyên | Hết thì sao | Mức độ |
|---|---|---|
| **CPU** | công việc xếp hàng chờ | Chậm |
| **RAM** | **kernel GIẾT một process** | **Chết** |
| **DISK** | không ghi được gì nữa | Lỗi rất lạ |
| **NETWORK** | gói tin bị vứt bỏ | Timeout |

Sự bất đối xứng giữa CPU và RAM là trọng tâm của bài. Hết CPU thì công việc chỉ phải chờ tới
lượt, nên mọi thứ chậm đi nhưng vẫn chạy. Hết RAM thì không có "chờ" nào cả: dữ liệu phải có
chỗ để nằm, nên kernel buộc phải giải phóng chỗ bằng cách giết một process.

> **Hết CPU thì app CHẬM. Hết RAM thì app CHẾT.**

Nối điều này với bảng triệu chứng của Bài 00, ta thấy hai mã lỗi quen thuộc thật ra là hai
loại tài nguyên đã cạn:

```
Hết CPU → app chậm    → Nginx hết kiên nhẫn  → 504
Hết RAM → app bị giết → Nginx gõ không ai mở → 502
```

**502 và 504 không phải hai mã lỗi cần học thuộc — chúng là hai loại tài nguyên đã cạn.**

---

## Process

Cần phân biệt thật rõ **chương trình** (một file nằm trên đĩa) với **process** (chương trình
đó đang chạy). File `app.jar` không chiếm RAM, không giữ port và không ai gọi được; chỉ khi
được chạy, nó mới trở thành một process có PID, có vùng RAM, và ngồi trong một "phòng".

```
app.jar trên đĩa          →          process đang chạy
────────────────                     ─────────────────
một file, nằm im                     PID 4123
không chiếm gì                       chiếm 800 MB RAM
không ai gọi được                    đang giữ phòng 8080
copy được, xóa được                  kill được — và chết là hết
```

**"Người ngồi trong phòng 8080" ở Bài 00 — chính là process này.**

Mỗi process sở hữu riêng một bộ tài nguyên do kernel cấp: vùng RAM · danh sách file đang mở ·
thư mục làm việc · **biến môi trường** · **user chạy nó**. Hệ quả dễ bị bỏ qua nhất nằm ở biến
môi trường:

> Biến môi trường là thuộc tính của **process**, không phải của máy.
> Đó là lý do `export` ở terminal này không ảnh hưởng terminal kia,
> và là cách mật khẩu, cấu hình được đưa vào ứng dụng ở Bài 08.

### Process vs Thread

Process là đơn vị **cô lập** (mỗi process có vùng nhớ riêng), còn thread là đơn vị **thực thi**
(nhiều thread cùng làm việc trong một vùng nhớ chung). Ẩn dụ phòng làm việc diễn đạt đúng quan
hệ này:

```
PROCESS = một CĂN PHÒNG riêng, mặt bàn riêng
THREAD  = nhiều NGƯỜI trong CÙNG một phòng, chung mặt bàn
```

Một ứng dụng Spring Boot là **1 process** chứa hàng trăm thread (mỗi request thường được một
thread xử lý). Hệ quả thứ nhất: **giết process là giết mọi thread** bên trong nó cùng lúc. Hệ
quả thứ hai: vì chung mặt bàn, **một thread làm tràn RAM thì cả process chết**, kéo theo mọi
request đang được xử lý dở.

---

## Kernel và syscall

Ứng dụng của bạn **không được** chạm trực tiếp vào phần cứng. Mọi việc cần đến CPU, RAM, đĩa
hay mạng đều phải **xin kernel làm hộ** thông qua một lời gọi hệ thống (syscall). Sự phân chia
này tồn tại vì an toàn: nếu mọi chương trình tự ý ghi vào đĩa hay chiếm card mạng, một chương
trình lỗi có thể phá cả máy.

```
USER SPACE   Spring Boot · Nginx · PostgreSQL · bash
                        │  syscall
KERNEL       độc quyền phần cứng
                        ▼
             CPU   RAM   DISK   NETWORK
```

Khi app gọi `listen(8080)`, thực chất nó **xin kernel ghi tên mình vào bảng ánh xạ port sang
process**. Từ lúc đó, mọi gói tin gửi tới port 8080 đều được kernel chuyển cho đúng process ấy.

*Ẩn dụ hỗ trợ ghi nhớ:* mở rộng tòa nhà của Bài 00, **kernel là người quản lý tòa nhà, giữ sổ
phòng** — và `listen(8080)` là xin ghi vào sổ dòng *"phòng 8080: PID 4123"*. Chỉ từ hình ảnh đó,
ta giải thích được cả ba hiện tượng đã gặp ở Bài 00:

```
Address already in use  →  kernel xem sổ, phòng đã có tên người khác
kill → refused          →  process chết, kernel XÓA TÊN khỏi sổ ngay
port <1024 cần root     →  kernel kiểm tra quyền TRƯỚC khi ghi sổ
```

---

## Khi process chết

Một process có thể chết theo nhiều cách, và cách nó chết quyết định nó có kịp **dọn dẹp** hay
không — đóng kết nối database, hoàn tất transaction, ghi nốt những dòng log cuối.

| Cách chết | Kịp dọn dẹp? |
|---|---|
| Tự kết thúc / exception | có |
| `SIGTERM` (`kill <pid>`) | có, **được báo trước** |
| `SIGKILL` (`kill -9`) | không, **chết ngay** |
| **OOM killer** | không, như SIGKILL |

Khác biệt giữa `SIGTERM` và `SIGKILL` nằm ở chỗ process có được nghe thông báo hay không.
`SIGTERM` là một lời đề nghị mà process nhận được và tự xử lý; `SIGKILL` thì kernel thực thi
thẳng, process không hề biết:

```
SIGTERM  "Anh thu xếp rồi đi."  → @PreDestroy, đóng pool, flush log
SIGKILL  "Ra ngay."             → connection treo, transaction dở, mất log cuối
```

### OOM Killer

Khi RAM cạn, kernel không có lựa chọn "chờ": nó **phải** giết một process để lấy lại chỗ. Nó
chấm điểm từng process (`oom_score`), chủ yếu dựa trên lượng RAM đang chiếm, rồi giết process
điểm cao nhất — và **trên một server chạy Spring Boot, đó gần như luôn là JVM**.

```
Triệu chứng:  app BIẾN MẤT · log ứng dụng TRỐNG TRƠN · không ai đụng vào
```

Log ứng dụng trống không phải vì không có gì xảy ra, mà vì app bị SIGKILL nên không kịp viết
dòng nào. Dấu vết vì thế nằm ở một nơi khác: **log của kernel**.

```bash
dmesg | grep -i "killed process"
```

---

## Chuỗi đầy đủ: từ RAM cạn tới 502

Ghép tất cả các mảnh trên lại, ta có câu trả lời cho câu hỏi thứ ba của bài. Đây là một chuỗi
nhân quả bảy bước, và điểm cần thấm là người dùng chỉ nhìn thấy bước cuối cùng:

```
1 RAM cạn
2 kernel chọn JVM (ăn RAM nhiều nhất)
3 SIGKILL — process biến mất, không kịp log
4 kernel XÓA TÊN khỏi sổ phòng: 8080 → (trống)
5 Nginx gõ cửa 127.0.0.1:8080
6 kernel: "không có ai ở đây"        ← Connection refused
7 Nginx dịch cho người dùng:        502 Bad Gateway
```

> Người dùng thấy **502**, nhưng nguyên nhân thật ở **bước 1** — sáu bước phía trước.

---

## Process vs Service

Một process chết là hết: không ai dựng nó dậy, và nếu máy khởi động lại thì nó cũng không tự
chạy. Trên laptop, người dựng dậy là bạn. Trên server không có ai, nên cần một chương trình
khác đóng vai người trực — và process được trông như vậy gọi là **service**.

| | Process | Service |
|---|---|---|
| Chết thì sao | **hết, không ai dựng dậy** | tự khởi động lại |
| Máy reboot | không tự chạy | tự chạy |
| Ai trông | — | `systemd`, Docker hoặc Kubernetes |

```
Docker      trông coi các container trên một máy      → Bài 12
Kubernetes  trông coi container trên cả một cụm máy   → Bài 25
```

Hai công cụ, **cùng một ý tưởng**: thay thế người trực.

---

## Lab

Mục tiêu của phần lab là có một "người ngồi trong phòng" thật để quan sát nó sinh ra, bị tìm
thấy, và chết theo hai cách khác nhau. Mọi bước chạy trong **Git Bash** và cần **2 cửa sổ
terminal**. Mỗi bước ghi rõ làm để thấy gì, kết quả kỳ vọng, và nếu khác đi thì nghĩa là gì.
Kết quả kỳ vọng dưới đây là dự đoán dựa trên cách hệ điều hành hoạt động — output thật trên
máy bạn hãy dán vào [`notes.md`](notes.md).

Lưu ý nhỏ về cú pháp: trong Git Bash phải viết `//FI`, `//F` thay vì `/FI`, `/F`, bởi vì Git
Bash tự đổi mọi thứ bắt đầu bằng `/` thành đường dẫn file; dấu `//` ngăn việc đổi đó.

### Lab 1 — sinh ra một process

```bash
node lab/server.js            # ghi lại PID nó in ra
```

File `lab/server.js` là một web server nhỏ nhất có thể: nó giữ phòng 8080 và in ra PID của
chính nó. Kỳ vọng thấy dòng `PID = <số> | dang giu phong 8080`. Nếu thay vào đó là lỗi
`EADDRINUSE`, nghĩa là phòng 8080 đã có người khác ngồi (có thể là một Spring Boot bạn quên
tắt) — đó chính là `Address already in use` trong bảng ở trên, và Lab 2 sẽ giúp tìm ra ai.

Chạy lệnh này **từ thư mục của bài**. Nếu gặp `Error: Cannot find module '…\lab\server.js'` thì file
không mất: bạn đang đứng sai thư mục. Node tính đường dẫn tương đối từ **thư mục làm việc của
process** chứ không từ chỗ file nằm — `java -jar` cũng vậy.

### Lab 2 — đi ngược từ PORT, tới PID, tới tên chương trình (cửa sổ 2)

```bash
curl http://localhost:8080
netstat -ano | grep 8080
tasklist //FI "PID eq <PID>"
```

Đây là kỹ năng dò lỗi quan trọng nhất của bài: từ một con số port, tìm ra chương trình nào
đang giữ nó. `curl` xác nhận có người trong phòng (kỳ vọng in `con song`). `netstat -ano` in
sổ phòng của kernel; hãy tìm dòng trạng thái `LISTENING` (có thể là `0.0.0.0:8080` hoặc
`[::]:8080`), cột cuối cùng là PID. `tasklist` dịch PID đó ra tên chương trình — kỳ vọng là
`node.exe`. PID trong `netstat` phải **khớp** với PID mà Node tự in ở Lab 1; nếu không khớp,
nghĩa là có một process khác đang giữ phòng và Node của bạn đã không khởi động được.

Lần chạy thật: hai dòng `LISTENING` (`0.0.0.0:8080` và `[::]:8080`) cùng PID 29140, khớp với PID Node
in ra; `tasklist` cho `node.exe 29140 … 54,532 K`. Dòng `TIME_WAIT` với PID `0` là dấu vết kết nối
của chính `curl` vừa đóng, không phải người ngồi trong phòng.

**Tự gây lỗi thêm — hai process tranh một phòng.** Khi Node vẫn đang chạy, mở cửa sổ thứ ba và chạy
lại `node lab/server.js`. Kỳ vọng:

```
Error: listen EADDRINUSE: address already in use :::8080
  code: 'EADDRINUSE',
  syscall: 'listen',
```

`syscall: 'listen'` là lời xin giữ phòng; `EADDRINUSE` là câu trả lời của kernel sau khi tra sổ.
Process mới chết, process cũ không hề hấn gì: chạy thêm một process không bao giờ đẩy được process
đang giữ phòng. Muốn chạy được thì trả phòng (tắt process cũ) hoặc đổi port.

### Lab 3 — file trên đĩa vs process trong RAM

```bash
ls -l lab/server.js
tasklist //FI "PID eq <PID>" //FO LIST
```

Bước này đặt cạnh nhau hai con số để thấy chương trình và process là hai thứ khác hẳn. File
trên đĩa chỉ khoảng 1 KB, nhưng dòng `Mem Usage` của process thường ở mức vài chục MB. Chênh
lệch lớn như vậy vì process không chỉ chứa mấy dòng script, mà chứa cả runtime Node (bộ máy
V8, thư viện chuẩn, bộ nhớ đệm) được nạp vào RAM để chạy nó — giống như JVM đứng sau mọi file
`.jar`.

Lần chạy thật: 1.188 byte trên đĩa so với 54.532 KB trong RAM, khoảng **47.000 lần**.

### Lab 4 — giết tử tế, xem phòng trống ngay

```bash
#   (ở cửa sổ 1 bấm Ctrl+C, quan sát dòng "[SIGINT] duoc bao truoc...")
time curl -4 http://localhost:8080
netstat -ano | grep 8080
```

Ctrl+C gửi tín hiệu `SIGINT` — một lời báo trước, giống `SIGTERM`. Kỳ vọng thấy Node in dòng
`[SIGINT] duoc bao truoc, dang don dep...`, chờ 1,5 giây, rồi `da dong xong, thoat tu te`. Sau
đó `curl` phải nhận `refused` (mã `(7)`), vì kernel đã xóa tên khỏi sổ phòng ngay khi process
chết; hãy so con số `time` với **2,155s** đo được ở Bài 00. Trong `netstat` không còn dòng
`LISTENING` nào ở 8080. Có thể vẫn thấy vài dòng `TIME_WAIT` với PID `0`: đó không phải người
ngồi trong phòng, mà là dấu vết của kết nối cũ đang chờ đóng hẳn, và sẽ tự biến mất sau ít phút.

Lần chạy thật: `curl: (7) … after 2030 ms`, `real 0m2.087s` — sát với 2,155 giây ở Bài 00.

### Lab 5 — giết ÉP, so sánh

```bash
node lab/server.js            # chạy lại
taskkill //F //PID <PID>      # cửa sổ tắt phụt, KHÔNG in gì
```

`taskkill //F` là cách Windows giết ép một process, tương đương `SIGKILL` trên Linux. Kỳ vọng:
cửa sổ 1 dừng ngay lập tức mà **không in dòng `[SIGINT]` nào**, vì process không hề được báo.
Đặt kết quả này cạnh Lab 4 là thấy được khác biệt cốt lõi của bài:

```
Ctrl+C       →  "[SIGINT] duoc bao truoc, dang don dep..."   ← CÓ lời trăng trối
taskkill /F  →  tắt phụt, không in gì                        ← KHÔNG kịp nói gì
```

Đó chính xác là khác biệt **SIGTERM vs SIGKILL** — và là lý do một app bị OOM killer giết để lại
log trống trơn. Nếu ở bước này bạn vẫn thấy dòng `[SIGINT]`, hãy kiểm tra lại xem PID truyền cho
`taskkill` có đúng là PID của lần chạy mới không.

### Lab 6 — biến môi trường thuộc về process

```bash
export BI_MAT="xin chao"
echo $BI_MAT                  # → xin chao
#   mở cửa sổ MỚI:
echo $BI_MAT                  # → (trống)
```

Bước này chứng minh biến môi trường là thuộc tính của process chứ không phải của máy. `export`
chỉ ghi biến vào process bash của cửa sổ 1 (và các process con mà nó sinh ra sau đó). Cửa sổ
mới là một process bash **khác**, không phải con của cửa sổ 1, nên nó không có biến đó. Kỳ vọng
dòng cuối in ra trống. Đây cũng là nền tảng của cách đưa mật khẩu và cấu hình vào ứng dụng
ở Bài 08.

Kiểm chứng thêm ở cửa sổ 1 (`$$` là PID của bash đang chạy, `$PPID` là PID của cha nó):

```bash
echo $$                                      # 1227
bash                                         # mỗi lệnh gõ vào bash là một process con, kể cả bash
echo $$                                      # 1493
echo $PPID                                   # 1227: cha chính là bash cửa sổ 1
exit
node -e "console.log(process.env.BI_MAT)"    # cửa sổ 1: xin chao   ·   cửa sổ 2: undefined
```

Hai process Node đều là "process khác", nhưng chỉ cái sinh ra từ bash cửa sổ 1, sau `export`, mới có
biến. Điều quyết định là **cha của nó là ai và nó được sinh ra lúc nào**.

---

## Chỗ hay hiểu sai

Đọc trước khi đánh dấu danh sách tự kiểm tra. Bản có giải thích đầy đủ nằm ở Bảng 9 trong `index.html`.

| Người mới hay nghĩ | Thực tế |
|---|---|
| Hết RAM thì app không đủ chỗ khởi động | App **đang chạy** bị kernel giết; RAM thu hồi ngay, khởi động lại chỉ là tạo process mới |
| App "nạp sẵn" biến môi trường nên đổi không ăn | Process giữ **bản sao riêng** từ lúc sinh; muốn giá trị mới phải tạo process mới |
| Process khác thì không đọc được biến đặt ở terminal | Con sinh ra **sau** `export` có bản sao; chỉ process không phải con mới không có |
| Chạy lại chương trình thì bản cũ tự nhường chỗ | Bản mới gặp `EADDRINUSE` và chết; bản cũ vẫn giữ phòng |
| Viết bằng C là lách được kernel | Ranh giới do **CPU** cưỡng chế, không do ngôn ngữ |
| Chạy bằng root là chạy trong kernel | root là **user**; kernel mode là **chế độ CPU**. Root vẫn ở user space |
| Server mất điện thì thấy refused hoặc 502 | Thấy **timeout**: không còn kernel nào để từ chối |
| `kill -9` làm object trong RAM không được dọn | RAM thu hồi hết; mất là thứ **ngoài process**: connection, transaction, log trong bộ đệm |
| OOM killer giết process chiếm quá nửa RAM | Chủ yếu theo RAM, **so với các process khác** |
| Có người trông coi thì 502 chỉ thoáng qua | Spring Boot cần 15–60 giây mới listen; nguyên nhân còn thì vòng lặp chết — dựng lại |

---

## Tự kiểm tra

Chỉ đánh dấu khi trả lời được bằng lời của mình, không nhìn lại tài liệu.

- [ ] Ba điểm khác nhau giữa server và laptop, và vì sao điểm thứ ba quan trọng nhất
- [ ] Vì sao hết CPU thì app chậm, hết RAM thì app chết
- [ ] Nối được: hết CPU dẫn tới 504, hết RAM dẫn tới 502, và giải thích vì sao
- [ ] Phân biệt file `.jar` trên đĩa và process đang chạy
- [ ] **Chỉ ra được process nào đang giữ một port** (từ port, tới PID, tới tên)
- [ ] Giải thích `Address already in use` bằng khái niệm "sổ phòng của kernel"
- [ ] Phân biệt process và thread, vì sao giết process là giết mọi thread
- [ ] **OOM làm gì với app**, và vì sao log ứng dụng trống trơn
- [ ] Biết tìm dấu vết OOM ở đâu khi log app không có gì
- [ ] **Phân biệt process và service**, vì sao server cần service
- [ ] Kể lại đủ 7 bước từ "RAM cạn" tới "người dùng thấy 502"

---

**Bài trước:** [00 — Bản đồ toàn cảnh](../00-ban-do-toan-canh/)
**Bài tiếp:** [02 — Phòng lab: WSL2, Docker Desktop và shell tối thiểu](../02-phong-lab-wsl-docker/)

Ghi lỗi đã gặp và chỗ hiểu sai vào [`notes.md`](notes.md).

---

## Nguồn đọc thêm

Chỉ gồm man page của Linux và tài liệu chính thức — nơi định nghĩa gốc của các khái niệm trong bài.

- `signal(7)` — danh sách tín hiệu, gồm `SIGTERM`, `SIGKILL`, `SIGINT`: https://man7.org/linux/man-pages/man7/signal.7.html
- `syscalls(2)` — danh sách lời gọi hệ thống của Linux: https://man7.org/linux/man-pages/man2/syscalls.2.html
- `bind(2)` — nơi định nghĩa lỗi `EADDRINUSE` và quyền với port đặc quyền: https://man7.org/linux/man-pages/man2/bind.2.html
- `listen(2)`: https://man7.org/linux/man-pages/man2/listen.2.html
- `environ(7)` — biến môi trường của process: https://man7.org/linux/man-pages/man7/environ.7.html
- `proc(5)` — hệ thống file `/proc`, gồm `/proc/<pid>/oom_score`: https://man7.org/linux/man-pages/man5/proc.5.html
- `systemd.service(5)` — gồm tùy chọn `Restart=`: https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html
- Node.js — sự kiện tín hiệu của process: https://nodejs.org/api/process.html#signal-events
