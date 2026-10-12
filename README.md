<a href="https://anhtuan2111.github.io/devops-self-learning/"><img src="assets/readme/card.svg" width="100%" alt="DevOps từ số 0: đã xong 4/42 bài. Bấm để mở bản web đầy đủ."></a>

# DevOps Self-Learning

> Học DevOps từ số 0 tới thực chiến doanh nghiệp

DevOps là cách làm để chính người viết code đưa được nó lên server, giữ nó chạy ổn, và tìm ra lỗi khi nó hỏng.

**Đích đến:** Có đủ hành trang để làm DevOps thực chiến ở doanh nghiệp: tự đóng gói, deploy, vận hành và xử lý sự cố một hệ thống chạy trên Kubernetes.

| | |
|---|---|
| **Công cụ** | Spring Boot + PostgreSQL + Docker + GitLab CI + Kubernetes + Rancher + Argo CD |
| **Môi trường** | Windows 11 + WSL2 Ubuntu + Docker Desktop |
| **Quy mô** | 42 bài · 6 module · khoảng 171-269 giờ học |
| **Tiến độ** | 4/42 bài đã xong |

Mỗi bài đi từ một **vấn đề có thật**, tới **khái niệm**, rồi mới tới **công cụ**. Bài nào cũng có
một lab chạy thật, với một bước cố tình gây lỗi rồi tự sửa.

---

## Mục lục

### M0 · Nền tảng tối thiểu: Request, process và phòng lab

> Vừa đủ nền để Docker có nghĩa: một request đi qua những đâu, process là gì, và một máy Linux để thực hành.

| # | Bài | Câu hỏi của bài | Ước lượng | Trạng thái |
|---|---|---|---|---|
| `00` | [Bản đồ toàn cảnh: một request đi qua chín chặng](https://anhtuan2111.github.io/devops-self-learning/lessons/00-ban-do-toan-canh/) | Từ lúc gõ một địa chỉ vào trình duyệt tới lúc code Spring Boot của bạn chạy, request đi qua những chặng nào, và chặng nào thật sự là code của bạn? | 3-5 giờ | xong 24/09/2026 |
| `01` | [IP, port, listen, firewall: vì sao gọi không tới](https://anhtuan2111.github.io/devops-self-learning/lessons/01-ip-port-listen-firewall/) | App chạy bình thường khi gọi bằng localhost:8080 trên chính máy mình, nhưng người khác gọi vào thì không được. Chặng mở kết nối hỏng ở đâu? | 3-5 giờ | xong 24/09/2026 |
| `02` | [Chẩn đoán theo chặng: nhìn lỗi biết chỗ hỏng](https://anhtuan2111.github.io/devops-self-learning/lessons/02-chan-doan-theo-chang/) | Kết nối tới được rồi mà trang vẫn báo 502, 500 hay 504. Lỗi đó do ai viết ra, và nó cho biết chặng nào đang hỏng? | 3-5 giờ | xong 24/09/2026 |
| `03` | [Máy tính, Hệ điều hành, Process: 'server' là cái gì](https://anhtuan2111.github.io/devops-self-learning/lessons/03-may-tinh-va-he-dieu-hanh/) | 502 nghĩa là phía sau Nginx không còn ai trả lời. Nhưng "app" là gì trên một máy chủ, vì sao nó có thể chết, và vì sao nó chết thì website sập? | 5-8 giờ | xong 03/10/2026 |
| `04` | [Phòng lab Linux: thấy tận mắt những gì Bài 03 mới kể](https://anhtuan2111.github.io/devops-self-learning/lessons/04-phong-lab-wsl-docker/) | Server thật chạy Linux, còn mọi lab tới giờ chạy trên Windows. Làm sao có một máy Linux thật ngay trên máy mình, để thấy process, signal và lỗi đúng như trên server? | 3-5 giờ | đang học |

### M1 · Docker: Đóng gói và chạy ứng dụng

> Đóng gói và chạy ứng dụng bằng Docker. Phần Linux và mạng cần tới được dạy ngay trong bài cần nó.

| # | Bài | Câu hỏi của bài | Ước lượng | Trạng thái |
|---|---|---|---|---|
| `05` | Container đầu tiên: có PostgreSQL mà không phải cài | App mẫu cần PostgreSQL, mà cài tay thì lâu và mỗi máy mỗi khác. Có cách nào chạy PostgreSQL mà không phải cài nó không? | 4-6 giờ | chưa học |
| `06` | Gọi được vào container: publish port | PostgreSQL đang chạy trong container, có process đang listen 5432, mà từ máy mình gọi localhost:5432 vẫn bị từ chối. Vì sao? | 3-5 giờ | chưa học |
| `07` | Dockerfile: đóng app của mình thành image | Database đã chạy bằng một lệnh, còn app thì vẫn phải cài Java và chạy tay trên từng máy. Làm sao app của mình cũng chạy được bằng một lệnh như PostgreSQL? | 4-6 giờ | chưa học |
| `08` | Hai container gọi nhau: network và tên | Chạy ngoài container thì app gọi localhost:5432 được, vào container thì bị từ chối. Vì sao cùng một địa chỉ mà lúc được lúc không? | 3-5 giờ | chưa học |
| `09` | Dữ liệu sống lâu hơn container: volume và backup | Tạo lại container database là dữ liệu mất sạch. Vì sao xoá container lại mất dữ liệu, và để nó ở đâu thì không mất? | 4-6 giờ | chưa học |
| `10` | Một image, nhiều môi trường: cấu hình và secret | Mật khẩu database nằm trong lệnh docker run, địa chỉ database ghi cứng trong app, mà máy dev và server sẽ cần giá trị khác nhau. Cùng một image thì đưa giá trị vào bằng đường nào? | 3-5 giờ | chưa học |
| `11` | Compose: cả hệ thống trong một file | Muốn dựng lại hệ thống phải gõ đúng thứ tự bốn lệnh dài. Làm sao dựng lại tất cả bằng một lệnh? | 4-6 giờ | chưa học |
| `12` | Container sống, chết và để lại gì: signal, restart, log | docker compose down mất mười giây mới xong, vậy request đang xử lý thì sao? Nửa đêm app chết thì ai dựng? Log của nó nằm ở đâu? | 4-6 giờ | chưa học |
| `13` | Image đủ tốt để lên server: nhỏ, không root, vừa bộ nhớ | Image nặng hơn nửa GB, process bên trong chạy bằng root, và đặt giới hạn RAM thì app bị giết với con số 137. Sửa ba chỗ đó bằng gì? | 5-7 giờ | chưa học |
| `14` | Trạm kiểm tra Docker: dựng lại từ thư mục trống, rồi tìm năm chỗ hỏng | Chín bài, chín mảnh. Nếu xoá hết, dựng lại, rồi có một thứ hỏng mà không ai nói thứ nào, bạn có tìm ra không? | 4-7 giờ | chưa học |

### M2 · Server thật: Deploy lên một máy Linux thật

> Tự tay đưa ứng dụng lên một server thật một lần, để biết các module sau đang tự động hoá những gì.

| # | Bài | Câu hỏi của bài | Ước lượng | Trạng thái |
|---|---|---|---|---|
| `15` | Một máy bật suốt: server và SSH | Hệ thống chỉ sống trên laptop, tắt máy là tắt web, và ngoài Internet không ai gọi tới được. Cần gì để người khác vào được? | 3-5 giờ | chưa học |
| `16` | Deploy tay lần đầu: image tới server bằng đường nào | Server mới tinh, có Docker nhưng không có image của app, vì image chỉ nằm trên laptop. Image tới server bằng đường nào? | 5-8 giờ | chưa học |
| `17` | Server để yên ba tháng: khởi động lại, đầy đĩa, hết RAM | Hệ thống đã chạy trên server. Bài 02 nói hệ thống có thể hỏng mà không ai đụng vào. Để yên ba tháng thì cái gì hỏng trước? | 4-7 giờ | chưa học |
| `18` | Nginx đứng trước app | Người dùng đang phải gõ địa chỉ IP kèm :8080, app nhận thẳng kết nối từ Internet, và app thứ hai trên server này sẽ tranh port. Sửa bằng gì? | 5-8 giờ | chưa học |
| `19` | Tên miền và HTTPS tự gia hạn | Địa chỉ vẫn là http:// kèm IP, trình duyệt ghi Không an toàn, và ai đứng giữa đường cũng đọc được dữ liệu. Còn thiếu gì? | 5-7 giờ | chưa học |

### M3 · CI/CD với GitLab: Từ git push tới server

> Tự động hoá bằng GitLab CI đúng những bước vừa làm tay ở module trước.

| # | Bài | Câu hỏi của bài | Ước lượng | Trạng thái |
|---|---|---|---|---|
| `20` | Từ runbook tới pipeline đầu tiên | Sửa một dòng code là build, test, đóng image, đẩy lên, SSH vào, kéo về, chạy lại, kiểm tra. Tám bước tay, quên một bước là sập. Bước nào giao cho máy được? | 4-6 giờ | chưa học |
| `21` | Pipeline nhanh và đáng tin: cache, database cho test, chặn merge | Pipeline xanh nhưng mất tám phút vì lần nào cũng tải lại cả kho thư viện, và test nào chạm database thì hỏng vì trong job không có PostgreSQL. Sửa hai chỗ đó thế nào? | 4-6 giờ | chưa học |
| `22` | Pipeline tự đóng image | Code được kiểm tự động rồi, nhưng image vẫn build và đẩy bằng tay từ laptop. Job là một container, trong đó không có Docker daemon, vậy build image bằng gì? | 4-6 giờ | chưa học |
| `23` | Pipeline tự deploy, và quay lại bản cũ | Sau mỗi commit đã có image mới trên registry, còn server thì vẫn chạy bản tuần trước. Bước cuối của runbook giao cho pipeline thế nào? | 5-8 giờ | chưa học |

### M4 · Kubernetes: Chạy container trên cả một cụm máy

> Chạy container trên nhiều máy cùng lúc. Mỗi khái niệm ở đây nối về một bài Docker đã học.

| # | Bài | Câu hỏi của bài | Ước lượng | Trạng thái |
|---|---|---|---|---|
| `24` | Khi một server không đủ: cụm đầu tiên | Mỗi lần deploy người dùng gặp vài giây 502, server chết là mọi thứ chết, và RAM của một máy thì có hạn. Ba chỗ đau đó giải bằng gì? | 4-7 giờ | chưa học |
| `25` | Pod và Deployment: ba bản app, chết thì tự sinh lại | Cụm đã có nhưng còn trống. Đưa app lên cụm bằng gì? | 4-6 giờ | chưa học |
| `26` | Service: một cái tên đứng trước các pod | Có ba pod, mỗi pod một địa chỉ IP, và địa chỉ đổi mỗi lần pod bị thay. App gọi database ở đâu, người ngoài gọi app ở đâu? | 4-6 giờ | chưa học |
| `27` | ConfigMap và Secret | Địa chỉ và mật khẩu database đang viết thẳng trong manifest, mà manifest nằm trong Git. Để chúng ở đâu? | 3-5 giờ | chưa học |
| `28` | Probe: Running chưa phải sẵn sàng | Trong lúc pod mới lên có vài request lỗi. Pod báo Running, nhưng Spring Boot bên trong còn đang khởi động. Cụm biết pod đã sẵn sàng bằng cách nào? | 4-6 giờ | chưa học |
| `29` | Requests và limits: chia tài nguyên của node | Một pod rò bộ nhớ ăn hết RAM của node và kéo pod khác chết theo, và cụm chưa có căn cứ gì để xếp pod vào node nào. Chia tài nguyên của node thế nào? | 5-7 giờ | chưa học |
| `30` | Dữ liệu trong cụm: PVC, StatefulSet, backup theo lịch | Node đang chứa pod PostgreSQL bị tắt, pod được dựng lại ở node khác, và database trống trơn. Giữ dữ liệu trong cụm thế nào? | 5-8 giờ | chưa học |
| `31` | Ingress và HTTPS trong cụm | App chạy đủ và giữ được dữ liệu, nhưng mới gọi được từ trong cụm. Người dùng ngoài Internet vào bằng đường nào? | 5-7 giờ | chưa học |
| `32` | Trạm kiểm tra Kubernetes: sáu kiểu pod hỏng | Hệ thống giờ có tám loại đối tượng. Người dùng báo lỗi thì nhìn ở đâu trước? | 4-7 giờ | chưa học |
| `33` | Helm: một bộ manifest, nhiều môi trường | Bộ manifest đã lên cả chục file, và môi trường thử với production là hai bản chép gần giống nhau, sửa một chỗ phải nhớ sửa cả hai. Gọn lại bằng gì? | 4-6 giờ | chưa học |

### M5 · Rancher và vận hành: Quản lý cụm, GitOps, theo dõi, xử lý sự cố

> Quản lý cụm bằng Rancher, deploy bằng GitOps với Argo CD, theo dõi, cảnh báo, xử lý sự cố, rồi tự dựng lại toàn bộ.

| # | Bài | Câu hỏi của bài | Ước lượng | Trạng thái |
|---|---|---|---|---|
| `34` | Rancher và OpenShift: nhiều người, nhiều cụm | Một người với kubectl thì ổn. Có thêm người thứ hai, thêm cụm thứ hai, thì ai được làm gì và nhìn ở đâu? | 4-7 giờ | chưa học |
| `35` | Pipeline deploy lên cụm | Deploy lên cụm vẫn là gõ lệnh từ laptop, còn pipeline chỉ biết SSH vào một server. Pipeline deploy lên cụm thế nào, và cho nó quyền gì? | 4-6 giờ | chưa học |
| `36` | GitOps với Argo CD: cụm tự kéo từ Git | File trong Git và cụm lệch nhau mà không ai báo, bản đang chạy không ghi ở đâu trong Git, và chìa khoá vào cụm nằm ở ngoài cụm. Có lối deploy nào bịt được cả ba chỗ hở đó không? | 5-8 giờ | chưa học |
| `37` | Metric: biết hệ thống yếu đi trước người dùng | Mọi thứ tự chạy, nhưng nó đang khoẻ hay yếu dần? Lúc này người đầu tiên biết web chậm là người dùng. Làm sao biết trước họ? | 5-8 giờ | chưa học |
| `38` | Log tập trung: tìm lại chuyện của ba ngày trước | Biểu đồ cho thấy lỗi vọt lên lúc hai giờ sáng hôm kia. Vì sao? Pod lúc đó đã bị thay, log của nó mất theo. Giữ log thế nào để tìm lại được? | 4-6 giờ | chưa học |
| `39` | Cảnh báo: máy gọi người | Muốn biết đang có chuyện thì vẫn phải có người mở biểu đồ ra xem, mà không ai ngồi trước server. Làm sao để máy tự gọi người? | 4-6 giờ | chưa học |
| `40` | Khi mọi thứ đang cháy: xử lý sự cố theo bản đồ | Cảnh báo kêu lúc nửa đêm. Làm gì trước, theo thứ tự nào? | 4-7 giờ | chưa học |
| `41` | Tổng kết: dựng lại tất cả từ một repo trống | Từng mảnh đã học và đã hỏng thử. Từ một repo trống, bạn có tự dựng lại được tất cả không? | 5-8 giờ | chưa học |

---

## Mỗi bài gồm

| Tệp | Dùng để |
|---|---|
| `index.html` | Bài giảng đầy đủ: giải thích, sơ đồ, bảng tra, lab, danh sách tự kiểm tra |
| `notes.md` | Ghi chép: lỗi đã gặp, output thật |
| `lab/` | Các tệp đã viết trong bài |

## Tài liệu chính thức

| Chủ đề | Link |
|---|---|
| Docker, Get started | https://docs.docker.com/get-started/ |
| Docker, Dockerfile reference | https://docs.docker.com/reference/dockerfile/ |
| Docker Compose | https://docs.docker.com/compose/ |
| The Twelve-Factor App | https://12factor.net/ |
| Nginx, Beginner's Guide | https://nginx.org/en/docs/beginners_guide.html |
| Let's Encrypt / Certbot | https://certbot.eff.org/ |
| GitLab CI/CD | https://docs.gitlab.com/ci/ |
| Cú pháp `.gitlab-ci.yml` | https://docs.gitlab.com/ci/yaml/ |
| Kubernetes | https://kubernetes.io/docs/home/ |
| k3d, cụm Kubernetes học trên máy | https://k3d.io/ |
| Helm | https://helm.sh/docs/ |
| cert-manager | https://cert-manager.io/docs/ |
| Rancher | https://ranchermanager.docs.rancher.com/ |
| RKE2 | https://docs.rke2.io/ |
| Spring Boot Actuator | https://docs.spring.io/spring-boot/reference/actuator/index.html |
| Prometheus | https://prometheus.io/docs/introduction/overview/ |
| Grafana | https://grafana.com/docs/grafana/latest/ |
| Linux man pages | https://man7.org/linux/man-pages/ |
| Chuẩn Internet (RFC) | https://www.rfc-editor.org/ |

Thêm nguồn học bổ trợ ở tab Tài nguyên của [bản web](https://anhtuan2111.github.io/devops-self-learning/#tai-nguyen).
