import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Navbar from './components/Navbar';
import Tasks from './components/Tasks';
import Statistics from './components/Statistics';
import CalendarPage from './components/CalendarPage';


import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); 
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); 
    localStorage.removeItem('user'); 
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<><Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} /><Home /></>} />
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <><Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} /><Login onLogin={handleLogin} /></>} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <><Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} /><Register /></>} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/tasks" element={isAuthenticated ? <Tasks /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/statistics" element={isAuthenticated ? <Statistics /> : <Navigate to="/login" />} />
          <Route path="/calendar" element={isAuthenticated ? <CalendarPage /> : <Navigate to="/login" />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
