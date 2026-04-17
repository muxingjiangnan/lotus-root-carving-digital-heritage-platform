require('dotenv').config();
const connectDB = require('../config/db');
const Artwork = require('../models/Artwork');

const updates = [
  {
    name: '观音坐莲',
    images: [
      '/images/guanyinzuolian.png',
      'https://picsum.photos/seed/guanyinzuoliandetail/800/600',
    ],
  },
  {
    name: '达摩面壁',
    images: [
      '/images/damomianbi.png',
      'https://picsum.photos/seed/damomianbidetail/800/600',
    ],
  },
  {
    name: '和合二仙',
    images: [
      '/images/hehexian.png',
      'https://picsum.photos/seed/hehexianetail/800/600',
    ],
  },
  {
    name: '山水清音',
    images: [
      '/images/shanshuiqingyin.png',
      'https://picsum.photos/seed/shanshuiqingyindetail/800/600',
    ],
  },
  {
    name: '江南水乡',
    images: [
      '/images/jiangnanshuixiang.png',
      'https://picsum.photos/seed/jiangnanshuixiangdetail/800/600',
    ],
  },
  {
    name: '荷塘月色',
    images: [
      '/images/hetangyuese.png',
      'https://picsum.photos/seed/hetangyuesedetail/800/600',
    ],
  },
  {
    name: '喜鹊登梅',
    images: [
      '/images/xiquedengmei.png',
      'https://picsum.photos/seed/xiquedengmeidetail/800/600',
    ],
  },
  {
    name: '金鱼戏莲',
    images: [
      '/images/jinyuxilian.png',
      'https://picsum.photos/seed/jinyuxiliandetail/800/600',
    ],
  },
  {
    name: '鹭鸶探莲',
    images: [
      '/images/lusitanlian.png',
      'https://picsum.photos/seed/lusitanliandetail/800/600',
    ],
  },
  {
    name: '根语·年轮',
    images: [
      '/images/genyu.png',
      'https://picsum.photos/seed/genyuetail/800/600',
    ],
  },
  {
    name: '莲韵·重生',
    images: [
      '/images/lianyuncsheng.png',
      'https://picsum.photos/seed/lianyunchengdetail/800/600',
    ],
  },
  {
    name: '裂变',
    images: [
      '/images/liebian.png',
      'https://picsum.photos/seed/liebiandetail/800/600',
    ],
  },
];

const run = async () => {
  try {
    await connectDB();

    for (const u of updates) {
      const result = await Artwork.updateOne(
        { name: u.name },
        { $set: { images: u.images } }
      );
      if (result.matchedCount > 0) {
        console.log(`✅ 更新成功: ${u.name} -> ${u.images[0]}`);
      } else {
        console.log(`⚠️ 未找到作品: ${u.name}`);
      }
    }

    process.exit(0);
  } catch (error) {
    console.error('更新失败:', error);
    process.exit(1);
  }
};

run();
