import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TEApi } from '../utils/interfaces';
import {
    todoApiList,
    todoApiDelete,
    todoApiPut,
    apiWithParams,
    apiWithQueryParams,
    apiWithCustomHeaders,
    apiWithAll,
} from './actions';
import { TETodo } from './interfaces';
import { TERootState } from './rootReducer';

export default function Todo(): ReactElement {
    const todos = useSelector<TERootState, TEApi<TETodo[]>>(todo => todo.todoApiList);
    const [todo, setTodo] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(todoApiList.thunkAction());
    }, []);

    const todoApiListHandle = (): void => {
        dispatch(todoApiList.thunkAction());
    };

    const todoApiDeleteHandle = (): void => {
        dispatch(
            todoApiDelete.thunkAction({
                params: ['39230'],
                queryParams: { 'This is changed Value': 'dfkjdf dfkjdfkj' },
            }),
        );
    };

    const todoApiPutHandle = (): void => {
        dispatch(
            todoApiPut.thunkAction({
                type: 'post',
                params: ['20'],
                requestData: {
                    someData: 'DFdfdf',
                },
            }),
        );
    };

    const apiWithParamsHandle = (): void => {
        dispatch(apiWithParams.thunkAction());
    };

    const apiWithQueryParamsHandle = (): void => {
        dispatch(apiWithQueryParams.thunkAction());
    };

    const apiWithCustomHeadersHandle = (): void => {
        dispatch(apiWithCustomHeaders.thunkAction());
    };

    const apiWithAllHandle = (): void => {
        dispatch(apiWithAll.thunkAction());
    };

    return (
        <div>
            <div>
                <input
                    placeholder="Add Todo"
                    onChange={(event): void => {
                        setTodo(event.target.value);
                    }}
                    value={todo}
                />
            </div>
            <button onClick={todoApiListHandle}>Api List Handle</button>
            <button onClick={todoApiDeleteHandle}>Api With Delete Handle</button>
            <button onClick={todoApiPutHandle}>Api With Put Handle</button>
            <button onClick={apiWithParamsHandle}>Api With Params Handle</button>
            <button onClick={apiWithQueryParamsHandle}>Api With Query Params Handle</button>
            <button onClick={apiWithCustomHeadersHandle}>Api With Custom Headers Handle</button>
            {/* {todos.isLoading ? (
                <h3>Data Loading...</h3>
            ) : (
                (todos.responseData || []).map(data => (
                    <div key={data.id}>
                        <h4>{data.completed ? 'Completed' : 'Not Completed'}</h4>
                        <p>{data.title}</p>
                        <p>{data.userId}</p>
                    </div>
                ))
            )} */}
        </div>
    );
}
