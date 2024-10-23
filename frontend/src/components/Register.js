import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; // Import CSS za stilizacijo

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/users/save', {
        name: name,
        email: email,
        password: password
      });
      setMessage('User registered successfully!');
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error('Registration error:', error);
      setMessage('Error registering user. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input-field"
      />
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
      <button onClick={handleRegister} className="register-button">Register</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Register;
