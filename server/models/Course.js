const mongoose = require('mongoose')

/**
 * 课程数据模型
 * @description 定义非遗教学课程的基本信息及章节内容
 */
const courseSchema = new mongoose.Schema({
  // 课程标题，必填，自动去除首尾空格
  title: { type: String, required: true, trim: true },
  // 课程封面图片URL
  coverImage: { type: String, default: '' },
  // 课程简介
  description: { type: String, default: '' },
  // 课程章节列表，包含标题、视频地址、时长、来源及外部链接
  chapters: [{
    // 章节标题
    title: { type: String, required: true },
    // 视频播放地址
    videoUrl: { type: String, required: true },
    // 视频时长
    duration: { type: String, default: '' },
    // 视频来源：local 本地 / 其他来源标识
    source: { type: String, default: 'local' },
    // 外部视频链接地址
    externalUrl: { type: String, default: '' }
  }],
  // 创建时间，默认当前时间
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Course', courseSchema)
