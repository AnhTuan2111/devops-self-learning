"""
Hậu kỳ ảnh chụp thật cho khớp hệ Bauhaus của trang — bước 2 của quy trình ảnh minh hoạ.

  python scripts/anh/hau-ky.py VAO.jpg RA.webp [--fit 800x600] [--cover 720x960] [--max 1200]
                                               [--lam-trang 175] [--giu-mau]

Mặc định: xám -> kéo tương phản -> hai tông mực #151515 / giấy #f3eee4 (nhiếp ảnh đen trắng
kiểu Bauhaus). Nền trắng của ảnh sản phẩm thành màu giấy, hoà vào trang.
  --fit WxH       đặt vào khung WxH, đệm màu giấy, KHÔNG cắt mất vật thể (dải nhiều ảnh)
  --cover WxH     cắt cho lấp đầy khung WxH (ảnh bên lề, ảnh rộng)
  --max W         chỉ thu nhỏ nếu rộng hơn W
  --lam-trang T   đẩy vùng xám sáng hơn T về trắng (ảnh chụp trên nền xám)
  --giu-mau       không chuyển tông (ảnh chụp màn hình) — lưu WebP lossless
Ghi lại mọi bước đã làm vào cột "Đã chỉnh" của lessons/NN/img/NGUON.md.
"""
import sys
from PIL import Image, ImageOps, ImageFilter

INK, PAPER = (0x15, 0x15, 0x15), (0xf3, 0xee, 0xe4)

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

if not keep:
    g = ImageOps.autocontrast(ImageOps.grayscale(im), cutoff=1)
    t = arg('--lam-trang')
    if t:
        t = int(t); g = g.point(lambda v: 255 if v > t else int(v * 255 / t) if v > t - 25 else v)
    g = g.filter(ImageFilter.UnsharpMask(radius=1.2, percent=60, threshold=2))
    im = ImageOps.colorize(g, black=INK, white=PAPER)

if arg('--fit'):
    w, h = wh(arg('--fit')); pad = 0.06
    s = min(w * (1 - 2 * pad) / im.width, h * (1 - 2 * pad) / im.height)
    im = im.resize((int(im.width * s), int(im.height * s)), Image.LANCZOS)
    c = Image.new('RGB', (w, h), PAPER); c.paste(im, ((w - im.width) // 2, (h - im.height) // 2)); im = c
elif arg('--cover'):
    w, h = wh(arg('--cover')); s = max(w / im.width, h / im.height)
    im = im.resize((int(im.width * s) + 1, int(im.height * s) + 1), Image.LANCZOS)
    x, y = (im.width - w) // 2, (im.height - h) // 2; im = im.crop((x, y, x + w, y + h))
if arg('--max') and im.width > int(arg('--max')):
    m = int(arg('--max')); im = im.resize((m, int(im.height * m / im.width)), Image.LANCZOS)

im.save(dst, 'WEBP', lossless=True, method=6) if keep else im.save(dst, 'WEBP', quality=80, method=6)
print(dst, im.size)
