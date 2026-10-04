#!/usr/bin/env bash
# nghe-signal.sh — mot process dang ky handler cho SIGTERM, nhu Spring Boot
# Bai 04, Lab 4. Chay trong Ubuntu (WSL2):  bash nghe-signal.sh
# Cua so khac:  kill <PID>     -> handler chay, process thoat em (exit status 0)
#               kill -9 <PID>  -> khong handler nao chay duoc, bash bao "Killed"
echo "PID = $$ · dang chay. Cua so kia: kill $$  hoac  kill -9 $$"
trap 'echo "[SIGTERM] duoc bao truoc, dang don dep..."; exit 0' TERM
while true; do
  sleep 1
done
