import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { getFirstLettersOfString } from '../../helpers/StringsHelper';
import {
  getUserCookie,
  removeUserCookie,
  removeChecklistCookie,
} from '../../helpers/CookieHelper';
import '../../assets/styles/shared/avatar.scss';

export default function Avatar({ device }) {
  const userCookie = getUserCookie();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);
  const { t } = useTranslation(['header']);

  const handleMenuVisibility = function () {
    setShowMenu(!showMenu);
  };

  const logoutUser = function () {
    removeUserCookie();
    removeChecklistCookie();
    history.push('/');
  };

  return (
    <Fragment>
      <div
        role="button"
        tabIndex="0"
        className={`avatar-wrapper mr-3 ${
          userCookie === undefined ? 'avatar-wrapper--hide' : ''
        } ${
          device === 'mobile'
            ? 'avatar-wrapper--mobile'
            : 'avatar-wrapper--desktop'
        }`}
        onClick={handleMenuVisibility}
      >
        {userCookie === undefined
          ? ''
          : getFirstLettersOfString(userCookie.name)}
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
