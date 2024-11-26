import axios from 'axios';
import {useState, useEffect, useReducer} from 'react';
import { METHOD } from '../constants/Constants.js';
import FetchReducer from "../reducer/FetchReducer";

/**
 * Custom hook for fetching data from the api server
 * @param initialObject
 * @param initialData
 * @returns {[{errorCart: unknown, cartData: unknown, isLoadingCart: boolean},((value: unknown) => void)]}
 * @constructor
 */
const FetchHookApi = (initialObject, initialData) => {
    const [fetchObject, setFetchObject] = useState(initialObject);
    const [state, dispatch] = useReducer(FetchReducer, {
        isLoading: false,
        error: null,
        data: initialData,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(fetchObject.method === METHOD.GET) {
                    dispatch({ type: 'FETCH_INIT' });
                    const result = await axios.get(fetchObject.url);
                    dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
                }
                if(fetchObject.method === METHOD.POST) {
                    dispatch({ type: 'FETCH_INIT' });
                    const result = await axios.post(fetchObject.url, fetchObject.body);
                    dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
                }
                if(fetchObject.method === METHOD.DELETE) {
                    dispatch({ type: 'FETCH_INIT' });
                    const result = await axios.delete(fetchObject.url);
                    dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
                }
            } catch (error) {
                if(error.response.status === 404) {
                    dispatch({ type: 'FETCH_FAILURE', payload: error.response.data.error });
                }
                else if(error.response.status === 500) {
                    dispatch({ type: 'FETCH_FAILURE', payload: [error.response.statusText]});
                }
                else
                    dispatch({ type: 'FETCH_FAILURE', payload: error.response.data});
            }
        };
        fetchData();

    }, [fetchObject]);

    const { isLoading, error, data } = state;

    return [{ isLoadingCart: isLoading, cartData: data, errorCart: error }, setFetchObject];
};

export default FetchHookApi;
