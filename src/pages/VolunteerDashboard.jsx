import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, MapPin, PackageCheck, User, Phone } from 'lucide-react';

export default function VolunteerDashboard() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const email = searchParams.get('email');

  const [volunteer, setVolunteer] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  const fetchDashboardData = () => {
    if (!email) {
      setLoading(false);
      return;
    }
    fetch(`/api/volunteer/assignments?email=${encodeURIComponent(email)}`)
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.success) {
          setVolunteer(data.volunteer);
          setAssignments(data.assignments || []);
        } else {
          setMsg(data.message);
        }
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchDashboardData();
  }, [email]);

  const handleMarkComplete = (assignmentId) => {
    fetch(`/api/volunteer/complete-task/${assignmentId}`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          fetchDashboardData();
        }
      });
  };

  if (!email) {
    return (
      <div className="max-w-md mx-auto text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Email Required</h2>
        <p className="text-slate-500 text-sm">Please log in with your registered email.</p>
        <button onClick={() => navigate('/volunteer')} className="px-6 py-2.5 bg-orange-600 text-white rounded-xl font-bold">
          Go to Volunteer Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs font-bold uppercase text-orange-400 tracking-wider">Volunteer Dashboard</span>
          <h1 className="text-3xl font-extrabold">{volunteer?.name || email}</h1>
          <p className="text-slate-400 text-xs mt-1">{volunteer?.city ? `${volunteer.city}, ${volunteer.state}` : email}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Available Hero
          </span>
        </div>
      </div>

      {msg && <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm font-semibold">{msg}</div>}

      {/* Assignments Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <PackageCheck className="w-6 h-6 text-orange-500" /> Assigned Deliveries ({assignments.length})
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-400 font-medium">Loading assignments...</div>
        ) : assignments.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-100 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No active assignments</h3>
            <p className="text-slate-500 text-xs max-w-sm mx-auto">
              You will receive an email alert whenever an admin assigns a nearby surplus food donation to you.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {assignments.map(item => {
              const donation = item.donation || {};
              const isCompleted = item.status === 'completed';
              return (
                <div key={item._id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase bg-orange-100 text-orange-700">
                      {donation.food_type || 'Food Donation'}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      isCompleted ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-base">{donation.quantity}</h3>
                    <p className="text-xs text-slate-500 mt-1">{donation.description}</p>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <p className="flex items-center gap-2 font-medium">
                      <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>{donation.pickup_address || 'Pickup Address'}</span>
                    </p>
                    <p className="flex items-center gap-2 font-medium">
                      <User className="w-4 h-4 text-orange-500 shrink-0" />
                      <span>Donor: {donation.donor_name || donation.donor_email}</span>
                    </p>
                  </div>

                  {!isCompleted ? (
                    <button
                      onClick={() => handleMarkComplete(item._id)}
                      className="w-full py-3 bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Mark Delivery Completed
                    </button>
                  ) : (
                    <div className="text-center py-2 text-xs font-bold text-emerald-600 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Completed
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
