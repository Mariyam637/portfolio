import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Upload, FileText, CheckCircle2, AlertCircle, Save, X, ExternalLink } from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { usePortfolio } from '../../../context/PortfolioContext';

const AdminProjects = () => {
  const { token } = useAuth();
  const { refreshData } = usePortfolio();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await api.adminGet('projects', token);
      if (res.success) {
        setItems(res.items);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [token]);

  const handleEdit = (item) => {
    setEditingItem(JSON.parse(JSON.stringify(item)));
    setIsNew(false);
  };

  const handleCreateNew = () => {
    setEditingItem({
      projectNumber: `0${items.length + 1}`,
      title: '',
      category: 'Financial Accounting',
      objective: '',
      contribution: [''],
      skills: [''],
      outcome: '',
      imageUrl: '',
      documentUrl: '',
      presentationUrl: '',
      isPublished: true,
      order: items.length + 1
    });
    setIsNew(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setStatusMsg({ type: '', text: '' });
      let res;
      if (isNew) {
        res = await api.adminCreate('projects', editingItem, token);
      } else {
        res = await api.adminUpdate('projects', editingItem._id, editingItem, token);
      }
      if (res.success) {
        setStatusMsg({ type: 'success', text: 'Project record saved successfully!' });
        setEditingItem(null);
        fetchProjects();
        refreshData();
      } else {
        setStatusMsg({ type: 'error', text: res.message || 'Save failed' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Error occurred while saving' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try {
      const res = await api.adminDelete('projects', id, token);
      if (res.success) {
        fetchProjects();
        refreshData();
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const handlePdfUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingPdf(true);
      const res = await api.uploadFile(file, 'project', `${editingItem.title} Report`, token);
      if (res.success) {
        setEditingItem(prev => ({ ...prev, documentUrl: res.fileUrl }));
        setStatusMsg({ type: 'success', text: 'Project report uploaded and linked!' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Report upload failed: ' + err.message });
    } finally {
      setUploadingPdf(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-slate-500 font-semibold">Loading projects...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-extrabold text-finance-midnight">Academic Projects</h2>
          <p className="text-xs text-slate-500">Manage curriculum projects, objectives, contributions, and attached reports.</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2 bg-finance-midnight hover:bg-finance-deep text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-subtle flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4 text-finance-gold" />
          <span>Add Academic Project</span>
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
        <div className="bg-white rounded-xl border-2 border-finance-gold/40 p-6 shadow-premium space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-heading font-bold text-base text-finance-midnight">
              {isNew ? 'Create New Project' : `Edit Project: ${editingItem.title}`}
            </h3>
            <button onClick={() => setEditingItem(null)} className="p-1 text-slate-400 hover:text-finance-midnight">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Project Number</label>
                <input
                  type="text"
                  required
                  value={editingItem.projectNumber}
                  onChange={(e) => setEditingItem({ ...editingItem, projectNumber: e.target.value })}
                  placeholder="01"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Category</label>
                <input
                  type="text"
                  required
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  placeholder="e.g. Financial Accounting / Taxation"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. Financial Accounting Principles"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Project Objective</label>
              <textarea
                rows={2}
                required
                value={editingItem.objective}
                onChange={(e) => setEditingItem({ ...editingItem, objective: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Verified Learning Outcome</label>
              <textarea
                rows={2}
                required
                value={editingItem.outcome}
                onChange={(e) => setEditingItem({ ...editingItem, outcome: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            {/* Contributions */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-600 uppercase">Key Contributions (One per item)</label>
                <button
                  type="button"
                  onClick={() => setEditingItem({ ...editingItem, contribution: [...editingItem.contribution, ''] })}
                  className="text-xs text-finance-gold font-bold hover:underline"
                >
                  + Add Contribution
                </button>
              </div>
              <div className="space-y-1.5">
                {editingItem.contribution?.map((c, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={c}
                      onChange={(e) => {
                        const copy = [...editingItem.contribution];
                        copy[idx] = e.target.value;
                        setEditingItem({ ...editingItem, contribution: copy });
                      }}
                      className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const copy = [...editingItem.contribution];
                        copy.splice(idx, 1);
                        setEditingItem({ ...editingItem, contribution: copy });
                      }}
                      className="p-1.5 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Document Upload */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-finance-midnight uppercase tracking-wider block">Report PDF Attachment</span>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handlePdfUpload}
                  disabled={uploadingPdf}
                  id="projectPdfUpload"
                  className="hidden"
                />
                <label
                  htmlFor="projectPdfUpload"
                  className="px-3 py-1.5 bg-finance-midnight text-white text-xs font-semibold rounded hover:bg-finance-deep cursor-pointer flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5 text-finance-gold" />
                  <span>{uploadingPdf ? 'Uploading...' : 'Upload Report PDF'}</span>
                </label>
                {editingItem.documentUrl && (
                  <span className="text-xs text-emerald-700 font-medium truncate">
                    Attached: {editingItem.documentUrl}
                  </span>
                )}
              </div>
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
                <span>Save Project</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((proj) => (
          <div key={proj._id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-finance-midnight text-finance-gold">
                  Project {proj.projectNumber}
                </span>
                <span className="text-xs font-semibold text-slate-500">{proj.category}</span>
              </div>
              <h4 className="font-heading font-bold text-base text-finance-midnight mb-2">{proj.title}</h4>
              <p className="text-xs text-slate-600 line-clamp-2 mb-3">{proj.objective}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className={proj.documentUrl ? 'text-emerald-700 font-medium' : 'text-slate-400'}>
                {proj.documentUrl ? 'Report Attached' : 'No PDF'}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(proj)}
                  className="p-1.5 text-slate-600 hover:text-finance-midnight rounded hover:bg-slate-100"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(proj._id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;

