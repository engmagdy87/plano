import React from 'react';
import '../../assets/styles/shared/spinner.scss';

export default function Spinner({ text = '', lang = 'en' }) {
  return (
    <div
      className="spinner-wrapper"
      style={{ direction: lang === 'en' ? 'ltr' : 'rtl' }}
    >
      <div>
        <div className="loader"></div>
        <p
          className={`spinner-wrapper__text ${
            lang === 'en'
              ? 'spinner-wrapper__text--en'
              : 'spinner-wrapper__text--ar'
          }`}
        >
          {text}
        </p>
      </div>
    </div>
  );
}
