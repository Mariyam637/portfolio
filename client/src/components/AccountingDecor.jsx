import React from 'react';

export const AccountingLedgerLines = () => {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden" aria-hidden="true">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="ledgerGrid" width="60" height="30" patternUnits="userSpaceOnUse">
            <line x1="0" y1="29.5" x2="60" y2="29.5" stroke="#E4E7EB" strokeWidth="1" />
            <line x1="59.5" y1="0" x2="59.5" y2="30" stroke="#E4E7EB" strokeWidth="0.5" strokeDasharray="2,4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ledgerGrid)" />
      </svg>
    </div>
  );
};

export const SubtleFinancialChart = ({ className = "" }) => {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 120" className="w-full h-auto overflow-visible">
        {/* Subtle Horizontal Benchmark Guide Lines */}
        <line x1="0" y1="20" x2="400" y2="20" stroke="#E4E7EB" strokeDasharray="3,3" strokeWidth="1" />
        <line x1="0" y1="60" x2="400" y2="60" stroke="#E4E7EB" strokeDasharray="3,3" strokeWidth="1" />
        <line x1="0" y1="100" x2="400" y2="100" stroke="#E4E7EB" strokeWidth="1" />

        {/* Financial Growth Path with Gold Accent */}
        <path
          d="M 10 95 Q 60 85 100 70 T 200 55 T 300 35 T 390 15"
          fill="none"
          stroke="#B89A5A"
          strokeWidth="2.5"
          className="transition-all duration-1000 ease-out"
        />

        {/* Milestone Indicator Points */}
        <circle cx="10" cy="95" r="3.5" fill="#10243A" stroke="#B89A5A" strokeWidth="1.5" />
        <circle cx="100" cy="70" r="3.5" fill="#10243A" stroke="#B89A5A" strokeWidth="1.5" />
        <circle cx="200" cy="55" r="3.5" fill="#10243A" stroke="#B89A5A" strokeWidth="1.5" />
        <circle cx="300" cy="35" r="3.5" fill="#10243A" stroke="#B89A5A" strokeWidth="1.5" />
        <circle cx="390" cy="15" r="4.5" fill="#B89A5A" stroke="#FFFFFF" strokeWidth="2" />
      </svg>
      <div className="flex justify-between items-center text-[10px] text-finance-slate mt-1.5 uppercase font-medium tracking-wider">
        <span>G.C.E. O/L</span>
        <span>G.C.E. A/L (3 As)</span>
        <span>AAT Level 3</span>
        <span>CA Sri Lanka</span>
        <span className="text-finance-gold font-semibold">BBM Accountancy</span>
      </div>
    </div>
  );
};

export const VerifiedStatCounter = ({ number, label, suffix = "", subtext = "" }) => {
  return (
    <div className="p-4 bg-white rounded-xl border border-finance-border shadow-subtle hover:border-finance-gold/40 transition-all">
      <div className="flex items-baseline gap-1">
        <span className="font-heading font-extrabold text-2xl lg:text-3xl text-finance-midnight tabular-nums tracking-tight">
          {number}
        </span>
        {suffix && (
          <span className="font-heading font-bold text-lg text-finance-gold">
            {suffix}
          </span>
        )}
      </div>
      <p className="font-heading font-semibold text-xs text-finance-midnight mt-1">
        {label}
      </p>
      {subtext && (
        <p className="text-[11px] text-finance-slate mt-0.5">
          {subtext}
        </p>
      )}
    </div>
  );
};

