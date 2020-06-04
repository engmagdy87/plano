import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { removeAdminCookie } from '../../../helpers/CookieHelper';
import { Store } from '../../../store/store';
import types from '../../../store/types';
import LogoIcon from '../../../assets/images/logo.png';
import '../../../assets/styles/shared/header.scss';

export default function AdminPanelHeader() {
  const { dispatch } = useContext(Store);
  const logoutAdmin = () => {
    removeAdminCookie();
    dispatch({
      type: types.panel.SET_SELECTED_USER,
      payload: {},
    });
    dispatch({
      type: types.panel.SET_TOKEN,
      payload: '',
    });
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="header-wrapper">
      <Navbar.Brand href="/">
        <img src={LogoIcon} alt="plano logo" className="header-wrapper__logo" />
      </Navbar.Brand>
      <Button
        variant="outline-dark"
        className="d-none d-md-block ml-auto header-wrapper__admin-logout"
        onClick={logoutAdmin}
      >
        Logout
      </Button>
      <Navbar.Toggle aria-controls="basic-navbar-nav">
        <Nav className="mr-auto header-wrapper__nav">
          <Nav.Link onClick={logoutAdmin}>Logout</Nav.Link>
        </Nav>
      </Navbar.Toggle>
    </Navbar>
  );
}
