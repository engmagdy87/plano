import types from '../types'
import {
    loginAdmin,
    listUsers,
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
        showToast(dispatch, 'Unexpected error when list users, Please try again!', 'error')
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
        showToast(dispatch, 'Unexpected error when deleting user, Please try again!', 'error')
        throw error;
    }
}

export default { adminSignIn, listAllUsers, removeUser }