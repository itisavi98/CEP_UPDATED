// frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Views — Pages
import MainSite       from './views/pages/MainSite';
import RoleSelection  from './views/pages/RoleSelection';
import Login          from './views/pages/Login';
import AdminDashboard from './views/pages/AdminDashboard';
import ProtectedRoute from './views/components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"               element={<MainSite />} />
        <Route path="/home"           element={<MainSite />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/login"          element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;