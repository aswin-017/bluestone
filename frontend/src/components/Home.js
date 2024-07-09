import React from 'react';
import { useTheme } from './ThemeContext'; // Adjust the import path as necessary
import '../assets/css/Home.css';

const Home = () => {
  const { theme } = useTheme();

  return (
    <div className={`home-container ${theme}`}>
      <h2>Welcome to Bluestone CRM</h2>
      <p>This is your dashboard.</p>
      <div className="dashboard-info">
        <h3>Your Dashboard Information</h3>
        <p>Here's some information about your dashboard content.</p>
      </div>
    </div>
  );
};

export default Home;
