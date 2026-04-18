import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Image, Descriptions, Spin, Button, Row, Col, Divider } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import MainLayout from '../components/MainLayout';
import { getArtworkById, getArtworks } from '../api/artwork';
import { Marquee } from '../components/ui/marquee';

const ArtworkDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const backUrl = location.state?.from || '/artworks';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    setLoading(true);
    getArtworkById(id)
      .then((res) => {
        setData(res);
        // 获取同分类推荐作品
        if (res.category) {
          getArtworks({ category: res.category, limit: 12, page: 1 })
            .then((rel) => {
              setRelated(rel.list.filter((item) => item._id !== res._id).slice(0, 10));
            })
            .catch(() => setRelated([]));
        }
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <MainLayout>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>
      ) : (
        <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
          <Col xs={24} lg={14}>
            <Image.PreviewGroup>
              {data.images?.map((url, idx) => (
                <Image key={idx} src={url} alt={data.name} style={{ display: idx === 0 ? 'block' : 'none', borderRadius: 8 }} width="100%" />
              ))}
            </Image.PreviewGroup>

            {related.length > 0 && (
              <div className="mt-8">
                <Divider orientation="left" style={{ borderColor: 'var(--wood-light)', marginBottom: 16 }}>
                  <span className="text-lg font-semibold" style={{ fontFamily: 'var(--heading)', color: 'var(--ink-black)' }}>
                    <AppstoreOutlined style={{ marginRight: 8, color: 'var(--wood-brown)' }} />
                    同类作品推荐
                  </span>
                </Divider>

                {related.length <= 3 ? (
                  <div className="flex flex-wrap gap-4">
                    {related.map((item) => (
                      <div
                        key={item._id}
                        className="relative flex-1 cursor-pointer overflow-hidden rounded-xl border border-[var(--wood-light)] shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
                        style={{ minWidth: 200, maxWidth: '100%' }}
                        onClick={() => navigate(`/artworks/${item._id}`, { state: { from: backUrl } })}
                      >
                        <img
                          src={item.images?.[0] || 'https://via.placeholder.com/300x200'}
                          alt={item.name}
                          className="h-48 w-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
                          <p className="text-sm font-medium text-white truncate">{item.name}</p>
                          <p className="text-xs text-white/80 truncate">{item.material || item.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-[var(--wood-light)] bg-white/50 py-3 shadow-sm">
                    <Marquee pauseOnHover className="[--duration:35s]">
                      {related.map((item) => (
                        <div
                          key={item._id}
                          className="relative h-40 w-56 cursor-pointer overflow-hidden rounded-lg border border-[var(--wood-light)] shadow-sm transition-transform hover:scale-105"
                          onClick={() => navigate(`/artworks/${item._id}`, { state: { from: backUrl } })}
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
          <Col xs={24} lg={10}>
            <Descriptions title={data.name} bordered column={1} size="small">
              <Descriptions.Item label="作品名称">{data.name}</Descriptions.Item>
              <Descriptions.Item label="材质">{data.material || '暂无记录'}</Descriptions.Item>
              <Descriptions.Item label="尺寸">{data.size || '暂无记录'}</Descriptions.Item>
              <Descriptions.Item label="创作年份">{data.year || '暂无记录'}</Descriptions.Item>
              <Descriptions.Item label="分类">{data.category}</Descriptions.Item>
              <Descriptions.Item label="作品介绍">{data.description || '暂无介绍'}</Descriptions.Item>
            </Descriptions>
            <Button type="primary" style={{ marginTop: 16 }} onClick={() => navigate(backUrl)}>返回列表</Button>
          </Col>
        </Row>
      )}
    </MainLayout>
  );
};

export default ArtworkDetailPage;
