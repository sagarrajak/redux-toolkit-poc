export interface TERequest {
    url: string;
    type: 'get' | 'post' | 'put' | 'delete';
    queryParams: { [key: string]: any }[];
    params: string[];
    headers: { [key: string]: string }[];
    requestData: any | null;
}

export interface TEApi<S, E = any> extends TERequest {
    responseData: S | null;
    error: E | null;
    isLoading: boolean;
}
