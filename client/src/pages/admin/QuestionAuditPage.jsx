import { useEffect, useState } from 'react'
import { Table, Radio, Button, Input, Spin, message, Tag, Descriptions, Popconfirm } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { fetchAllQuestionList, reviewQuestion, removeQuestion } from '../../api/question'

const { TextArea } = Input

/**
 * 问答审核页面
 * 支持问题列表查看、审核及删除操作
 */
function QuestionAuditPage() {
  /* ─────────────── hooks ─────────────── */
  const [questionList, setQuestionList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [auditResult, setAuditResult] = useState('approved')
  const [replyContent, setReplyContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  /* ─────────────── effects ─────────────── */
  useEffect(() => {
    fetchQuestionData()
  }, [])

  /* ─────────────── handlers ─────────────── */
  const fetchQuestionData = () => {
    setIsLoading(true)
    fetchAllQuestionList()
      .then((res) => {
        setQuestionList(res)
        if (currentQuestion) {
          const updated = res.find((q) => q._id === currentQuestion._id)
          setCurrentQuestion(updated || null)
        }
      })
      .finally(() => setIsLoading(false))
  }

  const handleRowClick = (record) => {
    setCurrentQuestion(record)
    setAuditResult(record.status === 'rejected' ? 'rejected' : 'approved')
    setReplyContent(record.answer || '')
  }

  const handleAudit = async () => {
    if (!currentQuestion) return
    setIsSubmitting(true)
    try {
      await reviewQuestion(currentQuestion._id, { status: auditResult, answer: replyContent })
      message.success('审核完成')
      setCurrentQuestion(null)
      fetchQuestionData()
    } catch (error) {
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!currentQuestion) return
    try {
      await removeQuestion(currentQuestion._id)
      message.success('删除成功')
      setCurrentQuestion(null)
      fetchQuestionData()
    } catch (error) {
      const msg = error?.response?.data?.message || '删除失败'
      message.error(msg)
    }
  }

  /* ─────────────── derived ─────────────── */
  const columns = [
    { title: '提问人', dataIndex: ['author', 'username'], width: 120 },
    { title: '问题内容', dataIndex: 'content', ellipsis: true },
    {
      title: '类别',
      dataIndex: 'category',
      width: 100,
      render: (category) => <Tag>{category || '其他'}</Tag>
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: (status) => {
        const colors = { pending: 'orange', approved: 'green', rejected: 'red' }
        const labels = { pending: '待审核', approved: '已通过', rejected: '已拒绝' }
        return <Tag color={colors[status]}>{labels[status]}</Tag>
      }
    },
    { title: '时间', dataIndex: 'createdAt', width: 170, render: (t) => new Date(t).toLocaleString() }
  ]

  /* ─────────────── JSX ─────────────── */
  return (
    <div>
      <h2>问答审核</h2>
      <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
        {/* 问题列表 */}
        <div style={{ flex: 1 }}>
          {isLoading ? (
            <Spin size="large" style={{ display: 'block', textAlign: 'center', padding: 40 }} />
          ) : (
            <Table
              rowKey="_id"
              dataSource={questionList}
              columns={columns}
              pagination={{ pageSize: 8 }}
              rowClassName={(record) => (currentQuestion?._id === record._id ? 'ant-table-row-selected' : '')}
              onRow={(record) => ({ onClick: () => handleRowClick(record), style: { cursor: 'pointer' } })}
            />
          )}
        </div>

        {/* 审核详情面板 */}
        <div style={{ width: 360, background: '#fafafa', padding: 16, borderRadius: 8, border: '1px solid #f0f0f0' }}>
          {currentQuestion ? (
            <>
              <h3>审核详情</h3>
              <Descriptions column={1} size="small" style={{ marginBottom: 16 }}>
                <Descriptions.Item label="提问人">{currentQuestion.author?.username}</Descriptions.Item>
                <Descriptions.Item label="问题类别">{currentQuestion.category || '其他'}</Descriptions.Item>
                <Descriptions.Item label="提问时间">{new Date(currentQuestion.createdAt).toLocaleString()}</Descriptions.Item>
              </Descriptions>
              <p style={{ background: '#fff', padding: 12, borderRadius: 4, marginBottom: 16 }}>
                {currentQuestion.content}
              </p>
              <div style={{ marginBottom: 16 }}>
                <span style={{ marginRight: 8 }}>审核结果：</span>
                <Radio.Group value={auditResult} onChange={(e) => setAuditResult(e.target.value)}>
                  <Radio value="approved">通过</Radio>
                  <Radio value="rejected">拒绝</Radio>
                </Radio.Group>
              </div>
              <TextArea
                rows={4}
                placeholder="填写回复内容（通过时展示给用户）"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                style={{ marginBottom: 16 }}
              />
              <Button
                type="primary"
                block
                loading={isSubmitting}
                onClick={handleAudit}
                style={{ marginBottom: 12 }}
              >
                提交审核
              </Button>
              <Popconfirm
                title="确认删除"
                description="确定要删除该问题吗？相关评论也会被一并删除，此操作不可恢复。"
                onConfirm={handleDelete}
                okText="删除"
                cancelText="取消"
                okButtonProps={{ danger: true }}
              >
                <Button danger block icon={<DeleteOutlined />}>
                  删除问题
                </Button>
              </Popconfirm>
            </>
          ) : (
            <div style={{ color: '#888', textAlign: 'center', paddingTop: 40 }}>
              点击左侧问题查看详情并进行审核
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QuestionAuditPage
