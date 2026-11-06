import React from 'react';
import { CheckCircle2, Cpu, Sparkles, BookOpen, Calculator, Database, ShieldCheck } from 'lucide-react';

const SkillCard = ({ skill }) => {
  const isTechnical = skill.category === 'technical';

  return (
    <div className="bg-white rounded-xl border border-finance-border shadow-subtle hover:shadow-premium hover:border-finance-gold/40 transition-all duration-300 p-5 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
            isTechnical
              ? 'bg-finance-midnight/5 text-finance-midnight border border-finance-border'
              : 'bg-finance-gold/10 text-finance-gold border border-finance-gold/30'
          }`}>
            {skill.practicalArea || (isTechnical ? 'Technical Competency' : 'Executive Trait')}
          </span>
          <CheckCircle2 className="w-4 h-4 text-finance-green/80" />
        </div>

        <h4 className="font-heading font-bold text-base text-finance-midnight group-hover:text-finance-gold transition-colors mb-1.5">
          {skill.name}
        </h4>

        {skill.description && (
          <p className="text-xs text-slate-600 leading-relaxed">
            {skill.description}
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-finance-border/50 flex items-center justify-between text-[11px] text-finance-slate">
        <span className="font-medium">Applied in Practice</span>
        <span className="w-1.5 h-1.5 rounded-full bg-finance-gold" />
      </div>
    </div>
  );
};

export default SkillCard;

