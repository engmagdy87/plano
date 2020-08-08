import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
import { Store } from '../../../store/store';
import SocialMediaAuthentication from '../SocialMediaAuthentication';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';
import Loading from '../../../views/shared/Loading';
import types from '../../../store/types';
import '../../../assets/styles/components/authentication-form.scss';

export default function AuthenticationForm() {
  const { t } = useTranslation(['auth']);
  const { state, dispatch } = useContext(Store);
  const [show, setShow] = useState(false);
  const [showLoading, setShowLoading] = useState(false);

  const [authType, setAuthType] = useState('');

  const handleClose = () => {
    setShow(false);
    dispatch({
      type: types.user.SET_IS_USER_AUTH_FORM,
      payload: { show: false, authType: '' },
    });
  };

  useEffect(() => {
    setShow(state.userAuthenticationForm.show);
    setAuthType(state.userAuthenticationForm.authType);
  }, [state.userAuthenticationForm]);

  const changeToLoginOrSignUp = function () {
    if (authType === 'signup')
      dispatch({
        type: types.user.SET_IS_USER_AUTH_FORM,
        payload: { show: true, authType: 'login' },
      });
    if (authType === 'login')
      dispatch({
        type: types.user.SET_IS_USER_AUTH_FORM,
        payload: { show: true, authType: 'signup' },
      });
  };

  const buildForm = function () {
    if (authType === 'signup')
      return (
        <div>
          <Modal.Header closeButton>
            <Modal.Title
              className={`authentication-form-wrapper__title ${
                state.lang === 'en'
                  ? 'authentication-form-wrapper__title--en'
                  : 'authentication-form-wrapper__title--ar'
              }`}
            >
              {t('auth:signUpTitle')}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="authentication-form-wrapper">
            <Container>
              <Row>
                <Col
                  className={`authentication-form-wrapper__span-text ${
                    state.lang === 'en'
                      ? 'authentication-form-wrapper__span-text--en'
                      : 'authentication-form-wrapper__span-text--ar'
                  }`}
                >
                  {t('auth:via')}
                </Col>
              </Row>
              <SocialMediaAuthentication setShowLoading={setShowLoading} />
              <Row>
                <Col
                  className={`authentication-form-wrapper__span-text ${
                    state.lang === 'en'
                      ? 'authentication-form-wrapper__span-text--en'
                      : 'authentication-form-wrapper__span-text--ar'
                  }`}
                >
                  {t('auth:or')}
                </Col>
              </Row>
              <SignUpForm setShowLoading={setShowLoading} />
              <span
                className={`authentication-form-wrapper__terms ${
                  state.lang === 'en'
                    ? 'authentication-form-wrapper__terms--en'
                    : 'authentication-form-wrapper__terms--ar'
                }`}
              >
                {t('auth:terms')}
              </span>
              <span
                className={`authentication-form-wrapper__account ${
                  state.lang === 'en'
                    ? 'authentication-form-wrapper__account--en'
                    : 'authentication-form-wrapper__account--ar'
                }`}
              >
                {t('auth:haveAccount')}{' '}
                <Button variant="link" onClick={changeToLoginOrSignUp}>
                  {t('auth:haveAccountAnswer')}
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
            <Modal.Title
              className={`authentication-form-wrapper__title ${
                state.lang === 'en'
                  ? 'authentication-form-wrapper__title--en'
                  : 'authentication-form-wrapper__title--ar'
              }`}
            >
              {t('auth:loginTitle')}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="authentication-form-wrapper">
            <Container>
              <Row>
                <Col
                  className={`authentication-form-wrapper__span-text ${
                    state.lang === 'en'
                      ? 'authentication-form-wrapper__span-text--en'
                      : 'authentication-form-wrapper__span-text--ar'
                  }`}
                >
                  <p>{t('auth:via')}</p>
                </Col>
              </Row>
              <SocialMediaAuthentication setShowLoading={setShowLoading} />
              <Row>
                <Col
                  className={`authentication-form-wrapper__span-text ${
                    state.lang === 'en'
                      ? 'authentication-form-wrapper__span-text--en'
                      : 'authentication-form-wrapper__span-text--ar'
                  }`}
                >
                  <h6>
                    <span>{t('auth:or')}</span>
                  </h6>
                </Col>
              </Row>
              <LoginForm setShowLoading={setShowLoading} />
              <span
                className={`authentication-form-wrapper__account ${
                  state.lang === 'en'
                    ? 'authentication-form-wrapper__account--en'
                    : 'authentication-form-wrapper__account--ar'
                }`}
              >
                {t('auth:doNotHaveAccount')}{' '}
                <Button variant="link" onClick={changeToLoginOrSignUp}>
                  {t('auth:doNotHaveAccountAnswer')}
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
      <Loading
        loader="small"
        showLoadingSpinner={showLoading}
        lang={state.lang}
      />
    </Modal>
  );
}
