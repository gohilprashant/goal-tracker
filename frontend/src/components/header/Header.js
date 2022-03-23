import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/slices/authSlice';
import { clearGoals } from '../../store/slices/goalSlice';
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(clearGoals());
  };

  return (
    <header>
      <Navbar color='dark' expand='md' dark container className='py-3'>
        <NavbarBrand tag={Link} to='/'>
          Goal Tracker
        </NavbarBrand>
        {!user ? (
          <Fragment>
            <NavbarToggler
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            />
            <Collapse isOpen={isOpen} navbar>
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
