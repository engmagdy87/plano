import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { getUserCookie } from '../../helpers/CookieHelper';
import { getFirstLettersOfString } from '../../helpers/StringsHelper';
import { removeUserCookie } from '../../helpers/CookieHelper';
import '../../assets/styles/shared/avatar.scss';
import { useState } from 'react';
export default function Avatar({ device }) {
  const userCookie = getUserCookie();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuVisibility = function () {
    setShowMenu(!showMenu);
  };

  const logoutUser = function () {
    removeUserCookie();
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
        Logout
      </span>
    </Fragment>
  );
}
