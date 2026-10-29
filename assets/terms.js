/* Bảng thuật ngữ dùng chung và tooltip khi bấm vào thuật ngữ.
   Dùng ở trang bài (nạp sau app.js) và trang chủ (generate.mjs tự gắn thuật ngữ vào mô tả bài).
   Đánh dấu một thuật ngữ: <button type="button" class="term" data-term="tls">TLS</button>.
   Chỉ gắn cho lần nhắc đầu tiên của thuật ngữ mà trang đó không giảng sâu; lời giải thích một hai câu,
   đủ để đọc tiếp, mỗi thuật ngữ chỉ có một lời giải thích cho cả khoá.
   Phần đầu tệp giữ thuần (không chạm DOM) vì generate.mjs require tệp này để lấy bảng thuật ngữ. */
(function (root) {
  var GLOSSARY = {
    'ip': { label: 'IP', tip: 'Địa chỉ dạng số của một máy trên mạng, kiểu 57.144.64.1. Gói tin ghi địa chỉ IP nơi gửi và nơi nhận để đi qua nhiều mạng tới đúng máy.' },
    'tcp-ip': { label: 'TCP/IP', tip: 'Bộ giao thức mà Internet đang chạy, đặt tên theo hai giao thức chính của nó là TCP và IP.' },
    'mac': { label: 'MAC', tip: 'Địa chỉ riêng của một card mạng, viết thành sáu cặp số hex. Chỉ dùng để gửi dữ liệu tới thiết bị ngay kế bên trong cùng một mạng.' },
    'tls': { label: 'TLS', tip: 'Lớp mã hoá của https: kiểm tra máy bên kia đúng là trang bạn muốn vào, rồi mã hoá dữ liệu để người đứng giữa đường không đọc được.' },
    'ssl': { label: 'SSL', tip: 'Tên đời trước của TLS. Nhiều người vẫn gọi chứng chỉ của https là chứng chỉ SSL.' },
    'http': { label: 'HTTP', tip: 'Quy ước trình duyệt và server dùng để gửi request và trả response. Controller Spring Boot của bạn nhận request theo quy ước này.' },
    'https': { label: 'https', tip: 'HTTP chạy bên trong lớp mã hoá TLS. Địa chỉ bắt đầu bằng https:// thì dữ liệu đi trên đường đã được mã hoá.' },
    'dns': { label: 'DNS', tip: 'Hệ thống đổi tên miền như facebook.com thành địa chỉ IP. Máy bạn hỏi một server DNS rồi mới biết gửi dữ liệu tới đâu.' },
    'tcp': { label: 'TCP', tip: 'Giao thức chở dữ liệu giữa hai chương trình: cắt thành mẩu, đánh số, gửi lại mẩu bị mất, ráp lại đúng thứ tự ở đầu kia.' },
    'udp': { label: 'UDP', tip: 'Giao thức chở dữ liệu gọn hơn TCP: không mở kết nối trước, mẩu nào mất thì thôi, hợp với những câu hỏi đáp ngắn như DNS.' },
    'port': { label: 'port', tip: 'Con số chọn chương trình nào trên máy nhận dữ liệu, ví dụ 443 cho https, 8080 cho app Spring Boot chạy thử trên máy.' },
    'router': { label: 'router', tip: 'Thiết bị nối các mạng với nhau. Nó đọc địa chỉ IP của gói tin rồi chuyển gói sang mạng gần đích hơn.' },
    'ethernet': { label: 'Ethernet', tip: 'Chuẩn nối mạng bằng dây cáp, dùng trong hầu hết mạng có dây ở nhà và văn phòng.' },
    'hex': { label: 'hex', tip: 'Cách viết số theo cơ số 16, dùng chữ số 0 tới 9 và chữ a tới f. Hai ký tự hex là một byte.' },
    'vpn': { label: 'VPN', tip: 'Đường hầm mã hoá nối máy bạn vào một mạng ở xa, kiểu mạng công ty, như thể máy đang nằm trong mạng đó.' },
    'modem': { label: 'modem', tip: 'Thiết bị nhà mạng lắp ở nhà, nối mạng trong nhà ra đường truyền của nhà mạng.' },
    'bgp': { label: 'BGP', tip: 'Giao thức các nhà mạng dùng để báo cho nhau đường đi tới các dải địa chỉ IP trên Internet.' },
    'wireshark': { label: 'Wireshark', tip: 'Chương trình bắt lại các gói tin đi qua card mạng rồi bóc từng lớp ra cho người đọc.' },
    'load-balancer': { label: 'load balancer', tip: 'Thứ đứng trước nhiều server, chia request cho chúng và bỏ qua server đang chết.' },
    'itu-t': { label: 'ITU-T', tip: 'Bộ phận soạn chuẩn viễn thông của Liên minh Viễn thông Quốc tế (ITU), một cơ quan của Liên Hợp Quốc.' },
    'reverse-proxy': { label: 'reverse proxy', tip: 'Chương trình đứng trước app, nhận request từ ngoài thay cho app rồi chuyển vào trong, kiểu Nginx.' },
    'firewall': { label: 'firewall', tip: 'Bộ lọc xem từng gói tin đi vào rồi cho qua hay chặn theo luật, kiểu chỉ cho vào port 443.' },
    'ssh': { label: 'SSH', tip: 'Cách gõ lệnh trên một máy ở xa qua kết nối đã mã hoá.' },
    'nat': { label: 'NAT', tip: 'Cách cho nhiều máy dùng địa chỉ nội bộ ra Internet chung qua một địa chỉ công khai.' },
    'vpc': { label: 'VPC', tip: 'Mạng riêng của bạn trên cloud, chỉ những máy bạn cho vào mới nằm trong đó.' },
    'yaml': { label: 'YAML', tip: 'Định dạng tệp cấu hình viết bằng thụt lề, Kubernetes, GitLab CI, Docker Compose đều dùng.' },
    'jvm': { label: 'JVM', tip: 'Máy ảo Java, chương trình chạy file .class và .jar; app Spring Boot chạy bên trong nó.' },
  };
  if (typeof module === 'object' && module.exports) module.exports = GLOSSARY;
  if (typeof document === 'undefined') return;
  root.GLOSSARY = GLOSSARY;

  var pop = null, current = null;
  function close() {
    if (!pop) return;
    pop.remove(); pop = null;
    if (current) current.setAttribute('aria-expanded', 'false');
    current = null;
  }
  function open(btn) {
    close();
    var key = btn.getAttribute('data-term');
    var entry = GLOSSARY[key];
    var tip = btn.getAttribute('data-tip') || (entry && entry.tip);
    if (!tip) return;
    pop = document.createElement('div');
    pop.className = 'term-pop';
    pop.setAttribute('role', 'tooltip');
    pop.innerHTML = '<b></b><span></span>';
    pop.firstChild.textContent = (entry && entry.label) || btn.textContent;
    pop.lastChild.textContent = tip;
    document.body.appendChild(pop);
    var r = btn.getBoundingClientRect();
    var width = document.documentElement.clientWidth;
    var left = Math.min(Math.max(16, r.left + window.scrollX), window.scrollX + width - pop.offsetWidth - 16);
    var below = r.bottom + 8 + pop.offsetHeight <= window.innerHeight;
    pop.style.left = left + 'px';
    pop.style.top = ((below ? r.bottom + 8 : r.top - 8 - pop.offsetHeight) + window.scrollY) + 'px';
    btn.setAttribute('aria-expanded', 'true');
    current = btn;
  }
  // Bắt ở pha capture và chặn lan ra ngoài, để click vào thuật ngữ nằm trong thẻ bài ở trang chủ
  // không làm thẻ mở hay gập.
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.term');
    if (btn) {
      e.preventDefault(); e.stopPropagation();
      if (current === btn) close(); else open(btn);
      return;
    }
    if (pop && !pop.contains(e.target)) close();
  }, true);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  window.addEventListener('resize', close);
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.term').forEach(function (btn) {
      btn.setAttribute('aria-expanded', 'false');
      var entry = GLOSSARY[btn.getAttribute('data-term')];
      if (entry && !btn.getAttribute('aria-label')) btn.setAttribute('aria-label', btn.textContent + ': ' + entry.tip);
    });
  });
})(this);
