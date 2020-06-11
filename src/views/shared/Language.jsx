import React, { Fragment, useState, useContext } from 'react';
import { setLanguageCookie } from '../../helpers/CookieHelper';
import EgyptFlagIcon from '../../assets/images/egypt.png';
import UKFlagIcon from '../../assets/images/uk.png';
import '../../assets/styles/shared/languages.scss';
import { Store } from '../../store/store';
import types from '../../store/types';

export default function Language({ changeLanguage }) {
  const { state, dispatch } = useContext(Store);
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuVisibility = () => {
    setShowMenu(!showMenu);
  };

  const toggleLanguage = (lang) => {
    changeLanguage(lang);
    setLanguageCookie(lang);
    dispatch({
      type: types.user.SET_LANG,
      payload: lang,
    });
    setShowMenu(false);
  };

  return (
    <Fragment>
      <div
        role="button"
        tabIndex="0"
        className="language-wrapper mr-3"
        onClick={handleMenuVisibility}
      >
        {state.lang === 'ar' ? (
          <img src={EgyptFlagIcon} alt="egypt flag" />
        ) : (
          <img src={UKFlagIcon} alt="uk flag" />
        )}
      </div>
      <span
        className={`language-wrapper__menu ${
          showMenu
            ? 'language-wrapper__menu--show'
            : 'language-wrapper__menu--hide'
        }`}
      >
        {state.lang === 'en' ? (
          <img
            src={EgyptFlagIcon}
            alt="egypt flag"
            onClick={() => toggleLanguage('ar')}
          />
        ) : (
          <img
            src={UKFlagIcon}
            alt="uk flag"
            onClick={() => toggleLanguage('en')}
          />
        )}
      </span>
    </Fragment>
  );
}
