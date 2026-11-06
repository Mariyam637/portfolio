import React from 'react';
import { BookOpen, Target, CheckCircle2 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { AccountingLedgerLines } from '../components/AccountingDecor';
import ProjectCard from '../components/ProjectCard';

const ProjectsPage = () => {
  const { data, loading } = usePortfolio();

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-finance-ivory">
        <div className="w-10 h-10 border-2 border-finance-midnight border-t-finance-gold rounded-full animate-spin" />
      </div>
    );
  }

  const { projects } = data;

  return (
    <div className="min-h-screen bg-finance-ivory">
      
      {/* Header */}
      <section className="bg-finance-midnight text-white py-16 relative overflow-hidden border-b border-finance-gold/20">
        <AccountingLedgerLines />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-finance-gold">
              Undergraduate Degree Coursework • University of Kelaniya
            </span>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Academic Projects & Financial Case Studies
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Curriculum projects covering Financial Accounting, Human Resource Management, Taxation, and Advanced Corporate Finance with detailed contributions, competencies, and verified learning outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Project Cards Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects?.map((proj) => (
              <ProjectCard key={proj._id} project={proj} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ProjectsPage;

