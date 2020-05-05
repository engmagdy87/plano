import React, { createContext } from 'react';
import combineReducers from '../helpers/CombineReducersHelper'
import { userReducer, categoriesReducer, checklistReducer } from './reducers'
import { userState, categoriesState, checklistState } from './states'

const initialState = {
    ...userState,
    ...categoriesState,
    ...checklistState
};

export const Store = createContext();

export function StoreProvider(props) {
    const [state, dispatch] = React.useReducer(combineReducers(userReducer, categoriesReducer, checklistReducer), initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
