import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have an AuthContext for handling authentication
import '../assets/css/Login.css'; // Import the CSS file for styling

const Login = () => {
  const { login } = useAuth(); // Assuming useAuth provides a login function
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(formData.email, formData.password); // Assuming login function sends a POST request to backend
      navigate('/dashboard'); // Redirect to dashboard after successful login
    } catch (error) {
      console.error('Login Error:', error);
      // Handle login error (display error message, etc.)
      alert('Login failed. Please check your credentials.'); // Example error handling
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </form>
  );
};

export default Login;
