import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../components/toastState';
import { Zap, FileText } from 'lucide-react';

export default function LoginPage() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast('Please fill in all fields.', 'error');
      return;
    }

    if (!isLoginMode) {
      if (!name) {
        showToast('Please enter your full name.', 'error');
        return;
      }
      if (password.length < 6) {
        showToast('Password must be at least 6 characters.', 'error');
        return;
      }
      if (password !== confirmPassword) {
        showToast('Passwords do not match.', 'error');
        return;
      }

      const res = await signup(name, email, password);
      if (res.success) {
        showToast('Account created successfully! Please sign in.', 'success');
        setIsLoginMode(true);
        setPassword('');
        setConfirmPassword('');
      } else {
        showToast(res.message, 'error');
      }
    } else {
      const res = await login(email, password);
      if (res.success) {
        showToast(`Welcome back, ${res.user.name}!`, 'success');
        navigate('/dashboard');
      } else {
        showToast(res.message, 'error');
      }
    }
  };


  return (
    <div className="login-page active">
      <div className="login-container">
        <div className="login-illustration">
          <div className="illustration-content">
            <div className="illustration-icon">📄</div>
            <h2>Welcome to ResumeAI</h2>
            <p>Streamline your hiring process with AI-powered resume analysis. Find the perfect candidates in seconds, not hours.</p>
          </div>
        </div>
        <div className="login-form-section">
          <div className="logo">
            <div className="logo-icon"><Zap size={22} color="white" fill="white" /></div>
            <span>ResumeAI</span>
          </div>
          <h1>{isLoginMode ? 'HR Login' : 'Create Account'}</h1>
          <p className="subtitle">{isLoginMode ? 'Sign in to your dashboard' : 'Start your free trial today'}</p>
          
          <form onSubmit={handleAuth}>
            {!isLoginMode && (
              <div className="form-group">
                <label>Full Name</label>
                <span className="input-icon">👤</span>
                <input type="text" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" />
              </div>
            )}
            
            <div className="form-group">
              <label>Email Address</label>
              <span className="input-icon">✉️</span>
              <input type="email" placeholder="you@company.com" required value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <span className="input-icon">🔒</span>
              <input 
                type="password" 
                placeholder="••••••••" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                autoComplete={isLoginMode ? "current-password" : "new-password"} 
              />
            </div>
            
            {!isLoginMode && (
              <div className="form-group">
                <label>Confirm Password</label>
                <span className="input-icon">🔒</span>
                <input type="password" placeholder="••••••••" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} autoComplete="new-password" />
              </div>
            )}
            
            {isLoginMode && (
              <div className="form-options">
                <label><input type="checkbox" /> Remember me</label>
                <a href="#" onClick={(e) => { e.preventDefault(); showToast('Password reset link sent!', 'info'); }}>Forgot Password?</a>
              </div>
            )}
            
            <button type="submit" className="btn btn-primary">
              {isLoginMode ? 'Sign In' : 'Create Account'}
            </button>
            
            <div className="divider">or continue with</div>
            <div className="social-login">
              <button 
                type="button" 
                className="social-btn" 
                title="Continue with Google" 
                onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
              >
                🔵 Google
              </button>
            </div>
            
            <div className="form-footer">
              <span>{isLoginMode ? "Don't have an account?" : 'Already have an account?'}</span>
              <a href="#" onClick={(e) => { e.preventDefault(); setIsLoginMode(!isLoginMode); }} style={{ marginLeft: '5px' }}>
                {isLoginMode ? 'Sign Up' : 'Sign In'}
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
