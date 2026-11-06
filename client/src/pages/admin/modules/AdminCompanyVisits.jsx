import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Upload, Building2, CheckCircle2, AlertCircle, Save, X, Image as ImageIcon } from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { usePortfolio } from '../../../context/PortfolioContext';

const AdminCompanyVisits = () => {
  const { token } = useAuth();
  const { refreshData } = usePortfolio();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const fetchVisits = async () => {
    try {
      setLoading(true);
      const res = await api.adminGet('company-visits', token);
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
    fetchVisits();
  }, [token]);

  const handleEdit = (item) => {
    setEditingItem(JSON.parse(JSON.stringify(item)));
    setIsNew(false);
  };

  const handleCreateNew = () => {
    setEditingItem({
      visitNumber: `0${items.length + 1}`,
      companyName: '',
      area: 'Corporate Finance',
      purpose: '',
      contribution: [''],
      skills: [''],
      keyLearning: '',
      gallery: [],
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
        res = await api.adminCreate('company-visits', editingItem, token);
      } else {
        res = await api.adminUpdate('company-visits', editingItem._id, editingItem, token);
      }
      if (res.success) {
        setStatusMsg({ type: 'success', text: 'Company visit saved successfully!' });
        setEditingItem(null);
        fetchVisits();
        refreshData();
      } else {
        setStatusMsg({ type: 'error', text: res.message || 'Save failed' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Error saving company visit' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this company visit?')) return;
    try {
      const res = await api.adminDelete('company-visits', id, token);
      if (res.success) {
        fetchVisits();
        refreshData();
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const handleGalleryUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingImage(true);
      const res = await api.uploadFile(file, 'activity', `${editingItem.companyName} Field Photo`, token);
      if (res.success) {
        setEditingItem(prev => ({
          ...prev,
          gallery: [...(prev.gallery || []), { imageUrl: res.fileUrl, caption: file.name }]
        }));
        setStatusMsg({ type: 'success', text: 'Photo uploaded to company visit gallery!' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Photo upload failed: ' + err.message });
    } finally {
      setUploadingImage(false);
    }
  };

  const removeGalleryPhoto = (idx) => {
    setEditingItem(prev => {
      const copy = [...prev.gallery];
      copy.splice(idx, 1);
      return { ...prev, gallery: copy };
    });
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-slate-500 font-semibold">Loading company visits...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-extrabold text-finance-midnight">Company Visits & Industrial Studies</h2>
          <p className="text-xs text-slate-500">Manage Kelani Cables PLC, LB Finance PLC, photo galleries, and learning outcomes.</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2 bg-finance-midnight hover:bg-finance-deep text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-subtle flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4 text-finance-gold" />
          <span>Add Company Visit</span>
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
              {isNew ? 'Create New Company Visit' : `Edit: ${editingItem.companyName}`}
            </h3>
            <button onClick={() => setEditingItem(null)} className="p-1 text-slate-400 hover:text-finance-midnight">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Visit Number</label>
                <input
                  type="text"
                  required
                  value={editingItem.visitNumber}
                  onChange={(e) => setEditingItem({ ...editingItem, visitNumber: e.target.value })}
                  placeholder="01"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Company Name</label>
                <input
                  type="text"
                  required
                  value={editingItem.companyName}
                  onChange={(e) => setEditingItem({ ...editingItem, companyName: e.target.value })}
                  placeholder="e.g. Kelani Cables PLC"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Visit Area / Specialization</label>
                <input
                  type="text"
                  required
                  value={editingItem.area}
                  onChange={(e) => setEditingItem({ ...editingItem, area: e.target.value })}
                  placeholder="e.g. Human Resource Management"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Study Purpose</label>
              <textarea
                rows={2}
                required
                value={editingItem.purpose}
                onChange={(e) => setEditingItem({ ...editingItem, purpose: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Key Learning Outcome</label>
              <textarea
                rows={2}
                required
                value={editingItem.keyLearning}
                onChange={(e) => setEditingItem({ ...editingItem, keyLearning: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            {/* Gallery Manager */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-finance-midnight uppercase tracking-wider">
                  Field Photo Gallery ({editingItem.gallery?.length || 0})
                </span>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleGalleryUpload}
                    disabled={uploadingImage}
                    id="visitPhotoUpload"
                    className="hidden"
                  />
                  <label
                    htmlFor="visitPhotoUpload"
                    className="px-3 py-1 bg-finance-midnight text-white text-xs font-semibold rounded hover:bg-finance-deep cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5 text-finance-gold" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Visit Photo'}</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {editingItem.gallery?.map((img, i) => (
                  <div key={i} className="relative rounded-lg overflow-hidden border border-slate-300 bg-white group">
                    <img src={img.imageUrl} alt={img.caption || 'Field photo'} className="w-full h-24 object-cover" />
                    <button
                      type="button"
                      onClick={() => removeGalleryPhoto(i)}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="text"
                      placeholder="Caption"
                      value={img.caption || ''}
                      onChange={(e) => {
                        const copy = [...editingItem.gallery];
                        copy[i].caption = e.target.value;
                        setEditingItem({ ...editingItem, gallery: copy });
                      }}
                      className="w-full text-[10px] px-1.5 py-1 border-t border-slate-200"
                    />
                  </div>
                ))}
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
                <span>Save Company Visit</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((visit) => (
          <div key={visit._id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-finance-midnight text-finance-gold">
                  Visit {visit.visitNumber}
                </span>
                <span className="text-xs font-semibold text-slate-500">{visit.area}</span>
              </div>
              <h4 className="font-heading font-bold text-base text-finance-midnight mb-2">{visit.companyName}</h4>
              <p className="text-xs text-slate-600 line-clamp-2 mb-3">{visit.purpose}</p>
              <div className="text-[11px] text-slate-500">
                Gallery: <strong>{visit.gallery?.length || 0} photo(s)</strong>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-1 mt-4">
              <button
                onClick={() => handleEdit(visit)}
                className="p-1.5 text-slate-600 hover:text-finance-midnight rounded hover:bg-slate-100"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(visit._id)}
                className="p-1.5 text-slate-400 hover:text-red-600 rounded hover:bg-red-50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCompanyVisits;

