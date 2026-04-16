import { Layout } from 'antd';

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer
      style={{
        textAlign: 'center',
        background: '#F5F3EF',
        color: '#7A7A7A',
        borderTop: '1px solid #E8E4DE',
        fontSize: 14,
        padding: '24px 16px',
      }}
    >
      <div style={{ marginBottom: 8, fontWeight: 500, color: '#5D5D5D' }}>
        莲韵非遗 · 数字传承
      </div>
      <div style={{ fontSize: 13 }}>
        © {new Date().getFullYear()} 莲花根雕非遗数字化展示与教育平台
      </div>
      <div style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>
        湖南财政经济学院 · 大学生创新创业训练计划项目
      </div>
    </Footer>
  );
};

export default AppFooter;
