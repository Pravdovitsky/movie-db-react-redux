import {createStore} from 'redux';
import {getFavorites} from '../../common/utils';

const defaultState = {
    films: [],
    totalPages: 0,
    favorite: getFavorites()
};

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_FILMS':
            return {
                ...state,
                films: action.payload.results,
                totalPages: action.payload.total_pages
            }
        case 'PUSH_FAVORITE':
            return {
                ...state,
                favorite: [...state.favorite, action.payload]
            }
        case 'DELETE_FAVORITE':
            return {
                ...state,
                favorite: action.payload
            }
        default:
            return {...state}
    }
};

const store = createStore(reducer);

export default store;