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
        tabIndex="0"
        className={`avatar-wrapper mr-3 ${
          isUserAuthenticated() === USER.NOT_AUTHENTICATED ||
          isUserAuthenticated() === USER.PARTIAL_AUTHENTICATED
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
      <span
        className={`avatar-wrapper__menu ${
          showMenu ? 'avatar-wrapper__menu--show' : 'avatar-wrapper__menu--hide'
        }`}
        onClick={logoutUser}
      >
        {t('header:logout')}
      </span>
    </Fragment>
  );
}
