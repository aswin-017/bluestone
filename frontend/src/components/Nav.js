import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import '../assets/css/Nav.css';

const Nav = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  const loginRegLink = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/login" className="nav-link">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/signup" className="nav-link">
          Sign Up
        </Link>
      </li>
    </ul>
  );

  const userLink = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <Link to="/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <a href="/" onClick={handleLogout} className="nav-link">
          Logout
        </a>
      </li>
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark rounded">


      <div
        className="collapse navbar-collapse justify-content-md-center"
        id="navbarsExample10"
      >
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
        </ul>
        {isLoggedIn ? userLink : loginRegLink}
        <span className="company-name">Bluestone</span>
      </div>
    </nav>
  );
};

export default Nav;
