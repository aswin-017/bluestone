// src/components/admin/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = ({ loggedInAdmin }) => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('/api/admin/usercount');
        setUserCount(response.data.count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Welcome, {loggedInAdmin.email}</h2>
      <div>
        <h3>User Statistics</h3>
        <p>Total Users: {userCount}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
