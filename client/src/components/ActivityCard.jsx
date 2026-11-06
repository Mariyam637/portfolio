import React from 'react';
import { Calendar, Users, Trophy, HeartHandshake, Compass } from 'lucide-react';

const ActivityCard = ({ activity }) => {
  return (
    <div className="bg-white rounded-xl border border-finance-border shadow-subtle hover:shadow-premium transition-all duration-300 p-6 flex flex-col justify-between group">
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-finance-midnight/5 border border-finance-border flex items-center justify-center text-finance-gold shrink-0 group-hover:bg-finance-midnight group-hover:text-finance-gold transition-colors">
            <Users className="w-5 h-5" />
          </div>
          {activity.date && (
            <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-slate-100 text-finance-slate shrink-0 tabular-nums">
              {activity.date}
            </span>
          )}
        </div>

        <span className="text-[11px] font-bold uppercase tracking-wider text-finance-gold block mb-1">
          {activity.organization}
        </span>
        <h3 className="font-heading font-bold text-lg text-finance-midnight group-hover:text-finance-gold transition-colors mb-3 leading-snug">
          {activity.title}
        </h3>

        {activity.description && activity.description.length > 0 && (
          <ul className="space-y-2 mb-4">
            {activity.description.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-finance-gold mt-1.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {activity.skills && activity.skills.length > 0 && (
        <div className="pt-3 border-t border-finance-border/60">
          <div className="flex flex-wrap gap-1.5">
            {activity.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded bg-finance-ivory text-finance-midnight border border-finance-border"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityCard;

