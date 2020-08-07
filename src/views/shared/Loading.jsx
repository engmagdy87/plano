import React from 'react';
import '../../assets/styles/shared/loading.scss';

export default function Loading({
  showLoadingSpinner = false,
  loader,
  lang = 'en',
}) {
  const getCorrespondingCssClass = () => {
    if (loader === 'small') return 'loading-wrapper--small-loader';
    if (loader === 'large') return 'loading-wrapper--large-loader';
    if (loader === 'full-screen') return 'loading-wrapper--full-screen-loader';
  };
  return (
    <div
      className={`loading-wrapper ${
        showLoadingSpinner ? '' : 'loading-wrapper--hide'
      } ${getCorrespondingCssClass()} ${
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
