import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCandidates } from '../context/CandidateContextDefinition';
import { showToast } from '../components/toastState';
import Chart from 'chart.js/auto';

export default function DashboardPage() {
  const { user } = useAuth();
  const { performSearch, candidates } = useCandidates();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [expValue, setExpValue] = useState(5);
  
  const skillsChartRef = useRef(null);
  const expChartRef = useRef(null);
  const [stats, setStats] = useState({ skills: [], experience: [] });
  const [statsLoading, setStatsLoading] = useState(false);

  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/analytics/stats`, {
        headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('resumeai_user'))?.token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error('Fetch stats error:', error);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (stats.skills.length === 0) return;

    // Skills Pie Chart
    const ctx1 = document.getElementById('skills-pie-chart');
    if (ctx1) {
      if (skillsChartRef.current) skillsChartRef.current.destroy();
      skillsChartRef.current = new Chart(ctx1, {
        type: 'doughnut',
        data: {
          labels: stats.skills.map(s => s.name),
          datasets: [{
            data: stats.skills.map(s => s.count),
            backgroundColor: ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#7C3AED', '#EC4899', '#F59E0B'],
            borderWidth: 0, hoverOffset: 8
          }]
        },
        options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { position: 'right', labels: { padding: 16, usePointStyle: true, font: { size: 12 } } } } }
      });
    }

    // Experience Bar Chart
    const ctx2 = document.getElementById('experience-bar-chart');
    if (ctx2) {
      if (expChartRef.current) expChartRef.current.destroy();
      expChartRef.current = new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: stats.experience.map(e => e.label),
          datasets: [{ label: 'Candidates', data: stats.experience.map(e => e.value), backgroundColor: 'rgba(59, 130, 246, 0.8)', borderRadius: 8, barThickness: 36 }]
        },
        options: { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } }, x: { grid: { display: false } } } }
      });
    }

    return () => {
      if (skillsChartRef.current) skillsChartRef.current.destroy();
      if (expChartRef.current) expChartRef.current.destroy();
    };
  }, [stats]);

  const handleSearch = () => {
    if (!searchInput.trim() && !locationInput.trim()) {
      showToast('Please enter skills, keywords, or a location to search.', 'info');
      return;
    }
    performSearch(searchInput, locationInput);
    navigate('/results');
  };

  const shortlistCount = candidates.filter(c => c.status === 'shortlisted').length;

  return (
    <div className="page active">
      <div className="dashboard-header">
        <div>
          <h1>👋 Welcome back, {user?.name.split(' ')[0]}</h1>
          <p>Here's what's happening with your recruiting pipeline today.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/upload')}>📤 Upload Resumes</button>
      </div>

      <div className="search-section">
        <h2>🔍 Find Your Next Great Hire</h2>
        <p>Search by skills, keywords, or location to find the best candidates</p>
        <div className="search-bar-wrap" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '10px' }}>
          <input 
            type="text" 
            placeholder="Skills (e.g. Python, React)" 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <input 
            type="text" 
            placeholder="Location (e.g. Bangalore, SF)" 
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="filters-sidebar">
          <div className="card">
            <div className="filter-title">⚙️ Quick Filters</div>
            <div className="filter-group">
              <label>Skills</label>
              <div className="checkbox-group">
                <label><input type="checkbox" defaultChecked /> Python</label>
                <label><input type="checkbox" defaultChecked /> JavaScript</label>
                <label><input type="checkbox" /> React</label>
                <label><input type="checkbox" /> Java</label>
                <label><input type="checkbox" /> SQL</label>
                <label><input type="checkbox" /> Machine Learning</label>
                <label><input type="checkbox" /> AWS</label>
                <label><input type="checkbox" /> Docker</label>
              </div>
            </div>
            <div className="filter-group">
              <label>Experience (Years)</label>
              <input type="range" className="range-slider" min="0" max="20" value={expValue} onChange={e => setExpValue(e.target.value)} />
              <div className="range-labels"><span>0 yrs</span><span>{expValue}</span><span>20 yrs</span></div>
            </div>
            <div className="filter-group">
              <label>Education</label>
              <select>
                <option>All Levels</option>
                <option>Bachelor's</option>
                <option>Master's</option>
                <option>PhD</option>
                <option>Diploma</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Location</label>
              <input type="text" placeholder="e.g., San Francisco" />
            </div>
            <button className="btn btn-primary btn-sm" style={{ width: '100%' }} onClick={handleSearch}>Apply Filters</button>
          </div>
        </div>

        <div className="main-content">
          <div className="stats-row">
            <div className="stat-card" onClick={() => navigate('/results')} style={{ cursor: 'pointer' }}>
              <div className="stat-icon blue">📄</div>
              <div className="stat-info">
                <h3>{candidates.length}</h3>
                <p>Total Resumes</p>
                <span className="stat-change">↑ {candidates.filter(c => new Date(c.createdAt || c.created_at).toDateString() === new Date().toDateString()).length} new today</span>
              </div>
            </div>
            <div className="stat-card" onClick={() => navigate('/results')} style={{ cursor: 'pointer' }}>
              <div className="stat-icon green">✅</div>
              <div className="stat-info">
                <h3>{candidates.filter(c => c.matchScore >= 60 || c.score >= 60).length}</h3>
                <p>Matches Found</p>
                <span className="stat-change">↑ {(candidates.filter(c => c.matchScore >= 60 || c.score >= 60).length / (candidates.length || 1) * 100).toFixed(0)}% of total</span>
              </div>
            </div>
            <div className="stat-card" onClick={() => navigate('/results')} style={{ cursor: 'pointer' }}>
              <div className="stat-icon purple">⭐</div>
              <div className="stat-info">
                <h3>{shortlistCount}</h3>
                <p>Shortlisted</p>
                <span className="stat-change">↑ Active pipeline</span>
              </div>
            </div>
          </div>
          
          <div className="charts-row">
            <div className="card chart-card" style={{ position: 'relative' }}>
              <h3>🏷️ Top Skills Distribution</h3>
              {statsLoading ? (
                <div className="chart-placeholder" style={{ height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)' }}>
                  Loading analytics...
                </div>
              ) : (
                <canvas id="skills-pie-chart"></canvas>
              )}
            </div>
            <div className="card chart-card" style={{ position: 'relative' }}>
              <h3>📊 Experience Levels</h3>
              {statsLoading ? (
                <div className="chart-placeholder" style={{ height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)' }}>
                  Loading analytics...
                </div>
              ) : (
                <canvas id="experience-bar-chart"></canvas>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
