import React, { useState } from 'react';
import { Users, Calendar, Award, CheckCircle2, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { AccountingLedgerLines } from '../components/AccountingDecor';
import ActivityCard from '../components/ActivityCard';
import EventCard from '../components/EventCard';

const ActivitiesPage = () => {
  const { data, loading } = usePortfolio();
  const [activeTab, setActiveTab] = useState('activities'); // 'activities' | 'events'

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-finance-ivory">
        <div className="w-10 h-10 border-2 border-finance-midnight border-t-finance-gold rounded-full animate-spin" />
      </div>
    );
  }

  const { activities, events } = data;

  return (
    <div className="min-h-screen bg-finance-ivory">
      
      {/* Header */}
      <section className="bg-finance-midnight text-white py-16 relative overflow-hidden border-b border-finance-gold/20">
        <AccountingLedgerLines />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-finance-gold">
              Holistic Leadership & Campus Engagement
            </span>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-white tracking-tight">
              Extracurricular Activities, Events & Seminars
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Active student involvement in the Association of Islamic Students, campus event leadership, inter-house challenges, competitive cricket, cultural celebrations, and verified finance seminars.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-finance-border sticky top-[73px] z-30 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('activities')}
              className={`py-4 px-2 text-xs sm:text-sm font-heading font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'activities'
                  ? 'border-finance-gold text-finance-midnight'
                  : 'border-transparent text-finance-slate hover:text-finance-midnight'
              }`}
            >
              <Users className="w-4 h-4 text-finance-gold" />
              <span>Extracurricular Activities ({activities?.length || 0})</span>
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`py-4 px-2 text-xs sm:text-sm font-heading font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'events'
                  ? 'border-finance-gold text-finance-midnight'
                  : 'border-transparent text-finance-slate hover:text-finance-midnight'
              }`}
            >
              <Calendar className="w-4 h-4 text-finance-gold" />
              <span>Seminars & Workshops ({events?.length || 0})</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeTab === 'activities' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities?.map((act) => (
                <ActivityCard key={act._id} activity={act} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events?.map((evt) => (
                <EventCard key={evt._id} event={evt} />
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
};

export default ActivitiesPage;

