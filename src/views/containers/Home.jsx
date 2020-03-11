import React, { Fragment } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../shared/Header';

import '../../assets/styles/containers/home.scss';

export default function Home() {
  return (
    <Fragment>
      <Header />
      <Container className="home-wrapper">
        <Row className="home-wrapper__content">
          <Col className="home-wrapper__text">
            <h1 className="mb-5">We helps you in your wedding preparations</h1>
            <h4 className="mb-5">Your Go-To Destination To Tie The Knot</h4>
            <Button variant="outline-primary">Sign Up Free</Button>
          </Col>
          <Col className="home-wrapper__hero-image"></Col>
        </Row>
      </Container>
    </Fragment>
  );
}
