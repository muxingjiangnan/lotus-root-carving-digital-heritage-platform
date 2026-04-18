const mongoose = require('mongoose');

const exhibitionSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '莲花根雕非遗文化展厅'
  },
  historyContent: {
    type: String,
    default: ''
  },
  coursesContent: {
    type: String,
    default: ''
  },
  projectContent: {
    type: String,
    default: ''
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
