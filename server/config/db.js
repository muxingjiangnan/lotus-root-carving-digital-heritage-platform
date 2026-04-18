const mongoose = require('mongoose')

/**
 * 连接 MongoDB 数据库
 * @description 使用 Mongoose 建立与 MongoDB 的连接，连接失败时终止进程
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    process.exit(1)
  }
}

module.exports = connectDB
