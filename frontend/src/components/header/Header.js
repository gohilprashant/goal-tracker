import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/slices/authSlice';
const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <header>
      <Navbar color='dark' expand='md' dark container className='py-3'>
        <NavbarBrand tag={Link} to='/'>
          Goal Tracker
        </NavbarBrand>
        {!user ? (
          <Fragment>
            <NavbarToggler onClick={function noRefCheck() {}} />
            <Collapse navbar>
              <Nav className='ms-auto' navbar>
                <Fragment>
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
                </Fragment>
              </Nav>
            </Collapse>
          </Fragment>
        ) : (
          <button className='btn text-light' onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        )}
      </Navbar>
    </header>
  );
};

export default Header;
