import React, { useState, useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Store } from '../../store/store';
import SelectedTask from '../components/SelectedTask';
import types from '../../store/types';
import '../../assets/styles/components/task-details-modal.scss';

export default function TaskDetailsModal() {
  const { t } = useTranslation(['task']);
  const { state, dispatch } = useContext(Store);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    const phoneAndTablet = window.matchMedia('(max-width:992px)');
    if (phoneAndTablet.matches) {
      dispatch({
        type: types.categories.RESET_SELECTED_TASK,
      });
    }
  };

  useEffect(() => {
    if (Object.keys(state.selectedTask).length !== 0) {
      setShow(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedTask]);
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title
          className={`${
            state.lang === 'en'
              ? 'task-details-wrapper__title--en'
              : 'task-details-wrapper__title--ar'
          }`}
        >
          {t('task:view')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SelectedTask selectedTask={state.selectedTask} />
      </Modal.Body>
    </Modal>
  );
}
