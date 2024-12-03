// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute Component
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if token exists

  // If no token is found, redirect to login page
  return token ? children : <Navigate to="/" />;
};

export default PrivateRoute;
