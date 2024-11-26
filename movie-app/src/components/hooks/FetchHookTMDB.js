import axios from 'axios';
import {useState, useEffect, useReducer} from 'react';
import FetchReducer from "../reducer/FetchReducer";

/**
 * Custom hook for fetching data from the TMDB server
 * @param initialUrl
 * @param initialData
 * @returns {[{isLoading: boolean, data: unknown, error: unknown},((value: unknown) => void)]}
 * @constructor
 */
const FetchHookTMDB = (initialUrl, initialData) => {
    const [url, setUrl] = useState(initialUrl);
    const [state, dispatch] = useReducer(FetchReducer, {
        isLoading: false,
        error: null,
        data: initialData,
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_INIT' });
            try {
                const result = await axios(url);
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAILURE', payload: error.message });
            }
        };
        fetchData();

    }, [url]);

    return [state, setUrl];
};

export default FetchHookTMDB;
