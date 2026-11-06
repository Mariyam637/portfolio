import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Upload, FileText, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { usePortfolio } from '../../../context/PortfolioContext';

const AdminProfile = () => {
  const { token } = useAuth();
  const { refreshData } = usePortfolio();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [uploadingCv, setUploadingCv] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.getAdminProfile(token);
        if (res.success) {
          setProfile(res.profile);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setProfile(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleArrayChange = (field, index, value) => {
    setProfile(prev => {
      const arr = [...(prev[field] || [])];
      arr[index] = value;
      return { ...prev, [field]: arr };
    });
  };

  const addArrayItem = (field) => {
    setProfile(prev => ({ ...prev, [field]: [...(prev[field] || []), ''] }));
  };

  const removeArrayItem = (field, index) => {
    setProfile(prev => {
      const arr = [...(prev[field] || [])];
      arr.splice(index, 1);
      return { ...prev, [field]: arr };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setStatusMsg({ type: '', text: '' });
      const res = await api.updateAdminProfile(profile, token);
      if (res.success) {
        setStatusMsg({ type: 'success', text: 'Profile updated successfully!' });
        refreshData();
      } else {
        setStatusMsg({ type: 'error', text: res.message || 'Failed to update profile' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Error saving profile' });
    } finally {
      setSaving(false);
    }
  };

  const handleCvUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingCv(true);
      const res = await api.uploadFile(file, 'cv', 'Riyas Nifran Official CV', token);
      if (res.success) {
        setProfile(prev => ({ ...prev, cvDocumentUrl: res.fileUrl }));
        setStatusMsg({ type: 'success', text: 'CV uploaded and attached!' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'CV upload failed: ' + err.message });
    } finally {
      setUploadingCv(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingPhoto(true);
      const res = await api.uploadFile(file, 'profile', 'Riyas Nifran Profile Photo', token);
      if (res.success) {
        setProfile(prev => ({ ...prev, profilePhotoUrl: res.fileUrl }));
        setStatusMsg({ type: 'success', text: 'Profile portrait updated!' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: 'Photo upload failed: ' + err.message });
    } finally {
      setUploadingPhoto(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-slate-500 font-semibold">Loading profile configuration...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-extrabold text-finance-midnight">Profile & Identity Management</h2>
          <p className="text-xs text-slate-500">Edit candidate credentials, personal statement, and documents.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 bg-finance-midnight hover:bg-finance-deep text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-subtle flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4 text-finance-gold" />
          <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
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

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Basic Info & Privacy-Protected Date of Birth */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <h3 className="font-heading font-bold text-base text-finance-midnight pb-2 border-b border-slate-100">
            Basic Identification
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Candidate Full Name</label>
              <input
                type="text"
                name="name"
                value={profile?.name || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-finance-midnight focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                Date of Birth <span className="text-red-500 text-[10px]">(Admin-Only Privacy)</span>
              </label>
              <input
                type="text"
                name="dateOfBirth"
                value={profile?.dateOfBirth || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-amber-50/50 border border-amber-300 rounded-lg text-xs font-semibold text-finance-midnight focus:bg-white"
              />
              <span className="text-[10px] text-slate-400 block mt-0.5">Strictly stripped from public API responses.</span>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Location / Residence</label>
              <input
                type="text"
                name="location"
                value={profile?.location || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-finance-midnight focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Professional Email</label>
              <input
                type="email"
                name="email"
                value={profile?.email || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-finance-midnight focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={profile?.phone || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-finance-midnight focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                value={profile?.linkedin || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-finance-midnight focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Degree & University Details */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <h3 className="font-heading font-bold text-base text-finance-midnight pb-2 border-b border-slate-100">
            University & Faculty Information
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Degree Title</label>
              <input
                type="text"
                name="degree"
                value={profile?.degree || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-finance-midnight focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">University</label>
              <input
                type="text"
                name="university"
                value={profile?.university || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-finance-midnight focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Faculty</label>
              <input
                type="text"
                name="faculty"
                value={profile?.faculty || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-finance-midnight focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={profile?.department || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-finance-midnight focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Batch Year</label>
              <input
                type="text"
                name="batch"
                value={profile?.batch || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-finance-midnight focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Current Academic Year</label>
              <input
                type="text"
                name="currentAcademicYear"
                value={profile?.currentAcademicYear || ''}
                onChange={handleChange}
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-finance-midnight focus:bg-white"
              />
            </div>
          </div>
        </div>

        {/* Bio & Statements */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <h3 className="font-heading font-bold text-base text-finance-midnight pb-2 border-b border-slate-100">
            Professional Biography
          </h3>
          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Executive Summary / Intro Bio</label>
            <textarea
              name="introBio"
              rows={5}
              value={profile?.introBio || ''}
              onChange={handleChange}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 leading-relaxed focus:bg-white"
            />
          </div>
        </div>

        {/* Media & CV Document Uploads */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <h3 className="font-heading font-bold text-base text-finance-midnight pb-2 border-b border-slate-100">
            Profile Portrait & Curriculum Vitae PDF
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Photo Upload */}
            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-3">
              <span className="text-xs font-bold text-finance-midnight uppercase tracking-wider block">Candidate Portrait</span>
              <div className="flex items-center gap-4">
                <img
                  src={profile?.profilePhotoUrl || "/assets/profile/nifran-portrait.jpg"}
                  alt="Portrait Preview"
                  className="w-16 h-16 rounded-lg object-cover border border-slate-300"
                />
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    disabled={uploadingPhoto}
                    id="photoUpload"
                    className="hidden"
                  />
                  <label
                    htmlFor="photoUpload"
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingPhoto ? 'Uploading...' : 'Replace Photo'}</span>
                  </label>
                  <p className="text-[10px] text-slate-400 mt-1">JPG, PNG, WebP supported</p>
                </div>
              </div>
            </div>

            {/* CV Upload */}
            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-3">
              <span className="text-xs font-bold text-finance-midnight uppercase tracking-wider block">Official CV Document (PDF)</span>
              <div>
                {profile?.cvDocumentUrl ? (
                  <div className="flex items-center gap-2 mb-2 text-xs text-finance-green font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="truncate">{profile.cvDocumentUrl}</span>
                  </div>
                ) : (
                  <p className="text-xs text-slate-400 mb-2">No CV PDF uploaded yet. Download button is hidden publicly.</p>
                )}
                
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleCvUpload}
                  disabled={uploadingCv}
                  id="cvUpload"
                  className="hidden"
                />
                <label
                  htmlFor="cvUpload"
                  className="px-3 py-1.5 bg-finance-midnight text-white rounded text-xs font-semibold hover:bg-finance-deep cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5 text-finance-gold" />
                  <span>{uploadingCv ? 'Uploading...' : 'Upload Official CV PDF'}</span>
                </label>
              </div>
            </div>

          </div>
        </div>

      </form>
    </div>
  );
};

export default AdminProfile;

