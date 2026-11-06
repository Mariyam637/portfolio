import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Upload, FileText, CheckCircle2, AlertCircle, ExternalLink, X, Save } from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { usePortfolio } from '../../../context/PortfolioContext';

const AdminAcademics = () => {
  const { token } = useAuth();
  const { refreshData } = usePortfolio();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const fetchAcademics = async () => {
    try {
      setLoading(true);
      const res = await api.adminGet('academics', token);
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
    fetchAcademics();
  }, [token]);

  const handleEdit = (item) => {
    setEditingItem(JSON.parse(JSON.stringify(item)));
    setIsNew(false);
  };

  const handleCreateNew = () => {
    setEditingItem({
      category: 'AL',
      title: '',
      institution: '',
      completionYear: '',
      zScore: '',
      status: 'Completed',
      subjects: [],
      documentName: '',
      documentUrl: '',
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
        res = await api.adminCreate('academics', editingItem, token);
      } else {
        res = await api.adminUpdate('academics', editingItem._id, editingItem, token);
      }
      if (res.success) {
        setStatusMsg({ type: 'success', text: 'Achievement record saved successfully!' });
        setEditingItem(null);
        fetchAcademics();
        refreshData();
      } else {
        setStatusMsg({ type: 'error', text: res.message || 'Save failed' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Error occurred while saving' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this achievement record?')) return;
    try {
      const res = await api.adminDelete('academics', id, token);
      if (res.success) {
        fetchAcademics();
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
      const docName = editingItem.documentName || editingItem.title || file.name;
      const res = await api.uploadFile(file, 'result', docName, token);
      if (res.success) {
        setEditingItem(prev => ({
          ...prev,
          documentUrl: res.fileUrl,
          documentName: docName
        }));
        setStatusMsg({ type: 'success', text: 'PDF document uploaded and linked successfully!' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'PDF upload failed: ' + err.message });
    } finally {
      setUploadingPdf(false);
    }
  };

  const removePdf = () => {
    setEditingItem(prev => ({ ...prev, documentUrl: '' }));
  };

  const addSubject = () => {
    setEditingItem(prev => ({
      ...prev,
      subjects: [...(prev.subjects || []), { name: '', grade: 'A' }]
    }));
  };

  const removeSubject = (index) => {
    setEditingItem(prev => {
      const copy = [...prev.subjects];
      copy.splice(index, 1);
      return { ...prev, subjects: copy };
    });
  };

  const updateSubject = (index, field, val) => {
    setEditingItem(prev => {
      const copy = [...prev.subjects];
      copy[index][field] = val;
      return { ...prev, subjects: copy };
    });
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-slate-500 font-semibold">Loading academic records...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-extrabold text-finance-midnight">Academic Results & Certificates</h2>
          <p className="text-xs text-slate-500">Manage O/L, A/L, AAT, CA Sri Lanka cards and uploaded PDF sheets.</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2 bg-finance-midnight hover:bg-finance-deep text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-subtle flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4 text-finance-gold" />
          <span>Add Result Card</span>
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

      {/* Editor Modal / Panel */}
      {editingItem && (
        <div className="bg-white rounded-xl border-2 border-finance-gold/40 p-6 shadow-premium space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-heading font-bold text-base text-finance-midnight">
              {isNew ? 'Create New Academic Record' : `Edit: ${editingItem.title}`}
            </h3>
            <button
              onClick={() => setEditingItem(null)}
              className="p-1 text-slate-400 hover:text-finance-midnight"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Category</label>
                <select
                  value={editingItem.category}
                  onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold"
                >
                  <option value="AL">G.C.E. A/L</option>
                  <option value="AAT">AAT Sri Lanka</option>
                  <option value="CA">CA Sri Lanka</option>
                  <option value="OL">G.C.E. O/L</option>
                  <option value="OTHER">Other Academic</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Qualification Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. G.C.E. Advanced Level – Commerce Stream"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Institution</label>
                <input
                  type="text"
                  required
                  value={editingItem.institution}
                  onChange={(e) => setEditingItem({ ...editingItem, institution: e.target.value })}
                  placeholder="e.g. Department of Examinations"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Completion Year</label>
                <input
                  type="text"
                  value={editingItem.completionYear || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, completionYear: e.target.value })}
                  placeholder="e.g. 2024"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Z-Score (If applicable)</label>
                <input
                  type="text"
                  value={editingItem.zScore || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, zScore: e.target.value })}
                  placeholder="e.g. 1.7047"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold"
                />
              </div>
            </div>

            {/* Subjects & Grades */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-600 uppercase">Subjects & Grades</label>
                <button
                  type="button"
                  onClick={addSubject}
                  className="text-xs text-finance-gold font-bold hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Subject
                </button>
              </div>

              <div className="space-y-2">
                {editingItem.subjects?.map((sub, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Subject Name"
                      value={sub.name}
                      onChange={(e) => updateSubject(idx, 'name', e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Grade"
                      value={sub.grade}
                      onChange={(e) => updateSubject(idx, 'grade', e.target.value)}
                      className="w-24 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs uppercase font-bold text-center"
                    />
                    <button
                      type="button"
                      onClick={() => removeSubject(idx)}
                      className="p-1.5 text-slate-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Document PDF Upload / Link */}
            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-3">
              <span className="text-xs font-bold text-finance-midnight uppercase tracking-wider block">
                Official PDF Document Attachment
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Document Label</label>
                  <input
                    type="text"
                    value={editingItem.documentName || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, documentName: e.target.value })}
                    placeholder="e.g. A/L Official Results Sheet"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase mb-1">Upload New PDF File</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handlePdfUpload}
                      disabled={uploadingPdf}
                      id="academicPdfUpload"
                      className="hidden"
                    />
                    <label
                      htmlFor="academicPdfUpload"
                      className="px-3 py-1.5 bg-finance-midnight text-white rounded text-xs font-semibold hover:bg-finance-deep cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5 text-finance-gold" />
                      <span>{uploadingPdf ? 'Uploading...' : 'Choose PDF File'}</span>
                    </label>
                  </div>
                </div>
              </div>

              {editingItem.documentUrl ? (
                <div className="flex items-center justify-between p-2.5 rounded bg-emerald-50 border border-emerald-200 text-xs">
                  <span className="text-emerald-800 font-medium truncate flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Attached: {editingItem.documentUrl}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <a
                      href={editingItem.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-700 hover:underline flex items-center gap-1"
                    >
                      <ExternalLink className="w-3 h-3" /> Preview
                    </a>
                    <button
                      type="button"
                      onClick={removePdf}
                      className="text-xs text-red-600 hover:underline ml-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400">
                  Status: <em>"Document not uploaded yet"</em> will be displayed safely to the public.
                </p>
              )}
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
                <span>Save Academic Card</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item._id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-finance-midnight text-finance-gold">
                  {item.category}
                </span>
                <span className="text-xs font-mono text-slate-500 tabular-nums">
                  {item.completionYear || item.status}
                </span>
              </div>
              <h4 className="font-heading font-bold text-base text-finance-midnight">{item.title}</h4>
              <p className="text-xs text-slate-500 mb-3">{item.institution}</p>

              {item.subjects && item.subjects.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {item.subjects.map((s, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-[10px] text-slate-700">
                      {s.name}: <strong className="text-finance-midnight">{s.grade}</strong>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className={item.documentUrl ? 'text-emerald-700 font-medium' : 'text-slate-400'}>
                {item.documentUrl ? 'PDF Attached' : 'No PDF'}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(item)}
                  className="p-1.5 text-slate-600 hover:text-finance-midnight rounded hover:bg-slate-100"
                  title="Edit Card"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50"
                  title="Delete Card"
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

export default AdminAcademics;

