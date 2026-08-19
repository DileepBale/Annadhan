import React, { useState } from 'react';
import { Gift, CheckCircle, AlertCircle, Send, MapPin, Calendar, Utensils } from 'lucide-react';

export default function Donor() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    food_type: 'Cooked Meals',
    quantity: '',
    description: '',
    expiry_date: ''
  });

  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    fetch('/api/donor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        setIsSubmitting(false);
        if (data.success) {
          setStatus({ type: 'success', message: data.message });
          setFormData({
            name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '',
            food_type: 'Cooked Meals', quantity: '', description: '', expiry_date: ''
          });
        } else {
          setStatus({ type: 'error', message: data.message || 'Submission failed.' });
        }
      })
      .catch(err => {
        setIsSubmitting(false);
        setStatus({ type: 'error', message: 'Network error. Please try again.' });
      });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8">
        
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-2">
            <Gift className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Donate Surplus Food</h1>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            Fill out the form below. Our nearby volunteers will be notified to collect the fresh food from your location.
          </p>
        </div>

        {status.message && (
          <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold ${
            status.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {status.type === 'success' ? <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />}
            <span>{status.message}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Utensils className="w-5 h-5 text-orange-500" /> Donor Details
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Full Name / Organization</label>
              <input
                type="text" name="name" required value={formData.name} onChange={handleChange}
                placeholder="e.g. Royal Banquet Hall"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Email Address</label>
              <input
                type="email" name="email" required value={formData.email} onChange={handleChange}
                placeholder="donor@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Phone Number</label>
              <input
                type="tel" name="phone" required value={formData.phone} onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Pincode</label>
              <input
                type="text" name="pincode" required value={formData.pincode} onChange={handleChange}
                placeholder="110001"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">City</label>
              <input
                type="text" name="city" required value={formData.city} onChange={handleChange}
                placeholder="New Delhi"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">State</label>
              <input
                type="text" name="state" required value={formData.state} onChange={handleChange}
                placeholder="Delhi"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Full Pickup Address</label>
            <textarea
              name="address" required rows={2} value={formData.address} onChange={handleChange}
              placeholder="Street name, landmark, gate number..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
            />
          </div>

          <div className="border-b border-slate-100 pb-4 pt-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Gift className="w-5 h-5 text-orange-500" /> Food Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Food Category</label>
              <select
                name="food_type" value={formData.food_type} onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium bg-white"
              >
                <option value="Cooked Meals">Cooked Meals (Hot Rice/Curry)</option>
                <option value="Packaged Foods">Packaged / Grocery Items</option>
                <option value="Fruits & Veggies">Fresh Fruits & Vegetables</option>
                <option value="Bakery Items">Bakery / Bread</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Quantity (e.g. 50 meals / 10 kg)</label>
              <input
                type="text" name="quantity" required value={formData.quantity} onChange={handleChange}
                placeholder="e.g. 30 meal boxes"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Food Description & Prep Time</label>
            <textarea
              name="description" required rows={3} value={formData.description} onChange={handleChange}
              placeholder="e.g. Freshly cooked vegetarian meal prepared 2 hours ago..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
            />
          </div>

          <button
            type="submit" disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-base shadow-xl shadow-orange-500/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" />
            {isSubmitting ? 'Submitting...' : 'Submit Donation Request'}
          </button>
        </form>

      </div>
    </div>
  );
}
