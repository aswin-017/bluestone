// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; // Adjust based on your auth context

const PrivateRoute = ({ path, element }) => {
  const { isLoggedIn } = useAuth(); // Replace with actual authentication check

  return (
    <Route
      path={path}
      element={isLoggedIn ? element : <Navigate to="/login" replace />}
    />
  );
};

export default PrivateRoute;
