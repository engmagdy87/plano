import types from '../types'
import {
    fetchCategories,
    createTask,
    updateTask,
    registerUser,
    loginUser,
    isIdentifierExists,
    removeTask,
    orderTaskById,
    setTaskDone,
    setTaskUnDone,
} from "../../helpers/APIsHelper"

const showToast = (dispatch, text, status) => {
    dispatch({
        type: types.categories.SET_TOAST_DATA,
        payload: {
            show: true,
            text,
            status,
        },
    });
}

const fetchCategoriesData = async (dispatch, checklistId) => {
    try {
        const response = await fetchCategories(checklistId)
        if (response) dispatch({ type: types.categories.SET_CATEGORIES_DATA, payload: response.data.categories })
        else dispatch({ type: types.categories.SET_CATEGORIES_DATA, payload: null })
    } catch (error) {
        showToast(dispatch, 'Unexpected error occurs, Please try again!', 'error')
    }
}

const orderTasks = async (dispatch, tasksOrderObject) => {
    try {
        await orderTaskById(tasksOrderObject)
    } catch (error) {
        showToast(dispatch, 'Unexpected error occurs, Please try again!', 'error')
    }
}

const createNewTask = async (dispatch, newTask) => {
    try {
        const response = await createTask(newTask)
        const task = response.data.createTask
        dispatch({
            type: types.categories.ADD_TASK,
            payload: {
                categoryId: task.category.id,
                task,
            }
        });
        showToast(dispatch, 'Task created successfully', 'success')
    } catch (error) {
        showToast(dispatch, 'Unexpected error when creating task, Please try again!', 'error')
        throw error;
    }
}

const editTask = async (dispatch, taskId, categoryId, updatedTask) => {
    try {
        const response = await updateTask(taskId, updatedTask)
        const task = response.data.updateTask;
        dispatch({
            type: types.categories.EDIT_TASK,
            payload: {
                currentCategoryId: categoryId,
                taskId,
                updatedTask: task,
            }
        });
        dispatch({
            type: types.categories.SET_SELECTED_TASK,
            payload: {
                selectedCategoryId: categoryId,
                selectedTaskId: taskId,
            }
        });
        showToast(dispatch, 'Task updated successfully', 'success')
    } catch (error) {
        showToast(dispatch, 'Unexpected error when updating task, Please try again!', 'error')
        throw error;
    }
}

const deleteTask = async (dispatch, taskId, categoryId) => {
    try {
        await removeTask(taskId)
        dispatch({
            type: types.categories.DELETE_TASK,
            payload: {
                deletedFromCategoryId: categoryId,
                deletedTaskId: taskId,
            },
        });
        showToast(dispatch, 'Task deleted successfully', 'success')
    } catch (error) {
        showToast(dispatch, 'Unexpected error when deleting task, Please try again!', 'error')
        throw error;
    }
}

const createNewUser = async (dispatch, userPersona) => {
    try {
        const response = await registerUser(userPersona)
        return response.data.register;
    } catch (error) {
        showToast(dispatch, 'Unexpected error when register user, Please try again!', 'error')
        throw error;
    }
}

const userSignIn = async (data) => {
    try {
        const response = await loginUser(data)
        return response;
    } catch (error) {
        throw error;
    }
}

const isUserExists = async (data) => {
    try {
        const response = await isIdentifierExists(data)
        return response;
    } catch (error) {
        throw error;
    }
}

const setDoneForTask = async (dispatch, taskId, categoryId, updatedTask) => {
    try {
        await setTaskDone(taskId)
        dispatch({
            type: types.categories.EDIT_TASK,
            payload: {
                currentCategoryId: categoryId,
                taskId,
                updatedTask,
            },
        });
        showToast(dispatch, 'Task set to DONE successfully', 'success')
    } catch (error) {
        showToast(dispatch, 'Unexpected error occurs, Please try again!', 'error')
        throw error;
    }
}

const setUnDoneForTask = async (dispatch, taskId, categoryId, updatedTask) => {
    try {
        await setTaskUnDone(taskId)
        dispatch({
            type: types.categories.EDIT_TASK,
            payload: {
                currentCategoryId: categoryId,
                taskId,
                updatedTask,
            },
        });
        showToast(dispatch, 'Task set to UNDONE successfully', 'success')
    } catch (error) {
        showToast(dispatch, 'Unexpected error occurs, Please try again!', 'error')
        throw error;
    }
}

export default { fetchCategoriesData, orderTasks, createNewTask, editTask, createNewUser, userSignIn, isUserExists, deleteTask, setDoneForTask, setUnDoneForTask }