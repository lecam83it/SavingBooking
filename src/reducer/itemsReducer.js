var defaultState = {
    items : [],
    isError : false
};
const itemsReducer = ( state = defaultState , action) => {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return {...state, items : action.data};
        case "FETCH_ERROR":
            return {...state, isError : true};
        default:
            return state;
    }
    return state;
};
export default itemsReducer;