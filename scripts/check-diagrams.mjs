#!/usr/bin/env node
/**
 * Kiểm độ thẳng cột của khung ASCII trong sơ đồ: mọi cạnh dọc phải nằm đúng cột của góc trên.
 *
 *   node scripts/check-diagrams.mjs          # chỉ báo lỗi
 *   node scripts/check-diagrams.mjs --fix    # tự bù/bớt dấu cách trước cạnh bị lệch
 *
 * Giả định mọi ký tự trong sơ đồ rộng đúng 1 ô. Điều đó chỉ đúng khi font code là JetBrains
 * Mono bản ĐẦY ĐỦ tự host (assets/fonts/) và sơ đồ KHÔNG dùng ký tự font đó không có — nhất là
 * số khoanh tròn: font phải mượn chỗ khác để vẽ chúng, ô chữ rộng khác, khung lệch.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const R = join(dirname(fileURLToPath(import.meta.url)), '..');
const FIX = process.argv.includes('--fix');
const given = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const files = given.length ? given : ['README.md', ...readdirSync(join(R, 'lessons')).flatMap((d) =>
  readdirSync(join(R, 'lessons', d)).filter((f) => /\.html$|^README\.md$/.test(f)).map((f) => `lessons/${d}/${f}`))];
const dec = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');
const enc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const VERT = /[│┃║├┤┼┠┨]/;  // cạnh dọc và các nối chữ T
const report = [];

function checkBlock(text, where) {
  const lines = text.split('\n').map((l) => [...l.normalize('NFC')]);
  const open = [];                                   // {l, r}
  let changed = false;
  lines.forEach((chars, i) => {
    const s = chars.join('');
    // Đóng khung: dòng có góc dưới-trái ở cột l và góc dưới-phải ở cột r
    for (let k = open.length - 1; k >= 0; k--) {
      const b = open[k];
      if (chars[b.l] === '└' && chars[b.r] === '┘') { open.splice(k, 1); b.closed = true; }
    }
    // Dòng thân: kiểm cạnh phải (cạnh trái thường là đầu dòng, hiếm khi lệch)
    for (const b of open) {
      if (b.start === i) continue;
      if (VERT.test(chars[b.r] || '')) continue;
      // Tìm cạnh dọc gần nhất quanh cột r
      let found = -1;
      for (let dlt = 1; dlt <= 4 && found < 0; dlt++) {
        if (VERT.test(chars[b.r - dlt] || '')) found = b.r - dlt;
        else if (VERT.test(chars[b.r + dlt] || '')) found = b.r + dlt;
      }
      if (found < 0) continue;                       // dòng đi xuyên khung (mũi tên nối) — bỏ qua
      const k = b.r - found;                         // >0: cạnh bị lệch trái, cần thêm dấu cách
      report.push(`${where} dòng ${i + 1}: cạnh phải ở cột ${found}, đúng phải là ${b.r} (${k > 0 ? 'thiếu' : 'thừa'} ${Math.abs(k)})`);
      if (k > 0) chars.splice(found, 0, ...' '.repeat(k));
      else {
        let removable = 0; for (let j = found - 1; j >= 0 && chars[j] === ' ' && removable < -k; j--) removable++;
        if (removable === -k) chars.splice(found + k, -k);
      }
      changed = true;
    }
    // Mở khung mới: mỗi cặp góc trên-trái .. góc trên-phải trên dòng này
    for (let c = 0; c < chars.length; c++) {
      if (chars[c] !== '┌') continue;
      const r = chars.indexOf('┐', c + 1);
      if (r > c) open.push({ l: c, r, start: i });
    }
    lines[i] = chars;
  });
  return changed ? lines.map((c) => c.join('')).join('\n') : null;
}

for (const f of files) {
  let s = readFileSync(`${R}/${f}`, 'utf8'), n = 0;
  if (f.endsWith('.html')) {
    s = s.replace(/(<pre class="diagram"><code>)([\s\S]*?)(<\/code><\/pre>)/g, (m, a, body, z) => {
      n++;
      if (/<[a-z]/i.test(body)) return m;
      const fixed = checkBlock(dec(body), `${f} sơ đồ #${n}`);
      return fixed === null ? m : a + enc(fixed) + z;
    });
  } else {
    s = s.replace(/(```[^\n]*\n)([\s\S]*?)(```)/g, (m, a, body, z) => {
      n++;
      const fixed = checkBlock(body, `${f} khối #${n}`);
      return fixed === null ? m : a + fixed + z;
    });
  }
  if (FIX) writeFileSync(`${R}/${f}`, s, 'utf8');
}
console.log(report.length ? report.join('\n') : `Mọi khung thẳng cột (${files.length} tệp).`);
if (report.length && !FIX) process.exitCode = 1;
