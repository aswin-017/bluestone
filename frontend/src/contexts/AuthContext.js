import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setIsLoggedIn(true);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error logging in:', error.response?.data?.error || error.message);
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
