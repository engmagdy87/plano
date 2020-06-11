import types from '../types'
import userState from '../../store/states/user'
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

// If app in offline mode (i.e. No Internet), Backend package will not work so i18n will use fallback language so generate message manually 👇
const generateErrorMessage = (dispatch) => {
    const message = userState.lang === 'ar' ? "حاول مرة أخرى، حدث خطأ ما" : "Please try again, Something went wrong"
    showToast(dispatch, message, 'error')
}

const fetchCategoriesData = async (dispatch, checklistId) => {
    try {
        const response = await fetchCategories(checklistId)
        if (response) dispatch({ type: types.categories.SET_CATEGORIES_DATA, payload: response.data.categories })
        else dispatch({ type: types.categories.SET_CATEGORIES_DATA, payload: null })
    } catch (error) {
        generateErrorMessage(dispatch)
    }
}

const orderTasks = async (dispatch, tasksOrderObject) => {
    try {
        await orderTaskById(tasksOrderObject)
    } catch (error) {
        generateErrorMessage(dispatch)
    }
}

const createNewTask = async (dispatch, newTask, successText) => {
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
        showToast(dispatch, successText, 'success')
    } catch (error) {
        generateErrorMessage(dispatch)
        throw error;
    }
}

const editTask = async (dispatch, taskId, categoryId, updatedTask, successText) => {
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
        showToast(dispatch, successText, 'success')
    } catch (error) {
        generateErrorMessage(dispatch)
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
        generateErrorMessage(dispatch)
        throw error;
    }
}

const createNewUser = async (dispatch, userPersona) => {
    try {
        const response = await registerUser(userPersona)
        return response.data.register;
    } catch (error) {
        generateErrorMessage(dispatch)
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
        generateErrorMessage(dispatch)
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
        generateErrorMessage(dispatch)
        throw error;
    }
}

export default { fetchCategoriesData, orderTasks, createNewTask, editTask, createNewUser, userSignIn, isUserExists, deleteTask, setDoneForTask, setUnDoneForTask }