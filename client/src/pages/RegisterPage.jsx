import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { Form, Input, Button, Card, message, Typography, Checkbox } from 'antd'
import { userRegister } from '../api/auth'
import AuthLayout from '../components/auth/AuthLayout'
import useCaptchaInput from '../components/auth/useCaptchaInput'
import PasswordStrength from '../components/auth/PasswordStrength'

const { Title, Text } = Typography

/**
 * 注册页面
 * 提供用户名、手机号、邮箱、密码注册及验证码校验
 */
function RegisterPage() {
  // 1. hooks & state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const location = useLocation()

  const fromPath = location.state?.from || '/'
  const captchaValue = Form.useWatch('captcha', form)
  const captcha = useCaptchaInput({
    value: captchaValue,
    onChange: (e) => form.setFieldsValue({ captcha: e.target.value })
  })

  // 2. handlers
  async function handleRegisterSubmit(values) {
    // 校验验证码
    if (!captcha.isValid(values.captcha)) {
      message.error('验证码错误，请重新输入')
      captcha.refresh()
      form.setFieldsValue({ captcha: '' })
      return
    }

    // 校验用户协议
    if (!values.agreement) {
      message.error('请阅读并同意用户协议与隐私政策')
      return
    }

    setIsSubmitting(true)
    try {
      await userRegister({
        username: values.username,
        password: values.password,
        email: values.email,
        phone: values.phone
      })
      message.success('注册成功，请登录')
      navigate('/login', { state: { from: fromPath }, replace: true })
    } catch (error) {
      console.error('注册失败:', error)
      captcha.refresh()
      form.setFieldsValue({ captcha: '' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // 3. JSX return
  return (
    <AuthLayout>
      <Card
        bordered={false}
        style={{
          background: 'rgba(255,255,255,0.96)',
          borderRadius: 16,
          boxShadow: '0 8px 40px rgba(93,64,55,0.1)',
          padding: '32px 24px',
          border: '1px solid rgba(93,64,55,0.06)'
        }}
      >
        {/* 标题区域 */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title
            level={3}
            style={{
              margin: 0,
              fontWeight: 700,
              color: '#3E2723',
              fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif",
              letterSpacing: 2
            }}
          >
            用户注册
          </Title>
          <Text type="secondary" style={{ fontSize: 15, letterSpacing: 0.5 }}>
            加入莲花根雕非遗平台，开启传承之旅
          </Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleRegisterSubmit}
          size="large"
          autoComplete="off"
        >
          {/* 用户名 */}
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, message: '用户名至少3位' },
              { max: 20, message: '用户名最多20位' },
              { pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/, message: '用户名不能包含特殊字符' }
            ]}
          >
            <Input placeholder="请输入用户名" autoFocus aria-label="用户名" className="auth-input" />
          </Form.Item>

          {/* 手机号 */}
          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
            ]}
          >
            <Input placeholder="请输入手机号" maxLength={11} aria-label="手机号" className="auth-input" />
          </Form.Item>

          {/* 邮箱 */}
          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入有效的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱" aria-label="邮箱" className="auth-input" />
          </Form.Item>

          {/* 密码 */}
          <Form.Item
            label="密码"
            name="password"
            rules={[
              { required: true, message: '请输入密码' },
              { min: 6, message: '密码至少6位' }
            ]}
          >
            <Input.Password
              placeholder="请输入密码"
              aria-label="密码"
              onChange={(e) => setPasswordInput(e.target.value)}
              className="auth-input"
            />
          </Form.Item>
          <PasswordStrength value={passwordInput} />

          {/* 确认密码 */}
          <Form.Item
            label="确认密码"
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: '请确认密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'))
                }
              })
            ]}
            style={{ marginTop: 16 }}
          >
            <Input.Password placeholder="请再次输入密码" aria-label="确认密码" className="auth-input" />
          </Form.Item>

          {/* 验证码 */}
          <Form.Item
            label="验证码"
            name="captcha"
            rules={[{ required: true, message: '请输入验证码' }]}
            style={{ marginBottom: 12 }}
          >
            {captcha.render}
          </Form.Item>

          {/* 用户协议 */}
          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('请阅读并同意用户协议'))
              }
            ]}
            style={{ marginBottom: 8 }}
          >
            <Checkbox style={{ fontSize: 14 }}>
              我已阅读并同意
              <Link to="/terms" target="_blank" style={{ color: '#8B4513', fontWeight: 500 }}>
                《用户协议》
              </Link>
              和
              <Link to="/privacy" target="_blank" style={{ color: '#8B4513', fontWeight: 500 }}>
                《隐私政策》
              </Link>
            </Checkbox>
          </Form.Item>

          <Form.Item style={{ marginTop: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={isSubmitting}
              size="large"
              className="auth-submit-btn"
              style={{
                borderRadius: 8,
                background: '#5D4037',
                borderColor: '#5D4037',
                letterSpacing: 2,
                fontWeight: 600
              }}
            >
              注 册
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', fontSize: 15, marginTop: 8 }}>
            已有账号？
            <Link to="/login" state={{ from: fromPath }} style={{ color: '#8B4513', fontWeight: 500 }}>
              去登录
            </Link>
          </div>
        </Form>
      </Card>

      <style>{`
        .auth-input input,
        .auth-input .ant-input-password {
          transition: all 0.3s ease;
        }
        .auth-input input:focus,
        .auth-input .ant-input-affix-wrapper-focused {
          border-color: #C5A065 !important;
          box-shadow: 0 0 0 3px rgba(197,160,101,0.15) !important;
        }
        .auth-submit-btn:hover {
          background: #6D4C41 !important;
          border-color: #6D4C41 !important;
          box-shadow: 0 4px 16px rgba(93,64,55,0.25) !important;
        }
      `}</style>
    </AuthLayout>
  )
}

export default RegisterPage
