require('dotenv').config();
const connectDB = require('../config/db');
const Course = require('../models/Course');

const bilibiliCourses = [
  {
    title: '寻根（根雕非遗纪录片）',
    coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&q=80',
    description: '根雕非遗纪录片，讲述根雕艺术的文化根源与传承故事。',
    chapters: [
      {
        title: '正片',
        videoUrl: 'BV1cv4y1P7BM',
        duration: '',
        source: 'bilibili',
        externalUrl: 'https://www.bilibili.com/video/BV1cv4y1P7BM/?share_source=copy_web&vd_source=5c183b3c99688351a5648503c538dfe9'
      }
    ]
  },
  {
    title: '根雕纪录片《根》',
    coverImage: 'https://images.unsplash.com/photo-1516961642265-531546e84af2?w=600&q=80',
    description: '通用根雕介绍纪录片，展现根雕艺术的自然之美与匠人精神。',
    chapters: [
      {
        title: '正片',
        videoUrl: 'BV1nY4y1Y7FE',
        duration: '',
        source: 'bilibili',
        externalUrl: 'https://www.bilibili.com/video/BV1nY4y1Y7FE/?share_source=copy_web&vd_source=5c183b3c99688351a5648503c538dfe9'
      }
    ]
  },
  {
    title: '器物莲花香插雕刻全过程',
    coverImage: 'https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=600&q=80',
    description: '莲花根雕沉浸式全流程教程，从选材到成品的完整雕刻记录。',
    chapters: [
      {
        title: '正片',
        videoUrl: 'BV1Ch4y1Q7Ka',
        duration: '',
        source: 'bilibili',
        externalUrl: 'https://www.bilibili.com/video/BV1Ch4y1Q7Ka/?share_source=copy_web&vd_source=5c183b3c99688351a5648503c538dfe9'
      }
    ]
  }
];

const seed = async () => {
  try {
    await connectDB();

    for (const course of bilibiliCourses) {
      const exists = await Course.findOne({ title: course.title });
      if (!exists) {
        await Course.create(course);
        console.log(`创建成功: ${course.title}`);
      } else {
        console.log(`已存在，跳过: ${course.title}`);
      }
    }

    console.log('Bilibili 课程 Seed 完成');
    process.exit(0);
  } catch (error) {
    console.error('Seed 失败:', error);
    process.exit(1);
  }
};

seed();
