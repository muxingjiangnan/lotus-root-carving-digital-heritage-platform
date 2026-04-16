const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  material: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: ''
  },
  year: {
    type: Number,
    default: null
  },
  category: {
    type: String,
    enum: ['传统人物', '山水风景', '花鸟鱼虫', '现代创意'],
    default: '传统人物'
  },
  images: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Artwork', artworkSchema);
