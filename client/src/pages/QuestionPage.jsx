import { useEffect, useState } from 'react';
import { List, Button, Modal, Form, Input, message, Spin, Tag } from 'antd';
import MainLayout from '../components/MainLayout';
import PageHeader from '../components/PageHeader';
import { getApprovedQuestions, createQuestion } from '../api/question';

const { TextArea } = Input;

const QuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchQuestions = () => {
    setLoading(true);
    getApprovedQuestions()
      .then((res) => setQuestions(res))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSubmit = async (values) => {
    try {
      await createQuestion(values);
      message.success('提交成功，审核通过后将公开展示');
      form.resetFields();
      setModalVisible(false);
    } catch (error) {}
  };

  return (
    <MainLayout>
      <PageHeader title="互动问答区" subtitle="交流学习心得，解答技艺疑问" />
      <div style={{ textAlign: 'right', marginBottom: 24 }}>
        <Button type="primary" onClick={() => setModalVisible(true)}>我要提问</Button>
      </div>
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40 }}><Spin size="large" /></div>
      ) : (
        <List
          bordered
          dataSource={questions}
          renderItem={(item) => (
            <List.Item>
              <div style={{ width: '100%' }}>
                <p style={{ fontSize: 16, marginBottom: 8 }}>{item.content}</p>
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
            </List.Item>
          )}
        />
      )}
      <Modal title="提交问题" open={modalVisible} onCancel={() => setModalVisible(false)} footer={null}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="问题内容"
            name="content"
            rules={[{ required: true, message: '请输入问题内容' }, { max: 500, message: '不超过500字' }]}
          >
            <TextArea rows={4} placeholder="请描述你的问题..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>提交</Button>
          </Form.Item>
        </Form>
      </Modal>
    </MainLayout>
  );
};

export default QuestionPage;
