'use strict';
const defaultState = {
    searchInput: "",
    whaleResult: {},
    emsResult: []
};
export function searchReducer(state=defaultState, action) {

    switch (action.type) {
        case 'WHALE_RESULT':
            return {
                ...state,
                whaleResult: action.payload
            };
        case 'SEARCH_INPUT':
            return {
                ...state,
                searchInput: action.payload
            };
        case 'EMS_RESULT':
            return {
                ...state,
                emsResult: [...action.payload]
            };
        case 'RESET_SEARCH':
            return {
                ...state,
                whaleResult: {},
                emsResult: []
            };
        default:
            return state;
    }
}


