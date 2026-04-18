import { createBrowserRouter, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

// 页面组件（后续逐步填充）
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ExhibitionPage from './pages/ExhibitionPage';
import ArtworkListPage from './pages/ArtworkListPage';
import ArtworkDetailPage from './pages/ArtworkDetailPage';
import CourseListPage from './pages/CourseListPage';
import CourseDetailPage from './pages/CourseDetailPage';
import ProcessPage from './pages/ProcessPage';
import CulturalCreativePage from './pages/CulturalCreativePage';
import QuestionPage from './pages/QuestionPage';
import QuestionDetailPage from './pages/QuestionDetailPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import AdminLayout from './pages/admin/AdminLayout';
import DashboardPage from './pages/admin/DashboardPage';
import ExhibitionEditPage from './pages/admin/ExhibitionEditPage';
import ArtworkManagePage from './pages/admin/ArtworkManagePage';
import CourseManagePage from './pages/admin/CourseManagePage';
import QuestionAuditPage from './pages/admin/QuestionAuditPage';
import UserManagePage from './pages/admin/UserManagePage';

// 路由守卫组件
const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  const location = useLocation();
  return token ? children : <Navigate to="/login" replace state={{ from: location.pathname + location.search }} />;
};

const AdminRoute = ({ children }) => {
  const { token, isAdmin } = useSelector((state) => state.auth);
  return token && isAdmin ? children : <Navigate to="/" replace />;
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/terms',
    element: <TermsPage />
  },
  {
    path: '/privacy',
    element: <PrivacyPage />
  },
  {
    path: '/exhibition',
    element: <ExhibitionPage />
  },
  {
    path: '/artworks',
    element: <ArtworkListPage />
  },
  {
    path: '/artworks/:id',
    element: <ArtworkDetailPage />
  },
  {
    path: '/courses',
    element: <CourseListPage />
  },
  {
    path: '/courses/:id',
    element: <CourseDetailPage />
  },
  {
    path: '/process',
    element: <ProcessPage />
  },
  {
    path: '/creatives',
    element: <CulturalCreativePage />
  },
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
]);

export default router;
