import { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, Select, Space, Popconfirm, message, Spin } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { fetchArtworkList, addArtwork, editArtwork, removeArtwork } from '../../api/artwork'
import { ARTWORK_CATEGORIES } from '../../utils/constants'

const { Option } = Select
const { TextArea } = Input

/**
 * 作品管理页面
 * 支持作品的新增、编辑、删除及列表展示
 */
function ArtworkManagePage() {
  /* ─────────────── hooks ─────────────── */
  const [pageData, setPageData] = useState({ list: [], total: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [form] = Form.useForm()

  /* ─────────────── effects ─────────────── */
  useEffect(() => {
    fetchArtworkData()
  }, [])

  /* ─────────────── handlers ─────────────── */
  const fetchArtworkData = () => {
    setIsLoading(true)
    fetchArtworkList({ page: 1, limit: 100 })
      .then((res) => setPageData(res))
      .finally(() => setIsLoading(false))
  }

  const handleAdd = () => {
    setEditingRecord(null)
    form.resetFields()
    form.setFieldsValue({ images: [''] })
    setIsModalOpen(true)
  }

  const handleEdit = (record) => {
    setEditingRecord(record)
    form.setFieldsValue({
      ...record,
      images: record.images?.length ? record.images : ['']
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    try {
      await removeArtwork(id)
      message.success('删除成功')
      fetchArtworkData()
    } catch (error) {}
  }

  const handleSubmit = async (values) => {
    const payload = {
      ...values,
      images: values.images?.filter((url) => url?.trim()) || []
    }
    try {
      if (editingRecord) {
        await editArtwork(editingRecord._id, payload)
        message.success('更新成功')
      } else {
        await addArtwork(payload)
        message.success('创建成功')
      }
      setIsModalOpen(false)
      fetchArtworkData()
    } catch (error) {}
  }

  /* ─────────────── derived ─────────────── */
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
  ]

  /* ─────────────── JSX ─────────────── */
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>作品管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增作品
        </Button>
      </div>
      {isLoading ? (
        <Spin size="large" style={{ display: 'block', textAlign: 'center', padding: 40 }} />
      ) : (
        <Table rowKey="_id" dataSource={pageData.list} columns={columns} pagination={{ pageSize: 10 }} />
      )}
      <Modal
        title={editingRecord ? '编辑作品' : '新增作品'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="作品名称" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="分类" name="category" rules={[{ required: true }]}>
            <Select placeholder="选择分类">
              {ARTWORK_CATEGORIES.map((c) => (
                <Option key={c} value={c}>{c}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="材质" name="material">
            <Input />
          </Form.Item>
          <Form.Item label="尺寸" name="size">
            <Input />
          </Form.Item>
          <Form.Item label="创作年份" name="year">
            <Input type="number" />
          </Form.Item>
          <Form.Item label="作品介绍" name="description">
            <TextArea rows={3} />
          </Form.Item>
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
                  <Button type="dashed" onClick={() => add()} block>
                    添加图片URL
                  </Button>
                </>
              )}
            </Form.List>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {editingRecord ? '保存修改' : '立即创建'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ArtworkManagePage
