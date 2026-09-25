// Bài 01 — Lab: một process nhỏ nhất có thể, để quan sát nó sống và chết.
//
//   node lab/server.js
//
// Nó chiếm phòng 8080 và in ra PID của chính mình.
// Mục đích: có một "người ngồi trong phòng" thật để soi.

const http = require('http');

const server = http.createServer((req, res) => res.end('con song\n'));

server.listen(8080, () => {
  console.log('PID = ' + process.pid + '  |  dang giu phong 8080');
  console.log('Ctrl+C de tat tu te  ·  taskkill //F //PID ' + process.pid + ' de giet ep');
});

// "Lời trăng trối" — chỉ chạy khi process ĐƯỢC BÁO TRƯỚC.
// Ctrl+C gửi SIGINT → dòng này in ra.
// taskkill /F (tương đương SIGKILL) → KHÔNG in gì cả, đó là điểm của bài lab.
process.on('SIGINT', () => {
  console.log('\n[SIGINT] duoc bao truoc, dang don dep...');
  setTimeout(() => {
    console.log('[SIGINT] da dong xong, thoat tu te.');
    process.exit(0);
  }, 1500);
});

// Trên Linux/WSL, SIGTERM (kill <pid>) cũng được báo trước y như vậy.
process.on('SIGTERM', () => {
  console.log('\n[SIGTERM] duoc bao truoc, dang don dep...');
  process.exit(0);
});
