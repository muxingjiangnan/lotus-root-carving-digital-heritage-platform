import { createBrowserRouter, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

// 前台页面
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ExhibitionPage from './pages/ExhibitionPage'
import ArtworkListPage from './pages/ArtworkListPage'
import ArtworkDetailPage from './pages/ArtworkDetailPage'
import CourseListPage from './pages/CourseListPage'
import CourseDetailPage from './pages/CourseDetailPage'
import ProcessPage from './pages/ProcessPage'
import CulturalCreativePage from './pages/CulturalCreativePage'
import QuestionPage from './pages/QuestionPage'
import QuestionDetailPage from './pages/QuestionDetailPage'
import TermsPage from './pages/TermsPage'
import PrivacyPage from './pages/PrivacyPage'
import ProfilePage from './pages/ProfilePage'

// 后台管理页面
import AdminLayout from './pages/admin/AdminLayout'
import DashboardPage from './pages/admin/DashboardPage'
import ExhibitionEditPage from './pages/admin/ExhibitionEditPage'
import ArtworkManagePage from './pages/admin/ArtworkManagePage'
import CourseManagePage from './pages/admin/CourseManagePage'
import QuestionAuditPage from './pages/admin/QuestionAuditPage'
import UserManagePage from './pages/admin/UserManagePage'

/**
 * 登录路由守卫
 * 未登录用户跳转登录页，并记录原目标路径以便登录后回跳
 */
function PrivateRoute({ children }) {
  const token = useSelector((state) => state.auth.token)
  const location = useLocation()

  return token
    ? children
    : <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />
}

/**
 * 管理员路由守卫
 * 仅管理员可访问后台路由，非管理员跳转首页
 */
function AdminRoute({ children }) {
  const { token, isAdmin } = useSelector((state) => state.auth)

  return token && isAdmin ? children : <Navigate to="/" replace />
}

// 路由表配置
const router = createBrowserRouter([
  // 首页
  { path: '/', element: <HomePage /> },

  // 认证相关
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },

  // 协议页面
  { path: '/terms', element: <TermsPage /> },
  { path: '/privacy', element: <PrivacyPage /> },

  // 个人中心（需要登录）
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    )
  },

  // 内容展示
  { path: '/exhibition', element: <ExhibitionPage /> },
  { path: '/artworks', element: <ArtworkListPage /> },
  { path: '/artworks/:id', element: <ArtworkDetailPage /> },
  { path: '/courses', element: <CourseListPage /> },
  { path: '/courses/:id', element: <CourseDetailPage /> },
  { path: '/process', element: <ProcessPage /> },
  { path: '/creatives', element: <CulturalCreativePage /> },

  // 需要登录的问答模块
  {
    path: '/questions',
    element: (
      <PrivateRoute>
        <QuestionPage />
      </PrivateRoute>
    )
  },
  {
    path: '/questions/:id',
    element: (
      <PrivateRoute>
        <QuestionDetailPage />
      </PrivateRoute>
    )
  },

  // 后台管理模块
  {
    path: '/admin',
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      { path: '', element: <DashboardPage /> },
      { path: 'exhibition', element: <ExhibitionEditPage /> },
      { path: 'artworks', element: <ArtworkManagePage /> },
      { path: 'courses', element: <CourseManagePage /> },
      { path: 'questions', element: <QuestionAuditPage /> },
      { path: 'users', element: <UserManagePage /> }
    ]
  }
])

export default router
