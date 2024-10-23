import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ isAuthenticated, onLogout }) {
  return (
    <nav className="navbar">
      <h2 className="logo">To-Do App</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={onLogout}>Logout</button></li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
