import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './Navbar';
import Footer from './Footer';

const { Content } = Layout;

const MainLayout = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content style={{ maxWidth: 1200, margin: '0 auto', width: '100%', padding: '12px 16px' }}>
        {children}
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
