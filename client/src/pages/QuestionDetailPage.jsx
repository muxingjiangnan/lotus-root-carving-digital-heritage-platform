import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Tag, Input, message, Spin, Empty, Divider, Popconfirm } from 'antd';
import { LeftOutlined, DeleteOutlined } from '@ant-design/icons';
import MainLayout from '../components/MainLayout';
import PageHeader from '../components/PageHeader';
import { getQuestionDetail, getComments, createComment, deleteComment } from '../api/question';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

const categoryColors = {
  '雕刻技艺': 'magenta',
  '材料处理': 'red',
  '作品鉴赏': 'volcano',
  '文化传承': 'orange',
  '学习交流': 'gold',
  '其他': 'default'
};

const QuestionDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);

  const [question, setQuestion] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [commentText, setCommentText] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const [qRes, cRes] = await Promise.all([
        getQuestionDetail(id),
        getComments(id)
      ]);
      setQuestion(qRes);
      setComments(cRes);
    } catch (error) {
      message.error('获取问题详情失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSubmitComment = async () => {
    if (!commentText.trim()) {
      message.warning('请输入评论内容');
      return;
    }
    if (commentText.length > 500) {
      message.warning('评论内容不超过500字');
      return;
    }
    setCommentLoading(true);
    try {
      const res = await createComment(id, { content: commentText.trim() });
      setComments((prev) => [...prev, res]);
      setCommentText('');
      message.success('评论发表成功');
    } catch (error) {
      const msg = error?.response?.data?.message || '评论发表失败';
      message.error(msg);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(id, commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      message.success('删除成功');
    } catch (error) {
      const msg = error?.response?.data?.message || '删除失败';
      message.error(msg);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div style={{ textAlign: 'center', padding: 80 }}><Spin size="large" /></div>
      </MainLayout>
    );
  }

  if (!question) {
    return (
      <MainLayout>
        <div style={{ textAlign: 'center', padding: 80 }}>
          <Empty description="问题不存在或暂未通过审核" />
          <Button style={{ marginTop: 16 }} onClick={() => navigate('/questions')}>
            返回问答列表
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Button
          type="link"
          icon={<LeftOutlined />}
          onClick={() => navigate('/questions')}
          style={{ marginBottom: 16, paddingLeft: 0 }}
        >
          返回问答列表
        </Button>

        <div style={{ background: '#fff', padding: 24, borderRadius: 8, border: '1px solid #f0f0f0', marginBottom: 24 }}>
          <Tag color={categoryColors[question.category] || 'default'} style={{ marginBottom: 12 }}>
            {question.category || '其他'}
          </Tag>
          <h2 style={{ marginTop: 0, marginBottom: 16, fontSize: 20, fontWeight: 600 }}>
            {question.content}
          </h2>
          <div style={{ color: '#888', fontSize: 13, marginBottom: 16 }}>
            提问者：{question.author?.username || '匿名'} | {new Date(question.createdAt).toLocaleString()}
          </div>

          {question.answer && (
            <div style={{ background: '#f6ffed', padding: 16, borderRadius: 6, border: '1px solid #b7eb8f', marginTop: 12 }}>
              <Tag color="green" style={{ marginBottom: 8 }}>官方回复</Tag>
              <div style={{ color: '#333', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{question.answer}</div>
            </div>
          )}
        </div>

        <Divider titlePlacement="left" style={{ fontSize: 16, fontWeight: 500 }}>
          💬 评论交流（{comments.length}条）
        </Divider>

        {comments.length === 0 ? (
          <Empty description="暂无评论，快来发表第一条评论吧~" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 32 }}>
            {comments.map((item) => (
              <div
                key={item._id}
                style={{
                  background: '#fafafa',
                  padding: '16px 20px',
                  borderRadius: 8,
                  border: '1px solid #f0f0f0'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontWeight: 500, color: '#333', fontSize: 14 }}>
                    {item.author?.username || '匿名'}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ color: '#bbb', fontSize: 12 }}>
                      {new Date(item.createdAt).toLocaleString()}
                    </span>
                    {user && item.author?._id === user._id && (
                      <Popconfirm
                        title="确认删除"
                        description="确定要删除这条评论吗？"
                        onConfirm={() => handleDeleteComment(item._id)}
                        okText="删除"
                        cancelText="取消"
                        okButtonProps={{ danger: true }}
                      >
                        <Button type="text" size="small" icon={<DeleteOutlined />} style={{ color: '#999' }}>
                          删除
                        </Button>
                      </Popconfirm>
                    )}
                  </div>
                </div>
                <div style={{ color: '#555', lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ background: '#fff', padding: 24, borderRadius: 8, border: '1px solid #f0f0f0' }}>
          <div style={{ fontWeight: 500, marginBottom: 12 }}>发表评论</div>
          {token ? (
            <>
              <TextArea
                rows={3}
                placeholder="发表你的看法..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                maxLength={500}
                showCount
              />
              <div style={{ textAlign: 'right', marginTop: 12 }}>
                <Button
                  type="primary"
                  onClick={handleSubmitComment}
                  loading={commentLoading}
                >
                  提交评论
                </Button>
              </div>
            </>
          ) : (
            <div style={{ color: '#888', textAlign: 'center', padding: '20px 0' }}>
              请<Button type="link" onClick={() => navigate('/login')}>登录</Button>后发表评论
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default QuestionDetailPage;
