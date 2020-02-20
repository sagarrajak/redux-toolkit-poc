import React, { ReactElement } from 'react';
import { TETodo } from './interfaces';

export default function TodoList(props: TETodo[]): ReactElement[] {
    return props.map(data => (
        <div key={data.id}>
            <h4>{data.completed ? 'Completed' : 'Not Completed'}</h4>
            <p>{data.title}</p>
            <p>{data.userId}</p>
        </div>
    ));
}
