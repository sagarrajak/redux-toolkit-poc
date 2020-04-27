import { configureStore, Reducer } from '@reduxjs/toolkit';
import React, { createContext } from 'react';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { TEApiCallerResponse } from './interfaces';

export interface TEProps<S = any> {
    apiKeys: {
        [key: string]: TEApiCallerResponse<any>;
    };
    mainReducer?: Reducer<S>;
    children?: React.ReactNode;
}

export const ApiKeyValuePairContext = createContext<{ [key: string]: TEApiCallerResponse<any> }>({});

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const StoreProvider = <S,>(props: TEProps<S>) => {
    const apiReducerObject: any = {};
    Object.keys(props.apiKeys).forEach((key: string) => {
        apiReducerObject[key] = props.apiKeys[key].reducer;
    });
    const rootReducer = combineReducers({
        main: props.mainReducer ? props.mainReducer : undefined,
        ...apiReducerObject,
    });
    const store = configureStore({
        reducer: rootReducer,
    });
    return (
        <ApiKeyValuePairContext.Provider value={props.apiKeys}>
            <Provider store={store}>{props.children}</Provider>
        </ApiKeyValuePairContext.Provider>
    );
};
