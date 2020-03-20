import React, { useState, useContext, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { Store } from '../../store/store';
import SelectedTask from '../components/SelectedTask';
import '../../assets/styles/components/task-details-modal.scss';
import types from '../../store/types';

export default function TaskDetailsModal() {
  const { state, dispatch } = useContext(Store);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    const phoneAndTablet = window.matchMedia('(max-width:992px)');
    if (phoneAndTablet.matches) {
      dispatch({
        type: types.checklist.RESET_SELECTED_TASK
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
        <Modal.Title>View Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SelectedTask selectedTask={state.selectedTask} />
      </Modal.Body>
    </Modal>
  );
}
