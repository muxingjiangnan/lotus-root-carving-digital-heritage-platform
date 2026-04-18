import { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Image, Descriptions, Spin, Button, Row, Col, Divider } from 'antd'
import { AppstoreOutlined } from '@ant-design/icons'
import MainLayout from '../components/MainLayout'
import { fetchArtworkById, fetchArtworkList } from '../api/artwork'
import { Marquee } from '../components/ui/marquee'

/**
 * 作品详情页面
 * 展示作品高清图片、详细信息，并推荐同类作品
 */
function ArtworkDetailPage() {
  // 1. hooks & state
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const backPath = location.state?.from || '/artworks'

  const [artworkInfo, setArtworkInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [relatedList, setRelatedList] = useState([])

  // 2. effects
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const artworkData = await fetchArtworkById(id)
        setArtworkInfo(artworkData)

        // 获取同分类推荐作品
        if (artworkData.category) {
          const relatedData = await fetchArtworkList({
            category: artworkData.category,
            limit: 12,
            page: 1
          })
          setRelatedList(
            relatedData.list
              .filter((item) => item._id !== artworkData._id)
              .slice(0, 10)
          )
        }
      } catch (error) {
        console.error('获取作品详情失败:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id])

  // 3. handlers
  function handleNavigateToRelated(artworkId) {
    navigate(`/artworks/${artworkId}`, { state: { from: backPath } })
  }

  // 4. JSX return
  return (
    <MainLayout>
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          {/* 左侧：图片预览 + 同类推荐 */}
          <Col xs={24} lg={14}>
            <Image.PreviewGroup>
              {artworkInfo.images?.map((url, idx) => (
                <Image
                  key={idx}
                  src={url}
                  alt={artworkInfo.name}
                  style={{ display: idx === 0 ? 'block' : 'none', borderRadius: 8 }}
                  width="100%"
                />
              ))}
            </Image.PreviewGroup>

            {/* 同类作品推荐 */}
            {relatedList.length > 0 && (
              <div className="mt-8">
                <Divider
                  titlePlacement="left"
                  style={{ borderColor: 'var(--wood-light)', marginBottom: 16 }}
                >
                  <span
                    className="text-lg font-semibold"
                    style={{ fontFamily: 'var(--heading)', color: 'var(--ink-black)' }}
                  >
                    <AppstoreOutlined style={{ marginRight: 8, color: 'var(--wood-brown)' }} />
                    同类作品推荐
                  </span>
                </Divider>

                {relatedList.length <= 3 ? (
                  <div className="flex flex-wrap gap-4">
                    {relatedList.map((item) => (
                      <div
                        key={item._id}
                        className="relative flex-1 cursor-pointer overflow-hidden rounded-xl border border-[var(--wood-light)] shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
                        style={{ minWidth: 200, maxWidth: '100%' }}
                        onClick={() => handleNavigateToRelated(item._id)}
                      >
                        <img
                          src={item.images?.[0] || 'https://via.placeholder.com/300x200'}
                          alt={item.name}
                          className="h-48 w-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
                          <p className="text-sm font-medium text-white truncate">{item.name}</p>
                          <p className="text-xs text-white/80 truncate">
                            {item.material || item.category}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-[var(--wood-light)] bg-white/50 py-3 shadow-sm">
                    <Marquee pauseOnHover className="[--duration:35s]">
                      {relatedList.map((item) => (
                        <div
                          key={item._id}
                          className="relative h-40 w-56 cursor-pointer overflow-hidden rounded-lg border border-[var(--wood-light)] shadow-sm transition-transform hover:scale-105"
                          onClick={() => handleNavigateToRelated(item._id)}
                        >
                          <img
                            src={item.images?.[0] || 'https://via.placeholder.com/300x200'}
                            alt={item.name}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-2 py-1.5">
                            <p className="text-xs font-medium text-white truncate">{item.name}</p>
                          </div>
                        </div>
                      ))}
                    </Marquee>
                  </div>
                )}
              </div>
            )}
          </Col>

          {/* 右侧：作品信息 */}
          <Col xs={24} lg={10}>
            <Descriptions title={artworkInfo.name} bordered column={1} size="small">
              <Descriptions.Item label="作品名称">{artworkInfo.name}</Descriptions.Item>
              <Descriptions.Item label="材质">{artworkInfo.material || '暂无记录'}</Descriptions.Item>
              <Descriptions.Item label="尺寸">{artworkInfo.size || '暂无记录'}</Descriptions.Item>
              <Descriptions.Item label="创作年份">{artworkInfo.year || '暂无记录'}</Descriptions.Item>
              <Descriptions.Item label="分类">{artworkInfo.category}</Descriptions.Item>
              <Descriptions.Item label="作品介绍">{artworkInfo.description || '暂无介绍'}</Descriptions.Item>
            </Descriptions>
            <Button type="primary" style={{ marginTop: 16 }} onClick={() => navigate(backPath)}>
              返回列表
            </Button>
          </Col>
        </Row>
      )}
    </MainLayout>
  )
}

export default ArtworkDetailPage
