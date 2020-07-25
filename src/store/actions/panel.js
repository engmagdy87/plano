import types from '../types'
import userState from '../../store/states/user'
import {
    loginAdmin,
    listUsers,
    listAdmins,
    deleteUser
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


const adminSignIn = async (data) => {
    try {
        const response = await loginAdmin(data)
        return response;
    } catch (error) {
        throw error;
    }
}

const listAllUsers = async (dispatch) => {
    try {
        const response = await listUsers()
        dispatch({
            type: types.panel.SET_USERS,
            payload: response.data.listUsers
        })
    } catch (error) {
        generateErrorMessage(dispatch)
        throw error;
    }
}

const listAllAdmins = async (dispatch) => {
    try {
        const response = await listAdmins()
        dispatch({
            type: types.panel.SET_ADMINS,
            payload: response.data.listAdmins
        })
    } catch (error) {
        generateErrorMessage(dispatch)
        throw error;
    }
}

const removeUser = async (dispatch, userId) => {
    try {
        await deleteUser(userId)
        dispatch({
            type: types.panel.DELETE_USER,
            payload: userId
        });
        showToast(dispatch, 'User deleted successfully', 'success')
    } catch (error) {
        generateErrorMessage(dispatch)
        throw error;
    }
}

export default { adminSignIn, listAllUsers, listAllAdmins, removeUser }