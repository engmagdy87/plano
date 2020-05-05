import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { removeTask } from '../../../helpers/APIsHelper';
import { Store } from '../../../store/store';
import types from '../../../store/types';

export default function DeleteDialog({
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
  const deleteTask = () => {
    removeTask(Number(taskId))
      .then(() => {
        dispatch({
          type: types.categories.DELETE_TASK,
          payload: {
            deletedFromCategoryId: categoryId,
            deletedTaskId: taskId,
          },
        });
        handleClose();
        dispatch({
          type: types.categories.SET_TOAST_DATA,
          payload: {
            show: true,
            text: 'Task deleted successfully',
            status: 'success',
          },
        });
      })
      .catch(() => {
        dispatch({
          type: types.categories.SET_TOAST_DATA,
          payload: {
            show: true,
            text: 'Unexpected error when deleting task, Please try again!',
            status: 'error',
          },
        });
      });
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
