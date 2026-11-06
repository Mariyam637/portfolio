import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Upload, Award, CheckCircle2, AlertCircle, Save, X, ExternalLink } from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { usePortfolio } from '../../../context/PortfolioContext';

const AdminCertificates = () => {
  const { token } = useAuth();
  const { refreshData } = usePortfolio();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await api.adminGet('certificates', token);
      if (res.success) {
        setCertificates(res.items);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, [token]);

  const handleCreateNew = () => {
    setEditingItem({
      title: '',
      issuingOrganization: 'Association of Accounting Technicians of Sri Lanka',
      issueDate: '2024',
      description: '',
      credentialId: '',
      documentUrl: '',
      isPublished: true,
      order: certificates.length + 1
    });
    setIsNew(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setStatusMsg({ type: '', text: '' });
      let res;
      if (isNew) {
        res = await api.adminCreate('certificates', editingItem, token);
      } else {
        res = await api.adminUpdate('certificates', editingItem._id, editingItem, token);
      }
      if (res.success) {
        setStatusMsg({ type: 'success', text: 'Certificate saved successfully!' });
        setEditingItem(null);
        fetchCertificates();
        refreshData();
      } else {
        setStatusMsg({ type: 'error', text: res.message || 'Save failed' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Error occurred while saving' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this certificate?')) return;
    try {
      const res = await api.adminDelete('certificates', id, token);
      if (res.success) {
        fetchCertificates();
        refreshData();
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const handleDocUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingDoc(true);
      const res = await api.uploadFile(file, 'certificate', editingItem.title || 'Certificate Evidence', token);
      if (res.success) {
        setEditingItem(prev => ({ ...prev, documentUrl: res.fileUrl }));
        setStatusMsg({ type: 'success', text: 'Certificate evidence uploaded!' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Upload failed: ' + err.message });
    } finally {
      setUploadingDoc(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-slate-500 font-semibold">Loading certificates...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-extrabold text-finance-midnight">Certificates & Awards</h2>
          <p className="text-xs text-slate-500">Manage AAT certificates, CA Sri Lanka documentation, and seminar credentials.</p>
        </div>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2 bg-finance-midnight hover:bg-finance-deep text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-subtle flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-finance-gold" />
          <span>Add Certificate</span>
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
              {isNew ? 'Add Certificate' : `Edit: ${editingItem.title}`}
            </h3>
            <button onClick={() => setEditingItem(null)} className="p-1 text-slate-400 hover:text-finance-midnight">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Certificate Title</label>
                <input
                  type="text"
                  required
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  placeholder="e.g. AAT Sri Lanka – Level 3 Certificate"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Issue Date / Year</label>
                <input
                  type="text"
                  value={editingItem.issueDate || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, issueDate: e.target.value })}
                  placeholder="e.g. 2024"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Issuing Organization</label>
                <input
                  type="text"
                  required
                  value={editingItem.issuingOrganization}
                  onChange={(e) => setEditingItem({ ...editingItem, issuingOrganization: e.target.value })}
                  placeholder="e.g. Association of Accounting Technicians of Sri Lanka"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Credential ID (Optional)</label>
                <input
                  type="text"
                  value={editingItem.credentialId || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, credentialId: e.target.value })}
                  placeholder="e.g. AAT-2024-REG"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Description</label>
              <textarea
                rows={2}
                value={editingItem.description}
                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                placeholder="Passed final stage subjects covering Financial Reporting, Management Accounting..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            {/* Document Upload */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-finance-midnight uppercase tracking-wider block">Verified Document PDF / Scan</span>
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={handleDocUpload}
                  disabled={uploadingDoc}
                  id="certPdfUpload"
                  className="hidden"
                />
                <label
                  htmlFor="certPdfUpload"
                  className="px-3 py-1.5 bg-finance-midnight text-white text-xs font-semibold rounded hover:bg-finance-deep cursor-pointer flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5 text-finance-gold" />
                  <span>{uploadingDoc ? 'Uploading...' : 'Upload Document'}</span>
                </label>
                {editingItem.documentUrl ? (
                  <span className="text-xs text-emerald-700 font-medium truncate flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Attached: {editingItem.documentUrl}
                  </span>
                ) : (
                  <span className="text-xs text-slate-400">"Doc not uploaded" shown when empty.</span>
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
                <span>Save Certificate</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Certificates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {certificates.map((cert) => (
          <div key={cert._id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-finance-gold uppercase">{cert.issuingOrganization}</span>
                <span className="text-xs text-slate-400 font-mono tabular-nums">{cert.issueDate}</span>
              </div>
              <h4 className="font-heading font-bold text-base text-finance-midnight mb-1">{cert.title}</h4>
              <p className="text-xs text-slate-600 line-clamp-2">{cert.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
              <span className={cert.documentUrl ? 'text-emerald-700 font-medium' : 'text-slate-400'}>
                {cert.documentUrl ? 'PDF Attached' : 'No Document'}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => { setEditingItem(JSON.parse(JSON.stringify(cert))); setIsNew(false); }}
                  className="p-1.5 text-slate-600 hover:text-finance-midnight rounded hover:bg-slate-100"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(cert._id)}
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

export default AdminCertificates;

