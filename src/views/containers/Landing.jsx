import React, { Fragment, useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Header from '../shared/Header';
import heroImage from '../../assets/images/hero.jpeg';
import { Store } from '../../store/store';
import types from '../../store/types';
import '../../assets/styles/containers/landing.scss';

export default function Landing() {
  const { state, dispatch } = useContext(Store);
  const showSignUp = function () {
    dispatch({
      type: types.user.SET_IS_USER_AUTH_FORM,
      payload: { show: true, authType: 'signup' },
    });
  };
  return (
    <div style={{ direction: state.lang === 'en' ? 'ltr' : 'rtl' }}>
      <Header activePath />
      <Container className="landing-wrapper">
        <Row className="landing-wrapper__content">
          <Col className="landing-wrapper__text">
            <h1
              className={`mb-5 ${
                state.lang === 'en'
                  ? 'landing-wrapper__text__hero--en'
                  : 'landing-wrapper__text__hero--ar'
              }`}
            >
              We helps you in your wedding preparations
            </h1>
            <h4
              className={`mb-5 ${
                state.lang === 'en'
                  ? 'landing-wrapper__text__slogan--en'
                  : 'landing-wrapper__text__slogan--ar'
              }`}
            >
              Your Go-To Destination To Tie The Knot
            </h4>
            <Button
              className={`landing-wrapper__sign-up-button ${
                state.lang === 'en'
                  ? 'landing-wrapper__sign-up-button--en'
                  : 'landing-wrapper__sign-up-button--ar'
              }`}
              variant="outline-primary"
              onClick={showSignUp}
            >
              Sign Up Free
            </Button>
          </Col>
          <Col className="landing-wrapper__hero-image">
            <img src={heroImage} alt="hero" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
