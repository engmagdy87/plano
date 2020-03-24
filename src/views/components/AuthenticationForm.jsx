import React, { useState, useContext, useEffect } from 'react';
import {
  Modal,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button
} from 'react-bootstrap';
import { Store } from '../../store/store';
import '../../assets/styles/components/task-details-modal.scss';
import types from '../../store/types';
import FacebookLogo from '../../assets/images/facebook.png';
import GoogleLogo from '../../assets/images/google-plus.png';
import ShowLogo from '../../assets/images/show.svg';
import HideLogo from '../../assets/images/hide.svg';
import '../../assets/styles/components/authentication-form.scss';

export default function AuthenticationForm() {
  const { state, dispatch } = useContext(Store);
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
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

  const togglePasswordIcon = function() {
    setShowPassword(!showPassword);
  };

  const toggleRePasswordIcon = function() {
    setShowRePassword(!showRePassword);
  };

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
              <Row>
                <Col>
                  <div className="authentication-form-wrapper__social-media authentication-form-wrapper__social-media--facebook">
                    <div>
                      <img src={FacebookLogo} alt="facebook logo" />
                    </div>
                    <span>Facebook</span>
                  </div>
                </Col>
                <Col>
                  <div className="authentication-form-wrapper__social-media authentication-form-wrapper__social-media--google">
                    <div>
                      <img src={GoogleLogo} alt="google logo" />
                    </div>
                    <span>Google</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="authentication-form-wrapper__span-text">OR</Col>
              </Row>
              <Form>
                <Form.Group controlId="name">
                  <Form.Label className="auth-form-label">
                    Email or Phone number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Task Name"
                    onChange={() => {}}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label className="auth-form-label">Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter Your Password"
                      onChange={() => {}}
                    />
                    <InputGroup.Prepend>
                      <InputGroup.Text
                        id="inputGroupPrepend"
                        onClick={togglePasswordIcon}
                      >
                        {showPassword ? (
                          <img src={ShowLogo} alt="show password" />
                        ) : (
                          <img src={HideLogo} alt="hide password" />
                        )}
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label className="auth-form-label">
                    <Form.Label className="auth-form-label">
                      Re-type Password
                    </Form.Label>
                  </Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showRePassword ? 'text' : 'password'}
                      placeholder="Enter Your Password again"
                      onChange={() => {}}
                    />
                    <InputGroup.Prepend>
                      <InputGroup.Text id="inputGroupPrepend">
                        <div onClick={toggleRePasswordIcon}>
                          {showRePassword ? (
                            <img src={ShowLogo} alt="show password" />
                          ) : (
                            <img src={HideLogo} alt="hide password" />
                          )}
                        </div>
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                  </InputGroup>
                </Form.Group>
                <Container>
                  <Row className="auth-form-action">
                    <Button size="lg" block>
                      SIGN UP
                    </Button>
                  </Row>
                </Container>
              </Form>
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
              <Row>
                <Col>
                  <div className="authentication-form-wrapper__social-media authentication-form-wrapper__social-media--facebook">
                    <div>
                      <img src={FacebookLogo} alt="facebook logo" />
                    </div>
                    <span>Facebook</span>
                  </div>
                </Col>
                <Col>
                  <div className="authentication-form-wrapper__social-media authentication-form-wrapper__social-media--google">
                    <div>
                      <img src={GoogleLogo} alt="google logo" />
                    </div>
                    <span>Google</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col className="authentication-form-wrapper__span-text">OR</Col>
              </Row>
              <Form>
                <Form.Group controlId="name">
                  <Form.Label className="auth-form-label">
                    Email or Phone number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Task Name"
                    onChange={() => {}}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label className="auth-form-label">Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter Your Password"
                      onChange={() => {}}
                    />
                    <InputGroup.Prepend>
                      <InputGroup.Text
                        id="inputGroupPrepend"
                        onClick={togglePasswordIcon}
                      >
                        {showPassword ? (
                          <img src={ShowLogo} alt="show password" />
                        ) : (
                          <img src={HideLogo} alt="hide password" />
                        )}
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                  </InputGroup>
                </Form.Group>
                <span className="authentication-form-wrapper__forgot-password">
                  Forgot password?
                </span>
                <Container>
                  <Row className="auth-form-action">
                    <Button size="lg" block>
                      LOGIN
                    </Button>
                  </Row>
                </Container>
              </Form>
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
