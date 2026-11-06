import React, { useState } from 'react';
import { Award, FileText, CheckCircle2, AlertCircle, ArrowUpRight } from 'lucide-react';
import DocumentModal from './DocumentModal';

const CertificateCard = ({ certificate }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const hasDoc = Boolean(certificate.documentUrl && certificate.documentUrl.trim().length > 0);

  return (
    <>
      <div className="bg-white rounded-xl border border-finance-border shadow-subtle hover:shadow-premium transition-all duration-300 p-6 flex flex-col justify-between group">
        <div>
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-finance-midnight text-finance-gold flex items-center justify-center font-heading font-bold text-sm shrink-0 shadow-subtle">
              <Award className="w-5 h-5" />
            </div>
            {certificate.issueDate && (
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-slate-100 text-finance-midnight tabular-nums border border-slate-200">
                {certificate.issueDate}
              </span>
            )}
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider text-finance-gold block mb-1">
            {certificate.issuingOrganization}
          </span>
          <h3 className="font-heading font-bold text-lg text-finance-midnight group-hover:text-finance-gold transition-colors mb-2 leading-snug">
            {certificate.title}
          </h3>

          {certificate.description && (
            <p className="text-xs text-slate-700 leading-relaxed mb-4">
              {certificate.description}
            </p>
          )}

          {certificate.credentialId && (
            <div className="text-[11px] text-finance-slate font-mono bg-finance-ivory/60 p-2 rounded border border-finance-border/50 mb-4 truncate">
              ID: {certificate.credentialId}
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-finance-border flex items-center justify-between">
          <div className="text-xs">
            {hasDoc ? (
              <span className="text-finance-green flex items-center gap-1 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified PDF</span>
              </span>
            ) : (
              <span className="text-finance-slate flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>Doc not uploaded</span>
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
            <span>{hasDoc ? 'View Document' : 'View Status'}</span>
            <ArrowUpRight className="w-3 h-3 opacity-70" />
          </button>
        </div>
      </div>

      <DocumentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={certificate.title}
        subtitle={`${certificate.issuingOrganization} • ${certificate.issueDate}`}
        documentUrl={certificate.documentUrl}
      />
    </>
  );
};

export default CertificateCard;

