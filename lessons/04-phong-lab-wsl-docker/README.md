# Bài 04 — Phòng lab: WSL2, Docker Desktop và shell tối thiểu

<img src="../../assets/readme/glyph/04.svg" width="132" align="right" alt="Ấn ký của Bài 04">

> **Module M0** · Nền tảng tối thiểu · 3–5 giờ học (đọc trước, đối thoại, lab, ghi chép) · cần quyền quản trị Windows và Docker Desktop đã cài

**Bài giảng đầy đủ:** [`index.html`](index.html) —
[bản online](https://anhtuan2111.github.io/devops-self-learning/lessons/04-phong-lab-wsl-docker/) ·
**Phụ lục Lịch sử WSL:** [`lich-su-wsl.html`](lich-su-wsl.html)

File này là **vở bài tập** của bài: bảng tra, các bước lab kèm lý do và kết quả kỳ vọng, danh sách tự
kiểm tra. Phần giảng vì sao, sơ đồ và ảnh nằm trong `index.html`; output thật của bạn ghi vào
[`notes.md`](notes.md).

---

## Câu hỏi của bài

Bài 03 kết thúc ở câu hỏi: **Server thật chạy Linux, còn mọi lab tới giờ chạy trên Windows. Làm sao có
một máy Linux thật ngay trên máy mình, để thấy process, signal và lỗi đúng như trên server?**

Lab của Bài 03 chỉ thấy được bản "tương đương": Ctrl+C là sự kiện của cửa sổ dòng lệnh mà Node tự dịch
thành SIGINT, `taskkill //F` chỉ tương đương SIGKILL, `dmesg` không tồn tại trong Git Bash, và phép đo
`refused` ra 2,155 giây là con số của Windows. Bài này tách câu hỏi thành bốn câu:

1. Máy ảo là gì, và WSL2 đặt một kernel Linux thật vào máy mình bằng cách nào?
2. Điều khiển máy Linux đó bằng gì: terminal, shell, lệnh, và cách đi lại giữa các thư mục?
3. Output và lỗi của một lệnh đi đâu, và `>`, `2>/dev/null`, `|` nghĩa là gì?
4. Docker Desktop đặt Docker ở đâu, và vì sao lệnh `docker` có thể báo không gọi được daemon?

## Cần đã học trước

- Process, PID, process cha và con; những gì process sở hữu (file đang mở, thư mục làm việc, biến môi trường, user); user root — [Bài 03, tab Process](../03-may-tinh-va-he-dieu-hanh/#process)
- Kernel, user mode, syscall — [Bài 03, tab Kernel](../03-may-tinh-va-he-dieu-hanh/#kernel)
- Signal, handler, OOM killer, `dmesg` — [Bài 03, tab Process chết](../03-may-tinh-va-he-dieu-hanh/#khi-chet)
- Service, daemon, systemd là PID 1 — [Bài 03, tab Service](../03-may-tinh-va-he-dieu-hanh/#service)
- `refused` và con số 2,155 giây — [Bài 01, tab Kết nối TCP](../01-ip-port-listen-firewall/#ket-noi-tcp), [tab Lab](../01-ip-port-listen-firewall/#lab)
- Lệnh `openssl … 2>/dev/null` đọc chứng chỉ — [Bài 00, tab Lab](../00-ban-do-toan-canh/#lab)

## Thuật ngữ

| Thuật ngữ | Định nghĩa một câu |
|---|---|
| Máy ảo (VM) | Máy tính dựng bằng phần mềm trên một máy thật, chạy hệ điều hành đầy đủ có kernel riêng. |
| Hypervisor | Lớp phần mềm dưới mọi kernel, chia phần cứng cho các máy ảo; của Windows là Hyper-V. |
| WSL 2 | Thành phần của Windows chạy một kernel Linux thật trong một máy ảo nhẹ do Windows tự quản. |
| WSL 1 | Thế hệ trước: không có kernel Linux, dịch từng syscall Linux sang lời gọi của Windows. |
| Distro | Kernel Linux cộng bộ chương trình đi kèm (shell, lệnh, trình quản lý gói, systemd); ví dụ Ubuntu. |
| Terminal | Chương trình hiện chữ và chuyển phím; không hiểu lệnh. |
| Shell, bash | Chương trình đọc dòng lệnh, tìm và chạy chương trình tương ứng; bash là shell mặc định của Ubuntu. |
| Tham số, tuỳ chọn | Các chữ sau tên lệnh; tham số bắt đầu bằng `-` theo quy ước là tuỳ chọn. |
| Exit status | Số process để lại khi thoát: 0 thành công, khác 0 thất bại; bash cất vào `$?`. |
| PATH | Biến môi trường chứa danh sách thư mục bash tìm chương trình, ngăn cách bằng dấu hai chấm. |
| Builtin | Lệnh nằm sẵn trong bash, như `cd`, `export`. |
| File descriptor | Số nguyên process dùng để chỉ một file đang mở; 0 stdin, 1 stdout, 2 stderr. |
| Chuyển hướng | Bash trỏ một file descriptor của lệnh sang tệp khác trước khi chạy lệnh. |
| `/dev/null` | Tệp thiết bị vứt bỏ mọi thứ ghi vào. |
| Pipe | Dấu `\|` nối stdout của lệnh trái vào stdin của lệnh phải. |
| sudo | Chạy đúng một lệnh với user root, sau khi hỏi mật khẩu của chính bạn. |
| Docker daemon (`dockerd`) | Process chạy nền nhận yêu cầu Docker API và làm việc thật. |
| Docker client (`docker`) | Chương trình dòng lệnh gửi yêu cầu tới daemon rồi in kết quả. |
| Unix socket | Điểm kết nối giữa hai process trên cùng máy, địa chỉ là một đường dẫn tệp; của Docker là `/var/run/docker.sock`. |

## Mô hình cần nhớ

```
Windows                          │  Máy ảo WSL2
                                 │
Git Bash, PowerShell             │  distro docker-desktop:  dockerd (daemon)
  docker (client) ── named pipe ─┼──►                         ▲
                                 │  distro Ubuntu:            │
                                 │    bash, docker (client) ──┘ /var/run/docker.sock
kernel Windows                   │  kernel Linux (Microsoft biên dịch)
─────────────────────────────────┴───────────────────────────────────────
                       hypervisor (Hyper-V)
```

- Hai kernel trên một máy; hypervisor chia phần cứng. Ubuntu là bộ chương trình chạy trên kernel Linux.
- Mỗi lệnh gõ vào bash: tách chữ, tìm theo PATH, fork rồi exec, đợi exit status.
- Mọi process khởi đầu với 0, 1, 2 thừa kế từ bash, trỏ vào terminal. `>` đổi số 1, `2>` đổi số 2.
- Lệnh `docker` chỉ là client. Docker Desktop tắt thì client vẫn chạy nhưng daemon không có ở đó.

## Lab

Chạy theo thứ tự. Output dưới đây là dạng **kỳ vọng** theo tài liệu chính thức; dán output **thật**
của bạn vào `notes.md`.

### Lab 1 — Cài Ubuntu trên WSL2

Trong PowerShell mở bằng "Run as administrator":

```powershell
wsl --install -d Ubuntu
wsl -l -v
```

**Vì sao `-d Ubuntu`:** `wsl --install` trần chỉ cài được trên máy chưa từng có WSL; máy đã có WSL (ví dụ
do Docker Desktop cài) thì lệnh trần chỉ in trang hướng dẫn. Máy có thể đòi khởi động lại. Lần mở Ubuntu
đầu tiên hỏi tên user và mật khẩu Linux; lúc gõ mật khẩu màn hình không hiện gì.

**Kỳ vọng:** dòng `Ubuntu` có `VERSION` là `2`. Nếu là `1`: `wsl --set-version Ubuntu 2`.

Rồi trong Ubuntu:

```bash
uname -r                 # đuôi -microsoft-standard-WSL2: kernel Linux thật
ps -p 1 -o pid,comm      # PID 1 là systemd, đúng gốc cây process ở Bài 03
sudo dmesg | less        # thông báo của kernel; q để thoát
```

### Lab 2 — Đi lại, đọc và sửa tệp

```bash
pwd
mkdir -p ~/lab04
cd ~/lab04
nano ghi-chu.txt         # gõ hai dòng, Ctrl+O, Enter, Ctrl+X
cat ghi-chu.txt
ls -la
echo $PATH
which ls                 # /usr/bin/ls
type cd                  # cd is a shell builtin
```

**Vì sao `~/lab04`:** đặt tệp trong hệ thống tệp của Linux; đọc tệp của Windows từ trong Linux chậm hơn.

**Tự gây lỗi:**

```bash
cd /Etc                  # No such file or directory: Linux phân biệt hoa thường
ls /root                 # Permission denied: bash đang chạy bằng user thường
sudo ls /root            # hỏi mật khẩu, rồi chạy ls bằng root
```

### Lab 3 — Tách stdout khỏi stderr

```bash
ls /etc/hostname /khong-co               # một dòng lỗi, một dòng kết quả
ls /etc/hostname /khong-co > ketqua.txt  # lỗi vẫn hiện: số 2 vẫn trỏ vào terminal
cat ketqua.txt                           # /etc/hostname
ls /etc/hostname /khong-co 2> /dev/null  # chỉ còn kết quả
ls -l /proc/$$/fd                        # 0, 1, 2 của bash trỏ vào /dev/pts/...
ls /etc | grep host                      # pipe: chỉ giữ tên có chữ host
```

Rồi chạy lệnh của Bài 00 hai lần, lần đầu bỏ `2>/dev/null`:

```bash
echo | openssl s_client -connect example.com:443 -servername example.com | openssl x509 -noout -subject -issuer -dates
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null | openssl x509 -noout -subject -issuer -dates
```

**Kỳ vọng:** lần đầu có thêm các dòng chẩn đoán như `depth=…`, `verify return:1`; lần hai chỉ còn
`subject=`, `issuer=`, `notBefore=`, `notAfter=`. Những dòng biến mất là những gì `s_client` ghi ra số 2.

### Lab 4 — Signal thật trên Linux

Mở hai cửa sổ Ubuntu.

```bash
# Cửa sổ 1
sleep 1000

# Cửa sổ 2
ps -ef | grep sleep      # cột thứ hai là PID
kill <PID>               # SIGTERM

# Cửa sổ 1
echo $?                  # 143 = 128 + 15
```

Làm lại với `kill -9 <PID>`: cửa sổ 1 in `Killed`, `echo $?` in `137` = 128 + 9. Theo tài liệu của bash,
lệnh chết vì signal số N có exit status 128 cộng N.

Rồi dùng script có handler, [`lab/nghe-signal.sh`](lab/nghe-signal.sh), gõ lại bằng
`nano ~/lab04/nghe-signal.sh` để tập `nano`:

```bash
bash ~/lab04/nghe-signal.sh      # cửa sổ 1, in PID của nó
kill <PID>                       # cửa sổ 2: handler in "[SIGTERM] duoc bao truoc…", exit status 0
kill -9 <PID>                    # chạy lại script rồi thử: chỉ có "Killed", handler không chạy
```

### Lab 5 — Docker Desktop và hello-world

1. Mở Docker Desktop, đợi engine chạy.
2. Settings, General: **Use the WSL 2 based engine** phải được chọn.
3. Settings, Resources, **WSL Integration**: bật cho Ubuntu, Apply.
4. Trong Ubuntu:

```bash
docker version           # có cả Client và Server
docker run hello-world   # lần đầu có vài dòng tải image, rồi "Hello from Docker!"
```

Trong PowerShell, `wsl -l -v` giờ có `docker-desktop` ở trạng thái `Running`.

### Lab 6 — Tự gây lỗi: tắt daemon, rồi sửa

Chuột phải biểu tượng Docker ở khay hệ thống, **Quit Docker Desktop**. Chạy `docker version` trong Git
Bash và trong Ubuntu. Output thật trong Git Bash trên máy mình:

```
Client:
 Version:           29.7.2
 …
failed to connect to the docker API at npipe:////./pipe/dockerDesktopLinuxEngine;
check if the path is correct and if the daemon is running: open
//./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified.
```

(dòng lỗi dài đã ngắt cho vừa khung)

Bản cũ hơn của client viết `Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the
docker daemon running?`. Trong Ubuntu có thể là câu báo lệnh `docker` không có trong distro. Trả lời: ai
viết ra thông báo, client có chạy không, đầu bên kia thiếu gì? **Sửa:** mở lại Docker Desktop, đợi
engine chạy, chạy lại `docker version`: phần `Server` quay về. Sửa đúng tầng daemon thì triệu chứng đổi,
đúng nguyên tắc "sửa một tầng thì triệu chứng đổi" của Bài 02.

### Lab 7 — Phép đo đối chứng

Viết dự đoán vào `notes.md` trước. Rồi trong Ubuntu:

```bash
time curl -4 -o /dev/null http://127.0.0.1:9999
```

**Kỳ vọng (chưa đo):** `curl: (7) Failed to connect … after 0 ms`, `real` cỡ vài phần trăm giây. So với
**2,155 giây** trên Windows: lệnh, máy và port như nhau, nên chênh lệch là chênh lệch giữa hai kernel.
Thiếu `curl` thì `sudo apt update && sudo apt install curl`.

## Vốn lệnh tối thiểu

| Lệnh | Làm gì |
|---|---|
| `pwd` | In thư mục làm việc của bash |
| `ls -l`, `ls -a` | Liệt kê chi tiết, kể cả tệp ẩn |
| `cd ..`, `cd ~`, `cd -` | Lên thư mục cha, về thư mục nhà, quay lại chỗ vừa đứng |
| `mkdir -p a/b` | Tạo thư mục, kể cả thư mục cha |
| `cat tep` | In nội dung tệp |
| `less tep` | Xem từng trang; phím cách sang trang, `q` thoát |
| `nano tep` | Sửa tệp; Ctrl+O lưu, Ctrl+X thoát |
| `echo $?` | Exit status của lệnh vừa chạy |
| `which ls`, `type cd` | Lệnh nằm ở tệp nào, hay là builtin |
| `lenh > tep`, `lenh 2> tep`, `lenh 2>&1` | Chuyển hướng stdout, stderr, gộp stderr vào stdout |
| `lenh1 \| lenh2` | Pipe |
| `sudo lenh` | Chạy đúng một lệnh bằng root |
| `ps -ef`, `kill`, `kill -9` | Liệt kê process, gửi SIGTERM, gửi SIGKILL |

## Bảng tra triệu chứng

| Thấy gì | Ai viết | Nguyên nhân | Sửa |
|---|---|---|---|
| `command not found` | bash | Không thư mục nào trong PATH có chương trình đó | Kiểm tên; `sudo apt install`; `echo $PATH` |
| `No such file or directory` | chương trình, theo lỗi kernel | Sai đường dẫn, sai hoa thường, đường dẫn tương đối tính từ thư mục khác | `pwd`; thử đường dẫn tuyệt đối |
| `Permission denied` | chương trình, theo lỗi kernel | User của process không có quyền | `sudo` cho đúng lệnh cần root |
| `'xyz' is not recognized…`, `The system cannot accept the time entered` | cmd.exe | Lệnh bash gõ vào cmd.exe | Chạy trong Ubuntu hoặc Git Bash |
| `$'\r': command not found` khi chạy script | bash | Tệp xuống dòng kiểu Windows (CR LF) | Lưu lại với LF, hoặc gõ lại bằng `nano` |
| `Cannot connect to the Docker daemon…` / `failed to connect to the docker API…` | Docker client | Daemon không có ở địa chỉ client gọi | Mở Docker Desktop, đợi engine chạy |
| Lệnh `docker` không có trong distro | Docker Desktop | Chưa bật WSL Integration, hoặc Docker Desktop tắt | Settings, Resources, WSL Integration |
| `wsl --install` chỉ in trang hướng dẫn | wsl.exe | Máy đã có WSL | `wsl --install -d Ubuntu` |
| `0x80370102` khi cài | Windows | Ảo hoá chưa bật trong BIOS/UEFI | Bật ảo hoá theo hướng dẫn của hãng máy |

## Tự kiểm tra

- [ ] Giải thích được WSL2 là một máy ảo có kernel Linux riêng, và vì sao cần hypervisor
- [ ] Phân biệt được terminal, shell và bash
- [ ] Giải thích được vì sao `cd` phải là builtin
- [ ] Tới một thư mục, xem và sửa một tệp bằng `nano` mà không cần chuột
- [ ] Giải thích được con số 2 trong `2>/dev/null`
- [ ] Dùng pipe để lọc output của một lệnh
- [ ] Gửi được SIGTERM và SIGKILL tới một process Linux, và đọc được khác biệt qua exit status
- [ ] Đọc được lỗi "Cannot connect to the Docker daemon" nói lên điều gì, và sửa được

## Kết lại

WSL2 chạy một kernel Linux thật trong một máy ảo nhẹ; bash và vài lệnh tối thiểu đủ để điều khiển nó.
Docker Desktop dùng chính máy Linux đó để chạy container, và lệnh `docker run hello-world` đầu tiên đã
chạy được.

## Câu hỏi cho bài sau

Bài này cho bạn gặp hai loại thực thể: máy ảo có kernel riêng như WSL2, và process dùng chung một kernel
như `sleep` hay bash. Bước 3 của hello-world nói daemon đã tạo một container. Vậy:

**hello-world vừa chạy "trong một container". Container là một máy ảo nhỏ như WSL2, hay chỉ là một
process như ở Bài 03?**

Bài 05 — Container đầu tiên trả lời câu này.

## Nguồn đọc thêm

- Microsoft Learn — [Install WSL](https://learn.microsoft.com/en-us/windows/wsl/install) ·
  [Comparing WSL Versions](https://learn.microsoft.com/en-us/windows/wsl/compare-versions) ·
  [Basic commands](https://learn.microsoft.com/en-us/windows/wsl/basic-commands) ·
  [Troubleshooting](https://learn.microsoft.com/en-us/windows/wsl/troubleshooting)
- GNU — [Bash Reference Manual](https://www.gnu.org/software/bash/manual/bash.html)
- man7.org — [stdin(3)](https://man7.org/linux/man-pages/man3/stdin.3.html) ·
  [null(4)](https://man7.org/linux/man-pages/man4/null.4.html) ·
  [unix(7)](https://man7.org/linux/man-pages/man7/unix.7.html)
- Docker Docs — [Docker overview](https://docs.docker.com/get-started/docker-overview/) ·
  [WSL 2 backend](https://docs.docker.com/desktop/features/wsl/) ·
  [Troubleshooting the daemon](https://docs.docker.com/engine/daemon/troubleshoot/)
