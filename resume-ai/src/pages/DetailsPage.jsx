import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCandidates } from '../context/CandidateContextDefinition';
import { showToast } from '../components/toastState';

export default function DetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { candidates, toggleShortlist, toggleReject } = useCandidates();

  const candidate = candidates.find(c => c.id === parseInt(id));

  if (!candidate) {
    return (
      <div className="page active" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
        <h2>Candidate Not Found</h2>
        <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={() => navigate('/results')}>Return to Results</button>
      </div>
    );
  }

  const currentStatus = candidate.status !== 'none' ? candidate.status : (candidate.autoStatus || 'none');
  const matchResult = candidate.MatchResults?.[0];
  const matchedSkills = matchResult ? JSON.parse(matchResult.matched_skills) : [];
  const missingSkills = matchResult ? JSON.parse(matchResult.missing_skills) : [];

  const handleShortlist = () => {
    toggleShortlist(candidate.id);
    if (candidate.status !== 'shortlisted') {
      showToast(`${candidate.name} has been shortlisted! ⭐`, 'success');
    } else {
      showToast(`${candidate.name} removed from shortlist.`, 'info');
    }
  };

  const handleReject = () => {
    toggleReject(candidate.id);
    if (candidate.status !== 'rejected') {
      showToast(`${candidate.name} has been rejected.`, 'error');
    } else {
      showToast(`${candidate.name} rejection removed.`, 'info');
    }
  };

  const createMarkup = (html) => {
    return { __html: html.replace(/\n/g, '<br>') };
  };

  return (
    <div className="page active" id="details-page">
      <div className="details-back" onClick={() => navigate('/results')}>
        ← Back to Search Results
      </div>
      <div className="details-grid">
        <div className="details-main">
          <div className="card detail-card">
            <div className="candidate-header">
              <div className="large-avatar">{candidate.initials}</div>
              <div className="header-info">
                <h1>{candidate.name}</h1>
                <p>{candidate.title}</p>
                <div className="contact-row">
                  <span>✉️ {candidate.email}</span>
                  <span>📱 {candidate.phone}</span>
                  <span>📍 {candidate.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="card detail-card">
            <h3 className="section-title">🏷️ Skills</h3>
            <div className="skills-tags" style={{ marginBottom: 0 }}>
              {candidate.skills.map((s, idx) => {
                const isMatched = matchedSkills.some(ms => ms.toLowerCase() === s.toLowerCase());
                return (
                  <span key={idx} className={`pill ${isMatched ? 'pill-success' : 'pill-blue'}`} style={{ 
                    backgroundColor: isMatched ? 'rgba(16, 185, 129, 0.1)' : 'rgba(96, 165, 250, 0.1)',
                    color: isMatched ? '#065f46' : 'var(--primary)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    border: isMatched ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(96, 165, 250, 0.2)'
                  }}>
                    {s}{isMatched && ' ✓'}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="card detail-card">
            <h3 className="section-title">📝 Resume Preview</h3>
            <div className="resume-text" dangerouslySetInnerHTML={createMarkup(candidate.resume)}></div>
          </div>
        </div>

        <div className="details-sidebar">
          <div className="card ai-summary">
            <div className="ai-badge">🤖 AI-Generated Summary</div>
            <p>{candidate.summary}</p>
            <div className="ai-questions">
              <h4>💡 Suggested Interview Questions</h4>
              <ol>
                {candidate.questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="card">
            <h3 className="section-title">📊 AI Relevance Score</h3>
            <div style={{ textAlign: 'center', margin: '16px 0' }}>
              <div style={{
                fontSize: '3rem', 
                fontWeight: 700, 
                color: (matchResult?.score || candidate.score) >= 80 ? 'var(--success)' : (matchResult?.score || candidate.score) >= 60 ? 'var(--warning)' : 'var(--danger)'
              }}>
                {matchResult?.score || candidate.score}%
              </div>
              <p style={{ color: 'var(--text-light)', fontSize: '0.85rem', marginBottom: '12px' }}>
                Classification: <strong>{matchResult?.classification || 'Processing'}</strong>
              </p>
              
              {missingSkills.length > 0 && (
                <div style={{ textAlign: 'left', marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
                  <h4 style={{ fontSize: '0.85rem', color: 'var(--danger)', marginBottom: '8px' }}>❌ Missing Critical Skills</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {missingSkills.map(s => (
                      <span key={s} className="pill pill-danger">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="card">
            <h3 className="section-title">⚡ Actions</h3>
            <div className="detail-actions">
              <button 
                className={`btn ${currentStatus === 'shortlisted' ? 'btn-success' : 'btn-success'}`}
                onClick={handleShortlist}
              >
                {currentStatus === 'shortlisted' ? '⭐ Shortlisted — Click to Undo' : '⭐ Shortlist Candidate'}
              </button>
              <button 
                className={`btn ${currentStatus === 'rejected' ? 'btn-danger' : 'btn-danger'}`}
                onClick={handleReject}
              >
                {currentStatus === 'rejected' ? '✖ Rejected — Click to Undo' : '✖ Reject Candidate'}
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => {
                  if (candidate.Resumes && candidate.Resumes.length > 0) {
                    const filePath = candidate.Resumes[0].file_path;
                    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
                    const BASE_URL = API_URL.replace('/api', '');
                    window.open(`${BASE_URL}/${filePath}`, '_blank');
                  } else {
                    showToast('No PDF file found for this candidate.', 'warning');
                  }
                }}
              >
                📥 Download Resume PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
