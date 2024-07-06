import React from 'react';
import '../assets/css/Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <h2>Welcome to Bluestone CRM</h2>
      <p>This is your dashboard.</p>
      <div className="dashboard-info">
        <h3>Your Dashboard Information</h3>
        <p>Here's some information about your dashboard content.</p>
      </div>
      {/* Add more content as needed */}
    </div>
  );
};

export default Home;
