import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { userActions } from '../../../store/actions';
import { Row, Form, InputGroup, Container, Button } from 'react-bootstrap';
import ShowLogo from '../../../assets/images/show.svg';
import HideLogo from '../../../assets/images/hide.svg';
import { Store } from '../../../store/store';
import types from '../../../store/types';
import { setUserTokenCookie } from '../../../helpers/CookieHelper';

export default function SignUpForm({ setShowLoading }) {
  const history = useHistory();
  const { state, dispatch } = useContext(Store);
  const { t } = useTranslation(['auth']);
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
    const result = await userActions.isUserExists(data.identifier);
    setShowLoading(false);

    if (result === undefined)
      setWrongData({
        show: true,
        text: t('auth:unexpectedSignUpError'),
      });
    else if (result) {
      setWrongData({ show: false, text: '' });
      setIsIdentifierExistsFlag(true);
    } else {
      setWrongData({ show: false, text: '' });
      setIsIdentifierExistsFlag(false);
      const result = await userActions.createNewUser(dispatch, data);
      if (!result.isErrorExists) {
        setUserTokenCookie(result.data.token);
        dispatch({
          type: types.user.SET_IS_USER_AUTH_FORM,
          payload: { show: false, authType: '' },
        });
        history.push('/build-profile');
      } else
        setWrongData({
          show: true,
          text: t('auth:existingIdentifier'),
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId="name" className="auth-form-input">
        <Form.Label
          className={`auth-form-label ${
            state.lang === 'en' ? 'auth-form-label--en' : 'auth-form-label--ar'
          }`}
        >
          {t('auth:identifierLabel')}
        </Form.Label>
        <Form.Control
          type="text"
          name="identifier"
          placeholder={t('auth:identifierPlaceholder')}
          ref={register({ required: true, validate: validateIdentifier })}
          className={`${
            state.lang === 'en' ? 'form-control--en' : 'form-control--ar'
          }`}
        />
        {errors.identifier && (
          <span
            className={`error-message ${
              state.lang === 'en' ? 'error-message--en' : 'error-message--ar'
            }`}
          >
            {t('auth:invalidIdentifier')}
          </span>
        )}
        {isIdentifierExistsFlag && (
          <span
            className={`error-message ${
              state.lang === 'en' ? 'error-message--en' : 'error-message--ar'
            }`}
          >
            {t('auth:existingIdentifier')}
          </span>
        )}
      </Form.Group>
      <Form.Group controlId="signup-password" className="auth-form-input">
        <Form.Label
          className={`auth-form-label ${
            state.lang === 'en' ? 'auth-form-label--en' : 'auth-form-label--ar'
          }`}
        >
          {t('auth:passwordLabel')}
        </Form.Label>
        <InputGroup>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder={t('auth:passwordPlaceholder')}
            name="password"
            ref={register({
              required: true,
              minLength: 8,
              pattern: /^[a-zA-Z0-9]+$/,
            })}
            className={`${
              state.lang === 'en' ? 'form-control--en' : 'form-control--ar'
            }`}
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
        <Form.Label
          className={`auth-form-label ${
            state.lang === 'en' ? 'auth-form-label--en' : 'auth-form-label--ar'
          }`}
        >
          <Form.Label
            className={`auth-form-label ${
              state.lang === 'en'
                ? 'auth-form-label--en'
                : 'auth-form-label--ar'
            }`}
          >
            {t('auth:retypePasswordLabel')}
          </Form.Label>
        </Form.Label>
        <InputGroup>
          <Form.Control
            type={showRePassword ? 'text' : 'password'}
            placeholder={t('auth:retypePasswordPlaceholder')}
            name="confirmPassword"
            ref={register({
              required: true,
              minLength: 8,
              pattern: /^[a-zA-Z0-9]+$/,
              validate: (value) => {
                return value === watch('password'); // value is from confirm password and watch will return value from password
              },
            })}
            className={`${
              state.lang === 'en' ? 'form-control--en' : 'form-control--ar'
            }`}
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
          <p
            className={`error-message ${
              state.lang === 'en' ? 'error-message--en' : 'error-message--ar'
            }`}
          >
            {t('auth:invalidPassword')}
          </p>
        )}
        <div style={{ marginTop: '5px' }}>
          {wrongData.show && (
            <p
              className={`account-error-message ${
                state.lang === 'en'
                  ? 'account-error-message--en'
                  : 'account-error-message--ar'
              }`}
            >
              {wrongData.text}
            </p>
          )}
        </div>
      </Form.Group>
      <Container>
        <Row className="auth-form-action">
          <Button
            size="lg"
            block
            type="submit"
            className={`auth-form-action__button ${
              state.lang === 'en'
                ? 'auth-form-action__button--en'
                : 'auth-form-action__button--ar'
            }`}
          >
            {t('auth:signUpButton')}
          </Button>
        </Row>
      </Container>
    </Form>
  );
}
