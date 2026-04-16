import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Form, Input, Button, Card, message, Typography, Checkbox } from 'antd';
import { register as registerApi } from '../api/auth';
import AuthLayout from '../components/auth/AuthLayout';
import useCaptchaInput from '../components/auth/useCaptchaInput';
import PasswordStrength from '../components/auth/PasswordStrength';

const { Title, Text } = Typography;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || '/';
  const captchaValue = Form.useWatch('captcha', form);
  const captcha = useCaptchaInput({
    value: captchaValue,
    onChange: (e) => form.setFieldsValue({ captcha: e.target.value }),
  });

  const onFinish = async (values) => {
    if (!captcha.isValid(values.captcha)) {
      message.error('验证码错误，请重新输入');
      captcha.refresh();
      form.setFieldsValue({ captcha: '' });
      return;
    }
    if (!values.agreement) {
      message.error('请阅读并同意用户协议与隐私政策');
      return;
    }
    setLoading(true);
    try {
      await registerApi({
        username: values.username,
        password: values.password,
        email: values.email,
        phone: values.phone,
      });
      message.success('注册成功，请登录');
      navigate('/login', { state: { from }, replace: true });
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
            用户注册
          </Title>
          <Text type="secondary" style={{ fontSize: 15 }}>
            加入莲花根雕非遗平台，开启传承之旅
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
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3位' },
              { max: 20, message: '用户名最多20位' },
              { pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, message: '用户名不能包含特殊字符' },
            ]}
          >
            <Input placeholder="请输入用户名" autoFocus aria-label="用户名" />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' },
            ]}
          >
            <Input placeholder="请输入手机号" maxLength={11} aria-label="手机号" />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' },
            ]}
          >
            <Input placeholder="请输入邮箱" aria-label="邮箱" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6位' },
            ]}
          >
            <Input.Password
              placeholder="请输入密码"
              aria-label="密码"
              onChange={(e) => setPasswordValue(e.target.value)}
            />
          </Form.Item>
          <PasswordStrength value={passwordValue} />

          <Form.Item
            label="确认密码"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
            style={{ marginTop: 16 }}
          >
            <Input.Password placeholder="请再次输入密码" aria-label="确认密码" />
          </Form.Item>

          <Form.Item
            label="验证码"
            name="captcha"
            rules={[{ required: true, message: '请输入验证码' }]}
            style={{ marginBottom: 12 }}
          >
            {captcha.render}
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('请阅读并同意用户协议')),
              },
            ]}
            style={{ marginBottom: 8 }}
          >
            <Checkbox style={{ fontSize: 14 }}>
              我已阅读并同意
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  message.info('用户协议与隐私政策页面即将上线');
                }}
              >
                《用户协议》
              </Link>
              和
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  message.info('隐私政策页面即将上线');
                }}
              >
                《隐私政策》
              </Link>
            </Checkbox>
          </Form.Item>

          <Form.Item style={{ marginTop: 16 }}>
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
              注 册
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', fontSize: 15, marginTop: 8 }}>
            已有账号？
            <Link to="/login" state={{ from }}>
              去登录
            </Link>
          </div>
        </Form>
      </Card>
    </AuthLayout>
  );
};

export default RegisterPage;
