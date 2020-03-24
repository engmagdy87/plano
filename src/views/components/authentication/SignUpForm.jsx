import React, { useState } from 'react';
import { Row, Form, InputGroup, Container, Button } from 'react-bootstrap';
import ShowLogo from '../../../assets/images/show.svg';
import HideLogo from '../../../assets/images/hide.svg';

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const togglePasswordIcon = function() {
    setShowPassword(!showPassword);
  };

  const toggleRePasswordIcon = function() {
    setShowRePassword(!showRePassword);
  };

  return (
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
      <Form.Group controlId="signup-password">
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
          <Form.Label className="auth-form-label">Re-type Password</Form.Label>
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
  );
}
