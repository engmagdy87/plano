import React from 'react';
import '../../assets/styles/shared/loading.scss';

export default function Loading({
  showLoadingSpinner = false,
  smallLoader = false,
}) {
  return (
    <div
      className={`loading-wrapper ${
        showLoadingSpinner ? '' : 'loading-wrapper--hide'
      } ${
        smallLoader
          ? 'loading-wrapper--small-loader'
          : 'loading-wrapper--large-loader'
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
