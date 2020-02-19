import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApiCaller } from '../utils/apiCaller';
import { IApi } from '../utils/interfaces';
import { ITodo } from './interfaces';
import { IRootState } from './rootReducer';

export const todoApiList = ApiCaller({
    headers: [],
    params: [],
    request_data: null,
    type: 'get',
    url: 'http://localhost:3001/data'
}, 'todos_get');

export default function Todo() {

    const todos = useSelector<IRootState, IApi<ITodo[]>>(todo => todo.todolist);
    const [todo, setTodo] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(todoApiList.thunkAction());  
    }, [])

    return (
        <div>
            <div>
                <input placeholder="Add Todo" onChange={(event) => setTodo(event.target.value)} />
            </div>
            <button onClick={() => dispatch(todoApiList.thunkAction())}>Render Data</button>
            {
                todos.isApiCalled ? todos.isLoading ? <h3>Data Loading...</h3> : (todos.response_data || []).map(data => (
                    <div key={data.id}>
                        <h4>{data.completed ? 'Completed' : 'Not Completed'}</h4>
                        <p>{data.title}</p>
                        <p>{data.userId}</p>
                    </div>
                )) : <h4>Something went wrong...</h4>
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