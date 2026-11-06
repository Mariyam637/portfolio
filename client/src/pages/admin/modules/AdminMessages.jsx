import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, Phone, Trash2, CheckCircle2, Clock } from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

const AdminMessages = () => {
  const { token } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await api.adminGet('messages', token);
      if (res.success) {
        setMessages(res.messages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [token]);

  const markRead = async (id) => {
    try {
      await api.adminUpdate('messages', `${id}/read`, {}, token);
      fetchMessages();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      await api.adminDelete('messages', id, token);
      fetchMessages();
    } catch (e) {
      alert('Delete failed: ' + e.message);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-slate-500 font-semibold">Loading messages...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-extrabold text-finance-midnight">Contact Messages & Inquiries</h2>
          <p className="text-xs text-slate-500">Recruiter messages, internship inquiries, and professional communication.</p>
        </div>
        <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
          Total Received: {messages.length}
        </div>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400 text-xs">
            No contact inquiries received yet.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`bg-white rounded-xl border p-6 shadow-subtle space-y-3 transition-colors ${
                !msg.isRead ? 'border-finance-gold/60 bg-amber-50/20' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-heading font-bold text-base text-finance-midnight">{msg.name}</span>
                  {!msg.isRead && (
                    <span className="px-2 py-0.5 text-[9px] font-bold uppercase rounded-full bg-red-100 text-red-700">
                      Unread
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="tabular-nums">{new Date(msg.createdAt).toLocaleString()}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1 font-medium text-finance-midnight">
                  <Mail className="w-3.5 h-3.5 text-finance-gold" />
                  <a href={`mailto:${msg.email}`} className="hover:underline">{msg.email}</a>
                </span>
                {msg.phone && (
                  <span className="flex items-center gap-1 font-medium text-finance-midnight">
                    <Phone className="w-3.5 h-3.5 text-finance-gold" />
                    <a href={`tel:${msg.phone}`} className="hover:underline">{msg.phone}</a>
                  </span>
                )}
                <span className="font-semibold text-finance-midnight">
                  Subject: <span className="text-finance-gold font-bold">{msg.subject}</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-lg border border-slate-200">
                {msg.message}
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                {!msg.isRead && (
                  <button
                    onClick={() => markRead(msg._id)}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-finance-midnight bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Mark as Read
                  </button>
                )}
                <a
                  href={`mailto:${msg.email}?subject=RE: ${encodeURIComponent(msg.subject)}`}
                  className="px-3.5 py-1.5 text-xs font-semibold text-finance-midnight bg-finance-gold hover:bg-finance-goldLight rounded-lg transition-colors"
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => handleDelete(msg._id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessages;

