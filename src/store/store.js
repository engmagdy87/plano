import React, { createContext } from 'react';
import combineReducers from '../helpers/CombineReducersHelper'
import { userReducer, checklistReducer } from './reducers'
import { userState, checklistState } from './states'


const initialState = {
    ...userState,
    ...checklistState
};

export const Store = createContext();

export function StoreProvider(props) {
    const [state, dispatch] = React.useReducer(combineReducers(userReducer, checklistReducer), initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
