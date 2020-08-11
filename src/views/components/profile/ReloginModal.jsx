import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Container, Row, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Store } from '../../../store/store';
import types from '../../../store/types';
import {
  removeUserDataCookie,
  removeUserTokenCookie,
  removeChecklistCookie,
} from '../../../helpers/CookieHelper';
import '../../../assets/styles/components/authentication-form.scss';

export default function ReloginModal() {
  const { t } = useTranslation(['auth']);
  const { state, dispatch } = useContext(Store);
  const history = useHistory();
  const logoutUser = function () {
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
    dispatch({
      type: types.user.SET_SHOW_RELOGIN_MODAL,
      payload: false,
    });
    dispatch({
      type: types.categories.SET_TOAST_DATA,
      payload: {
        show: false,
        text: '',
        status: '',
      },
    });
    history.push('/');
  };
  return (
    <Modal
      show={state.isReloginModalShown}
      centered
      backdrop="static"
      className="authentication-form-wrapper"
    >
      <Modal.Header>
        <Modal.Title
          className={`${
            state.lang === 'en'
              ? 'authentication-form-wrapper__title--en'
              : 'authentication-form-wrapper__title--ar'
          }`}
        >
          {t('auth:relogin')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="authentication-form-wrapper">
        <Container>
          <Row className="auth-form-action">
            <Button
              size="lg"
              block
              onClick={logoutUser}
              className={`auth-form-action__button ${
                state.lang === 'en'
                  ? 'auth-form-action__button--en'
                  : 'auth-form-action__button--ar'
              }`}
            >
              {t('auth:ok')}
            </Button>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
