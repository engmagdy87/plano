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
  }, [checklistId, state.selectedTask, taskId]);
  return (
    <li
      className="sortable-item-wrapper"
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
              type: types.checklist.SET_COMPLETED_FOR_A_TASK,
              payload: {
                checklistId,
                taskId
              }
            });
            setIsTaskCompleted(!isTaskCompleted);
          }}
        />
        <label
          htmlFor={`${checklistId}${taskId}`}
          className={`${isTaskCompleted ? 'input-group__stripe-text' : ''}`}
        >
          {task.text}
        </label>
      </div>
      <hr />
    </li>
  );
});
export default SortableItem;
