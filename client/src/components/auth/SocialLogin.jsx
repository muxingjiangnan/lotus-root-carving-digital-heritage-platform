import { Button, Space, Divider } from 'antd';
import { message } from 'antd';

const SocialLogin = () => {
  const handleClick = (type) => {
    message.info(`${type}登录功能即将上线，敬请期待`);
  };

  return (
    <div style={{ marginTop: 24 }}>
      <Divider plain style={{ color: '#999', fontSize: 12 }}>
        其他登录方式
      </Divider>
      <Space style={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          shape="circle"
          onClick={() => handleClick('微信')}
          style={{ fontSize: 18 }}
          title="微信登录"
        >
          💬
        </Button>
        <Button
          shape="circle"
          onClick={() => handleClick('QQ')}
          style={{ fontSize: 18 }}
          title="QQ登录"
        >
          🐧
        </Button>
        <Button
          shape="circle"
          onClick={() => handleClick('微博')}
          style={{ fontSize: 18 }}
          title="微博登录"
        >
          👁️
        </Button>
      </Space>
    </div>
  );
};

export default SocialLogin;
