import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Form, Input, Button, message, Typography, Divider, Spin } from 'antd'
import { UserOutlined, PhoneOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import MainLayout from '../components/MainLayout'
import PasswordStrength from '../components/auth/PasswordStrength'
import { fetchCurrentUser, updateProfile, updatePassword } from '../api/auth'
import { updateUser } from '../store/slices/authSlice'

const { Title } = Typography

/**
 * 个人中心页面
 * 展示并支持修改用户资料（手机号、邮箱）和密码
 */
function ProfilePage() {
  const { user, token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [profileForm] = Form.useForm()
  const [passwordForm] = Form.useForm()

  const [loading, setLoading] = useState(true)
  const [profileSubmitting, setProfileSubmitting] = useState(false)
  const [passwordSubmitting, setPasswordSubmitting] = useState(false)
  const [newPasswordValue, setNewPasswordValue] = useState('')

  // 页面加载时拉取最新用户信息（确保 phone/email 是最新的）
  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    fetchCurrentUser()
      .then((res) => {
        dispatch(updateUser(res.user))
        profileForm.setFieldsValue({
          username: res.user.username,
          phone: res.user.phone,
          email: res.user.email
        })
      })
      .catch(() => {
        message.error('获取用户信息失败')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [token, navigate, dispatch, profileForm])

  // 提交资料修改
  async function handleProfileSubmit(values) {
    setProfileSubmitting(true)
    try {
      const res = await updateProfile({
        phone: values.phone,
        email: values.email
      })
      message.success('资料更新成功')
      dispatch(updateUser(res.user))
    } catch (error) {
      message.error(error.response?.data?.message || '更新失败，请稍后重试')
    } finally {
      setProfileSubmitting(false)
    }
  }

  // 提交密码修改
  async function handlePasswordSubmit(values) {
    setPasswordSubmitting(true)
    try {
      await updatePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      })
      message.success('密码修改成功')
      passwordForm.resetFields()
      setNewPasswordValue('')
    } catch (error) {
      message.error(error.response?.data?.message || '密码修改失败')
    } finally {
      setPasswordSubmitting(false)
    }
  }

  if (loading) {
    return (
      <MainLayout>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <Spin size="large" />
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 16px' }}>
        <Title
          level={3}
          style={{
            textAlign: 'center',
            fontWeight: 700,
            color: '#3E2723',
            fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif",
            marginBottom: 24
          }}
        >
          个人中心
        </Title>

        {/* 基本信息板块 */}
        <Card
          title="基本信息"
          bordered={false}
          style={{
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(93,64,55,0.08)',
            marginBottom: 24
          }}
        >
          <Form
            form={profileForm}
            layout="vertical"
            onFinish={handleProfileSubmit}
            autoComplete="off"
          >
            <Form.Item label="用户名" name="username">
              <Input prefix={<UserOutlined />} disabled />
            </Form.Item>

            <Form.Item
              label="手机号"
              name="phone"
              rules={[
                { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }
              ]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="请输入手机号" maxLength={11} />
            </Form.Item>

            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { type: 'email', message: '请输入有效的邮箱地址' }
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="请输入邮箱" />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={profileSubmitting}
                block
                style={{
                  borderRadius: 8,
                  background: '#5D4037',
                  borderColor: '#5D4037',
                  fontWeight: 600
                }}
              >
                保存资料
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* 修改密码板块 */}
        <Card
          title="修改密码"
          bordered={false}
          style={{
            borderRadius: 12,
            boxShadow: '0 4px 20px rgba(93,64,55,0.08)'
          }}
        >
          <Form
            form={passwordForm}
            layout="vertical"
            onFinish={handlePasswordSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="当前密码"
              name="currentPassword"
              rules={[{ required: true, message: '请输入当前密码' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入当前密码"
              />
            </Form.Item>

            <Form.Item
              label="新密码"
              name="newPassword"
              rules={[
                { required: true, message: '请输入新密码' },
                { min: 6, message: '密码至少6位' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入新密码"
                onChange={(e) => setNewPasswordValue(e.target.value)}
              />
            </Form.Item>
            <PasswordStrength value={newPasswordValue} />

            <Form.Item
              label="确认新密码"
              name="confirmNewPassword"
              dependencies={['newPassword']}
              rules={[
                { required: true, message: '请确认新密码' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('newPassword') === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error('两次输入的密码不一致'))
                  }
                })
              ]}
              style={{ marginTop: 16 }}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请再次输入新密码"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={passwordSubmitting}
                block
                style={{
                  borderRadius: 8,
                  background: '#5D4037',
                  borderColor: '#5D4037',
                  fontWeight: 600
                }}
              >
                修改密码
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>

      <style>{`
        .auth-input input:focus,
        .auth-input .ant-input-affix-wrapper-focused {
          border-color: #C5A065 !important;
          box-shadow: 0 0 0 3px rgba(197,160,101,0.15) !important;
        }
      `}</style>
    </MainLayout>
  )
}

export default ProfilePage
