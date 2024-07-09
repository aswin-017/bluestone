     // src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ loggedInUser, children }) => {
  if (loggedInUser) {
    return <Navigate to="/user/dashboard" />;
  }
  return children;
};

export default ProtectedRoute;
