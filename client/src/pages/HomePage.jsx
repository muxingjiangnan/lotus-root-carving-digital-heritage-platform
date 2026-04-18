import { Card, Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../components/MainLayout'
import Text3DFlip from '../components/ui/text-3d-flip'

// 六大功能入口配置
const featureList = [
  {
    title: '非遗展厅',
    desc: '探寻莲花根雕的历史渊源、传承人故事与数字化课程',
    path: '/exhibition',
    icon: '🏛️'
  },
  {
    title: '工艺流程',
    desc: '依形就势、精雕细琢，六步匠心见证天人合一',
    path: '/process',
    icon: '🔨'
  },
  {
    title: '数字作品库',
    desc: '欣赏高清根雕作品，探索传统艺术之美',
    path: '/artworks',
    icon: '🖼️'
  },
  {
    title: '在线微课程',
    desc: '短视频课程带你入门根雕技艺，感受湖湘乡土文化',
    path: '/courses',
    icon: '🎓'
  },
  {
    title: '文创产品',
    desc: '家居装饰、礼品收藏，让根雕艺术走进现代生活',
    path: '/creatives',
    icon: '🎁'
  },
  {
    title: '互动问答',
    desc: '提出你的疑问，与爱好者交流心得',
    path: '/questions',
    icon: '💬'
  }
]

/**
 * 首页
 * 包含 Hero Banner 首屏、文化导语、六大功能入口、项目背书
 */
function HomePage() {
  const navigate = useNavigate()

  return (
    <MainLayout>
      {/* Hero Banner 首屏 */}
      <div
        style={{
          position: 'relative',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          background:
            'linear-gradient(135deg, rgba(47,93,80,0.85) 0%, rgba(60,40,20,0.85) 100%), url(https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80) center/cover no-repeat',
          color: '#fff',
          textAlign: 'center',
          padding: '100px 16px 80px',
          borderRadius: '0 0 32px 32px'
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div
            style={{
              fontSize: 14,
              letterSpacing: 4,
              textTransform: 'uppercase',
              opacity: 0.85,
              marginBottom: 16
            }}
          >
            岳麓区区级非物质文化遗产 · 2012年列入
          </div>

          <Text3DFlip
            as="h1"
            className="mx-auto justify-center"
            style={{
              fontSize: 44,
              fontWeight: 700,
              fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif",
              letterSpacing: 4,
              margin: '0 0 16px',
              lineHeight: 1.3
            }}
            textClassName="text-[#F2D6A2]"
            flipTextClassName="text-[#F2D6A2]"
            rotateDirection="top"
            staggerDuration={0.03}
            staggerFrom="first"
            transition={{ type: 'spring', damping: 25, stiffness: 160 }}
          >
            天人合一 · 朽木不朽
          </Text3DFlip>

          <p
            style={{
              fontSize: 17,
              opacity: 0.9,
              maxWidth: 600,
              margin: '0 auto 32px',
              lineHeight: 1.8
            }}
          >
            长沙市岳麓区莲花镇特色传统手工艺，依形就势、精雕细琢，
            <br />
            承载湖湘乡土文化与民间审美。
          </p>

          <div
            style={{
              width: 1,
              height: 48,
              background: 'rgba(255,255,255,0.5)',
              margin: '0 auto'
            }}
          />
        </div>
      </div>

      {/* 文化导语 */}
      <div
        style={{
          maxWidth: 900,
          margin: '48px auto',
          textAlign: 'center',
          padding: '0 16px'
        }}
      >
        <p
          style={{
            fontSize: 18,
            color: '#5D5D5D',
            lineHeight: 2,
            fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif"
          }}
        >
          莲花镇依山傍水、植被丰茂，树根资源得天独厚。当地匠人不刻意破坏根材天然形态，
          讲究“天人合一”，作品多以人物、动物、山水、花鸟为题材，刀法细腻、意境悠远，
          是湖南地方非遗中极具代表性的手工技艺之一。
        </p>
        <div
          style={{
            width: 60,
            height: 3,
            background: '#C5A065',
            margin: '24px auto 0',
            borderRadius: 2
          }}
        />
      </div>

      {/* 六大功能入口 */}
      <div style={{ maxWidth: 1100, margin: '0 auto 48px', padding: '0 16px' }}>
        <h2
          style={{
            textAlign: 'center',
            color: '#8B4513',
            fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif",
            marginBottom: 32
          }}
        >
          探索莲花根雕
        </h2>
        <Row gutter={[24, 24]}>
          {featureList.map((item) => (
            <Col xs={24} sm={12} lg={8} key={item.title}>
              <Card
                hoverable
                onClick={() => navigate(item.path)}
                bodyStyle={{ padding: 28 }}
                style={{
                  height: '100%',
                  cursor: 'pointer',
                  borderRadius: 16,
                  border: '1px solid #E8E4DE',
                  background: '#fff',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: 36, marginBottom: 12 }}>{item.icon}</div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#3D3D3D',
                    marginBottom: 8,
                    fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif"
                  }}
                >
                  {item.title}
                </div>
                <p style={{ color: '#7A7A7A', fontSize: 14, lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* 项目背书 */}
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto 64px',
          padding: '32px 24px',
          background: 'rgba(139,69,19,0.04)',
          borderRadius: 16,
          border: '1px solid #E8E4DE',
          textAlign: 'center'
        }}
      >
        <h3
          style={{
            color: '#8B4513',
            fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif",
            marginBottom: 12
          }}
        >
          莲韵非遗 · 数字传承
        </h3>
        <p style={{ color: '#5D5D5D', fontSize: 15, lineHeight: 1.9, maxWidth: 700, margin: '0 auto' }}>
          湖南财政经济学院大学生创新创业项目，聚焦湖南莲花根雕非遗保护与数字化传承。
          通过数字化记录、资源库建设、课程开发、文化推广等方式，推动非遗进校园、进课堂、进生活，
          让湖湘非遗在数字时代实现可持续传承与创新发展。
        </p>
      </div>
    </MainLayout>
  )
}

export default HomePage
