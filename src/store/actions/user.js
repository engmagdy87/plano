import types from '../types'
import userState from '../../store/states/user'
import {
    registerUser,
    updateUserProfile,
    setupUser,
    loginUser,
    isIdentifierExists,
    sendForgotPasswordRequest,
    setNewPasswordRequest,
    loginUserWithFacebook,
    changeUserPassword
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

const createNewUser = async (dispatch, userPersona) => {
    try {
        const response = await registerUser(userPersona)
        if (response.errors) return { isErrorExists: true, data: response.errors[0].message }
        return { isErrorExists: false, data: response.data.register };
    } catch (error) {
        generateErrorMessage(dispatch)
        throw error;
    }
}

const updateUser = async (dispatch, userPersona) => {
    try {
        const response = await updateUserProfile(userPersona)
        if (response.errors) return { isErrorExists: true, data: response.errors[0].message }
        return { isErrorExists: false, data: response.data.updateProfile };
    } catch (error) {
        generateErrorMessage(dispatch)
        throw error;
    }
}

const changePassword = async (dispatch, userPersona) => {
    try {
        const response = await changeUserPassword(userPersona)
        if (response.errors) return { isErrorExists: true, data: response.errors[0].message }
        return { isErrorExists: false, data: response.data.updateProfile };
    } catch (error) {
        generateErrorMessage(dispatch)
        throw error;
    }
}

const setupUserSteps = async (dispatch, userPersona) => {
    try {
        const response = await setupUser(userPersona)
        return response.data.setupUser
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

const userSignInWithFacebook = async (dispatch, data) => {
    try {
        const response = await loginUserWithFacebook(data)
        return response;
    } catch (error) {
        generateErrorMessage(dispatch)
        throw error;
    }
}

const sendForgotPassword = async (data) => {
    try {
        const response = await sendForgotPasswordRequest(data)
        return response;
    } catch (error) {
        throw error;
    }
}

const setNewPassword = async (data) => {
    try {
        const response = await setNewPasswordRequest(data)
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


export default { createNewUser, userSignIn, isUserExists, setupUserSteps, sendForgotPassword, setNewPassword, userSignInWithFacebook, updateUser, changePassword }