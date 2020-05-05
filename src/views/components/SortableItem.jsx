import React, { useContext, useState, useEffect } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { Store } from '../../store/store';
import types from '../../store/types';
import '../../assets/styles/components/sortable-item.scss';

const SortableItem = SortableElement(({ data }) => {
  const { task, taskId, categoryId } = data;
  const [isTaskClicked, setIsTaskClicked] = useState(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  const { state, dispatch } = useContext(Store);
  useEffect(() => {
    if (
      state.selectedTask.selectedCategoryId === categoryId &&
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
          id={`${categoryId}${taskId}`}
          name={`${categoryId}${taskId}`}
          onChange={() => {
            dispatch({
              type: types.categories.SET_REMOVED_TASK,
              payload: {
                removedCategoriesId: categoryId,
                removedTaskId: taskId,
              },
            });
            setIsTaskCompleted(!isTaskCompleted);
          }}
        />
        <label htmlFor={`${categoryId}${taskId}`}></label>
        <div
          className={`input-group__text ${
            isTaskCompleted ? 'input-group__stripe-text' : ''
          }`}
          onClick={() => {
            dispatch({
              type: types.categories.SET_SELECTED_TASK,
              payload: {
                selectedCategoryId: categoryId,
                selectedTaskId: taskId,
              },
            });
          }}
        >
          {task.title}
        </div>
      </div>
      <hr />
    </li>
  );
});
export default SortableItem;
