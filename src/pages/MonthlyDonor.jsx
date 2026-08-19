import React, { useState } from 'react';
import { Heart, CheckCircle, Send, ShieldCheck } from 'lucide-react';

export default function MonthlyDonor() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [msg, setMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/monthly-donor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, amount: 400 })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMsg(data.message);
          setFormData({ name: '', email: '', phone: '' });
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8 fill-orange-600" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900">Monthly Donor Circle</h1>
        <p className="text-slate-600 text-sm">
          Support continuous logistics and food rescue operations for just <span className="font-extrabold text-orange-600">₹400 / month</span>.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-2xl space-y-8">
        {msg && <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-sm font-bold">{msg}</div>}

        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Full Name</label>
            <input
              type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Asha Verma"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Email Address</label>
            <input
              type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="asha@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Phone Number</label>
            <input
              type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="p-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">Monthly Contribution</span>
            <span className="text-xl font-extrabold text-orange-600">₹400 / month</span>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-base shadow-xl hover:scale-[1.01] transition-all"
          >
            Join ₹400 Monthly Circle
          </button>
        </form>
      </div>
    </div>
  );
}
