import React, { useState } from 'react';
import { useCandidates } from '../context/CandidateContextDefinition';
import CandidateCard from '../components/CandidateCard';

export default function ResultsPage() {
  const { filteredCandidates, searchQuery, loading, error } = useCandidates();
  const [sortMethod, setSortMethod] = useState('relevance');

  const shortlistedCount = filteredCandidates.filter(c => c.status === 'shortlisted' || c.autoStatus === 'shortlisted').length;
  // Approximation for total candidates rejecting if they aren't in filtered list
  const reviewCount = filteredCandidates.length - shortlistedCount;

  // Clone array for sorting to avoid mutating state directly
  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortMethod === 'relevance') return (b.matchCount || b.score) - (a.matchCount || a.score);
    if (sortMethod === 'experience') return parseInt(b.experience) - parseInt(a.experience);
    if (sortMethod === 'skills') return b.skills.length - a.skills.length;
    return 0;
  });

  return (
    <div className="page active">
      <div className="results-header">
        <h2>
          🔍 <span>{filteredCandidates.length}</span> candidates found 
          {searchQuery && <> for "<span>{searchQuery}</span>"</>}
        </h2>
        <div className="results-sort">
          <label style={{ fontSize: '0.85rem', color: 'var(--text-medium)' }}>Sort by:</label>
          <select value={sortMethod} onChange={(e) => setSortMethod(e.target.value)}>
            <option value="relevance">AI Relevance</option>
            <option value="experience">Experience</option>
            <option value="skills">Skills Match</option>
          </select>
        </div>
      </div>

      {searchQuery && filteredCandidates.length > 0 && (
        <div className="results-summary" style={{ display: 'flex', marginBottom: '16px', gap: '12px', flexWrap: 'wrap' }}>
          <span className="badge badge-green">✅ {shortlistedCount} Shortlisted</span>
          <span className="badge badge-yellow">👀 {reviewCount} Review</span>
        </div>
      )}

      <div className="results-grid">
        {loading ? (
          <div className="loader-container" style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px' }}>
            <div className="loader" style={{ fontSize: '1.2rem', color: 'var(--text-medium)' }}>AI is retrieving matching candidates...</div>
          </div>
        ) : error ? (
          <div className="error-container" style={{ textAlign: 'center', gridColumn: '1/-1', padding: '40px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
            <h3>Oops! Something went wrong</h3>
            <p style={{ color: 'var(--text-light)', marginTop: '8px' }}>{error}</p>
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="no-results">
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🔍</div>
            <h3>No matching candidates found</h3>
            <p style={{ color: 'var(--text-light)', marginTop: '8px' }}>Try different keywords or fewer filters</p>
          </div>
        ) : (
          sortedCandidates.map((candidate, index) => (
            <CandidateCard key={candidate.id} candidate={candidate} index={index} />
          ))
        )}
      </div>
    </div>
  );
}
