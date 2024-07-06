import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have an AuthContext for handling authentication
import '../assets/css/SignUp.css'; // Import the CSS file for styling

const SignUp = () => {
  const { signup } = useAuth(); // Assuming useAuth provides a signup function
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signup(formData); // Assuming signup function sends a POST request to backend
      navigate('/login'); // Redirect to login page after successful signup
    } catch (error) {
      console.error('Signup Error:', error);
      // Handle signup error (display error message, etc.)
      alert('Signup failed. Please try again.'); // Example error handling
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" required />
      <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" required />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
      <button type="submit">Sign Up</button>
      <p>Already have an account? <a href="/login">Login</a></p>
    </form>
  );
};

export default SignUp;
