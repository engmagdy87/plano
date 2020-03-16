import types from "../types";

export default function checklistReducer(state, action) {
    switch (action.type) {
        case types.checklist.SET_CHECKLIST_DATA:
            return { ...state, checklistData: action.payload };
        case types.checklist.SET_COMPLETED_FOR_A_TASK:
            const { checklistId, taskId } = action.payload
            state.checklistData[checklistId].checklist[taskId] = { ...state.checklistData[checklistId].checklist[taskId], "completed": true }
            return state;
        case types.checklist.SET_SELECTED_TASK:
            const { selectedChecklistId, selectedTaskId } = action.payload
            const newObject = {
                selectedChecklistId, selectedTaskId,
                data: state.checklistData[selectedChecklistId].checklist[selectedTaskId]
            }
            return { ...state, selectedTask: newObject };
        default:
            return state;
    }
}