import React from 'react'
import { ITodo } from './interfaces'

export default function TodoList(props: ITodo[]) {
    return props.map(data => (
        <div key={data.id}>
            <h4>{data.completed ? 'Completed' : 'Not Completed'}</h4>
            <p>{data.title}</p>
            <p>{data.userId}</p>
        </div>
    ));
}
