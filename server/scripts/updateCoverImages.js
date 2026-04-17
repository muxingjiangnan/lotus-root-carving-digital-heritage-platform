require('dotenv').config();
const connectDB = require('../config/db');
const Course = require('../models/Course');

const updates = [
  { title: '根雕纪录片《根》', coverImage: '/images/fm2.jpg' },
  { title: '寻根（根雕非遗纪录片）', coverImage: '/images/fm3.jpg' }
];

const run = async () => {
  try {
    await connectDB();

    for (const u of updates) {
      const result = await Course.updateOne(
        { title: u.title },
        { $set: { coverImage: u.coverImage } }
      );
      if (result.modifiedCount > 0) {
        console.log(`封面图更新成功: ${u.title} -> ${u.coverImage}`);
      } else {
        console.log(`未找到或无需更新: ${u.title}`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('更新失败:', error);
    process.exit(1);
  }
};

run();
