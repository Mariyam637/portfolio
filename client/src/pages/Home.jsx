import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, GraduationCap, Award, Building2, BookOpen, CheckCircle2, ChevronRight, FileText, Mail, Phone, MapPin } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { initialPortfolioData } from '../data/initialPortfolioData';
import { AccountingLedgerLines, SubtleFinancialChart, VerifiedStatCounter } from '../components/AccountingDecor';
import AcademicCard from '../components/AcademicCard';
import ProjectCard from '../components/ProjectCard';
import CompanyVisitCard from '../components/CompanyVisitCard';
import SkillCard from '../components/SkillCard';

const Home = () => {
  const { data, loading, error } = usePortfolio();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-finance-ivory">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-3 border-finance-midnight border-t-finance-gold rounded-full animate-spin mx-auto" />
          <p className="text-sm font-heading font-semibold text-finance-midnight tracking-wider uppercase">
            Loading Executive Portfolio...
          </p>
        </div>
      </div>
    );
  }

  const portfolioData = data || initialPortfolioData;
  const { profile, academics, projects, companyVisits, skills } = portfolioData;

  return (
    <div className="relative overflow-hidden bg-finance-ivory">

      {/* ========================================================
          HERO SECTION: EXECUTIVE FINANCE THEME
         ======================================================== */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-finance-midnight via-finance-midnight to-finance-deep text-white border-b border-finance-gold/20 overflow-hidden">
        {/* Subtle Accounting Ledger Background lines */}
        <AccountingLedgerLines />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Typography & Credentials */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Target Candidate Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-finance-gold/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-finance-gold animate-pulse" />
                <span className="text-xs font-semibold uppercase tracking-wider text-finance-gold">
                  Undergraduate in Accountancy • Batch 2023
                </span>
              </div>

              {/* Name & Title */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-white">
                  Riyas Nifran
                </h1>
                
                {/* Thin Animated Gold Underline */}
                <div className="h-1 w-24 bg-gradient-to-r from-finance-gold to-transparent rounded-full" />
                
                <h2 className="text-xl sm:text-2xl text-slate-200 font-heading font-medium pt-2">
                  Bachelor of Business Management (Honours) in Accountancy
                </h2>
                <p className="text-sm sm:text-base text-finance-gold font-medium">
                  Faculty of Commerce and Management Studies • University of Kelaniya, Sri Lanka
                </p>
              </div>

              {/* Concise Executive Statement */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Detail-oriented accountancy undergraduate with verified completion of <strong className="text-white">AAT Level 3 (2024)</strong>, currently pursuing <strong className="text-white">CA Sri Lanka (Business Level)</strong>. Equipped with practical accounting software skills in <strong className="text-finance-gold">Tally ERP</strong> & <strong className="text-finance-gold">MYOB</strong>, storekeeping, and inventory administration.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/contact"
                  className="px-6 py-3 bg-finance-gold hover:bg-finance-goldLight text-finance-midnight font-heading font-bold text-sm uppercase tracking-wider rounded-lg shadow-subtle hover:shadow-premium transition-all flex items-center gap-2"
                >
                  <span>Connect With Candidate</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/academics"
                  className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white font-heading font-semibold text-sm rounded-lg border border-white/20 transition-all flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-finance-gold" />
                  <span>Academic Verification</span>
                </Link>

                {profile?.cvDocumentUrl && (
                  <a
                    href={profile.cvDocumentUrl}
                    download
                    className="px-5 py-3 bg-emerald-700/60 hover:bg-emerald-700 text-white font-heading font-semibold text-sm rounded-lg border border-emerald-500/40 transition-all flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download CV</span>
                  </a>
                )}
              </div>

              {/* Target Hiring Roles */}
              <div className="pt-4 border-t border-white/10">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block mb-2">
                  Seeking Opportunity In:
                </span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-200">Junior Accountant</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-200">Audit Trainee</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-200">Accounts Executive</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-200">Finance Assistant</span>
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-200">Corporate Finance Intern</span>
                </div>
              </div>
            </div>

            {/* Right Column: Real Portrait & Verified Badges */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-72 sm:w-80 lg:w-96">
                
                {/* Decorative border frame with Champagne Gold */}
                <div className="absolute -inset-3 rounded-2xl bg-gradient-to-b from-finance-gold/40 via-finance-gold/10 to-transparent blur-sm -z-10" />
                
                <div className="relative rounded-2xl overflow-hidden border-2 border-finance-gold/50 shadow-elevated bg-finance-deep">
                  <img
                    src={profile?.profilePhotoUrl || "/assets/profile/nifran-portrait.jpg"}
                    alt="Riyas Nifran – Undergraduate Accountancy Student, University of Kelaniya"
                    className="w-full h-auto object-cover object-top"
                    loading="eager"
                  />
                  {/* Subtle lower gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-finance-midnight via-finance-midnight/60 to-transparent flex items-end p-4">
                    <div className="w-full flex items-center justify-between text-xs text-slate-200">
                      <span className="font-semibold">Riyas Nifran</span>
                      <span className="text-finance-gold font-medium">BBM (Hons) Accountancy</span>
                    </div>
                  </div>
                </div>

                {/* Floating Credential Tag */}
                <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-finance-midnight border border-finance-gold text-white p-3.5 rounded-xl shadow-elevated flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-finance-gold text-finance-midnight flex items-center justify-center font-bold">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-finance-gold">AAT Qualified</span>
                    <span className="block text-xs font-semibold text-slate-200">Level 3 Completed 2024</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          VERIFIED FACTS & NUMERICAL ACCOMPLISHMENTS (TABULAR NUMS)
         ======================================================== */}
      <section className="py-10 bg-white border-b border-finance-border shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <VerifiedStatCounter
              number="1.7047"
              label="G.C.E. A/L Z-Score"
              subtext="Commerce Stream (3 As)"
            />
            <VerifiedStatCounter
              number="Level 3"
              label="AAT Sri Lanka"
              suffix=""
              subtext="Completed in 2024"
            />
            <VerifiedStatCounter
              number="Business"
              label="CA Sri Lanka"
              suffix="Level"
              subtext="Currently Pursuing"
            />
            <VerifiedStatCounter
              number="2"
              label="Industrial Immersions"
              suffix="Plcs"
              subtext="Kelani Cables & LB Finance"
            />
          </div>

          {/* Academic Progression Path Indicator */}
          <div className="mt-8 pt-6 border-t border-finance-border/60">
            <SubtleFinancialChart />
          </div>
        </div>
      </section>

      {/* ========================================================
          ABOUT ME INTRODUCTORY SECTION
         ======================================================== */}
      <section className="py-20 bg-finance-ivory/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-finance-border shadow-subtle space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-finance-border">
                  <div className="w-12 h-12 rounded-lg bg-finance-midnight text-finance-gold flex items-center justify-center font-bold text-lg">
                    RN
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-finance-midnight">Executive Profile</h3>
                    <p className="text-xs text-finance-slate">Department of Accountancy</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-finance-slate font-medium">Institution:</span>
                    <span className="font-semibold text-finance-midnight text-right">University of Kelaniya</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-finance-slate font-medium">Faculty:</span>
                    <span className="font-semibold text-finance-midnight text-right">Commerce & Management</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-finance-slate font-medium">Degree:</span>
                    <span className="font-semibold text-finance-midnight text-right">BBM (Hons) in Accountancy</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-finance-slate font-medium">Current Status:</span>
                    <span className="font-semibold text-finance-green text-right">Second Year (Batch 2023)</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-finance-slate font-medium">Location:</span>
                    <span className="font-semibold text-finance-midnight text-right">Kalmunai, Sri Lanka</span>
                  </div>
                </div>

                <Link
                  to="/about"
                  className="w-full text-center py-2.5 bg-finance-midnight hover:bg-finance-deep text-white text-xs font-semibold rounded-lg block transition-colors shadow-subtle"
                >
                  View Complete Profile & Objectives
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-finance-gold">
                <span>Executive Introduction</span>
              </div>
              <h2 className="text-3xl font-heading font-extrabold text-finance-midnight tracking-tight">
                Academic Rigour, Professional Standards & Financial Discipline
              </h2>
              
              <blockquote className="border-l-4 border-finance-gold pl-5 py-2 text-slate-700 leading-relaxed text-sm sm:text-base italic bg-white/60 rounded-r-lg">
                "{profile?.introBio || `I am Riyas Nifran, a motivated and detail-oriented undergraduate pursuing a Bachelor of Business Management (Honours) in Accountancy at the University of Kelaniya. I have a strong interest in accounting, finance, and business management. I have successfully completed AAT Level 3 and am currently pursuing the Business Level of Chartered Accountancy at CA Sri Lanka.`}"
              </blockquote>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-4 rounded-lg bg-white border border-finance-border shadow-subtle">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-finance-gold mb-1">
                    Accounting Software Exposure
                  </h4>
                  <p className="text-xs text-slate-600">
                    Hands-on posting, ledger management, and inventory reporting using <strong>Tally ERP</strong> and <strong>MYOB</strong>.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white border border-finance-border shadow-subtle">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-finance-gold mb-1">
                    Operational Competence
                  </h4>
                  <p className="text-xs text-slate-600">
                    Practical experience in double-entry bookkeeping, office documentation, inventory control, and storekeeping.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/academics"
                  className="inline-flex items-center gap-2 text-sm font-bold text-finance-midnight hover:text-finance-gold transition-colors"
                >
                  <span>Explore Academic Qualifications & Result Cards</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================
          SELECTED ACADEMIC QUALIFICATIONS HIGHLIGHT
         ======================================================== */}
      <section className="py-20 bg-white border-y border-finance-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-finance-gold">
                Academic Credentials
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-finance-midnight tracking-tight mt-1">
                Verified Academic & Professional Achievements
              </h2>
            </div>
            <Link
              to="/academics"
              className="text-xs sm:text-sm font-semibold text-finance-midnight hover:text-finance-gold flex items-center gap-1 transition-colors"
            >
              <span>View All 5 Result Sheets</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {academics?.slice(0, 3).map((item) => (
              <AcademicCard key={item._id} achievement={item} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          ACADEMIC PROJECTS
         ======================================================== */}
      <section className="py-20 bg-finance-ivory/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-finance-gold">
                Curriculum Case Studies
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-finance-midnight tracking-tight mt-1">
                Undergraduate Accounting & Management Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="text-xs sm:text-sm font-semibold text-finance-midnight hover:text-finance-gold flex items-center gap-1 transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects?.slice(0, 4).map((proj) => (
              <ProjectCard key={proj._id} project={proj} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          COMPANY VISITS HIGHLIGHT
         ======================================================== */}
      <section className="py-20 bg-white border-y border-finance-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-finance-gold">
                Industrial Immersion
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-finance-midnight tracking-tight mt-1">
                Corporate Visits: Kelani Cables PLC & LB Finance PLC
              </h2>
            </div>
            <Link
              to="/company-visits"
              className="text-xs sm:text-sm font-semibold text-finance-midnight hover:text-finance-gold flex items-center gap-1 transition-colors"
            >
              <span>View Visit Galleries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {companyVisits?.slice(0, 2).map((visit) => (
              <CompanyVisitCard key={visit._id} visit={visit} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SKILLS OVERVIEW (TECHNICAL & PROFESSIONAL)
         ======================================================== */}
      <section className="py-20 bg-finance-ivory/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-finance-gold">
              Applied Competencies
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-finance-midnight tracking-tight mt-1">
              Core Technical Software & Professional Capabilities
            </h2>
            <p className="text-xs sm:text-sm text-finance-slate mt-2">
              Verified skills grounded in practical accounting coursework, documentation, and operational team projects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {skills?.all?.slice(0, 8).map((sk) => (
              <SkillCard key={sk._id} skill={sk} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/certificates"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-finance-midnight hover:bg-finance-deep text-white text-xs font-semibold rounded-lg shadow-subtle transition-colors"
            >
              <span>Explore All Technical Skills & Verified Certificates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          CALL TO ACTION: ENGAGE WITH RIYAS NIFRAN
         ======================================================== */}
      <section className="py-20 bg-finance-midnight text-white relative overflow-hidden">
        <AccountingLedgerLines />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="px-3.5 py-1.5 rounded-full bg-finance-gold/20 text-finance-gold border border-finance-gold/40 text-xs font-semibold uppercase tracking-wider inline-block">
            Career Objective
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold tracking-tight text-white max-w-3xl mx-auto">
            Ready to Contribute to Your Finance, Accounting or Audit Team
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Actively seeking trainee and executive entry opportunities in financial accounting, auditing, taxation, and corporate finance where discipline, precision, and continuous learning create lasting value.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="px-8 py-3.5 bg-finance-gold hover:bg-finance-goldLight text-finance-midnight font-heading font-bold text-sm uppercase tracking-wider rounded-lg shadow-premium transition-all"
            >
              Initiate Contact
            </Link>
            <a
              href="mailto:rnifran2003@gmail.com"
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm rounded-lg border border-white/20 transition-all flex items-center gap-2"
            >
              <Mail className="w-4 h-4 text-finance-gold" />
              <span>rnifran2003@gmail.com</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;

