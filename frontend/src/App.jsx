import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import GroupDiscoveryPage from './pages/GroupDiscoveryPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import Navbar from './components/Navbar';
import AppLayout from './components/AppLayout';
import ToastContainer from './components/ToastContainer';
import { Skeleton } from './components';

// Lazy load heavier pages
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));
const MyGroupsPage = lazy(() => import('./pages/MyGroupsPage'));
const GroupDetailsPage = lazy(() => import('./pages/GroupDetailsPage'));

const ProtectedRoute = ({ children, isAuthenticated }) =>
  isAuthenticated ? children : <Navigate to="/login" replace />;

const SuspenseFallback = () => (
  <div className="p-8 space-y-4">
    <Skeleton height="h-10" />
    <Skeleton count={3} height="h-32" />
  </div>
);

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<SuspenseFallback />}>
        <Routes>
          {/* Public routes — with top Navbar */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HomePage />
              </>
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />
            }
          />
          <Route
            path="/discover"
            element={
              isAuthenticated ? (
                <AppLayout>
                  <GroupDiscoveryPage />
                </AppLayout>
              ) : (
                <>
                  <Navbar />
                  <GroupDiscoveryPage />
                </>
              )
            }
          />

          {/* Protected routes — with sidebar AppLayout */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout>
                  <StudentDashboardPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout>
                  <ProfilePage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout>
                  <NotificationsPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-groups"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout>
                  <MyGroupsPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/groups/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AppLayout>
                  <GroupDetailsPage />
                </AppLayout>
              </ProtectedRoute>
            }
          />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      <ToastContainer />
    </Router>
  );
}

export default App;
