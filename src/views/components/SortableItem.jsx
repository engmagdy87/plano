import React, { useContext, useState, useEffect } from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { Store } from '../../store/store';
import { setTaskDone, setTaskUnDone } from '../../helpers/APIsHelper';
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

  const successSetTaskToDone = (status) => {
    dispatch({
      type: types.categories.EDIT_TASK,
      payload: {
        currentCategoryId: Number(data.categoryId),
        taskId,
        updatedTask: { ...data.task, done: status },
      },
    });
    setIsTaskDone(!isTaskDone);
    dispatch({
      type: types.categories.SET_TOAST_DATA,
      payload: {
        show: true,
        text: `Task set to ${status ? 'DONE' : 'UNDONE'} successfully`,
        status: 'success',
      },
    });
  };

  const failedSetTaskToDone = () => {
    dispatch({
      type: types.categories.SET_TOAST_DATA,
      payload: {
        show: true,
        text: 'Unexpected error occurs, Please try again!',
        status: 'error',
      },
    });
  };

  const toggleTaskDone = (e) => {
    const taskStatus = e.target.checked;
    if (taskStatus)
      setTaskDone(Number(taskId))
        .then(() => {
          successSetTaskToDone(taskStatus);
        })
        .catch(() => {
          failedSetTaskToDone();
        });
    else
      setTaskUnDone(Number(taskId))
        .then(() => {
          successSetTaskToDone(taskStatus);
        })
        .catch(() => {
          failedSetTaskToDone();
        });
  };
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
          onChange={toggleTaskDone}
          checked={isTaskDone}
        />
        <label
          htmlFor={`${categoryId}${taskId}`}
          className={task.overDue ? 'input-group__over-due' : ''}
        ></label>
        <div
          className={`input-group__text ${
            isTaskDone ? 'input-group__stripe-text' : ''
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
