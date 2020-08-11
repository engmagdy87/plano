import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Modal,
  Container,
  Row,
  Button,
  Form,
  InputGroup,
} from 'react-bootstrap';
import { Store } from '../../../store/store';
import { useForm } from 'react-hook-form';
import { userActions } from '../../../store/actions';
import {
  removeUserDataCookie,
  removeUserTokenCookie,
  removeChecklistCookie,
} from '../../../helpers/CookieHelper';
import types from '../../../store/types';
import ShowLogo from '../../../assets/images/show.svg';
import HideLogo from '../../../assets/images/hide.svg';
import '../../../assets/styles/components/authentication-form.scss';

export default function ChangePasswordModal({ setShowLoadingSpinner }) {
  const { t } = useTranslation(['auth']);
  const { state, dispatch } = useContext(Store);

  const handleClose = () => {
    dispatch({
      type: types.user.SET_SHOW_CHANGE_PASSWORD_MODAL,
      payload: false,
    });
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewRePassword, setShowNewRePassword] = useState(false);

  const toggleNewPasswordIcon = function () {
    setShowNewPassword(!showNewPassword);
  };

  const toggleNewRePasswordIcon = function () {
    setShowNewRePassword(!showNewRePassword);
  };

  const { register, handleSubmit, errors, watch } = useForm();
  const onSubmit = async (data) => {
    setShowLoadingSpinner(true);

    const result = await userActions.changePassword(dispatch, data);
    setShowLoadingSpinner(false);

    if (!result.isErrorExists) {
      dispatch({
        type: types.categories.SET_TOAST_DATA,
        payload: {
          show: true,
          text: t('auth:successfulPasswordChange'),
          status: 'success',
        },
      });
      dispatch({
        type: types.user.SET_SHOW_RELOGIN_MODAL,
        payload: true,
      });
      removeUserDataCookie();
      removeUserTokenCookie();
      removeChecklistCookie();
      dispatch({
        type: types.user.SET_USER_SIGN_UP_FORM,
        payload: {
          identifier: '',
          password: '',
          confirmPassword: '',
          gender: '',
          marriageDate: '',
          name: '',
          spouseName: '',
          prepCost: 0,
        },
      });

      handleClose();
    } else
      dispatch({
        type: types.categories.SET_TOAST_DATA,
        payload: {
          show: true,
          text: t('profile:unexpectedUpdateError'),
          status: 'error',
        },
      });
  };

  return (
    <Modal
      show={state.isChangePasswordModalShown}
      onHide={handleClose}
      centered
      className="authentication-form-wrapper"
    >
      <Modal.Header closeButton>
        <Modal.Title
          className={`authentication-form-wrapper__title ${
            state.lang === 'en'
              ? 'authentication-form-wrapper__title--en'
              : 'authentication-form-wrapper__title--ar'
          }`}
        >
          {t('auth:changePasswordTitle')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="authentication-form-wrapper">
        <Container>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group controlId="signup-password" className="auth-form-input">
              <Form.Label
                className={`auth-form-label ${
                  state.lang === 'en'
                    ? 'auth-form-label--en'
                    : 'auth-form-label--ar'
                }`}
              >
                {t('auth:newPassword')}
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={showNewPassword ? 'text' : 'password'}
                  placeholder={t('auth:newPasswordPlaceholder')}
                  name="password"
                  ref={register({
                    required: true,
                    minLength: 8,
                    pattern: /^[a-zA-Z0-9]+$/,
                  })}
                  className={`${
                    state.lang === 'en'
                      ? 'form-control--en'
                      : 'form-control--ar'
                  }`}
                />
                <InputGroup.Prepend>
                  <InputGroup.Text
                    id="inputGroupPrepend"
                    onClick={toggleNewPasswordIcon}
                  >
                    {showNewPassword ? (
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
                  {t('auth:newPasswordConfirmation')}
                </Form.Label>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type={showNewRePassword ? 'text' : 'password'}
                  placeholder={t('auth:newPasswordConfirmationPlaceholder')}
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
                    state.lang === 'en'
                      ? 'form-control--en'
                      : 'form-control--ar'
                  }`}
                />
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroupPrepend">
                    <div onClick={toggleNewRePasswordIcon}>
                      {showNewRePassword ? (
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
                  {t('auth:confirm')}
                </Button>
              </Row>
            </Container>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
