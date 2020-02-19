import { createSlice, Reducer } from '@reduxjs/toolkit';
import Axios from 'axios';
import { IApi, IAppThunk, IRequest } from "./interfaces";


export const ApiCaller = <S, E>(
    request: IRequest,
    name: string,
): {
    reducer: Reducer,
    thunkAction: () => IAppThunk
} => {
    const initialState: IApi<S, E> = {
        ...request,
        response_data: null,
        error: null,
        isLoading: false,
        isApiCalled: false,
    }

    const apiSlice = createSlice({
        name,
        initialState,
        reducers: {
            requested(state) {
                state.isApiCalled = true;
                state.isLoading = true;
                state.response_data = null;
                state.error = null;
            },
            success(state, action) {
                state.isLoading = false;
                state.response_data = action.payload;
                state.error = null;
            },
            error(state, action) {
                state.isLoading = false;
                state.response_data = null;
                state.error = action.payload;
            }
        }
    });

    const { error, requested, success } = apiSlice.actions;

    const thunkAction = (): IAppThunk => async (dispatch: any) => {
        // TODO adding headers, params, request data and base_url from dot.env file 
        dispatch(requested());
        try {
            const axiosResponse = await Axios({
                method: request.type,
                url: request.url,
                data: request.type != 'get' ? request.request_data : {},
            });
            dispatch(success(axiosResponse.data));
        }
        catch (err) {
            //TODO error parsing 
            dispatch(error(JSON.stringify(err)));
        }
    }

    return {
        reducer: apiSlice.reducer,
        thunkAction,
    }
};