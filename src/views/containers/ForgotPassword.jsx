import React, { Fragment, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Row, Form, Container, Button } from 'react-bootstrap';
import Header from '../shared/Header';
import { userActions } from '../../store/actions';
import { Store } from '../../store/store';
import Loading from '../shared/Loading';

export default function ForgotPassword() {
  const { state } = useContext(Store);
  const { t } = useTranslation(['auth']);
  const [wrongData, setWrongData] = useState({ show: false, text: '' });
  const [showSuccessfulMessage, setShowSuccessfulMessage] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  const validateIdentifier = function (value) {
    const emailRegEx = /^([a-zA-Z0-9])(([a-zA-Z0-9])*([\._\+-])*([a-zA-Z0-9]))*@(([a-zA-Z0-9\-])+(\.))+([a-zA-Z]{2,4})+$/;
    return emailRegEx.test(value);
  };

  const onSubmit = async ({ identifier }) => {
    const payload = {
      email: identifier,
      redirectLink: 'http://localhost:3000/reset/',
    };
    setShowLoading(true);
    try {
      const res = await userActions.sendForgotPassword(payload);
      setShowLoading(false);
      if (res.data === null)
        setWrongData({
          show: true,
          text: t('auth:invalidAccount'),
        });
      else {
        setWrongData({ show: false, text: '' });
        setShowSuccessfulMessage(true);
      }
    } catch (error) {
      setShowLoading(false);
      setWrongData({
        show: true,
        text: t('auth:unexpectedLoginError'),
      });
    }
  };

  const renderContent = () => {
    if (!showSuccessfulMessage)
      return (
        <Fragment>
          <Form.Group controlId="name" className="auth-form-input">
            <Form.Label
              className={`auth-form-label ${
                state.lang === 'en'
                  ? 'auth-form-label--en'
                  : 'auth-form-label--ar'
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
                  state.lang === 'en'
                    ? 'error-message--en'
                    : 'error-message--ar'
                }`}
              >
                {t('auth:invalidIdentifier')}
              </span>
            )}
          </Form.Group>
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
                {t('auth:sendForgotPasswordMail')}
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
                ? t('auth:checkEmail')
                : t('auth:forgotPasswordTitle')}
            </h1>
          </Form.Group>
          {renderContent()}
        </Form>
      </Container>
      <Loading loader="full-screen" showLoadingSpinner={showLoading} />
    </Fragment>
  );
}
