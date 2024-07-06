import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Verify token validity on the server side if necessary
          const response = await axios.get('http://localhost:3000/api/users/profile');
          setIsLoggedIn(true);
          setUser(response.data.user);
        } catch (error) {
          console.error('Error checking token:', error);
          logout(); // Clear invalid token or handle as needed
        }
      }
    };

    checkLoggedIn();
  }, []); // Empty dependency array ensures this runs only once on component mount

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      setUser(response.data.user);
    } catch (error) {
      alert('Error logging in:', error.response?.data?.error || error.message);
    } 
  };

  const signup = async (newUser) => {
    try {
      await axios.post('http://localhost:3000/api/users/signup', newUser);
    } catch (error) {
      console.error('Error signing up:', error.response?.data?.error || error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, signup, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
