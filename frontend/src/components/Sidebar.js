import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h2>To-Do App</h2>
      </div>
      <ul className="sidebar-menu">
        <li><Link to="/dashboard"><i className="fas fa-home"></i> Dashboard</Link></li>
        <li><Link to="/tasks"><i className="fas fa-tasks"></i> Tasks</Link></li>
        <li><Link to="/statistics"><i className="fas fa-chart-bar"></i> Statistics</Link></li>
        <li><Link to="/calendar"><i className="fas fa-calendar"></i> Calendar</Link></li>
        <li><Link to="/profile"><i className="fas fa-user"></i> Profile</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
