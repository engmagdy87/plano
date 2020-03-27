import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Avatar from '../shared/Avatar';
import logo from '../../assets/images/logo.jpeg';
import '../../assets/styles/shared/header.scss';
import { Store } from '../../store/store';
import types from '../../store/types';
import AuthenticationForm from '../components/authentication/AuthenticationForm';
export default function Header({ activePath }) {
  const { dispatch } = useContext(Store);
  const showLogin = function() {
    dispatch({
      type: types.user.SET_IS_USER_AUTH_FORM,
      payload: { show: true, authType: 'login' }
    });
  };
  const showSignUp = function() {
    dispatch({
      type: types.user.SET_IS_USER_AUTH_FORM,
      payload: { show: true, authType: 'signup' }
    });
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="header-wrapper">
      <Navbar.Brand href="/">
        <img src={logo} alt="plano logo" className="header-wrapper__logo" />
      </Navbar.Brand>
      <Button variant="link" className=" ml-auto mr-3">
        عربى
      </Button>
      <Avatar />
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto header-wrapper__nav">
          <Nav.Link
            href="/home"
            className={`header-wrapper__link ${
              activePath === 'home' ? 'header-wrapper__link--active' : ''
            }`}
          >
            Wedding Checklist
          </Nav.Link>
        </Nav>
        <Nav className="mr-sm-5 header-wrapper__left-buttons">
          <Nav.Link href="#">
            <Button variant="link" className="d-none d-md-block">
              عربى
            </Button>
          </Nav.Link>
          <Nav.Link href="#">
            <Button onClick={showLogin}>Login</Button>
          </Nav.Link>
          <Nav.Link href="#">
            <Button onClick={showSignUp}>Free Sign Up</Button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <AuthenticationForm />
    </Navbar>
  );
}
