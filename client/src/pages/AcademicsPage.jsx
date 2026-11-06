import React from 'react';
import { GraduationCap, Award, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { AccountingLedgerLines } from '../components/AccountingDecor';
import AcademicCard from '../components/AcademicCard';

const AcademicsPage = () => {
  const { data, loading } = usePortfolio();

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-finance-ivory">
        <div className="w-10 h-10 border-2 border-finance-midnight border-t-finance-gold rounded-full animate-spin" />
      </div>
    );
  }

  const { academics } = data;

  return (
    <div className="min-h-screen bg-finance-ivory">
      
      {/* Page Header */}
      <section className="bg-finance-midnight text-white py-16 relative overflow-hidden border-b border-finance-gold/20">
        <AccountingLedgerLines />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-finance-gold">
              Department of Accountancy • Verified Credentials
            </span>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Academic Achievements & Result Documents
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Verified examination results, subject grades, and professional accreditation cards for G.C.E. Advanced Level, Ordinary Level, AAT Sri Lanka, and CA Sri Lanka.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Notice */}
      <section className="py-6 bg-white border-b border-finance-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 text-finance-midnight">
              <ShieldCheck className="w-4 h-4 text-finance-green" />
              <span className="font-semibold">Academic Integrity Assurance:</span>
              <span className="text-finance-slate">All figures reflect verified statutory examination records. Available PDF documents can be previewed or opened directly.</span>
            </div>
            <span className="text-[11px] font-medium text-slate-500 bg-finance-ivory px-2.5 py-1 rounded border border-finance-border">
              Tabular Grading Verification
            </span>
          </div>
        </div>
      </section>

      {/* Result Cards Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {academics?.map((item) => (
              <AcademicCard key={item._id} achievement={item} />
            ))}
          </div>

          {/* Academic Highlight Callout */}
          <div className="mt-12 bg-white rounded-xl border border-finance-border p-6 sm:p-8 shadow-subtle">
            <h3 className="font-heading font-bold text-lg text-finance-midnight mb-2">
              Academic Focus & Foundation
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Riyas Nifran completed his G.C.E. Advanced Level in the Commerce Stream with <strong>3 As in Business Studies, Accounting, and Economics</strong>, achieving a Z-Score of <strong>1.7047</strong>. He further completed all four subjects of <strong>AAT Level 3 in 2024</strong> (Financial Reporting: A, Management Accounting and Finance: A, Corporate and Personal Taxation: B, Financial Control and Audit: B) and is currently actively pursuing the <strong>Business Level of Chartered Accountancy at CA Sri Lanka</strong> alongside his undergraduate studies at the University of Kelaniya.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AcademicsPage;

