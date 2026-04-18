import { useEffect, useState } from 'react';
import { Table, Radio, Button, Input, Spin, message, Tag, Descriptions, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { getAllQuestions, auditQuestion, deleteQuestion } from '../../api/question';

const { TextArea } = Input;

const QuestionAuditPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [auditStatus, setAuditStatus] = useState('approved');
  const [answer, setAnswer] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchData = () => {
    setLoading(true);
    getAllQuestions()
      .then((res) => {
        setQuestions(res);
        if (selected) {
          const updated = res.find((q) => q._id === selected._id);
          setSelected(updated || null);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRowClick = (record) => {
    setSelected(record);
    setAuditStatus(record.status === 'rejected' ? 'rejected' : 'approved');
    setAnswer(record.answer || '');
  };

  const handleAudit = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      await auditQuestion(selected._id, { status: auditStatus, answer });
      message.success('审核完成');
      setSelected(null);
      fetchData();
    } catch (error) {
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    try {
      await deleteQuestion(selected._id);
      message.success('删除成功');
      setSelected(null);
      fetchData();
    } catch (error) {
      const msg = error?.response?.data?.message || '删除失败';
      message.error(msg);
    }
  };

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
        const colors = { pending: 'orange', approved: 'green', rejected: 'red' };
        const labels = { pending: '待审核', approved: '已通过', rejected: '已拒绝' };
        return <Tag color={colors[status]}>{labels[status]}</Tag>;
      }
    },
    { title: '时间', dataIndex: 'createdAt', width: 170, render: (t) => new Date(t).toLocaleString() }
  ];

  return (
    <div>
      <h2>问答审核</h2>
      <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
        <div style={{ flex: 1 }}>
          {loading ? <Spin size="large" style={{ display: 'block', textAlign: 'center', padding: 40 }} /> : (
            <Table
              rowKey="_id"
              dataSource={questions}
              columns={columns}
              pagination={{ pageSize: 8 }}
              rowClassName={(record) => (selected?._id === record._id ? 'ant-table-row-selected' : '')}
              onRow={(record) => ({ onClick: () => handleRowClick(record), style: { cursor: 'pointer' } })}
            />
          )}
        </div>
        <div style={{ width: 360, background: '#fafafa', padding: 16, borderRadius: 8, border: '1px solid #f0f0f0' }}>
          {selected ? (
            <>
              <h3>审核详情</h3>
              <Descriptions column={1} size="small" style={{ marginBottom: 16 }}>
                <Descriptions.Item label="提问人">{selected.author?.username}</Descriptions.Item>
                <Descriptions.Item label="问题类别">{selected.category || '其他'}</Descriptions.Item>
                <Descriptions.Item label="提问时间">{new Date(selected.createdAt).toLocaleString()}</Descriptions.Item>
              </Descriptions>
              <p style={{ background: '#fff', padding: 12, borderRadius: 4, marginBottom: 16 }}>{selected.content}</p>
              <div style={{ marginBottom: 16 }}>
                <span style={{ marginRight: 8 }}>审核结果：</span>
                <Radio.Group value={auditStatus} onChange={(e) => setAuditStatus(e.target.value)}>
                  <Radio value="approved">通过</Radio>
                  <Radio value="rejected">拒绝</Radio>
                </Radio.Group>
              </div>
              <TextArea
                rows={4}
                placeholder="填写回复内容（通过时展示给用户）"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                style={{ marginBottom: 16 }}
              />
              <Button type="primary" block loading={submitting} onClick={handleAudit} style={{ marginBottom: 12 }}>提交审核</Button>
              <Popconfirm
                title="确认删除"
                description="确定要删除该问题吗？相关评论也会被一并删除，此操作不可恢复。"
                onConfirm={handleDelete}
                okText="删除"
                cancelText="取消"
                okButtonProps={{ danger: true }}
              >
                <Button danger block icon={<DeleteOutlined />}>删除问题</Button>
              </Popconfirm>
            </>
          ) : (
            <div style={{ color: '#888', textAlign: 'center', paddingTop: 40 }}>点击左侧问题查看详情并进行审核</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionAuditPage;
