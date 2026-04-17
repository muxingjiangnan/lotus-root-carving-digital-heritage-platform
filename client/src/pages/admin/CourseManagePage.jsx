import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message, Spin, Select } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../../api/course';

const { TextArea } = Input;

const extractBvid = (url) => {
  if (!url) return '';
  const match = url.match(/BV[0-9A-Za-z]+/);
  return match ? match[0] : '';
};

const CourseManagePage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const fetchData = () => {
    setLoading(true);
    getCourses()
      .then((res) => setCourses(res))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue({ chapters: [{ title: '', videoUrl: '', duration: '', source: 'local', externalUrl: '' }] });
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditing(record);
    form.setFieldsValue({
      title: record.title,
      coverImage: record.coverImage,
      description: record.description,
      chapters: record.chapters?.length
        ? record.chapters.map((ch) => ({
            ...ch,
            source: ch.source || 'local',
            externalUrl: ch.externalUrl || ''
          }))
        : [{ title: '', videoUrl: '', duration: '', source: 'local', externalUrl: '' }]
    });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCourse(id);
      message.success('删除成功');
      fetchData();
    } catch (error) {}
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        chapters: values.chapters?.map((ch) => {
          if (ch.source === 'bilibili' && ch.externalUrl) {
            const bvid = extractBvid(ch.externalUrl);
            return { ...ch, videoUrl: bvid || ch.videoUrl };
          }
          return ch;
        })
      };
      if (editing) {
        await updateCourse(editing._id, payload);
        message.success('更新成功');
      } else {
        await createCourse(payload);
        message.success('创建成功');
      }
      setModalVisible(false);
      fetchData();
    } catch (error) {}
  };

  const columns = [
    { title: '课程标题', dataIndex: 'title' },
    { title: '章节数', render: (_, r) => r.chapterCount },
    {
      title: '操作',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>编辑</Button>
          <Popconfirm title="确定删除？" onConfirm={() => handleDelete(record._id)}>
            <Button type="link" danger>删除</Button>
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>课程管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增课程</Button>
      </div>
      {loading ? <Spin size="large" style={{ display: 'block', textAlign: 'center', padding: 40 }} /> : (
        <Table rowKey="_id" dataSource={courses} columns={columns} pagination={{ pageSize: 10 }} />
      )}
      <Modal title={editing ? '编辑课程' : '新增课程'} open={modalVisible} onCancel={() => setModalVisible(false)} footer={null} width={760}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="课程标题" name="title" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="封面URL" name="coverImage"><Input placeholder="课程封面图片URL" /></Form.Item>
          <Form.Item label="课程简介" name="description"><TextArea rows={3} /></Form.Item>
          <Form.Item label="章节列表">
            <Form.List name="chapters">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 12, gap: 8 }}>
                      <Form.Item {...restField} name={[name, 'title']} rules={[{ required: true }]} style={{ marginBottom: 0, flex: 2 }}>
                        <Input placeholder="章节标题" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'source']} style={{ marginBottom: 0, width: 110 }}>
                        <Select placeholder="来源">
                          <Select.Option value="local">本地/直链</Select.Option>
                          <Select.Option value="bilibili">Bilibili</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, curValues) => {
                          const prevSource = prevValues?.chapters?.[name]?.source;
                          const curSource = curValues?.chapters?.[name]?.source;
                          return prevSource !== curSource;
                        }}
                      >
                        {({ getFieldValue }) => {
                          const source = getFieldValue(['chapters', name, 'source']);
                          return source === 'bilibili' ? (
                            <Form.Item {...restField} name={[name, 'externalUrl']} style={{ marginBottom: 0, flex: 3 }}>
                              <Input placeholder="Bilibili 链接，自动提取 BV 号" />
                            </Form.Item>
                          ) : (
                            <Form.Item {...restField} name={[name, 'videoUrl']} rules={[{ required: true }]} style={{ marginBottom: 0, flex: 3 }}>
                              <Input placeholder="视频 URL" />
                            </Form.Item>
                          );
                        }}
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'duration']} style={{ marginBottom: 0, width: 90 }}>
                        <Input placeholder="时长" />
                      </Form.Item>
                      <MinusCircleOutlined style={{ marginTop: 8 }} onClick={() => remove(name)} />
                    </div>
                  ))}
                  <Button type="dashed" onClick={() => add({ title: '', videoUrl: '', duration: '', source: 'local', externalUrl: '' })} block>添加章节</Button>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>{editing ? '保存修改' : '立即创建'}</Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CourseManagePage;
