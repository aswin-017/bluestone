import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.first_name} {user?.last_name}</p>
      {/* Display additional user information or data here */}
    </div>
  );
};

export default Dashboard;
