import { Action, createSlice, Reducer, PayloadAction } from '@reduxjs/toolkit';
import Axios from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TERequest, TEApi, TERequestOverrideOption, TEApiCallerResponse } from './interfaces';
import { TERootState } from '../app/rootReducer';
import _ from 'lodash';

const formatRequest = (request: TERequest): void => {
    if (_.isNil(request.headers)) {
        request.headers = {};
    }
    if (_.isNil(request.params)) {
        request.params = [];
    }
    if (_.isNil(request.queryParams)) {
        request.queryParams = {};
    }
    if (_.isUndefined(request.requestData)) {
        request.requestData = null;
    }
};

const setHeaders = (request: TERequest): void => {
    const headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        authorization: localStorage.getItem('usertoken') ? `Token ${localStorage.getItem('usertoken')}` : 'None',
    };
    if (_.isNil(request.headers)) {
        request.headers = headers;
    } else {
        request.headers = _.assign({}, request.headers, headers);
        console.log(request.headers);
    }
};

const setParams = (request: TERequest): void => {
    if (_.isNil(request.params) || request.params.length <= 0) return;
    request.url = request.url + '/' + request.params.map((str: string) => encodeURIComponent(str)).join('/');
};

/**
 * @param request self explained request params
 * @param name must be unique for every api
 * S = success response type
 * E = error response type default is null
 */
export const ApiCaller = <S, E = any>(name: string, request: TERequest): TEApiCallerResponse<TEApi<S, E>> => {
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
            clear(state, action): void {
                state.isLoading = false;
                state.responseData = null;
                state.error = null;
            },
        },
    });

    const { error, requested, success, clear } = apiSlice.actions;
    const upperScopeRequest = request;

    function thunkAction(
        request?: TERequestOverrideOption,
    ): ThunkAction<Promise<any>, TERootState, unknown, Action<string>> {
        return async (dispatch: ThunkDispatch<TERootState, unknown, Action<string>>): Promise<any> => {
            if (_.isNil(request)) {
                request = {};
            }
            const currentRequest = _.assign({}, upperScopeRequest, request);
            formatRequest(currentRequest);
            dispatch(requested(currentRequest));
            setHeaders(currentRequest);
            setParams(currentRequest);
            return Axios({
                method: currentRequest.type,
                url: currentRequest.url,
                data: currentRequest.type !== 'get' ? currentRequest.requestData : {},
                params: currentRequest.queryParams,
                headers: currentRequest.headers,
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
        clear,
    };
};
