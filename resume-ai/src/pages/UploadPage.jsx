import React, { useRef, useState } from 'react';
import { useCandidates } from '../context/CandidateContextDefinition';
import { showToast } from '../components/toastState';
import { CloudUpload } from 'lucide-react';

export default function UploadPage() {
  const { uploadedResumes, addUploadedResume, deleteUploadedResume } = useCandidates();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [lastResult, setLastResult] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = async (files) => {
    const fileList = Array.from(files);
    if (fileList.length === 0) return;

    setUploading(true);
    setUploadProgress(10);
    setLastResult(null);

    try {
      const user = JSON.parse(localStorage.getItem('resumeai_user'));

      for (let i = 0; i < fileList.length; i++) {
        const formData = new FormData();
        formData.append('resume', fileList[i]);

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
        const response = await fetch(`${API_URL}/resumes/upload`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${user?.token}`
          },
          body: formData
        });

        let data;
        try {
          data = await response.json();
        } catch (err) {
          // If response is not JSON (like a 500 HTML error page)
          console.error('Non-JSON response received:', err);
          showToast(`Server returned an invalid response (Error ${response.status})`, 'error');
          continue;
        }

        if (response.ok) {
          setUploadProgress(((i + 1) / fileList.length) * 100);
          addUploadedResume(data);
          setLastResult(data);
        } else {
          showToast(data.message || 'Error uploading file', 'error');
        }
      }

      showToast(`${fileList.length} resume(s) processed with AI evaluation!`, 'success');
      setTimeout(() => setUploading(false), 1500);

    } catch (error) {
      console.error('Upload Error:', error);
      showToast('Error connecting to server', 'error');
      setUploading(false);
    }
  };

  return (
    <div className="page active">
      <div className="upload-page-content">
        <div className="dashboard-header">
          <div>
            <h1>📤 Upload Resumes</h1>
            <p>Upload candidate resumes for AI-powered parsing and analysis</p>
          </div>
        </div>

        <div className="card">
          <div
            className={`drop-zone ${isDragging ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="upload-icon"><CloudUpload size={48} /></div>
            <h3>Drag & Drop Resumes Here</h3>
            <p>or click to browse files from your computer</p>
            <button className="btn btn-secondary btn-sm" type="button" onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>
              Browse Files
            </button>
            <p className="file-types">Supported: PDF, DOCX, DOC, TXT — Max 10MB per file</p>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept=".pdf,.docx,.doc,.txt"
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />
          </div>

          {uploading && (
            <div className="upload-progress">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span id="upload-status">{uploadProgress === 100 ? '✅ Evaluation complete!' : 'AI is analyzing resumes...'}</span>
                <span id="upload-percent">{Math.round(uploadProgress)}%</span>
              </div>
              <div className="progress-bar-wrap">
                <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
              </div>
            </div>
          )}

          {lastResult && !uploading && (
            <div className="match-result-card animate-slide-up" style={{ marginTop: '20px', padding: '20px', backgroundColor: 'var(--bg-light)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                <div>
                  <h3 style={{ margin: 0 }}>🎯 AI Evaluation for {lastResult.candidate.name}</h3>
                  <p style={{ color: 'var(--text-light)', fontSize: '0.9rem', margin: '4px 0 0' }}>Classification: <strong>{lastResult.matchResult.classification}</strong></p>
                </div>
                <div className={`score-badge ${(lastResult.matchResult.score >= 80) ? 'high' : (lastResult.matchResult.score >= 60) ? 'medium' : 'low'}`}
                  style={{ padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  {lastResult.matchResult.score}% Match
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div className="skill-box">
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--success-color)', marginBottom: '8px' }}>✅ Matched Skills</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {JSON.parse(lastResult.matchResult.matched_skills).map(s => (
                      <span key={s} className="pill pill-success">{s}</span>
                    ))}
                  </div>
                </div>
                <div className="skill-box">
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--danger-color)', marginBottom: '8px' }}>❌ Missing Skills</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {JSON.parse(lastResult.matchResult.missing_skills).map(s => (
                      <span key={s} className="pill pill-danger">{s}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        <div className="upload-table card" style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3>📋 Uploaded Resumes</h3>
            <span className="badge badge-blue">{uploadedResumes.length} Total</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>File</th>
                <th>Upload Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {uploadedResumes.map((resume) => (
                <tr key={resume.id} style={{ animation: 'fadeIn 0.4s ease' }}>
                  <td><strong>{resume.name}</strong></td>
                  <td>{resume.file}</td>
                  <td>{resume.date}</td>
                  <td>
                    <div className="status">
                      <span className={`status-dot ${resume.status}`}></span>
                      {resume.status.charAt(0).toUpperCase() + resume.status.slice(1)}
                    </div>
                  </td>
                  <td>
                    <div className="actions">
                      <button className="btn btn-outline btn-sm" onClick={() => showToast('Resume preview coming soon!', 'info')}>View</button>
                      <button className="btn btn-danger btn-sm" onClick={() => { deleteUploadedResume(resume.id); showToast('Resume deleted.', 'info'); }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {uploadedResumes.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '32px' }}>
                    <p style={{ color: 'var(--text-light)' }}>No resumes uploaded yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
