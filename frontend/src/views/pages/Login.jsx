// frontend/src/views/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../controllers/useAuth';
import '../../styles/Login.css';

const Login = () => {
  const [email, setEmail]           = useState('');
  const [password, setPassword]     = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login, googleLogin, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="page">
      <div className="login-box">
        <button onClick={() => navigate('/home')} className="back-button">
          ← Back
        </button>

        <div className="login-header">
          <h1>Login</h1>
          <p>Welcome back — sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="form">

          <div className="field role-display">
            <div className="role-badge">
              <span className="role-indicator admin">🔐 Admin Access Only</span>
            </div>
          </div>

          <div className="field email-field">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
            />
            <label>Email</label>
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
            {loading ? 'Logging in...' : 'Log in'}
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <button type="button" onClick={googleLogin} className="google-btn" disabled={loading}>
            Continue with Google
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;