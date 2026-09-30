"""
Hậu kỳ ảnh chụp thật cho khớp hệ Bauhaus của trang — bước 2 của quy trình ảnh minh hoạ.

  python scripts/anh/hau-ky.py VAO.jpg RA.webp [--fit 800x600 [--dem 0.04]] [--cover 720x960 [--tam 0.5,0.35]]
                                               [--max 1200] [--phong-to 2]
                                               [--lam-trang 175] [--giu-mau]

Mặc định: xám -> kéo tương phản -> hai tông mực #151515 / mặt đọc #fffdf8 (nhiếp ảnh đen trắng
kiểu Bauhaus). Nền trắng của ảnh sản phẩm thành đúng màu khung tab, hoà vào trang.
Ảnh vật thể có nền cũ (xám, chuyển sắc, có bóng): tách nền trước bằng tach-nen.py, rồi đưa PNG
trong suốt vào đây — chỗ trong suốt được đặt lên nền trắng nên thành đúng màu mặt đọc.
  --fit WxH       đặt vào khung WxH, đệm màu mặt đọc, KHÔNG cắt mất vật thể (dải nhiều ảnh)
  --dem 0.04      tỉ lệ lề đệm quanh vật thể khi --fit (mặc định 0.06)
  --cover WxH     cắt cho lấp đầy khung WxH (ảnh bên lề, ảnh rộng)
  --tam 0.5,0.35  tâm cắt khi --cover (tỉ lệ ngang, dọc; mặc định giữa ảnh)
  --phong-to 2    phóng ảnh gốc quá nhỏ trước khi xử lý
  --max W         chỉ thu nhỏ nếu rộng hơn W
  --lam-trang T   đẩy vùng xám sáng hơn T về trắng (ảnh chụp trên nền xám)
  --giu-mau       không chuyển tông (ảnh chụp màn hình) — lưu WebP lossless
Ghi lại mọi bước đã làm vào cột "Đã chỉnh" của lessons/NN/img/NGUON.md.
"""
import sys
from PIL import Image, ImageOps, ImageFilter

# Tông sáng = --surface (#fffdf8), màu của khung tab nơi MỌI ảnh nằm — không phải --paper (#f3eee4) của
# nền trang. Dùng --paper thì nền ảnh thành một ô be nhạt trên mặt đọc gần trắng (đã mắc 30/09/2026).
INK, PAPER = (0x15, 0x15, 0x15), (0xff, 0xfd, 0xf8)

def arg(name, default=None):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else default

def wh(s):
    w, h = s.lower().split('x'); return int(w), int(h)

src, dst = sys.argv[1], sys.argv[2]
im = Image.open(src)
if im.mode in ('RGBA', 'LA', 'P'):
    im = im.convert('RGBA'); bg = Image.new('RGBA', im.size, (255, 255, 255, 255)); bg.alpha_composite(im); im = bg
im = im.convert('RGB')
keep = '--giu-mau' in sys.argv
if arg('--phong-to'):                       # ảnh gốc quá nhỏ: phóng trước khi làm nét và chuyển tông
    k = float(arg('--phong-to')); im = im.resize((int(im.width * k), int(im.height * k)), Image.LANCZOS)

if not keep:
    g = ImageOps.autocontrast(ImageOps.grayscale(im), cutoff=1)
    t = arg('--lam-trang')
    if t:
        t = int(t); g = g.point(lambda v: 255 if v > t else int(v * 255 / t) if v > t - 25 else v)
    g = g.filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
    im = ImageOps.colorize(g, black=INK, white=PAPER)

if arg('--fit'):
    w, h = wh(arg('--fit')); pad = float(arg('--dem', 0.06))
    s = min(w * (1 - 2 * pad) / im.width, h * (1 - 2 * pad) / im.height)
    im = im.resize((int(im.width * s), int(im.height * s)), Image.LANCZOS)
    c = Image.new('RGB', (w, h), PAPER); c.paste(im, ((w - im.width) // 2, (h - im.height) // 2)); im = c
elif arg('--cover'):
    w, h = wh(arg('--cover')); s = max(w / im.width, h / im.height)
    im = im.resize((int(im.width * s) + 1, int(im.height * s) + 1), Image.LANCZOS)
    fx, fy = (float(v) for v in arg('--tam', '0.5,0.5').split(','))
    x, y = int((im.width - w) * fx), int((im.height - h) * fy); im = im.crop((x, y, x + w, y + h))
if arg('--max') and im.width > int(arg('--max')):
    m = int(arg('--max')); im = im.resize((m, int(im.height * m / im.width)), Image.LANCZOS)

im.save(dst, 'WEBP', lossless=True, method=6) if keep else im.save(dst, 'WEBP', quality=80, method=6)
print(dst, im.size)
