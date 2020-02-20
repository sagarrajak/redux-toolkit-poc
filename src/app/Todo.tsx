import React, { useEffect, useState, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApiCaller } from '../utils/apiCaller';
import { TEApi } from '../utils/interfaces';
import { TETodo } from './interfaces';
import { TERootState } from './rootReducer';

export const todoApiList = ApiCaller<TETodo[]>(
    {
        headers: [],
        params: [],
        queryParams: [],
        requestData: null,
        type: 'get',
        url: 'http://localhost:3001/data',
    },
    'todos_get',
);

export const todoApi = ApiCaller<TETodo[]>(
    {
        headers: [],
        params: [],
        queryParams: [],
        requestData: null,
        type: 'get',
        url: 'http://localhost:3001/data2 ',
    },
    'todos_get',
);

export default function Todo(): ReactElement {
    const todos = useSelector<TERootState, TEApi<TETodo[]>>(todo => todo.todoList);
    const [todo, setTodo] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(todoApiList.thunkAction()).then(() => {
            dispatch(todoApi.thunkAction());
        });
    }, []);

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
            <button
                onClick={(): void => {
                    dispatch(todoApiList.thunkAction()).then(() => {
                        dispatch(todoApi.thunkAction());
                    });
                }}
            >
                Render Data
            </button>
            {todos.isLoading ? (
                <h3>Data Loading...</h3>
            ) : (
                (todos.responseData || []).map(data => (
                    <div key={data.id}>
                        <h4>{data.completed ? 'Completed' : 'Not Completed'}</h4>
                        <p>{data.title}</p>
                        <p>{data.userId}</p>
                    </div>
                ))
            )}
        </div>
    );
}
