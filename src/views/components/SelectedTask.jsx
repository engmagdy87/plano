import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'react-bootstrap';
import DeleteTaskDialog from '../components/dialogs/DeleteTaskDialog';
import { formatDate } from '../../helpers/DatesHelper';
import { Store } from '../../store/store';
import CustomTooltip from '../shared/CustomTooltip';
import DeleteIcon from '../../assets/images/delete.svg';
import EditIcon from '../../assets/images/edit.svg';
import MoneyBagIcon from '../../assets/images/money-bag.svg';
import CalendarIcon from '../../assets/images/calendar.png';
import types from '../../store/types';
import '../../assets/styles/components/selected-task.scss';

export default function SelectedTask({ selectedTask }) {
  const { t } = useTranslation(['home']);
  const { state, dispatch } = useContext(Store);
  const [showDialogFlag, setShowDialogFlag] = useState(false);

  const openSideDrawer = function () {
    dispatch({
      type: types.categories.SET_OPEN_TASK_FORM,
      payload: {
        flag: true,
        operation: 'edit',
      },
    });
  };

  if (Object.keys(selectedTask).length === 0) return null;
  return (
    <div className="selected-task-wrapper">
      <div className="selected-task-wrapper__header">
        <Button
          variant="outline-dark"
          disabled
          className={`selected-task-wrapper__header__button ${
            state.lang === 'en'
              ? 'selected-task-wrapper__header__button--en'
              : 'selected-task-wrapper__header__button--ar'
          }`}
        >
          {t('home:premium')}
        </Button>
        <CustomTooltip operation={t('home:deleteTask')}>
          <img
            src={DeleteIcon}
            alt="delete"
            onClick={() => setShowDialogFlag(true)}
          />
        </CustomTooltip>
        <CustomTooltip operation={t('home:editTask')}>
          <img
            src={EditIcon}
            alt="edit"
            onClick={() => openSideDrawer('edit')}
          />
        </CustomTooltip>
      </div>
      <h3
        className={`selected-task-wrapper__task-title ${
          state.lang === 'en'
            ? 'selected-task-wrapper__task-title--en'
            : 'selected-task-wrapper__task-title--ar'
        }`}
      >
        {selectedTask.data[0].title}
      </h3>
      <div
        className={`selected-task-wrapper__tag ${
          state.lang === 'en'
            ? 'selected-task-wrapper__tag--en'
            : 'selected-task-wrapper__tag--ar'
        }`}
      >
        {selectedTask.data[0].category.title}
      </div>

      <div className="selected-task-wrapper__cost">
        <div className="selected-task-wrapper__cost__img">
          <img src={MoneyBagIcon} alt="money bag" />
        </div>
        <div className="selected-task-wrapper__cost__text">
          <p
            className={`selected-task-wrapper__cost__text__title ${
              state.lang === 'en'
                ? 'selected-task-wrapper__cost__text__title--en'
                : 'selected-task-wrapper__cost__text__title--ar'
            }`}
          >
            {t('home:estimatedCost')}
          </p>
          <p
            className={`selected-task-wrapper__cost__text__date ${
              state.lang === 'en'
                ? 'selected-task-wrapper__cost__text__date--en'
                : 'selected-task-wrapper__cost__text__date--ar'
            }`}
          >
            {selectedTask.data[0].cost} {t('home:egp')}
          </p>
        </div>
      </div>
      <div className="selected-task-wrapper__due-date">
        <div className="selected-task-wrapper__due-date__img">
          <img src={CalendarIcon} alt="calendar bag" />
        </div>
        <div className="selected-task-wrapper__due-date__text">
          <p
            className={`selected-task-wrapper__due-date__text__title ${
              state.lang === 'en'
                ? 'selected-task-wrapper__due-date__text__title--en'
                : 'selected-task-wrapper__due-date__text__title--ar'
            }`}
          >
            {t('home:dueDate')}
          </p>
          {selectedTask.data[0].dueDate === '' ? (
            'DD/MM/YY'
          ) : (
            <p
              className={`selected-task-wrapper__due-date__text__date ${
                state.lang === 'en'
                  ? 'selected-task-wrapper__due-date__text__date--en'
                  : 'selected-task-wrapper__due-date__text__date--ar'
              }`}
            >
              {formatDate(new Date(selectedTask.data[0].dueDate))}
            </p>
          )}
        </div>
      </div>
      <DeleteTaskDialog
        showDialogFlag={showDialogFlag}
        resetShowDialogFlag={setShowDialogFlag}
        taskId={selectedTask.selectedTaskId}
        categoryId={selectedTask.selectedCategoryId}
      />
    </div>
  );
}
