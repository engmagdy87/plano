import React from 'react';
import '../../assets/styles/shared/spinner.scss';

export default function Spinner({ text = '' }) {
  return (
    <div className="spinner-wrapper">
      <div>
        <div className="loader"></div>
        <p>{text}</p>
      </div>
    </div>
  );
}
