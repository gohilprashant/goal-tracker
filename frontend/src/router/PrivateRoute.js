import React from 'react';
import { Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const PrivateRoute = ({ children }) => {
  const loggedInUser = false;
  return loggedInUser ? <MainLayout>{children}</MainLayout> : <Navigate to='/login' />;
};

export default PrivateRoute;
