import React from 'react';
import { Target, Compass, Award } from 'lucide-react';

export default function Mission() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">Our Mission & Vision</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Building sustainable community food networks powered by empathy, innovation, and active volunteers.
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-4">
          <span className="text-xs font-bold uppercase text-orange-400 tracking-wider">Mission Statement</span>
          <h2 className="text-3xl font-extrabold">Zero Food Waste, Zero Hunger</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            To rescue 1 million meals annually by bridging event organizers, food establishments, and compassionate citizen volunteers to verified recipient centers.
          </p>
        </div>
      </div>
    </div>
  );
}
