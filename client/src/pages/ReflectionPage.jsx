import React from 'react';
import { BookOpen, Award, CheckCircle2, TrendingUp, HelpCircle, Target } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { AccountingLedgerLines } from '../components/AccountingDecor';

const ReflectionPage = () => {
  const { data, loading } = usePortfolio();

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-finance-ivory">
        <div className="w-10 h-10 border-2 border-finance-midnight border-t-finance-gold rounded-full animate-spin" />
      </div>
    );
  }

  const { reflection } = data;

  return (
    <div className="min-h-screen bg-finance-ivory">
      
      {/* Header */}
      <section className="bg-finance-midnight text-white py-16 relative overflow-hidden border-b border-finance-gold/20">
        <AccountingLedgerLines />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-finance-gold">
              Undergraduate Critical Evaluation
            </span>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Self-Reflection & Professional Growth
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              A comprehensive evaluation of academic development, corporate exposure at Kelani Cables and LB Finance, self-awareness, resolution of academic challenges, and future milestones.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* 1. What I Learned */}
          <div className="bg-white rounded-xl border border-finance-border p-6 sm:p-8 shadow-subtle space-y-3">
            <div className="flex items-center gap-2.5 text-finance-gold font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Academic & Practical Acquisition</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-finance-midnight">
              What I Learned
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-finance-ivory/50 p-4 rounded-lg border border-finance-border/50">
              {reflection?.whatILearned || `Through my studies at the University of Kelaniya, I developed knowledge in accounting, finance, taxation, Human Resource Management, and business management. Assignments, presentations, and group activities helped improve my communication, teamwork, leadership, and analytical skills.`}
            </p>
          </div>

          {/* 2. Most Valuable Experience */}
          <div className="bg-white rounded-xl border border-finance-border p-6 sm:p-8 shadow-subtle space-y-3">
            <div className="flex items-center gap-2.5 text-finance-gold font-bold text-xs uppercase tracking-wider">
              <Award className="w-4 h-4" />
              <span>Core Highlight</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-finance-midnight">
              Most Valuable Experience
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-amber-50/50 p-4 rounded-lg border border-amber-200/50">
              {reflection?.mostValuableExperience || `The company visits to Kelani Cables PLC and LB Finance PLC were particularly valuable. They provided practical exposure to HRM practices, employee grievance handling, corporate finance, and financial activities in real organizations.`}
            </p>
          </div>

          {/* 3. Strengths and Areas for Improvement */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strengths */}
            <div className="bg-white rounded-xl border border-finance-border p-6 shadow-subtle space-y-4">
              <div className="flex items-center gap-2 text-finance-green font-bold text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Identified Strengths</span>
              </div>
              <h3 className="text-lg font-heading font-bold text-finance-midnight">
                Personal & Work Strengths
              </h3>
              <ul className="space-y-2.5">
                {(reflection?.strengths || ['Teamwork', 'Communication', 'Time Management', 'Analytical Thinking', 'Willingness to Learn']).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-finance-ivory/60 border border-finance-border/60 text-xs font-semibold text-finance-midnight">
                    <span className="w-2 h-2 rounded-full bg-finance-green shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas to Improve */}
            <div className="bg-white rounded-xl border border-finance-border p-6 shadow-subtle space-y-4">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                <TrendingUp className="w-4 h-4" />
                <span>Development Targets</span>
              </div>
              <h3 className="text-lg font-heading font-bold text-finance-midnight">
                Areas for Continued Growth
              </h3>
              <ul className="space-y-2.5">
                {(reflection?.areasToImprove || ['Presentation Skills', 'Technical Knowledge', 'Practical Professional Experience']).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-finance-ivory/60 border border-finance-border/60 text-xs font-semibold text-finance-midnight">
                    <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* 4. Challenges and Solutions */}
          <div className="bg-white rounded-xl border border-finance-border p-6 sm:p-8 shadow-subtle space-y-3">
            <div className="flex items-center gap-2.5 text-finance-gold font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4" />
              <span>Problem Solving & Coordination</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-finance-midnight">
              Challenges and Applied Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-finance-ivory/50 p-4 rounded-lg border border-finance-border/50">
              {reflection?.challengesAndSolutions || `Group assignments and presentations involved challenges such as time management, collecting information, and coordinating with teammates. I addressed these challenges through collaboration, sharing responsibilities, and completing tasks within deadlines.`}
            </p>
          </div>

          {/* 5. Future Career Goals */}
          <div className="bg-finance-midnight text-white rounded-xl border border-finance-gold/30 p-6 sm:p-8 shadow-elevated space-y-3">
            <div className="flex items-center gap-2.5 text-finance-gold font-bold text-xs uppercase tracking-wider">
              <Target className="w-4 h-4" />
              <span>Long-Term Strategic Direction</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Future Career Goals
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              {reflection?.futureCareerGoals || `My goal is to become a qualified accounting professional. I plan to complete my CA qualification, strengthen my technical and professional skills, gain practical experience, and continuously develop my knowledge of accounting and finance.`}
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};

export default ReflectionPage;

