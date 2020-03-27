import React from 'react';
import '../../assets/styles/shared/spinner.scss';

export default function Spinner() {
  return (
    <div className="spinner-wrapper">
      <div>
        <div className="loader"></div>
        <p>Your profile is building...</p>
      </div>
    </div>
  );
}
