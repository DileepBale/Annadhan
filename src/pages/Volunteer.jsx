import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, CheckCircle, AlertCircle, UserPlus, LogIn } from 'lucide-react';

export default function Volunteer() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('register'); // 'register' or 'login'

  const [registerData, setRegisterData] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '', availability: 'available'
  });

  const [loginEmail, setLoginEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    fetch('/api/volunteer', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setStatus({ type: 'success', message: 'Registration successful! Logging into dashboard...' });
          setTimeout(() => {
            navigate(`/volunteer/dashboard?email=${encodeURIComponent(registerData.email)}`);
          }, 1000);
        } else {
          setStatus({ type: 'error', message: data.message });
        }
      })
      .catch(() => setStatus({ type: 'error', message: 'Network error.' }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    fetch('/api/volunteer/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          navigate(`/volunteer/dashboard?email=${encodeURIComponent(loginEmail)}`);
        } else {
          setStatus({ type: 'error', message: data.message });
        }
      })
      .catch(() => setStatus({ type: 'error', message: 'Login failed.' }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50 space-y-8">
        
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2">
            <Users className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Volunteer Network</h1>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            Become a local food rescue hero. Pick up surplus food from donors and deliver to families in need.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl max-w-sm mx-auto">
          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === 'register' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <UserPlus className="w-4 h-4" /> New Volunteer
          </button>
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
              activeTab === 'login' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <LogIn className="w-4 h-4" /> Dashboard Login
          </button>
        </div>

        {status.message && (
          <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold ${
            status.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {status.type === 'success' ? <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" /> : <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />}
            <span>{status.message}</span>
          </div>
        )}

        {activeTab === 'register' ? (
          <form onSubmit={handleRegisterSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Full Name</label>
                <input
                  type="text" name="name" required value={registerData.name} onChange={handleRegisterChange}
                  placeholder="Ravi Kumar"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Email Address</label>
                <input
                  type="email" name="email" required value={registerData.email} onChange={handleRegisterChange}
                  placeholder="ravi@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Phone Number</label>
                <input
                  type="tel" name="phone" required value={registerData.phone} onChange={handleRegisterChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Pincode</label>
                <input
                  type="text" name="pincode" required value={registerData.pincode} onChange={handleRegisterChange}
                  placeholder="110001"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-2">City</label>
                <input
                  type="text" name="city" required value={registerData.city} onChange={handleRegisterChange}
                  placeholder="New Delhi"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-2">State</label>
                <input
                  type="text" name="state" required value={registerData.state} onChange={handleRegisterChange}
                  placeholder="Delhi"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Locality / Address</label>
              <input
                type="text" name="address" required value={registerData.address} onChange={handleRegisterChange}
                placeholder="Sector 4, Block B"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold text-base shadow-xl hover:bg-slate-800 transition-all"
            >
              Register as Volunteer
            </button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} className="space-y-6 max-w-md mx-auto">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-600 mb-2">Registered Email</label>
              <input
                type="email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="vol1@example.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-orange-600 text-white font-bold text-base shadow-lg hover:bg-orange-700 transition-all"
            >
              Open Volunteer Dashboard
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
