import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import AcademicsPage from './pages/AcademicsPage';
import ProjectsPage from './pages/ProjectsPage';
import CompanyVisitsPage from './pages/CompanyVisitsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import SkillsCertificatesPage from './pages/SkillsCertificatesPage';
import ReflectionPage from './pages/ReflectionPage';
import ContactPage from './pages/ContactPage';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import { useAuth } from './context/AuthContext';

// Protected Route Component for Admin Dashboard
const ProtectedAdminRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-2 border-white border-t-finance-gold rounded-full animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-wider font-semibold">Verifying Admin Access...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

// Layout for Public Site
const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <Routes>
      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Portal */}
      <Route
        path="/admin/*"
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      />

      {/* Public Pages */}
      <Route
        path="/"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
      <Route
        path="/about"
        element={
          <PublicLayout>
            <AboutPage />
          </PublicLayout>
        }
      />
      <Route
        path="/academics"
        element={
          <PublicLayout>
            <AcademicsPage />
          </PublicLayout>
        }
      />
      <Route
        path="/projects"
        element={
          <PublicLayout>
            <ProjectsPage />
          </PublicLayout>
        }
      />
      <Route
        path="/company-visits"
        element={
          <PublicLayout>
            <CompanyVisitsPage />
          </PublicLayout>
        }
      />
      <Route
        path="/activities"
        element={
          <PublicLayout>
            <ActivitiesPage />
          </PublicLayout>
        }
      />
      <Route
        path="/certificates"
        element={
          <PublicLayout>
            <SkillsCertificatesPage />
          </PublicLayout>
        }
      />
      <Route
        path="/reflection"
        element={
          <PublicLayout>
            <ReflectionPage />
          </PublicLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <PublicLayout>
            <ContactPage />
          </PublicLayout>
        }
      />

      {/* Fallback Catch-All Route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

