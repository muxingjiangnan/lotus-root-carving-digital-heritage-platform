# 莲花根雕非遗数字化展示与教育平台

大学生创新创业训练计划（大创赛）结题项目，聚焦湖南省地方特色非遗——莲花根雕，构建数字化展示与教育 Web 平台。

## 核心功能

- **非遗文化展厅**：图文混排、视频嵌入，展示莲花根雕历史渊源与传承人故事
- **数字作品库**：作品分类浏览、关键词搜索、详情大图预览
- **在线微课程**：短视频课程、章节切换、本地学习进度记忆
- **互动问答区**：用户提交问题，管理员审核后公开展示及回复
- **简易管理后台**：管理员可维护展厅内容、作品、课程及问答审核

## 技术栈

- **前端**：React 19 + Vite 8 + Redux Toolkit + React Router v7 + Ant Design 6 + Axios + Tailwind CSS 4 + Motion
- **后端**：Node.js + Express 5 + MongoDB (Mongoose) + express-validator
- **部署**：Render (Free Tier) + MongoDB Atlas (Free Cluster)
- **静态资源**：本地静态资源（随项目部署）

## 快速开始

### 1. 环境要求

- Node.js >= 18
- MongoDB >= 5.0

### 2. 安装依赖

```bash
# 前端
cd client
npm install
npm run dev

# 后端
cd server
npm install
```

### 3. 配置环境变量

```bash
cd server
cp .env.example .env
# 编辑 .env，填入你的 MONGO_URI 和 JWT_SECRET
```

### 4. 初始化数据

```bash
cd server
npm run seed
```

默认管理员账号：`admin` / `admin123`

### 5. 启动后端

```bash
cd server
npm run dev
```

前端默认运行在 `http://localhost:3000`，后端默认运行在 `http://localhost:5000`。

## 部署说明

本项目采用 **Render + MongoDB Atlas** 免费方案部署，无需购买服务器。

详见 [DEPLOY.md](./DEPLOY.md)。

## 项目定位

- 最小可行产品（MVP），轻量化、低成本、易部署
- 满足大创结题及软件著作权登记需求
- 代码结构清晰，具备独创性
