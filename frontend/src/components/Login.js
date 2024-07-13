import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import '../assets/css/Login.css';

const Login = ({ setLoggedInUser, setLoggedInAdmin }) => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user', // Default role set to 'user'
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, role } = formData;
    console.log('Role:', role); // Log the role to check if it's correct

    try {
      const endpoint = role === 'admin' ? 'http://localhost:3000/api/admin/login' : 'http://localhost:3000/api/users/login';
      const response = await axios.post(endpoint, { email, password });

      console.log('Response:', response.data); // Log the response to debug

      const { message, user, admin } = response.data;

      if (message === 'Login successful') {
        if (role === 'admin') {
          console.log('Admin logged in:', admin); // Log admin details to verify they are received correctly
          setLoggedInAdmin(admin);
          navigate('/admin/dashboard'); // Attempt navigation to admin dashboard
        } else {
          console.log('User logged in:', user); // Log user details to verify they are received correctly
          setLoggedInUser(user);
          navigate('/user/dashboard'); // Attempt navigation to user dashboard
        }
      } else {
        setErrorMessage(message);
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        setErrorMessage(data.message);
      } else {
        setErrorMessage('Login failed. Please try again.');
      }
      console.error('Login Error:', error);
    }
  };

  return (
    <div className={`login-form ${theme}`}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="show-password-container">
          <input
            type="checkbox"
            id="show-password"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          <label htmlFor="show-password">Show Password</label>
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
