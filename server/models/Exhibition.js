const mongoose = require('mongoose');

const exhibitionSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '莲花根雕非遗文化展厅'
  },
  sections: [
    {
      type: {
        type: String,
        enum: ['text', 'image', 'video'],
        required: true
      },
      content: {
        type: String,
        default: ''
      },
      caption: {
        type: String,
        default: ''
      }
    }
  ],
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Exhibition', exhibitionSchema);
