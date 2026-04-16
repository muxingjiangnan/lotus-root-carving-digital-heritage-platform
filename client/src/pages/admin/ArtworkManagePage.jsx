import { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, Space, Popconfirm, message, Spin } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { getArtworks, createArtwork, updateArtwork, deleteArtwork } from '../../api/artwork';
import { ARTWORK_CATEGORIES } from '../../utils/constants';

const { Option } = Select;
const { TextArea } = Input;

const ArtworkManagePage = () => {
  const [data, setData] = useState({ list: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const fetchData = () => {
    setLoading(true);
    getArtworks({ page: 1, limit: 100 })
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditing(null);
    form.resetFields();
    form.setFieldsValue({ images: [''] });
    setModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditing(record);
    form.setFieldsValue({
      ...record,
      images: record.images?.length ? record.images : ['']
    });
    setModalVisible(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteArtwork(id);
      message.success('删除成功');
      fetchData();
    } catch (error) {}
  };

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      images: values.images?.filter((url) => url?.trim()) || []
    };
    try {
      if (editing) {
        await updateArtwork(editing._id, payload);
        message.success('更新成功');
      } else {
        await createArtwork(payload);
        message.success('创建成功');
      }
      setModalVisible(false);
      fetchData();
    } catch (error) {}
  };

  const columns = [
    { title: '作品名称', dataIndex: 'name' },
    { title: '分类', dataIndex: 'category' },
    { title: '年份', dataIndex: 'year' },
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
        <h2>作品管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>新增作品</Button>
      </div>
      {loading ? <Spin size="large" style={{ display: 'block', textAlign: 'center', padding: 40 }} /> : (
        <Table rowKey="_id" dataSource={data.list} columns={columns} pagination={{ pageSize: 10 }} />
      )}
      <Modal title={editing ? '编辑作品' : '新增作品'} open={modalVisible} onCancel={() => setModalVisible(false)} footer={null} width={600}>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="作品名称" name="name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="分类" name="category" rules={[{ required: true }]}>
            <Select placeholder="选择分类">
              {ARTWORK_CATEGORIES.map((c) => <Option key={c} value={c}>{c}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="材质" name="material"><Input /></Form.Item>
          <Form.Item label="尺寸" name="size"><Input /></Form.Item>
          <Form.Item label="创作年份" name="year"><Input type="number" /></Form.Item>
          <Form.Item label="作品介绍" name="description"><TextArea rows={3} /></Form.Item>
          <Form.Item label="图片URLs">
            <Form.List name="images">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item {...restField} name={[name]} style={{ marginBottom: 0, width: 400 }}>
                        <Input placeholder="图片URL" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Button type="dashed" onClick={() => add()} block>添加图片URL</Button>
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

export default ArtworkManagePage;
