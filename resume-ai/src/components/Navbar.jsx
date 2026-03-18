import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, Bell, Zap } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileNavOpen(false);
    navigate('/');
  };

  if (!user) return null;

  const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <nav className="top-nav" id="top-nav">
      <div className="nav-left">
        <div className="nav-logo">
          <div className="logo-icon">
            <Zap size={20} color="white" fill="white" />
          </div>
          <span>ResumeAI</span>
        </div>
        <div className="nav-links" style={{ display: mobileNavOpen ? 'flex' : '' }}>
          <NavLink to="/dashboard" onClick={() => setMobileNavOpen(false)}>📊 Dashboard</NavLink>
          <NavLink to="/upload" onClick={() => setMobileNavOpen(false)}>📤 Upload</NavLink>
          <NavLink to="/results" onClick={() => setMobileNavOpen(false)}>🔍 Results</NavLink>
          <NavLink to="/reports" onClick={() => setMobileNavOpen(false)}>📈 Reports</NavLink>
        </div>
      </div>
      <div className="nav-right">
        <button className="mobile-nav-toggle" onClick={() => setMobileNavOpen(!mobileNavOpen)}>
          <Menu />
        </button>
        <div className="nav-notification" onClick={() => alert('3 new candidate matches found!')}>
          <Bell size={18} />
          <span className="notif-dot"></span>
        </div>
        <div className="nav-profile" onClick={handleLogout} title="Click to Logout">
          <div className="avatar">{initials}</div>
          <div className="profile-info">
            <div className="name">{user.name}</div>
            <div className="role">HR Manager</div>
          </div>
        </div>
      </div>
    </nav>
  );
}
