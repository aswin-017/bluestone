import React from 'react';
import { FaSearch, FaBell, FaEnvelope, FaUserCircle } from 'react-icons/fa';
import '../assets/css/Header.css';

const Header = ({ loggedInUser, loggedInAdmin }) => {
  const user = loggedInUser || loggedInAdmin;

  return (
    <header className="header">
      <div className="header-left">
        <FaSearch className="icon" />
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>
      <div className="header-right">
        <FaBell className="icon" />
        <FaEnvelope className="icon" />
        <FaUserCircle className="icon" />
        <span className="user-name">{user?.firstName} {user?.lastName}</span>
      </div>
    </header>
  );
};

export default Header;
