import React, { useEffect, useState } from 'react';
import { toastEvent } from './toastState';

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleShow = (e) => {
      const id = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      setToasts((prev) => [...prev, { id, ...e.detail, show: false }]);
      
      // Trigger animation
      setTimeout(() => {
        setToasts(prev => prev.map(t => t.id === id ? { ...t, show: true } : t));
      }, 10);

      // Remove after 3 seconds
      setTimeout(() => {
        setToasts(prev => prev.map(t => t.id === id ? { ...t, show: false } : t));
        setTimeout(() => {
          setToasts(prev => prev.filter(t => t.id !== id));
        }, 400); // Wait for transition
      }, 3000);
    };

    toastEvent.addEventListener('show', handleShow);
    return () => toastEvent.removeEventListener('show', handleShow);
  }, []);

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type} ${toast.show ? 'show' : ''}`}>
          <span className="toast-icon">
            {toast.type === 'success' ? '✅' : toast.type === 'error' ? '❌' : 'ℹ️'}
          </span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
