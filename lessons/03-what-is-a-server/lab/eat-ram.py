# Cứ 0,2 giây giữ thêm 50 MB RAM và in ra đã giữ bao nhiêu, cho tới khi bị kernel giết.
# Chỉ chạy trong giới hạn của systemd-run như trong bài, đừng chạy trần trên server thật.
import time

held = []
for i in range(1, 100):
    held.append(bytearray(50 * 1024 * 1024))
    print("held", i * 50, "MB", flush=True)
    time.sleep(0.2)
