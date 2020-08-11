import React, { Fragment, useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { getFirstLettersOfString } from '../../helpers/StringsHelper';
import {
  getUserDataCookie,
  removeUserDataCookie,
  removeUserTokenCookie,
  removeChecklistCookie,
} from '../../helpers/CookieHelper';
import { Store } from '../../store/store';
import types from '../../store/types';
import { isUserAuthenticated } from '../../helpers/UserAuthentication';
import * as USER from '../../constants/UserAuthentication';
import '../../assets/styles/shared/avatar.scss';

export default function Avatar({ device }) {
  const { state, dispatch } = useContext(Store);
  const history = useHistory();
  const userData = getUserDataCookie();
  const [username, setUserName] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const { t } = useTranslation(['header']);

  const handleMenuVisibility = function () {
    setShowMenu(!showMenu);
  };

  const logoutUser = function () {
    removeUserDataCookie();
    removeUserTokenCookie();
    removeChecklistCookie();
    setShowMenu(!showMenu);
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
    history.push('/');
  };

  const redirectToProfile = () => {
    setShowMenu(!showMenu);
    history.push('/profile');
  };

  useEffect(() => {
    let name = '';
    if (state.userPersona.name !== '') name = state.userPersona.name;
    else if (userData !== undefined) name = userData.name;
    setUserName(name);
  }, [state.userPersona, userData]);

  return (
    <Fragment>
      <div
        role="button"
        className={`avatar-wrapper mr-3 ${
          isUserAuthenticated() === USER.NOT_AUTHENTICATED ||
          isUserAuthenticated() === USER.PARTIAL_AUTHENTICATED ||
          username === undefined ||
          username === ''
            ? 'avatar-wrapper--hide'
            : ''
        } ${
          device === 'mobile'
            ? 'avatar-wrapper--mobile'
            : 'avatar-wrapper--desktop'
        }`}
        onClick={handleMenuVisibility}
      >
        {getFirstLettersOfString(username)}
      </div>
      <ul
        className={`avatar-wrapper__menu ${
          showMenu ? 'avatar-wrapper__menu--show' : 'avatar-wrapper__menu--hide'
        }`}
      >
        <li className="avatar-wrapper__menu__item" onClick={redirectToProfile}>
          {t('header:profile')}
        </li>
        <li className="avatar-wrapper__menu__item" onClick={logoutUser}>
          {t('header:logout')}
        </li>
      </ul>
    </Fragment>
  );
}
