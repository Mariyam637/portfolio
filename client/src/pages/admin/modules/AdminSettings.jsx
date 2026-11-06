import React, { useState, useEffect } from 'react';
import { Settings, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';

const AdminSettings = () => {
  const { token } = useAuth();
  const [siteTitle, setSiteTitle] = useState('Riyas Nifran | Executive Accounting & Finance Portfolio');
  const [allowMessages, setAllowMessages] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await api.adminGet('settings', token);
        if (res.success && res.settings) {
          const t = res.settings.find(s => s.key === 'siteTitle');
          const m = res.settings.find(s => s.key === 'allowPublicMessages');
          if (t) setSiteTitle(t.value);
          if (m) setAllowMessages(Boolean(m.value));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, [token]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setStatusMsg({ type: '', text: '' });
      await api.adminUpdate('settings', 'siteTitle', { value: siteTitle, description: 'Website Title' }, token);
      await api.adminUpdate('settings', 'allowPublicMessages', { value: allowMessages, description: 'Toggle Contact Form' }, token);
      setStatusMsg({ type: 'success', text: 'System settings saved successfully!' });
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Failed to update settings' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-slate-500 font-semibold">Loading system settings...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-extrabold text-finance-midnight">Website Configuration & Theme</h2>
          <p className="text-xs text-slate-500">Corporate finance identity tokens, site title, and public form accessibility.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 bg-finance-midnight hover:bg-finance-deep text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-subtle flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4 text-finance-gold" />
          <span>{saving ? 'Saving...' : 'Save Settings'}</span>
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
        
        {/* Core Brand Theme Information */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <h3 className="font-heading font-bold text-base text-finance-midnight pb-2 border-b border-slate-100">
            Design Tokens (Executive Finance Theme)
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-lg border border-slate-200 flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-[#10243A] border border-slate-300 shrink-0" />
              <div>
                <span className="font-bold text-finance-midnight block">Midnight Navy</span>
                <span className="text-[11px] text-slate-400 font-mono">#10243A</span>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-[#172F49] border border-slate-300 shrink-0" />
              <div>
                <span className="font-bold text-finance-midnight block">Deep Navy</span>
                <span className="text-[11px] text-slate-400 font-mono">#172F49</span>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-[#B89A5A] border border-slate-300 shrink-0" />
              <div>
                <span className="font-bold text-finance-midnight block">Champagne Gold</span>
                <span className="text-[11px] text-slate-400 font-mono">#B89A5A</span>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-slate-200 flex items-center gap-3">
              <div className="w-6 h-6 rounded bg-[#F7F6F2] border border-slate-300 shrink-0" />
              <div>
                <span className="font-bold text-finance-midnight block">Warm Ivory</span>
                <span className="text-[11px] text-slate-400 font-mono">#F7F6F2</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Title */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-4">
          <h3 className="font-heading font-bold text-base text-finance-midnight pb-2 border-b border-slate-100">
            General Site Preferences
          </h3>

          <div>
            <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Public Site Title Tag</label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs font-semibold text-finance-midnight"
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="allowMsgs"
              checked={allowMessages}
              onChange={(e) => setAllowMessages(e.target.checked)}
              className="w-4 h-4 text-finance-gold rounded focus:ring-0"
            />
            <label htmlFor="allowMsgs" className="text-xs font-semibold text-slate-700 cursor-pointer">
              Enable Public Inquiries (Contact Form Active)
            </label>
          </div>
        </div>

      </form>
    </div>
  );
};

export default AdminSettings;

