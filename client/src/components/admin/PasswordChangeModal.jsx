import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertCircle, CheckCircle2, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const PasswordChangeModal = ({ isOpen, onClose, isRequired = false }) => {
  const { changePassword } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await changePassword(currentPassword, newPassword);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError(res.message || 'Failed to update password');
      }
    } catch (err) {
      setError(err.message || 'Error updating password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-finance-midnight/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-elevated border border-finance-border p-6 sm:p-8 animate-fadeIn">
        {!isRequired && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-finance-midnight"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-finance-gold/15 text-finance-gold flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-lg text-finance-midnight">
              {isRequired ? 'First-Time Password Change Required' : 'Change Admin Password'}
            </h3>
            <p className="text-xs text-finance-slate">
              {isRequired
                ? 'For security, please set a personal password upon first login.'
                : 'Update your administrative security credentials.'}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Password updated successfully! Updating session...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-finance-slate mb-1">
              Current Password *
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="e.g. nifran2026"
              className="w-full px-3.5 py-2.5 bg-finance-ivory/50 border border-finance-border rounded-lg text-sm text-finance-midnight focus:outline-none focus:border-finance-gold focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-finance-slate mb-1">
              New Password (min 8 chars) *
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new strong password"
              className="w-full px-3.5 py-2.5 bg-finance-ivory/50 border border-finance-border rounded-lg text-sm text-finance-midnight focus:outline-none focus:border-finance-gold focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-finance-slate mb-1">
              Confirm New Password *
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-type new password"
              className="w-full px-3.5 py-2.5 bg-finance-ivory/50 border border-finance-border rounded-lg text-sm text-finance-midnight focus:outline-none focus:border-finance-gold focus:bg-white"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-finance-midnight hover:bg-finance-deep text-white font-heading font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-subtle disabled:opacity-50 mt-2"
          >
            {loading ? 'Updating Credentials...' : 'Save New Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
