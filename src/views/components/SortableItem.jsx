import React, { useContext, useState, useEffect } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { Store } from '../../store/store';
import { categoriesActions } from '../../store/actions';
import types from '../../store/types';
import '../../assets/styles/components/sortable-item.scss';

const SortableItem = SortableElement(({ data }) => {
  const { task, taskId, categoryId } = data;
  const [isTaskClicked, setIsTaskClicked] = useState(false);
  const [isTaskDone, setIsTaskDone] = useState(data.task.done);

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

  const toggleTaskDone = async (e) => {
    const taskStatus = e.target.checked;
    if (taskStatus) {
      await categoriesActions.setDoneForTask(
        dispatch,
        Number(taskId),
        Number(data.categoryId),
        { ...data.task, done: taskStatus }
      );
      setIsTaskDone(true);
    } else {
      await categoriesActions.setUnDoneForTask(
        dispatch,
        Number(taskId),
        Number(data.categoryId),
        { ...data.task, done: taskStatus }
      );
      setIsTaskDone(false);
    }
  };
  return (
    <li className="sortable-item-wrapper">
      <div
        className={`input-group ${isTaskClicked ? 'input-group__active' : ''}`}
      >
        <span
          className={`input-group__delimiter ${
            state.lang === 'en'
              ? 'input-group__delimiter--en'
              : 'input-group__delimiter--ar'
          }`}
        >
          =
        </span>
        <input
          type="checkbox"
          id={`${categoryId}${taskId}`}
          name={`${categoryId}${taskId}`}
          onChange={toggleTaskDone}
          checked={isTaskDone}
        />
        <label
          htmlFor={`${categoryId}${taskId}`}
          className={`${task.overDue ? 'input-group__over-due' : ''} ${
            state.lang === 'en'
              ? 'input-group__en-label'
              : 'input-group__ar-label'
          }`}
        ></label>
        <div
          className={`input-group__text ${
            isTaskDone ? 'input-group__stripe-text' : ''
          } ${
            state.lang === 'en'
              ? 'input-group__text--en'
              : 'input-group__text--ar'
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
