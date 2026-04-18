import { useEffect, useState, useCallback } from 'react'
import {
  Table,
  Input,
  Select,
  Tag,
  Space,
  Popconfirm,
  Button,
  message,
  Card
} from 'antd'
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { fetchUserList, editUserRole, removeUser } from '../../api/user'

const { Search } = Input
const { Option } = Select

/**
 * 用户管理页面
 * 支持用户列表查看、角色修改及删除操作
 */
function UserManagePage() {
  /* ─────────────── hooks ─────────────── */
  const currentUser = useSelector((state) => state.auth.user)
  const [userList, setUserList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState('')
  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  })

  /* ─────────────── effects ─────────────── */
  const fetchUserData = useCallback(
    async (page = pageInfo.current, pageSize = pageInfo.pageSize) => {
      setIsLoading(true)
      try {
        const res = await fetchUserList({
          page,
          limit: pageSize,
          keyword: searchKeyword
        })
        setUserList(res.list || [])
        setPageInfo({
          current: res.page || page,
          pageSize,
          total: res.total || 0
        })
      } catch {
        // request interceptor already shows error message
      } finally {
        setIsLoading(false)
      }
    },
    [searchKeyword, pageInfo.current, pageInfo.pageSize]
  )

  useEffect(() => {
    fetchUserData(1, pageInfo.pageSize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchKeyword])

  /* ─────────────── handlers ─────────────── */
  const handleRoleChange = async (id, role) => {
    try {
      await editUserRole(id, role)
      message.success('角色修改成功')
      fetchUserData(pageInfo.current, pageInfo.pageSize)
    } catch {
      // request interceptor already shows error message
    }
  }

  const handleDelete = async (id) => {
    try {
      await removeUser(id)
      message.success('删除成功')
      fetchUserData(pageInfo.current, pageInfo.pageSize)
    } catch {
      // request interceptor already shows error message
    }
  }

  const handleTableChange = (newPagination) => {
    fetchUserData(newPagination.current, newPagination.pageSize)
  }

  /* ─────────────── derived ─────────────── */
  const isSelf = (record) => currentUser?._id === record._id

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'blue' : 'green'}>
          {role === 'admin' ? '管理员' : '普通用户'}
        </Tag>
      )
    },
    {
      title: '注册时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (val) => (val ? new Date(val).toLocaleString() : '-')
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Select
            value={record.role}
            style={{ width: 120 }}
            disabled={isSelf(record)}
            onChange={(value) => handleRoleChange(record._id, value)}
          >
            <Option value="user">普通用户</Option>
            <Option value="admin">管理员</Option>
          </Select>
          <Popconfirm
            title="确定删除该用户吗？"
            description="此操作不可恢复"
            okText="删除"
            okType="danger"
            cancelText="取消"
            disabled={isSelf(record)}
            onConfirm={() => handleDelete(record._id)}
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              disabled={isSelf(record)}
              size="small"
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]

  /* ─────────────── JSX ─────────────── */
  return (
    <div>
      <h2>用户管理</h2>
      <Card style={{ marginTop: 24 }}>
        <Search
          placeholder="搜索用户名"
          allowClear
          enterButton={<><SearchOutlined /> 搜索</>}
          style={{ width: 320, marginBottom: 16 }}
          onSearch={(value) => setSearchKeyword(value)}
        />
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={userList}
          loading={isLoading}
          pagination={{
            ...pageInfo,
            showSizeChanger: true,
            showTotal: (total) => `共 ${total} 条`
          }}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  )
}

export default UserManagePage
