import React, { useContext, useState, useEffect } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { Store } from '../../store/store';
import types from '../../store/types';
import '../../assets/styles/components/sortable-item.scss';

const SortableItem = SortableElement(({ data }) => {
  const { task, taskId, checklistId } = data;
  const [isTaskClicked, setIsTaskClicked] = useState(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  const { state, dispatch } = useContext(Store);
  useEffect(() => {
    if (
      state.selectedTask.selectedChecklistId === checklistId &&
      state.selectedTask.selectedTaskId === taskId
    )
      setIsTaskClicked(true);
    else setIsTaskClicked(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedTask.data]);
  return (
    <li className="sortable-item-wrapper">
      <div
        className={`input-group ${isTaskClicked ? 'input-group__active' : ''}`}
      >
        <span>=</span>
        <input
          type="checkbox"
          id={`${checklistId}${taskId}`}
          name={`${checklistId}${taskId}`}
          onChange={() => {
            dispatch({
              type: types.checklist.SET_REMOVED_TASK,
              payload: {
                removedChecklistId: checklistId,
                removedTaskId: taskId
              }
            });
            setIsTaskCompleted(!isTaskCompleted);
          }}
        />
        <label htmlFor={`${checklistId}${taskId}`}></label>
        <div
          className={`input-group__text ${
            isTaskCompleted ? 'input-group__stripe-text' : ''
          }`}
          onClick={() => {
            dispatch({
              type: types.checklist.SET_SELECTED_TASK,
              payload: {
                selectedChecklistId: checklistId,
                selectedTaskId: taskId
              }
            });
          }}
        >
          {task.text}
        </div>
      </div>
      <hr />
    </li>
  );
});
export default SortableItem;
