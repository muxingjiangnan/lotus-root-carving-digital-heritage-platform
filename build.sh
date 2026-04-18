#!/bin/bash
set -e

echo ">>> 安装并构建前端..."
cd client
npm install
npm run build
cd ..

echo ">>> 复制前端构建产物到 server/dist..."
rm -rf server/dist
cp -r client/dist server/dist

echo ">>> 安装服务端依赖..."
cd server
npm install
