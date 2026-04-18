require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const connectDB = require('./config/db')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

// 连接 MongoDB 数据库
connectDB()

// 启用跨域资源共享
app.use(cors())
// 解析 JSON 请求体
app.use(express.json())

// 注册 API 路由
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/exhibition', require('./routes/exhibition.routes'))
app.use('/api/artworks', require('./routes/artwork.routes'))
app.use('/api/courses', require('./routes/course.routes'))
app.use('/api/questions', require('./routes/question.routes'))
app.use('/api/users', require('./routes/user.routes'))

// 根路径健康检查
app.get('/', (req, res) => {
  res.json({ message: '莲花根雕非遗数字化展示与教育平台 API 服务运行中' })
})

// 生产环境：托管前端构建产物（React 单页应用）
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')))

  // 所有非 /api 路由返回 index.html，支持 React Router 前端路由
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'))
  })
}

// 全局错误处理中间件
app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
