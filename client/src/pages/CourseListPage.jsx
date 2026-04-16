import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, List, Spin } from 'antd';
import MainLayout from '../components/MainLayout';
import PageHeader from '../components/PageHeader';
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

  return (
    <MainLayout>
      <PageHeader title="在线微课程" subtitle="莲花根雕技艺短视频课程" />
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>
      ) : (
        <List
          grid={{ gutter: 24, xs: 1, sm: 2, md: 3 }}
          dataSource={courses}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                cover={<img alt={item.title} src={item.coverImage || 'https://via.placeholder.com/400x250?text=课程封面'} style={{ height: 220, objectFit: 'cover' }} />}
                onClick={() => navigate(`/courses/${item._id}`)}
              >
                <Card.Meta
                  title={item.title}
                  description={<span>共 {item.chapterCount} 节 | {item.description?.slice(0, 40)}...</span>}
                />
              </Card>
            </List.Item>
          )}
        />
      )}
    </MainLayout>
  );
};

export default CourseListPage;
