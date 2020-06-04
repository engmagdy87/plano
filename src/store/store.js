import React, { createContext } from 'react';
import combineReducers from '../helpers/CombineReducersHelper'
import { userReducer, categoriesReducer, checklistReducer, panelReducer } from './reducers'
import { userState, categoriesState, checklistState, panelState } from './states'

const initialState = {
    ...userState,
    ...categoriesState,
    ...checklistState,
    ...panelState
};

export const Store = createContext();

export function StoreProvider(props) {
    const [state, dispatch] = React.useReducer(combineReducers(userReducer, categoriesReducer, checklistReducer, panelReducer), initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
