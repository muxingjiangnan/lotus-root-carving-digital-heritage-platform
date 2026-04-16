import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import router from './routes';

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          colorPrimary: '#8B4513',
          borderRadius: 8,
          fontFamily: "system-ui, 'PingFang SC', 'Microsoft YaHei', sans-serif",
        },
        components: {
          Button: {
            primaryShadow: '0 4px 12px rgba(139,69,19,0.25)',
          },
          Menu: {
            itemHoverColor: '#8B4513',
            horizontalItemHoverColor: '#8B4513',
          },
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
