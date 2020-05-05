import types from "../types";

export default function checklistReducer(state, action) {
    switch (action.type) {
        case types.checklist.SET_CURRENT_CHECKLIST:
            return { ...state, currentChecklistId: action.payload };

        default:
            return state;
    }
}