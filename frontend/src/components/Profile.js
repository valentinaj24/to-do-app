import React, { useEffect, useState } from 'react';
import './Profile.css'; // CSS za stilizacijo

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Pridobi uporabniške podatke iz localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parsiramo string in nastavimo kot objekt
    }
  }, []);

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
    </div>
  );
}

export default Profile;
