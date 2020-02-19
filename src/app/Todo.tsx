import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ApiCaller } from '../utils/apiCaller';
import { IApi } from '../utils/interfaces';
import { ITodo } from './interfaces';
import { IRootState } from './rootReducer';

export const todoApi = ApiCaller({
    headers: [],
    params: [],
    request_data: null,
    type: 'get',
    url: 'https://jsonplaceholder.typicode.com/todos'
}, 'todos');

export default function Todo() {
    const todos = useSelector<IRootState, IApi<ITodo[]>>(todo => todo.todolist);
    const dispatch = useDispatch();
    dispatch(todoApi.thunkAction());
    
    return (
        <div>
            {
                todos.isApiCalled ? (todos.isLoading && todos.response_data != null) ? <h3>Data Loading...</h3> : (todos.response_data || []).map(data => (
                    <div key={data.id}>
                        <h4>{data.completed ? 'Completed' : 'Not Completed'}</h4>
                        <p>{data.title}</p>
                        <p>{data.userId}</p>
                    </div>
                )) : null
            }
        </div>
    )
};


// const TodoListHelper = (props: IApi<ITodo[]>) => {
//     return (props.isLoading && props.response_data != null) ? <h3>Data Loading...</h3> : (props.response_data || []).map(data => (
//         <div key={data.id}>
//             <h4>{data.completed ? 'Completed' : 'Not Completed'}</h4>
//             <p>{data.title}</p>
//             <p>{data.userId}</p>
//         </div>
//     ));
// };