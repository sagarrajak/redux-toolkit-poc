import { combineReducers } from "redux";
import { IApi } from "../utils/interfaces";
import { ITodo } from "./interfaces";
import { todoApiList } from "./Todo";

export const rootReducer = combineReducers({
    todolist: todoApiList.reducer,
});

export interface IRootState {
    todolist: IApi<ITodo[]>
}
