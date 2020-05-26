import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Store } from '../../store/store';
import AuthenticationForm from '../components/authentication/AuthenticationForm';
import { getUserCookie, setChecklistCookie } from '../../helpers/CookieHelper';
import Avatar from '../shared/Avatar';
import LogoIcon from '../../assets/images/logo.png';
import EgyptFlagIcon from '../../assets/images/egypt.png';
import types from '../../store/types';
import '../../assets/styles/shared/header.scss';
import { useHistory } from 'react-router-dom';
export default function Header({ activePath }) {
  const { dispatch } = useContext(Store);
  const userCookie = getUserCookie();
  const history = useHistory();
  const showLogin = function () {
    dispatch({
      type: types.user.SET_IS_USER_AUTH_FORM,
      payload: { show: true, authType: 'login' },
    });
  };
  const showSignUp = function () {
    dispatch({
      type: types.user.SET_IS_USER_AUTH_FORM,
      payload: { show: true, authType: 'signup' },
    });
  };

  const setChecklistId = function () {
    if (userCookie !== undefined) {
      setChecklistCookie(1);
      dispatch({
        type: types.checklist.SET_CURRENT_CHECKLIST,
        payload: 1,
      });
      history.push({ pathname: '/home' });
    } else history.push({ pathname: '/' });
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
      <Avatar device="mobile" />
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto header-wrapper__nav">
          <Nav.Link
            className={`header-wrapper__link ${
              activePath === 'home' ? 'header-wrapper__link--active' : ''
            }`}
            onClick={setChecklistId}
          >
            Wedding categories
          </Nav.Link>
          <Nav.Link href="#" className="header-wrapper__link">
            Blog
          </Nav.Link>
        </Nav>
        <Nav
          className={`mr-sm-5 header-wrapper__left-buttons ${
            userCookie !== undefined ? 'd-none d-md-flex' : ''
          }`}
        >
          <Nav.Link>
            <Button
              className={`${
                activePath === 'build-profile' || userCookie !== undefined
                  ? 'header-wrapper__link--hide'
                  : ''
              }`}
              onClick={showSignUp}
            >
              Free Sign Up
            </Button>
          </Nav.Link>
          <Nav.Link>
            <Button
              variant="link"
              className={`${
                userCookie !== undefined ? 'header-wrapper__link--hide' : ''
              }`}
              onClick={showLogin}
            >
              Login
            </Button>
          </Nav.Link>
          <Nav.Link href="#" style={{ marginTop: '-4px' }}>
            <Avatar device="desktop" />
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
