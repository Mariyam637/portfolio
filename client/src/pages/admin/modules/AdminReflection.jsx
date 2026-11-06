import React, { useState, useEffect } from 'react';
import { BookOpen, Award, CheckCircle2, AlertCircle, Save, Plus, Trash2 } from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { usePortfolio } from '../../../context/PortfolioContext';

const AdminReflection = () => {
  const { token } = useAuth();
  const { refreshData } = usePortfolio();
  const [reflection, setReflection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchReflection = async () => {
      try {
        setLoading(true);
        const res = await api.adminGet('reflection', token);
        if (res.success && res.reflection) {
          setReflection(res.reflection);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchReflection();
  }, [token]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setStatusMsg({ type: '', text: '' });
      const res = await api.adminUpdate('reflection', '', reflection, token);
      if (res.success) {
        setStatusMsg({ type: 'success', text: 'Reflection details saved successfully!' });
        refreshData();
      } else {
        setStatusMsg({ type: 'error', text: res.message || 'Save failed' });
      }
    } catch (err) {
      setStatusMsg({ type: 'error', text: err.message || 'Error occurred while saving' });
    } finally {
      setSaving(false);
    }
  };

  const addStrength = () => {
    setReflection(prev => ({
      ...prev,
      strengths: [...(prev.strengths || []), '']
    }));
  };

  const removeStrength = (idx) => {
    setReflection(prev => {
      const copy = [...prev.strengths];
      copy.splice(idx, 1);
      return { ...prev, strengths: copy };
    });
  };

  const addArea = () => {
    setReflection(prev => ({
      ...prev,
      areasToImprove: [...(prev.areasToImprove || []), '']
    }));
  };

  const removeArea = (idx) => {
    setReflection(prev => {
      const copy = [...prev.areasToImprove];
      copy.splice(idx, 1);
      return { ...prev, areasToImprove: copy };
    });
  };

  if (loading) {
    return <div className="py-20 text-center text-xs text-slate-500 font-semibold">Loading reflection content...</div>;
  }

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-heading font-extrabold text-finance-midnight">Academic & Professional Reflection</h2>
          <p className="text-xs text-slate-500">Edit self-awareness evaluations, company visit learnings, strengths, and goals.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 bg-finance-midnight hover:bg-finance-deep text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow-subtle flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4 text-finance-gold" />
          <span>{saving ? 'Saving...' : 'Save Reflection'}</span>
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
        
        {/* What I Learned */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-3">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
            1. What I Learned (Academic & Skills Acquisition)
          </label>
          <textarea
            rows={4}
            value={reflection?.whatILearned || ''}
            onChange={(e) => setReflection({ ...reflection, whatILearned: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 leading-relaxed focus:bg-white"
          />
        </div>

        {/* Most Valuable Experience */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-3">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
            2. Most Valuable Experience (Industrial Visits Exposure)
          </label>
          <textarea
            rows={4}
            value={reflection?.mostValuableExperience || ''}
            onChange={(e) => setReflection({ ...reflection, mostValuableExperience: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 leading-relaxed focus:bg-white"
          />
        </div>

        {/* Strengths and Areas to Improve */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Strengths */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-finance-green uppercase tracking-wider">
                3A. Personal & Work Strengths
              </label>
              <button
                type="button"
                onClick={addStrength}
                className="text-xs text-finance-gold font-bold hover:underline"
              >
                + Add Strength
              </button>
            </div>
            <div className="space-y-2">
              {reflection?.strengths?.map((str, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={str}
                    onChange={(e) => {
                      const copy = [...reflection.strengths];
                      copy[idx] = e.target.value;
                      setReflection({ ...reflection, strengths: copy });
                    }}
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => removeStrength(idx)}
                    className="p-1.5 text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Areas to Improve */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-blue-700 uppercase tracking-wider">
                3B. Areas for Continued Improvement
              </label>
              <button
                type="button"
                onClick={addArea}
                className="text-xs text-finance-gold font-bold hover:underline"
              >
                + Add Target
              </button>
            </div>
            <div className="space-y-2">
              {reflection?.areasToImprove?.map((area, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    value={area}
                    onChange={(e) => {
                      const copy = [...reflection.areasToImprove];
                      copy[idx] = e.target.value;
                      setReflection({ ...reflection, areasToImprove: copy });
                    }}
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => removeArea(idx)}
                    className="p-1.5 text-slate-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Challenges and Solutions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-3">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
            4. Challenges & Solutions Encountered
          </label>
          <textarea
            rows={3}
            value={reflection?.challengesAndSolutions || ''}
            onChange={(e) => setReflection({ ...reflection, challengesAndSolutions: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 leading-relaxed focus:bg-white"
          />
        </div>

        {/* Future Career Goals */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-subtle space-y-3">
          <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider">
            5. Future Career Objectives & Strategic Targets
          </label>
          <textarea
            rows={3}
            value={reflection?.futureCareerGoals || ''}
            onChange={(e) => setReflection({ ...reflection, futureCareerGoals: e.target.value })}
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 leading-relaxed focus:bg-white"
          />
        </div>

      </form>
    </div>
  );
};

export default AdminReflection;

