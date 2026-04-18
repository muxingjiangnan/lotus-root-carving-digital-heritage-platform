import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Menu, Button, Space, message } from 'antd'
import { logout } from '../store/slices/authSlice'

const { Header } = Layout

/**
 * 顶部导航栏
 * 包含品牌标识、主导航菜单、用户状态（登录/注册/退出）及管理员后台入口
 */
function Navbar() {
  // 1. hooks & state
  const { user, isAdmin } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // 2. handlers
  function handleUserLogout() {
    dispatch(logout())
    navigate('/')
  }

  // 3. derived data
  const navMenuItems = [
    { key: 'home', label: <Link to="/">首页</Link> },
    { key: 'exhibition', label: <Link to="/exhibition">非遗展厅</Link> },
    { key: 'process', label: <Link to="/process">工艺流程</Link> },
    { key: 'artworks', label: <Link to="/artworks">数字作品库</Link> },
    { key: 'courses', label: <Link to="/courses">在线微课程</Link> },
    { key: 'creatives', label: <Link to="/creatives">文创产品</Link> },
    {
      key: 'questions',
      label: (
        <Link
          to="/questions"
          onClick={() => {
            if (!user) message.warning('请先登录')
          }}
        >
          互动问答
        </Link>
      )
    }
  ]

  const currentActiveKey =
    navMenuItems.find((item) => location.pathname.startsWith(`/${item.key}`) && item.key !== 'home')?.key ||
    (location.pathname === '/' ? 'home' : '')

  // 4. JSX return
  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        background: '#FDFBF6',
        borderBottom: '1px solid #E8E4DE',
        height: 'auto',
        padding: '8px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      {/* 品牌标识 */}
      <div
        style={{
          fontSize: 18,
          fontWeight: 700,
          marginRight: 24,
          color: '#8B4513',
          whiteSpace: 'nowrap',
          fontFamily: "'Noto Serif SC', 'Source Han Serif SC', serif",
          letterSpacing: 1
        }}
      >
        莲韵非遗 · 数字传承
      </div>

      {/* 主导航菜单 */}
      <Menu
        mode="horizontal"
        selectedKeys={[currentActiveKey]}
        items={navMenuItems}
        style={{
          flex: 1,
          minWidth: 0,
          fontSize: 15,
          background: 'transparent',
          border: 'none'
        }}
      />

      {/* 用户操作区 */}
      <div style={{ whiteSpace: 'nowrap', marginTop: 4 }}>
        {user ? (
          <Space size="small">
            <Button
              type="link"
              size="small"
              onClick={() => navigate('/profile')}
              style={{ color: '#3D3D3D', padding: 0 }}
            >
              {user.username}
            </Button>
            {isAdmin && (
              <Button
                type="link"
                size="small"
                onClick={() => navigate('/admin')}
                style={{ color: '#8B4513' }}
              >
                后台
              </Button>
            )}
            <Button size="small" onClick={handleUserLogout}>
              退出
            </Button>
          </Space>
        ) : (
          <Space size="small">
            <Button
              type="primary"
              size="small"
              onClick={() => navigate('/login', { state: { from: location.pathname } })}
            >
              登录
            </Button>
            <Button
              size="small"
              onClick={() => navigate('/register', { state: { from: location.pathname } })}
            >
              注册
            </Button>
          </Space>
        )}
      </div>
    </Header>
  )
}

export default Navbar
