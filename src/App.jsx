import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Donor from './pages/Donor';
import Volunteer from './pages/Volunteer';
import VolunteerDashboard from './pages/VolunteerDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ManageRecipients from './pages/ManageRecipients';
import Impact from './pages/Impact';
import MonthlyDonor from './pages/MonthlyDonor';
import About from './pages/About';
import Mission from './pages/Mission';
import Contact from './pages/Contact';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-800 selection:bg-orange-500 selection:text-white">
        <div>
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/donor" element={<Donor />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/recipients" element={<ManageRecipients />} />
              <Route path="/impact" element={<Impact />} />
              <Route path="/monthly-donor" element={<MonthlyDonor />} />
              <Route path="/about" element={<About />} />
              <Route path="/mission" element={<Mission />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
