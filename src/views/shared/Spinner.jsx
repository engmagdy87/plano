import React from 'react';
import '../../assets/styles/shared/spinner.scss';

export default function Spinner({ text = '', lang }) {
  return (
    <div className="spinner-wrapper">
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
