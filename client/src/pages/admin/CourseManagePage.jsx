import { useEffect, useState } from 'react'
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message, Spin, Select } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { fetchCourseList, addCourse, editCourse, removeCourse } from '../../api/course'

const { TextArea } = Input

/**
 * 从Bilibili链接中提取BV号
 * @param {string} url - Bilibili视频链接
 * @returns {string} 提取到的BV号或空字符串
 */
function _extractBvid(url) {
  if (!url) return ''
  const match = url.match(/BV[0-9A-Za-z]+/)
  return match ? match[0] : ''
}

/**
 * 课程管理页面
 * 支持课程的新增、编辑、删除及章节管理
 */
function CourseManagePage() {
  /* ─────────────── hooks ─────────────── */
  const [courseList, setCourseList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null)
  const [form] = Form.useForm()

  /* ─────────────── effects ─────────────── */
  useEffect(() => {
    fetchCourseData()
  }, [])

  /* ─────────────── handlers ─────────────── */
  const fetchCourseData = () => {
    setIsLoading(true)
    fetchCourseList()
      .then((res) => setCourseList(res))
      .finally(() => setIsLoading(false))
  }

  const handleAdd = () => {
    setEditingRecord(null)
    form.resetFields()
    form.setFieldsValue({
      chapters: [{ title: '', videoUrl: '', duration: '', source: 'local', externalUrl: '' }]
    })
    setIsModalOpen(true)
  }

  const handleEdit = (record) => {
    setEditingRecord(record)
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
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id) => {
    try {
      await removeCourse(id)
      message.success('删除成功')
      fetchCourseData()
    } catch (error) {}
  }

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        chapters: values.chapters?.map((ch) => {
          if (ch.source === 'bilibili' && ch.externalUrl) {
            const bvid = _extractBvid(ch.externalUrl)
            return { ...ch, videoUrl: bvid || ch.videoUrl }
          }
          return ch
        })
      }
      if (editingRecord) {
        await editCourse(editingRecord._id, payload)
        message.success('更新成功')
      } else {
        await addCourse(payload)
        message.success('创建成功')
      }
      setIsModalOpen(false)
      fetchCourseData()
    } catch (error) {}
  }

  /* ─────────────── derived ─────────────── */
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
  ]

  /* ─────────────── JSX ─────────────── */
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2>课程管理</h2>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增课程
        </Button>
      </div>
      {isLoading ? (
        <Spin size="large" style={{ display: 'block', textAlign: 'center', padding: 40 }} />
      ) : (
        <Table rowKey="_id" dataSource={courseList} columns={columns} pagination={{ pageSize: 10 }} />
      )}
      <Modal
        title={editingRecord ? '编辑课程' : '新增课程'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={760}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="课程标题" name="title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="封面URL" name="coverImage">
            <Input placeholder="课程封面图片URL" />
          </Form.Item>
          <Form.Item label="课程简介" name="description">
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item label="章节列表">
            <Form.List name="chapters">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 12, gap: 8 }}>
                      <Form.Item
                        {...restField}
                        name={[name, 'title']}
                        rules={[{ required: true }]}
                        style={{ marginBottom: 0, flex: 2 }}
                      >
                        <Input placeholder="章节标题" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'source']}
                        style={{ marginBottom: 0, width: 110 }}
                      >
                        <Select placeholder="来源">
                          <Select.Option value="local">本地/直链</Select.Option>
                          <Select.Option value="bilibili">Bilibili</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, curValues) => {
                          const prevSource = prevValues?.chapters?.[name]?.source
                          const curSource = curValues?.chapters?.[name]?.source
                          return prevSource !== curSource
                        }}
                      >
                        {({ getFieldValue }) => {
                          const source = getFieldValue(['chapters', name, 'source'])
                          return source === 'bilibili' ? (
                            <Form.Item
                              {...restField}
                              name={[name, 'externalUrl']}
                              style={{ marginBottom: 0, flex: 3 }}
                            >
                              <Input placeholder="Bilibili 链接，自动提取 BV 号" />
                            </Form.Item>
                          ) : (
                            <Form.Item
                              {...restField}
                              name={[name, 'videoUrl']}
                              rules={[{ required: true }]}
                              style={{ marginBottom: 0, flex: 3 }}
                            >
                              <Input placeholder="视频 URL" />
                            </Form.Item>
                          )
                        }}
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'duration']}
                        style={{ marginBottom: 0, width: 90 }}
                      >
                        <Input placeholder="时长" />
                      </Form.Item>
                      <MinusCircleOutlined style={{ marginTop: 8 }} onClick={() => remove(name)} />
                    </div>
                  ))}
                  <Button
                    type="dashed"
                    onClick={() => add({ title: '', videoUrl: '', duration: '', source: 'local', externalUrl: '' })}
                    block
                  >
                    添加章节
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

export default CourseManagePage
