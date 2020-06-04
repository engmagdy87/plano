import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { categoriesActions } from '../../../store/actions';
import { Store } from '../../../store/store';

export default function DeleteTaskDialog({
  showDialogFlag,
  resetShowDialogFlag,
  taskId,
  categoryId,
}) {
  const { dispatch } = useContext(Store);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    resetShowDialogFlag(false);
  };
  useEffect(() => {
    setShow(showDialogFlag);
  }, [showDialogFlag]);
  const deleteTask = async () => {
    await categoriesActions.deleteTask(dispatch, Number(taskId), categoryId);

    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete task?</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteTask}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
