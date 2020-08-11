import types from '../types'

export default function userReducer(state, action) {
    switch (action.type) {
        case types.user.SET_USER_SIGN_UP_FORM:
            state.userPersona = { ...state.userPersona, ...action.payload }
            return state;
        case types.user.SET_USER_GENDER:
            state.userPersona = { ...state.userPersona, gender: action.payload }
            return state;
        case types.user.SET_USER_NAME:
            state.userPersona = { ...state.userPersona, name: action.payload }
            return state;
        case types.user.SET_USER_SPOUSE_NAME:
            state.userPersona = { ...state.userPersona, spouseName: action.payload }
            return state;
        case types.user.SET_USER_MARRIAGE_DATE:
            state.userPersona = { ...state.userPersona, marriageDate: action.payload }
            return state;
        case types.user.SET_USER_PREP_COST:
            state.userPersona = { ...state.userPersona, prepCost: action.payload }
            return state;
        case types.user.SET_IS_USER_AUTH_FORM:
            return { ...state, userAuthenticationForm: action.payload };
        case types.user.SET_SHOW_CHANGE_PASSWORD_MODAL:
            return { ...state, isChangePasswordModalShown: action.payload };
        case types.user.SET_SHOW_RELOGIN_MODAL:
            return { ...state, isReloginModalShown: action.payload };
        case types.user.SET_LANG:
            return { ...state, lang: action.payload };
        default:
            return state;
    }
}
