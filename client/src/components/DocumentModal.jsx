import React from 'react';
import { X, ExternalLink, Download, FileText, AlertCircle } from 'lucide-react';

const DocumentModal = ({ isOpen, onClose, title, documentUrl, subtitle }) => {
  if (!isOpen) return null;

  const isAvailable = Boolean(documentUrl && documentUrl.trim().length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-finance-midnight/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-xl shadow-elevated border border-finance-border overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-finance-border bg-finance-midnight text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-finance-gold/20 flex items-center justify-center text-finance-gold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-white">{title || 'Document Viewer'}</h3>
              {subtitle && <p className="text-xs text-finance-slate">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isAvailable && (
              <>
                <a
                  href={documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-xs font-medium text-finance-gold hover:text-white border border-finance-gold/40 hover:border-finance-gold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open Tab</span>
                </a>
                <a
                  href={documentUrl}
                  download
                  className="px-3 py-1.5 text-xs font-medium bg-finance-gold hover:bg-finance-goldLight text-finance-midnight font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
              </>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-finance-slate hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-2"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-auto bg-finance-ivory/50 min-h-[400px] flex items-center justify-center p-4">
          {isAvailable ? (
            <div className="w-full h-[65vh] bg-white rounded-lg border border-finance-border shadow-inner overflow-hidden">
              <iframe
                src={`${documentUrl}#toolbar=1`}
                title={title || 'Document Preview'}
                className="w-full h-full border-0"
              />
            </div>
          ) : (
            <div className="text-center p-8 max-w-md bg-white rounded-xl border border-finance-border shadow-subtle">
              <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4 border border-amber-200">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-semibold text-lg text-finance-midnight mb-2">Document not uploaded yet</h4>
              <p className="text-sm text-finance-slate mb-6">
                The official document or verified certificate for <strong className="text-finance-midnight">"{title}"</strong> has not been uploaded to the repository. Please check back later or request verification.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-finance-midnight text-white text-sm font-medium rounded-lg hover:bg-finance-deep transition-colors"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentModal;

