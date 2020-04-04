import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Form, InputGroup, Container, Button } from 'react-bootstrap';
import ShowLogo from '../../../assets/images/show.svg';
import HideLogo from '../../../assets/images/hide.svg';
import { Store } from '../../../store/store';
import types from '../../../store/types';

export default function LoginForm() {
  const { dispatch } = useContext(Store);
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordIcon = function() {
    setShowPassword(!showPassword);
  };
  const loginValidation = function() {
    history.push('/build-profile');
    dispatch({
      type: types.user.SET_IS_USER_AUTH_FORM,
      payload: { show: false, authType: '' }
    });
  };
  return (
    <Form>
      <Form.Group controlId="name" className="auth-form-input">
        <Form.Label className="auth-form-label">
          Email or Phone number
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Task Name"
          onChange={() => {}}
        />
      </Form.Group>
      <Form.Group controlId="login-password" className="auth-form-input">
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
          <Button size="lg" block onClick={loginValidation}>
            LOGIN
          </Button>
        </Row>
      </Container>
    </Form>
  );
}
