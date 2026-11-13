<a href="https://anhtuan2111.github.io/devops-self-learning/"><img src="assets/readme/card.svg" width="100%" alt="DevOps lang băm: đã xong 0/65 bài. Bấm để mở bản web."></a>

# DevOps lang băm

Khoá tự học DevOps bằng tiếng Việt, viết cho người đã làm được app Java, Spring Boot nhưng chưa làm việc với server, mạng,
container hay Kubernetes. Khoá đi từ đường đi của một request trên Internet tới lúc đưa app lên cụm Kubernetes và theo dõi app
khi nó đã chạy. Mình viết khoá này trong lúc tự học, học tới đâu viết tới đó, nên phần lớn bài trong mục lục dưới đây mới có
tên, chưa có nội dung. "Lang băm" là cách mình gọi đùa, vì khoá không cấp bằng hay chứng chỉ nào.

Bản web của khoá nằm ở https://anhtuan2111.github.io/devops-self-learning/.

## Cách đọc mục lục

Mục lục có 65 bài, chia thành 9 module. Người mới nên đọc từ Bài 00. Bài nào cũng đọc riêng được
nếu bạn đã biết các khái niệm ghi ở cột "Cần biết" của bài đó; bài ghi "không" thì đọc được ngay.

Cột "Trạng thái" ghi tiến độ của mình. Bài đã viết thì tên bài có link; bài ghi "đang học" thì đọc được rồi, nhưng mình còn
đang sửa nên nội dung có thể thay đổi.

Cột "Lab" cho biết phần thực hành của bài làm ở đâu:

- "máy bạn": làm ngay trên máy của bạn.
- "server": cần một server để thực hành; Bài 11 hướng dẫn cách kiếm một server.
- "cloud": cần một tài khoản ở một hãng cloud, tức nơi cho thuê máy theo giờ.
- "GitLab": cần một tài khoản GitLab để lưu code và chạy các bước build, deploy tự động.
- "cụm Kubernetes": cần một cụm Kubernetes; cụm để thực hành dựng được ngay trên máy của bạn.
- "chỉ đọc": bài không có phần thực hành.

## Mục lục

### M0 · Phía sau một cú bấm

| Số | Bài | Cần biết | Lab | Trạng thái |
|---|---|---|---|---|
| `00` | [Bấm like trên facebook.com: bảy tầng OSI](https://anhtuan2111.github.io/devops-self-learning/lessons/00-osi-layers/) | không | máy bạn | đang học |
| `01` | [TCP/IP: Internet chạy thế nào](https://anhtuan2111.github.io/devops-self-learning/lessons/01-tcp-ip/) | bảy tầng OSI | máy bạn | đang học |
| `02` | Người làm DevOps nắm chỗ nào trong các tầng | TCP/IP, DNS, HTTP | chỉ đọc | chưa học |

### M1 · Một cái máy Linux

| Số | Bài | Cần biết | Lab | Trạng thái |
|---|---|---|---|---|
| `03` | Server là cái gì: phần cứng, hệ điều hành, process | không | máy bạn | chưa học |
| `04` | Phòng lab: Linux trên máy Windows | process, kernel | máy bạn | chưa học |
| `05` | File, user, quyền | process, shell | máy bạn | chưa học |
| `06` | Process, signal, service, log | process, user và quyền | máy bạn | chưa học |
| `07` | Shell script | shell, lệnh Linux cơ bản | máy bạn | chưa học |
| `08` | Mạng trên một máy: listen, port, firewall | IP, TCP, process | máy bạn | chưa học |
| `09` | Server chậm: CPU, RAM, đĩa, mạng | process, kernel, CPU, RAM | máy bạn | chưa học |
| `10` | Chẩn đoán theo tầng | đường đi của request trên server, listen và port, HTTP | máy bạn | chưa học |

### M2 · Server thật, làm bằng tay

| Số | Bài | Cần biết | Lab | Trạng thái |
|---|---|---|---|---|
| `11` | Kiếm một server để thực hành | Linux, user và quyền | server | chưa học |
| `12` | SSH: điều khiển một máy ở xa | IP, port, user, shell | server | chưa học |
| `13` | Deploy tay | SSH, service | server | chưa học |
| `14` | Nginx | listen và port, HTTP | server | chưa học |
| `15` | Tên miền và HTTPS | DNS, TLS, reverse proxy | server | chưa học |
| `16` | Hai server sau một load balancer | Nginx, deploy tay | server | chưa học |
| `17` | Server để yên ba tháng | service, log, chứng chỉ, shell script | server | chưa học |

### M3 · Container

| Số | Bài | Cần biết | Lab | Trạng thái |
|---|---|---|---|---|
| `18` | Container là gì | process, kernel, cài một app lên server | máy bạn | chưa học |
| `19` | Image và container | container | máy bạn | chưa học |
| `20` | Dockerfile | image, container | máy bạn | chưa học |
| `21` | Network và volume | image, container, IP và port, DNS | máy bạn | chưa học |
| `22` | Cấu hình, secret và Compose | Dockerfile, network, volume | máy bạn | chưa học |
| `23` | Cache và message queue | Compose, database | máy bạn | chưa học |
| `24` | Registry và image để chạy production | Dockerfile, Compose | server | chưa học |
| `25` | Dựng lại cả hệ thống bằng container | Dockerfile, Compose, registry, Nginx | server | chưa học |

### M4 · Git và CI/CD với GitLab

| Số | Bài | Cần biết | Lab | Trạng thái |
|---|---|---|---|---|
| `26` | Git cho người vận hành | không | máy bạn | chưa học |
| `27` | Pipeline đầu tiên | Git, image, registry | GitLab | chưa học |
| `28` | Build, test và đóng gói image trong pipeline | pipeline, Dockerfile | GitLab | chưa học |
| `29` | Deploy tự động, môi trường, rollback | pipeline, registry, deploy tay | server | chưa học |
| `30` | Migration database trong pipeline | pipeline, deploy tự động, database | server | chưa học |
| `31` | Secret và an toàn của pipeline | pipeline, image | GitLab | chưa học |

### M5 · Hạ tầng bằng code và cloud

| Số | Bài | Cần biết | Lab | Trạng thái |
|---|---|---|---|---|
| `32` | Hạ tầng là code | deploy tay, Git | chỉ đọc | chưa học |
| `33` | Ansible | SSH, Linux, shell script | máy bạn | chưa học |
| `34` | Cloud tối thiểu và IAM | server, IP, load balancer | cloud | chưa học |
| `35` | Mạng trên cloud: VPC, subnet, NAT, VPN | IP, mạng riêng, router, firewall | cloud | chưa học |
| `36` | Terraform | cloud, VPC | cloud | chưa học |

### M6 · Kubernetes

| Số | Bài | Cần biết | Lab | Trạng thái |
|---|---|---|---|---|
| `37` | Vì sao cần Kubernetes | container, Compose, load balancer | chỉ đọc | chưa học |
| `38` | Cụm đầu tiên và Pod | container, YAML | cụm Kubernetes | chưa học |
| `39` | Deployment | Pod | cụm Kubernetes | chưa học |
| `40` | Service và DNS trong cụm | Pod, DNS, IP và port | cụm Kubernetes | chưa học |
| `41` | Ingress | Service, reverse proxy, HTTPS | cụm Kubernetes | chưa học |
| `42` | ConfigMap và Secret | Pod, Deployment, biến môi trường | cụm Kubernetes | chưa học |
| `43` | Lưu trữ: PersistentVolume và StatefulSet | Pod, Deployment, volume | cụm Kubernetes | chưa học |
| `44` | Tài nguyên và probe | Pod, Deployment, OOM killer | cụm Kubernetes | chưa học |
| `45` | Helm | Deployment, Service, Ingress, ConfigMap | cụm Kubernetes | chưa học |
| `46` | Namespace, RBAC, NetworkPolicy | Pod, Service | cụm Kubernetes | chưa học |
| `47` | Controller, CRD và operator | Deployment, StatefulSet | cụm Kubernetes | chưa học |
| `48` | Dựng lại cả hệ thống trên cụm | Helm, Ingress, StatefulSet, probe, Pod, Service, Secret, image | cụm Kubernetes | chưa học |

### M7 · Nền tảng

| Số | Bài | Cần biết | Lab | Trạng thái |
|---|---|---|---|---|
| `49` | GitOps với Argo CD | Kubernetes, Helm, Git | cụm Kubernetes | chưa học |
| `50` | Rancher: quản lý nhiều cụm | Kubernetes, RBAC, namespace | cụm Kubernetes | chưa học |
| `51` | OpenShift | Kubernetes, Ingress, RBAC | cụm Kubernetes | chưa học |
| `52` | Secret tập trung | Secret, GitOps | cụm Kubernetes | chưa học |
| `53` | Bảo mật cụm: policy và audit | RBAC, Pod, image | cụm Kubernetes | chưa học |
| `54` | Service mesh | Service, Ingress, TLS, Pod | cụm Kubernetes | chưa học |
| `55` | Nền tảng tự phục vụ | Dockerfile, pipeline, Helm, GitOps | cụm Kubernetes | chưa học |

### M8 · Vận hành và giám sát

| Số | Bài | Cần biết | Lab | Trạng thái |
|---|---|---|---|---|
| `56` | Metric: Prometheus và Grafana | process, HTTP, Kubernetes | cụm Kubernetes | chưa học |
| `57` | Log tập trung | log, Pod | cụm Kubernetes | chưa học |
| `58` | Trace | metric, log, HTTP | cụm Kubernetes | chưa học |
| `59` | eBPF | kernel, syscall, trace | chỉ đọc | chưa học |
| `60` | Cảnh báo và trực sự cố | metric, log | cụm Kubernetes | chưa học |
| `61` | Xử lý sự cố và postmortem | chẩn đoán theo tầng, metric, log, cảnh báo | cụm Kubernetes | chưa học |
| `62` | Database khi chạy production | database, volume | server | chưa học |
| `63` | Backup và khôi phục | database, PersistentVolume, Kubernetes | cụm Kubernetes | chưa học |
| `64` | Tổng kết: dựng lại từ repo trống | container, Kubernetes, pipeline, GitOps, metric, Terraform | cụm Kubernetes | chưa học |
