import React from 'react';

export default function StatCard({ icon: Icon, label, value, color = "orange" }) {
  const colorMap = {
    orange: "from-orange-500 to-amber-500 text-orange-600 bg-orange-50",
    emerald: "from-emerald-500 to-teal-500 text-emerald-600 bg-emerald-50",
    blue: "from-blue-500 to-indigo-500 text-blue-600 bg-blue-50",
    purple: "from-purple-500 to-pink-500 text-purple-600 bg-purple-50"
  };

  const bgClasses = colorMap[color] || colorMap.orange;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-xl shadow-slate-100/60 hover:shadow-2xl hover:scale-[1.02] transition-all">
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-2xl ${bgClasses.split(' ').slice(2).join(' ')} flex items-center justify-center`}>
          <Icon className="w-7 h-7" />
        </div>
        <div>
          <span className="text-3xl font-black text-slate-900 tracking-tight block">
            {value !== undefined ? value : '0'}
          </span>
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
