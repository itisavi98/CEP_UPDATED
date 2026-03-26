// frontend/src/controllers/useAuth.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/supabaseAuthService';

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');
  const navigate = useNavigate();

  const login = async (email, password) => {
    setError('');
    setLoading(true);
    const trimmedEmail = (email || '').trim().toLowerCase();

    // DEV-only demo credentials — never exposed in production builds
    if (import.meta.env.DEV) {
      const demoEmail    = import.meta.env.VITE_DEMO_ADMIN_EMAIL    || 'admin@dreamland.com';
      const demoPassword = import.meta.env.VITE_DEMO_ADMIN_PASSWORD || 'admin123';

      if (
        (trimmedEmail === demoEmail || trimmedEmail === 'admin') &&
        password === demoPassword
      ) {
        const data = {
          token: 'dev-demo-admin-token',
          user: {
            id: 'demo-admin',
            email: demoEmail,
            role: 'admin',
          },
        };
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        setLoading(false);
        navigate('/admin');
        return;
      }
    }

    try {
      const data = await authService.login({ email: trimmedEmail, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Unable to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  const signUp = async (email, password) => {
    setError('');
    setLoading(true);
    try {
      await authService.signUp({ email, password });
      alert('Account created successfully. You can now login.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = () => !!localStorage.getItem('token');

  const getUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  return { login, logout, signUp, loading, error, isAuthenticated, getUser };
}