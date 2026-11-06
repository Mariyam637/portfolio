import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AccountingLedgerLines } from '../../components/AccountingDecor';

const AdminLogin = () => {
  const [username, setUsername] = useState('RIYAS NIFRAN');
  const [password, setPassword] = useState('nifran2026');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Please provide your admin username and password.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await login(username, password);
      if (res.success) {
        navigate('/admin');
      } else {
        setError(res.message || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Unable to authenticate admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-finance-midnight flex items-center justify-center p-4 relative overflow-hidden">
      <AccountingLedgerLines />
      
      <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-elevated border border-finance-border p-8">
        
        {/* Brand header */}
        <div className="text-center space-y-2 mb-8">
          <div className="w-14 h-14 mx-auto rounded-xl bg-finance-midnight text-finance-gold border border-finance-gold/40 flex items-center justify-center font-bold text-xl shadow-premium">
            RN
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-finance-midnight tracking-tight">
            Administrative Portal
          </h1>
          <p className="text-xs text-finance-slate">
            Riyas Nifran Executive Accounting Portfolio CMS
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-finance-slate mb-1">
              Admin Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="RIYAS NIFRAN"
                className="w-full pl-10 pr-3.5 py-2.5 bg-finance-ivory/50 border border-finance-border rounded-lg text-sm text-finance-midnight focus:outline-none focus:border-finance-gold focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-finance-slate mb-1">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-finance-ivory/50 border border-finance-border rounded-lg text-sm text-finance-midnight focus:outline-none focus:border-finance-gold focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-finance-midnight hover:bg-finance-deep text-white font-heading font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-subtle hover:shadow-premium flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Access Management System</span>
                <ArrowRight className="w-4 h-4 text-finance-gold" />
              </>
            )}
          </button>
        </form>

        {/* Credentials reminder for evaluation */}
        <div className="mt-8 p-3 rounded-lg bg-finance-ivory/80 border border-finance-border text-center">
          <span className="text-[11px] font-semibold text-finance-slate block uppercase tracking-wider">
            Pre-Configured Initial Credentials
          </span>
          <span className="text-xs font-mono text-finance-midnight font-bold mt-0.5 block">
            Username: <span className="text-finance-gold">RIYAS NIFRAN</span> | Password: <span className="text-finance-gold">nifran2026</span>
          </span>
        </div>

        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-xs font-semibold text-finance-slate hover:text-finance-midnight transition-colors"
          >
            &larr; Return to Public Website
          </a>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;

