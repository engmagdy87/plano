import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import Language from './Language';
import { Store } from '../../store/store';
import AuthenticationForm from '../components/authentication/AuthenticationForm';
import { setChecklistCookie } from '../../helpers/CookieHelper';
import { isUserAuthenticated } from '../../helpers/UserAuthentication';
import * as USER from '../../constants/UserAuthentication';
import Avatar from '../shared/Avatar';
import LogoIcon from '../../assets/images/logo.png';
import types from '../../store/types';
import EgyptFlagIcon from '../../assets/images/egypt.png';
import UKFlagIcon from '../../assets/images/uk.png';
import '../../assets/styles/shared/header.scss';
export default function Header({ activePath }) {
  const { t, i18n } = useTranslation(['header']);
  const { state, dispatch } = useContext(Store);
  const history = useHistory();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const showLogin = function () {
    dispatch({
      type: types.user.SET_IS_USER_AUTH_FORM,
      payload: { show: true, authType: 'login' },
    });
  };
  const showSignUp = function () {
    dispatch({
      type: types.user.SET_IS_USER_AUTH_FORM,
      payload: { show: true, authType: 'signup' },
    });
  };

  const setChecklistId = function () {
    if (isUserAuthenticated() === USER.AUTHENTICATED) {
      setChecklistCookie(1);
      dispatch({
        type: types.checklist.SET_CURRENT_CHECKLIST,
        payload: 1,
      });
      history.push({ pathname: '/home' });
    } else history.push({ pathname: '/' });
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="header-wrapper"
      style={{ direction: state.lang === 'en' ? 'ltr' : 'rtl' }}
    >
      <Navbar.Brand href="/">
        <img src={LogoIcon} alt="plano logo" className="header-wrapper__logo" />
      </Navbar.Brand>
      <div className="ml-auto mr-3 header-wrapper__flag">
        {state.lang === 'ar' ? (
          <img src={EgyptFlagIcon} alt="egypt flag" />
        ) : (
          <img src={UKFlagIcon} alt="uk flag" />
        )}
      </div>
      <Avatar device="mobile" />
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav
          className={`header-wrapper__nav ${
            state.lang === 'en' ? 'mr-auto' : 'ml-auto'
          }`}
        >
          <Nav.Link
            className={`header-wrapper__link ${
              activePath === 'home' ? 'header-wrapper__link--active' : ''
            } ${
              state.lang === 'en'
                ? 'header-wrapper__link--en'
                : 'header-wrapper__link--ar'
            }`}
            onClick={setChecklistId}
          >
            {t('header:weddingCategories')}
          </Nav.Link>
          <Nav.Link
            href="#"
            className={`header-wrapper__link ${
              state.lang === 'en'
                ? 'header-wrapper__link--en'
                : 'header-wrapper__link--ar'
            }`}
          >
            {t('header:blog')}
          </Nav.Link>
        </Nav>
        <Nav
          className={`mr-sm-5 header-wrapper__left-buttons ${
            isUserAuthenticated() === USER.NOT_AUTHENTICATED
              ? 'd-none d-md-flex'
              : ''
          } ${
            state.lang === 'en'
              ? 'header-wrapper__left-buttons--en'
              : 'header-wrapper__left-buttons--ar'
          }`}
        >
          <Nav.Link>
            <Button
              className={`${
                activePath === 'build-profile' ||
                isUserAuthenticated() === USER.AUTHENTICATED
                  ? 'header-wrapper__link--hide'
                  : ''
              } ${
                state.lang === 'en'
                  ? 'header-wrapper__link--en'
                  : 'header-wrapper__link--ar'
              }`}
              onClick={showSignUp}
            >
              {t('header:signUp')}
            </Button>
          </Nav.Link>
          <Nav.Link>
            <Button
              variant="link"
              className={`${
                activePath === 'build-profile' ||
                isUserAuthenticated() === USER.AUTHENTICATED
                  ? 'header-wrapper__link--hide'
                  : ''
              } ${
                state.lang === 'en'
                  ? 'header-wrapper__link--en'
                  : 'header-wrapper__link--ar'
              }`}
              onClick={showLogin}
            >
              {t('header:login')}
            </Button>
          </Nav.Link>
          <Nav.Link href="#" style={{ marginTop: '-4px' }}>
            <Avatar device="desktop" />
          </Nav.Link>
          <Nav.Link href="#" className="d-none d-md-block">
            <Language changeLanguage={changeLanguage} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <AuthenticationForm />
    </Navbar>
  );
}
