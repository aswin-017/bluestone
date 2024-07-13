// src/components/admin/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/css/AdminDashboard.css';

const AdminDashboard = ({ loggedInAdmin }) => {
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/usercount');
        setUserCount(response.data.count);
      } catch (error) {
        console.error('Error fetching user count:', error);
      }
    };

    fetchUserCount();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Welcome, {loggedInAdmin ? loggedInAdmin.email : 'Admin'}</h2>
      <div>
        <h3>User Statistics</h3>
        <p>Total Users: {userCount}</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
