const mongoose = require('mongoose')

/**
 * 问答数据模型
 * @description 定义用户提问的内容、分类、审核状态及官方回答
 */
const questionSchema = new mongoose.Schema({
  // 问题内容，必填，最多500字符，自动去除首尾空格
  content: { type: String, required: true, maxlength: 500, trim: true },
  // 问题分类：雕刻技艺、材料处理、作品鉴赏、文化传承、学习交流、其他
  category: { type: String, enum: ['雕刻技艺', '材料处理', '作品鉴赏', '文化传承', '学习交流', '其他'], default: '其他' },
  // 提问者用户ID，关联 User 模型
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // 审核状态：pending 待审核 / approved 已通过 / rejected 已拒绝
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  // 官方回答内容
  answer: { type: String, default: '' },
  // 创建时间，默认当前时间
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Question', questionSchema)
