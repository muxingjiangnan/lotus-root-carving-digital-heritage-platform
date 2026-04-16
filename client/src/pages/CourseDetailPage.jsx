import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menu, Spin, Typography, Divider, Row, Col } from 'antd';
import MainLayout from '../components/MainLayout';
import { getCourseById } from '../api/course';

const { Title } = Typography;

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

  return (
    <MainLayout>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>
      ) : (
        <Row gutter={[24, 24]} style={{ background: '#fff', minHeight: 500, marginTop: 8 }}>
          <Col xs={24} lg={18} style={{ padding: '16px 8px' }}>
            <Title level={4}>{course.title}</Title>
            <Divider />
            {currentChapter && (
              <>
                <h3>正在学习：{currentChapter.title}</h3>
                <video
                  key={currentChapter.videoUrl}
                  src={currentChapter.videoUrl}
                  controls
                  style={{ width: '100%', maxHeight: 500, borderRadius: 8 }}
                />
              </>
            )}
          </Col>
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
        </Row>
      )}
    </MainLayout>
  );
};

export default CourseDetailPage;
