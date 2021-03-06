import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Button } from 'react-bootstrap';
import { categoriesActions } from '../../../store/actions';
import { Store } from '../../../store/store';

export default function DeleteTaskDialog({
  showDialogFlag,
  resetShowDialogFlag,
  taskId,
  categoryId,
}) {
  const { t } = useTranslation(['task']);
  const { state, dispatch } = useContext(Store);
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
      <Modal
        show={show}
        onHide={handleClose}
        centered
        style={{ direction: state.lang === 'en' ? 'ltr' : 'rtl' }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t('task:deleteTitle')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t('task:deleteConfirmationQuestion')}</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            {t('task:deleteConfirmationNegativeAnswer')}
          </Button>
          <Button variant="danger" onClick={deleteTask}>
            {t('task:deleteConfirmationPositiveAnswer')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
