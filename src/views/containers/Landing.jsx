import React, { Fragment } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../shared/Header';
import heroImage from '../../assets/images/hero.jpeg';

import '../../assets/styles/containers/landing.scss';

export default function Landing() {
  return (
    <Fragment>
      <Header />
      <Container className="landing-wrapper">
        <Row className="landing-wrapper__content">
          <Col className="landing-wrapper__text">
            <h1 className="mb-5">We helps you in your wedding preparations</h1>
            <h4 className="mb-5">Your Go-To Destination To Tie The Knot</h4>
            <Button variant="outline-primary">Sign Up Free</Button>
          </Col>
          <Col className="landing-wrapper__hero-image">
            <img src={heroImage} alt="hero" />
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}
