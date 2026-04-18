import { useState } from 'react'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, Input, Button, Card, message, Typography, Checkbox } from 'antd'
import { userLogin } from '../api/auth'
import { login as loginAction } from '../store/slices/authSlice'
import AuthLayout from '../components/auth/AuthLayout'
import useCaptchaInput from '../components/auth/useCaptchaInput'

const { Title, Text } = Typography

/**
 * 登录页面
 * 提供用户名密码登录、验证码校验、记住我选项
 */
function LoginPage() {
  // 1. hooks & state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const fromPath = location.state?.from || '/'
  const captchaValue = Form.useWatch('captcha', form)
  const captcha = useCaptchaInput({
    value: captchaValue,
    onChange: (e) => form.setFieldsValue({ captcha: e.target.value })
  })

  // 2. handlers
  async function handleLoginSubmit(values) {
    // 校验验证码
    if (!captcha.isValid(values.captcha)) {
      message.error('验证码错误，请重新输入')
      captcha.refresh()
      form.setFieldsValue({ captcha: '' })
      return
    }

    setIsSubmitting(true)
    try {
      const responseData = await userLogin({
        username: values.username,
        password: values.password
      })
      dispatch(loginAction({ user: responseData.user, token: responseData.token }))
      message.success('登录成功')
      navigate(fromPath, { replace: true })
    } catch (error) {
      console.error('登录失败:', error)
      // 错误提示已由 request.js 拦截器统一处理，这里只刷新验证码
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
            用户登录
          </Title>
          <Text type="secondary" style={{ fontSize: 15, letterSpacing: 0.5 }}>
            欢迎回到莲花根雕非遗平台
          </Text>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleLoginSubmit}
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
              className="auth-input"
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
              className="auth-input"
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
              marginBottom: 16
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox style={{ fontSize: 14 }}>记住我</Checkbox>
            </Form.Item>
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault()
                message.info('请联系管理员重置密码')
              }}
              style={{ fontSize: 14, color: '#8B4513' }}
            >
              忘记密码？
            </Link>
          </div>

          <Form.Item>
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
              登 录
            </Button>
          </Form.Item>

          <div style={{ textAlign: 'center', fontSize: 15, marginTop: 8 }}>
            还没有账号？
            <Link
              to="/register"
              state={{ from: fromPath }}
              style={{ color: '#8B4513', fontWeight: 500 }}
            >
              立即注册
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

export default LoginPage
