import { Action, createSlice, Reducer } from '@reduxjs/toolkit';
import Axios from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TERequest, TEApi } from './interfaces';
import { TERootState } from '../app/rootReducer';

/**
 * @param request self explained request params
 * @param name must be unique for every api
 * S = success response type
 * E = error option type
 */
export const ApiCaller = <S, E = any>(
    request: TERequest,
    name: string,
): {
    reducer: Reducer;
    thunkAction: any;
} => {
    const initialState: TEApi<S, E> = {
        ...request,
        responseData: null,
        error: null,
        isLoading: false,
    };

    const apiSlice = createSlice({
        name,
        initialState,
        reducers: {
            requested(state): void {
                state.isLoading = true;
                state.responseData = null;
                state.error = null;
            },
            success(state, action): void {
                state.isLoading = false;
                state.responseData = action.payload;
                state.error = null;
            },
            error(state, action): void {
                state.isLoading = false;
                state.responseData = null;
                state.error = action.payload;
            },
        },
    });

    const { error, requested, success } = apiSlice.actions;

    function thunkAction(): ThunkAction<Promise<any>, TERootState, unknown, Action<string>> {
        return async (dispatch: ThunkDispatch<TERootState, unknown, Action<string>>): Promise<any> => {
            // TODO adding headers, params, request data and base_url from dot.env file
            dispatch(requested());
            return Axios({
                method: request.type,
                url: request.url,
                data: request.type !== 'get' ? request.requestData : {},
            })
                .then(axiosResponse => {
                    return dispatch(success(axiosResponse.data));
                })
                .catch(err => {
                    return dispatch(error(JSON.stringify(err)));
                });
        };
    }

    return {
        reducer: apiSlice.reducer,
        thunkAction,
    };
};
