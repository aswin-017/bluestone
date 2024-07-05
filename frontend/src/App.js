import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Nav from './components/Nav';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
