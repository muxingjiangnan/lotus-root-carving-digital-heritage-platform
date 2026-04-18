const mongoose = require('mongoose')

/**
 * 评论数据模型
 * @description 定义用户对问题的回复评论信息
 */
const commentSchema = new mongoose.Schema({
  // 评论内容，必填，最多500字符，自动去除首尾空格
  content: { type: String, required: true, maxlength: 500, trim: true },
  // 关联的问题ID，关联 Question 模型，建立索引
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true, index: true },
  // 评论作者用户ID，关联 User 模型
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // 创建时间，默认当前时间
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Comment', commentSchema)
