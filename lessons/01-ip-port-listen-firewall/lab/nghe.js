// Bài 01 · Lab 3 — một server nhỏ, chọn được địa chỉ listen.
//
//   node nghe.js 127.0.0.1    → chỉ nhận kết nối gọi tới 127.0.0.1 (từ trong máy)
//   node nghe.js 0.0.0.0      → nhận kết nối gọi tới mọi địa chỉ của máy
//
// Port cố định là 8080. Bấm Ctrl+C để tắt.
const diaChi = process.argv[2] || '127.0.0.1';

require('http')
  .createServer((req, res) => res.end('xin chao tu ' + diaChi + '\n'))
  .listen(8080, diaChi, () => {
    console.log('PID ' + process.pid + ' dang listen ' + diaChi + ':8080');
  });
