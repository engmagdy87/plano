import React, { Fragment, useState, useEffect, useContext } from 'react';
import '../../assets/styles/shared/avatar.scss';
import { Toast } from 'react-bootstrap';
import '../../assets/styles/shared/toast.scss';
import types from '../../store/types';
import { Store } from '../../store/store';

export default function Avatar({ show, text }) {
  const { dispatch } = useContext(Store);
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    setShowToast(show);
  }, [show]);
  const closeToast = function() {
    setShowToast(false);
    dispatch({
      type: types.checklist.SET_TOAST_DATA,
      payload: {
        show: false,
        text: ''
      }
    });
  };
  return (
    <Fragment>
      <Toast
        show={showToast}
        delay={3000}
        autohide
        onClose={closeToast}
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 120
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{text}</strong>
        </Toast.Header>
      </Toast>
    </Fragment>
  );
}
