// import { useContext, useEffect, useState } from 'react';
import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ApiKeyValuePairContext } from './ApiProvider';
import { TEApi } from './interfaces';
import { apiKeys } from '../app/rootReducer';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function useApi(
    key: keyof typeof apiKeys,
    successCallback: (response: any) => void,
    errorCallback: (error: any) => void,
) {
    const themeContext = useContext(ApiKeyValuePairContext);
    const selectedState: TEApi<any> = useSelector((state: any) => state[key]);
    useEffect(() => {
        if (selectedState) {
            if (!selectedState.isLoading) {
                if (!selectedState.error && selectedState.responseData) {
                    successCallback(selectedState.responseData);
                } else if (selectedState.error && !selectedState.responseData) {
                    errorCallback(selectedState.error);
                }
            }
        }
    }, [selectedState]);

    return [
        themeContext[key].thunkAction,
        themeContext[key].clear,
        selectedState.isLoading,
        selectedState.responseData,
        selectedState.error,
    ];
}
