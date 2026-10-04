# Bài 00 — Bản đồ toàn cảnh: một request đi qua chín chặng

<img src="../../assets/readme/glyph/00.svg" width="132" align="right" alt="Ấn ký của Bài 00">

> **Module M0** · Nền tảng tối thiểu — Request, process và phòng lab
> Ước lượng: 3–5 giờ học (đọc trước, đối thoại, lab, ghi chép) · Trạng thái: `todo`

## Câu hỏi của bài

**Từ lúc gõ một địa chỉ vào trình duyệt tới lúc code Spring Boot của bạn chạy, request đi qua những chặng nào, và chặng nào thật sự là code của bạn?**

## Bài này dẫn tới

Chín chặng: trình duyệt, DNS, mở kết nối, mã hoá, gửi request, firewall, reverse proxy, ứng dụng, database. Trong cả đường đi, chỉ ứng dụng là code bạn viết; tám chặng còn lại là hạ tầng, và phần lớn sự cố nằm ở đó.

## Câu hỏi cho bài sau

App chạy bình thường khi gọi bằng localhost:8080 trên chính máy mình, nhưng người khác gọi vào thì không được. Chặng mở kết nối hỏng ở đâu? [Bài 01](../01-ip-port-listen-firewall/) trả lời câu này.

## Khái niệm sẽ gặp

- URL và các phần của nó: scheme, host, port, path, query
- Client và server
- DNS: đổi tên miền thành địa chỉ IP
- Gói tin và đường đi của nó ra Internet
- HTTPS ở mức khái niệm: mã hoá và chứng chỉ
- Ba chặng trên server: reverse proxy, ứng dụng, database
- Trong cả đường đi, chỉ ứng dụng là code bạn viết
- DevOps: một nhóm chịu trách nhiệm cho cả chín chặng thay vì hai đội phát triển và vận hành (phụ lục Lịch sử DevOps)

## Bài lab

Dùng nslookup và curl -v quan sát một request thật đi ra Internet, chỉ ra từng dòng output thuộc chặng nào, và đọc chứng chỉ của một website thật. Cố tình tra một tên miền không tồn tại để thấy bước hỏi DNS hỏng. Tự vẽ lại bản đồ.

## Tự kiểm tra

Học xong phải tự làm được, không nhìn tài liệu:

- [ ] Giải thích được từng phần của https://example.com:443/users/42?x=1
- [ ] Kể được chín chặng theo đúng thứ tự, và chặng nào chạy ở đâu
- [ ] Chỉ ra được một dòng output của curl -v thuộc chặng nào
- [ ] Nói được vì sao trong cả đường đi chỉ ứng dụng là code của bạn

---

*Bài này chưa học. Nội dung đầy đủ sẽ được viết khi học tới bài này.*
