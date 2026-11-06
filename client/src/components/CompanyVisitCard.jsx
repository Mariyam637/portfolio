import React, { useState } from 'react';
import { Building2, Eye, Award, CheckCircle, FileText, Image as ImageIcon } from 'lucide-react';
import DocumentModal from './DocumentModal';

const CompanyVisitCard = ({ visit }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const gallery = visit.gallery || [];
  const currentImage = gallery[activeImageIndex] || { imageUrl: '', caption: '' };

  return (
    <>
      <div className="bg-white rounded-xl border border-finance-border shadow-subtle hover:shadow-premium transition-all duration-300 overflow-hidden flex flex-col justify-between group">
        <div>
          {/* Gallery / Image Header */}
          <div className="relative h-56 bg-finance-midnight overflow-hidden">
            {currentImage.imageUrl ? (
              <img
                src={currentImage.imageUrl}
                alt={currentImage.caption || visit.companyName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-finance-deep p-6">
                <Building2 className="w-12 h-12 text-finance-gold/60 mb-2" />
                <span className="text-xs uppercase tracking-wider font-semibold text-slate-300">{visit.companyName}</span>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-finance-midnight/90 via-finance-midnight/20 to-transparent" />

            {/* Badge on top */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-finance-midnight/80 backdrop-blur-md text-finance-gold border border-finance-gold/40 rounded">
                Industrial Immersion {visit.visitNumber}
              </span>
            </div>

            {/* Title on bottom overlay */}
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-finance-goldLight">
                {visit.area}
              </span>
              <h3 className="font-heading font-bold text-xl text-white tracking-tight">
                {visit.companyName}
              </h3>
            </div>
          </div>

          {/* Multiple Photo Thumbnails if gallery > 1 */}
          {gallery.length > 1 && (
            <div className="flex gap-2 p-3 bg-finance-ivory/50 border-b border-finance-border overflow-x-auto">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-14 h-10 rounded border overflow-hidden shrink-0 transition-all ${
                    activeImageIndex === i ? 'border-finance-gold ring-2 ring-finance-gold/30' : 'border-finance-border opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.imageUrl} alt={img.caption || `Visit photo ${i+1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* Purpose */}
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-finance-slate mb-1">
                Study Purpose
              </div>
              <p className="text-sm text-slate-700 leading-relaxed bg-finance-ivory/40 p-3 rounded-lg border border-finance-border/40">
                {visit.purpose}
              </p>
            </div>

            {/* Contributions / Observations */}
            {visit.contribution && visit.contribution.length > 0 && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-finance-slate mb-2">
                  Key Practical Observations
                </div>
                <ul className="space-y-2">
                  {visit.contribution.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-finance-gold mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Learning */}
            {visit.keyLearning && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-finance-slate mb-1">
                  <Award className="w-3.5 h-3.5 text-finance-gold" />
                  <span>Key Professional Learning</span>
                </div>
                <p className="text-xs text-slate-700 bg-amber-50/60 p-3 rounded-lg border border-amber-200/50 leading-relaxed font-medium">
                  {visit.keyLearning}
                </p>
              </div>
            )}

            {/* Skills */}
            {visit.skills && visit.skills.length > 0 && (
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-finance-slate mb-2">
                  Acquired Practical Skills
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {visit.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 text-[11px] font-medium rounded bg-slate-100 text-finance-midnight border border-slate-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card Footer */}
        <div className="p-4 bg-finance-ivory/30 border-t border-finance-border flex items-center justify-between">
          <div className="text-xs text-finance-slate">
            {gallery.length > 0 ? `${gallery.length} Verified Field Photo(s)` : 'Corporate Exposure'}
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-finance-midnight hover:bg-finance-deep text-white flex items-center gap-1.5 transition-colors shadow-subtle"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{visit.documentUrl ? 'View Report' : 'Visit Documentation'}</span>
          </button>
        </div>
      </div>

      <DocumentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${visit.companyName} – Field Report`}
        subtitle={`${visit.area} • University of Kelaniya Industrial Exposure`}
        documentUrl={visit.documentUrl}
      />
    </>
  );
};

export default CompanyVisitCard;

