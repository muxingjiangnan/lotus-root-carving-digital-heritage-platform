import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, Spin, Typography, Divider, Row, Col, Tag } from 'antd';
import MainLayout from '../components/MainLayout';
import { getCourseById } from '../api/course';

const { Title } = Typography;

const extractBvid = (url) => {
  if (!url) return '';
  const match = url.match(/BV[0-9A-Za-z]+/);
  return match ? match[0] : '';
};

const VideoPlayer = ({ chapter }) => {
  if (!chapter) return null;

  const bvid = chapter.source === 'bilibili' ? extractBvid(chapter.videoUrl || chapter.externalUrl) : '';

  if (chapter.source === 'bilibili' && bvid) {
    return (
      <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: 8, overflow: 'hidden', background: '#000' }}>
        <iframe
          key={bvid}
          src={`https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0&autoplay=0`}
          title={chapter.title}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <video
      key={chapter.videoUrl}
      src={chapter.videoUrl}
      controls
      style={{ width: '100%', maxHeight: 500, borderRadius: 8 }}
    />
  );
};

const CourseDetailPage = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [course, setCourse] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCourseById(id)
      .then((res) => {
        setCourse(res);
        const saved = localStorage.getItem(`courseProgress_${user?._id}_${id}`);
        if (saved) {
          try {
            const { chapterIndex } = JSON.parse(saved);
            if (chapterIndex >= 0 && chapterIndex < res.chapters?.length) {
              setCurrentIndex(chapterIndex);
            }
          } catch (e) {}
        }
      })
      .finally(() => setLoading(false));
  }, [id, user]);

  useEffect(() => {
    if (user && id) {
      localStorage.setItem(`courseProgress_${user._id}_${id}`, JSON.stringify({ chapterIndex: currentIndex }));
    }
  }, [currentIndex, user, id]);

  const currentChapter = course?.chapters?.[currentIndex];
  const hasMultipleChapters = course?.chapters?.length > 1;

  return (
    <MainLayout>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>
      ) : (
        <Row gutter={[24, 24]} style={{ background: '#fff', minHeight: 500, marginTop: 8 }}>
          <Col xs={24} lg={hasMultipleChapters ? 18 : 24} style={{ padding: '16px 8px' }}>
            <Title level={4}>{course.title}</Title>
            <Divider />
            {currentChapter && (
              <>
                <h3>正在学习：{currentChapter.title}</h3>
                <VideoPlayer chapter={currentChapter} />
                {currentChapter.source === 'bilibili' && currentChapter.externalUrl && (
                  <div style={{ marginTop: 12 }}>
                    <Tag color="blue">Bilibili</Tag>
                    <a href={currentChapter.externalUrl} target="_blank" rel="noreferrer">前往 Bilibili 观看原视频</a>
                  </div>
                )}
              </>
            )}
          </Col>
          {hasMultipleChapters && (
            <Col xs={24} lg={6} style={{ background: '#fafafa', borderLeft: '1px solid #f0f0f0' }}>
              <div style={{ padding: 16, fontWeight: 'bold', borderBottom: '1px solid #f0f0f0' }}>课程章节</div>
              <Menu
                mode="inline"
                selectedKeys={[String(currentIndex)]}
                style={{ borderRight: 0 }}
                items={course.chapters?.map((ch, idx) => ({
                  key: String(idx),
                  label: `${idx + 1}. ${ch.title} ${ch.duration ? `(${ch.duration})` : ''}`,
                  onClick: () => setCurrentIndex(idx)
                }))}
              />
            </Col>
          )}
        </Row>
      )}
    </MainLayout>
  );
};

export default CourseDetailPage;
