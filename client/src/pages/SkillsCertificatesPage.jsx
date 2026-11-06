import React, { useState } from 'react';
import { Cpu, Award, ShieldCheck, CheckCircle2, FileCheck } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { AccountingLedgerLines } from '../components/AccountingDecor';
import SkillCard from '../components/SkillCard';
import CertificateCard from '../components/CertificateCard';

const SkillsCertificatesPage = () => {
  const { data, loading } = usePortfolio();
  const [skillCategory, setSkillCategory] = useState('all'); // 'all' | 'technical' | 'professional'

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-finance-ivory">
        <div className="w-10 h-10 border-2 border-finance-midnight border-t-finance-gold rounded-full animate-spin" />
      </div>
    );
  }

  const { skills, certificates } = data;

  const filteredSkills = skills?.all?.filter((s) => {
    if (skillCategory === 'all') return true;
    return s.category === skillCategory;
  }) || [];

  return (
    <div className="min-h-screen bg-finance-ivory">
      
      {/* Header */}
      <section className="bg-finance-midnight text-white py-16 relative overflow-hidden border-b border-finance-gold/20">
        <AccountingLedgerLines />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-finance-gold">
              Core Competencies & Verified Credentials
            </span>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Skills, Software & Professional Certificates
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Technical software proficiencies in Tally ERP, MYOB, and MS Excel alongside essential executive strengths and verified educational certificates from AAT and CA Sri Lanka.
            </p>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-finance-gold">
                Applied Capabilities
              </span>
              <h2 className="text-2xl font-heading font-bold text-finance-midnight mt-1">
                Technical & Professional Skills Matrix
              </h2>
            </div>

            {/* Filter pills */}
            <div className="inline-flex p-1 bg-white rounded-lg border border-finance-border shadow-subtle text-xs">
              <button
                onClick={() => setSkillCategory('all')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  skillCategory === 'all'
                    ? 'bg-finance-midnight text-white shadow-subtle'
                    : 'text-finance-slate hover:text-finance-midnight'
                }`}
              >
                All Skills ({skills?.all?.length || 0})
              </button>
              <button
                onClick={() => setSkillCategory('technical')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  skillCategory === 'technical'
                    ? 'bg-finance-midnight text-white shadow-subtle'
                    : 'text-finance-slate hover:text-finance-midnight'
                }`}
              >
                Technical Software ({skills?.technical?.length || 0})
              </button>
              <button
                onClick={() => setSkillCategory('professional')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  skillCategory === 'professional'
                    ? 'bg-finance-midnight text-white shadow-subtle'
                    : 'text-finance-slate hover:text-finance-midnight'
                }`}
              >
                Executive Professional ({skills?.professional?.length || 0})
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredSkills.map((sk) => (
              <SkillCard key={sk._id} skill={sk} />
            ))}
          </div>

        </div>
      </section>

      {/* CERTIFICATES SECTION */}
      <section className="py-16 bg-white border-t border-finance-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-finance-gold">
              Credential Verification
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-finance-midnight mt-1">
              Professional Certificates & Educational Evidence
            </h2>
            <p className="text-xs sm:text-sm text-finance-slate mt-1">
              Official records issued by the Association of Accounting Technicians of Sri Lanka, CA Sri Lanka, and examinations boards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates?.map((cert) => (
              <CertificateCard key={cert._id} certificate={cert} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default SkillsCertificatesPage;

