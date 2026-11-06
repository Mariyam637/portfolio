import React, { useState } from 'react';
import { FileText, CheckCircle2, AlertCircle, ArrowUpRight, GraduationCap, Award, ExternalLink } from 'lucide-react';
import DocumentModal from './DocumentModal';

const AcademicCard = ({ achievement }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const hasDoc = Boolean(achievement.documentUrl && achievement.documentUrl.trim().length > 0);

  return (
    <>
      <div className="bg-white rounded-xl border border-finance-border shadow-subtle hover:shadow-premium transition-all duration-300 flex flex-col justify-between overflow-hidden group">
        <div>
          {/* Card Header with Category Tag */}
          <div className="p-6 border-b border-finance-border/60 bg-finance-ivory/30">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-finance-midnight text-finance-gold flex items-center justify-center font-heading font-bold text-sm shrink-0 shadow-subtle">
                  {achievement.category}
                </div>
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-finance-slate">
                    {achievement.institution}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-finance-midnight group-hover:text-finance-gold transition-colors">
                    {achievement.title}
                  </h3>
                </div>
              </div>

              {achievement.completionYear && (
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-finance-midnight/5 text-finance-midnight border border-finance-border shrink-0 tabular-nums">
                  {achievement.completionYear}
                </span>
              )}
            </div>

            {achievement.zScore && (
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-medium text-finance-slate">Z-Score:</span>
                <span className="text-sm font-bold text-finance-midnight tabular-nums bg-finance-gold/15 px-2.5 py-0.5 rounded border border-finance-gold/30">
                  {achievement.zScore}
                </span>
                <span className="text-[11px] text-finance-green font-medium flex items-center gap-1 ml-auto">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Commerce Stream
                </span>
              </div>
            )}
          </div>

          {/* Subjects and Grades Table */}
          {achievement.subjects && achievement.subjects.length > 0 && (
            <div className="p-6">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-finance-slate mb-3 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-finance-gold" />
                <span>Verified Subject Evaluations</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {achievement.subjects.map((sub, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-lg bg-finance-ivory/50 border border-finance-border/70 text-xs"
                  >
                    <span className="font-medium text-finance-midnight truncate mr-2">
                      {sub.name}
                    </span>
                    <span className={`font-bold tabular-nums px-2 py-0.5 rounded text-[11px] shrink-0 ${
                      sub.grade === 'A' 
                        ? 'bg-finance-green/10 text-finance-green border border-finance-green/20' 
                        : sub.grade === 'B'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : sub.grade === 'C'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-finance-midnight/10 text-finance-midnight'
                    }`}>
                      Grade {sub.grade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Document Action */}
        <div className="p-4 bg-finance-ivory/40 border-t border-finance-border flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs">
            {hasDoc ? (
              <span className="text-finance-green flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified PDF Available</span>
              </span>
            ) : (
              <span className="text-finance-slate flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>Document not uploaded yet</span>
              </span>
            )}
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors ${
              hasDoc
                ? 'bg-finance-midnight hover:bg-finance-deep text-white shadow-subtle'
                : 'bg-slate-100 hover:bg-slate-200 text-finance-slateDark'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{hasDoc ? 'View Document' : 'Check Document'}</span>
            <ArrowUpRight className="w-3 h-3 opacity-70" />
          </button>
        </div>
      </div>

      {/* Modal */}
      <DocumentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={achievement.documentName || achievement.title}
        subtitle={`${achievement.institution} • ${achievement.completionYear || achievement.status}`}
        documentUrl={achievement.documentUrl}
      />
    </>
  );
};

export default AcademicCard;

