import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Anna<span className="text-orange-500">dhan</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connecting surplus food with those in need. Creating a hunger-free world through community action and smart distribution.
            </p>
            <p className="text-xs text-orange-400 font-medium italic">
              "No meal should go wasted, no hand should go empty"
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/donor" className="hover:text-orange-400 transition-colors">Donate Surplus Food</Link></li>
              <li><Link to="/volunteer" className="hover:text-orange-400 transition-colors">Join as Volunteer</Link></li>
              <li><Link to="/monthly-donor" className="hover:text-orange-400 transition-colors">Monthly Donor Circle</Link></li>
              <li><Link to="/impact" className="hover:text-orange-400 transition-colors">Our Impact Stats</Link></li>
            </ul>
          </div>

          {/* Organization */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Organization</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-orange-400 transition-colors">About Annadhan</Link></li>
              <li><Link to="/mission" className="hover:text-orange-400 transition-colors">Our Mission & Vision</Link></li>
              <li><Link to="/contact" className="hover:text-orange-400 transition-colors">Contact Support</Link></li>
              <li><Link to="/admin/login" className="hover:text-orange-400 transition-colors">Admin Login</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <span>123 Community Hub, Sector 4, New Delhi, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                <span>contact@annadhan.org</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/80 text-center md:flex md:justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Annadhan Platform. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built with ❤️ for humanity</p>
        </div>
      </div>
    </footer>
  );
}
