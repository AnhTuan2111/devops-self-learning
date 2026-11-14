# Ghi chú Bài 01: TCP/IP

Chỗ ghi output lab thật, lỗi đã gặp, câu hỏi còn treo. Địa chỉ router của nhà mạng, MAC đầy đủ, tên router: ẩn trước khi
ghi.

## Output lab trên máy mình, 30/10/2026

- Công cụ trong WSL Ubuntu 26.04: TShark 4.6.4, dig 9.20.24, traceroute 2.1.6, cài bằng `apt install tshark dnsutils
  traceroute whois`.
- `route print -4`: default route `0.0.0.0/0` qua `10.88.88.88` (cục phát WiFi), mạng WiFi `10.88.88.0/24`, mạng ảo WSL
  `172.21.16.0/20`.
- `ip route` trong WSL: `default via 172.21.16.1`, `172.21.16.0/20 ... src 172.21.21.136`.
- `ping -n 1 -i 1 facebook.com`: `Reply from 10.88.88.88: TTL expired in transit.`; TTL 2 và 3 chết ở hai router nhà mạng.
- `dig +trace +nodnssec facebook.com @1.1.1.1`: f.root-servers.net trả lời trong 4 ms, h.gtld-servers.net 275 ms,
  c.ns.facebook.com 223 ms, `facebook.com. 60 IN A 57.144.64.1`.
- `dig +trace` không có `@1.1.1.1`: `communications error to 10.255.255.254#53: timed out`, DNS mặc định của WSL không trả
  lời câu hỏi `NS .`; lý do chưa tìm hiểu.
- TTL qua resolver: resolver mặc định của WSL cho 53; `1.1.1.1` hỏi hai lần cách 20 giây cho TTL 40 rồi 48, địa chỉ
  `57.144.64.1` rồi `57.145.12.1`.
- RIPEstat: `57.144.64.1` thuộc `57.144.64.0/23`, AS32934 Facebook; AS32934 quảng bá 555 dải (233 IPv4). Các chặng 10-14
  của tracert ở Bài 00 nằm trong mạng Facebook (`147.75.211.10` có netname `FB-NET-208-20`).
- `tshark` bắt `curl http://example.com/`: 12 gói, gói 4 dài 141 byte (Ethernet 14, IPv4 20, TCP 32, HTTP 75), TTL 64.

## Chưa chạy

- Bắt gói của `curl https://example.com/` với bộ lọc `tcp port 443` để thấy phần TLS không đọc được: trang bài ghi là bước
  thử thêm, chưa có output thật.
- `ping -n 1 facebook.com` không đặt TTL (Lab 2, chạy 14/11/2026): `Reply from 57.144.64.1: bytes=32 time=24ms TTL=51`.

## Câu hỏi còn treo

## Phản ứng thật của mình

## Output lab bằng công cụ Windows (14/11/2026)

Lab đổi sang công cụ có sẵn trên Windows, vì bài chưa dạy WSL. Chạy trên Windows 11, Git Bash (curl 8.10.1) và PowerShell 7.6.

```text
$ nslookup -norecurse facebook.com 198.41.0.4
...
Name:    facebook.com
Served by:
- l.gtld-servers.net
	  192.41.162.30
	  2001:500:d937::30
	  com
...

$ nslookup -norecurse facebook.com 192.5.6.30
...
Name:    facebook.com
Served by:
- a.ns.facebook.com
	  129.134.30.12
	  2a03:2880:f0fc:c:face:b00c:0:35
	  facebook.com
...

PS> Resolve-DnsName facebook.com -Type A -Server a.ns.facebook.com -NoRecursion
facebook.com   A   60   Answer   57.144.64.1
PS> Resolve-DnsName facebook.com -Type A
facebook.com   A   60   Answer   57.144.64.1
# 20 giây sau
facebook.com   A   40   Answer   57.144.64.1

$ curl -s "https://stat.ripe.net/data/whois/data.json?resource=147.75.211.10"
{"key":"inetnum","value":"147.75.208.0/20",...}
{"key":"netname","value":"FB-NET-208-20",...}
{"key":"country","value":"IL",...}
```

- Hỏi một server của `com` bằng `Resolve-DnsName` qua UDP thì máy mình báo `DNS server failure`; thêm `-TcpOnly` thì chạy.
  Lab dùng `nslookup` cho hai bước hỏi root và `com` nên không vướng chỗ này.
- Chưa chạy lại Lab 5 bằng Wireshark bản Windows: máy chưa cài Wireshark và Npcap.
