import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';
import MainLayout from '../components/MainLayout';
import PageHeader from '../components/PageHeader';
import { FocusCards } from '../components/ui/FocusCards';
import { getCourses } from '../api/course';

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getCourses()
      .then((res) => setCourses(res))
      .finally(() => setLoading(false));
  }, []);

  const cards = courses.map((item) => ({
    id: item._id,
    title: item.title,
    description: item.description,
    src: item.coverImage || 'https://via.placeholder.com/400x600?text=课程封面',
    tag: item.chapters?.some((ch) => ch.source === 'bilibili') ? 'Bilibili' : undefined,
    onClick: () => navigate(`/courses/${item._id}`),
  }));

  return (
    <MainLayout>
      <PageHeader title="在线微课程" subtitle="根雕技艺 · 纪录片与教程" />
      <div style={{ padding: '0 24px 64px', maxWidth: 1280, margin: '0 auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: 80 }}>
            <Spin size="large" />
          </div>
        ) : (
          <FocusCards cards={cards} />
        )}
      </div>
    </MainLayout>
  );
};

export default CourseListPage;
