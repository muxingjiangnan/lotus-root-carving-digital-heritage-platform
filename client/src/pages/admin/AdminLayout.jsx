import { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu, Button, Space, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { logout } from '../../store/slices/authSlice';

const { Sider, Content, Header } = Layout;

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const menuItems = [
    { key: '/admin', label: '管理首页' },
    { key: '/admin/exhibition', label: '展厅管理' },
    { key: '/admin/artworks', label: '作品管理' },
    { key: '/admin/courses', label: '课程管理' },
    { key: '/admin/questions', label: '问答审核' }
  ];

  const selectedKey = menuItems.find((item) => location.pathname === item.key)?.key || '/admin';

  const menuContent = (
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      items={menuItems.map((item) => ({
        key: item.key,
        label: item.label,
        onClick: () => {
          navigate(item.key);
          setDrawerOpen(false);
        }
      }))}
    />
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="light" breakpoint="md" collapsedWidth={0} trigger={null} style={{ borderRight: '1px solid #f0f0f0' }} className="admin-sider">
        <div style={{ padding: 16, fontSize: 16, fontWeight: 'bold', borderBottom: '1px solid #f0f0f0' }}>
          管理后台
        </div>
        {menuContent}
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0' }}>
          <Space>
            <Button className="admin-menu-btn" icon={<MenuOutlined />} onClick={() => setDrawerOpen(true)} style={{ display: 'none' }} />
            <span style={{ fontWeight: 'bold' }}>莲花根雕非遗平台 - 管理员中心</span>
          </Space>
          <Space size="small">
            <span>{user?.username}</span>
            <Button size="small" onClick={() => navigate('/')}>返回前台</Button>
            <Button size="small" danger onClick={() => { dispatch(logout()); navigate('/'); }}>退出登录</Button>
          </Space>
        </Header>
        <Content style={{ padding: 16, background: '#f5f5f5' }}>
          <div style={{ background: '#fff', padding: 16, borderRadius: 8, minHeight: 500 }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
      <Drawer title="管理后台" placement="left" onClose={() => setDrawerOpen(false)} open={drawerOpen} bodyStyle={{ padding: 0 }}>
        {menuContent}
      </Drawer>
      <style>{`
        @media (max-width: 768px) {
          .admin-sider { display: none !important; }
          .admin-menu-btn { display: inline-flex !important; }
        }
      `}</style>
    </Layout>
  );
};

export default AdminLayout;
