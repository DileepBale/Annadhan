import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Plus, CheckCircle, ArrowLeft } from 'lucide-react';

export default function ManageRecipients() {
  const [recipients, setRecipients] = useState([]);
  const [formData, setFormData] = useState({
    name: '', phone: '', address: '', city: '', state: '', pincode: '', family_size: '4'
  });
  const [msg, setMsg] = useState('');

  const fetchRecipients = () => {
    fetch('/api/recipients')
      .then(res => res.json())
      .then(data => {
        if (data.success) setRecipients(data.recipients || []);
      });
  };

  useEffect(() => {
    fetchRecipients();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/recipients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMsg('Recipient added successfully!');
          setFormData({ name: '', phone: '', address: '', city: '', state: '', pincode: '', family_size: '4' });
          fetchRecipients();
        }
      });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center justify-between">
        <Link to="/admin/dashboard" className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 px-3.5 py-2 rounded-xl">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-extrabold text-slate-900">Manage Verified Recipients</h1>
      </div>

      {msg && <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold">{msg}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Column */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Plus className="w-5 h-5 text-orange-500" /> Add Verified Recipient
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Family / Shelter Name</label>
              <input
                type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ramesh Family"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Phone Number</label>
              <input
                type="tel" required value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 00000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Family Size</label>
              <input
                type="number" required min="1" value={formData.family_size} onChange={e => setFormData({ ...formData, family_size: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Full Address</label>
              <textarea
                required rows={2} value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })}
                placeholder="Shelter #4, Slum Colony..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input
                type="text" required placeholder="City" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
              <input
                type="text" required placeholder="Pincode" value={formData.pincode} onChange={e => setFormData({ ...formData, pincode: e.target.value })}
                className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-orange-600 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-md hover:bg-orange-700"
            >
              Add Recipient
            </button>
          </form>
        </div>

        {/* Recipients Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-xl space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-500" /> Active Verified Recipients ({recipients.length})
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-extrabold uppercase text-slate-600 bg-slate-50">
                  <th className="p-3">Name</th>
                  <th className="p-3">Family Size</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recipients.map(r => (
                  <tr key={r._id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">
                      {r.name}
                      <div className="text-xs text-slate-500 font-normal">{r.phone}</div>
                    </td>
                    <td className="p-3 font-bold text-orange-600">{r.family_size} members</td>
                    <td className="p-3 text-xs text-slate-600 max-w-xs truncate">{r.address}, {r.city}</td>
                    <td className="p-3">
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase flex items-center gap-1 w-fit">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
