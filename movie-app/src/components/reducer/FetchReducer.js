function FetchReducer(state, action) {
    switch (action.type) {
        case 'FETCH_INIT':
            return { ...state, isLoading: true, error: null };
        case 'FETCH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                error: null,
                data: action.payload,
            };
        case 'FETCH_FAILURE':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        default:
            throw new Error();
    }
}
export default FetchReducer;