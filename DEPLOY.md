# 莲花根雕非遗平台 - 部署文档

## 一、服务器环境准备

以 **阿里云轻量应用服务器**（Ubuntu / CentOS 镜像）为例。

### 1.1 安装 Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

验证：`node -v` 和 `npm -v`

### 1.2 安装 MongoDB

方案 A：直接使用 **阿里云 MongoDB 云数据库**（推荐，免运维）  
方案 B：服务器本地安装

```bash
sudo apt-get install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

### 1.3 安装 PM2 和 Nginx

```bash
sudo npm install -g pm2
sudo apt-get install -y nginx
```

---

## 二、项目上传与构建

### 2.1 上传代码

将项目目录 `lotus-root-carving-digital-heritage-platform/` 上传至服务器，例如 `/var/www/lotus/`。

### 2.2 安装依赖并构建

```bash
cd /var/www/lotus/client
npm install
npm run build

cd /var/www/lotus/server
npm install
```

### 2.3 配置后端环境变量

```bash
cd /var/www/lotus/server
cp .env.example .env
nano .env
```

`.env` 示例：

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/lotus_root_carving
JWT_SECRET=your_super_secret_jwt_key_change_in_production
```

### 2.4 初始化数据库

```bash
cd /var/www/lotus/server
node scripts/seed.js
```

---

## 三、Nginx 配置

编辑 Nginx 站点配置：

```bash
sudo nano /etc/nginx/sites-available/lotus
```

配置内容：

```nginx
server {
    listen 80;
    server_name your-domain-or-ip;

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        root /var/www/lotus/client/dist;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
}
```

启用配置：

```bash
sudo ln -s /etc/nginx/sites-available/lotus /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 四、启动后端服务

```bash
cd /var/www/lotus/server
pm2 start app.js --name lotus-server
pm2 save
pm2 startup
```

---

## 五、OSS 静态资源替换（可选）

1. 将作品图片、课程视频上传至 **阿里云 OSS**。
2. 获取对应文件的 URL。
3. 登录管理后台（`/admin`），在作品管理 / 课程管理中替换为 OSS URL。

---

## 六、常用维护命令

| 操作 | 命令 |
|------|------|
| 查看后端日志 | `pm2 logs lotus-server` |
| 重启后端 | `pm2 restart lotus-server` |
| 停止后端 | `pm2 stop lotus-server` |
| 重载 Nginx | `sudo nginx -s reload` |

---

## 七、默认账号

- 管理员：`admin` / `admin123`
