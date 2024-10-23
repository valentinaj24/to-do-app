import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register'; // Dodana komponenta za registracijo
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Navbar from './components/Navbar'; // Navigacija
import Tasks from './components/Tasks'; // Nova stran za naloge

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Prikazujemo Navbar le na straneh, kjer ni Dashboard */}
          <Route path="/" element={<><Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} /><Home /></>} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <><Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} /><Login onLogin={handleLogin} /></>} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <><Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} /><Register /></>} />
          
          {/* Na Dashboard in Profile ne prikazujemo Navbar-a */}
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/tasks" element={isAuthenticated ? <Tasks /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
