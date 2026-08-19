import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Gift, Users, HeartHandshake, CheckCircle2, UserCheck, Plus, RefreshCw, AlertCircle } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    stats: {},
    recent_donations: [],
    all_volunteers: []
  });

  const [loading, setLoading] = useState(true);
  const [assigningId, setAssigningId] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState('');
  const [alert, setAlert] = useState({ type: '', text: '' });

  const fetchDashboard = () => {
    setLoading(true);
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(resData => {
        setLoading(false);
        if (resData.success) {
          setData(resData);
        } else {
          navigate('/admin/login');
        }
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleAssign = (donationId) => {
    fetch(`/api/admin/assign-volunteer/${donationId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ volunteer_email: selectedVolunteer })
    })
      .then(res => res.json())
      .then(resData => {
        if (resData.success) {
          setAlert({ type: 'success', text: resData.message });
          setAssigningId(null);
          setSelectedVolunteer('');
          fetchDashboard();
        } else {
          setAlert({ type: 'error', text: resData.message });
        }
      });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-orange-400">Admin Control Panel</span>
          <h1 className="text-3xl font-extrabold">Annadhan Management</h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/admin/recipients"
            className="px-4 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-1.5"
          >
            <UserCheck className="w-4 h-4" /> Manage Recipients
          </Link>
          <button
            onClick={fetchDashboard}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl transition-all"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {alert.text && (
        <div className={`p-4 rounded-2xl flex items-center gap-2 text-sm font-bold ${
          alert.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          <AlertCircle className="w-5 h-5" />
          <span>{alert.text}</span>
        </div>
      )}

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Gift} label="Total Donations" value={data.stats.total_donations || 0} color="orange" />
        <StatCard icon={CheckCircle2} label="Pending Pickups" value={data.stats.pending_donations || 0} color="emerald" />
        <StatCard icon={Users} label="Registered Volunteers" value={data.stats.total_volunteers || 0} color="blue" />
        <StatCard icon={HeartHandshake} label="Verified Families" value={data.stats.total_recipients || 0} color="purple" />
      </div>

      {/* Recent Donations Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Gift className="w-5 h-5 text-orange-500" /> Recent Donations
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-10 text-slate-400 font-medium">Loading donations...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-extrabold uppercase text-slate-600 bg-slate-50">
                  <th className="p-4 rounded-l-xl">Donor</th>
                  <th className="p-4">Food & Quantity</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 rounded-r-xl">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium">
                {data.recent_donations.map((don) => (
                  <tr key={don._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{don.donor_name || 'Anonymous'}</div>
                      <div className="text-xs text-slate-500">{don.donor_email}</div>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-orange-600 block">{don.food_type}</span>
                      <span className="text-xs text-slate-500">{don.quantity}</span>
                    </td>
                    <td className="p-4 text-xs text-slate-600 max-w-xs truncate">
                      {don.pickup_address}
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                        don.status === 'assigned' ? 'bg-blue-100 text-blue-800' :
                        don.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {don.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {don.status === 'pending' ? (
                        assigningId === don._id ? (
                          <div className="flex items-center gap-2">
                            <select
                              value={selectedVolunteer}
                              onChange={(e) => setSelectedVolunteer(e.target.value)}
                              className="px-2 py-1 border border-slate-200 rounded-lg text-xs bg-white"
                            >
                              <option value="">Auto-Assign Next</option>
                              {data.all_volunteers.map(v => (
                                <option key={v._id} value={v.email}>{v.name} ({v.city})</option>
                              ))}
                            </select>
                            <button
                              onClick={() => handleAssign(don._id)}
                              className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold"
                            >
                              Confirm
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setAssigningId(don._id)}
                            className="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                          >
                            Assign Volunteer
                          </button>
                        )
                      ) : (
                        <span className="text-xs text-slate-400 font-semibold">{don.assigned_volunteer || 'Assigned'}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
