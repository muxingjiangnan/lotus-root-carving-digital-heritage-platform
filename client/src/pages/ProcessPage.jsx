import { Steps, Card } from 'antd';
import MainLayout from '../components/MainLayout';
import PageHeader from '../components/PageHeader';

const processSteps = [
  {
    title: '采集根材',
    desc:
      '在山林、河畔、坡地选取形态自然、质地优良的树根作为原料，尊重生态、合理取材，保证根材天然纹理与完整度。',
    image:
      'https://images.unsplash.com/photo-1448375240586-dfd8f3793371?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: '去皮清污',
    desc:
      '采用鲜剥法或浸泡法去除树根表皮与污垢，鲜剥法将洗净树根露天放置 2-3 天后剥皮；浸泡法适用于干枯根料，浸水数天后清理，保持根材原貌。',
    image:
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: '构思造型',
    desc:
      '匠人根据根材天然走势、纹理、结疤进行艺术构思，确定人物、动物、山水等主题，做到“依形造景、随势赋形”，不强行改造、保留天然之美。',
    image:
      'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: '雕刻成型',
    desc:
      '按设计方案裁截多余根须，使用凿、刻、铲等工具精细雕琢，对断面、凸面、洞穴做自然化处理，残缺部分可同材质拼接，追求自然生动、浑然天成。',
    image:
      'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: '打磨',
    desc:
      '先用粗砂布磨平痕迹，再用细砂布精细抛光，力度均匀、不伤纹理，使作品表面光滑细腻、质感温润。',
    image:
      'https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: '上色养护',
    desc:
      '以清漆为主反复涂刷 3 遍，保护材质、提升质感；实用类根雕可适当调色，突出古雅韵味，完成后命名、赋予文化寓意。',
    image:
      'https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&w=800&q=80',
  },
];

const ProcessPage = () => {
  return (
    <MainLayout>
      <PageHeader
        title="莲花根雕工艺流程"
        subtitle="依形造景 · 随势赋形 · 六步匠心"
        bgImage="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80"
        dark
      />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 16px 64px' }}>
        <Card
          style={{
            borderRadius: 16,
            border: '1px solid #E8E4DE',
            background: '#fff',
            padding: '24px 8px',
          }}
          bodyStyle={{ padding: 24 }}
        >
          <Steps
            direction="vertical"
            current={-1}
            items={processSteps.map((step, idx) => ({
              title: (
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#8B4513',
                    fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif",
                  }}
                >
                  步骤 {idx + 1}：{step.title}
                </span>
              ),
              description: (
                <div style={{ marginTop: 8, marginBottom: 24 }}>
                  <p
                    style={{
                      fontSize: 15,
                      color: '#3D3D3D',
                      lineHeight: 1.9,
                      maxWidth: 640,
                    }}
                  >
                    {step.desc}
                  </p>
                  <img
                    src={step.image}
                    alt={step.title}
                    style={{
                      width: '100%',
                      maxWidth: 480,
                      height: 220,
                      objectFit: 'cover',
                      borderRadius: 12,
                      marginTop: 8,
                      border: '1px solid #E8E4DE',
                    }}
                  />
                </div>
              ),
            }))}
          />
        </Card>

        <div
          style={{
            textAlign: 'center',
            marginTop: 40,
            padding: '24px',
            background: 'rgba(47,93,80,0.04)',
            borderRadius: 12,
            border: '1px solid #E8E4DE',
          }}
        >
          <p
            style={{
              fontSize: 16,
              color: '#5D5D5D',
              fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif",
              lineHeight: 1.8,
            }}
          >
            “匠人之心，在于顺应自然；根雕之美，在于天人合一。”
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProcessPage;
