import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, List, Input, Select, Pagination, Row, Col, Spin } from 'antd';
import MainLayout from '../components/MainLayout';
import PageHeader from '../components/PageHeader';
import { getArtworks } from '../api/artwork';
import { ARTWORK_CATEGORIES } from '../utils/constants';

const { Search } = Input;
const { Option } = Select;

const ArtworkListPage = () => {
  const [data, setData] = useState({ list: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    getArtworks({ page, limit: 12, category, keyword })
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, [page, category]);

  const handleSearch = (value) => {
    setKeyword(value);
    setPage(1);
    fetchData();
  };

  return (
    <MainLayout>
      <PageHeader title="数字作品库" subtitle="欣赏莲花根雕艺术精品" />
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8} md={6}>
          <Select
            placeholder="选择分类"
            allowClear
            style={{ width: '100%' }}
            value={category || undefined}
            onChange={(val) => { setCategory(val || ''); setPage(1); }}
          >
            {ARTWORK_CATEGORIES.map((c) => <Option key={c} value={c}>{c}</Option>)}
          </Select>
        </Col>
        <Col xs={24} sm={16} md={12}>
          <Search placeholder="输入关键词搜索作品" enterButton onSearch={handleSearch} />
        </Col>
      </Row>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>
      ) : (
        <>
          <List
            grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
            dataSource={data.list}
            renderItem={(item) => (
              <List.Item>
                <Card
                  hoverable
                  cover={<img alt={item.name} src={item.images?.[0] || 'https://via.placeholder.com/300x200'} style={{ height: 200, objectFit: 'cover' }} />}
                  onClick={() => navigate(`/artworks/${item._id}`)}
                >
                  <Card.Meta
                    title={item.name}
                    description={<span>{item.category} | {item.year ? `${item.year}年` : '年代不详'}</span>}
                  />
                </Card>
              </List.Item>
            )}
          />
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Pagination
              current={page}
              pageSize={12}
              total={data.total}
              onChange={(p) => setPage(p)}
            />
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default ArtworkListPage;
