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
import AdminDashboard from './components/admin/AdminDashboard';
import AdminUserDetails from './components/admin/AdminUserDetails';
import AdminSideNav from './components/admin/AdminSideNav'; // Import AdminSideNav
import { ThemeProvider, useTheme } from './components/ThemeContext';
import PrivateRoute from './components/PrivateRoute';
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
            <AdminSideNav setLoggedInAdmin={setLoggedInAdmin} /> {/* Use AdminSideNav */}
            <div className="main-content">
              <Header loggedInUser={loggedInUser} loggedInAdmin={loggedInAdmin} />
              <Routes>
                <Route path="/admin/dashboard" element={<PrivateRoute role="admin" loggedInAdmin={loggedInAdmin} element={AdminDashboard} />} />
                <Route path="/admin/userdetails" element={<PrivateRoute role="admin" loggedInAdmin={loggedInAdmin} element={AdminUserDetails} />} />
                <Route path="*" element={<Navigate to="/admin/dashboard" />} />
              </Routes>
            </div>
          </div>
        ) : loggedInUser ? (
          <div className="flex-container">
            <SideNav setLoggedInUser={setLoggedInUser} />
            <div className="main-content">
              <Header loggedInUser={loggedInUser} loggedInAdmin={loggedInAdmin} />
              <Routes>
                <Route path="/" element={<Navigate to="/user/dashboard" />} />
                <Route path="/user/dashboard" element={<PrivateRoute role="user" loggedInUser={loggedInUser} element={UserDashboard} />} />
                <Route path="/enquiryform" element={<PrivateRoute role="user" loggedInUser={loggedInUser} element={EnquiryForm} />} />
                <Route path="*" element={<Navigate to="/user/dashboard" />} />
              </Routes>
            </div>
          </div>
        ) : (
          <>
            <Nav />
            <div className={`content ${theme}`}>
              <Routes>
                <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser} setLoggedInAdmin={setLoggedInAdmin} />} />
                <Route path="/signup" element={<SignUp />} />
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
