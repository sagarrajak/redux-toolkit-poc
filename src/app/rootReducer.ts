import { combineReducers } from 'redux';
import { TEApi } from '../utils/interfaces';
import { TETodo } from './interfaces';
import { configureStore } from '@reduxjs/toolkit';
import { todoApiList } from './reducers';

export const rootReducer = combineReducers({
    todoList: todoApiList.reducer,
});

export interface TERootState {
    todoList: TEApi<TETodo[]>;
    todoSecond: TEApi<TETodo[]>;
}

export const store = configureStore({
    reducer: rootReducer,
});
