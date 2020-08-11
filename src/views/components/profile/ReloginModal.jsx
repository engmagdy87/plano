import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Container, Row, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Store } from '../../../store/store';
import types from '../../../store/types';
import '../../../assets/styles/components/authentication-form.scss';

export default function ReloginModal() {
  const { t } = useTranslation(['auth']);
  const { state, dispatch } = useContext(Store);
  const history = useHistory();
  const redirectUser = function () {
    dispatch({
      type: types.categories.SET_TOAST_DATA,
      payload: {
        show: false,
        text: '',
        status: '',
      },
    });
    dispatch({
      type: types.user.SET_SHOW_RELOGIN_MODAL,
      payload: false,
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
              onClick={redirectUser}
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
