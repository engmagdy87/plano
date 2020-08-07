import React, { Fragment, useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Row, Form, InputGroup, Container, Button } from 'react-bootstrap';
import Header from '../shared/Header';
import { userActions } from '../../store/actions';
import { Store } from '../../store/store';
import Loading from '../shared/Loading';
import ShowLogo from '../../assets/images/show.svg';
import HideLogo from '../../assets/images/hide.svg';

export default function ResetPassword(props) {
  const { state } = useContext(Store);
  const { t } = useTranslation(['auth']);
  const history = useHistory();
  const [wrongData, setWrongData] = useState({ show: false, text: '' });
  const [showSuccessfulMessage, setShowSuccessfulMessage] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const { hash } = useParams();
  const { register, handleSubmit, errors, watch } = useForm();

  const onSubmit = async ({ password, confirmPassword }) => {
    const payload = {
      hash,
      password,
      confirmPassword,
    };
    setShowLoading(true);
    try {
      const res = await userActions.setNewPassword(payload);
      setShowLoading(false);
      if (res.data === null)
        setWrongData({
          show: true,
          text: t('auth:invalidHash'),
        });
      else {
        setWrongData({ show: false, text: '' });
        setShowSuccessfulMessage(true);
        setTimeout(() => {
          history.push('/');
        }, 3000);
      }
    } catch (error) {
      setShowLoading(false);
      setWrongData({
        show: true,
        text: t('auth:unexpectedLoginError'),
      });
    }
  };
  const togglePasswordIcon = function () {
    setShowPassword(!showPassword);
  };

  const toggleRePasswordIcon = function () {
    setShowRePassword(!showRePassword);
  };

  const renderContent = () => {
    if (!showSuccessfulMessage)
      return (
        <Fragment>
          <Form.Group controlId="signup-password" className="auth-form-input">
            <Form.Label
              className={`auth-form-label ${
                state.lang === 'en'
                  ? 'auth-form-label--en'
                  : 'auth-form-label--ar'
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
                state.lang === 'en'
                  ? 'auth-form-label--en'
                  : 'auth-form-label--ar'
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
                  state.lang === 'en'
                    ? 'error-message--en'
                    : 'error-message--ar'
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
                {t('auth:saveNewPassword')}
              </Button>
            </Row>
          </Container>
        </Fragment>
      );
  };

  return (
    <Fragment>
      <Header activePath="" />
      <Container className="sections-wrapper">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group
            controlId="name"
            className={`auth-form-input ${
              state.lang === 'en'
                ? 'auth-form-label--en'
                : 'auth-form-label--ar'
            }`}
          >
            <h1>
              {' '}
              {showSuccessfulMessage
                ? t('auth:relogin')
                : t('auth:resetPasswordTitle')}
            </h1>
          </Form.Group>
          {renderContent()}
        </Form>
      </Container>
      <Loading loader="full-screen" showLoadingSpinner={showLoading} />
    </Fragment>
  );
}
