import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Layout } from 'antd'
import Navbar from './Navbar'
import Footer from './Footer'

const { Content } = Layout

/**
 * 主布局组件
 * @param {Object} props
 * @param {React.ReactNode} props.children - 子内容
 * @param {string} [props.contentClassName] - 内容区自定义类名
 * @param {boolean} [props.contentFullWidth] - 是否全宽布局
 */
function MainLayout({ children, contentClassName, contentFullWidth }) {
  const { pathname } = useLocation()

  // 路由切换时自动滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // 根据 contentFullWidth 决定内容区样式
  const contentStyle = contentFullWidth
    ? { width: '100%', padding: 0 }
    : { maxWidth: 1200, margin: '0 auto', width: '100%', padding: '12px 16px' }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Content className={contentClassName} style={contentStyle}>
        {children}
      </Content>
      <Footer />
    </Layout>
  )
}

export default MainLayout
