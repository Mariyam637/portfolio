import React, { useState, useEffect } from 'react';
import { Upload, FileBox, FileText, Trash2, ExternalLink, Copy, CheckCircle2, AlertCircle } from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

const AdminDocuments = () => {
  const { token } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [docName, setDocName] = useState('');
  const [category, setCategory] = useState('result');
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [copiedId, setCopiedId] = useState(null);

  const fetchDocs = async () => {
    try {
      setLoading(true);
      const res = await api.getDocuments(token);
      if (res.success) {
        setDocuments(res.documents);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, [token]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      setStatusMsg({ type: '', text: '' });
      const name = docName.trim() || file.name;
      const res = await api.uploadFile(file, category, name, token);
      if (res.success) {
        setStatusMsg({ type: 'success', text: `Document "${name}" uploaded and archived successfully!` });
        setDocName('');
        fetchDocs();
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'File upload failed' });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this document and its associated file permanently?')) return;
    try {
      const res = await api.deleteDocument(id, token);
      if (res.success) {
        fetchDocs();
      }
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const copyUrl = (id, url) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-slate-500 font-semibold">Loading document repository...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-extrabold text-finance-midnight">Document & PDF Repository</h2>
          <p className="text-xs text-slate-500">Centralized storage for verified result sheets, certificates, and reports.</p>
        </div>
        <div className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
          Total Archived: {documents.length}
        </div>
      </div>

      {statusMsg.text && (
        <div className={`p-4 rounded-lg text-xs font-semibold flex items-center gap-2 ${
          statusMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {statusMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* Uploader Box */}
      <div className="bg-white rounded-xl border-2 border-dashed border-finance-gold/50 p-6 shadow-subtle space-y-4">
        <h3 className="font-heading font-bold text-sm text-finance-midnight uppercase tracking-wider">
          Upload New Document / Certificate
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Document Name / Title</label>
            <input
              type="text"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              placeholder="e.g. AAT Level 3 Certificate"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold"
            >
              <option value="result">Academic Result Sheet</option>
              <option value="certificate">Professional Certificate</option>
              <option value="project">Project Report</option>
              <option value="cv">Curriculum Vitae (CV)</option>
              <option value="activity">Activity / Visit Evidence</option>
              <option value="other">Other Document</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Select File (PDF or Image)</label>
            <input
              type="file"
              accept="application/pdf,image/*"
              onChange={handleFileUpload}
              disabled={uploading}
              id="libraryUpload"
              className="hidden"
            />
            <label
              htmlFor="libraryUpload"
              className="w-full py-2 bg-finance-midnight text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-finance-deep cursor-pointer flex items-center justify-center gap-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-finance-gold" />
              <span>{uploading ? 'Processing File...' : 'Choose File & Upload'}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div key={doc._id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-subtle flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-slate-100 text-finance-midnight">
                  {doc.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {doc.fileSize ? `${Math.round(doc.fileSize / 1024)} KB` : ''}
                </span>
              </div>
              <h4 className="font-heading font-bold text-sm text-finance-midnight mb-1 truncate" title={doc.name}>
                {doc.name}
              </h4>
              <p className="text-[11px] text-slate-400 font-mono truncate">{doc.fileUrl}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs mt-3">
              <button
                onClick={() => copyUrl(doc._id, doc.fileUrl)}
                className="text-xs text-finance-gold font-bold hover:underline flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedId === doc._id ? 'Copied!' : 'Copy URL'}</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-slate-500 hover:text-finance-midnight"
                  title="Open in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={() => handleDelete(doc._id)}
                  className="p-1.5 text-slate-400 hover:text-red-600"
                  title="Delete file"
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

export default AdminDocuments;

