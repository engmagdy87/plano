import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { isIdentifierExists } from '../../../helpers/APIsHelper';
import { Row, Form, InputGroup, Container, Button } from 'react-bootstrap';
import ShowLogo from '../../../assets/images/show.svg';
import HideLogo from '../../../assets/images/hide.svg';
import { Store } from '../../../store/store';
import types from '../../../store/types';

export default function SignUpForm({ setShowLoading }) {
  const history = useHistory();
  const { dispatch } = useContext(Store);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [wrongData, setWrongData] = useState({ show: false, text: '' });
  const [isIdentifierExistsFlag, setIsIdentifierExistsFlag] = useState(false);

  const togglePasswordIcon = function () {
    setShowPassword(!showPassword);
  };

  const toggleRePasswordIcon = function () {
    setShowRePassword(!showRePassword);
  };

  const validateIdentifier = function (value) {
    setIsIdentifierExistsFlag(false);

    const emailRegEx = /^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/;
    const mobileRegEx = /^\d{11}$/;
    return emailRegEx.test(value) || mobileRegEx.test(value);
  };

  const { register, handleSubmit, errors, watch } = useForm();
  const onSubmit = async (data) => {
    setShowLoading(true);
    const result = await isIdentifierExists(data.identifier);
    setShowLoading(false);

    if (result === undefined)
      setWrongData({
        show: true,
        text: 'Unexpected error when register, Please try again!',
      });
    else if (result) {
      setWrongData({ show: false, text: '' });
      setIsIdentifierExistsFlag(true);
    } else {
      setWrongData({ show: false, text: '' });
      setIsIdentifierExistsFlag(false);
      dispatch({
        type: types.user.SET_USER_SIGN_UP_FORM,
        payload: {
          ...data,
        },
      });
      dispatch({
        type: types.user.SET_IS_USER_AUTH_FORM,
        payload: { show: false, authType: '' },
      });
      history.push('/build-profile');
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="name" className="auth-form-input">
        <Form.Label className="auth-form-label">
          Email or Phone number
        </Form.Label>
        <Form.Control
          type="text"
          name="identifier"
          placeholder="Enter Task Name"
          ref={register({ required: true, validate: validateIdentifier })}
        />
        {errors.identifier && (
          <span className="error-message">Invalid Email or Phone Number</span>
        )}
        {isIdentifierExistsFlag && (
          <span className="error-message">Email or Phone Number exists</span>
        )}
      </Form.Group>
      <Form.Group controlId="signup-password" className="auth-form-input">
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
      </Form.Group>
      <Form.Group controlId="password" className="auth-form-input">
        <Form.Label className="auth-form-label">
          <Form.Label className="auth-form-label">Re-type Password</Form.Label>
        </Form.Label>
        <InputGroup>
          <Form.Control
            type={showRePassword ? 'text' : 'password'}
            placeholder="Enter Your Password again"
            name="confirmPassword"
            ref={register({
              required: true,
              validate: (value) => {
                return value === watch('password'); // value is from confirm password and watch will return value from password
              },
            })}
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
        {errors.confirmPassword && (
          <p className="error-message">Invalid Password</p>
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
            SIGN UP
          </Button>
        </Row>
      </Container>
    </Form>
  );
}
