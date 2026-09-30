"""
Tách vật thể khỏi nền cũ của ảnh chụp sản phẩm — bước 2a của quy trình ảnh minh hoạ, chạy TRƯỚC hau-ky.py.

  python scripts/anh/tach-nen.py VAO.jpg RA.png --cach mo-hinh|nen-tron|phong|mau [--hue 160-215] [--cat-de]
  python scripts/anh/hau-ky.py RA.png BAI.webp --fit 800x600        # rồi chuyển hai tông như mọi ảnh khác

Ra: RA.png trong suốt, cắt sát vật thể, kèm RA-mask.png để soát. hau-ky.py đặt nó lên nền trắng, nên sau
khi chuyển hai tông, chỗ từng là nền cũ thành đúng màu mặt đọc (#fffdf8) — hết cảnh "ô nền" lạc trên trang.

Bốn cách, chọn theo ảnh. Cách nào cũng phải XEM TẬN MẮT mặt nạ trước khi dùng:
  mo-hinh   Mô hình rembg (isnet-general-use), chạy cục bộ. Hợp: một vật thể rõ trên nền studio (SSD, card
            mạng, router). Hỏng: vật dài mảnh (thanh RAM chỉ còn mảnh vụn) và bỏ mất những thứ không phải
            "vật thể chính" như nhãn chữ, đế trưng bày (mẫu cáp quang biển). Cài riêng một lần:
              python -m venv .venv-anh  &&  .venv-anh/Scripts/pip install "rembg[cpu]"
            rồi chạy script bằng .venv-anh/Scripts/python. Lần đầu tải mô hình khoảng 180 MB.
  nen-tron  Nền một màu: xoá vùng gần màu nền NỐI LIỀN VỚI MÉP ẢNH. Chi tiết cùng màu nền nhưng nằm lọt bên
            trong vật thể được giữ (chip nhớ đen trên thanh RAM nền nâu sẫm).
  phong     Phông chuyển sắc: khớp một mặt cong bậc hai theo viền trên/trái/phải, xoá điểm gần màu phông.
            Giữ được nhãn chữ và đường dẫn nhãn (mẫu cáp quang biển). --cat-de cắt vệt bóng mặt bàn nằm
            dưới và cạnh một đế tối màu ở đáy ảnh.
  mau       Vật thể có một màu riêng bao quanh: lấy vùng có hue trong khoảng --hue, lấp phần bên trong
            (CPU: đế xanh ngọc bao quanh nắp kim loại; nền trắng và bóng đổ xám không có màu nên tự loại).

KHÔNG tách nền ảnh chụp cảnh (tủ máy chủ trong trung tâm dữ liệu, IMP trong bảo tàng, chân dung): ở đó nền
là một phần thông tin của ảnh. Ghi cách đã dùng vào cột "Đã chỉnh" của lessons/NN/img/NGUON.md.
"""
import os, sys
import numpy as np
from PIL import Image
from scipy import ndimage


def arg(name, default=None):
    return sys.argv[sys.argv.index(name) + 1] if name in sys.argv else default


def load(p):
    im = Image.open(p)
    if im.mode in ('RGBA', 'LA', 'P'):
        im = im.convert('RGBA'); bg = Image.new('RGBA', im.size, (255, 255, 255, 255)); bg.alpha_composite(im); im = bg
    return im.convert('RGB')


def largest(m):
    lab, n = ndimage.label(m)
    if n == 0: return m
    sizes = ndimage.sum(m, lab, range(1, n + 1)); return lab == (1 + int(np.argmax(sizes)))


def cach_mo_hinh(im):
    from rembg import remove, new_session          # chỉ cần khi dùng cách này
    return np.asarray(remove(im, session=new_session('isnet-general-use'), post_process_mask=True).getchannel('A')) / 255.0


def cach_nen_tron(a):
    edge = np.concatenate([a[:3].reshape(-1, 3), a[-3:].reshape(-1, 3), a[:, :3].reshape(-1, 3), a[:, -3:].reshape(-1, 3)])
    near = np.linalg.norm(a - np.median(edge, axis=0), axis=2) < 48
    lab, _ = ndimage.label(near)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    obj = ndimage.binary_opening(~np.isin(lab, list(border)), iterations=1)
    return ndimage.gaussian_filter(obj.astype(float), 0.7)


def cach_phong(a, cat_de):
    H, W, _ = a.shape
    yy, xx = np.mgrid[0:H, 0:W]; X, Y = xx / W, yy / H
    band = np.zeros((H, W), bool); b = int(0.03 * min(H, W))
    band[:b] = band[:, :b] = band[:, -b:] = True             # viền trên, trái, phải (đáy thường là đế)
    A = np.stack([np.ones_like(X), X, Y, X * X, X * Y, Y * Y], -1)
    sel = band.copy()
    for _ in range(3):                                       # khớp lặp, loại dần điểm lệch (chữ, vật chạm viền)
        coef = [np.linalg.lstsq(A[sel], a[..., c][sel], rcond=None)[0] for c in range(3)]
        bg = np.stack([A @ coef[c] for c in range(3)], -1)
        res = np.linalg.norm(a - bg, axis=2)
        sel = band & (res < np.percentile(res[band], 80))
    alpha = np.clip((np.linalg.norm(a - bg, axis=2) - 14) / 20, 0, 1)
    keep = ndimage.binary_dilation(ndimage.binary_opening(alpha > 0.5, iterations=1), iterations=2)
    alpha = alpha * keep
    if cat_de:                                               # cắt vệt bóng mặt bàn quanh đế tối ở đáy
        dark = a.mean(axis=2) < 70
        rows = np.where(dark[:, int(0.05 * W):int(0.9 * W)].mean(axis=1) > 0.45)[0]
        bottom = rows.max()
        cols = np.where(dark[int(0.75 * H):bottom + 1].mean(axis=0) > 0.35)[0]
        alpha[bottom + 2:] = 0
        alpha[int(0.6 * H):, cols.max() + 2:] = 0
        alpha[int(0.6 * H):, :max(0, cols.min() - 2)] = 0
    return alpha


def cach_mau(im, hue):
    lo, hi = (float(x) for x in hue.split('-'))
    hsv = np.asarray(im.convert('HSV')).astype(float)
    h, s, v = hsv[..., 0] * 360 / 255, hsv[..., 1] / 255, hsv[..., 2] / 255
    m = (h > lo) & (h < hi) & (s > 0.28) & (v > 0.18)
    m = largest(ndimage.binary_fill_holes(ndimage.binary_closing(m, iterations=6)))
    return ndimage.gaussian_filter(ndimage.binary_opening(m, iterations=3).astype(float), 0.8)


src, dst = sys.argv[1], sys.argv[2]
cach = arg('--cach', 'mo-hinh')
im = load(src); a = np.asarray(im).astype(float)
if cach == 'mo-hinh': alpha = cach_mo_hinh(im)
elif cach == 'nen-tron': alpha = cach_nen_tron(a)
elif cach == 'phong': alpha = cach_phong(a, '--cat-de' in sys.argv)
elif cach == 'mau': alpha = cach_mau(im, arg('--hue', '160-215'))
else: sys.exit('--cach phải là mo-hinh | nen-tron | phong | mau')

mask = Image.fromarray((np.clip(alpha, 0, 1) * 255).astype(np.uint8), 'L')
mask.save(os.path.splitext(dst)[0] + '-mask.png')
box = mask.point(lambda v: 255 if v > 16 else 0).getbbox()
out = im.convert('RGBA'); out.putalpha(mask); out = out.crop(box)
out.save(dst)
print(dst, 'khung vật thể', box, '->', out.size)
