require('dotenv').config();
const connectDB = require('../config/db');
const Course = require('../models/Course');

const titlesToRemove = [
  '莲花根雕入门：认识工具与材料',
  '莲花根雕基础技法：粗雕与定型'
];

const run = async () => {
  try {
    await connectDB();

    for (const title of titlesToRemove) {
      const result = await Course.deleteOne({ title });
      if (result.deletedCount > 0) {
        console.log(`已删除: ${title}`);
      } else {
        console.log(`未找到，跳过: ${title}`);
      }
    }

    console.log('清理完成');
    process.exit(0);
  } catch (error) {
    console.error('清理失败:', error);
    process.exit(1);
  }
};

run();
