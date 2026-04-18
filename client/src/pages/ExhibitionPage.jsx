import { useEffect, useState } from 'react'
import { Typography, Image, Spin, Divider } from 'antd'
import MainLayout from '../components/MainLayout'
import PageHeader from '../components/PageHeader'
import { fetchExhibitionInfo } from '../api/exhibition'

/**
 * 章节标题组件
 */
function SectionTitle({ children }) {
  return (
    <h3
      style={{
        color: '#8B4513',
        fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif",
        marginTop: 32,
        marginBottom: 16,
        fontSize: 22
      }}
    >
      {children}
    </h3>
  )
}

/**
 * 正文段落组件
 */
function BodyText({ children }) {
  return (
    <Typography.Paragraph
      style={{ fontSize: 16, lineHeight: 2, textAlign: 'justify', color: '#3D3D3D' }}
    >
      {children}
    </Typography.Paragraph>
  )
}

/**
 * 富文本内容组件
 */
function RichContent({ html }) {
  return (
    <div
      style={{ fontSize: 16, lineHeight: 2, textAlign: 'justify', color: '#3D3D3D' }}
      dangerouslySetInnerHTML={{ __html: html || '' }}
    />
  )
}

/**
 * 非遗展厅页面
 * 展示莲花根雕历史文化、数字化课程、项目介绍及展厅精选内容
 */
function ExhibitionPage() {
  // 1. hooks & state
  const [exhibitionInfo, setExhibitionInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // 2. effects
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const responseData = await fetchExhibitionInfo()
        setExhibitionInfo(responseData)
      } catch (error) {
        console.error('获取展厅信息失败:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // 3. JSX return
  return (
    <MainLayout>
      <PageHeader
        title="非遗文化展厅"
        subtitle="了解莲花根雕的历史渊源、传承人故事与数字化课程"
        bgImage="https://images.unsplash.com/photo-1518182170546-0766bc6f9213?auto=format&fit=crop&w=1600&q=80"
        dark
      />

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 16px 48px' }}>
        {/* 静态文化内容 - API 驱动 */}
        <SectionTitle>一、莲花根雕历史与文化</SectionTitle>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: 20 }}>
            <Spin />
          </div>
        ) : (
          <RichContent html={exhibitionInfo?.historyContent} />
        )}

        <SectionTitle>二、非遗数字化课程</SectionTitle>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: 20 }}>
            <Spin />
          </div>
        ) : (
          <RichContent html={exhibitionInfo?.coursesContent} />
        )}

        <SectionTitle>三、莲韵非遗 · 数字传承项目</SectionTitle>
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: 20 }}>
            <Spin />
          </div>
        ) : (
          <RichContent html={exhibitionInfo?.projectContent} />
        )}

        <Divider style={{ borderColor: '#E8E4DE', margin: '40px 0' }} />

        {/* 动态展厅精选 */}
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <h3
            style={{
              color: '#8B4513',
              fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif",
              fontSize: 22
            }}
          >
            展厅精选
          </h3>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <Spin size="large" />
          </div>
        ) : (
          exhibitionInfo?.sections?.map((section, idx) => (
            <div key={idx} style={{ marginBottom: 32 }}>
              {section.type === 'text' && <BodyText>{section.content}</BodyText>}
              {section.type === 'image' && (
                <div style={{ textAlign: 'center' }}>
                  <Image
                    src={section.content}
                    alt={section.caption}
                    style={{ borderRadius: 8, maxWidth: '100%' }}
                  />
                  {section.caption && (
                    <p style={{ color: '#888', marginTop: 8 }}>{section.caption}</p>
                  )}
                </div>
              )}
              {section.type === 'video' && (
                <div style={{ textAlign: 'center' }}>
                  <video
                    src={section.content}
                    controls
                    style={{ width: '100%', borderRadius: 8, maxHeight: 500 }}
                  />
                  {section.caption && (
                    <p style={{ color: '#888', marginTop: 8 }}>{section.caption}</p>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </MainLayout>
  )
}

export default ExhibitionPage
