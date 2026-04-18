import { Image, Row, Col } from 'antd';
import MainLayout from '../components/MainLayout';
import PageHeader from '../components/PageHeader';

const creativeSeries = [
  {
    title: '家居装饰系列',
    desc:
      '包含根雕摆件、挂饰、屏风等，适用于家庭、办公室、茶室空间，强调自然质感与中式美学。让每一件作品都成为空间中的文化符号，营造宁静雅致的东方意境。',
    tag: '生活美学',
    images: [
      { src: '/images/gendiaochashibaijian.jpg', alt: '根雕茶室摆件' },
      { src: '/images/lipinxilie.jpg', alt: '根雕家居摆件' },
    ],
  },
  {
    title: '礼品系列',
    desc:
      '小巧精致、寓意吉祥，便于携带与赠送，融合莲花镇地域文化与祝福内涵。无论是节庆礼赠还是商务往来，都是传递心意与文化温度的佳品。',
    tag: '心意之选',
    images: [
      { src: '/images/gendiaolihetaozhaung.jpg', alt: '根雕礼盒套装' },
      { src: '/images/gendiaojixiangguajian.jpg', alt: '根雕吉祥挂件' },
    ],
  },
  {
    title: '文化收藏系列',
    desc:
      '选用优质楠木、紫檀等材料，由匠人手工创作，艺术性强、独具收藏价值，面向非遗爱好者与收藏家。每一件藏品都凝聚着匠人的心血与岁月的沉淀。',
    tag: '匠心典藏',
    images: [
      { src: '/images/jiangrenchuangzuochangjing.jpg', alt: '匠人创作场景' },
      { src: '/images/zhanguichenlie.jpg', alt: '藏品展柜陈列' },
    ],
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
            margin: '0 auto 48px',
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

        {creativeSeries.map((series, index) => (
          <div key={series.title}>
            <div style={{ position: 'relative', marginBottom: 20 }}>
              <h3
                style={{
                  fontSize: 22,
                  color: '#8B4513',
                  fontFamily:
                    "'Noto Serif SC', 'Source Han Serif SC', serif",
                  margin: 0,
                }}
              >
                {series.title}
              </h3>
              <span
                style={{
                  position: 'absolute',
                  top: 4,
                  right: 0,
                  background: 'rgba(139,69,19,0.9)',
                  color: '#fff',
                  padding: '4px 12px',
                  borderRadius: 20,
                  fontSize: 12,
                  letterSpacing: 1,
                }}
              >
                {series.tag}
              </span>
            </div>

            <Image.PreviewGroup
              items={series.images.map((img) => ({
                src: img.src,
                alt: img.alt,
              }))}
            >
              <Row gutter={[16, 16]}>
                {series.images.map((img) => (
                  <Col xs={24} md={12} key={img.src}>
                    <div
                      style={{
                        width: '100%',
                        aspectRatio: '4 / 3',
                        overflow: 'hidden',
                        borderRadius: 12,
                        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
                        cursor: 'pointer',
                        transition: 'box-shadow 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow =
                          '0 8px 24px rgba(0,0,0,0.12)';
                        const imgEl = e.currentTarget.querySelector('img');
                        if (imgEl) {
                          imgEl.style.transform = 'scale(1.04)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow =
                          '0 4px 12px rgba(0,0,0,0.06)';
                        const imgEl = e.currentTarget.querySelector('img');
                        if (imgEl) {
                          imgEl.style.transform = 'scale(1)';
                        }
                      }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.4s ease',
                        }}
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </Image.PreviewGroup>

            <p
              style={{
                fontSize: 15,
                color: '#5D5D5D',
                lineHeight: 1.8,
                marginTop: 24,
                marginBottom: 0,
              }}
            >
              {series.desc}
            </p>

            {index < creativeSeries.length - 1 && (
              <div
                style={{
                  width: '100%',
                  height: 1,
                  background: '#E8E4DE',
                  marginTop: 48,
                }}
              />
            )}
          </div>
        ))}

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
              fontFamily:
                "'Noto Serif SC', 'Source Han Serif SC', serif",
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
