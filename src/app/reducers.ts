import { ApiCaller } from '../utils/apiCaller';

import { TETodo } from './interfaces';

export const todoApiList = ApiCaller<TETodo[]>('todos_get', {
    type: 'get',
    url: 'http://localhost:3001/data',
});
