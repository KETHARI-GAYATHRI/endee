import React, { useState } from 'react';
import { CandidateContext } from './CandidateContextDefinition';

export function CandidateProvider({ children }) {
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [uploadedResumes, setUploadedResumes] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCandidates = async () => {
    const userJson = localStorage.getItem('resumeai_user');
    if (!userJson) return;

    setLoading(true);
    setError(null);
    try {
      const user = JSON.parse(userJson);
      if (!user?.token) return;

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/candidates`, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      
      if (response.status === 401) {
        setError('Session expired. Please login again.');
        return;
      }

      const data = await response.json();
      if (response.ok) {
        setCandidates(data.map(c => ({
          ...c,
          initials: c.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
          scoreClass: (c.matchScore || c.score) >= 80 ? 'score-high' : (c.matchScore || c.score) >= 60 ? 'score-medium' : 'score-low',
          score: c.matchScore || c.score,
          skills: c.Skills ? c.Skills.map(s => s.name) : [],
          questions: c.CandidateQuestions ? c.CandidateQuestions.map(q => q.question) : [],
          resume: c.Resumes?.[0]?.file_name || 'No resume content available.'
        })));
      } else {
        setError(data.message || 'Failed to fetch candidates');
      }
    } catch (err) {
      console.error('Fetch candidates error:', err);
      setError('Connection refused by backend');
    } finally {
      setLoading(false);
    }
  };

  const fetchUploadHistory = async () => {
    const userJson = localStorage.getItem('resumeai_user');
    if (!userJson) return;

    try {
      const user = JSON.parse(userJson);
      if (!user?.token) return;

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/resumes/upload-history`, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setUploadedResumes(data);
      }
    } catch (err) {
      console.error('Fetch history error:', err);
    }
  };

  React.useEffect(() => {
    fetchCandidates();
    fetchUploadHistory();
  }, []);

  const toggleStatus = async (id, newStatus) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const user = JSON.parse(localStorage.getItem('resumeai_user'));
      if (!user?.token) return;

      const response = await fetch(`${API_URL}/candidates/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchCandidates();
      }
    } catch (error) {
      console.error('Update status error:', error);
    }
  };

  const toggleShortlist = (id) => {
    const candidate = candidates.find(c => c.id === id);
    const newStatus = candidate.status === 'shortlisted' ? 'none' : 'shortlisted';
    toggleStatus(id, newStatus);
  };

  const toggleReject = (id) => {
    const candidate = candidates.find(c => c.id === id);
    const newStatus = candidate.status === 'rejected' ? 'none' : 'rejected';
    toggleStatus(id, newStatus);
  };

  const performSearch = async (query, location = '') => {
    setSearchQuery(query);
    if (!query && !location) {
      setFilteredCandidates(candidates);
      return;
    }

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const url = new URL(`${API_URL}/candidates/search`);
      if (query) url.searchParams.append('q', query);
      if (location) url.searchParams.append('l', location);

      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('resumeai_user'))?.token}` }
      });
      const data = await response.json();
      if (response.ok) {
        const processed = data.map(c => ({
          ...c,
          initials: c.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
          scoreClass: (c.matchScore || c.score) >= 80 ? 'score-high' : (c.matchScore || c.score) >= 60 ? 'score-medium' : 'score-low',
          score: c.matchScore || c.score,
          skills: c.Skills ? c.Skills.map(s => s.name) : [],
          questions: c.CandidateQuestions ? c.CandidateQuestions.map(q => q.question) : [],
          resume: c.Resumes?.[0]?.file_name || 'No resume content available.'
        }));
        setFilteredCandidates(processed);
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  // Sync filtered candidates when candidates array changes
  React.useEffect(() => {
    if (!searchQuery) {
      setFilteredCandidates(candidates);
    }
  }, [candidates, searchQuery]);


  const addUploadedResume = (data) => {
    // Just refresh lists instead of manual state update to avoid temporary duplicates
    fetchCandidates();
    fetchUploadHistory();
  };

  const deleteUploadedResume = (id) => {
    setUploadedResumes(prev => prev.filter(r => r.id !== id));
  };

  return (
    <CandidateContext.Provider value={{
      candidates,
      filteredCandidates,
      searchQuery,
      performSearch,
      toggleShortlist,
      toggleReject,
      uploadedResumes,
      addUploadedResume,
      deleteUploadedResume,
      loading,
      error
    }}>
      {children}
    </CandidateContext.Provider>
  );
}
