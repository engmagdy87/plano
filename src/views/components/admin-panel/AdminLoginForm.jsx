import React, { useState, useContext } from 'react';
import { Row, Form, InputGroup, Container, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { panelActions } from '../../../store/actions';
import { Store } from '../../../store/store';
import logo from '../../../assets/images/logo.png';
import ShowLogo from '../../../assets/images/show.svg';
import HideLogo from '../../../assets/images/hide.svg';
import { setAdminCookie } from '../../../helpers/CookieHelper';
import types from '../../../store/types';

import '../../../assets/styles/components/admin-login-form.scss';

export default function AdminLoginForm({
  setShowLoadingSpinner,
  setAdminToken,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [wrongData, setWrongData] = useState({ show: false, text: '' });
  const togglePasswordIcon = function () {
    setShowPassword(!showPassword);
  };
  const { register, handleSubmit, errors } = useForm();

  const validateEmail = function (value) {
    const emailRegEx = /^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/;
    return emailRegEx.test(value);
  };

  const onSubmit = async (loginPayload) => {
    setShowLoadingSpinner(true);
    try {
      const res = await panelActions.adminSignIn(loginPayload);
      setShowLoadingSpinner(false);
      if (res.data === null)
        setWrongData({
          show: true,
          text: 'Invalid Account, Please try again',
        });
      else {
        setWrongData({ show: false, text: '' });
        const data = res.data.loginAdmin;
        setAdminCookie(data.token, data.user.name);
        setAdminToken(data.token);
      }
    } catch (error) {
      setShowLoadingSpinner(false);
      setWrongData({
        show: true,
        text: 'Unexpected error when login, Please try again!',
      });
    }
  };
  return (
    <div className="admin-login-form-wrapper">
      <img src={logo} alt="plano" className="admin-login-form-wrapper__logo" />
      <Form
        className="admin-login-form-wrapper__form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group controlId="name">
          <Form.Label className="auth-form-label">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Email"
            name="email"
            ref={register({
              required: true,
              validate: validateEmail,
            })}
          />
          {errors.email && <span className="error-message">Invalid Email</span>}
        </Form.Group>
        <Form.Group controlId="login-password" className="auth-form-input">
          <Form.Label className="auth-form-label">Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Your Password"
              name="password"
              ref={register({ required: true })}
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
          {errors.password && (
            <span className="error-message">Invalid Password</span>
          )}
          <div style={{ marginTop: '5px' }}>
            {wrongData.show && (
              <p className="account-error-message">{wrongData.text}</p>
            )}
          </div>
        </Form.Group>
        <Container>
          <Row className="auth-form-action">
            <Button size="lg" block type="submit">
              LOGIN
            </Button>
          </Row>
        </Container>
      </Form>
    </div>
  );
}
