import types from "../types";

export default function checklistReducer(state, action) {
    switch (action.type) {
        case types.checklist.SET_CHECKLIST_DATA:
            return { ...state, checklistData: action.payload };

        // case types.checklist.SET_COMPLETED_FOR_A_TASK:
        //     const { checklistId, taskId } = action.payload
        //     state.checklistData[checklistId].checklist[taskId] = { ...state.checklistData[checklistId].checklist[taskId], "completed": true }
        //     return state;

        case types.checklist.SET_SELECTED_TASK:
            const { selectedChecklistId, selectedTaskId } = action.payload
            return {
                ...state, selectedTask: {
                    selectedChecklistId, selectedTaskId,
                    data: state.checklistData[selectedChecklistId].checklist[selectedTaskId]
                }
            };

        case types.checklist.RESET_SELECTED_TASK:
            return {
                ...state, selectedTask: {
                }
            };

        case types.checklist.SET_OPEN_TASK_FORM:
            const { flag, operation } = action.payload
            return {
                ...state, taskForm: { flag, operation }
            };

        case types.checklist.SET_TOAST_DATA:
            return {
                ...state, toastData: action.payload
            };

        default:
            return state;
    }
}