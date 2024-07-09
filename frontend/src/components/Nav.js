import '../assets/css/Nav.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from './ThemeContext'; // Import useTheme

const Nav = () => {
  const { theme, toggleTheme } = useTheme(); // Use theme and toggleTheme from ThemeContext

  return (
    <nav className="navbar">
      <div className="company-name">Bluestone</div>
      <div className="nav-links">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/signup">Sign Up</Link>
          </li>
          <li className="nav-item">
            <label className="switch">
              <input
                type="checkbox"
                className="input__check"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <span className="slider"></span>
            </label>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
