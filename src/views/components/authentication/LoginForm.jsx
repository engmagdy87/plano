import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Row, Form, InputGroup, Container, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { categoriesActions } from '../../../store/actions';
import ShowLogo from '../../../assets/images/show.svg';
import HideLogo from '../../../assets/images/hide.svg';
import { Store } from '../../../store/store';
import { setUserCookie } from '../../../helpers/CookieHelper';
import types from '../../../store/types';
export default function LoginForm({ setShowLoading }) {
  const { state, dispatch } = useContext(Store);
  const { t } = useTranslation(['auth']);
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [wrongData, setWrongData] = useState({ show: false, text: '' });
  const togglePasswordIcon = function () {
    setShowPassword(!showPassword);
  };
  const { register, handleSubmit, errors } = useForm();

  const validateIdentifier = function (value) {
    const emailRegEx = /^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/;
    const mobileRegEx = /^\d{11}$/;
    return emailRegEx.test(value) || mobileRegEx.test(value);
  };

  const onSubmit = async (persona) => {
    setShowLoading(true);
    try {
      const res = await categoriesActions.userSignIn(persona);
      setShowLoading(false);
      if (res.data === null)
        setWrongData({
          show: true,
          text: t('auth:invalidAccount'),
        });
      else {
        setWrongData({ show: false, text: '' });
        const data = res.data.login;
        setUserCookie(data.token, data.user.name);
        dispatch({
          type: types.user.SET_IS_USER_AUTH_FORM,
          payload: { show: false, authType: '' },
        });
        history.push('/sections');
      }
    } catch (error) {
      setShowLoading(false);
      setWrongData({
        show: true,
        text: t('auth:unexpectedLoginError'),
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
          placeholder={t('auth:identifierPlaceholder')}
          name="identifier"
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
      </Form.Group>
      <Form.Group controlId="login-password" className="auth-form-input">
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
            ref={register({ required: true })}
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
      <span
        className={`authentication-form-wrapper__forgot-password ${
          state.lang === 'en'
            ? 'authentication-form-wrapper__forgot-password--en'
            : 'authentication-form-wrapper__forgot-password--ar'
        }`}
      >
        {t('auth:forgotPassword')}
      </span>
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
            {t('auth:loginButton')}
          </Button>
        </Row>
      </Container>
    </Form>
  );
}
