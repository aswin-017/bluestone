import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext'; // Import useTheme
import '../assets/css/Login.css'; // Adjust the path as per your project structure

const Login = ({ setLoggedInUser }) => {
  const navigate = useNavigate();
  const { theme } = useTheme(); // Use theme from ThemeContext

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', formData);
      const { message, user } = response.data;

      if (message === 'Login successful') {
        setLoggedInUser(user); // Assuming your backend sends back user data upon successful login
        navigate('/user/dashboard');
      } else {
        setErrorMessage(message); // Display backend error messages
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        if (status === 404) {
          setErrorMessage(data.message); // User not found
        } else if (status === 401) {
          setErrorMessage(data.message); // Incorrect password
        } else {
          setErrorMessage('Login failed. Please try again.'); // Other errors
        }
      } else {
        setErrorMessage('Login failed. Please try again.'); // Network or server errors
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
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
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
