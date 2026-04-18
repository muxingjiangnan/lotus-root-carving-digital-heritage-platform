const mongoose = require('mongoose')

/**
 * 作品数据模型
 * @description 定义莲花根雕作品的详细信息，包括名称、材质、尺寸、年代、分类及图片
 */
const artworkSchema = new mongoose.Schema({
  // 作品名称，必填，自动去除首尾空格
  name: { type: String, required: true, trim: true },
  // 作品材质，如莲花根、木材等
  material: { type: String, default: '' },
  // 作品尺寸描述
  size: { type: String, default: '' },
  // 创作年代
  year: { type: Number, default: null },
  // 作品分类：传统人物、山水风景、花鸟鱼虫、现代创意
  category: { type: String, enum: ['传统人物', '山水风景', '花鸟鱼虫', '现代创意'], default: '传统人物' },
  // 作品图片URL数组
  images: { type: [String], default: [] },
  // 作品详细描述
  description: { type: String, default: '' },
  // 创建时间，默认当前时间
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Artwork', artworkSchema)
