import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Cpu, CheckCircle2, AlertCircle, Save, X } from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { usePortfolio } from '../../../context/PortfolioContext';

const AdminSkills = () => {
  const { token } = useAuth();
  const { refreshData } = usePortfolio();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const fetchSkills = async () => {
    try {
      setLoading(true);
      const res = await api.adminGet('skills', token);
      if (res.success) {
        setSkills(res.items);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, [token]);

  const handleCreateNew = () => {
    setEditingItem({
      name: '',
      category: 'technical',
      practicalArea: 'Software',
      description: '',
      order: skills.length + 1
    });
    setIsNew(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setStatusMsg({ type: '', text: '' });
      let res;
      if (isNew) {
        res = await api.adminCreate('skills', editingItem, token);
      } else {
        res = await api.adminUpdate('skills', editingItem._id, editingItem, token);
      }
      if (res.success) {
        setStatusMsg({ type: 'success', text: 'Skill saved successfully!' });
        setEditingItem(null);
        fetchSkills();
        refreshData();
      } else {
        setStatusMsg({ type: 'error', text: res.message || 'Save failed' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Error occurred while saving' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      const res = await api.adminDelete('skills', id, token);
      if (res.success) {
        fetchSkills();
        refreshData();
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-slate-500 font-semibold">Loading skills...</div>;
  }

  const technical = skills.filter(s => s.category === 'technical');
  const professional = skills.filter(s => s.category === 'professional');

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-extrabold text-finance-midnight">Technical & Professional Skills</h2>
          <p className="text-xs text-slate-500">Manage Tally ERP, MYOB, Excel, and corporate executive competencies.</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2 bg-finance-midnight hover:bg-finance-deep text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-subtle flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-finance-gold" />
          <span>Add Skill</span>
        </button>
      </div>

      {statusMsg.text && (
        <div className={`p-4 rounded-lg text-xs font-semibold flex items-center gap-2 ${
          statusMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Editor Modal */}
      {editingItem && (
        <div className="bg-white rounded-xl border-2 border-finance-gold/40 p-6 shadow-premium space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-heading font-bold text-base text-finance-midnight">
              {isNew ? 'Create New Skill' : `Edit: ${editingItem.name}`}
            </h3>
            <button onClick={() => setEditingItem(null)} className="p-1 text-slate-400 hover:text-finance-midnight">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  placeholder="e.g. Tally ERP"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Category</label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold"
                >
                  <option value="technical">Technical Software / Operations</option>
                  <option value="professional">Professional / Executive Trait</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Practical Area</label>
                <input
                  type="text"
                  value={editingItem.practicalArea || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, practicalArea: e.target.value })}
                  placeholder="e.g. Accounting Software"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Description / Application</label>
              <textarea
                rows={2}
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                placeholder="Hands-on experience with voucher entries, ledger reconciliation..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>

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
                <span>Save Skill</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Technical List */}
      <div>
        <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-finance-midnight mb-3">
          Technical Skills ({technical.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {technical.map((sk) => (
            <div key={sk._id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-finance-gold uppercase block">{sk.practicalArea}</span>
                <h4 className="font-heading font-bold text-sm text-finance-midnight">{sk.name}</h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{sk.description}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => { setEditingItem(JSON.parse(JSON.stringify(sk))); setIsNew(false); }}
                  className="p-1 text-slate-400 hover:text-finance-midnight"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(sk._id)}
                  className="p-1 text-slate-400 hover:text-red-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional List */}
      <div className="pt-4">
        <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-finance-midnight mb-3">
          Professional Skills ({professional.length})
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {professional.map((sk) => (
            <div key={sk._id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-subtle flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">{sk.practicalArea}</span>
                <h4 className="font-heading font-bold text-sm text-finance-midnight">{sk.name}</h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{sk.description}</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => { setEditingItem(JSON.parse(JSON.stringify(sk))); setIsNew(false); }}
                  className="p-1 text-slate-400 hover:text-finance-midnight"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(sk._id)}
                  className="p-1 text-slate-400 hover:text-red-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default AdminSkills;

