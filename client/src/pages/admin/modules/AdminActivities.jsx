import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Users, Calendar, Save, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { usePortfolio } from '../../../context/PortfolioContext';

const AdminActivities = () => {
  const { token } = useAuth();
  const { refreshData } = usePortfolio();
  const [activeTab, setActiveTab] = useState('activities'); // 'activities' | 'events'
  const [activities, setActivities] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [actRes, evtRes] = await Promise.all([
        api.adminGet('activities', token),
        api.adminGet('events', token)
      ]);
      if (actRes.success) setActivities(actRes.items);
      if (evtRes.success) setEvents(evtRes.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleCreateActivity = () => {
    setEditingItem({
      title: '',
      organization: 'University of Kelaniya',
      description: [''],
      skills: [''],
      date: '2024',
      isPublished: true,
      order: activities.length + 1
    });
    setIsNew(true);
  };

  const handleCreateEvent = () => {
    setEditingItem({
      title: '',
      organizer: 'Department of Accountancy',
      date: '2024',
      description: '',
      attendanceStatus: 'Attended',
      certificateUrl: '',
      isPublished: true,
      order: events.length + 1
    });
    setIsNew(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setStatusMsg({ type: '', text: '' });
      const endpoint = activeTab === 'activities' ? 'activities' : 'events';
      let res;
      if (isNew) {
        res = await api.adminCreate(endpoint, editingItem, token);
      } else {
        res = await api.adminUpdate(endpoint, editingItem._id, editingItem, token);
      }
      if (res.success) {
        setStatusMsg({ type: 'success', text: 'Record saved successfully!' });
        setEditingItem(null);
        fetchData();
        refreshData();
      } else {
        setStatusMsg({ type: 'error', text: res.message || 'Save failed' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Error occurred while saving' });
    }
  };

  const handleDelete = async (id, endpoint) => {
    if (!window.confirm('Delete this record?')) return;
    try {
      const res = await api.adminDelete(endpoint, id, token);
      if (res.success) {
        fetchData();
        refreshData();
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-slate-500 font-semibold">Loading activities & events...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-extrabold text-finance-midnight">Activities & Professional Events</h2>
          <p className="text-xs text-slate-500">Manage extracurricular activities, student clubs, and attended seminars.</p>
        </div>
        <div className="flex gap-2">
          {activeTab === 'activities' ? (
            <button
              onClick={handleCreateActivity}
              className="px-4 py-2 bg-finance-midnight hover:bg-finance-deep text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-subtle flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-finance-gold" />
              <span>Add Activity</span>
            </button>
          ) : (
            <button
              onClick={handleCreateEvent}
              className="px-4 py-2 bg-finance-midnight hover:bg-finance-deep text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-subtle flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-finance-gold" />
              <span>Add Seminar / Event</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4">
        <button
          onClick={() => { setActiveTab('activities'); setEditingItem(null); }}
          className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 ${
            activeTab === 'activities' ? 'border-finance-midnight text-finance-midnight' : 'border-transparent text-slate-400'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Extracurricular Activities ({activities.length})</span>
        </button>

        <button
          onClick={() => { setActiveTab('events'); setEditingItem(null); }}
          className={`pb-3 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 ${
            activeTab === 'events' ? 'border-finance-midnight text-finance-midnight' : 'border-transparent text-slate-400'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Seminars & Workshops ({events.length})</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingItem && (
        <div className="bg-white rounded-xl border-2 border-finance-gold/40 p-6 shadow-premium space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-heading font-bold text-base text-finance-midnight">
              {isNew ? 'Create New Entry' : `Edit: ${editingItem.title}`}
            </h3>
            <button onClick={() => setEditingItem(null)} className="p-1 text-slate-400 hover:text-finance-midnight">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">
                  {activeTab === 'activities' ? 'Organization / House' : 'Organizer'}
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.organization || editingItem.organizer || ''}
                  onChange={(e) => {
                    if (activeTab === 'activities') {
                      setEditingItem({ ...editingItem, organization: e.target.value });
                    } else {
                      setEditingItem({ ...editingItem, organizer: e.target.value });
                    }
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            {activeTab === 'events' && (
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Event Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            )}

            <div className="flex justify-end gap-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-finance-midnight text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-finance-deep flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5 text-finance-gold" />
                <span>Save Entry</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {activeTab === 'activities' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {activities.map((act) => (
            <div key={act._id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-finance-gold block mb-1">{act.organization}</span>
                <h4 className="font-heading font-bold text-base text-finance-midnight mb-2">{act.title}</h4>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-1">
                <button
                  onClick={() => { setEditingItem(JSON.parse(JSON.stringify(act))); setIsNew(false); }}
                  className="p-1.5 text-slate-600 hover:text-finance-midnight rounded hover:bg-slate-100"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(act._id, 'activities')}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((evt) => (
            <div key={evt._id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase text-finance-gold block mb-1">{evt.organizer}</span>
                <h4 className="font-heading font-bold text-base text-finance-midnight mb-2">{evt.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{evt.description}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-1 mt-3">
                <button
                  onClick={() => { setEditingItem(JSON.parse(JSON.stringify(evt))); setIsNew(false); }}
                  className="p-1.5 text-slate-600 hover:text-finance-midnight rounded hover:bg-slate-100"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(evt._id, 'events')}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default AdminActivities;

