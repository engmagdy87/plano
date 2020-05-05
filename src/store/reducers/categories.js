import types from "../types";

export default function categoriesReducer(state, action) {
    switch (action.type) {
        case types.categories.SET_CATEGORIES_DATA:
            if (!action.payload) return {
                ...state, categoriesData: action.payload
            };
            if (action.payload[0].tasks.length > 0)
                return {
                    ...state, categoriesData: action.payload, selectedTask: {
                        selectedCategoryId: action.payload[0].id, selectedTaskId: action.payload[0].tasks[0].id,
                        data: [action.payload[0].tasks[0]]
                    }
                };
            return {
                ...state, categoriesData: action.payload
            };
        case types.categories.ADD_TASK:
            const { categoryId, task } = action.payload
            const categoryItemIndex = state.categoriesData.findIndex(category => Number(category.id) === Number(categoryId))
            const categoriesData = [...state.categoriesData]
            const category = { ...categoriesData[categoryItemIndex] }

            category.tasks = [...category.tasks, task]
            categoriesData[categoryItemIndex] = category

            return { ...state, categoriesData }

        case types.categories.EDIT_TASK:
            const { currentCategoryId,
                taskId,
                updatedTask } = action.payload
            const categoryIndex = state.categoriesData.findIndex(category => Number(category.id) === Number(currentCategoryId))
            const newTasks = state.categoriesData[categoryIndex].tasks.map(task => {
                if (Number(task.id) === Number(taskId))
                    return updatedTask
                return task
            })
            const categories = [...state.categoriesData]
            const currentCategory = { ...categories[categoryIndex] }
            currentCategory.tasks = newTasks
            categories[categoryIndex] = currentCategory

            return { ...state, categoriesData: categories }

        case types.categories.DELETE_TASK:
            const { deletedFromCategoryId,
                deletedTaskId,
            } = action.payload
            const deletedFromCategoryIndex = state.categoriesData.findIndex(category => Number(category.id) === Number(deletedFromCategoryId))
            const updatedTasks = state.categoriesData[deletedFromCategoryIndex].tasks.filter(task => Number(task.id) !== Number(deletedTaskId))
            const newCategories = [...state.categoriesData]

            const newCategory = { ...newCategories[deletedFromCategoryIndex] }
            newCategory.tasks = updatedTasks
            newCategories[deletedFromCategoryIndex] = newCategory

            return { ...state, categoriesData: newCategories }

        case types.categories.SET_SELECTED_TASK:
            const { selectedCategoryId, selectedTaskId } = action.payload
            const selectedCategory = state.categoriesData.filter(category => Number(category.id) === Number(selectedCategoryId))

            if (selectedCategory.length === 0)
                return state

            const selectedTask = selectedCategory[0].tasks.filter(task => Number(task.id) === Number(selectedTaskId))

            return {
                ...state, selectedTask: {
                    selectedCategoryId, selectedTaskId,
                    data: selectedTask
                }
            };

        case types.categories.RESET_SELECTED_TASK:
            return {
                ...state, selectedTask: {
                }
            };

        case types.categories.SET_OPEN_TASK_FORM:
            const { flag, operation } = action.payload
            return {
                ...state, taskForm: { flag, operation }
            };

        case types.categories.SET_TOAST_DATA:
            return {
                ...state, toastData: action.payload
            };

        default:
            return state;
    }
}
