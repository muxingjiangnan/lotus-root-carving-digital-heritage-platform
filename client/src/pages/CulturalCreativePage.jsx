import { Card, Row, Col } from 'antd';
import MainLayout from '../components/MainLayout';
import PageHeader from '../components/PageHeader';

const creativeSeries = [
  {
    title: '家居装饰系列',
    desc:
      '包含根雕摆件、挂饰、屏风等，适用于家庭、办公室、茶室空间，强调自然质感与中式美学。让每一件作品都成为空间中的文化符号，营造宁静雅致的东方意境。',
    image:
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    tag: '生活美学',
  },
  {
    title: '礼品系列',
    desc:
      '小巧精致、寓意吉祥，便于携带与赠送，融合莲花镇地域文化与祝福内涵。无论是节庆礼赠还是商务往来，都是传递心意与文化温度的佳品。',
    image:
      'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80',
    tag: '心意之选',
  },
  {
    title: '文化收藏系列',
    desc:
      '选用优质楠木、紫檀等材料，由匠人手工创作，艺术性强、独具收藏价值，面向非遗爱好者与收藏家。每一件藏品都凝聚着匠人的心血与岁月的沉淀。',
    image:
      'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80',
    tag: '匠心典藏',
  },
];

const CulturalCreativePage = () => {
  return (
    <MainLayout>
      <PageHeader
        title="莲花根雕文创产品"
        subtitle="尊重自然 · 传承文化 · 创新设计"
        bgImage="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1600&q=80"
        dark
      />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 16px 48px' }}>
        <div
          style={{
            textAlign: 'center',
            maxWidth: 720,
            margin: '0 auto 40px',
          }}
        >
          <p style={{ fontSize: 16, color: '#5D5D5D', lineHeight: 1.9 }}>
            莲花根雕文创以天然材料、文化寓意、实用美观为核心，开发三大系列。
            我们坚持让根雕艺术走进现代生活，使传统技艺在日常中焕发新生。
          </p>
          <div
            style={{
              width: 60,
              height: 3,
              background: '#C5A065',
              margin: '20px auto 0',
              borderRadius: 2,
            }}
          />
        </div>

        <Row gutter={[32, 32]}>
          {creativeSeries.map((item) => (
            <Col xs={24} md={8} key={item.title}>
              <Card
                hoverable
                cover={
                  <div style={{ position: 'relative' }}>
                    <img
                      alt={item.title}
                      src={item.image}
                      style={{
                        height: 260,
                        width: '100%',
                        objectFit: 'cover',
                        borderRadius: '12px 12px 0 0',
                      }}
                    />
                    <span
                      style={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        background: 'rgba(139,69,19,0.9)',
                        color: '#fff',
                        padding: '4px 12px',
                        borderRadius: 20,
                        fontSize: 12,
                        letterSpacing: 1,
                      }}
                    >
                      {item.tag}
                    </span>
                  </div>
                }
                style={{
                  borderRadius: 12,
                  border: '1px solid #E8E4DE',
                  background: '#fff',
                  height: '100%',
                  overflow: 'hidden',
                }}
                bodyStyle={{ padding: 24 }}
              >
                <h3
                  style={{
                    fontSize: 20,
                    color: '#8B4513',
                    fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif",
                    marginBottom: 12,
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ fontSize: 15, color: '#5D5D5D', lineHeight: 1.8 }}>
                  {item.desc}
                </p>
              </Card>
            </Col>
          ))}
        </Row>

        <div
          style={{
            marginTop: 48,
            padding: '32px 24px',
            background: 'rgba(197,160,101,0.08)',
            borderRadius: 16,
            border: '1px solid #E8E4DE',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              color: '#8B4513',
              fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif",
              marginBottom: 12,
              fontSize: 20,
            }}
          >
            文创坚持
          </h3>
          <p
            style={{
              fontSize: 16,
              color: '#3D3D3D',
              lineHeight: 1.9,
              maxWidth: 700,
              margin: '0 auto',
            }}
          >
            尊重自然、传承文化、创新设计，让根雕艺术走进现代生活。
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default CulturalCreativePage;
