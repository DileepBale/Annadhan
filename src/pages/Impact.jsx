import React, { useEffect, useState } from 'react';
import { Award, CheckCircle2, Gift, Users, HeartHandshake, TrendingUp } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function Impact() {
  const [stats, setStats] = useState({
    total_donations: 0,
    total_volunteers: 0,
    total_recipients: 0,
    completed_deliveries: 0,
    monthly_donations: 0,
    monthly_deliveries: 0
  });

  useEffect(() => {
    fetch('/api/impact')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.stats) setStats(data.stats);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-wider">
          <TrendingUp className="w-4 h-4" /> Transparency & Results
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900">Our Real-World Impact</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Every meal rescued is a step towards eliminating hunger. Here is how our network is making a measurable difference every single day.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Gift} label="Total Food Donations" value={stats.total_donations} color="orange" />
        <StatCard icon={CheckCircle2} label="Deliveries Completed" value={stats.completed_deliveries} color="emerald" />
        <StatCard icon={Users} label="Registered Volunteers" value={stats.total_volunteers} color="blue" />
        <StatCard icon={Award} label="Recipients Served" value={stats.total_recipients} color="purple" />
      </div>

      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 sm:p-12 text-white grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase text-orange-400 tracking-wider">This Month's Progress</span>
          <h2 className="text-3xl font-extrabold">Active Monthly Run Rate</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            With expanding volunteer nodes across major cities, our response time from donor pickup to distribution has dropped under 90 minutes.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 text-center">
            <span className="text-4xl font-extrabold text-orange-400 block">{stats.monthly_donations}</span>
            <span className="text-xs font-semibold text-slate-400 uppercase mt-1 block">Monthly Donations</span>
          </div>
          <div className="p-6 bg-slate-800/80 rounded-2xl border border-slate-700 text-center">
            <span className="text-4xl font-extrabold text-emerald-400 block">{stats.monthly_deliveries}</span>
            <span className="text-xs font-semibold text-slate-400 uppercase mt-1 block">Monthly Deliveries</span>
          </div>
        </div>
      </div>

    </div>
  );
}
