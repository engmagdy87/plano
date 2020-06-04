import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { panelActions } from '../../../store/actions';
import { Store } from '../../../store/store';

export default function DeleteUserDialog({
  showDialogFlag,
  resetShowDialogFlag,
  userId,
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
  const deleteUser = async () => {
    await panelActions.removeUser(dispatch, Number(userId));

    handleClose();
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete user?</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={deleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
