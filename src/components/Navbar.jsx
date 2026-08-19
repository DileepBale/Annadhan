import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, Shield, Users, Gift, BarChart2, PhoneCall } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Donate Food', path: '/donor' },
    { name: 'Volunteer', path: '/volunteer' },
    { name: 'Impact', path: '/impact' },
    { name: 'Monthly Circle', path: '/monthly-donor' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-slate-200/80 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900">
                Anna<span className="text-orange-600">dhan</span>
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 -mt-1">
                Nourishing Hope
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'bg-orange-50 text-orange-600 font-bold'
                    : 'text-slate-600 hover:text-orange-600 hover:bg-slate-100/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/admin/login"
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
              title="Admin Access"
            >
              <Shield className="w-5 h-5" />
            </Link>

            <Link
              to="/donor"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-md shadow-orange-500/20 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Gift className="w-4 h-4" />
              Donate Food
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-xl text-slate-600 hover:bg-slate-100"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-4 py-3 rounded-xl text-base font-semibold ${
                isActive(link.path)
                  ? 'bg-orange-50 text-orange-600 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/donor"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-xl bg-orange-600 text-white font-bold text-center shadow-md"
            >
              Donate Food Now
            </Link>
            <Link
              to="/admin/login"
              onClick={() => setIsOpen(false)}
              className="w-full py-3 rounded-xl bg-slate-100 text-slate-700 font-semibold text-center"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
