import React, { useState, useContext, useEffect } from 'react';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
import { Store } from '../../../store/store';
import SocialMediaAuthentication from '../SocialMediaAuthentication';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import types from '../../../store/types';
import '../../../assets/styles/components/authentication-form.scss';

export default function AuthenticationForm() {
  const { state, dispatch } = useContext(Store);
  const [show, setShow] = useState(false);

  const [authType, setAuthType] = useState('');

  const handleClose = () => {
    setShow(false);
    dispatch({
      type: types.user.SET_IS_USER_AUTH_FORM,
      payload: { show: false, authType: '' }
    });
  };

  useEffect(() => {
    setShow(state.userAuthenticationForm.show);
    setAuthType(state.userAuthenticationForm.authType);
  }, [state.userAuthenticationForm]);

  const changeToLoginOrSignUp = function() {
    if (authType === 'signup')
      dispatch({
        type: types.user.SET_IS_USER_AUTH_FORM,
        payload: { show: true, authType: 'login' }
      });
    if (authType === 'login')
      dispatch({
        type: types.user.SET_IS_USER_AUTH_FORM,
        payload: { show: true, authType: 'signup' }
      });
  };

  const buildForm = function() {
    if (authType === 'signup')
      return (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body className="authentication-form-wrapper">
            <Container>
              <Row>
                <Col className="authentication-form-wrapper__span-text">
                  Connect Via
                </Col>
              </Row>
              <SocialMediaAuthentication />
              <Row>
                <Col className="authentication-form-wrapper__span-text">OR</Col>
              </Row>
              <SignUpForm />
              <span className="authentication-form-wrapper__terms">
                By signing up, you agree to our Terms of Use and Privacy Policy.
              </span>
              <span className="authentication-form-wrapper__account">
                Have account ?{' '}
                <Button variant="link" onClick={changeToLoginOrSignUp}>
                  Login
                </Button>
              </span>
            </Container>
          </Modal.Body>
        </div>
      );
    else if (authType === 'login')
      return (
        <div>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body className="authentication-form-wrapper">
            <Container>
              <Row>
                <Col className="authentication-form-wrapper__span-text">
                  Connect Via
                </Col>
              </Row>
              <SocialMediaAuthentication />
              <Row>
                <Col className="authentication-form-wrapper__span-text">OR</Col>
              </Row>
              <LoginForm />
              <span className="authentication-form-wrapper__account">
                Don't have account ?{' '}
                <Button variant="link" onClick={changeToLoginOrSignUp}>
                  sign up
                </Button>
              </span>
            </Container>
          </Modal.Body>
        </div>
      );
    else return null;
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="authentication-form-wrapper"
    >
      {buildForm()}
    </Modal>
  );
}
