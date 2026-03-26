// frontend/src/views/pages/RoleSelection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/RoleSelection.css';

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="role-selection-page">
      <div className="role-selection-container">
        <div className="role-header">
          <h1>Welcome to Real Estate Portal</h1>
          <p>Please select how you want to proceed</p>
        </div>

        <div className="role-cards">
          {/* Client Card */}
          <div className="role-card client-card" onClick={() => navigate('/home')}>
            <div className="card-badge-placeholder"></div>
            <div className="role-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <h2>Proceed as Client</h2>
            <p>Browse properties without login</p>
            <div className="role-arrow">→</div>
          </div>

          {/* Admin Card */}
          <div className="role-card admin-card" onClick={() => navigate('/login')}>
            <div className="role-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h2>Proceed as Admin</h2>
            <p>Secure login required</p>
            <div className="role-arrow">→</div>
            <div className="lock-badge">🔒 Login Required</div>
          </div>
        </div>

        <div className="role-footer">
          <p>Clients can browse freely • Admins need credentials</p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;