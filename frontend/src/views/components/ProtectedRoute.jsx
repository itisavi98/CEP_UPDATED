// frontend/src/views/components/ProtectedRoute.jsx
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../config/supabase';

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(undefined); // undefined = still loading

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, []);

  if (session === undefined) return null; // wait before deciding
  return session ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;