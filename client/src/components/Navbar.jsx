import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, Award, BookOpen, Briefcase, FileCheck, PhoneCall, Compass, User } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Academics', path: '/academics' },
  { name: 'Projects', path: '/projects' },
  { name: 'Company Visits', path: '/company-visits' },
  { name: 'Activities', path: '/activities' },
  { name: 'Certificates', path: '/certificates' },
  { name: 'Reflection', path: '/reflection' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-finance-midnight/95 backdrop-blur-md shadow-elevated border-b border-finance-gold/20 py-3' 
        : 'bg-finance-midnight border-b border-white/10 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand / Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-finance-deep border border-finance-gold/40 flex items-center justify-center text-finance-gold font-heading font-bold text-lg shadow-subtle group-hover:border-finance-gold transition-colors">
            RN
          </div>
          <div>
            <span className="font-heading font-bold text-lg text-white tracking-tight flex items-center gap-1.5">
              RIYAS NIFRAN
              <span className="w-1.5 h-1.5 rounded-full bg-finance-gold inline-block"></span>
            </span>
            <span className="block text-[11px] font-medium text-finance-gold/90 uppercase tracking-wider">
              Accountancy & Finance
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-1.5 text-xs xl:text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'text-white font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-finance-gold rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Admin Link */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/contact"
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-finance-midnight bg-finance-gold hover:bg-finance-goldLight rounded-md transition-all shadow-subtle hover:shadow-premium"
          >
            Get In Touch
          </Link>
          <Link
            to="/admin"
            title="Secure Admin Portal"
            className="p-2 text-slate-400 hover:text-finance-gold hover:bg-white/5 rounded-md transition-colors"
          >
            <Shield className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <Link
            to="/admin"
            className="p-2 text-slate-400 hover:text-finance-gold rounded-md"
            title="Admin Portal"
          >
            <Shield className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-finance-deep border-b border-white/10 px-4 pt-2 pb-6 space-y-1 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-finance-midnight text-finance-gold font-semibold border-l-4 border-finance-gold'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
            <Link
              to="/contact"
              className="w-full text-center py-2.5 bg-finance-gold hover:bg-finance-goldLight text-finance-midnight font-semibold text-sm rounded-lg"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

