import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
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
  const { dispatch } = useContext(Store);

  const openSideDrawer = function() {
    dispatch({
      type: types.checklist.SET_OPEN_TASK_FORM,
      payload: {
        flag: true,
        operation: 'edit'
      }
    });
  };

  if (Object.keys(selectedTask).length === 0) return null;
  return (
    <div className="selected-task-wrapper">
      <div>
        <Button variant="outline-dark" disabled>
          PREMIUM
        </Button>
        <CustomTooltip operation="Delete">
          <img
            src={DeleteIcon}
            alt="delete"
            onClick={() => {
              console.log('DELETE');
            }}
          />
        </CustomTooltip>
        <CustomTooltip operation="Edit">
          <img
            src={EditIcon}
            alt="edit"
            onClick={() => openSideDrawer('edit')}
          />
        </CustomTooltip>
      </div>
      <h3>{selectedTask.data.text}</h3>
      <div className="selected-task-wrapper__tag">{selectedTask.data.tag}</div>

      <div className="selected-task-wrapper__cost">
        <div>
          <img src={MoneyBagIcon} alt="money bag" />
        </div>
        <div>
          <p>Estimated Cost</p>
          <p>{selectedTask.data.cost} EGP</p>
        </div>
      </div>
      <div className="selected-task-wrapper__due-date">
        <div>
          <img src={CalendarIcon} alt="calendar bag" />
        </div>
        <div>
          <p>Due Date</p>
          {selectedTask.data.due_date === '' ? (
            'DD/MM/YY'
          ) : (
            <p>{formatDate(new Date(selectedTask.data.due_date))}</p>
          )}
        </div>
      </div>
    </div>
  );
}
