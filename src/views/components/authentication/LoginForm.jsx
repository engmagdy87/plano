import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Row, Form, InputGroup, Container, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../../helpers/APIsHelper';
import ShowLogo from '../../../assets/images/show.svg';
import HideLogo from '../../../assets/images/hide.svg';
import { Store } from '../../../store/store';
import types from '../../../store/types';
import { setUserCookie } from '../../../helpers/CookieHelper';

export default function LoginForm() {
  const { dispatch } = useContext(Store);
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [isDataWrong, setIsDataWrong] = useState(false);
  const togglePasswordIcon = function () {
    setShowPassword(!showPassword);
  };
  const { register, handleSubmit, errors } = useForm();

  const validateIdentifier = function (value) {
    const emailRegEx = /^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/;
    const mobileRegEx = /^\d{11}$/;
    return emailRegEx.test(value) || mobileRegEx.test(value);
  };

  const onSubmit = async (data) => {
    loginUser(data).then((res) => {
      if (res.data === null) setIsDataWrong(true);
      else {
        setIsDataWrong(false);
        const data = res.data.login;
        setUserCookie(data.token, data.user.name);
        dispatch({
          type: types.user.SET_IS_USER_AUTH_FORM,
          payload: { show: false, authType: '' },
        });
        history.push('/sections');
      }
    });
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="name" className="auth-form-input">
        <Form.Label className="auth-form-label">
          Email or Phone number
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Task Name"
          name="identifier"
          ref={register({ required: true, validate: validateIdentifier })}
        />
        {errors.identifier && (
          <span className="error-message">Invalid Email or Phone Number</span>
        )}
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
        <div style={{ marginTop: '5px' }}>
          {isDataWrong && (
            <p className="account-error-message">
              Invalid Account, Please try again
            </p>
          )}
        </div>
      </Form.Group>
      <span className="authentication-form-wrapper__forgot-password">
        Forgot password?
      </span>
      <Container>
        <Row className="auth-form-action">
          <Button size="lg" block type="submit">
            LOGIN
          </Button>
        </Row>
      </Container>
    </Form>
  );
}
