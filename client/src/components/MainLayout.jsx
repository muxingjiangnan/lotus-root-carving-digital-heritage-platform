import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './Navbar';
import Footer from './Footer';

const { Content } = Layout;

const MainLayout = ({ children, contentClassName, contentFullWidth }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const contentStyle = contentFullWidth
    ? { width: '100%', padding: 0 }
    : { maxWidth: 1200, margin: '0 auto', width: '100%', padding: '12px 16px' };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content className={contentClassName} style={contentStyle}>
        {children}
      </Content>
      <Footer />
    </Layout>
  );
};

export default MainLayout;
