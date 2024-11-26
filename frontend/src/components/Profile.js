import React, { useEffect, useState } from 'react';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userId = JSON.parse(storedUser).id; // Uzimanje user ID-a iz localStorage
      fetchUserProfile(userId);
      fetchMessages(userId);
    }
  }, []);

  // Dohvatanje korisničkog profila
  const fetchUserProfile = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/profile?userId=${userId}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        console.error('Error fetching user profile:', response.status);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Dohvatanje poruka za korisnika
  const fetchMessages = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/messages?userId=${userId}`);
      if (response.ok) {
        const messagesData = await response.json();
        setMessages(messagesData);
      } else {
        console.error('Error fetching messages:', response.status);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  if (!user) {
    return <div>Loading user data...</div>;
  }

  return (
      <div className="profile-container">
        <h2>User Profile</h2>
        <div className="profile-details">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
        <div className="messages-section">
          <h3>Messages</h3>
          {messages.length > 0 ? (
              <ul>
                {messages.map((message) => (
                    <li key={message.id}>
                      {message.content} - <small>{new Date(message.timestamp).toLocaleString()}</small>
                    </li>
                ))}
              </ul>
          ) : (
              <p>No messages available.</p>
          )}
        </div>
      </div>
  );
}

export default Profile;
