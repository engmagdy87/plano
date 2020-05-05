import types from '../types'
import { fetchCategories } from "../../helpers/APIsHelper"


const fetchCategoriesData = async (dispatch, checklistId) => {
    const response = await fetchCategories(checklistId)

    if (response) dispatch({ type: types.categories.SET_CATEGORIES_DATA, payload: response.data.categories })
    else dispatch({ type: types.categories.SET_CATEGORIES_DATA, payload: null })
}

export default { fetchCategoriesData }