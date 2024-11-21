import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, token, logout } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const decodedToken = jwtDecode(token);
  const expirationTime = decodedToken.exp * 1000; // convert to milliseconds
  const currentTime = new Date().getTime();

  if (currentTime > expirationTime) {
    logout();
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoutes;