#!/usr/bin/env node
/**
 * Tìm và tải ảnh từ Wikimedia Commons KÈM giấy phép — bước 1 của quy trình ảnh minh hoạ
 * (xem CLAUDE.md § Ảnh minh hoạ).
 *
 *   node scripts/anh/commons.mjs tim "server rack data center" [số-kết-quả]
 *   node scripts/anh/commons.mjs lay "File:Tên chính xác.jpg" <tên-ra> [bề-rộng]
 *
 * "lay" ghi <tên-ra>.<đuôi> và <tên-ra>.json (title, page, license, licenseUrl, artist…).
 * Đọc giấy phép TRƯỚC khi dùng: chỉ nhận CC0, public domain, CC BY, CC BY-SA.
 * Tải về thư mục nháp, không tải thẳng vào repo — chỉ bản đã hậu kỳ mới vào lessons/NN/img/.
 */
import { writeFileSync } from 'node:fs';

const UA = { 'User-Agent': 'devops-self-learning/1.0 (https://github.com/AnhTuan2111/devops-self-learning)' };
const strip = (s) => String(s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const api = (params) => fetch('https://commons.wikimedia.org/w/api.php?' + new URLSearchParams({ format: 'json', ...params }), { headers: UA }).then((r) => r.json());
const [cmd, arg, a2, a3] = process.argv.slice(2);

if (cmd === 'tim') {
  const d = await api({ action: 'query', generator: 'search', gsrsearch: `${arg} filetype:bitmap`, gsrnamespace: '6',
    gsrlimit: String(a2 || 8), prop: 'imageinfo', iiprop: 'url|size|extmetadata|mime' });
  for (const p of Object.values(d.query?.pages || {}).sort((a, b) => a.index - b.index)) {
    const ii = p.imageinfo?.[0]; if (!ii) continue;
    const m = ii.extmetadata || {};
    console.log(`- ${p.title}\n    ${ii.width}x${ii.height} | ${strip(m.LicenseShortName?.value)} | ${strip(m.Artist?.value).slice(0, 70)}\n    ${ii.descriptionurl}`);
  }
} else if (cmd === 'lay') {
  const d = await api({ action: 'query', titles: arg, prop: 'imageinfo', iiprop: 'url|size|extmetadata|mime', iiurlwidth: a3 || '1600' });
  const page = Object.values(d.query.pages)[0], ii = page.imageinfo?.[0];
  if (!ii) { console.error('không thấy', arg); process.exit(1); }
  const m = ii.extmetadata || {}, src = ii.thumburl || ii.url;
  const ext = (src.match(/\.(jpe?g|png|webp|gif|tiff?)(?:$|\?)/i)?.[1] || 'jpg').toLowerCase().replace('jpeg', 'jpg');
  const buf = Buffer.from(await (await fetch(src, { headers: UA })).arrayBuffer());
  writeFileSync(`${a2}.${ext}`, buf);
  const meta = { title: page.title, page: ii.descriptionurl, source: src, license: strip(m.LicenseShortName?.value),
    licenseUrl: strip(m.LicenseUrl?.value), artist: strip(m.Artist?.value), description: strip(m.ImageDescription?.value).slice(0, 300) };
  writeFileSync(`${a2}.json`, JSON.stringify(meta, null, 2));
  console.log(`${a2}.${ext}  ${buf.length} B | ${meta.license} | ${meta.artist.slice(0, 60)}`);
} else {
  console.log('Dùng: commons.mjs tim "<từ khoá>" [n]  |  commons.mjs lay "File:…" <tên-ra> [bề-rộng]');
}
