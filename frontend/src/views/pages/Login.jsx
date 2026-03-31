// frontend/src/views/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../controllers/useAuth';
import '../../styles/Login.css';

const Login = () => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const { login, signUp, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="page">
      <div className="login-box">
        <button onClick={() => navigate('/role-selection')} className="back-button">
          ← Back
        </button>

        <div className="login-header">
          <h1>Admin Login</h1>
          <p>Enter your credentials to access the dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="field role-display">
            <div className="role-badge">
              <span className="role-indicator admin">🔐 Admin Access Only</span>
            </div>
          </div>

          <div className="field">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
            />
            <label>Email Address</label>
          </div>

          <div className="field">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
            />
            <label>Password</label>
          </div>
          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;