import { ApiCaller } from '../utils/apiCaller';

import { TETodo } from './interfaces';

export const todoApiList = ApiCaller<TETodo[]>('todos_get', {
    type: 'get',
    url: 'http://localhost:3001/data',
});

export const todoApiDelete = ApiCaller<TETodo[]>('todos_delete', {
    type: 'delete',
    url: 'http://localhost:3001/data',
    headers: {
        headers: 'dfdfdf',
    },
    queryParams: {
        dfdd: 'Dfdfdfdf dfdfdf dfdf8&7sd7s',
    },
    params: ['10'],
});

export const todoApiPut = ApiCaller<TETodo[]>('todos_put', {
    type: 'put',
    url: 'http://localhost:3001/data',
});

export const apiWithParams = ApiCaller<TETodo[]>('todo_post', {
    type: 'post',
    url: 'http://localhost:3001/data',
});

export const apiWithQueryParams = ApiCaller<TETodo[]>('todo_query_params', {
    type: 'post',
    url: 'http://localhost:3001/data',
});

export const apiWithCustomHeaders = ApiCaller<TETodo[]>('todo_query_headers', {
    type: 'get',
    url: 'http://localhost:3001/data',
});

export const apiWithAll = ApiCaller<TETodo[]>('todo_query_all', {
    type: 'get',
    url: 'http://localhost:3001/data',
});
