import types from "../types";

export default function panelReducer(state, action) {
    switch (action.type) {
        case types.panel.SET_USERS:
            return { ...state, users: action.payload };
        case types.panel.SET_ADMINS:
            return { ...state, admins: action.payload };
        case types.panel.SET_TOKEN:
            return { ...state, token: action.payload };
        case types.panel.SET_SELECTED_USER:
            return { ...state, selectedUser: action.payload };
        case types.panel.DELETE_USER:
            const userId = action.payload
            const updatedUsers = state.users.filter(user => Number(user.id) !== userId)

            return { ...state, users: [...updatedUsers] }

        default:
            return state;
    }
}