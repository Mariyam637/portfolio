import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, GraduationCap, Award, ShieldCheck, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-finance-midnight text-white border-t border-finance-gold/20 relative z-10">
      {/* Top Ledger Line */}
      <div className="h-1 bg-gradient-to-r from-finance-midnight via-finance-gold to-finance-midnight opacity-80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Identity & Degree */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-finance-deep border border-finance-gold/40 flex items-center justify-center text-finance-gold font-heading font-bold text-lg">
                RN
              </div>
              <div>
                <h4 className="font-heading font-bold text-lg tracking-tight text-white">RIYAS NIFRAN</h4>
                <p className="text-xs text-finance-gold uppercase tracking-wider font-semibold">Executive Finance Portfolio</p>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Undergraduate reading for BBM (Honours) in Accountancy at the University of Kelaniya. AAT Level 3 Qualified and CA Sri Lanka Business Level Aspirant.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/riyanifran"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md bg-white/5 border border-white/10 hover:border-finance-gold hover:text-finance-gold flex items-center justify-center text-slate-300 transition-colors"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:rnifran2003@gmail.com"
                className="w-9 h-9 rounded-md bg-white/5 border border-white/10 hover:border-finance-gold hover:text-finance-gold flex items-center justify-center text-slate-300 transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="tel:+94756889403"
                className="w-9 h-9 rounded-md bg-white/5 border border-white/10 hover:border-finance-gold hover:text-finance-gold flex items-center justify-center text-slate-300 transition-colors"
                title="Direct Phone Call"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h5 className="font-heading font-semibold text-sm uppercase tracking-wider text-finance-gold mb-4">
              Navigation
            </h5>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>
                <Link to="/about" className="hover:text-finance-gold transition-colors flex items-center justify-between">
                  <span>About Riyas</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link to="/academics" className="hover:text-finance-gold transition-colors flex items-center justify-between">
                  <span>Academic Qualifications</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-finance-gold transition-colors flex items-center justify-between">
                  <span>Course Projects</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link to="/company-visits" className="hover:text-finance-gold transition-colors flex items-center justify-between">
                  <span>Corporate Visits</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link to="/activities" className="hover:text-finance-gold transition-colors flex items-center justify-between">
                  <span>Extracurriculars</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link to="/certificates" className="hover:text-finance-gold transition-colors flex items-center justify-between">
                  <span>Skills & Certificates</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
              <li>
                <Link to="/reflection" className="hover:text-finance-gold transition-colors flex items-center justify-between">
                  <span>Professional Reflection</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Target Career Roles */}
          <div>
            <h5 className="font-heading font-semibold text-sm uppercase tracking-wider text-finance-gold mb-4">
              Career Competencies
            </h5>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 text-xs bg-white/5 border border-white/10 rounded text-slate-200">
                Accounting Assistant
              </span>
              <span className="px-2.5 py-1 text-xs bg-white/5 border border-white/10 rounded text-slate-200">
                Accounts Executive
              </span>
              <span className="px-2.5 py-1 text-xs bg-white/5 border border-white/10 rounded text-slate-200">
                Junior Accountant
              </span>
              <span className="px-2.5 py-1 text-xs bg-white/5 border border-white/10 rounded text-slate-200">
                Audit Trainee
              </span>
              <span className="px-2.5 py-1 text-xs bg-white/5 border border-white/10 rounded text-slate-200">
                Finance Assistant
              </span>
              <span className="px-2.5 py-1 text-xs bg-white/5 border border-white/10 rounded text-slate-200">
                Finance Executive Trainee
              </span>
              <span className="px-2.5 py-1 text-xs bg-white/5 border border-white/10 rounded text-slate-200">
                Corporate Finance Intern
              </span>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-finance-deep/60 border border-white/10 text-xs text-slate-300">
              <span className="text-finance-gold font-medium">Core Tools:</span> Tally ERP, MYOB, MS Excel, Double-Entry Bookkeeping.
            </div>
          </div>

          {/* Col 4: Contact & University */}
          <div>
            <h5 className="font-heading font-semibold text-sm uppercase tracking-wider text-finance-gold mb-4">
              Direct Contact
            </h5>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-finance-gold shrink-0 mt-0.5" />
                <span>Kalmunai, Ampara District, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-finance-gold shrink-0" />
                <a href="mailto:rnifran2003@gmail.com" className="hover:text-finance-gold transition-colors truncate">
                  rnifran2003@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-finance-gold shrink-0" />
                <a href="tel:+94756889403" className="hover:text-finance-gold transition-colors">
                  +94 75 688 9403
                </a>
              </li>
              <li className="flex items-start gap-2.5 pt-2 border-t border-white/10">
                <GraduationCap className="w-4 h-4 text-finance-gold shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400">
                  Department of Accountancy, Faculty of Commerce & Management Studies, University of Kelaniya.
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Riyas Nifran. All Rights Reserved. Built with precision for University Assessment & Professional Employment.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <span>&bull;</span>
            <Link to="/admin" className="text-slate-500 hover:text-finance-gold transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Access</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

