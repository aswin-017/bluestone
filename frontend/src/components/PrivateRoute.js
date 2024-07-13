// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, role, loggedInUser, loggedInAdmin, ...rest }) => {
  const isAuthenticated = role === 'admin' ? loggedInAdmin : loggedInUser;

  return isAuthenticated ? (
    <Component {...rest} loggedInUser={loggedInUser} loggedInAdmin={loggedInAdmin} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
