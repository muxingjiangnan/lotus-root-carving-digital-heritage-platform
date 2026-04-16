require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('../config/db');
const User = require('../models/User');
const Exhibition = require('../models/Exhibition');
const Artwork = require('../models/Artwork');
const Course = require('../models/Course');

const seed = async () => {
  try {
    await connectDB();

    // 创建管理员账号
    const adminExists = await User.findOne({ username: 'admin' });
    if (!adminExists) {
      const passwordHash = await bcrypt.hash('admin123', 10);
      await User.create({
        username: 'admin',
        passwordHash,
        role: 'admin'
      });
      console.log('管理员账号创建成功: admin / admin123');
    } else {
      console.log('管理员账号已存在，跳过创建');
    }

    // 创建默认展厅内容
    const exhibitionExists = await Exhibition.findOne();
    if (!exhibitionExists) {
      await Exhibition.create({
        title: '莲花根雕非遗文化展厅',
        sections: [
          {
            type: 'text',
            content: '莲花根雕是湖南省独具特色的传统民间工艺，以莲花根茎为原料，利用其自然形态进行雕刻创作，兼具观赏价值与文化内涵。'
          },
          {
            type: 'text',
            content: '技艺传承至今已有百余年历史，代表性传承人以其精湛刀法和独到审美，将平凡的莲根化为栩栩如生的艺术珍品。'
          },
          {
            type: 'image',
            content: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80',
            caption: '代表性传承人工作照（示例图）'
          },
          {
            type: 'text',
            content: '莲花根雕的制作工艺复杂，包括选料、设计、粗雕、细雕、打磨、上色等多道工序，每一步都需要匠人倾注大量心血。'
          },
          {
            type: 'video',
            content: 'https://www.w3schools.com/html/mov_bbb.mp4',
            caption: '根雕技艺介绍短视频（示例视频）'
          }
        ]
      });
      console.log('默认展厅内容创建成功');
    } else {
      console.log('展厅内容已存在，跳过创建');
    }

    // 创建示例作品
    const artworkCount = await Artwork.countDocuments();
    if (artworkCount === 0) {
      await Artwork.insertMany([
        {
          name: '观音坐莲',
          material: '莲花老根',
          size: '45cm x 20cm x 18cm',
          year: 2018,
          category: '传统人物',
          images: ['https://images.unsplash.com/photo-1544531586-fde5298cdd40?w=600&q=80'],
          description: '利用莲花根天然纹理雕刻而成的观音像，神态安详，衣袂飘逸。'
        },
        {
          name: '山水清音',
          material: '百年莲根',
          size: '60cm x 30cm x 25cm',
          year: 2020,
          category: '山水风景',
          images: ['https://images.unsplash.com/photo-1516961642265-531546e84af2?w=600&q=80'],
          description: '以山水为题材，展现江南水乡的宁静与秀美，层次分明，意境深远。'
        },
        {
          name: '喜鹊登梅',
          material: '优质莲根',
          size: '35cm x 18cm x 15cm',
          year: 2019,
          category: '花鸟鱼虫',
          images: ['https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80'],
          description: '喜鹊立于梅枝之上，寓意吉祥如意，雕工精细，栩栩如生。'
        },
        {
          name: '现代抽象·根语',
          material: '莲花根瘤',
          size: '40cm x 25cm x 22cm',
          year: 2022,
          category: '现代创意',
          images: ['https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&q=80'],
          description: '突破传统题材，以抽象手法表现根材的自然肌理与岁月痕迹。'
        }
      ]);
      console.log('示例作品创建成功');
    } else {
      console.log('作品数据已存在，跳过创建');
    }

    // 创建示例课程
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      await Course.insertMany([
        {
          title: '莲花根雕入门：认识工具与材料',
          coverImage: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&q=80',
          description: '从零开始了解莲花根雕所需的基础工具、选材技巧及安全注意事项。',
          chapters: [
            { title: '第一节：根雕工具介绍', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '05:20' },
            { title: '第二节：莲花根的挑选', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '06:15' },
            { title: '第三节：安全操作规范', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '04:30' }
          ]
        },
        {
          title: '莲花根雕基础技法：粗雕与定型',
          coverImage: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=600&q=80',
          description: '学习粗雕的基本刀法，掌握如何根据原料形态确定作品整体造型。',
          chapters: [
            { title: '第一节：粗雕刀法演示', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '08:00' },
            { title: '第二节：定型与取舍', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', duration: '07:45' }
          ]
        }
      ]);
      console.log('示例课程创建成功');
    } else {
      console.log('课程数据已存在，跳过创建');
    }

    console.log('Seed 完成');
    process.exit(0);
  } catch (error) {
    console.error('Seed 失败:', error);
    process.exit(1);
  }
};

seed();
