import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCandidates } from '../context/CandidateContextDefinition';

export default function CandidateCard({ candidate, index }) {
  const { toggleShortlist, toggleReject } = useCandidates();
  const navigate = useNavigate();

  const currentStatus = candidate.status !== 'none' ? candidate.status : (candidate.autoStatus || 'none');

  let statusBadge = null;
  if (currentStatus === 'shortlisted') {
    statusBadge = <div className="candidate-status-badge shortlisted">⭐ Shortlisted</div>;
  } else if (currentStatus === 'rejected') {
    statusBadge = <div className="candidate-status-badge rejected">✖ Rejected</div>;
  } else if (currentStatus === 'review') {
    statusBadge = <div className="candidate-status-badge review">👀 Under Review</div>;
  }

  // Highlight matched skills
  const skillsHtml = candidate.skills.slice(0, 4).map((s, i) => {
    const isMatched = candidate.matchedSkills && candidate.matchedSkills.includes(s.toLowerCase());
    return <span key={i} className={isMatched ? 'matched' : ''}>{s}</span>;
  });

  const matchInfo = candidate.matchPercent !== undefined && candidate.matchPercent > 0
    ? <div className="match-score">{candidate.matchPercent}% match</div>
    : null;

  return (
    <div 
      className="candidate-card" 
      style={{ animationDelay: `${index * 0.05}s`, animation: 'slideUp 0.5s ease forwards', opacity: 0 }}
    >
      {statusBadge}
      <div className={`score-badge ${candidate.scoreClass}`}>{candidate.score}%</div>
      <div className="candidate-avatar">{candidate.initials}</div>
      <h3>{candidate.name}</h3>
      <p className="candidate-title">{candidate.title}</p>
      {matchInfo}
      <div className="skills-tags">{skillsHtml}</div>
      <div className="candidate-meta">
        <span>💼 {candidate.experience}</span>
        <span>🎓 {candidate.education}</span>
      </div>
      <div className="card-actions">
        <button 
          className="btn btn-primary btn-sm" 
          onClick={() => navigate(`/details/${candidate.id}`)}
        >
          View Full Resume
        </button>
        <button 
          className={`btn ${currentStatus === 'shortlisted' ? 'btn-success' : 'btn-outline'} btn-sm`} 
          onClick={(e) => { e.stopPropagation(); toggleShortlist(candidate.id); }}
        >
          {currentStatus === 'shortlisted' ? '⭐ Shortlisted' : '⭐ Shortlist'}
        </button>
        <button 
          className={`btn ${currentStatus === 'rejected' ? 'btn-danger' : 'btn-outline'} btn-sm`} 
          style={{ padding: '8px 10px' }}
          onClick={(e) => { e.stopPropagation(); toggleReject(candidate.id); }}
        >
          ✖
        </button>
      </div>
    </div>
  );
}
