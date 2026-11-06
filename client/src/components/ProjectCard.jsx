import React, { useState } from 'react';
import { Target, Award, CheckCircle, FileText, Presentation, ArrowUpRight } from 'lucide-react';
import DocumentModal from './DocumentModal';

const ProjectCard = ({ project }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDocUrl, setSelectedDocUrl] = useState('');
  const [selectedDocTitle, setSelectedDocTitle] = useState('');

  const openDoc = (url, title) => {
    setSelectedDocUrl(url);
    setSelectedDocTitle(title);
    setModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-xl border border-finance-border shadow-subtle hover:shadow-premium transition-all duration-300 flex flex-col justify-between overflow-hidden group">
        <div>
          {/* Header */}
          <div className="p-6 border-b border-finance-border/60 bg-finance-ivory/20">
            <div className="flex items-center justify-between gap-4 mb-2">
              <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded bg-finance-midnight text-finance-gold">
                Project {project.projectNumber}
              </span>
              <span className="text-xs font-semibold text-finance-slate">
                {project.category}
              </span>
            </div>
            <h3 className="font-heading font-bold text-lg text-finance-midnight group-hover:text-finance-gold transition-colors leading-snug">
              {project.title}
            </h3>
          </div>

          <div className="p-6 space-y-5">
            {/* Objective */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-finance-slate mb-1.5">
                <Target className="w-3.5 h-3.5 text-finance-gold" />
                <span>Project Objective</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed bg-finance-ivory/40 p-3 rounded-lg border border-finance-border/40">
                {project.objective}
              </p>
            </div>

            {/* Key Contributions */}
            {project.contribution && project.contribution.length > 0 && (
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-finance-slate mb-2">
                  Key Individual & Team Contributions
                </div>
                <ul className="space-y-2">
                  {project.contribution.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-finance-gold mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Outcome */}
            {project.outcome && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-finance-slate mb-1">
                  <Award className="w-3.5 h-3.5 text-finance-green" />
                  <span>Verified Learning Outcome</span>
                </div>
                <p className="text-xs text-slate-600 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100/60 leading-relaxed font-medium">
                  {project.outcome}
                </p>
              </div>
            )}

            {/* Skills */}
            {project.skills && project.skills.length > 0 && (
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-finance-slate mb-2">
                  Applied Competencies
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.skills.map((skill, idx) => (
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

        {/* Footer Actions */}
        <div className="p-4 bg-finance-ivory/30 border-t border-finance-border flex items-center justify-between gap-2">
          <div className="text-xs text-finance-slate">
            {project.documentUrl ? 'Verified Report Attached' : 'Course Deliverable'}
          </div>

          <div className="flex items-center gap-2">
            {project.documentUrl ? (
              <button
                onClick={() => openDoc(project.documentUrl, `${project.title} - Full Report`)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-finance-midnight text-white hover:bg-finance-deep flex items-center gap-1.5 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Report PDF</span>
              </button>
            ) : (
              <button
                onClick={() => openDoc('', `${project.title} Report`)}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-100 hover:bg-slate-200 text-finance-slateDark flex items-center gap-1 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Status</span>
              </button>
            )}

            {project.presentationUrl && (
              <button
                onClick={() => openDoc(project.presentationUrl, `${project.title} - Presentation`)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-finance-gold text-finance-midnight hover:bg-finance-goldLight flex items-center gap-1 transition-colors"
              >
                <Presentation className="w-3.5 h-3.5" />
                <span>Slides</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <DocumentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={selectedDocTitle}
        subtitle={`Academic Project ${project.projectNumber} • ${project.category}`}
        documentUrl={selectedDocUrl}
      />
    </>
  );
};

export default ProjectCard;

