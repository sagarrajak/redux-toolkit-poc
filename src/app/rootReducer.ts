import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { TEApi } from '../utils/interfaces';
import {
    apiWithAll,
    apiWithCustomHeaders,
    apiWithParams,
    apiWithQueryParams,
    todoApiDelete,
    todoApiList,
    todoApiPut,
} from './actions';
import { TETodo } from './interfaces';

export const rootReducer = combineReducers({
    todoApiList: todoApiList.reducer,
    todoApiDelete: todoApiDelete.reducer,
    todoApiPut: todoApiPut.reducer,
    apiWithParams: apiWithParams.reducer,
    apiWithQueryParams: apiWithQueryParams.reducer,
    apiWithCustomHeaders: apiWithCustomHeaders.reducer,
    apiWithAll: apiWithAll.reducer,
});

export interface TERootState {
    todoApiList: TEApi<TETodo[]>;
    todoApiDelete: TEApi<TETodo[]>;
    todoApiPut: TEApi<TETodo[]>;
    apiWithParams: TEApi<TETodo[]>;
    apiWithQueryParams: TEApi<TETodo[]>;
    apiWithCustomHeaders: TEApi<TETodo[]>;
    apiWithAll: TEApi<TETodo[]>;
}

export const store = configureStore({
    reducer: rootReducer,
});
