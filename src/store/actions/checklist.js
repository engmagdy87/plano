import types from '../types'
import MENU_ITEMS from '../../assets/data/menu-items.json';


const fetchChecklistData = async (dispatch) => {
    await dispatch({ type: types.checklist.SET_CHECKLIST_DATA, payload: MENU_ITEMS })
}

export default { fetchChecklistData }