import React from 'react';
import { FaSearch, FaBell, FaEnvelope, FaUserCircle } from 'react-icons/fa';
import '../assets/css/Header.css';

const Header = ({ loggedInUser }) => {
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
        <span className="user-name">{loggedInUser?.firstName} {loggedInUser?.lastName}</span>
      </div>
    </header>
  );
};

export default Header;
