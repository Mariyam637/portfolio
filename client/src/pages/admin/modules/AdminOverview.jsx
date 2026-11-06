import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  FileBox,
  Briefcase,
  Building2,
  Users,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  Trash2,
  Eye
} from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

const AdminOverview = ({ setActiveTab }) => {
  const { token } = useAuth();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminOverview(token);
      if (res.success) {
        setOverview(res);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, [token]);

  const markRead = async (id) => {
    try {
      await api.adminUpdate('messages', `${id}/read`, {}, token);
      fetchOverview();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteMsg = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await api.adminDelete('messages', id, token);
      fetchOverview();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-2 border-finance-midnight border-t-finance-gold rounded-full animate-spin mx-auto mb-2" />
        <p className="text-xs text-slate-500 font-semibold">Loading dashboard statistics...</p>
      </div>
    );
  }

  const stats = overview?.stats || {};
  const recentMessages = overview?.recentMessages || [];

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Welcome Banner */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-finance-gold">Executive Command Center</span>
          <h2 className="text-xl font-heading font-extrabold text-finance-midnight">Welcome, Riyas Nifran</h2>
          <p className="text-xs text-slate-500 mt-0.5">Manage all public content, result cards, industrial reports, and incoming inquiries.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('academics')}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-finance-midnight text-white hover:bg-finance-deep transition-colors"
          >
            Manage Results & PDFs
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Inquiries</span>
            <MessageSquare className="w-4 h-4 text-finance-gold" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-finance-midnight font-heading tabular-nums">
              {stats.totalMessages || 0}
            </span>
            {stats.unreadMessages > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-100 text-red-700">
                {stats.unreadMessages} Unread
              </span>
            )}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Projects</span>
            <Briefcase className="w-4 h-4 text-finance-gold" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-finance-midnight font-heading tabular-nums">
              {stats.totalProjects || 0}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company Visits</span>
            <Building2 className="w-4 h-4 text-finance-gold" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-finance-midnight font-heading tabular-nums">
              {stats.totalVisits || 0}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Certificates</span>
            <Award className="w-4 h-4 text-finance-gold" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-finance-midnight font-heading tabular-nums">
              {stats.totalCertificates || 0}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Activities</span>
            <Users className="w-4 h-4 text-finance-gold" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-finance-midnight font-heading tabular-nums">
              {stats.totalActivities || 0}
            </span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Documents</span>
            <FileBox className="w-4 h-4 text-finance-gold" />
          </div>
          <div className="mt-2">
            <span className="text-2xl font-extrabold text-finance-midnight font-heading tabular-nums">
              {stats.totalDocuments || 0}
            </span>
          </div>
        </div>

      </div>

      {/* Recent Inquiries List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-subtle overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-base text-finance-midnight">Recent Contact Inquiries</h3>
            <p className="text-xs text-slate-500">Messages submitted through public contact form</p>
          </div>
          <button
            onClick={() => setActiveTab('messages')}
            className="text-xs font-semibold text-finance-midnight hover:text-finance-gold flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {recentMessages.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-400">
              No messages received yet.
            </div>
          ) : (
            recentMessages.map((msg) => (
              <div key={msg._id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-50">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-finance-midnight">{msg.name}</span>
                    <span className="text-xs text-slate-400">&bull;</span>
                    <span className="text-xs text-slate-600">{msg.email}</span>
                    {!msg.isRead && (
                      <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded-full bg-red-100 text-red-700">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-semibold text-finance-midnight">{msg.subject}</p>
                  <p className="text-xs text-slate-600 line-clamp-1">{msg.message}</p>
                  <span className="text-[10px] text-slate-400 block tabular-nums">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {!msg.isRead && (
                    <button
                      onClick={() => markRead(msg._id)}
                      className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-finance-midnight bg-slate-100 hover:bg-slate-200 rounded"
                    >
                      Mark Read
                    </button>
                  )}
                  <a
                    href={`mailto:${msg.email}?subject=RE: ${encodeURIComponent(msg.subject)}`}
                    className="px-2.5 py-1 text-xs font-semibold text-finance-midnight hover:text-finance-gold bg-finance-gold/10 hover:bg-finance-gold/20 rounded"
                  >
                    Reply
                  </a>
                  <button
                    onClick={() => deleteMsg(msg._id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default AdminOverview;

