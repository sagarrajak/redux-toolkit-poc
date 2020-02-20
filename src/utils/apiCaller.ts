import { Action, createSlice, Reducer, PayloadAction } from '@reduxjs/toolkit';
import Axios from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TERequest, TEApi } from './interfaces';
import { TERootState } from '../app/rootReducer';
import _ from 'lodash';

const formatRequest = (request: TERequest): void => {
    if (_.isNil(request.headers)) {
        request.headers = [];
    }
    if (_.isNil(request.params)) {
        request.params = [];
    }
    if (_.isNil(request.queryParams)) {
        request.queryParams = [];
    }
    if (_.isUndefined(request.requestData)) {
        request.requestData = null;
    }
};

/**
 * @param request self explained request params
 * @param name must be unique for every api
 * S = success response type
 * E = error response type
 */
export const ApiCaller = <S, E = any>(
    name: string,
    request: TERequest,
): {
    reducer: Reducer;
    thunkAction: (request?: TERequest) => any;
} => {
    formatRequest(request);
    const initialState: TEApi<S, E> = {
        ...request,
        requestData: null,
        responseData: null,
        error: null,
        isLoading: false,
    };

    const apiSlice = createSlice({
        name,
        initialState,
        reducers: {
            requested(state, action: PayloadAction<TERequest | null>): void {
                if (action.payload) {
                    _.assign(state, action.payload);
                }
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
    const upperScopeRequest = request;

    function thunkAction(request?: TERequest): ThunkAction<Promise<any>, TERootState, unknown, Action<string>> {
        return async (dispatch: ThunkDispatch<TERootState, unknown, Action<string>>): Promise<any> => {
            if (request) {
                formatRequest(request);
                dispatch(requested(request));
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
            } else {
                dispatch(requested(null));
                return Axios({
                    method: upperScopeRequest.type,
                    url: upperScopeRequest.url,
                    data: upperScopeRequest.type !== 'get' ? upperScopeRequest.requestData : {},
                })
                    .then(axiosResponse => {
                        return dispatch(success(axiosResponse.data));
                    })
                    .catch(err => {
                        return dispatch(error(JSON.stringify(err)));
                    });
            }
        };
    }

    return {
        reducer: apiSlice.reducer,
        thunkAction,
    };
};
