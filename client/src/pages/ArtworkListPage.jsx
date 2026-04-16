import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, List, Input, Select, Pagination, Row, Col, Spin } from 'antd';
import MainLayout from '../components/MainLayout';
import PageHeader from '../components/PageHeader';
import { getArtworks } from '../api/artwork';
import { ARTWORK_CATEGORIES } from '../utils/constants';
import { Marquee } from '../components/ui/marquee';

const { Search } = Input;
const { Option } = Select;

const ArtworkCard = ({ item, onClick }) => {
  return (
    <figure
      className="relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border border-[var(--wood-light)] bg-white shadow-sm transition-transform hover:scale-105"
      onClick={onClick}
    >
      <img
        src={item.images?.[0] || 'https://via.placeholder.com/300x200'}
        alt={item.name}
        className="h-40 w-full object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
        <figcaption className="text-sm font-medium text-white">{item.name}</figcaption>
        <p className="text-xs text-white/80">{item.category} · {item.year}年</p>
      </div>
    </figure>
  );
};

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

  const list = data.list;
  const mid = Math.ceil(list.length / 2);
  const firstRow = list.slice(0, mid);
  const secondRow = list.slice(mid);

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
          <div className="relative mb-10 flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-[var(--wood-light)] bg-white/40 py-6 shadow-sm">
            <Marquee pauseOnHover className="[--duration:35s]">
              {firstRow.map((item) => (
                <ArtworkCard
                  key={`m1-${item._id}`}
                  item={item}
                  onClick={() => navigate(`/artworks/${item._id}`)}
                />
              ))}
            </Marquee>

            <Marquee reverse pauseOnHover className="[--duration:35s]">
              {secondRow.map((item) => (
                <ArtworkCard
                  key={`m2-${item._id}`}
                  item={item}
                  onClick={() => navigate(`/artworks/${item._id}`)}
                />
              ))}
            </Marquee>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[var(--paper-white)] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[var(--paper-white)] to-transparent" />
          </div>

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
