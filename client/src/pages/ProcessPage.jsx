import { Steps, Card } from 'antd'
import MainLayout from '../components/MainLayout'
import PageHeader from '../components/PageHeader'

// 根雕工艺流程六步配置
const processStepList = [
  {
    title: '踏山采根',
    desc:
      '岳麓余脉、沩水河滩，湘中丘陵的沟壑坡地间，老根盘结、姿态苍劲。莲花镇林木葱郁，水土丰润，匠人择其形异者而取，顺应自然、尊重生态，保其"天成之貌"，此为"七分天成"之始。',
    image: '/images/1.jpg'
  },
  {
    title: '剥皮清垢',
    desc:
      '依根材干湿之性，或鲜剥，或浸沤。鲜剥者，采回后露天静置二三日，待表皮松动以刀轻剔；干根则汲沩水浸润数日，刷去泥沙腐皮。去垢后须阴干相宜，方能显其本真纹理。',
    image: '/images/2.jpg'
  },
  {
    title: '因形赋意',
    desc:
      '观根之走势、疤节、纹理，因势立意。莲花根雕多取湖湘风物——岳麓松风、湘江水韵、农家烟火、莲荷清姿，皆入木中。匠人秉持"依形造景、随势赋形"之旨，使人意与天工相契。',
    image: '/images/3.jpg'
  },
  {
    title: '精雕细琢',
    desc:
      '以斧定大势，以凿开筋骨，以刻刀点化神情。莲花匠人刀法细腻，善用根材天然洞穴与凹凸，化残缺为气韵。或雕渔樵耕读之态，或刻花鸟虫鱼之趣，令朽木顿生灵意。',
    image: '/images/4.jpg'
  },
  {
    title: '细磨温润',
    desc:
      '先以粗砂去刀痕，继以细砂反复拭擦，顺根理而行，轻重有度，如抚湘江之水。经此工序，根表光洁细腻，触手温润，似凝湘中山水之灵秀，不露匠气，只显天成。',
    image: '/images/5.jpg'
  },
  {
    title: '髹漆养韵',
    desc:
      '以当地土漆或桐油薄涂数遍，层层渗透。漆色清透，不掩根材天然纹理，反增古朴之韵。养护之后，取其意命名，如"岳麓晨钟""莲塘清趣"，赋予湖湘文化之魂，使根雕历久弥珍。',
    image: '/images/6.jpg'
  }
]

/**
 * 工艺流程页面
 * 以 Steps 步骤条展示莲花根雕六道核心工序
 */
function ProcessPage() {
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
            padding: '24px 8px'
          }}
          bodyStyle={{ padding: 24 }}
        >
          <Steps
            direction="vertical"
            current={-1}
            items={processStepList.map((step, idx) => ({
              title: (
                <span
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    color: '#8B4513',
                    fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif"
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
                      maxWidth: 640
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
                      border: '1px solid #E8E4DE'
                    }}
                  />
                </div>
              )
            }))}
          />
        </Card>

        {/* 结语 */}
        <div
          style={{
            textAlign: 'center',
            marginTop: 40,
            padding: '24px',
            background: 'rgba(47,93,80,0.04)',
            borderRadius: 12,
            border: '1px solid #E8E4DE'
          }}
        >
          <p
            style={{
              fontSize: 16,
              color: '#5D5D5D',
              fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif",
              lineHeight: 1.8
            }}
          >
            "匠人之心，在于顺应自然；根雕之美，在于天人合一。"
          </p>
        </div>
      </div>
    </MainLayout>
  )
}

export default ProcessPage
