import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useApi } from '../utils/useApi';
import { TETodo } from './interfaces';

export default function Todo(): ReactElement {
    const dispatch = useDispatch();

    const [callApi, clear, isLoading, success, error] = useApi(
        'todoApiList',
        (res: any) => {
            console.log(res);
        },
        (err: any) => {
            console.log(err);
        },
    );

    return (
        <div>
            <button onClick={() => dispatch(callApi())}>click</button>
            <button onClick={() => dispatch(clear())}>Clear</button>
            {!isLoading &&
                (success || []).map((data: TETodo) => {
                    return (
                        <>
                            <div>{data.title}</div>
                        </>
                    );
                })}
        </div>
    );
}
