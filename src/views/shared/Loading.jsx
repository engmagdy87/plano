import React from 'react';
import '../../assets/styles/shared/loading.scss';

export default function Loading({
  showLoadingSpinner = false,
  smallLoader = false,
  lang = 'en',
}) {
  return (
    <div
      className={`loading-wrapper ${
        showLoadingSpinner ? '' : 'loading-wrapper--hide'
      } ${
        smallLoader
          ? 'loading-wrapper--small-loader'
          : 'loading-wrapper--large-loader'
      } ${
        lang === 'en'
          ? 'loading-wrapper--large-loader--en'
          : 'loading-wrapper--large-loader--ar'
      }`}
    >
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
