import React, { useState } from 'react';
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { api } from '../services/api';
import { AccountingLedgerLines } from '../components/AccountingDecor';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (status.error) setStatus(prev => ({ ...prev, error: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ loading: false, success: false, error: 'Please enter your name, valid email, and message.' });
      return;
    }

    try {
      setStatus({ loading: true, success: false, error: '' });
      const res = await api.submitContact(formData);
      if (res.success) {
        setStatus({ loading: false, success: true, error: '' });
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus({ loading: false, success: false, error: res.message || 'Submission failed.' });
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message || 'An error occurred while submitting.' });
    }
  };

  return (
    <div className="min-h-screen bg-finance-ivory">
      
      {/* Header */}
      <section className="bg-finance-midnight text-white py-16 relative overflow-hidden border-b border-finance-gold/20">
        <AccountingLedgerLines />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-finance-gold">
              Professional Inquiries & Opportunities
            </span>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Contact Riyas Nifran
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Open to discussions regarding Accounting Assistant, Accounts Executive, Junior Accountant, Audit Trainee, Finance Assistant, and Corporate Finance Internship roles.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left: Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-finance-border shadow-subtle space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-xl text-finance-midnight">
                    Direct Contact Channels
                  </h2>
                  <p className="text-xs text-finance-slate mt-1">
                    Feel free to reach out directly via email, phone call, or LinkedIn message.
                  </p>
                </div>

                <div className="space-y-4">
                  
                  {/* Email */}
                  <a
                    href="mailto:rnifran2003@gmail.com"
                    className="flex items-start gap-3.5 p-3.5 rounded-lg bg-finance-ivory/60 border border-finance-border hover:border-finance-gold transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-finance-midnight text-finance-gold flex items-center justify-center shrink-0 group-hover:bg-finance-gold group-hover:text-finance-midnight transition-colors">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-finance-slate block">
                        Professional Email
                      </span>
                      <span className="text-sm font-semibold text-finance-midnight group-hover:text-finance-gold transition-colors">
                        rnifran2003@gmail.com
                      </span>
                    </div>
                  </a>

                  {/* Phone */}
                  <a
                    href="tel:+94756889403"
                    className="flex items-start gap-3.5 p-3.5 rounded-lg bg-finance-ivory/60 border border-finance-border hover:border-finance-gold transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-finance-midnight text-finance-gold flex items-center justify-center shrink-0 group-hover:bg-finance-gold group-hover:text-finance-midnight transition-colors">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-finance-slate block">
                        Direct Phone / WhatsApp
                      </span>
                      <span className="text-sm font-semibold text-finance-midnight group-hover:text-finance-gold transition-colors">
                        +94 75 688 9403
                      </span>
                    </div>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/riyanifran"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 p-3.5 rounded-lg bg-finance-ivory/60 border border-finance-border hover:border-finance-gold transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-finance-midnight text-finance-gold flex items-center justify-center shrink-0 group-hover:bg-finance-gold group-hover:text-finance-midnight transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-finance-slate block">
                        LinkedIn Profile
                      </span>
                      <span className="text-sm font-semibold text-finance-midnight group-hover:text-finance-gold transition-colors">
                        linkedin.com/in/riyanifran
                      </span>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-start gap-3.5 p-3.5 rounded-lg bg-finance-ivory/60 border border-finance-border">
                    <div className="w-10 h-10 rounded-lg bg-finance-midnight text-finance-gold flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-finance-slate block">
                        Permanent Residence
                      </span>
                      <span className="text-sm font-semibold text-finance-midnight">
                        Kalmunai, Ampara District, Eastern Province, Sri Lanka
                      </span>
                    </div>
                  </div>

                </div>

                <div className="pt-2 flex items-center gap-2 text-xs text-finance-slate">
                  <Clock className="w-4 h-4 text-finance-gold" />
                  <span>Prompt reply within standard business hours</span>
                </div>
              </div>

            </div>

            {/* Right: Validated Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-6 sm:p-8 rounded-xl border border-finance-border shadow-subtle space-y-6">
                <div>
                  <h2 className="font-heading font-bold text-xl text-finance-midnight">
                    Send a Professional Inquiry
                  </h2>
                  <p className="text-xs text-finance-slate mt-1">
                    Your message will be safely dispatched to the administrative inbox and stored securely.
                  </p>
                </div>

                {status.success && (
                  <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-start gap-3 animate-fadeIn">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Message Delivered Successfully!</p>
                      <p className="text-xs mt-0.5">Thank you for reaching out. Riyas Nifran will review your correspondence shortly.</p>
                    </div>
                  </div>
                )}

                {status.error && (
                  <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-3 animate-fadeIn">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Submission Notice</p>
                      <p className="text-xs mt-0.5">{status.error}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-finance-slate mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. John Perera"
                        className="w-full px-3.5 py-2.5 bg-finance-ivory/50 border border-finance-border rounded-lg text-sm text-finance-midnight focus:outline-none focus:border-finance-gold focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-finance-slate mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="e.g. jperera@organization.com"
                        className="w-full px-3.5 py-2.5 bg-finance-ivory/50 border border-finance-border rounded-lg text-sm text-finance-midnight focus:outline-none focus:border-finance-gold focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-finance-slate mb-1">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +94 77 123 4567"
                        className="w-full px-3.5 py-2.5 bg-finance-ivory/50 border border-finance-border rounded-lg text-sm text-finance-midnight focus:outline-none focus:border-finance-gold focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-finance-slate mb-1">
                        Subject / Inquiry Area
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="e.g. Internship Opportunity / Audit Trainee"
                        className="w-full px-3.5 py-2.5 bg-finance-ivory/50 border border-finance-border rounded-lg text-sm text-finance-midnight focus:outline-none focus:border-finance-gold focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-finance-slate mb-1">
                      Message Content *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Please enter your inquiry, role requirements, or company details..."
                      className="w-full px-3.5 py-2.5 bg-finance-ivory/50 border border-finance-border rounded-lg text-sm text-finance-midnight focus:outline-none focus:border-finance-gold focus:bg-white transition-all resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status.loading}
                    className="w-full py-3 bg-finance-midnight hover:bg-finance-deep text-white font-heading font-bold text-xs uppercase tracking-wider rounded-lg shadow-subtle hover:shadow-premium transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {status.loading ? (
                      <span>Sending Message...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-finance-gold" />
                        <span>Send Verified Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;

