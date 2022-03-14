import React from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { FaSignInAlt, FaUser } from 'react-icons/fa';
const Header = () => {
  return (
    <header>
      <Navbar color='dark' expand='md' dark container className='py-3'>
        <NavbarBrand tag={Link} to='/'>
          Goal Tracker
        </NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() {}} />
        <Collapse navbar>
          <Nav className='ms-auto' navbar>
            <NavItem>
              <NavLink tag={Link} to='/login'>
                <FaSignInAlt /> Login
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to='/register'>
                <FaUser /> Register
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
