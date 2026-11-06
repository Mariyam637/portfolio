import React from 'react';
import { Building2, Award, CheckCircle2, FileText, Camera } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { AccountingLedgerLines } from '../components/AccountingDecor';
import CompanyVisitCard from '../components/CompanyVisitCard';

const CompanyVisitsPage = () => {
  const { data, loading } = usePortfolio();

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-finance-ivory">
        <div className="w-10 h-10 border-2 border-finance-midnight border-t-finance-gold rounded-full animate-spin" />
      </div>
    );
  }

  const { companyVisits } = data;

  return (
    <div className="min-h-screen bg-finance-ivory">
      
      {/* Header */}
      <section className="bg-finance-midnight text-white py-16 relative overflow-hidden border-b border-finance-gold/20">
        <AccountingLedgerLines />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-finance-gold">
              Industrial Immersion & Field Studies
            </span>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Company Visits & Corporate Exposure
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Practical organizational field study at Kelani Cables PLC (HRM & grievance management) and branch immersion at LB Finance PLC (Corporate finance, credit operations, and risk management).
            </p>
          </div>
        </div>
      </section>

      {/* Visits Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {companyVisits?.map((visit) => (
              <CompanyVisitCard key={visit._id} visit={visit} />
            ))}
          </div>

          <div className="mt-12 bg-white rounded-xl border border-finance-border p-6 sm:p-8 shadow-subtle flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-finance-gold font-bold text-xs uppercase tracking-wider">
                <Camera className="w-4 h-4" />
                <span>Verified Field Photographic Evidence</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-finance-midnight">
                Bridge Between Academic Theory and Industrial Operations
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                These industrial immersions provided direct observation of real manufacturing plant HRM grievance procedures at Kelani Cables PLC and commercial leasing and financing calculations at LB Finance PLC.
              </p>
            </div>
            <div className="px-4 py-2.5 bg-finance-ivory rounded-lg border border-finance-border text-xs text-finance-slate shrink-0 font-medium">
              Kelaniya University Industrial Curriculum
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default CompanyVisitsPage;

