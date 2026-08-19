import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Gift, Users, HeartHandshake, CheckCircle2, ArrowRight, ShieldCheck, Award } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function Home() {
  const [stats, setStats] = useState({
    total_donations: 0,
    total_volunteers: 0,
    total_recipients: 0,
    completed_deliveries: 0
  });

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.stats) {
          setStats(data.stats);
        }
      })
      .catch(err => console.error('Failed to fetch stats:', err));
  }, []);

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-orange-50/70 via-white to-slate-50 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/80 border border-orange-200 text-orange-700 text-xs font-extrabold uppercase tracking-widest shadow-sm">
                <HeartHandshake className="w-4 h-4 text-orange-600" />
                No Meal Wasted, No Hand Empty
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Bridge Surplus Food to <span className="gradient-text">Hungry Souls</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                Annadhan coordinates real-time surplus food donations from restaurants, events, and individuals, empowering local volunteer networks to deliver fresh meals to verified families.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/donor"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-base shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:scale-105 transition-all"
                >
                  <Gift className="w-5 h-5" />
                  Donate Surplus Food
                </Link>

                <Link
                  to="/volunteer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold text-base shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
                >
                  <Users className="w-5 h-5 text-orange-500" />
                  Become a Volunteer
                </Link>
              </div>

              <div className="pt-6 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-semibold">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Verified Recipients</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real-time Tracking</span>
              </div>
            </div>

            {/* Visual Decorative Hero Card */}
            <div className="relative">
              <div className="relative mx-auto max-w-md bg-white rounded-3xl p-8 border border-slate-100 shadow-2xl shadow-orange-500/10 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-xs font-bold uppercase text-orange-600 tracking-wider">Live Impact Counter</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-orange-50/80 rounded-2xl border border-orange-100">
                    <span className="text-3xl font-extrabold text-orange-600 block">{stats.total_donations}</span>
                    <span className="text-xs font-semibold text-slate-600 uppercase">Donations</span>
                  </div>
                  <div className="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-100">
                    <span className="text-3xl font-extrabold text-emerald-600 block">{stats.completed_deliveries}</span>
                    <span className="text-xs font-semibold text-slate-600 uppercase">Meals Delivered</span>
                  </div>
                  <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-100">
                    <span className="text-3xl font-extrabold text-blue-600 block">{stats.total_volunteers}</span>
                    <span className="text-xs font-semibold text-slate-600 uppercase">Volunteers</span>
                  </div>
                  <div className="p-4 bg-purple-50/80 rounded-2xl border border-purple-100">
                    <span className="text-3xl font-extrabold text-purple-600 block">{stats.total_recipients}</span>
                    <span className="text-xs font-semibold text-slate-600 uppercase">Recipients</span>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl p-4 text-white text-center">
                  <p className="text-xs font-medium text-slate-300">Join our monthly circle starting at ₹400/mo</p>
                  <Link to="/monthly-donor" className="text-xs font-bold text-orange-400 hover:underline mt-1 inline-block">
                    Join Monthly Circle &rarr;
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Impact Stats Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900">Platform Overview</h2>
          <p className="text-slate-500 font-medium text-sm">Real-time statistics from our active network</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={Gift} label="Total Donations" value={stats.total_donations} color="orange" />
          <StatCard icon={CheckCircle2} label="Meals Delivered" value={stats.completed_deliveries} color="emerald" />
          <StatCard icon={Users} label="Active Volunteers" value={stats.total_volunteers} color="blue" />
          <StatCard icon={Award} label="Verified Families" value={stats.total_recipients} color="purple" />
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-orange-400 font-bold uppercase tracking-widest text-xs">Simple & Seamless</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">How Annadhan Works</h2>
            <p className="text-slate-400 text-sm">Three easy steps to transform surplus food into community nourishment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-800/80 rounded-2xl p-8 border border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-black text-xl">1</div>
              <h3 className="text-xl font-bold text-white">Donors Post Food</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Restaurants, event hosts, or homes submit details about leftover meals and pickup location.
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-8 border border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xl">2</div>
              <h3 className="text-xl font-bold text-white">Volunteers Assigned</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Nearby volunteers receive immediate notification alerts to pick up the fresh food parcel.
              </p>
            </div>

            <div className="bg-slate-800/80 rounded-2xl p-8 border border-slate-700 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black text-xl">3</div>
              <h3 className="text-xl font-bold text-white">Direct Distribution</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Food is safely transported and distributed to pre-verified families or shelter homes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-10 sm:p-14 text-white shadow-2xl shadow-orange-500/20 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-3xl font-extrabold">Ready to make a difference today?</h2>
            <p className="text-orange-100 font-medium text-sm max-w-lg">
              Whether you have surplus food or a few hours to spare, your action saves lives.
            </p>
          </div>
          <Link
            to="/donor"
            className="px-8 py-4 bg-white text-orange-600 rounded-2xl font-bold text-base shadow-lg hover:bg-orange-50 hover:scale-105 transition-all shrink-0"
          >
            Start Donating Now
          </Link>
        </div>
      </section>

    </div>
  );
}
