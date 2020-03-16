import React from 'react';
import { Button } from 'react-bootstrap';
import { formatDate } from '../../helpers/DatesHelper';
import DeleteIcon from '../../assets/images/delete.svg';
import EditIcon from '../../assets/images/edit.svg';
import MoneyBagIcon from '../../assets/images/money-bag.svg';
import CalendarIcon from '../../assets/images/calendar.png';
import '../../assets/styles/components/selected-task.scss';

export default function SelectedTask({ selectedTask }) {
  return (
    <div className="selected-task-wrapper">
      <div>
        <Button variant="light">PREMIUM</Button>
        <img src={DeleteIcon} alt="delete" />
        <img src={EditIcon} alt="edit" />
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
