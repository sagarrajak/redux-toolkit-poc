import { combineReducers } from 'redux';
import { todoApiList, todoApi } from './Todo';
import { TEApi } from '../utils/interfaces';
import { TETodo } from './interfaces';
import { configureStore } from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
    todoList: todoApiList.reducer,
    todoSecond: todoApi.reducer,
});

export interface TERootState {
    todoList: TEApi<TETodo[]>;
    todoSecond: TEApi<TETodo[]>;
}

export const store = configureStore({
    reducer: rootReducer,
});
