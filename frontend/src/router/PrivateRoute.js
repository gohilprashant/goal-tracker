import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  return user ? <MainLayout>{children}</MainLayout> : <Navigate to='/login' />;
};

export default PrivateRoute;
