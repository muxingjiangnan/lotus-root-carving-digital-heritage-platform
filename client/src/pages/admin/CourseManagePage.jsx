import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message, Spin } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../../api/course';

const { TextArea } = Input;

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
    form.setFieldsValue({ chapters: [{ title: '', videoUrl: '', duration: '' }] });
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditing(record);
    form.setFieldsValue({
      title: record.title,
      coverImage: record.coverImage,
      description: record.description,
      chapters: record.chapters?.length ? record.chapters : [{ title: '', videoUrl: '', duration: '' }]
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
      if (editing) {
        await updateCourse(editing._id, values);
        message.success('更新成功');
      } else {
        await createCourse(values);
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
      <Modal title={editing ? '编辑课程' : '新增课程'} open={modalVisible} onCancel={() => setModalVisible(false)} footer={null} width={700}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="课程标题" name="title" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="封面URL" name="coverImage"><Input placeholder="课程封面图片URL" /></Form.Item>
          <Form.Item label="课程简介" name="description"><TextArea rows={3} /></Form.Item>
          <Form.Item label="章节列表">
            <Form.List name="chapters">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item {...restField} name={[name, 'title']} rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                        <Input placeholder="章节标题" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'videoUrl']} rules={[{ required: true }]} style={{ marginBottom: 0 }}>
                        <Input placeholder="视频URL" />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'duration']} style={{ marginBottom: 0 }}>
                        <Input placeholder="时长" style={{ width: 100 }} />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => add()} block>添加章节</Button>
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
