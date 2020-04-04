import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Store } from '../../store/store';
import AuthenticationForm from '../components/authentication/AuthenticationForm';
import Avatar from '../shared/Avatar';
import LogoIcon from '../../assets/images/logo.jpeg';
import EgyptFlagIcon from '../../assets/images/egypt.png';
import types from '../../store/types';
import '../../assets/styles/shared/header.scss';
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
        <img src={LogoIcon} alt="plano logo" className="header-wrapper__logo" />
      </Navbar.Brand>
      <img
        className="ml-auto mr-3 header-wrapper__flag"
        src={EgyptFlagIcon}
        alt="egypt flag"
      />
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
          <Nav.Link href="#" className="header-wrapper__link">
            Blog
          </Nav.Link>
        </Nav>
        <Nav className="mr-sm-5 header-wrapper__left-buttons">
          <Nav.Link href="#">
            <Button onClick={showSignUp}>Free Sign Up</Button>
          </Nav.Link>
          <Nav.Link href="#">
            <Button variant="link" onClick={showLogin}>
              Login
            </Button>
          </Nav.Link>
          <Nav.Link href="#" className="d-none d-md-block">
            <img src={EgyptFlagIcon} alt="egypt flag" />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <AuthenticationForm />
    </Navbar>
  );
}
