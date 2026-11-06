import React, { useState } from 'react';
import { Calendar, CheckCircle2, Award, FileText } from 'lucide-react';
import DocumentModal from './DocumentModal';

const EventCard = ({ event }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl border border-finance-border shadow-subtle hover:shadow-premium transition-all duration-300 p-6 flex flex-col justify-between group">
        <div>
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-finance-green bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{event.attendanceStatus || 'Attended'}</span>
            </span>
            <span className="text-xs font-medium text-finance-slate flex items-center gap-1 tabular-nums">
              <Calendar className="w-3.5 h-3.5" />
              <span>{event.date}</span>
            </span>
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider text-finance-gold block mb-1">
            {event.organizer}
          </span>
          <h3 className="font-heading font-bold text-lg text-finance-midnight group-hover:text-finance-gold transition-colors mb-2 leading-snug">
            {event.title}
          </h3>

          <p className="text-xs text-slate-700 leading-relaxed mb-4">
            {event.description}
          </p>
        </div>

        {event.certificateUrl && (
          <div className="pt-3 border-t border-finance-border flex justify-end">
            <button
              onClick={() => setModalOpen(true)}
              className="text-xs font-semibold text-finance-midnight hover:text-finance-gold flex items-center gap-1 transition-colors"
            >
              <Award className="w-3.5 h-3.5 text-finance-gold" />
              <span>View Certificate</span>
            </button>
          </div>
        )}
      </div>

      <DocumentModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={`${event.title} Certificate`}
        subtitle={`${event.organizer} • ${event.date}`}
        documentUrl={event.certificateUrl}
      />
    </>
  );
};

export default EventCard;

