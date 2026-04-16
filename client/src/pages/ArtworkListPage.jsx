import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Input, Select, Pagination, Row, Col, Spin } from 'antd';
import MainLayout from '../components/MainLayout';
import PageHeader from '../components/PageHeader';
import { getArtworks } from '../api/artwork';
import { ARTWORK_CATEGORIES } from '../utils/constants';
import { CardContainer, CardBody, CardItem } from '../components/ui/3d-card';
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

const ArtworkCard3D = ({ item, onClick }) => {
  return (
    <CardContainer containerClassName="py-0" className="inter-var">
      <CardBody
        className="group/card relative h-80 w-72 cursor-pointer rounded-xl border border-[var(--wood-light)] bg-white p-4 shadow-sm transition-shadow hover:shadow-xl"
        onClick={onClick}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <CardItem translateZ="80" className="w-full overflow-hidden rounded-lg">
          <img
            src={item.images?.[0] || 'https://via.placeholder.com/300x200'}
            alt={item.name}
            className="h-40 w-full object-cover"
          />
        </CardItem>

        <CardItem translateZ="60" className="mt-4 w-full">
          <h3 className="text-lg font-semibold text-[var(--wood-dark)]">{item.name}</h3>
        </CardItem>

        <CardItem translateZ="40" className="mt-1 w-full">
          <p className="text-sm text-[var(--wood-light-text)]">
            {item.category} · {item.year}年
          </p>
        </CardItem>

        <div className="mt-auto flex items-center justify-between pt-4">
          <CardItem
            translateZ="30"
            as="button"
            className="px-1 py-1 text-xs font-medium text-[#8B5A2B] transition-colors hover:text-[#6F4320] underline-offset-2 hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              onClick();
            }}
          >
            查看详情
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

const ArtworkListPage = () => {
  const [data, setData] = useState({ list: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const page = Number(searchParams.get('page')) || 1;
  const category = searchParams.get('category') || '';
  const keyword = searchParams.get('keyword') || '';

  // 搜索框本地状态，用于受控输入
  const [searchInput, setSearchInput] = useState(keyword);

  useEffect(() => {
    setSearchInput(keyword);
  }, [keyword]);

  useEffect(() => {
    setLoading(true);
    getArtworks({ page, limit: 12, category, keyword })
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  }, [page, category, keyword]);

  const updateSearchParams = (updates) => {
    const sp = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value === '' || value === null || value === undefined) {
        sp.delete(key);
      } else {
        sp.set(key, String(value));
      }
    });
    setSearchParams(sp);
  };

  const handleCategoryChange = (val) => {
    updateSearchParams({ category: val || '', page: 1 });
  };

  const handleSearch = (value) => {
    updateSearchParams({ keyword: value || '', page: 1 });
  };

  const handlePageChange = (p) => {
    updateSearchParams({ page: p });
  };

  const list = data.list;
  const mid = Math.ceil(list.length / 2);
  const firstRow = list.slice(0, mid);
  const secondRow = list.slice(mid);

  const isFiltered = category || keyword;

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
            onChange={handleCategoryChange}
          >
            {ARTWORK_CATEGORIES.map((c) => <Option key={c} value={c}>{c}</Option>)}
          </Select>
        </Col>
        <Col xs={24} sm={16} md={12}>
          <Search
            placeholder="输入关键词搜索作品"
            enterButton
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onSearch={handleSearch}
          />
        </Col>
      </Row>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>
      ) : (
        <>
          {isFiltered ? (
            <div className="mb-10 grid w-full grid-cols-1 place-items-center gap-8 rounded-xl border border-[var(--wood-light)] bg-white/40 py-10 shadow-sm sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {list.map((item) => (
                <ArtworkCard3D
                  key={`3d-${item._id}`}
                  item={item}
                  onClick={() => navigate(`/artworks/${item._id}`, { state: { from: location.pathname + location.search } })}
                />
              ))}
            </div>
          ) : (
            <div className="relative mb-10 flex w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-[var(--wood-light)] bg-white/40 py-6 shadow-sm">
              <Marquee pauseOnHover className="[--duration:35s]">
                {firstRow.map((item) => (
                  <ArtworkCard
                    key={`m1-${item._id}`}
                    item={item}
                    onClick={() => navigate(`/artworks/${item._id}`, { state: { from: location.pathname + location.search } })}
                  />
                ))}
              </Marquee>

              <Marquee reverse pauseOnHover className="[--duration:35s]">
                {secondRow.map((item) => (
                  <ArtworkCard
                    key={`m2-${item._id}`}
                    item={item}
                    onClick={() => navigate(`/artworks/${item._id}`, { state: { from: location.pathname + location.search } })}
                  />
                ))}
              </Marquee>

              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-[var(--paper-white)] to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-[var(--paper-white)] to-transparent" />
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Pagination
              current={page}
              pageSize={12}
              total={data.total}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </MainLayout>
  );
};

export default ArtworkListPage;
