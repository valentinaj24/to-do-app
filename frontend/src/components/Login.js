import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Import CSS za stilizacijo

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email: email,
        password: password
      });
  
      if (response.data && response.data.id) {
        // Sačuvaj ceo objekat korisnika u localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
  
        setMessage('Login successful!');
        onLogin(); // Funkcija, ki nastavi uporabnika kot prijavljenega
        navigate('/dashboard'); // Preusmeri na Dashboard
      } else {
        setMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Error logging in. Please try again.');
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input-field"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input-field"
      />
      <button onClick={handleLogin} className="login-button">Login</button>
      {message && <p className="message">{message}</p>}
      
      {/* Dodaj del za preusmeritev na registracijo */}
      <div className="register-link">
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}

export default Login;
