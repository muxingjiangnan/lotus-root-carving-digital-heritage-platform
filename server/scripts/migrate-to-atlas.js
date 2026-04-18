/**
 * 迁移脚本：将本地 MongoDB 数据复制到 MongoDB Atlas
 */
const { MongoClient } = require('mongodb');

const LOCAL_URI = 'mongodb://localhost:27017/lotus_root_carving';
const ATLAS_URI = 'mongodb+srv://muxingjiangnan:DX.dx.dx.520@cluster0.4kh4ijk.mongodb.net/lotus_root_carving?retryWrites=true&w=majority&appName=Cluster0';

const COLLECTIONS = ['users', 'artworks', 'courses', 'exhibitions', 'questions', 'comments'];

async function migrate() {
  const localClient = new MongoClient(LOCAL_URI);
  const atlasClient = new MongoClient(ATLAS_URI);

  try {
    await localClient.connect();
    await atlasClient.connect();

    const localDb = localClient.db('lotus_root_carving');
    const atlasDb = atlasClient.db('lotus_root_carving');

    for (const collectionName of COLLECTIONS) {
      const localColl = localDb.collection(collectionName);
      const atlasColl = atlasDb.collection(collectionName);

      const count = await localColl.countDocuments();
      if (count === 0) {
        console.log(`⏭️  ${collectionName}: 本地无数据，跳过`);
        continue;
      }

      // 先清空 Atlas 中的旧数据（避免冲突）
      await atlasColl.deleteMany({});

      // 读取本地数据并写入 Atlas
      const data = await localColl.find({}).toArray();
      // 移除 MongoDB 的 _id 字段，让 Atlas 自动生成（避免 ObjectId 冲突）
      const cleanData = data.map(({ _id, ...rest }) => rest);

      if (cleanData.length > 0) {
        await atlasColl.insertMany(cleanData);
      }

      console.log(`✅ ${collectionName}: ${cleanData.length} 条数据已迁移`);
    }

    console.log('\n🎉 数据迁移完成！');
  } catch (error) {
    console.error('❌ 迁移失败:', error.message);
  } finally {
    await localClient.close();
    await atlasClient.close();
    process.exit(0);
  }
}

migrate();
