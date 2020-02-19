import { ThunkAction, Action } from "@reduxjs/toolkit";
import { IRootState } from "../app/rootReducer";

export interface IRequest {
    url: string;
    type: 'get' | 'post' | 'put' | 'delete',
    params: {[key: string]: any}[],
    headers: {[key: string]: string}[],
    request_data: any | null, 
}

export interface IApi<S, E=any> extends IRequest {
    response_data: S | null,
    error: E | null,
    isLoading: boolean,
    isApiCalled: boolean,
}

export type IAppThunk = ThunkAction<void, IRootState, unknown, Action<string>>;