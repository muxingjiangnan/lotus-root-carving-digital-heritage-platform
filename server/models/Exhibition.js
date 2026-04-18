const mongoose = require('mongoose')

/**
 * 展厅数据模型
 * @description 定义非遗文化展厅的页面内容与版块结构
 */
const exhibitionSchema = new mongoose.Schema({
  // 展厅标题，默认展示名称
  title: { type: String, default: '莲花根雕非遗文化展厅' },
  // 历史渊源版块内容（富文本）
  historyContent: { type: String, default: '' },
  // 教学课程版块内容（富文本）
  coursesContent: { type: String, default: '' },
  // 项目介绍版块内容（富文本）
  projectContent: { type: String, default: '' },
  // 展厅自定义内容区块数组，支持文本、图片、视频
  sections: [{
    // 区块类型：text 文本 / image 图片 / video 视频
    type: { type: String, enum: ['text', 'image', 'video'], required: true },
    // 区块内容（文本内容或媒体URL）
    content: { type: String, default: '' },
    // 图片或视频的文字说明
    caption: { type: String, default: '' }
  }],
  // 最后更新时间，默认当前时间
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Exhibition', exhibitionSchema)
