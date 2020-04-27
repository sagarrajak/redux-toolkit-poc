import { Reducer } from '@reduxjs/toolkit';

export interface TERequest {
    url: string;
    type: 'get' | 'post' | 'put' | 'delete';
    requestData?: any | null;
    queryParams?: { [key: string]: any };
    params?: string[];
    headers?: { [key: string]: string };
}

export interface TEApi<S, E = any> extends TERequest {
    responseData: S | null;
    error: E | null;
    isLoading: boolean;
}

export type TERequestOverrideOption = {
    url?: string;
    type?: 'get' | 'post' | 'put' | 'delete';
    requestData?: any | null;
    queryParams?: { [key: string]: any };
    params?: string[];
    headers?: { [key: string]: string };
};

export interface TEApiCallerResponse<S> {
    reducer: Reducer<S>;
    thunkAction: (request?: TERequestOverrideOption) => any;
    clear: Reducer;
}
