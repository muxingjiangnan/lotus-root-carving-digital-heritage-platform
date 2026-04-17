require('dotenv').config();
const connectDB = require('../config/db');
const Course = require('../models/Course');

const run = async () => {
  try {
    await connectDB();

    const result = await Course.updateOne(
      { title: '器物莲花香插雕刻全过程' },
      { $set: { coverImage: '/images/lotus-root-carving.jpg' } }
    );

    if (result.modifiedCount > 0) {
      console.log('封面图更新成功: 器物莲花香插雕刻全过程');
    } else {
      console.log('未找到对应课程或无需更新');
    }

    process.exit(0);
  } catch (error) {
    console.error('更新失败:', error);
    process.exit(1);
  }
};

run();
