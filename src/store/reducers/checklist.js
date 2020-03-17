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

        case types.checklist.SET_REMOVED_TASK:
            const { removedChecklistId, removedTaskId } = action.payload
            return {
                ...state, removedTask: {
                    removedChecklistId, removedTaskId,
                    data: state.checklistData[removedChecklistId].checklist[removedTaskId]
                }
            };

        default:
            return state;
    }
}