import { useEffect, useState } from 'react'
import { Button, Modal, Form, Input, message, Spin, Tag, Select, Empty, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import MainLayout from '../components/MainLayout'
import PageHeader from '../components/PageHeader'
import { fetchQuestionList, addQuestion, removeQuestion } from '../api/question'

const { TextArea } = Input
const { Option } = Select

// 问题分类配置
const categoryList = ['全部', '雕刻技艺', '材料处理', '作品鉴赏', '文化传承', '学习交流', '其他']

// 分类标签颜色映射
const categoryColorMap = {
  '雕刻技艺': 'magenta',
  '材料处理': 'red',
  '作品鉴赏': 'volcano',
  '文化传承': 'orange',
  '学习交流': 'gold',
  '其他': 'default'
}

/**
 * 互动问答页面
 * 支持分类查看、提问、删除自己发布的问题
 */
function QuestionPage() {
  // 1. hooks & state
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)

  const [questionList, setQuestionList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)
  const [currentCategory, setCurrentCategory] = useState('全部')
  const [form] = Form.useForm()

  // 2. effects
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const responseData = await fetchQuestionList(currentCategory === '全部' ? '' : currentCategory)
        setQuestionList(responseData)
      } catch (error) {
        console.error('获取问题列表失败:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [currentCategory])

  // 3. handlers
  async function handleSubmitQuestion(values) {
    try {
      await addQuestion(values)
      message.success('提交成功，审核通过后将公开展示')
      form.resetFields()
      setIsQuestionModalOpen(false)

      // 刷新当前分类下的问题列表
      const responseData = await fetchQuestionList(currentCategory === '全部' ? '' : currentCategory)
      setQuestionList(responseData)
    } catch (error) {
      console.error('提交问题失败:', error)
    }
  }

  async function handleRemoveQuestion(questionId, e) {
    e.stopPropagation()
    try {
      await removeQuestion(questionId)
      message.success('删除成功')
      setQuestionList((prev) => prev.filter((q) => q._id !== questionId))
    } catch (error) {
      const msg = error?.response?.data?.message || '删除失败'
      message.error(msg)
    }
  }

  // 4. JSX return
  return (
    <MainLayout>
      <PageHeader title="互动问答区" subtitle="交流学习心得，解答技艺疑问" />

      {/* 类别筛选 */}
      <div style={{ marginBottom: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {categoryList.map((cat) => (
          <Button
            key={cat}
            type={currentCategory === cat ? 'primary' : 'default'}
            size="small"
            onClick={() => setCurrentCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>

      <div style={{ textAlign: 'right', marginBottom: 24 }}>
        <Button type="primary" onClick={() => setIsQuestionModalOpen(true)}>
          我要提问
        </Button>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: 40 }}>
          <Spin size="large" />
        </div>
      ) : questionList.length === 0 ? (
        <Empty description="暂无问题，快来提出第一个问题吧~" />
      ) : (
        <div style={{ border: '1px solid #f0f0f0', borderRadius: 8, overflow: 'hidden' }}>
          {questionList.map((item, index) => (
            <div
              key={item._id}
              style={{
                padding: '16px 24px',
                borderBottom: index !== questionList.length - 1 ? '1px solid #f0f0f0' : 'none',
                cursor: 'pointer',
                background: '#fff'
              }}
              onClick={() => navigate(`/questions/${item._id}`)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <p style={{ fontSize: 16, margin: 0, flex: 1, marginRight: 12 }}>{item.content}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  <Tag color={categoryColorMap[item.category] || 'default'}>
                    {item.category || '其他'}
                  </Tag>
                  {user && item.author?._id === user._id && (
                    <Popconfirm
                      title="确认删除"
                      description="确定要删除这个问题吗？相关评论也会被一并删除。"
                      onConfirm={(e) => handleRemoveQuestion(item._id, e)}
                      okText="删除"
                      cancelText="取消"
                      okButtonProps={{ danger: true }}
                    >
                      <Button
                        type="text"
                        size="small"
                        icon={<DeleteOutlined />}
                        style={{ color: '#999' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        删除
                      </Button>
                    </Popconfirm>
                  )}
                </div>
              </div>
              <div style={{ color: '#888', fontSize: 12, marginBottom: 8 }}>
                提问者：{item.author?.username || '匿名'} | {new Date(item.createdAt).toLocaleString()}
              </div>
              {item.answer && (
                <div style={{ background: '#f6ffed', padding: 12, borderRadius: 4, border: '1px solid #b7eb8f' }}>
                  <Tag color="green">官方回复</Tag>
                  <span>{item.answer}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* 提问弹窗 */}
      <Modal
        title="提交问题"
        open={isQuestionModalOpen}
        onCancel={() => setIsQuestionModalOpen(false)}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmitQuestion}>
          <Form.Item
            label="问题类别"
            name="category"
            rules={[{ required: true, message: '请选择问题类别' }]}
          >
            <Select placeholder="请选择问题类别">
              {categoryList.filter((c) => c !== '全部').map((cat) => (
                <Option key={cat} value={cat}>{cat}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="问题内容"
            name="content"
            rules={[
              { required: true, message: '请输入问题内容' },
              { max: 500, message: '不超过500字' }
            ]}
          >
            <TextArea rows={4} placeholder="请描述你的问题..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </MainLayout>
  )
}

export default QuestionPage
