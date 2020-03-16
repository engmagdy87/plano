import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Avatar from '../shared/Avatar';
import logo from '../../assets/images/logo.jpeg';
import '../../assets/styles/shared/header.scss';
export default function Header() {
  return (
    <Navbar collapseOnSelect expand="lg" className="header-wrapper">
      <Navbar.Brand href="/">
        <img src={logo} alt="plano logo" className="header-wrapper__logo" />
      </Navbar.Brand>
      <Button variant="link" className=" ml-auto mr-3">
        عربى
      </Button>
      <Avatar></Avatar>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto header-wrapper__nav">
          <Nav.Link href="/home" className="header-wrapper__link">
            Wedding Checklist
          </Nav.Link>
        </Nav>
        <Nav className="mr-sm-5 header-wrapper__left-buttons">
          <Button variant="link">عربى</Button>
          <Button>Login</Button>
          <Button>Free Sign Up</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
