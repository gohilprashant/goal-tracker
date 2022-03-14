import React from 'react';
import MainLayout from '../layouts/MainLayout';

const PublicRoute = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

export default PublicRoute;
