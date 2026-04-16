import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Image, Descriptions, Spin, Button, Row, Col } from 'antd';
import MainLayout from '../components/MainLayout';
import { getArtworkById } from '../api/artwork';

const ArtworkDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArtworkById(id)
      .then((res) => setData(res))
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
            {data.images?.length > 1 && (
              <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {data.images.map((url, idx) => (
                  <Image key={idx} src={url} width={80} height={80} style={{ borderRadius: 4, objectFit: 'cover', cursor: 'pointer' }} />
                ))}
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
            <Button type="primary" style={{ marginTop: 16 }} onClick={() => window.history.back()}>返回列表</Button>
          </Col>
        </Row>
      )}
    </MainLayout>
  );
};

export default ArtworkDetailPage;
