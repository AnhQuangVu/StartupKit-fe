#!/bin/bash

echo "=== Bắt đầu deployment ==="

echo "Bước 1: Build project..."
npm run build

echo "Bước 2: Kiểm tra và chuẩn bị thư mục..."
if [ -d "/var/www/startupkit" ]; then
    echo "Thư mục tồn tại, xóa thư mục cũ..."
    rm -rf /var/www/startupkit/
else
    echo "Thư mục chưa tồn tại, tạo thư mục mới..."
    sudo mkdir -p /var/www/startupkit
fi

echo "Bước 3: Di chuyển thư mục dist mới..."
sudo mv /root/home/StartupKit-fe/dist /var/www/startupkit/

echo "Bước 4: Kiểm tra cấu hình nginx..."
sudo nginx -t

echo "Bước 5: Khởi động lại nginx..."
sudo systemctl restart nginx

echo "=== Deployment hoàn tất ==="
