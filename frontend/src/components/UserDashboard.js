import '../assets/css/UserDashboard.css';
import React from 'react';

const UserDashboard = ({ loggedInUser }) => {
  return (
    <div className="dashboard-container">
      <h1>Welcome, {loggedInUser?.firstName} {loggedInUser?.lastName}!</h1>
    </div>
  );
};

export default UserDashboard;
