import React from 'react';
import { Heart, ShieldCheck, Users, Target } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">About Annadhan</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Annadhan is a tech-enabled humanitarian platform dedicated to eliminating food waste and ensuring no family goes to bed hungry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Our Story</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Founded with the belief that food abundance and food poverty should not coexist in the same neighborhood, Annadhan provides real-time logistics mapping to move fresh surplus food from kitchens to communities within hours.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Hygiene & Safety First</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Every donation undergoes strict quality and preparation time verification. Our volunteer transport guidelines ensure meals are handled with care, dignity, and thermal protection.
          </p>
        </div>
      </div>
    </div>
  );
}
