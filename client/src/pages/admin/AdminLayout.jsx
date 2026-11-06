import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  UserCheck,
  GraduationCap,
  Briefcase,
  Building2,
  Users,
  Calendar,
  Cpu,
  Award,
  BookOpen,
  MessageSquare,
  FileBox,
  Settings,
  LogOut,
  ExternalLink,
  ShieldAlert,
  KeyRound,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import PasswordChangeModal from '../../components/admin/PasswordChangeModal';

// Subcomponents for individual modules
import AdminOverview from './modules/AdminOverview';
import AdminProfile from './modules/AdminProfile';
import AdminAcademics from './modules/AdminAcademics';
import AdminProjects from './modules/AdminProjects';
import AdminCompanyVisits from './modules/AdminCompanyVisits';
import AdminActivities from './modules/AdminActivities';
import AdminSkills from './modules/AdminSkills';
import AdminCertificates from './modules/AdminCertificates';
import AdminReflection from './modules/AdminReflection';
import AdminMessages from './modules/AdminMessages';
import AdminDocuments from './modules/AdminDocuments';
import AdminSettings from './modules/AdminSettings';

const navItems = [
  { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
  { id: 'profile', label: 'Profile & Bio', icon: UserCheck },
  { id: 'academics', label: 'Academic & Results (A/L, O/L, AAT, CA)', icon: GraduationCap },
  { id: 'projects', label: 'Academic Projects', icon: Briefcase },
  { id: 'visits', label: 'Company Visits & Galleries', icon: Building2 },
  { id: 'activities', label: 'Activities & Events', icon: Users },
  { id: 'skills', label: 'Technical & Professional Skills', icon: Cpu },
  { id: 'certificates', label: 'Certificates & Awards', icon: Award },
  { id: 'reflection', label: 'Reflection & Evaluation', icon: BookOpen },
  { id: 'messages', label: 'Contact Inquiries', icon: MessageSquare },
  { id: 'documents', label: 'PDF & Document Library', icon: FileBox },
  { id: 'settings', label: 'Website Settings', icon: Settings },
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const renderActiveModule = () => {
    switch (activeTab) {
      case 'overview':
        return <AdminOverview setActiveTab={setActiveTab} />;
      case 'profile':
        return <AdminProfile />;
      case 'academics':
        return <AdminAcademics />;
      case 'projects':
        return <AdminProjects />;
      case 'visits':
        return <AdminCompanyVisits />;
      case 'activities':
        return <AdminActivities />;
      case 'skills':
        return <AdminSkills />;
      case 'certificates':
        return <AdminCertificates />;
      case 'reflection':
        return <AdminReflection />;
      case 'messages':
        return <AdminMessages />;
      case 'documents':
        return <AdminDocuments />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminOverview setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      
      {/* Security Banner if First Login Password Change is Pending */}
      {admin?.requirePasswordChange && (
        <div className="bg-amber-600 text-white px-4 py-2.5 text-xs font-semibold flex items-center justify-between shadow-subtle z-50">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <ShieldAlert className="w-4 h-4 shrink-0 text-amber-200" />
            <span>
              Security Action Required: You are logged in with the initial default password. Please update to a secure personal password.
            </span>
          </div>
          <button
            onClick={() => setPasswordModalOpen(true)}
            className="px-3 py-1 bg-white text-amber-900 rounded font-bold hover:bg-amber-100 transition-colors shrink-0 ml-4"
          >
            Change Now
          </button>
        </div>
      )}

      {/* Top Header */}
      <header className="bg-finance-midnight text-white border-b border-finance-gold/20 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 md:hidden"
            aria-label="Toggle sidebar"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="w-9 h-9 rounded-lg bg-finance-deep border border-finance-gold/40 flex items-center justify-center font-bold text-finance-gold">
            RN
          </div>
          <div>
            <h1 className="font-heading font-bold text-sm tracking-tight text-white flex items-center gap-2">
              <span>Riyas Nifran Portfolio CMS</span>
              <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] bg-finance-gold/20 text-finance-gold border border-finance-gold/30 rounded uppercase font-bold">
                Admin
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">Authenticated: {admin?.username}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-slate-200 transition-colors"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-finance-gold" />
          </Link>

          <button
            onClick={() => setPasswordModalOpen(true)}
            className="p-2 text-slate-300 hover:text-finance-gold hover:bg-white/5 rounded-lg transition-colors"
            title="Change Password"
          >
            <KeyRound className="w-4 h-4" />
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-950/60 hover:bg-red-900 border border-red-700/40 text-red-200 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Navigation */}
        <aside className={`fixed md:static inset-y-0 left-0 z-30 w-72 bg-white border-r border-slate-200 shadow-subtle flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          mobileSidebarOpen ? 'translate-x-0 top-[57px]' : '-translate-x-full'
        }`}>
          <div className="p-4 overflow-y-auto space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1 block">
              Content Modules
            </span>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all text-left ${
                    isActive
                      ? 'bg-finance-midnight text-white shadow-subtle'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-finance-midnight'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-finance-gold' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-4 border-t border-slate-200 bg-slate-50 text-[11px] text-slate-500">
            <p className="font-semibold text-slate-700">Riyas Nifran Admin v1.0</p>
            <p>Database: MongoDB Connected</p>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100">
          <div className="max-w-6xl mx-auto">
            {renderActiveModule()}
          </div>
        </main>

      </div>

      {/* Password Change Dialog */}
      <PasswordChangeModal
        isOpen={passwordModalOpen}
        onClose={() => setPasswordModalOpen(false)}
        isRequired={admin?.requirePasswordChange}
      />

    </div>
  );
};

export default AdminLayout;

