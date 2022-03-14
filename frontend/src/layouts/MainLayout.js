import React from 'react';
import { Container } from 'reactstrap';
import Header from '../components/header/Header';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};

export default MainLayout;
