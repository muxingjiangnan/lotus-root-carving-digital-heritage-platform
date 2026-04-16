require('dotenv').config();
const connectDB = require('../config/db');
const Artwork = require('../models/Artwork');

// 使用稳定的占位图服务，为每件作品生成主图与细节图
const makeImages = (seed) => [
  `https://picsum.photos/seed/${seed}/800/600`,
  `https://picsum.photos/seed/${seed}detail/800/600`
];

const artworks = [
  {
    name: '观音坐莲',
    material: '野生七孔莲花老根',
    size: '长45cm × 宽20cm × 高18cm',
    year: 2018,
    category: '传统人物',
    images: makeImages('guanyinzuolian'),
    description: '选用形态端庄的野生七孔莲花老根，顺其天然纹理雕刻观音坐像。观音神态安详，衣袂飘逸，莲瓣座台与根材浑然一体，寓意“心似莲花开，清风自然来”。'
  },
  {
    name: '达摩面壁',
    material: '深潭陈藕根',
    size: '长38cm × 宽22cm × 高15cm',
    year: 2019,
    category: '传统人物',
    images: makeImages('damomianbi'),
    description: '以深潭陈藕根为原料，保留根瘤的沧桑肌理，雕刻达摩祖师面壁静修之态。褶皱与根疤相辅相成，传递“十年面壁图破壁”的坚韧精神。'
  },
  {
    name: '和合二仙',
    material: '并蒂双孔莲根',
    size: '长52cm × 宽28cm × 高24cm',
    year: 2020,
    category: '传统人物',
    images: makeImages('hehexian'),
    description: '取材罕见的并蒂双孔莲根，分左右两体雕刻和合二仙。一仙持荷，一仙捧盒，谐音“和合”，象征家庭美满、社会和谐，是传统婚俗文化的经典表达。'
  },
  {
    name: '山水清音',
    material: '百年莲根',
    size: '长60cm × 宽30cm × 高25cm',
    year: 2020,
    category: '山水风景',
    images: makeImages('shanshuiqingyin'),
    description: '以山水为题材，利用莲根天然分叉表现远山近水、亭台楼阁。层次分明，意境深远，细听仿佛有山泉清音流淌其间，展现江南水乡的宁静秀美。'
  },
  {
    name: '江南水乡',
    material: '陈年藕根',
    size: '长55cm × 宽32cm × 高20cm',
    year: 2017,
    category: '山水风景',
    images: makeImages('jiangnanshuixiang'),
    description: '将藕根的孔洞化作江南拱桥与流水人家，虚实相生。作品保留了藕根特有的丝连纹理，隐喻江南人剪不断、理还乱的故土情结。'
  },
  {
    name: '荷塘月色',
    material: '莲花老根',
    size: '长48cm × 宽26cm × 高22cm',
    year: 2021,
    category: '山水风景',
    images: makeImages('hetangyuese'),
    description: '灵感源自朱自清名篇，以透雕技法表现月光下荷叶田田、疏影横斜的意境。根材的深浅色差恰好模拟月夜的光影明暗，诗意盎然。'
  },
  {
    name: '喜鹊登梅',
    material: '优质莲根',
    size: '长35cm × 宽18cm × 高15cm',
    year: 2019,
    category: '花鸟鱼虫',
    images: makeImages('xiquedengmei'),
    description: '喜鹊立于梅枝之上，昂首报春。梅枝由根材主杆顺势而出，花朵以浮雕点缀其间，寓意“喜上眉梢”，雕工精细，栩栩如生。'
  },
  {
    name: '金鱼戏莲',
    material: '莲藕根瘤',
    size: '长30cm × 宽15cm × 高12cm',
    year: 2020,
    category: '花鸟鱼虫',
    images: makeImages('jinyuxilian'),
    description: '将莲藕根瘤的圆润形态化为荷叶，几条金鱼穿梭于根须之间，似在水中嬉戏。作品玲珑剔透，充满生机，寓意“连年有余”。'
  },
  {
    name: '鹭鸶探莲',
    material: '野生七孔莲根',
    size: '长42cm × 宽20cm × 高18cm',
    year: 2021,
    category: '花鸟鱼虫',
    images: makeImages('lusitanlian'),
    description: '一只鹭鸶俯身探向莲花，姿态优雅，根须化作水草摇曳。作品谐音“一路连科”，寄托了对学子仕途顺利、一路高升的美好祝愿。'
  },
  {
    name: '根语·年轮',
    material: '莲花根瘤',
    size: '长40cm × 宽25cm × 高22cm',
    year: 2022,
    category: '现代创意',
    images: makeImages('genyu'),
    description: '突破传统题材束缚，以抽象手法保留根瘤的年轮纹理与裂痕，象征生命的沧桑与韧性。在残缺中寻找完整，是传统技艺当代表达的一次探索。'
  },
  {
    name: '莲韵·重生',
    material: '废弃莲藕根',
    size: '长35cm × 宽20cm × 高18cm',
    year: 2023,
    category: '现代创意',
    images: makeImages('lianyuncsheng'),
    description: '取材田间废弃莲藕根，经清洗、防腐、雕刻后化腐朽为神奇。作品以螺旋向上的造型表现生命的重生，传递环保与非遗共生的当代理念。'
  },
  {
    name: '裂变',
    material: '巨型莲根',
    size: '长65cm × 宽35cm × 高30cm',
    year: 2022,
    category: '现代创意',
    images: makeImages('liebian'),
    description: '利用巨型莲根的自然裂变纹理，辅以极简雕刻，营造出强烈的视觉张力。作品探讨传统与现代的碰撞，如同非遗在数字时代的裂变与新生。'
  }
];

const seed = async () => {
  try {
    await connectDB();

    // 清空现有作品数据并重新插入，确保内容最新
    await Artwork.deleteMany({});
    console.log('已清空现有作品数据');

    await Artwork.insertMany(artworks);
    console.log(`成功导入 ${artworks.length} 件莲花根雕作品`);

    process.exit(0);
  } catch (error) {
    console.error('导入失败:', error);
    process.exit(1);
  }
};

seed();
