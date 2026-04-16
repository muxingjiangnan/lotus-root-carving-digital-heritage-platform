import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Form, Input, Button, Card, message, Typography, Checkbox } from 'antd';
import { login as loginApi } from '../api/auth';
import { login as loginAction } from '../store/slices/authSlice';
import AuthLayout from '../components/auth/AuthLayout';
import useCaptchaInput from '../components/auth/useCaptchaInput';
import SocialLogin from '../components/auth/SocialLogin';

const { Title, Text } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location.state?.from || '/';
  const captcha = useCaptchaInput({
    value: form.getFieldValue('captcha'),
    onChange: (e) => form.setFieldsValue({ captcha: e.target.value }),
  });

  const onFinish = async (values) => {
    if (!captcha.isValid(values.captcha)) {
      message.error('验证码错误，请重新输入');
      captcha.refresh();
      form.setFieldsValue({ captcha: '' });
      return;
    }
    setLoading(true);
    try {
      const res = await loginApi({
        username: values.username,
        password: values.password,
      });
      dispatch(loginAction({ user: res.user, token: res.token }));
      message.success('登录成功');
      navigate(from, { replace: true });
    } catch (error) {
      captcha.refresh();
      form.setFieldsValue({ captcha: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Card
        bordered={false}
        style={{
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 16,
          boxShadow: '0 8px 40px rgba(93,64,55,0.1)',
          padding: '32px 24px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={3} style={{ margin: 0, fontWeight: 600, color: '#3E2723' }}>
            用户登录
          </Title>
          <Text type="secondary" style={{ fontSize: 15 }}>
            欢迎回到莲花根雕非遗平台
          </Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          size="large"
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              placeholder="请输入用户名"
              autoFocus
              aria-label="用户名"
            />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password
              placeholder="请输入密码"
              aria-label="密码"
            />
          </Form.Item>

          <Form.Item
            label="验证码"
            name="captcha"
            rules={[{ required: true, message: '请输入验证码' }]}
            style={{ marginBottom: 12 }}
          >
            {captcha.render}
          </Form.Item>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ fontSize: 14 }}>记住我</Checkbox>
            </Form.Item>
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                message.info('请联系管理员重置密码');
              }}
              style={{ fontSize: 14 }}
            >
              忘记密码？
            </Link>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              size="large"
              style={{
                borderRadius: 8,
                background: '#5D4037',
                borderColor: '#5D4037',
              }}
            >
              登 录
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', fontSize: 15, marginTop: 8 }}>
            还没有账号？
            <Link to="/register" state={{ from }}>
              立即注册
            </Link>
          </div>
        </Form>

        <SocialLogin />
      </Card>
    </AuthLayout>
  );
};

export default LoginPage;
