import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Menu, Spin, Typography, Divider, Row, Col, Tag } from 'antd'
import MainLayout from '../components/MainLayout'
import { fetchCourseById } from '../api/course'

const { Title } = Typography

/**
 * 从 Bilibili 链接中提取 BV 号
 * @param {string} url Bilibili 视频链接
 * @returns {string} BV 号
 */
function _extractBvid(url) {
  if (!url) return ''
  const match = url.match(/BV[0-9A-Za-z]+/)
  return match ? match[0] : ''
}

/**
 * 视频播放器组件
 * 支持本地视频和 Bilibili iframe 嵌入
 */
function VideoPlayer({ chapter }) {
  if (!chapter) return null

  const bvid = chapter.source === 'bilibili'
    ? _extractBvid(chapter.videoUrl || chapter.externalUrl)
    : ''

  // Bilibili 视频使用 iframe 嵌入
  if (chapter.source === 'bilibili' && bvid) {
    return (
      <div
        style={{
          position: 'relative',
          paddingTop: '56.25%',
          borderRadius: 8,
          overflow: 'hidden',
          background: '#000'
        }}
      >
        <iframe
          key={bvid}
          src={`https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0&autoplay=0`}
          title={chapter.title}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
          allowFullScreen
        />
      </div>
    )
  }

  // 本地/直链视频使用原生 video 标签
  return (
    <video
      key={chapter.videoUrl}
      src={chapter.videoUrl}
      controls
      style={{ width: '100%', maxHeight: 500, borderRadius: 8 }}
    />
  )
}

/**
 * 课程详情页面
 * 展示课程视频播放器、章节菜单和学习进度
 */
function CourseDetailPage() {
  // 1. hooks & state
  const { id } = useParams()
  const { user } = useSelector((state) => state.auth)

  const [courseInfo, setCourseInfo] = useState(null)
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // 2. effects
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const responseData = await fetchCourseById(id)
        setCourseInfo(responseData)

        // 恢复用户上次的学习进度
        const savedProgress = localStorage.getItem(`courseProgress_${user?._id}_${id}`)
        if (savedProgress) {
          try {
            const { chapterIndex } = JSON.parse(savedProgress)
            if (chapterIndex >= 0 && chapterIndex < responseData.chapters?.length) {
              setCurrentChapterIndex(chapterIndex)
            }
          } catch (e) {
            console.error('解析学习进度失败:', e)
          }
        }
      } catch (error) {
        console.error('获取课程详情失败:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id, user])

  // 保存学习进度到 localStorage
  useEffect(() => {
    if (user && id) {
      localStorage.setItem(
        `courseProgress_${user._id}_${id}`,
        JSON.stringify({ chapterIndex: currentChapterIndex })
      )
    }
  }, [currentChapterIndex, user, id])

  // 3. derived data
  const activeChapter = courseInfo?.chapters?.[currentChapterIndex]
  const hasMultipleChapters = courseInfo?.chapters?.length > 1

  // 4. JSX return
  return (
    <MainLayout>
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[24, 24]} style={{ background: '#fff', minHeight: 500, marginTop: 8 }}>
          {/* 视频播放区 */}
          <Col xs={24} lg={hasMultipleChapters ? 18 : 24} style={{ padding: '16px 8px' }}>
            <Title level={4}>{courseInfo.title}</Title>
            <Divider />
            {activeChapter && (
              <>
                <h3>正在学习：{activeChapter.title}</h3>
                <VideoPlayer chapter={activeChapter} />
                {activeChapter.source === 'bilibili' && activeChapter.externalUrl && (
                  <div style={{ marginTop: 12 }}>
                    <Tag color="blue">Bilibili</Tag>
                    <a href={activeChapter.externalUrl} target="_blank" rel="noreferrer">
                      前往 Bilibili 观看原视频
                    </a>
                  </div>
                )}
              </>
            )}
          </Col>

          {/* 章节菜单 */}
          {hasMultipleChapters && (
            <Col xs={24} lg={6} style={{ background: '#fafafa', borderLeft: '1px solid #f0f0f0' }}>
              <div style={{ padding: 16, fontWeight: 'bold', borderBottom: '1px solid #f0f0f0' }}>
                课程章节
              </div>
              <Menu
                mode="inline"
                selectedKeys={[String(currentChapterIndex)]}
                style={{ borderRight: 0 }}
                items={courseInfo.chapters?.map((ch, idx) => ({
                  key: String(idx),
                  label: `${idx + 1}. ${ch.title} ${ch.duration ? `(${ch.duration})` : ''}`,
                  onClick: () => setCurrentChapterIndex(idx)
                }))}
              />
            </Col>
          )}
        </Row>
      )}
    </MainLayout>
  )
}

export default CourseDetailPage
