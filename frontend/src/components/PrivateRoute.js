import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, loggedInUser, ...rest }) => {
  return loggedInUser ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
