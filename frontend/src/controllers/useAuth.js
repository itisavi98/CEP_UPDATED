// frontend/src/controllers/useAuth.js
// Auth via Supabase Auth — no MongoDB/JWT involved.

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);
  const [user, setUser]       = useState(null);
  const navigate              = useNavigate();

  // ── Restore session on mount & listen for auth changes ──────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // ── Login ────────────────────────────────────────────────────
  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setUser(data.user);
    setLoading(false);
    navigate('/admin');
  };

  // ── Google Login ──────────────────────────────────────────────
  const googleLogin = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/admin`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    }
    // OAuth will redirect to /admin
  };

  // ── Create test account (dev only) ───────────────────────────
  const signUp = async (email, password) => {
    setLoading(true);
    setError(null);

    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    alert('Account created! Check your email to confirm, or log in if email confirmation is disabled.');
  };

  // ── Logout ───────────────────────────────────────────────────
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/login');
  };

  // ── Get access token for backend API calls ───────────────────
  const getToken = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.access_token ?? null;
  };

  return { login, signUp, logout, googleLogin, loading, error, user, getToken };
};