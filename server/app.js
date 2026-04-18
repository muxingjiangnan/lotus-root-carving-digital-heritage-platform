require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// 连接数据库
connectDB();

// 中间件
app.use(cors());
app.use(express.json());

// 路由挂载
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/exhibition', require('./routes/exhibition.routes'));
app.use('/api/artworks', require('./routes/artwork.routes'));
app.use('/api/courses', require('./routes/course.routes'));
app.use('/api/questions', require('./routes/question.routes'));
app.use('/api/users', require('./routes/user.routes'));

// 根路径健康检查
app.get('/', (req, res) => {
  res.json({ message: '莲花根雕非遗数字化展示与教育平台 API 服务运行中' });
});

// 全局错误处理
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
