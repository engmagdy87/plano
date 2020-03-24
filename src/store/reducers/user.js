import types from '../types'

export default function userReducer(state, action) {
    switch (action.type) {
        case types.user.SET_USER_PERSONA:
            return { ...state, userPersona: action.payload };
        case types.user.SET_IS_USER_LOGGED_IN:
            return { ...state, isUserLoggedIn: action.payload };
        case types.user.SET_IS_USER_AUTH_FORM:
            return { ...state, userAuthenticationForm: action.payload };
        default:
            return state;
    }
}
