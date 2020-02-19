import { combineReducers } from "redux";
import { IApi } from "../utils/interfaces";
import { ITodo } from "./interfaces";
import { todoApi } from "./Todo";

export const rootReducer = combineReducers({
    todolist: todoApi.reducer,
});

export interface IRootState {
    todolist: IApi<ITodo[]>
}
