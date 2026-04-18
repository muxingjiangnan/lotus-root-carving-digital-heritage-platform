const mongoose = require('mongoose')

/**
 * 用户数据模型
 * @description 定义平台注册用户的账号信息，包含用户名、密码哈希及角色权限
 */
const userSchema = new mongoose.Schema({
  // 用户名，唯一标识，最少3个字符，自动去除首尾空格
  username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
  // 密码哈希值，不存储明文密码
  passwordHash: { type: String, required: true },
  // 手机号
  phone: { type: String, default: '' },
  // 邮箱
  email: { type: String, default: '' },
  // 用户角色：user 为普通用户，admin 为管理员
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  // 账号创建时间，默认当前时间
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)
