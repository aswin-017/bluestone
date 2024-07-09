import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import SideNav from './components/SideNav';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import UserDashboard from './components/UserDashboard';
import EnquiryForm from './components/EnquiryForm';
import Header from './components/Header';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUserDetails from './components/admin/AdminUserDetails';
import { ThemeProvider, useTheme } from './components/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const savedUser = localStorage.getItem('loggedInUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loggedInAdmin, setLoggedInAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem('loggedInAdmin');
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  useEffect(() => {
    if (loggedInUser) {
      localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    } else {
      localStorage.removeItem('loggedInUser');
    }

    if (loggedInAdmin) {
      localStorage.setItem('loggedInAdmin', JSON.stringify(loggedInAdmin));
    } else {
      localStorage.removeItem('loggedInAdmin');
    }
  }, [loggedInUser, loggedInAdmin]);

  return (
    <ThemeProvider>
      <AppContent loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} loggedInAdmin={loggedInAdmin} setLoggedInAdmin={setLoggedInAdmin} />
    </ThemeProvider>
  );
};

const AppContent = ({ loggedInUser, setLoggedInUser, loggedInAdmin, setLoggedInAdmin }) => {
  const { theme } = useTheme();

  return (
    <Router>
      <div className={`app-container ${theme}`}>
        {loggedInAdmin ? (
          <div className="flex-container">
            <SideNav setLoggedInAdmin={setLoggedInAdmin} />
            <div className="main-content">
              <Header loggedInAdmin={loggedInAdmin} />
              <Routes>
                <Route path="/admin/login" element={<AdminLogin setLoggedInAdmin={setLoggedInAdmin} />} />
                <Route path="/admin/dashboard" element={<AdminDashboard loggedInAdmin={loggedInAdmin} />} />
                <Route path="/admin/userdetails" element={<AdminUserDetails />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" />} />
              </Routes>
            </div>
          </div>
        ) : loggedInUser ? (
          <div className="flex-container">
            <SideNav setLoggedInUser={setLoggedInUser} />
            <div className="main-content">
              <Header loggedInUser={loggedInUser} />
              <Routes>
                <Route path="/" element={<Navigate to="/user/dashboard" />} />
                <Route path="/user/dashboard" element={<UserDashboard loggedInUser={loggedInUser} />} />
                <Route path="/enquiryform" element={<EnquiryForm loggedInUser={loggedInUser} />} />
                <Route path="*" element={<Navigate to="/user/dashboard" />} />
              </Routes>
            </div>
          </div>
        ) : (
          <>
            <Nav />
            <div className={`content ${theme}`}>
              <Routes>
                <Route
                  path="/login"
                  element={
                    <ProtectedRoute loggedInUser={loggedInUser}>
                      <Login setLoggedInUser={setLoggedInUser} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/signup"
                  element={
                    <ProtectedRoute loggedInUser={loggedInUser}>
                      <SignUp />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/login"
                  element={
                    <ProtectedRoute loggedInAdmin={loggedInAdmin}>
                      <AdminLogin setLoggedInAdmin={setLoggedInAdmin} />
                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<Home />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
