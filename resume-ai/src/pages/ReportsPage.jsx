import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

export default function ReportsPage() {
  const skillsRef = useRef(null);
  const expRef = useRef(null);
  const eduRef = useRef(null);
  const timelineRef = useRef(null);
  const [stats, setStats] = useState({ skills: [], experience: [] });

  const fetchStats = async () => {
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
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (stats.skills.length === 0) return;
    const colors = ['#1E3A8A', '#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE', '#7C3AED', '#EC4899', '#F59E0B'];

    if (skillsRef.current) {
      const chart = Chart.getChart(skillsRef.current);
      if (chart) chart.destroy();
      new Chart(skillsRef.current, {
        type: 'doughnut',
        data: {
          labels: stats.skills.map(s => s.name),
          datasets: [{ data: stats.skills.map(s => s.count), backgroundColor: colors, borderWidth: 0, hoverOffset: 8 }]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true, font: { size: 12 } } } } }
      });
    }

    if (expRef.current) {
      const chart = Chart.getChart(expRef.current);
      if (chart) chart.destroy();
      new Chart(expRef.current, {
        type: 'bar',
        data: {
          labels: stats.experience.map(e => e.label),
          datasets: [{ label: 'Candidates', data: stats.experience.map(e => e.value), backgroundColor: 'rgba(59,130,246,0.8)', borderRadius: 8, barThickness: 30 }]
        },
        options: { responsive: true, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } }, x: { grid: { display: false } } } }
      });
    }

    if (eduRef.current) {
      const chart = Chart.getChart(eduRef.current);
      if (chart) chart.destroy();
      new Chart(eduRef.current, {
        type: 'pie',
        data: {
          labels: ["Bachelor's", "Master's", "PhD", "Diploma", "Other"],
          datasets: [{ data: [12, 8, 2, 3, 1], backgroundColor: ['#3B82F6', '#1E3A8A', '#7C3AED', '#60A5FA', '#93C5FD'], borderWidth: 0 }]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { padding: 16, usePointStyle: true, font: { size: 12 } } } } }
      });
    }

    if (timelineRef.current) {
      const chart = Chart.getChart(timelineRef.current);
      if (chart) chart.destroy();
      new Chart(timelineRef.current, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar'],
          datasets: [{
            label: 'Resumes Uploaded',
            data: [0, 2, stats.skills.reduce((acc, s) => acc + s.count, 0)],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59,130,246,0.1)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#3B82F6',
            pointRadius: 4,
            pointHoverRadius: 7
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } }, x: { grid: { display: false } } }
        }
      });
    }

    return () => {
       const destroyChart = (ref) => {
         const chart = Chart.getChart(ref.current);
         if(chart) chart.destroy();
       }
       if(skillsRef.current) destroyChart(skillsRef);
       if(expRef.current) destroyChart(expRef);
       if(eduRef.current) destroyChart(eduRef);
       if(timelineRef.current) destroyChart(timelineRef);
    }
  }, [stats]);

  return (
    <div className="page active" id="reports-page">
      <div className="reports-header">
        <div>
          <h1>📈 Analytics & Reports</h1>
          <p>Insights from your candidate pipeline</p>
        </div>
        <div className="reports-filters">
          <select>
            <option>All Departments</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Design</option>
            <option>Sales</option>
          </select>
          <input type="date" defaultValue="2026-01-01" />
          <input type="date" defaultValue="2026-03-17" />
          <button className="btn btn-primary btn-sm" onClick={() => alert('Filters applied!')}>Apply</button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-icon blue">📄</div>
          <div className="stat-info"><h3>2,847</h3><p>Total Resumes</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green">✅</div>
          <div className="stat-info"><h3>342</h3><p>Shortlisted</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple">📊</div>
          <div className="stat-info"><h3>89%</h3><p>Avg AI Accuracy</p></div>
        </div>
      </div>

      <div className="reports-grid">
        <div className="card chart-card">
          <h3>🏷️ Top Skills Across Candidates</h3>
          <canvas ref={skillsRef}></canvas>
        </div>
        <div className="card chart-card">
          <h3>📊 Experience Distribution</h3>
          <canvas ref={expRef}></canvas>
        </div>
        <div className="card chart-card">
          <h3>🎓 Education Levels</h3>
          <canvas ref={eduRef}></canvas>
        </div>
        <div className="card chart-card">
          <h3>📅 Resumes Uploaded Over Time</h3>
          <canvas ref={timelineRef}></canvas>
        </div>
      </div>

      <div className="export-section">
        <div className="card">
          <div>
            <h3>📥 Export Data</h3>
            <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Download candidate data and reports</p>
          </div>
            <button className="btn btn-primary" onClick={() => {
              const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
              const user = JSON.parse(localStorage.getItem('resumeai_user'));
              if (user?.token) {
                window.open(`${API_URL}/export/pdf?token=${user.token}`, '_blank');
              } else {
                showToast('Please log in to export data.', 'error');
              }
            }}>📄 Export PDF</button>
            <button className="btn btn-secondary" onClick={() => {
              const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
              const user = JSON.parse(localStorage.getItem('resumeai_user'));
              if (user?.token) {
                window.open(`${API_URL}/export/csv?token=${user.token}`, '_blank');
              } else {
                showToast('Please log in to export data.', 'error');
              }
            }}>📊 Export CSV</button>
        </div>
      </div>
    </div>
  );
}
