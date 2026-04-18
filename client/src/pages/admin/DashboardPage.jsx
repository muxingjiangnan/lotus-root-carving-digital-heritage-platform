import { useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import {
  BuildOutlined,
  PictureOutlined,
  BookOutlined,
  MessageOutlined,
  UserOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';

const modules = [
  {
    title: '展厅管理',
    desc: '编辑非遗文化展厅的图文内容',
    path: '/admin/exhibition',
    icon: <BuildOutlined style={{ fontSize: 28, color: '#8B4513' }} />
  },
  {
    title: '作品管理',
    desc: '增删改查数字作品库中的根雕作品',
    path: '/admin/artworks',
    icon: <PictureOutlined style={{ fontSize: 28, color: '#8B4513' }} />
  },
  {
    title: '课程管理',
    desc: '维护在线微课程及章节视频',
    path: '/admin/courses',
    icon: <BookOutlined style={{ fontSize: 28, color: '#8B4513' }} />
  },
  {
    title: '问答审核',
    desc: '审核用户提交的问题并给出回复',
    path: '/admin/questions',
    icon: <MessageOutlined style={{ fontSize: 28, color: '#8B4513' }} />
  },
  {
    title: '用户管理',
    desc: '查看用户列表并设置角色权限',
    path: '/admin/users',
    icon: <UserOutlined style={{ fontSize: 28, color: '#8B4513' }} />
  }
];

const DashboardPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>管理首页</h2>
      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        {modules.map((item) => (
          <Col xs={24} sm={12} lg={8} key={item.path}>
            <Card
              hoverable
              onClick={() => navigate(item.path)}
              bodyStyle={{ padding: 24 }}
              style={{
                borderRadius: 8,
                transition: 'all 0.3s',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                {item.icon}
                <span style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 12 }}>
                  {item.title}
                </span>
              </div>
              <p style={{ color: '#666', marginBottom: 16, minHeight: 44 }}>
                {item.desc}
              </p>
              <div style={{ color: '#8B4513', fontWeight: 500, display: 'flex', alignItems: 'center' }}>
                进入管理 <ArrowRightOutlined style={{ marginLeft: 6 }} />
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DashboardPage;
