import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Award, Compass, Target, CheckCircle2, MapPin, Mail, Phone, Linkedin, Download, FileText, ArrowRight } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { AccountingLedgerLines } from '../components/AccountingDecor';

const AboutPage = () => {
  const { data, loading } = usePortfolio();

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-finance-ivory">
        <div className="w-10 h-10 border-2 border-finance-midnight border-t-finance-gold rounded-full animate-spin" />
      </div>
    );
  }

  const { profile } = data;

  const strengthsList = [
    'Teamwork',
    'Communication',
    'Leadership',
    'Time Management',
    'Analytical Thinking',
    'Problem Solving',
    'Attention to Detail',
    'Willingness to Learn'
  ];

  const professionalInterests = [
    'Accounting and Finance',
    'Financial Reporting (SLFRS/LKAS)',
    'Corporate Finance & Capital Structure',
    'Taxation & Statutory Compliance',
    'Business Management',
    'Financial Management & Risk',
    'Professional Development',
    'Learning New Accounting Technologies'
  ];

  return (
    <div className="min-h-screen bg-finance-ivory">
      
      {/* Header Banner */}
      <section className="bg-finance-midnight text-white py-16 relative overflow-hidden border-b border-finance-gold/20">
        <AccountingLedgerLines />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-finance-gold">
              Curriculum Vitae & Personal Profile
            </span>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              About Riyas Nifran
            </h1>
            <p className="text-sm sm:text-base text-slate-300">
              Undergraduate in Accountancy, Department of Accountancy, Faculty of Commerce and Management Studies, University of Kelaniya.
            </p>
          </div>
        </div>
      </section>

      {/* Main Profile Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Card: Portrait & Contact Meta */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-finance-border shadow-subtle text-center space-y-4">
                <div className="w-48 h-48 mx-auto rounded-xl overflow-hidden border-2 border-finance-gold/40 shadow-premium bg-finance-deep">
                  <img
                    src={profile?.profilePhotoUrl || "/assets/profile/nifran-portrait.jpg"}
                    alt="Riyas Nifran"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                
                <div>
                  <h2 className="font-heading font-bold text-xl text-finance-midnight">{profile?.name}</h2>
                  <p className="text-xs font-semibold text-finance-gold uppercase tracking-wider mt-0.5">
                    Accountancy Undergraduate
                  </p>
                </div>

                <div className="text-left space-y-2 pt-4 border-t border-finance-border text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-finance-gold shrink-0" />
                    <span>University of Kelaniya (Batch 2023)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-finance-gold shrink-0" />
                    <span>Kalmunai, Ampara District, Sri Lanka</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-finance-gold shrink-0" />
                    <a href="mailto:rnifran2003@gmail.com" className="hover:text-finance-gold truncate">
                      rnifran2003@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-finance-gold shrink-0" />
                    <a href="tel:+94756889403" className="hover:text-finance-gold">
                      +94 75 688 9403
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-finance-gold shrink-0" />
                    <a
                      href="https://www.linkedin.com/in/riyanifran"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-finance-gold underline truncate"
                    >
                      linkedin.com/in/riyanifran
                    </a>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <Link
                    to="/contact"
                    className="w-full py-2.5 bg-finance-midnight hover:bg-finance-deep text-white text-xs font-semibold rounded-lg transition-colors"
                  >
                    Send Direct Message
                  </Link>

                  {profile?.cvDocumentUrl && (
                    <a
                      href={profile.cvDocumentUrl}
                      download
                      className="w-full py-2.5 bg-finance-gold hover:bg-finance-goldLight text-finance-midnight text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Official CV</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Verified Professional Qualifications Box */}
              <div className="bg-white p-6 rounded-xl border border-finance-border shadow-subtle space-y-4">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-finance-midnight border-b border-finance-border pb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-finance-gold" />
                  <span>Professional Standing</span>
                </h3>
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-finance-ivory/60 border border-finance-border">
                    <span className="font-bold text-finance-midnight block text-sm">AAT Sri Lanka</span>
                    <span className="text-finance-green font-semibold block mt-0.5">Level 3 Completed (2024)</span>
                    <p className="text-[11px] text-finance-slate mt-1">
                      Association of Accounting Technicians of Sri Lanka.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-finance-ivory/60 border border-finance-border">
                    <span className="font-bold text-finance-midnight block text-sm">CA Sri Lanka</span>
                    <span className="text-blue-700 font-semibold block mt-0.5">Business Level (Currently Pursuing)</span>
                    <p className="text-[11px] text-finance-slate mt-1">
                      Institute of Chartered Accountants of Sri Lanka.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bio, Objectives, Interests, Strengths */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Introduction Bio */}
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-finance-border shadow-subtle space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-finance-gold block">
                  Professional Statement
                </span>
                <h2 className="text-2xl font-heading font-bold text-finance-midnight">
                  Undergraduate Profile & Aspirations
                </h2>
                <div className="text-sm text-slate-700 leading-relaxed space-y-3">
                  <p>
                    {profile?.introBio || `I am Riyas Nifran, a motivated and detail-oriented undergraduate pursuing a Bachelor of Business Management (Honours) in Accountancy at the University of Kelaniya. I have a strong interest in accounting, finance, and business management.`}
                  </p>
                  <p>
                    I have successfully completed AAT Level 3 and am currently pursuing the Business Level of Chartered Accountancy at CA Sri Lanka. I possess practical knowledge of accounting record management using Tally ERP and MYOB, along with basic proficiency in Microsoft Word and Excel.
                  </p>
                  <p>
                    Additionally, I have experience in inventory management, storekeeping, and office documentation. My strengths include teamwork, communication, leadership, and time management. I am committed to continuous learning and professional development, with the goal of becoming a skilled accounting professional and contributing to organizational success.
                  </p>
                </div>
              </div>

              {/* Career Objectives */}
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-finance-border shadow-subtle space-y-4">
                <h3 className="font-heading font-bold text-lg text-finance-midnight flex items-center gap-2">
                  <Target className="w-5 h-5 text-finance-gold" />
                  <span>Key Career Objectives</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(profile?.careerObjectives || [
                    'Become a qualified accounting professional.',
                    'Complete the CA Sri Lanka qualification.',
                    'Develop expertise in accounting and financial management.',
                    'Gain practical professional experience.',
                    'Contribute to organizational success.'
                  ]).map((obj, i) => (
                    <div key={i} className="p-3.5 rounded-lg bg-finance-ivory/50 border border-finance-border flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-finance-midnight text-finance-gold text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-xs font-medium text-finance-midnight leading-relaxed">{obj}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Competencies */}
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-finance-border shadow-subtle space-y-4">
                <h3 className="font-heading font-bold text-lg text-finance-midnight flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-finance-green" />
                  <span>Key Personal & Professional Strengths</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {strengthsList.map((strength, i) => (
                    <div key={i} className="p-3 text-center rounded-lg bg-finance-ivory/60 border border-finance-border">
                      <span className="text-xs font-bold text-finance-midnight block">{strength}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Professional Interests */}
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-finance-border shadow-subtle space-y-4">
                <h3 className="font-heading font-bold text-lg text-finance-midnight flex items-center gap-2">
                  <Compass className="w-5 h-5 text-finance-gold" />
                  <span>Professional & Academic Interests</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {professionalInterests.map((interest, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-xs font-medium rounded-full bg-slate-100 text-finance-midnight border border-slate-200"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Banner */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-finance-midnight to-finance-deep text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-heading font-bold text-base text-white">Explore Verified Academic Records</h4>
                  <p className="text-xs text-slate-300">View official G.C.E. A/L, O/L, and AAT examination results.</p>
                </div>
                <Link
                  to="/academics"
                  className="px-5 py-2.5 bg-finance-gold hover:bg-finance-goldLight text-finance-midnight font-bold text-xs uppercase tracking-wider rounded-lg shrink-0 transition-colors"
                >
                  View Academics
                </Link>
              </div>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutPage;

